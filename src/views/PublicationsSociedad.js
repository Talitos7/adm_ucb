import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection';
import './Publications.css';

const PublicationsSociedad = ({ darkMode, isAdmin }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [infoData, setInfoData] = useState(null);

  // Cargar información de la sección
  const fetchInformation = async () => {
    try {
      const response = await axios.get(
        `/src/servicios/informacionAPI.php?section=sociedad`
      );
      if (response.data.status === "success") {
        setInfoData(response.data.data);
      } else {
        throw new Error("No se pudo cargar la información.");
      }
    } catch (error) {
      console.error('Error al cargar la información:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleUpdateInformation = async (updatedData) => {
    try {
      const response = await axios.post('/src/servicios/informacionAPI.php', {
        section: 'sociedad',
        content: updatedData,
      });
      if (response.data.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada',
          text: 'La información se actualizó correctamente.',
          confirmButtonText: 'OK',
        });
        setInfoData(updatedData);
      } else {
        throw new Error("No se pudo actualizar la información.");
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la información.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Cargar publicaciones aprobadas
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get(
        '/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Sociedad Cientifica'
      );
      setPublications(Array.isArray(response.data) ? response.data : []);
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

  useEffect(() => {
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
      {infoData && (
        <InformationSection
        data={infoData}
        darkMode={darkMode}
        isEditable={true} // Siempre editable en esta vista
        onEdit={handleUpdateInformation}
      />
      )}

      <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Publicaciones de Sociedad Científica</h1>
        {isAdmin && (
          <button
            className={`new-publication-btn ${darkMode ? 'dark-mode' : ''}`}
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Cerrar Formulario' : 'Nueva Publicación'}
          </button>
        )}
      </header>

      {isFormVisible && (
        <PublicationForm
          onSubmit={(formData) => console.log(formData)}
          categoria="Sociedad Cientifica"
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
              onCardClick={(pub) => setSelectedPublication(pub)}
            />
          ))
        ) : (
          <p className={`no-publications ${darkMode ? 'dark-mode' : ''}`}>
            No hay publicaciones aprobadas disponibles.
          </p>
        )}
      </div>

      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default PublicationsSociedad;
