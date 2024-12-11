import React, { useState, useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import CrearEvento from '../components/CrearEvento';
import ListaEventos from '../components/ListarEventos2';
import EditarEvento from '../components/EditarEvento';
import InformationSection from '../components/InformationSection'; // Componente de información
import axios from 'axios';
import Swal from 'sweetalert2';

const EventosView = () => {
  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [reload, setReload] = useState(false); // Esto controla la recarga de la lista
  const [infoData, setInfoData] = useState(null); // Estado para la información de la sección

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

  // Cargar la información al montar el componente
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <Box className={`publications-container`}
    sx={{
      width: '100%',
      marginRight: 0,
      marginLeft: 0,
      background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
      minHeight: "100vh",
      padding: 4,
      position: "relative",
    }}>
      {/* Sección de información */}
      {infoData && (
        <InformationSection
          data={infoData}
          darkMode={false} // Ajusta según sea necesario
          isEditable={false} // No editable ya que el administrador es false
        />
      )}

      {/* Lista de eventos */}
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
