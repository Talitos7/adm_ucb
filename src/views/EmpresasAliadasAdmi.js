import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function EmpresasAliadasAdmi() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    imagenEmpresa: "",
    descripcionEmpresa: "",
    linkEmpresa: "",
  });

  // Fetch empresas
  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get(
        "http://localhost/adm_ucb/src/servicios/empresasAPI.php"
      );
      if (response.data.status === "success") {
        setEmpresas(response.data.data);
      } else {
        setError(response.data.message || "No hay empresas disponibles.");
      }
    } catch (err) {
      console.error("Error al conectar con la API:", err);
      setError("Error al conectar con la API.");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open dialog for creating or editing
  const openDialog = (empresa = null) => {
    setSelectedEmpresa(empresa);
    setFormData(
      empresa || {
        nombreEmpresa: "",
        imagenEmpresa: "",
        descripcionEmpresa: "",
        linkEmpresa: "",
      }
    );
    setDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedEmpresa(null);
  };

  // Create or update empresa
  const handleSave = async () => {
    try {
      if (selectedEmpresa) {
        // Update
        await axios.put(
          `http://localhost/adm_ucb/src/servicios/empresasAPI.php?idEmpresa=${selectedEmpresa.idEmpresa}`,
          formData
        );
      } else {
        // Create
        await axios.post(
          "http://localhost/adm_ucb/src/servicios/empresasAPI.php",
          formData
        );
      }
      fetchEmpresas();
      closeDialog();
    } catch (err) {
      console.error("Error al guardar la empresa:", err);
      setError("Error al guardar la empresa.");
    }
  };

  // Delete empresa
  const handleDelete = async (idEmpresa) => {
    try {
      await axios.delete(
        `http://localhost/adm_ucb/src/servicios/empresasAPI.php?idEmpresa=${idEmpresa}`
      );
      fetchEmpresas();
    } catch (err) {
      console.error("Error al eliminar la empresa:", err);
      setError("Error al eliminar la empresa.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Empresas Aliadas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openDialog()}
        sx={{ marginBottom: 2 }}
      >
        Añadir Empresa
      </Button>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        {empresas.map((empresa) => (
          <Grid item xs={12} sm={6} md={4} key={empresa.idEmpresa}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6">{empresa.nombreEmpresa}</Typography>
              <Typography variant="body2" color="text.secondary">
                {empresa.descripcionEmpresa}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openDialog(empresa)}
                sx={{ margin: 1 }}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(empresa.idEmpresa)}
                sx={{ margin: 1 }}
              >
                Eliminar
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {selectedEmpresa ? "Editar Empresa" : "Añadir Empresa"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="nombreEmpresa"
            label="Nombre de la Empresa"
            value={formData.nombreEmpresa}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="imagenEmpresa"
            label="URL de la Imagen"
            value={formData.imagenEmpresa}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="descripcionEmpresa"
            label="Descripción"
            value={formData.descripcionEmpresa}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="linkEmpresa"
            label="URL del Sitio Web"
            value={formData.linkEmpresa}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
