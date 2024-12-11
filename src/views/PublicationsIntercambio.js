import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import { Box, Divider, Chip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PublicationsIntercambio = ({ darkMode, isAdmin }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const closeModal = () => setIsFormVisible(false);

  // Cargar publicaciones aprobadas para la categoría "Intercambio"
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get('/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Intercambio');
      setPublications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
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

  const handleUpdateInformation = async (updatedData) => {
    try {
      const response = await axios.post('/src/servicios/informacionAPI.php', {
        section: 'intercambio',
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

  useEffect(() => {
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <Box
      className={`publications-container ${darkMode ? 'dark-mode' : ''}`}
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e7f99 30%, #122e63 100%)',
        padding: 4,
      }}
    >

      <Divider variant="middle"
        sx={{
          '&::before, &::after': {
            borderTopWidth: '2px', // Grosor de la línea
            borderColor: '#fff',   // Color de la línea
          },
        }}
        aria-hidden="true"
      >
        <Chip
          label="Experiencias"
          size="medium"
          sx={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
          }}
        />
      </Divider>

      {/* Modal para publicación ampliada */}
      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />

      {/* Botón flotante para abrir formulario */}
      <Fab
        color="primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Formulario para nueva publicación */}
      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Intercambio"
          darkMode={darkMode}
          closeModal={closeModal}
        />
      )}

      {/* Publicaciones */}
      <div className="publications-grid" style={{ marginTop: '20px' }}>
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
    </Box>
  );
};

export default PublicationsIntercambio;
