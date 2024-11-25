import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PasantiasCards from '../components/cardPasantiaEs'; // Importa el componente de tarjetas
import InformationSection from '../components/InformationSection'; // Importa el componente de información
import axios from 'axios';

// Estilos del modal principal y del modal de éxito
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Pasantias() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false); // Modal de éxito
  const [titulo, setTitulo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen
  const [error, setError] = useState('');
  const [infoData, setInfoData] = useState(null); // Estado para la información de la sección

  // Cargar la información de la sección
  const fetchInformation = async () => {
    try {
      const response = await axios.get(`/src/servicios/informacionAPI.php?section=pasantias`);
      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        console.error('Error al cargar la información de pasantías.');
      }
    } catch (error) {
      console.error('Hubo un error al cargar la información:', error);
    }
  };

  // Cargar la información de la sección al montar el componente
  useEffect(() => {
    fetchInformation();
  }, []);

  // Cerrar el modal principal y limpiar los campos
  const handleClose = () => {
    setTitulo('');
    setDetalle('');
    setImagen(null); // Limpiar imagen
    setError('');
    setOpen(false);
  };

  // Cerrar el modal de éxito
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  // Manejar el cambio del input de imagen
  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Guardar el archivo seleccionado
  };

  // Manejar el envío de datos al backend
  const handleSubmit = async () => {
    if (!titulo || !detalle || !imagen) {
      setError('Por favor, complete todos los campos y suba una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('detalle', detalle);
    formData.append('imagen', imagen); // Añadir la imagen

    try {
      const response = await axios.post(
        'http://localhost/adm_ucb/src/servicios/agregarPasantia.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Importante para manejar archivos
          },
        }
      );

      if (response.data.success) {
        setSuccessOpen(true); // Mostrar el modal de éxito
      } else {
        setError('Hubo un problema al agregar la pasantía.');
      }
    } catch (error) {
      setError('Hubo un error al agregar la pasantía.');
    } finally {
      setTitulo('');
      setDetalle('');
      setImagen(null);
      setError('');
      handleClose(); // Cerrar el modal principal
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Sección de información */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={false} // Ajusta según sea necesario
          isEditable={false} // isAdmin es false, no permite edición
        />
      )}

      {/* Renderiza las tarjetas de pasantías */}
      <PasantiasCards />

      {/* Modal Principal para agregar Pasantía */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Agregar Nueva Pasantía</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextField
            label="Título"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Detalle"
            fullWidth
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Agregar
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de éxito */}
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <Box sx={style}>
          <h2>Pasantía Añadida Correctamente</h2>
          <Button variant="contained" color="primary" onClick={handleSuccessClose}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Pasantias;
