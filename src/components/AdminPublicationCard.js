import React from 'react';
import './AdminPublicationCard.css';

const AdminPublicationCard = ({ publication, onAction, darkMode, onCardClick }) => {
  const { idpublicacion, titulo, detalle, categoria, multimedia } = publication;

  return (
    <div
      className={`admin-publication-card ${darkMode ? 'dark-mode' : ''}`}
      onClick={onCardClick}
    >
      {/* Mostrar la imagen si está disponible */}
      {multimedia && (
        <div className={`image-container ${darkMode ? 'dark-mode' : ''}`}>
          <img
            src={`/src/assets/${multimedia}`}
            alt={titulo}
            className="publication-image"
          />
        </div>
      )}

      {/* Detalles de la publicación */}
      <div className={`publication-details ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className="publication-author">{titulo}</h2>
        <p className="publication-description">{detalle}</p>
        <p className="publication-email">
          <strong>Categoría:</strong> {categoria}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="action-buttons">
        <button
          className={`action-btn approve ${darkMode ? 'dark-mode' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que se active el modal al hacer clic en el botón
            onAction(idpublicacion, true);
          }}
        >
          Aprobar
        </button>
        <button
          className={`action-btn reject ${darkMode ? 'dark-mode' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que se active el modal al hacer clic en el botón
            onAction(idpublicacion, false);
          }}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default AdminPublicationCard;
