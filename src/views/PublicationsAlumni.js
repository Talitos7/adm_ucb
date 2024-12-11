import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection';
import './Publications.css';
import {
  Box, Divider, Chip,
} from "@mui/material";

const PublicationsAlumni = ({ darkMode, isAdmin }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [infoData, setInfoData] = useState(null);

  // Cargar información de la sección Alumni
  const fetchInformation = async () => {
    try {
      const response = await axios.get(`/src/servicios/informacionAPI.php?section=alumni`);
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

  // Actualizar información de la sección Alumni
  const handleUpdateInformation = async (updatedData) => {
    try {
      const response = await axios.post('/src/servicios/informacionAPI.php', {
        section: 'alumni',
        content: updatedData,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada',
          text: 'La información de Alumni se actualizó correctamente.',
          confirmButtonText: 'OK',
        });
        setInfoData(updatedData);
      } else {
        throw new Error('No se pudo actualizar la información de Alumni.');
      }
    } catch (error) {
      console.error('Error al actualizar la información de Alumni:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la información de Alumni.',
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
      {/* Información de la sección Alumni */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={true} // Editable solo si es administrador
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

      {/* Formulario de creación de publicación */}
      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Alumni"
          darkMode={darkMode}
        />
      )}

      {/* Publicaciones aprobadas */}
      <div className="publications-grid" style={{marginTop: '20px'}}>
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

      {/* Modal para mostrar publicación ampliada */}
      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        darkMode={darkMode}
      />
    </Box>
  );
};

export default PublicationsAlumni;