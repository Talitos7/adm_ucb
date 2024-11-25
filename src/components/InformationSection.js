import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import axios from 'axios';

const InformationSection = ({ data, isEditable, darkMode, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    try {
      await onEdit(formData);
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la información.',
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(data); // Restaurar valores originales
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const response = await axios.post(
        'http://localhost/adm_ucb/src/servicios/uploadInfoPhoto.php',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: response.data.path, // Ruta de la imagen subida
        }));

        Swal.fire({
          icon: 'success',
          title: 'Imagen subida',
          text: 'La imagen se subió correctamente.',
        });
      } else {
        throw new Error(response.data.message || 'Error desconocido');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo subir la imagen.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '20px auto',
        color: darkMode ? '#f1f1f1' : '#333',
      }}
    >
      {/* Sección de texto */}
      <Box sx={{ flex: 1, paddingRight: '20px' }}>
        {isEditing ? (
          <>
            <TextField
              label="Título"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginTop: '20px' }}
              disabled={isUploading}
            >
              {isUploading ? 'Subiendo...' : 'Subir Imagen'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: darkMode ? '#f1f1f1' : '#333',
              }}
            >
              {data.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                color: darkMode ? '#cccccc' : '#555',
              }}
            >
              {data.description}
            </Typography>
            {isEditable && (
              <IconButton
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(true)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
            )}
          </>
        )}
      </Box>

      {/* Imagen */}
      <Box sx={{ flexShrink: 0 }}>
        <img
          src={formData.imageUrl}
          alt={formData.title}
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
            borderRadius: '8px',
            objectFit: 'contain',
            boxShadow: darkMode
              ? '0 4px 8px rgba(255, 255, 255, 0.2)'
              : '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>
    </Box>
  );
};

export default InformationSection;
