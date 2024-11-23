import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// Importa las imágenes desde tu carpeta assets
import duracionImage from '../assets/duracion.png';
import areasEstudioImage from '../assets/planestudio.png';
import graduacionImage from '../assets/grad.jpg';

function ActionAreaCard({ image, title, description }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        '&:hover': {
          transform: 'scale(1.05)',  // Aumenta el tamaño de la tarjeta al pasar el mouse
          transition: 'transform 0.3s ease-in-out', // Suaviza la animación
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function CardSection() {
  const cardData = [
    {
      image: duracionImage,
      title: 'Duración de la Carrera',
      description: '9 Semestres',
    },
    {
      image: areasEstudioImage,
      title: 'Áreas de Estudio',
      description: (
        <>
          <ul>
            <li>Gestión Empresarial</li>
            <li>Emprendimientos y Proyectos</li>
            <li>Recursos Humanos</li>
            <li>Finanzas</li>
            <li>Marketing</li>
            <li>Operaciones</li>
          </ul>
        </>
      ),
    },
    {
      image: graduacionImage,
      title: 'Modalidades de Graduación',
      description: (
        <>
          <ul>
            <li>Graduación por excelencia</li>
            <li>Tesis de grado</li>
            <li>Trabajo dirigido</li>
            <li>Proyecto de grado</li>
            <li>Plan de negocio</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Container sx={{ paddingY: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ActionAreaCard
              image={card.image}
              title={card.title}
              description={card.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
