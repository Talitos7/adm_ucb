import React from 'react';
import './PublicationCard.css';

const PublicationCard = ({ publication }) => {
  if (!publication) {
    console.error('Publication data is missing');
    return <p>Error: No se encontró la publicación.</p>;
  }

  // Generar la ruta completa de la imagen
  const imagePath = `http://localhost/ADM/adm_ucb/src/assets/${publication.multimedia}`;

  return (
    <div className="publication-card animate-slide-up">
      {publication.multimedia ? (
        <div className="image-container">
          <img
            src={imagePath}
            alt={`Imagen de ${publication.autor}`}
            className="publication-image"
          />
        </div>
      ) : (
        <div className="image-container">
          <p>No hay imagen disponible</p>
        </div>
      )}
      <div className="publication-details">
        <h3 className="publication-author">{publication.autor || 'Autor desconocido'}</h3>
        <p className="publication-description">{publication.descripcionpublicacion || 'Sin descripción'}</p>
        <span className="publication-email">{publication.usuario_emailadm || 'Correo no disponible'}</span>
      </div>
    </div>
  );
};

export default PublicationCard;
