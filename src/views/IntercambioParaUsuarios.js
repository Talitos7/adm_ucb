import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection'; // Importar el componente de información
import './Publications.css';
import { Box, Divider, Chip, } from "@mui/material";

const PublicationsIntercambio = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para el modal
  const [infoData, setInfoData] = useState(null); // Estado para la información de la sección

  // Cargar información de la sección Intercambio
  const fetchInformation = async () => {
    try {
      const response = await axios.get('/src/servicios/informacionAPI.php?section=intercambio');
      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        throw new Error('No se pudo cargar la información de Intercambio.');
      }
    } catch (error) {
      console.error('Error al cargar la información de Intercambio:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la información de Intercambio.',
        confirmButtonText: 'OK',
      });
    }
  };

  // Cargar publicaciones aprobadas para la categoría "Intercambio"
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get('/src/servicios/mostrarPublicacionesAprobadas.php?categoria=Intercambio');
      console.log('Publicaciones aprobadas (Intercambio):', response.data);

      if (Array.isArray(response.data)) {
        setPublications(response.data);
      } else if (typeof response.data === 'object') {
        setPublications(response.data.publicaciones || []);
      } else if (typeof response.data === 'string' && response.data.startsWith('Conexión exitosa')) {
        const jsonData = JSON.parse(response.data.replace('Conexión exitosa', '').trim());
        setPublications(jsonData.publicaciones || []);
      } else {
        console.warn('Formato de respuesta inesperado:', response.data);
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
    <Box
      className={`publications-container ${darkMode ? 'dark-mode' : ''}`}
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e7f99 30%, #122e63 100%)',
        padding: 4,
      }}
    >
      {/* Información de la sección Intercambio */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={false} // No editable en esta vista
        />
      )}

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

      {isFormVisible && (
        <PublicationForm
          onSubmit={handleSubmit}
          categoria="Intercambio" // Pasamos la categoría al formulario
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
    </Box>
  );
};

export default PublicationsIntercambio;