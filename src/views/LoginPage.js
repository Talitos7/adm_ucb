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
  
      const data = response.data;
  
      if (data.mensaje === 'Login exitoso') {
        const userResponse = await axios.get(
          `http://localhost/adm_ucb/src/servicios/loginUsuarios.php?emailAdm=${email}`
        );
  
        const userData = userResponse.data;
  
        localStorage.setItem('usuario', JSON.stringify(userData));
  
        if (userData.rol === 'admin') {
          navigate('/admin');
        } else if (userData.rol === 'estudiante') {
          navigate('/');
        } else if (userData.rol === 'externo') {
          navigate('/pasantias');
        } else {
          setError('Rol no reconocido');
        }
      } else {
        setError(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" mb={2}>Iniciar Sesión</Typography>
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
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Iniciar Sesión</Button>
    </Box>
  );
}

export default LoginPage;
