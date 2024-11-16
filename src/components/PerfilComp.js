import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const PerfilUsuario = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        height: '87vh', // Ocupa toda la altura de la pantalla
        width: '99vw', // Ocupa todo el ancho de la pantalla
        padding: '20px',
        gap: 6, // Más espacio entre elementos
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        bgcolor: 'background.paper',
      }}
    >
      {/* Foto de perfil */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: { xs: '100%', sm: '40%' }, // Más espacio para la imagen
        }}
      >
        <Avatar
          src="" // Aquí se cargará la foto del usuario desde la API
          alt="Foto de perfil"
          sx={{
            width: { xs: '200px', sm: '300px' }, // Aumenta el tamaño del avatar
            height: { xs: '200px', sm: '300px' },
            border: '5px solid #49A078',
          }}
        />
      </Box>

      {/* Información del usuario */}
      <Box
        sx={{
          width: { xs: '100%', sm: '60%' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography
          variant="h3" // Tamaño de fuente más grande
          sx={{ fontWeight: 'bold', color: '#216869', mb: 2 }}
        >
          {/* Nombre y Apellido (aquí se cargarán los datos desde la API) */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Email: </strong>
          {/* Aquí se cargará el email */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Celular: </strong>
          {/* Aquí se cargará el celular */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Estado: </strong>
          {/* Aquí se cargará el estado */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Rol: </strong>
          {/* Aquí se cargará el rol */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Fecha de Registro: </strong>
          {/* Aquí se cargará la fecha de registro */}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Email de Contacto: </strong>
          {/* Aquí se cargará el email de contacto */}
        </Typography>
      </Box>
    </Box>
  );
};

export default PerfilUsuario;
