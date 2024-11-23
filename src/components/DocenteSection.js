import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Importamos motion
import { useInView } from 'react-intersection-observer'; // Importamos el hook

import d1 from '../assets/JessicaLanza.jpg';
import d2 from '../assets/Jorgejung.jpg';
import d3 from '../assets/MabelAguirre.jpg';
import d4 from '../assets/SergioVillegas.jpg';

const DocenteSection = () => {
  const docentes = [
    { id: 1, name: 'Jessica Lanza', image: d1, title: 'Directora de Carrera', email: 'jlanza@ucb.edu.bo' },
    { id: 2, name: 'Jorge Jung', image: d2, title: 'Docente Tiempo Completo', email: 'jjung@ucb.edu.bo' },
    { id: 3, name: 'Mabel Aguirre', image: d3, title: 'Docente Tiempo Completo', email: 'maguirre@ucb.edu.bo' },
    { id: 4, name: 'Sergio Villegas', image: d4, title: 'Docente Tiempo Completo', email: 'svillegas.r@ucb.edu.bo' },
  ];

  // Usamos el hook useInView para detectar cuando la sección está en el viewport
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo dispara la animación una vez cuando entra en el viewport
    threshold: 0.1, // El 10% de la sección debe estar visible para activar la animación
  });

  return (
    <div style={{ marginTop: '20px' }} ref={ref}>
      <Typography variant="h4" gutterBottom align="center">
        Nuestros Docentes
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {docentes.map((docente) => (
          <Grid item key={docente.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Empieza invisible y con desplazamiento hacia abajo
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // La animación depende de si está en vista
              transition={{ delay: 0.3 * docente.id, duration: 1 }} // Retarda la animación dependiendo del índice
            >
              <Card
                sx={{
                  width: 200,
                  height: 300,
                  transition: 'width 0.3s ease, height 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    width: 350,
                    height: 450,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={docente.image}
                  alt={docente.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">{docente.name}</Typography>
                  <Typography variant="body2" align="center">{docente.title}</Typography>
                  <Typography variant="body2" align="center">{docente.email}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DocenteSection;
