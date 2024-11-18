import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './PublicationModal.css';

const PublicationModal = ({ publication, onClose, darkMode }) => {
  if (!publication) return null;

  return (
    <div className={`modal-overlay ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`modal-content ${darkMode ? 'dark-mode' : ''}`}>
        <button className={`close-btn ${darkMode ? 'dark-mode' : ''}`} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="modal-image-container">
          <img
            src={`/src/assets/${publication.multimedia}`}
            alt="Publicación"
            className="modal-image"
          />
        </div>
        <div className="modal-details">
          <h2 className="modal-author">{publication.autor}</h2>
          <p className="modal-description">{publication.descripcionpublicacion}</p>
          <span className="modal-email">{publication.usuario_emailadm}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicationModal;
