import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Divider,
  Chip,
  Fab,
  Modal,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListaEventos from '../components/ListaEventos';
import CrearEvento from '../components/CrearEvento';
import EditarEvento from '../components/EditarEvento';

const EventosView = ({ darkMode, isAdmin }) => {
  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [reload, setReload] = useState(false);

  const handleOpenCrear = () => setOpenCrear(true);
  const handleCloseCrear = () => setOpenCrear(false);

  const handleOpenEditar = (evento) => {
    setEventoSeleccionado(evento);
    setOpenEditar(true);
  };

  const handleCloseEditar = () => {
    setEventoSeleccionado(null);
    setOpenEditar(false);
  };

  const handleEliminar = async (idEvento) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este evento será deshabilitado y no estará visible para los usuarios.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deshabilitar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.put(
          `http://localhost/adm_ucb/src/servicios/eventosAPI.php?action=changeState&idEvento=${idEvento}`
        );

        Swal.fire({
          title: 'Deshabilitado',
          text: 'El evento ha sido deshabilitado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setReload(!reload);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al intentar deshabilitar el evento.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        handleCloseEditar();
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: 4,
        background: 'linear-gradient(135deg, #0e7f99 30%, #122e63 100%)',
      }}
      className={`eventos-container ${darkMode ? 'dark-mode' : ''}`}
    >

<Divider variant="middle"
        sx={{
          '&::before, &::after': {
            borderTopWidth: '2px', // Grosor de la línea
            borderColor: '#fff',   // Color de la línea
          },
        }}
        aria-hidden="true"
      >
        <Chip
          label="Eventos"
          size="medium"
          sx={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
          }}
        />
      </Divider>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenCrear}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      <ListaEventos
        onEditar={handleOpenEditar}
        onEliminar={handleEliminar}
        reload={reload}
      />

      <Modal open={openCrear} onClose={handleCloseCrear}>
        <Box
          sx={{
            mt: 5,
            mx: 'auto',
            p: 3,
            width: 3,
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <CrearEvento
            onEventoCreado={() => {
              setReload(!reload);
              handleCloseCrear();
            }}
            onClose={handleCloseCrear}
          />
        </Box>
      </Modal>

      <Modal open={openEditar} onClose={handleCloseEditar}>
        <Box
          sx={{
            mt: 5,
            mx: 'auto',
            p: 3,
            width: 3,
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {eventoSeleccionado && (
            <EditarEvento
              evento={eventoSeleccionado}
              onEventoActualizado={() => {
                setReload(!reload);
                handleCloseEditar();
              }}
              onClose={handleCloseEditar}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default EventosView;