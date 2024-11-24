import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Container, TextField, Button } from '@mui/material';
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

  // Función para transformar la descripción (si es JSX) en texto
  const renderDescription = () => {
    if (React.isValidElement(description)) {
      return description;
    } else {
      if (editable) {
        return (
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        );
      } else {
        // Si la descripción contiene guiones, los convertimos en lista <ul>
        const descriptionContent = description.split('\n').map((line, index) => {
          if (line.startsWith('-')) {
            return <li key={index}>{line.replace('-', '').trim()}</li>;
          }
          return <p key={index}>{line}</p>;
        });

        return <ul>{descriptionContent}</ul>;
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
      transition={{ duration: 0.60, ease: 'easeOut' }}
    >
      <Card sx={{ maxWidth: 345, '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' } }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{
              height: '90px',
              width: '100%',
              objectFit: 'contain',
            }}
            image={image}
            alt={title}
          />
          <CardContent>
            {editable ? (
              <TextField
                label="Título"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            )}
            {renderDescription()}
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default function CardSection() {
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    if (window.location.pathname === '/Editar') {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [window.location.pathname]);

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
