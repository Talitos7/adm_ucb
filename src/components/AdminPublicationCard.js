import React from 'react';
import './AdminPublicationCard.css';

const AdminPublicationCard = ({ publication, onAction, darkMode }) => {
  const { idpublicacion, titulo, detalle, categoria, fecha_creacion, multimedia } = publication;

  return (
    <div className={`admin-publication-card ${darkMode ? 'dark-mode' : ''}`}>
      {/* Mostrar la imagen si está disponible */}
      {multimedia && (
        <div className="image-container">
          <img
            src={`/src/assets/${multimedia}`} // Asegúrate de que esta sea la ruta correcta para tus imágenes
            alt={titulo}
            className="publication-image"
          />
        </div>
      )}

      {/* Detalles de la publicación */}
      <h2 className={darkMode ? 'dark-text' : ''}>{titulo}</h2>
      <p className={darkMode ? 'dark-text' : ''}>{detalle}</p>
      <p className={darkMode ? 'dark-text' : ''}><strong>Categoría:</strong> {categoria}</p>

      {/* Botones de acción */}
      <div className="action-buttons">
        <button
          className={`action-btn approve ${darkMode ? 'dark-btn' : ''}`}
          onClick={() => onAction(idpublicacion, true)}  // Aprobar
        >
          Aprobar
        </button>
        <button
          className={`action-btn reject ${darkMode ? 'dark-btn' : ''}`}
          onClick={() => onAction(idpublicacion, false)}  // Rechazar
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default AdminPublicationCard;
