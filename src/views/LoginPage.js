import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost/adm_ucb/src/servicios/loginUsuarios.php', {
        emailAdm: email,
        password: password,
      });

      const { mensaje, usuario } = response.data;

      if (!email.trim() || !password.trim()) {
        setError('El correo y la contraseña son obligatorios');
        return;
      }      

      if (mensaje?.trim() === 'Login exitoso' && usuario?.rol) {
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigir según el rol
        switch (usuario.rol) {
          case 'admin':
            navigate('/admin');
            break;
          case 'estudiante':
            navigate('/admin'); // Temporal según tu descripción
            break;
          case 'externo':
            navigate('/pasantias');
            break;
          default:
            setError('Rol no reconocido');
        }
      } else {
        setError(mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
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
      {error && (
        <Typography color="error" variant="body2" mt={2}>
          {error}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Iniciar Sesión
      </Button>
    </Box>
  );
}

export default LoginPage;
