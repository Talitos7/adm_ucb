import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminPublicationCard from '../components/AdminPublicationCard';
import AdminPublicationModal from '../components/AdminPublicationModal';
import './AdminPublications.css';
import {
  Box,
} from "@mui/material";

const AdminPublications = ({ darkMode }) => {
  const [pendingPublications, setPendingPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [error, setError] = useState('');

  // Cargar publicaciones pendientes
  const loadPendingPublications = async () => {
    try {
      const response = await axios.get('/src/servicios/gestionContenido.php?estadopublicacion=false');
      setPendingPublications(response.data);
    } catch (error) {
      console.error('Error al cargar publicaciones pendientes:', error);
      setError('No se pudieron cargar las publicaciones pendientes.');
    }
  };
  

  // Manejo de la acción (aprobar/rechazar)
  const handleAction = async (id, isApproved) => {
    try {
      const endpoint = '/src/servicios/gestionContenido.php';
      const data = { idPublicacion: id, estado: isApproved ? true : false };

      await axios.post(endpoint, data);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: `La publicación ha sido ${isApproved ? 'aprobada' : 'rechazada'}.`,
        confirmButtonText: 'OK',
      });

      // Actualizar lista
      setPendingPublications(pendingPublications.filter((pub) => pub.idpublicacion !== id));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la publicación.',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    loadPendingPublications();
  }, []);

  return (
    <Box className={`admin-publications-container ${darkMode ? 'dark-mode' : ''}`}
    sx={{
      width: '100%',
      marginRight: 0,
      marginLeft: 0,
      background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
      minHeight: "100vh",
      padding: 4,
      position: "relative",
    }}>
      <header className={`admin-publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1 style={{ color: '#e1f3ff' }}>Gestión de Publicaciones</h1>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="admin-publications-grid">
        {pendingPublications.length > 0 ? (
          pendingPublications.map((publication) => (
            <AdminPublicationCard
              key={publication.idpublicacion}
              publication={publication}
              onAction={handleAction}
              darkMode={darkMode}
              onCardClick={() => setSelectedPublication(publication)}
            />
          ))
        ) : (
          <p style={{ color: '#e1f3ff' }} className="no-publications">No hay publicaciones pendientes.</p>
        )}
      </div>
      {/* Modal */}
      <AdminPublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)} // Cerrar modal
        darkMode={darkMode}
      />
    </Box>
  );
};

export default AdminPublications;
