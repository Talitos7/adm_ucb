import React from 'react';
import './PublicationCard.css';
import { Typography } from '@mui/material';

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
      <div className={`publication-details ${darkMode ? 'dark-mode' : ''}`}>
        <Typography variant="h6" gutterBottom className={`publication-author ${darkMode ? 'dark-mode' : ''}`}>
          {publication.autor}
        </Typography >
        <Typography variant='body2' color="text.secondary" className={`publication-description ${darkMode ? 'dark-mode' : ''}`}>
          {publication.descripcionpublicacion}
        </Typography>
      </div>
    </div>
  );
};

export default PublicationCard;
