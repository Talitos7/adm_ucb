import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection'; // Agregado para la información
import './Publications.css';

const PublicationsAlumni = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para el modal
  const [infoData, setInfoData] = useState(null); // Estado para la información

  // Cargar información de la sección Alumni
  const fetchInformation = async () => {
    try {
      const response = await axios.get('/src/servicios/informacionAPI.php?section=alumni');
      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        throw new Error('No se pudo cargar la información de Alumni.');
      }
    } catch (error) {
      console.error('Error al cargar la información de Alumni:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información de Alumni.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Cargar publicaciones aprobadas para la categoría "Alumni"
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get('/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Alumni');
      console.log('Publicaciones aprobadas (Alumni):', response.data);

      let jsonData;

      // Verificar el formato de la respuesta
      if (typeof response.data === 'string' && response.data.startsWith('Conexión exitosa')) {
        jsonData = JSON.parse(response.data.replace('Conexión exitosa', '').trim());
      } else if (Array.isArray(response.data)) {
        jsonData = response.data;
      } else if (typeof response.data === 'object') {
        jsonData = response.data.publicaciones || [];
      } else {
        console.warn('Formato de respuesta inesperado:', response.data);
        jsonData = [];
      }

      if (Array.isArray(jsonData)) {
        setPublications(jsonData);
      } else {
        console.warn('La respuesta no es un array válido:', jsonData);
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
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Información de la sección Alumni */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={false} // La información no es editable
        />
      )}

      <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Publicaciones de Alumni</h1>
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
          categoria="Alumni" // Pasamos la categoría al formulario
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

export default PublicationsAlumni;