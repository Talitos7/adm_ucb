import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection'; // Importamos el componente
import './Publications.css';

const PublicationsSociedad = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para el modal
  const logoUrl = '/src/assets/logo%20sociedad.jpg'; // Ruta de la imagen

  // Cargar publicaciones aprobadas para la categoría "Sociedad Cientifica"
  const loadApprovedPublications = async () => {
    try {
        const response = await axios.get('/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Sociedad Cientifica');
        console.log('Publicaciones aprobadas (Sociedad Cientifica):', response.data);

        // Si `response.data` ya es un array o un objeto, no intentes parsearlo
        if (Array.isArray(response.data)) {
            setPublications(response.data);
        } else if (typeof response.data === 'object') {
            setPublications(response.data.pubs || []); // Asegúrate de ajustar según la estructura de tu JSON
        } else {
            console.warn('Formato inesperado de respuesta:', response.data);
            setPublications([]);
        }
    } catch (error) {
        console.error('Error al cargar publicaciones aprobadas:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las publicaciones aprobadas.',
            confirmButtonText: 'OK',
        });
    }
};


  const handleSubmit = async (formData) => {
    try {
      await axios.post('/src/servicios/Publicacion.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Publicación creada correctamente.',
        confirmButtonText: 'OK',
      });

      loadApprovedPublications();
      setIsFormVisible(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la publicación.',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    loadApprovedPublications();
  }, []);

  return (
    <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Encabezado de Información */}
      <InformationSection
        title="Sociedad Científica Administracion de empresas"
        description="La Sociedad Científica de Sistemas es una comunidad estudiantil dedicada a la investigación y al desarrollo de capacidades investigativas en el ámbito de la ingeniería de sistemas. Sus objetivos incluyen fomentar la innovación, promover la colaboración entre estudiantes y profundizar en áreas específicas de conocimiento tecnológico. A través de proyectos, eventos y actividades, los miembros de esta sociedad contribuyen al avance del campo y adquieren habilidades académicas y profesionales relevantes."
        imageUrl={logoUrl}
        darkMode={darkMode} // Aquí pasamos el modo oscuro
      />
      <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Publicaciones de Sociedad Científica</h1>
        <button
          className={`new-publication-btn ${darkMode ? 'dark-mode' : ''}`}
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Cerrar Formulario' : 'Nueva Publicación'}
        </button>
      </header>

      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Sociedad Cientifica" // Pasamos la categoría al formulario
          darkMode={darkMode}
        />
      )}

      <div className="publications-grid">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard
              key={publication.idpublicacion}
              publication={publication}
              darkMode={darkMode}
              onCardClick={(pub) => setSelectedPublication(pub)} // Manejar clic en la tarjeta
            />
          ))
        ) : (
          <p className={`no-publications ${darkMode ? 'dark-mode' : ''}`}>
            No hay publicaciones aprobadas disponibles.
          </p>
        )}
      </div>

      {/* Modal para mostrar tarjeta ampliada */}
      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default PublicationsSociedad;
