import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './PublicationForm.css';

const PublicationForm = ({ onSubmit, darkMode }) => {
    const [formData, setFormData] = useState({
        descripcionPublicacion: '',
        multimedia: null,
        usuario_emailAdm: 'josue.nisthaus@ejemplo.com',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 1) {
            Swal.fire({
                icon: 'error',
                title: 'Demasiados archivos',
                text: 'Solo puedes subir un archivo.',
                confirmButtonText: 'OK',
            });
            e.target.value = ''; // Limpiar el input
            return;
        }

        const file = files[0];
        if (file) {
            if (file.size > 5000000) { // Límite de 5MB
                Swal.fire({
                    icon: 'error',
                    title: 'Archivo muy grande',
                    text: 'La imagen debe ser menor a 5MB.',
                    confirmButtonText: 'OK',
                });
                e.target.value = ''; // Limpiar el input
                return;
            }

            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);

            setFormData((prev) => ({ ...prev, multimedia: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            setFormData({ descripcionPublicacion: '', multimedia: null, usuario_emailAdm: 'josue.nisthaus@ejemplo.com' });
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
        <form onSubmit={handleSubmit} className={`publication-form ${darkMode ? 'dark-mode' : ''}`}>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    id="descripcion"
                    value={formData.descripcionPublicacion}
                    onChange={(e) => setFormData({ ...formData, descripcionPublicacion: e.target.value })}
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
                />
                {previewImage && (
                    <div className="image-preview">
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
                {isSubmitting ? 'Enviando...' : 'Publicar'}
            </button>
        </form>
    );
};

export default PublicationForm;
