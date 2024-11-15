import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  const [error, setError] = useState('');

  // Abrir el modal principal
  const handleOpen = () => {
    setError('');
    setOpen(true);
  };

  // Cerrar el modal principal y limpiar los campos
  const handleClose = () => {
    setTitulo('');
    setDetalle('');
    setError('');
    setOpen(false);
  };

  // Cerrar el modal de éxito
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  // Manejar el envío de datos al backend
  const handleSubmit = async () => {
    if (!titulo || !detalle) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const data = { titulo, detalle };
    const formData = new URLSearchParams(data).toString();

    try {
      const response = await axios.post('http://localhost/adm_ucb/src/servicios/agregarPasantia.php', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

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
      setError('');
      handleClose(); // Cerrar el modal principal
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Página de Pasantías</h1>
      <p>Aquí se mostrarán detalles sobre las pasantías disponibles.</p>

      <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Fab color="secondary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Box>

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
