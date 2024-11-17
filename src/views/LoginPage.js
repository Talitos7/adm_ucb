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
      // Login del usuario
      const response = await axios.post('http://localhost/adm_ucb/src/servicios/loginUsuarios.php', {
        emailAdm: email,
        password: password,
      });
  
      const { mensaje,  usuario } = response.data;
  
      if (!email.trim() || !password.trim()) {
        setError('El correo y la contraseña son obligatorios');
        return;
      }
  
      if (mensaje === 'Login exitoso') {
        const usuarioData = { nombre: usuario.nombre, emailAdm: usuario.emailadm }; // Incluye emailAdm
        localStorage.setItem('usuario', JSON.stringify(usuarioData)); // Guarda el objeto como JSON
        // Obtener el rol del usuario mediante la API
        const rolResponse = await axios.get(
          `http://localhost/adm_ucb/src/servicios/loginUsuarios.php?emailAdm=${email}&tipo=rol`
        );
  
        const { rol } = rolResponse.data;
        console.log(rolResponse.data);
        
        const roles = ['admin', 'estudiante', 'centro', 'sociedad', 'alumni'];

        if (rol) {
          // Guardar usuario como JSON
          localStorage.setItem('usuario', JSON.stringify(usuario));
          localStorage.setItem('usuarioRol', rol);
  
          if (rol === roles[0]) {
            navigate('/admin');
            return;
          }else if (rol === roles[1]) {
            navigate('/estudiante');
            return;
          }else if (rol === roles[2]) {
            navigate('/pasantias');
            return;
          }else{
            setError('Rol no reconocido');
          }        
        } else {
          setError('No se pudo obtener el rol del usuario');
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
