import React from 'react';
import './PublicationCard.css';

const PublicationCard = ({ publication, darkMode, onCardClick }) => {
  return (
    <div
      className={`publication-card animate-slide-up ${darkMode ? 'dark-mode' : ''}`}
      onClick={() => onCardClick(publication)} // Manejar clic en la tarjeta
    >
      <div className="image-container">
        <img
          src={`/src/assets/${publication.multimedia}`}
          alt="Publicación"
          className="publication-image"
        />
      </div>
      <div className="publication-details">
        <h3 className="publication-author">{publication.autor}</h3>
        <p className="publication-description">{publication.descripcionpublicacion}</p>
      </div>
    </div>
  );
};

export default PublicationCard;
