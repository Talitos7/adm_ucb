import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection'; // Importamos el componente de información
import './Publications.css';

const PublicationsSociedad = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para el modal
  const [infoData, setInfoData] = useState(null); // Datos de la sección de información

  // Cargar publicaciones aprobadas para la categoría "Sociedad Científica"
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get(
        '/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Sociedad Cientifica'
      );

      if (Array.isArray(response.data)) {
        setPublications(response.data);
      } else if (typeof response.data === 'object') {
        setPublications(response.data.pubs || []);
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

  // Cargar información de la sección "Sociedad Científica"
  const fetchInformation = async () => {
    try {
      const response = await axios.get(
        '/src/servicios/informacionAPI.php?section=sociedad'
      );

      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        console.error('Error al cargar la información:', response.data.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de la sección.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error al cargar la información:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cargar la información de la sección.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Actualizar información de la sección
  const handleUpdateInformation = async (updatedData) => {
    try {
      const response = await axios.post('/src/servicios/informacionAPI.php', {
        section: 'sociedad',
        content: updatedData,
      });

      if (response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada',
          text: 'La información se actualizó correctamente.',
          confirmButtonText: 'OK',
        });
        setInfoData(updatedData); // Actualizar los datos locales
      } else {
        throw new Error('No se pudo actualizar la información.');
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la información de la sección.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Crear nueva publicación
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
      loadApprovedPublications(); // Recargar publicaciones
      setIsFormVisible(false); // Ocultar formulario
    } catch (error) {
      console.error('Error al guardar publicación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la publicación.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Cargar información y publicaciones al iniciar
  useEffect(() => {
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Información de la sección */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={true} // Permitir editar
          onEdit={handleUpdateInformation} // Pasar la función de edición
        />
      )}

      {/* Encabezado de publicaciones */}
      <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Publicaciones de Sociedad Científica</h1>
        <button
          className={`new-publication-btn ${darkMode ? 'dark-mode' : ''}`}
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Cerrar Formulario' : 'Nueva Publicación'}
        </button>
      </header>

      {/* Formulario de nueva publicación */}
      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Sociedad Cientifica"
          darkMode={darkMode}
        />
      )}

      {/* Grid de publicaciones */}
      <div className="publications-grid">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard
              key={publication.idpublicacion}
              publication={publication}
              darkMode={darkMode}
              onCardClick={(pub) => setSelectedPublication(pub)}
            />
          ))
        ) : (
          <p className={`no-publications ${darkMode ? 'dark-mode' : ''}`}>
            No hay publicaciones aprobadas disponibles.
          </p>
        )}
      </div>

      {/* Modal de publicación ampliada */}
      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default PublicationsSociedad;
