import React, { useEffect, useState } from 'react';
import './Bienvenida.css';
import {
  Box,
} from "@mui/material";

function WelcomeSection() {
  const [user, setUser] = useState({ emailadm: '', nombre: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      try {
        const parsedUsuario = JSON.parse(storedUsuario); // Intenta analizarlo
        console.log('Datos del usuario:', parsedUsuario);
        setUser({
          emailadm: parsedUsuario.emailadm || 'Correo no disponible',
          nombre: parsedUsuario.nombre || 'Usuario',
        });

        // Llamar a la API para obtener la foto de perfil
        fetch(`http://localhost/adm_ucb/src/servicios/buscar_foto.php?emailAdm=${parsedUsuario.emailadm}`)
          .then(response => response.json())
          .then(data => {
            if (data.success && data.fotoperfil) {
              setImage(data.fotoperfil); // Establece la URL de la foto de perfil
            }
          })
          .catch(error => {
            console.error('Error al obtener la foto de perfil:', error);
          });

      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
      }
    }
  }, []);    

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Almacena la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="welcome-section"
    sx={{
      width: '100%',
      marginRight: 0,
      marginLeft: 0,
      background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
      minHeight: "100vh",
      padding: 4,
      position: "relative",
    }}>
      <div className="circle">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-upload"
          style={{ display: 'none' }} // Ocultamos el input real
        />
        <label htmlFor="image-upload">
          {/* Si hay imagen cargada, la mostramos; si no, mostramos la imagen desde la API o por defecto */}
          <img 
            src={image || 'https://via.placeholder.com/150'} 
            alt="User" 
            className="circle-image" 
          />
        </label>
      </div>
      <div className="welcome-text">
        <h1>Bienvenido</h1>
        <p>{user.nombre || 'Usuario'}</p>
        <p>{user.emailadm}</p>
      </div>
    </Box>
  );
}

export default WelcomeSection;
