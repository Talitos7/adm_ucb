import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './PublicationForm.css';

const PublicationForm = ({ onSubmit, initialData = null, darkMode }) => {
  const [formData, setFormData] = useState({
    descripcionPublicacion: initialData?.descripcionPublicacion || '',
    multimedia: null,
    usuario_emailAdm: 'josue.nisthaus@ejemplo.com', // Email estático para pruebas
  });

  const [previewImage, setPreviewImage] = useState(initialData?.multimedia || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Formato no válido',
          text: 'El archivo debe ser una imagen.',
          confirmButtonText: 'OK',
        });
        return;
      }

      if (file.size > 5000000) { // Límite de 5MB
        Swal.fire({
          icon: 'error',
          title: 'Archivo muy grande',
          text: 'La imagen debe ser menor a 5MB.',
          confirmButtonText: 'OK',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, multimedia: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se suba una imagen
    if (!formData.multimedia) {
      Swal.fire({
        icon: 'error',
        title: 'Falta la foto',
        text: 'Debes subir una foto para crear la publicación.',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('descripcionPublicacion', formData.descripcionPublicacion);
      formPayload.append('usuario_emailAdm', formData.usuario_emailAdm);
      formPayload.append('multimedia', formData.multimedia);

      await onSubmit(formPayload);

      if (!initialData) {
        setFormData({
          descripcionPublicacion: '',
          multimedia: null,
          usuario_emailAdm: 'josue.nisthaus@ejemplo.com',
        });
        setPreviewImage(null);
      }

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: initialData ? 'Publicación actualizada' : 'Publicación creada',
        showConfirmButton: true,
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
    <form onSubmit={handleSubmit} className={`publication-form ${darkMode ? 'dark-mode' : ''}`}>
      <div className="form-group">
        <label htmlFor="descripcion">Comparte tu experiencia</label>
        <textarea
          id="descripcion"
          value={formData.descripcionPublicacion}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              descripcionPublicacion: e.target.value,
            }))
          }
          placeholder="¿Qué te gustaría compartir sobre tu experiencia de intercambio?"
          required
          className="animate-entrance"
        />
      </div>

      <div className="form-group media-upload">
        <label htmlFor="multimedia">
          <div className={`upload-area ${darkMode ? 'dark-mode' : ''}`}>
            <i className="upload-icon">📷</i>
            <span>Agregar foto</span>
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
          <div className="image-preview animate-entrance">
            <img src={previewImage} alt="Vista previa" />
            <button
              type="button"
              className="remove-image"
              onClick={() => {
                setPreviewImage(null);
                setFormData((prev) => ({ ...prev, multimedia: null }));
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading-spinner"></span>
        ) : initialData ? 'Actualizar' : 'Publicar'}
      </button>
    </form>
  );
};

export default PublicationForm;
