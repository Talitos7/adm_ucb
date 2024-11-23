import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea, Container } from '@mui/material';

// Importa las imágenes desde tu carpeta assets
import image1 from '../assets/ADM-21x145-copia.jpg';  // Cambia la ruta a tu imagen
import image2 from '../assets/logo-sub.jpg';  // Cambia la ruta a tu imagen

// Componente para las tarjetas
function ActionAreaCard({ image, title, description, isImageOnly }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        '&:hover': {
          transform: 'scale(1.05)',  // Aumenta el tamaño de la tarjeta al pasar el mouse
          transition: 'transform 0.3s ease-in-out', // Suaviza la animación
        },
        margin: '10px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
        />
        {!isImageOnly && (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
}

export default function CardSection() {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Mueve la tarjeta más a la izquierda
          flexWrap: 'wrap', // Asegura que las tarjetas se acomoden en la pantalla
          alignItems: 'center', // Alinea las tarjetas verticalmente
        }}
      >
        {/* Contenedor para la tarjeta y la imagen */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Tarjeta con imagen y texto (izquierda) */}
          <ActionAreaCard
            image={image2}
            title="Beneficios de estudiar esta carrera en la U.C.B."
            description={
              <>
                <ul>
                  <li>Acreditada por el Sistema de la Universidad Boliviana SUB.</li>
                  <li>Laboratorio de Simulación de Negocios.</li>
                  <li>Enfoque en innovación empresarial y liderazgo empresarial.</li>
                  <li>Talleres y conferencias con docentes internacionales.</li>
                  <li>Formación con valores y principios éticos.</li>
                  <li>Doble titulación con la Universidad Católica de Salta UCASAL.</li>
                </ul>
              </>
            }
            isImageOnly={false} // Tarjeta con imagen y texto
          />
          {/* Imagen fuera de la tarjeta (a la derecha) */}
          <Box sx={{ marginLeft: '20px' }}>
            <img
              src={image1}
              alt="Imagen fuera de la card"
              style={{ width: '800px', height: 'auto' }} // Hacemos la imagen más grande
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
