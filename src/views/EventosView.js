import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CrearEvento from '../components/CrearEvento';
import ListaEventos from '../components/ListaEventos';
import EditarEvento from '../components/EditarEvento';
import InformationSection from '../components/InformationSection'; // Importa el componente de información
import axios from 'axios';
import Swal from 'sweetalert2';

const EventosView = ({ isAdmin = true }) => {
  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [reload, setReload] = useState(false); // Esto controla la recarga de la lista
  const [infoData, setInfoData] = useState(null); // Estado para la información de la sección

  // Cargar la información de la sección
  const fetchInformation = async () => {
    try {
      const response = await axios.get(`/src/servicios/informacionAPI.php?section=eventos`);
      if (response.data.status === 'success') {
        setInfoData(response.data.data);
      } else {
        console.error('Error al cargar la información de eventos.');
      }
    } catch (error) {
      console.error('Hubo un error al cargar la información:', error);
    }
  };

  // Actualizar la información de la sección
  const handleUpdateInformation = async (updatedData) => {
    try {
      const response = await axios.post('/src/servicios/informacionAPI.php', {
        section: 'eventos',
        content: updatedData,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada',
          text: 'La información se actualizó correctamente.',
          confirmButtonText: 'OK',
        });
        setInfoData(updatedData);
      } else {
        throw new Error('No se pudo actualizar la información.');
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la información.',
        confirmButtonText: 'OK',
      });
    }
  };

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
        const response = await axios.put(
          `http://localhost/adm_ucb/src/servicios/eventosAPI.php?action=changeState&idEvento=${idEvento}`
        );

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

  // Cargar la información al montar el componente
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Sección de información */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={false} // Cambiar según tu implementación
          isEditable={isAdmin} // Editable solo si es administrador
          onEdit={handleUpdateInformation}
        />
      )}

      <Typography variant="h3" align="center" gutterBottom>
        Gestión de Eventos
      </Typography>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleOpenCrear}>
          Crear Nuevo Evento
        </Button>
      </Box>
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
