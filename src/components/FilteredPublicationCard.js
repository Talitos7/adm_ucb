import React from 'react';
import './PublicationCard.css';

const FilteredPublicationCard = ({ publication }) => {
  const { autor, descripcionPublicacion, multimedia, fechaPublicacion } = publication;

  return (
    <div className="publication-card">
      <h3>{autor}</h3>
      <p>{descripcionPublicacion}</p>
      {multimedia && (
        <div className="publication-image">
          <img src={`/assets/${multimedia}`} alt="Publicación" />
        </div>
      )}
      <p className="publication-date">
        Publicado el: {new Date(fechaPublicacion).toLocaleDateString()}
      </p>
    </div>
  );
};

export default FilteredPublicationCard;
