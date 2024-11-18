import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';

const PerfilUsuario = () => {
  const [user, setUser] = useState({
    nombre: '',
    emailadm: '',
    celular: 'No especificado',
    fechaRegistro: 'No disponible',
    emailContacto: 'No disponible',
    imagen: '', // Aseguramos que la imagen también esté incluida en el estado
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Función para obtener la foto de perfil del servidor
  const fetchFotoPerfil = async (emailAdm) => {
    try {
      const response = await fetch(`http://localhost/adm_ucb/src/servicios/buscar_foto.php?emailAdm=${emailAdm}`);
      const data = await response.json();
      console.log('Respuesta de la API:', data); // Verificar qué datos se reciben de la API
  
      if (data.success) {
        // Solo actualizamos la imagen si la URL es correcta
        setUser((prevState) => ({
          ...prevState,
          imagen: data.fotoperfil, // URL completa sin prefijos repetidos
        }));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
    }
  };
  
  

  // Cargar los datos del usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      try {
        const parsedUsuario = JSON.parse(storedUsuario);
        setUser({
          nombre: parsedUsuario.nombre || 'Usuario',
          emailadm: parsedUsuario.emailadm || 'Correo no disponible',
          celular: parsedUsuario.celular || 'No especificado',
          fechaRegistro: parsedUsuario.fecharegistro || 'No disponible',
          emailContacto: parsedUsuario.emailcontacto || 'No disponible',
          imagen: parsedUsuario.fotoperfil || '', // Aquí se asume que 'fotoperfil' es el campo correcto
        });

        // Llamar a la función para obtener la foto de perfil desde la API
        fetchFotoPerfil(parsedUsuario.emailadm);

      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
      }
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para manejar la selección de la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Función para subir la imagen
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append('foto', selectedImage);
      formData.append('emailAdm', user.emailadm);  // Asumiendo que el email es único para el usuario

      try {
        // Cambia la URL aquí a tu ruta correcta
        const response = await fetch('http://localhost/adm_ucb/src/servicios/Addperfil.php?action=subirFoto', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          alert(result.message);
          setUser((prevState) => ({
            ...prevState,
            imagen: result.rutaFoto, // Si la API devuelve la URL de la imagen
          }));

          // Actualiza localStorage con la nueva imagen
          const updatedUser = { ...user, imagen: result.rutaFoto };
          localStorage.setItem('usuario', JSON.stringify(updatedUser));
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen.');
      }
    } else {
      alert('Por favor, selecciona una imagen.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        height: '87vh',
        width: '99vw',
        padding: '20px',
        gap: 6,
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
          width: { xs: '100%', sm: '40%' },
        }}
      >
        <Avatar
          src={user.imagen ? user.imagen : 'https://via.placeholder.com/300'} // Imagen del usuario
          alt="Foto de perfil"
          sx={{
            width: { xs: '200px', sm: '300px' },
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
          variant="h3"
          sx={{ fontWeight: 'bold', color: '#216869', mb: 2 }}
        >
          {user.nombre}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Nombre: </strong>
          {user.nombre}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Email: </strong>
          {user.emailadm}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Celular: </strong>
          {user.celular}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Fecha de Registro: </strong>
          {user.fechaRegistro}
        </Typography>
        <Typography variant="h6" sx={{ margin: '10px 0', color: '#1F2421' }}>
          <strong>Email de Contacto: </strong>
          {user.emailContacto}
        </Typography>

        {/* Formulario para subir imagen */}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Subir Foto
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PerfilUsuario;
