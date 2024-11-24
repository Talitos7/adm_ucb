import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CrearEvento from '../components/CrearEvento';
import ListaEventos from '../components/ListaEventos';
import EditarEvento from '../components/EditarEvento';
import axios from 'axios';
import Swal from 'sweetalert2';

const EventosView = () => {
  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [reload, setReload] = useState(false); // Esto controla la recarga de la lista

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
        console.log('ID del evento enviado:', idEvento); // Depuración en consola
        const response = await axios.put(
          `http://localhost/adm_ucb/src/servicios/eventosAPI.php?action=changeState&idEvento=${idEvento}`
        );

        console.log('Respuesta del backend:', response.data); // Depuración en consola

        Swal.fire({
          title: 'Deshabilitado',
          text: 'El evento ha sido deshabilitado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setReload(!reload); // Recargar la lista después de deshabilitar
      } catch (error) {
        console.error('Error al deshabilitar el evento:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al intentar deshabilitar el evento.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        handleCloseEditar(); // Cerrar el modal después del intento de eliminación
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Nuevos Eventos
      </Typography>
      <ListaEventos
        onEditar={handleOpenEditar}
        onEliminar={handleEliminar}
        reload={reload} // Esto se utiliza para notificar a la lista de cambios
      />

      {/* Modal para Crear Evento */}
      <Modal open={openCrear} onClose={handleCloseCrear}>
        <Box
          sx={{
            mt: 5,
            mx: 'auto',
            p: 3,
            width: { xs: '90%', md: '50%' },
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <CrearEvento
            onEventoCreado={() => {
              setReload(!reload); // Actualizar la lista
              handleCloseCrear(); // Cerrar modal
            }}
            onClose={handleCloseCrear}
          />
        </Box>
      </Modal>

      {/* Modal para Editar Evento */}
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <Box
          sx={{
            mt: 5,
            mx: 'auto',
            p: 3,
            width: { xs: '90%', md: '50%' },
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {eventoSeleccionado && (
            <EditarEvento
              evento={eventoSeleccionado}
              onEventoActualizado={() => {
                setReload(!reload); // Recargar la lista después de editar
                handleCloseEditar(); // Cerrar modal
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
