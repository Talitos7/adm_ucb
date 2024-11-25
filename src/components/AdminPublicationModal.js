import React from 'react';
import './AdminPublicationModal.css';
import CloseIcon from '@mui/icons-material/Close'; // Icono de cierre (opcional)

const AdminPublicationModal = ({ publication, onClose, darkMode }) => {
  if (!publication) return null; // Si no hay publicación seleccionada, no se renderiza el modal

  const { titulo,descripcionpublicacion, categoria, multimedia, autor, usuario_emailadm } = publication;

  return (
    <div className={`modal-overlay ${darkMode ? 'dark-mode' : ''}`} onClick={onClose}>
      <div
        className={`modal-content ${darkMode ? 'dark-mode' : ''}`}
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el contenido cierre el modal
      >
        <button className={`close-btn ${darkMode ? 'dark-mode' : ''}`} onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="modal-header">
          <h2>{titulo}</h2>
        </div>
        <div className={`modal-body ${darkMode ? 'dark-mode' : ''}`}>
          <p>
            <strong>Autor:</strong> {autor}
          </p>
          <p>
            <strong>Correo:</strong> {usuario_emailadm}
          </p>
          <p>
            <strong>Descripción:</strong> {descripcionpublicacion}
          </p>
          <p>
            <strong>Categoría:</strong> {categoria}
          </p>
        </div>
        {multimedia && (
          <div className="modal-image-container">
            <img src={`/src/assets/${multimedia}`} alt={titulo} className="modal-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPublicationModal;
