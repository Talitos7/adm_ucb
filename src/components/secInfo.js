import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion'; // Importamos motion
import { useInView } from 'react-intersection-observer'; // Importamos useInView

// Importa las imágenes desde tu carpeta assets
import duracionImage from '../assets/calendar_8377332.png';
import areasEstudioImage from '../assets/clipboard_8358743.png';
import graduacionImage from '../assets/certificate_6360739.png';

function ActionAreaCard({ image, title, description }) {
  // Usamos useInView para detectar cuando la tarjeta entra en vista
  const { ref, inView } = useInView({
    triggerOnce: true, // Se activa solo una vez cuando la tarjeta entra en vista
    threshold: 0.3, // Activar cuando el 30% de la tarjeta esté visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }} // Comienza invisible y más pequeña
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }} // Aparece y crece hasta su tamaño original
      transition={{ duration: 0.60, ease: 'easeOut' }} // Duración más larga y suavizado en la transición
    >
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
            sx={{
              height: '90px', // Asegura que la altura sea proporcional
              width: '100%',  // Ajusta el ancho al 100% del contenedor
              objectFit: 'contain', // Ajusta la imagen para que se ajuste dentro del contenedor sin recortarla
            }}
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
    </motion.div>
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
