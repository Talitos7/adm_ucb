import React from 'react';
import './PublicationCard.css';

const PublicationCard = ({ publication }) => {
  const { autor, multimedia, descripcionPublicacion, fechapublicacion } = publication;

  return (
    <div className="publication-card">
      <img
        src={`/assets/${multimedia}`}
        alt="Publicación"
        className="publication-image"
      />
      <div className="publication-content">
        <h3>{autor}</h3>
        <p>{descripcionPublicacion}</p>
        <span>{new Date(fechapublicacion).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PublicationCard;
