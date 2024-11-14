import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

import d1 from '../assets/JessicaLanza.jpg';
import d2 from '../assets/Jorgejung.jpg';
import d3 from '../assets/MabelAguirre.jpg';
import d4 from '../assets/SergioVillegas.jpg';

const DocenteSection = () => {
  // Estado para controlar la expansión de las tarjetas.
  const [expanded, setExpanded] = useState(1);

  const docentes = [
    { id: 1, name: 'Jessica Lanza', image: d1, title: 'Directora de Carrera', email: 'jlanza@ucb.edu.bo' },
    { id: 2, name: 'Jorge Jung', image: d2, title: 'Docente Tiempo Completo', email: 'jjung@ucb.edu.bo' },
    { id: 3, name: 'Mabel Aguirre', image: d3, title: 'Docente Tiempo Completo', email: 'maguirre@ucb.edu.bo' },
    { id: 4, name: 'Sergio Villegas', image: d4, title: 'Docente Tiempo Completo', email: 'svillegas.r@ucb.edu.bo' },
  ];

  const handleCardClick = (id) => {
    setExpanded(expanded === id ? null : id); 
  };

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
                width: expanded === docente.id ? 350 : 200, // Mayor tamaño cuando está expandido, más pequeño por defecto
                height: expanded === docente.id ? 450 : 300, // Aumento de la altura cuando se expande
                transition: 'width 0.3s ease, height 0.3s ease', // Transición suave para ambos
                cursor: 'pointer',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.2)', // Sombras para un efecto más atractivo
              }}
              onClick={() => handleCardClick(docente.id)}
            >
              <CardMedia
                component="img"
                height="250" // Aumento de la altura de la imagen
                image={docente.image}
                alt={docente.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">{docente.name}</Typography>
                {expanded === docente.id && ( // Mostrar información cuando la tarjeta esté expandida
                  <div>
                    <Typography variant="body2" align="center">{docente.title}</Typography>
                    <Typography variant="body2" align="center">{docente.email}</Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DocenteSection;
