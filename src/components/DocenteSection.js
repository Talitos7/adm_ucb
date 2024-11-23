import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

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

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Nuestros Docentes
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {docentes.map((docente) => (
          <Grid item key={docente.id}>
            <Card
              sx={{
                width: 200, // Tamaño por defecto
                height: 300, // Altura por defecto
                transition: 'width 0.3s ease, height 0.3s ease', // Transición suave
                cursor: 'pointer',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.2)', // Sombra para el efecto atractivo
                '&:hover': {
                  width: 350, // Expande el ancho en hover
                  height: 450, // Expande la altura en hover
                },
              }}
            >
              <CardMedia
                component="img"
                height="250" // Ajuste de la altura de la imagen
                image={docente.image}
                alt={docente.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">{docente.name}</Typography>
                <Typography variant="body2" align="center">{docente.title}</Typography>
                <Typography variant="body2" align="center">{docente.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DocenteSection;
