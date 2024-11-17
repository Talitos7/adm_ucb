import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import './LoginPage.css'; // Asegúrate de importar el archivo CSS

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('El correo y la contraseña son obligatorios.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/adm_ucb/src/servicios/loginUsuarios.php', {
        emailAdm: email,
        password: password,
      });

      const { mensaje, usuario } = response.data;

      if (mensaje === 'Login exitoso') {
        setSuccess('Inicio de sesión exitoso. Redirigiendo...');
        localStorage.setItem('usuario', JSON.stringify(usuario));

        const rolResponse = await axios.get(
          `http://localhost/adm_ucb/src/servicios/loginUsuarios.php?emailAdm=${email}&tipo=rol`
        );

        const { rol } = rolResponse.data;

        if (rol) {
          localStorage.setItem('usuarioRol', rol);
          switch (rol) {
            case 'admin':
              navigate('/admin');
              break;
            case 'estudiante':
              navigate('/estudiante');
              break;
            case 'centro':
              navigate('/pasantias');
              break;
            default:
              setError('Rol no reconocido');
          }
        } else {
          setError('No se pudo obtener el rol del usuario.');
        }
      } else {
        setError(mensaje || 'Error al iniciar sesión.');
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="login-container"> {/* Contenedor para el fondo animado */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 6,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h5" align="center" mb={2}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Éxito</AlertTitle>
            {success}
          </Alert>
        )}

        <TextField
          label="Correo"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Iniciar Sesión
        </Button>
      </Box>
    </div>
  );
}

export default LoginPage;
