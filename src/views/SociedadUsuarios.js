import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationModal from '../components/PublicationModal';
import InformationSection from '../components/InformationSection'; // Importamos el componente de información
import './Publications.css';
import { Box, Divider, Chip, } from "@mui/material";

const PublicationsSociedad = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
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

  useEffect(() => {
    fetchInformation();
    loadApprovedPublications();
  }, []);

  return (
    <Box
      className={`publications-container`}
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e7f99 30%, #122e63 100%)',
        padding: 4,
      }}
    >
      {/* Información de la sección */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={darkMode}
          isEditable={false} // No se puede editar esta sección
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

      {/* Grid de publicaciones */}
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

export default PublicationsSociedad;
