import * as React from 'react';
import { Grid, Avatar, Paper, Typography, Box, Container, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Imágenes predeterminadas
import duracionImage from '../assets/calendar_8377332.png';
import areasEstudioImage from '../assets/clipboard_8358743.png';
import graduacionImage from '../assets/certificate_6360739.png';

// Componente de Tarjetas
function ActionAreaCard({ image, title, description, editable, onTitleChange, onDescriptionChange, onImageChange }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 3,
          borderRadius: '16px',
          border: '2px solid #e0e0e0',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.08)',
            borderColor: '#00796b',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Avatar
          src={image}
          alt={title}
          sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '16px' }}
        />
        <Box sx={{ textAlign: 'left', flex: 1 }}>
          {editable ? (
            <>
              <TextField
                label="Título"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Cambiar Imagen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onImageChange(e.target.files[0])}
                />
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Array.isArray(description)
                  ? description.map((item, index) => <li key={index}>{item}</li>)
                  : description}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}

// Componente Principal
export default function CardSection() {
  const [editable, setEditable] = React.useState(false);
  const [cardsData, setCardsData] = React.useState(() => {
    const savedData = localStorage.getItem('cardsData');
    return savedData
      ? JSON.parse(savedData)
      : [
          { image: duracionImage, title: 'Duración de la Carrera', description: '9 Semestres' },
          {
            image: areasEstudioImage,
            title: 'Áreas de Estudio',
            description: [
              'Gestión Empresarial',
              'Emprendimientos y Proyectos',
              'Recursos Humanos',
              'Finanzas',
              'Marketing',
              'Operaciones',
            ],
          },
          {
            image: graduacionImage,
            title: 'Modalidades de Graduación',
            description: [
              'Graduación por excelencia',
              'Tesis de grado',
              'Trabajo dirigido',
              'Proyecto de grado',
              'Plan de negocio',
            ],
          },
        ];
  });

  React.useEffect(() => {
    setEditable(window.location.pathname === '/Editar');
  }, []);

  const handleTitleChange = (index, newTitle) => {
    const updatedCards = [...cardsData];
    updatedCards[index].title = newTitle;
    setCardsData(updatedCards);
  };

  const handleDescriptionChange = (index, newDescription) => {
    const updatedCards = [...cardsData];
    updatedCards[index].description = newDescription;
    setCardsData(updatedCards);
  };

  const handleImageChange = (index, newImage) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedCards = [...cardsData];
      updatedCards[index].image = e.target.result;
      setCardsData(updatedCards);
    };
    reader.readAsDataURL(newImage);
  };

  const handleAddCard = () => {
    const newCard = {
      image: '',
      title: 'Nuevo Título',
      description: 'Nueva Descripción',
    };
    setCardsData([...cardsData, newCard]);
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cardsData.filter((_, i) => i !== index);
    setCardsData(updatedCards);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
    alert('Cambios guardados exitosamente.');
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {cardsData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ActionAreaCard
              image={card.image}
              title={card.title}
              description={Array.isArray(card.description) ? card.description.join('\n') : card.description}
              editable={editable}
              onTitleChange={(newTitle) => handleTitleChange(index, newTitle)}
              onDescriptionChange={(newDescription) => handleDescriptionChange(index, newDescription)}
              onImageChange={(newImage) => handleImageChange(index, newImage)}
            />
            {editable && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveCard(index)}
                fullWidth
                sx={{ marginTop: 1 }}
              >
                Eliminar Tarjeta
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
      {editable && (
        <Box textAlign="center" sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={handleAddCard} sx={{ marginRight: 2 }}>
            Agregar Tarjeta
          </Button>
          <Button variant="contained" color="success" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Box>
      )}
    </Container>
  );
}
