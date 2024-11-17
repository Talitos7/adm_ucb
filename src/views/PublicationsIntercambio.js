import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PublicationCard from '../components/PublicationCard';
import PublicationForm from '../components/PublicationForm';
import './Publications.css';

const PublicationsIntercambio = ({ darkMode }) => {
  const [publications, setPublications] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Cargar publicaciones aprobadas
  const loadApprovedPublications = async () => {
    try {
      const response = await axios.get('/src/servicios/mostrarPublicacionesAprobadas.php');
      console.log('Respuesta del servidor (raw):', response.data);

      // Limpiar la respuesta del servidor para extraer el JSON válido
      const jsonData = response.data.replace(/^Conexión exitosa/, '');
      const parsedData = JSON.parse(jsonData);

      if (Array.isArray(parsedData)) {
        setPublications(parsedData);
      } else {
        console.warn('La respuesta procesada no es un array válido:', parsedData);
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
    loadApprovedPublications();
  }, []);

  return (
    <div className={`publications-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className={`publications-header ${darkMode ? 'dark-mode' : ''}`}>
        <h1>Publicaciones Aprobadas</h1>
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
          darkMode={darkMode}
        />
      )}

      <div className="publications-grid">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationCard
              key={publication.idpublicacion}
              publication={publication}
            />
          ))
        ) : (
          <p className={`no-publications ${darkMode ? 'dark-mode' : ''}`}>
            No hay publicaciones aprobadas disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicationsIntercambio;
