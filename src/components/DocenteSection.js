import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import d1 from '../assets/JessicaLanza.jpg';
import d2 from '../assets/Jorgejung.jpg';
import d3 from '../assets/MabelAguirre.jpg';
import d4 from '../assets/SergioVillegas.jpg';

const DocenteSection = () => {
  const [docentes, setDocentes] = useState(() => {
    const storedDocentes = localStorage.getItem('docentes');
    return storedDocentes ? JSON.parse(storedDocentes) : [
      { id: 1, name: 'Jessica Lanza', image: d1, title: 'Directora de Carrera', email: 'jlanza@ucb.edu.bo' },
      { id: 2, name: 'Jorge Jung', image: d2, title: 'Docente Tiempo Completo', email: 'jjung@ucb.edu.bo' },
      { id: 3, name: 'Mabel Aguirre', image: d3, title: 'Docente Tiempo Completo', email: 'maguirre@ucb.edu.bo' },
      { id: 4, name: 'Sergio Villegas', image: d4, title: 'Docente Tiempo Completo', email: 'svillegas.r@ucb.edu.bo' },
    ];
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [currentDocente, setCurrentDocente] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const location = useLocation();

  const handleDialogOpen = () => {
    setCurrentDocente({ name: '', title: '', email: '', image: '' });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentDocente({});
  };

  const handleSave = () => {
    if (!currentDocente.name || !currentDocente.title || !currentDocente.email || !currentDocente.image) {
      alert('Todos los campos son obligatorios, incluida la imagen.');
      return;
    }

    if (isEditing) {
      setDocentes((prevDocentes) => {
        const updatedDocentes = prevDocentes.map((docente) => (docente.id === currentDocente.id ? currentDocente : docente));
        localStorage.setItem('docentes', JSON.stringify(updatedDocentes)); // Guardar en localStorage
        return updatedDocentes;
      });
    } else {
      const newDocente = { ...currentDocente, id: docentes.length + 1 };
      const updatedDocentes = [...docentes, newDocente];
      setDocentes(updatedDocentes);
      localStorage.setItem('docentes', JSON.stringify(updatedDocentes)); // Guardar en localStorage
    }

    handleDialogClose();
  };

  const handleEditClick = (docente) => {
    setCurrentDocente(docente);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id) => {
    const updatedDocentes = docentes.filter((docente) => docente.id !== id);
    setDocentes(updatedDocentes);
    localStorage.setItem('docentes', JSON.stringify(updatedDocentes)); // Guardar en localStorage
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentDocente((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAllExceptOriginals = () => {
    const originalDocentes = [
      { id: 1, name: 'Jessica Lanza', image: d1, title: 'Directora de Carrera', email: 'jlanza@ucb.edu.bo' },
      { id: 2, name: 'Jorge Jung', image: d2, title: 'Docente Tiempo Completo', email: 'jjung@ucb.edu.bo' },
      { id: 3, name: 'Mabel Aguirre', image: d3, title: 'Docente Tiempo Completo', email: 'maguirre@ucb.edu.bo' },
      { id: 4, name: 'Sergio Villegas', image: d4, title: 'Docente Tiempo Completo', email: 'svillegas.r@ucb.edu.bo' },
    ];

    const updatedDocentes = docentes.filter((docente) =>
      originalDocentes.some((original) => original.id === docente.id)
    );

    setDocentes(updatedDocentes);
    localStorage.setItem('docentes', JSON.stringify(updatedDocentes)); // Guardar en localStorage
  };

  return (
    <div style={{ marginTop: '20px' }} ref={ref}>
      <Typography variant="h4" gutterBottom align="center">
        Nuestros Docentes
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {docentes.map((docente) => (
          <Grid item key={docente.id} xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
              transition={{ delay: 0.3 * docente.id, duration: 1 }}
            >
              <Card
                sx={{
                  width: '60%', // Usar el 100% del espacio disponible
                  height: 200, // Altura ajustada
                  transition: 'width 0.3s ease, height 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    width: 320, // Ancho fijo al pasar el cursor
                    height: 400, // Tamaño mayor solo en hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={docente.image || 'placeholder-image.png'}
                  alt={docente.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">{docente.name}</Typography>
                  <Typography variant="body2" align="center">{docente.title}</Typography>
                  <Typography variant="body2" align="center">{docente.email}</Typography>
                </CardContent>
                {location.pathname === '/Editar' && (
                  <>
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(docente)}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(docente.id)}>
                      Eliminar
                    </Button>
                  </>
                )}
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {location.pathname === '/Editar' && (
        <>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={handleDialogOpen}
          >
            Agregar Docente
          </Button>
        </>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Editar Docente' : 'Agregar Docente'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            fullWidth
            value={currentDocente.name}
            onChange={(e) => setCurrentDocente({ ...currentDocente, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Título"
            fullWidth
            value={currentDocente.title}
            onChange={(e) => setCurrentDocente({ ...currentDocente, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={currentDocente.email}
            onChange={(e) => setCurrentDocente({ ...currentDocente, email: e.target.value })}
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Subir Imagen
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocenteSection;
