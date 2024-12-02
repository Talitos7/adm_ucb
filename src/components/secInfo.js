import * as React from 'react';
import { Grid, Avatar, Paper, Typography, Box, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Imágenes importadas
import duracionImage from '../assets/calendar_8377332.png';
import areasEstudioImage from '../assets/clipboard_8358743.png';
import graduacionImage from '../assets/certificate_6360739.png';

function ActionAreaCard({ image, title, description, editable, onTitleChange, onDescriptionChange }) {
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
          sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '16px',}}
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Array.isArray(description)
              ? description.map((item, index) => <li key={index}>{item}</li>)
              : description}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
}

export default function CardSection() {
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    setEditable(window.location.pathname === '/Editar');
  }, []);  

  const loadCardsData = () => {
    const savedData = localStorage.getItem('cardsData');
    return savedData ? JSON.parse(savedData) : [
      {
        image: duracionImage,
        title: 'Duración de la Carrera',
        description: '9 Semestres',
      },
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
  };

  const [cardsData, setCardsData] = React.useState(loadCardsData);

  // Función para manejar los cambios en el título
  const handleTitleChange = (index, newTitle) => {
    const newCardsData = [...cardsData];
    newCardsData[index].title = newTitle;
    setCardsData(newCardsData);
  };

  // Función para manejar los cambios en la descripción
  const handleDescriptionChange = (index, newDescription) => {
    const newCardsData = [...cardsData];

    // Reemplazar guiones con saltos de línea y convertir en lista <ul>
    const formattedDescription = newDescription.split('-').join('\n').trim();

    if (Array.isArray(newCardsData[index].description)) {
      newCardsData[index].description = formattedDescription.split('\n');
    } else {
      newCardsData[index].description = formattedDescription.split('\n');
    }

    setCardsData(newCardsData);
  };

  const handleSaveChanges = () => {
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
    console.log('Cambios guardados', cardsData);
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
            />
          </Grid>
        ))}
      </Grid>
      {editable && (
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      )}
    </Container>
  );
}
