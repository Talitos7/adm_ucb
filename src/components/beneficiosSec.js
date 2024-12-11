import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea, Container, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion'; 
import { useInView } from 'react-intersection-observer'; 

// Importa las imágenes
import image1 from '../assets/ADM-21x145-copia.jpg'; 
import image2 from '../assets/logo-sub.jpg'; 

function ActionAreaCard({ image, title, description, isImageOnly }) {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card
        sx={{
          maxWidth: 345,
          '&:hover': {
            transform: 'scale(1.05)', 
            transition: 'transform 0.3s ease-in-out', 
          },
          borderRadius: '16px',
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
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const isEditable = window.location.pathname === '/Editar';

  const storedBeneficios = JSON.parse(localStorage.getItem('beneficios')) || [
    'Acreditada por el Sistema de la Universidad Boliviana SUB.',
    'Laboratorio de Simulación de Negocios.',
    'Enfoque en innovación empresarial y liderazgo empresarial.',
    'Talleres y conferencias con docentes internacionales.',
    'Formación con valores y principios éticos.',
    'Doble titulación con la Universidad Católica de Salta UCASAL.',
  ];

  const [beneficios, setBeneficios] = React.useState(storedBeneficios); 
  const [nuevoBeneficio, setNuevoBeneficio] = React.useState('');

  const handleAddBeneficio = () => {
    if (nuevoBeneficio.trim()) { 
      const updatedBeneficios = [...beneficios, nuevoBeneficio];
      setBeneficios(updatedBeneficios);
      localStorage.setItem('beneficios', JSON.stringify(updatedBeneficios)); 
      setNuevoBeneficio(''); 
    }
  };

  const handleRemoveBeneficio = (index) => {
    const newBeneficios = beneficios.filter((_, i) => i !== index);
    setBeneficios(newBeneficios);
    localStorage.setItem('beneficios', JSON.stringify(newBeneficios)); 
  };

  return (
    <Container sx={{ marginBottom: 5, background: 'rgba(0, 0, 0, 0)' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center', 
          gap: 4, // Espaciado entre los elementos
        }}
      >
        <Box sx={{ flex: '1', maxWidth: '350px' }}> {/* Tarjeta ajustada */}
          <ActionAreaCard
            image={image2}
            title="Beneficios de estudiar esta carrera en la U.C.B."
            description={
              <ul>
                {beneficios.map((beneficio, index) => (
                  <li key={index}>
                    {beneficio}{' '}
                    {isEditable && (
                      <button onClick={() => handleRemoveBeneficio(index)}>Eliminar</button>
                    )}
                  </li>
                ))}
              </ul>
            }
            isImageOnly={false}
          />
          {isEditable && (
            <Box mt={2}>
              <TextField
                label="Nuevo Beneficio"
                variant="outlined"
                value={nuevoBeneficio}
                onChange={(e) => setNuevoBeneficio(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2}}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBeneficio}
                fullWidth
              >
                Agregar Beneficio
              </Button>
            </Box>
          )}
        </Box>

        <motion.div
          ref={imgRef}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: imgInView ? 0 : 100, opacity: imgInView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={image1}
            alt="Imagen fuera de la card"
            style={{
              width: '120%', // Más grande y responsivo
              maxWidth: '1000px', // Mayor ancho para pantallas grandes
              height: 'auto', 
              borderRadius: '12px',
            }}
          />
        </motion.div>
      </Box>
    </Container>
  );
}
