import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

export default function EmpresasAliadasAdmin() {
    const [empresas, setEmpresas] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombreempresa: "",
        imagenempresa: "",
        descripcionempresa: "",
        linkempresa: "",
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Define fetchEmpresas usando useCallback
    const fetchEmpresas = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost/adm_ucb/src/servicios/empresasAPI.php"
            );
            if (response.data.status === "success") {
                setEmpresas(response.data.data);
            } else {
                handleError(response.data.message || "No hay empresas disponibles.");
            }
        } catch (err) {
            console.error("Error al conectar con la API:", err);
            handleError("Error al conectar con la API.");
        }
    }, []); // Dependencias vacías ya que no depende de nada externo que pueda cambiar

    useEffect(() => {
        fetchEmpresas();
    }, [fetchEmpresas]); // Ahora podemos añadir fetchEmpresas como dependencia

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [previewImage, setPreviewImage] = useState(null);
    const [fileName, setFileName] = useState(""); // Nombre del archivo cargado

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagenempresa: file });
    
        if (file) {
          setFileName(file.name); // Guardar el nombre del archivo
          const reader = new FileReader();
          reader.onloadend = () => setPreviewImage(reader.result);
          reader.readAsDataURL(file);
        }
    };
    
    const handleRemoveImage = () => {
        setFormData({ ...formData, imagenempresa: null });
        setPreviewImage(null);
        setFileName(""); // Limpiar el nombre del archivo
    };

    const openDialog = (empresa = null) => {
        setSelectedEmpresa(empresa);
        setFormData(
            empresa || {
                nombreempresa: "",
                imagenempresa: "",
                descripcionempresa: "",
                linkempresa: "",
            }
        );
    
        if (empresa && empresa.imagenempresa) {
            // Mostrar la imagen actual como vista previa
            const imageUrl = `http://localhost/adm_ucb/src/servicios/uploadsEmpresas/${empresa.imagenempresa}`;
            setPreviewImage(imageUrl);
            setFileName(empresa.imagenempresa); // Configurar el nombre del archivo existente
        } else {
            setPreviewImage(null);
            setFileName(""); // Resetear el nombre del archivo
        }
    
        setDialogOpen(true);
    };       

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedEmpresa(null);
        setFormData({
            nombreempresa: "",
            imagenempresa: null,
            descripcionempresa: "",
            linkempresa: "",
        });
        setPreviewImage(null); // Restablecer la vista previa de la imagen
    };    

    const handleCreateEmpresa = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nombreempresa", formData.nombreempresa);
            formDataToSend.append("descripcionempresa", formData.descripcionempresa);
            formDataToSend.append("linkempresa", formData.linkempresa);
    
            if (formData.imagenempresa instanceof File) {
                formDataToSend.append("imagenempresa", formData.imagenempresa);
            }
    
            await axios.post(
                "http://localhost/adm_ucb/src/servicios/empresasAPI.php",
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            handleSuccess("Empresa creada con éxito.");
            fetchEmpresas();
            closeDialog();
        } catch (err) {
            console.error("Error al crear la empresa:", err.message);
            handleError("Error al crear la empresa.");
        }
    };

    const handleUpdateEmpresa = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nombreempresa", formData.nombreempresa);
            formDataToSend.append("descripcionempresa", formData.descripcionempresa);
            formDataToSend.append("linkempresa", formData.linkempresa);
    
            if (formData.imagenempresa instanceof File) {
                formDataToSend.append("imagenempresa", formData.imagenempresa);
            }

            if (!formData.nombreempresa || !formData.descripcionempresa || !formData.linkempresa || !formData.imagenempresa) {
                handleError("Todos los campos son obligatorios.");
                return;
            }
    
            await axios.post(
                `http://localhost/adm_ucb/src/servicios/empresasAPI.php?idempresa=${selectedEmpresa.idempresa}`,
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            handleSuccess("Empresa actualizada con éxito.");
            fetchEmpresas();
            closeDialog();
        } catch (err) {
            console.error("Error al actualizar la empresa:", err.message);
            handleError("Error al actualizar la empresa.");
        }
    };    

    const handleSave = () => {
        if (!formData.nombreempresa || !formData.descripcionempresa || !formData.linkempresa) {
            handleError("Todos los campos son obligatorios.");
            return;
        }
    
        if (!selectedEmpresa && !formData.imagenempresa) {
            handleError("Es obligatorio cargar una imagen al crear una empresa.");
            return;
        }
    
        if (selectedEmpresa) {
            handleUpdateEmpresa();
        } else {
            handleCreateEmpresa();
        }
    };   

    const handleDelete = async (idempresa) => {
        try {
            await axios.delete(
                `http://localhost/adm_ucb/src/servicios/empresasAPI.php?idempresa=${idempresa}`
            );
            handleSuccess("Empresa eliminada con éxito.");
            fetchEmpresas();
        } catch (err) {
            console.error("Error al eliminar la empresa:", err.message);
            handleError("Error al eliminar la empresa.");
        }
    };

    const handleError = (message) => {
        setError(message);
        setOpenSnackbar(true);
    };

    const handleSuccess = (message) => {
        setSuccess(message);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
        sx={{
            background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
            minHeight: "100vh",
            padding: 4,
            position: "relative",
        }}
        >
        <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ maxWidth: "1200px", margin: "0 auto" }}
        >
            {empresas.map((empresa) => (
            <Grid item xs={12} sm={6} md={4} key={empresa.idempresa}>
                <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 3,
                    borderRadius: "16px",
                    border: "2px solid #e0e0e0",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                    transform: "scale(1.08)",
                    borderColor: "#00796b",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                }}
                >
                <Avatar
                    src={`http://localhost/adm_ucb/src/servicios/uploadsEmpresas/${empresa.imagenempresa}?${Date.now()}`}
                    alt={empresa.nombreempresa}
                    sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h6" gutterBottom>
                    {empresa.nombreempresa}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {empresa.descripcionempresa}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Fab
                    color="secondary"
                    size="small"
                    aria-label="edit"
                    onClick={() => openDialog(empresa)}
                    sx={{ marginRight: 1 }}
                    >
                    <EditIcon />
                    </Fab>
                    <Fab
                    color="error"
                    size="small"
                    aria-label="delete"
                    onClick={() => handleDelete(empresa.idempresa)}
                    >
                    <DeleteIcon />
                    </Fab>
                </Box>
                </Paper>
            </Grid>
            ))}
        </Grid>

        <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>
            {selectedEmpresa ? "Editar Empresa" : "Añadir Empresa"}
            </DialogTitle>
            <DialogContent>
            <TextField
                fullWidth
                margin="dense"
                name="nombreempresa"
                label="Nombre de la Empresa"
                value={formData.nombreempresa}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                margin="dense"
                name="descripcionempresa"
                label="Descripción"
                value={formData.descripcionempresa}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                margin="dense"
                name="linkempresa"
                label="URL del Sitio Web"
                value={formData.linkempresa}
                onChange={handleInputChange}
            />
            <Box sx={{ mt: 2 }}>
                {previewImage && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                            justifyContent: "space-between", // Distribución uniforme
                            marginLeft: "30px",
                            marginRight: "30px",
                        }}
                    >
                        <Avatar
                            src={previewImage}
                            alt="Vista previa"
                            sx={{ width: 80, height: 80 }}
                        />
                        <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                            {fileName}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleRemoveImage}
                            sx={{ alignSelf: "flex-end" }}
                        >
                            Eliminar
                        </Button>
                    </Box>
                )}

                {!previewImage && (
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                        sx={{ mt: 1 }}
                    >
                        Cargar Imagen
                        <input
                            type="file"
                            name="imagenempresa"
                            accept="image/*"
                            onChange={handleFileChange}
                            hidden
                        />
                    </Button>
                )}
            </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                    justifyContent: "space-between", // Distribución uniforme
                    margin: "30px",
                }}
            >
                <Button
                onClick={closeDialog}
                variant="contained"
                color="error"
                startIcon={<ClearIcon />}
                sx={{ alignSelf: "flex-start" }}
                >
                    Cancelar
                </Button>
                <Button
                id = "btnActualizar"
                onClick={handleSave}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                >
                    Guardar
                </Button>
            </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => openDialog()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          onClose={handleCloseSnackbar}
        >
          <AlertTitle>{error ? "Error" : "Éxito"}</AlertTitle>
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
