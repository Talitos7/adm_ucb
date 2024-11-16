import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/adm_ucb/src/servicios/loginUsuarios.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAdm: email, password }),
      });

      const data = await response.json();

      if (data.mensaje === 'Login exitoso') {
        // Obtener el rol del usuario
        const roleResponse = await fetch(`http://localhost:8000/servicios/loginUsuario.php?emailAdm=${email}&tipo=rol`);
        const roleData = await roleResponse.json();

        if (roleData.rol === 'admin') {
          navigate('/admin');
        } else if (roleData.rol === 'estudiante') {
          navigate('/');
        } else if (roleData.rol === 'externo') {
          navigate('/pasantias');
        } else {
          setError('Rol no reconocido');
        }
      } else {
        setError(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Ingresar
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;