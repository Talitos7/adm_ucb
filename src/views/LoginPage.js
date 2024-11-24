import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, AlertTitle, Snackbar } from '@mui/material';
import axios from 'axios';
import './LoginPage.css'; // Asegúrate de importar el archivo CSS

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para abrir el Snackbar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!email.trim() || !password.trim()) {
      setError('El correo y la contraseña son obligatorios.');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost/adm_ucb/src/servicios/loginUsuarios.php', {
        emailAdm: email,
        password: password,
      });
  
      const { mensaje, usuario, token } = response.data;
  
      if (mensaje === 'Login exitoso' && token) {
        setSuccess('Inicio de sesión exitoso. Redirigiendo...');

        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('token', token); // Almacenar el token en el localStorage
  
        // Configurar token en el encabezado de autorización para futuras solicitudes
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Redirigir dependiendo del rol del usuario
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
              case 'intercambio':
                navigate('/IntercambioPage');
                break;
            case 'centro':
              navigate('/#'); // Agregar página de estudiante del centro
              break;
            case 'sociedad':
              navigate('/#'); // Agregar página de estudiante de la sociedad científica
              break;
            case 'alumni':
              navigate('/#'); // Agregar página de alumni
              break;
            default:
              setError('Rol no reconocido');
              setOpenSnackbar(true);
          }
        } else {
          setError('No se pudo obtener el rol del usuario.');
          setOpenSnackbar(true);
        }
      } else {
        setError(mensaje || 'Error al iniciar sesión.');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      setError('Error de conexión con el servidor.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Cerrar el Snackbar
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

      {/* Snackbar de alerta */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Ubicación del snackbar
      >
        <Alert severity={error ? "error" : "success"} onClose={handleCloseSnackbar}>
          <AlertTitle>{error ? "Error" : "Éxito"}</AlertTitle>
          {error || success}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
