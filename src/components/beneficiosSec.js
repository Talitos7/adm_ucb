import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea, Container } from '@mui/material';
import { motion } from 'framer-motion';  // Importamos motion para las animaciones
import { useInView } from 'react-intersection-observer'; // Importamos useInView para detectar el scroll

// Importa las imágenes desde tu carpeta assets
import image1 from '../assets/ADM-21x145-copia.jpg';  // Cambia la ruta a tu imagen
import image2 from '../assets/logo-sub.jpg';  // Cambia la ruta a tu imagen

// Componente para las tarjetas
function ActionAreaCard({ image, title, description, isImageOnly }) {
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
      transition={{ duration: 0.8, ease: 'easeOut' }} // Duración más larga y suavizado en la transición
    >
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
    </motion.div>
  );
}

export default function CardSection() {
  // Usamos useInView para animar la imagen al entrar en la vista
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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
          <motion.div
            ref={imgRef}
            initial={{ x: 100, opacity: 0 }} // Comienza desde la derecha (100px) y es invisible
            animate={{ x: imgInView ? 0 : 100, opacity: imgInView ? 1 : 0 }} // Se mueve hacia la izquierda y se hace visible
            transition={{ duration: 0.8, ease: 'easeOut' }} // Animación suave
          >
            <img
              src={image1}
              alt="Imagen fuera de la card"
              style={{ width: '800px', height: 'auto' }} // Hacemos la imagen más grande
            />
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}
