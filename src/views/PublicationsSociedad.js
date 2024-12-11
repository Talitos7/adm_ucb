import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection';
import './Publications.css';
import {
  Box, Divider, Chip, Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PublicationsSociedad = ({ darkMode, isAdmin }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [infoData, setInfoData] = useState(null);

  const closeModal = () => {
    setIsFormVisible(false);  // Esto oculta el formulario cuando se hace clic en "Cancelar"
  };  

  // Cargar información de la sección
  const fetchInformation = async () => {
    try {
      const response = await axios.get(`/src/servicios/informacionAPI.php?section=sociedad`);
      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        throw new Error('No se pudo cargar la información.');
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
        setInfoData(updatedData);
      } else {
        throw new Error('No se pudo actualizar la información.');
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

  useEffect(() => {
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <Box className={`publications-container ${darkMode ? 'dark-mode' : ''}`}
    sx={{
      width: '100%',
      marginRight: 0,
      marginLeft: 0,
      background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
      minHeight: "100vh",
      padding: 4,
      position: "relative",
    }}>
      {/* Sección de información */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={true} // Solo editable si es administrador
          onEdit={handleUpdateInformation}
        />
      )}
      
      <Divider variant="middle"
        sx={{
          '&::before, &::after': {
            borderTopWidth: '2px', // Grosor de la línea
            borderColor: '#fff',   // Color de la línea
          },
          marginTop: '30px',
        }}
        aria-hidden="true"
      >
        <Chip
          label="Publicaciones"
          size="medium"
          sx={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
          }}
        />
      </Divider>

      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsFormVisible(!isFormVisible)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Sociedad Cientifica"
          darkMode={darkMode}
          closeModal={closeModal}  // Pasa la función closeModal
        />
      )}

      {/* Lista de publicaciones */}
      <div className="publications-grid" style={{marginTop: '20px'}}>
        {publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard
              key={publication.idpublicacion}
              publication={publication}
              darkMode={darkMode}
              onCardClick={(pub) => setSelectedPublication(pub)} // Mostrar en el modal
            />
          ))
        ) : (
          <p className={`no-publications ${darkMode ? 'dark-mode' : ''}`}>
            No hay publicaciones aprobadas disponibles.
          </p>
        )}
      </div>
    </Box>
  );
};

export default PublicationsSociedad;
