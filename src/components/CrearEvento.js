import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import axios from "axios";

const CrearEvento = ({ onClose, onEventoCreado }) => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [hora, setHora] = useState(null);
  const [enlaceRegistro, setEnlaceRegistro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFoto(acceptedFiles[0]);
      Swal.fire({
        title: "¡Foto subida!",
        text: "Se seleccionó correctamente la foto.",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const handleCrearEvento = async () => {
    if (!fechaInicio || !fechaFin || !hora || !enlaceRegistro || !descripcion) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!token || !usuario) {
        Swal.fire({
          title: "Error",
          text: "No tienes una sesión activa. Por favor, inicia sesión.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      let filePath = "";

      if (foto) {
        const formData = new FormData();
        formData.append("file", foto);

        const uploadResponse = await axios.post(
          "http://localhost/adm_ucb/src/servicios/subirArchivo.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadResponse.data.status === "success") {
          filePath = uploadResponse.data.filePath;
        } else {
          throw new Error("Error al subir la foto");
        }
      }

      const payload = {
        fechainicio: fechaInicio.format("YYYY-MM-DD"),
        fechafin: fechaFin.format("YYYY-MM-DD"),
        hora: hora.format("HH:mm:ss"), // Hora en formato correcto
        enlaceregistro: enlaceRegistro,
        descripcion,
        urlfotoevento: filePath,
        estado: true,
        usuario_emailAdm: usuario.emailadm,
      };

      console.log("Payload enviado a la API:", payload);

      await axios.post(
        "http://localhost/adm_ucb/src/servicios/eventosAPI.php",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onClose) {
        onClose();
      }

      Swal.fire({
        title: "Evento creado",
        text: "El evento se creó exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (onEventoCreado) {
        onEventoCreado();
      }
    } catch (error) {
      console.error("Error al crear evento:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear el evento.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Crear Evento
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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
          <Box
            {...getRootProps()}
            sx={{
              mt: 2,
              p: 2,
              border: "2px dashed gray",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {foto ? (
              <Typography variant="subtitle1">{foto.name}</Typography>
            ) : (
              <Typography variant="subtitle1">
                Arrastra una imagen o haz clic para seleccionarla
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleCrearEvento} variant="contained" color="primary">
          Crear Evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CrearEvento;
