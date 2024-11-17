import React from 'react';
import './PublicationCard.css';

const PublicationCard = ({ publication, darkMode }) => {
  return (
    <div className={`publication-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="image-container">
        <img
          src={`/src/assets/${publication.multimedia}`}
          alt="Publicación"
          className="publication-image"
        />
      </div>
      <div className={`publication-details ${darkMode ? 'dark-mode' : ''}`}>
        <h3 className={`publication-author ${darkMode ? 'dark-mode' : ''}`}>
          {publication.autor}
        </h3>
        <p className={`publication-description ${darkMode ? 'dark-mode' : ''}`}>
          {publication.descripcionpublicacion}
        </p>
        <span className={`publication-email ${darkMode ? 'dark-mode' : ''}`}>
          {publication.usuario_emailadm}
        </span>
      </div>
    </div>
  );
};

export default PublicationCard;
