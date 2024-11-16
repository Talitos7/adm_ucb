import React from 'react';
import './PublicationCard.css';

const PublicationCard = ({ publication, onEdit, onDelete, isAdmin }) => {
  const { autor, descripcionPublicacion, multimedia, fechaPublicacion } = publication;

  return (
    <div className="publication-card">
      <div className="publication-header">
        <h3 className="author">{autor}</h3>
        <span className="date">{new Date(fechaPublicacion).toLocaleDateString()}</span>
      </div>
      <div className="publication-content">
        <p>{descripcionPublicacion}</p>
        {multimedia && (
          <div className="media-container">
            <img src={multimedia} alt="Contenido multimedia" />
          </div>
        )}
      </div>
      {isAdmin && (
        <div className="publication-actions">
          <button onClick={() => onEdit(publication)} className="edit-btn">
            Editar
          </button>
          <button onClick={() => onDelete(publication.idPublicacion)} className="delete-btn">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicationCard;