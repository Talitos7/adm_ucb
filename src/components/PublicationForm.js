import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './PublicationForm.css';
import { Button } from '@mui/material';  // Si estás usando Material UI
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

const PublicationForm = ({ onSubmit, categoria, darkMode, closeModal }) => {
  const [formData, setFormData] = useState({
    descripcionPublicacion: '',
    multimedia: null,
    usuario_emailAdm: '', // Inicializa vacío
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Recuperar el email del usuario desde el localStorage
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      try {
        const usuario = JSON.parse(storedUsuario); // Analiza los datos del usuario
        setFormData((prevFormData) => ({
          ...prevFormData,
          usuario_emailAdm: usuario.emailadm || '', // Establece el email del usuario
        }));
      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
      }
    }
  }, []); // Ejecuta al montar el componente

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        Swal.fire({
          icon: 'error',
          title: 'Archivo muy grande',
          text: 'La imagen debe ser menor a 5MB.',
          confirmButtonText: 'OK',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setFormData({ ...formData, multimedia: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.multimedia) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes subir una foto para crear la publicación.',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append('descripcionPublicacion', formData.descripcionPublicacion);
      formPayload.append('usuario_emailAdm', formData.usuario_emailAdm); // Usar el email del usuario logueado
      formPayload.append('multimedia', formData.multimedia);
      formPayload.append('categoria', categoria); // Agregamos la categoría aquí

      await onSubmit(formPayload);

      setFormData({
        descripcionPublicacion: '',
        multimedia: null,
        usuario_emailAdm: formData.usuario_emailAdm, // Mantenemos el email del usuario
      });
      setPreviewImage(null);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Publicación creada correctamente.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al procesar la publicación.',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`modal-overlay ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`modal-content ${darkMode ? 'dark-mode' : ''}`}>
        <form onSubmit={handleSubmit} className={`publication-form ${darkMode ? 'dark-mode' : ''}`}>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={formData.descripcionPublicacion}
              onChange={(e) =>
                setFormData({ ...formData, descripcionPublicacion: e.target.value })
              }
              placeholder="Comparte tu experiencia"
              required
            />
          </div>

          <div className="form-group media-upload">
            <label htmlFor="multimedia">
              <div className="upload-area">
                <i className="upload-icon">📷</i>
                <span>Agregar Foto</span>
              </div>
            </label>
            <input
              type="file"
              id="multimedia"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden-input"
              required
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Vista previa" />
                <button type="button" className="remove-image" onClick={() => setPreviewImage(null)}>
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
          <Button
            onClick={closeModal}  // Esto cierra el modal cuando se hace clic en "Cancelar"
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            sx={{ marginRight: '10px' }}
          >
            Cancelar
          </Button>

            {/* Botón Guardar */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              sx={{ marginLeft: '10px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
