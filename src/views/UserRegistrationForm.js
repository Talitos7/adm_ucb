import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

export default function UserRegistration() {
    const [formData, setFormData] = useState({
        emailAdm: '',
        nombre: '',
        apellido: '',
        password: '',
        celular: '',
        rol: '',
        emailContacto: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos requeridos
        if (!formData.emailAdm || !formData.nombre || !formData.password || !formData.celular || !formData.emailContacto) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, llena todos los campos obligatorios.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost/adm_ucb/src/servicios/usuariosAPI.php?action=registro', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            const data = response.data;

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario registrado',
                    text: data.message || 'El usuario ha sido registrado exitosamente.',
                });
                setFormData({
                    emailAdm: '',
                    nombre: '',
                    apellido: '',
                    password: '',
                    celular: '',
                    rol: '',
                    emailContacto: '',
                });
            }else{
              Swal.fire({
                icon: 'success',
                title: 'Usuario registrado',
                text: data.message || 'El usuario ha sido registrado exitosamente.',
            });
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: error.message || 'Hubo un problema al registrar el usuario.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Registro de Usuarios
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Correo Electrónico del Admin"
                            name="emailAdm"
                            value={formData.emailAdm}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="tel"
                            label="Celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email de Contacto"
                            name="emailContacto"
                            value={formData.emailContacto}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Rol"
                            name="rol"
                            value={formData.rol}
                            onChange={handleInputChange}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="alumni">Alumni</option>
                            <option value="centro">Centro de Estudiantes</option>
                            <option value="sociedad cientifica">Sociedad Cientifica</option>
                            <option value="estudiante">Estudiante regular</option>
                            <option value="admin">Administrador</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
