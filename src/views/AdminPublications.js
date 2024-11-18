import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminPublicationCard from '../components/AdminPublicationCard';
import './AdminPublications.css';

const AdminPublications = ({ darkMode }) => {
  const [pendingPublications, setPendingPublications] = useState([]);
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
    <div className={`admin-publications-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className={`admin-publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Gestión de Publicaciones</h1>
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
            />
          ))
        ) : (
          <p className="no-publications">No hay publicaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPublications;
