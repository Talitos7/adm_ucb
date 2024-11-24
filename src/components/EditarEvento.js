import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import axios from 'axios';

const EditarEvento = ({ evento, onClose, onEventoActualizado }) => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [hora, setHora] = useState(null);
  const [enlaceRegistro, setEnlaceRegistro] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(true); // Valor booleano
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    if (evento) {
      setFechaInicio(evento.fechainicio ? dayjs(evento.fechainicio) : null);
      setFechaFin(evento.fechafin ? dayjs(evento.fechafin) : null);
      setHora(evento.hora ? dayjs(evento.hora) : null);
      setEnlaceRegistro(evento.enlaceregistro || '');
      setDescripcion(evento.descripcion || '');
      setEstado(evento.estado);
      setFotoPreview(evento.urlfotoevento || null);
    }
  }, [evento]);

  const handleEditarEvento = async () => {
    try {
      const token = localStorage.getItem('token');

      // Subir foto si hay una seleccionada
      let fotoPath = evento.urlfotoevento; // Mantener la URL actual si no hay nueva foto
      if (foto) {
        const formData = new FormData();
        formData.append('file', foto);

        const uploadResponse = await axios.post(
          'http://localhost/adm_ucb/src/servicios/subirArchivo.php',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadResponse.data.status === 'success') {
          fotoPath = uploadResponse.data.filePath;
        } else {
          throw new Error('Error al subir la foto');
        }
      }

      // Actualizar el evento
      await axios.put(
        `http://localhost/adm_ucb/src/servicios/eventosAPI.php?idEvento=${evento.idevento}`,
        {
          fechainicio: fechaInicio ? fechaInicio.format('YYYY-MM-DD') : '',
          fechafin: fechaFin ? fechaFin.format('YYYY-MM-DD') : '',
          hora: hora ? `${fechaInicio.format('YYYY-MM-DD')} ${hora.format('HH:mm:ss')}` : '',
          enlaceregistro: enlaceRegistro,
          descripcion,
          estado,
          urlfotoevento: fotoPath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: 'Evento actualizado',
        text: 'El evento se actualizó correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        onEventoActualizado();
        onClose(); // Cierra el componente después de la confirmación
      });
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el evento.',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        onClose(); // Cierra el componente incluso si hay error
      });
    }
  };

  const handleFotoChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Editar Evento
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(date) => setFechaInicio(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="Fecha Fin"
              value={fechaFin}
              onChange={(date) => setFechaFin(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <TimePicker
              label="Hora"
              value={hora}
              onChange={(time) => setHora(time)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
          <TextField
            label="Enlace de Registro"
            fullWidth
            margin="normal"
            value={enlaceRegistro}
            onChange={(e) => setEnlaceRegistro(e.target.value)}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Subir Foto del Evento
          </Typography>
          <Box
            sx={{
              border: '2px dashed gray',
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
              position: 'relative',
              borderRadius: '8px',
              backgroundColor: fotoPreview ? '#f5f5f5' : 'transparent',
            }}
          >
            {fotoPreview && (
              <img
                src={`http://localhost/adm_ucb/src/${fotoPreview}`}
                alt="Vista previa"
                style={{ maxHeight: '200px', marginBottom: '10px', objectFit: 'contain' }}
              />
            )}
            <Input type="file" fullWidth onChange={handleFotoChange} sx={{ display: 'none' }} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleEditarEvento} variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarEvento;
