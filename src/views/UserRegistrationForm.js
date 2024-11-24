import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import './UserForm.css';

export default function UserRegistration({darkMode}) {
    const [formData, setFormData] = useState({
        emailAdm: '',
        nombre: '',
        apellido: '',
        password: '',
        celular: '',
        rol: '',
        emailContacto: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        if (name === 'emailAdm' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            error = 'Por favor, ingresa un correo electrónico válido.';
        } else if (name === 'password' && value.length < 6) {
            error = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (name === 'celular' && !/^\d{8,15}$/.test(value)) {
            error = 'Por favor, ingresa un número de celular válido.';
        } else if (name === 'apellido' && !value.trim()) {
            error = 'El apellido es obligatorio.';
        }
    
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors, [name]: error };
            if (!error) {
                delete updatedErrors[name]; 
            }
            return updatedErrors;
        });
    };
    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.emailAdm) newErrors.emailAdm = 'El correo del admin es obligatorio.';
        if (!isDeleteMode) {
            if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio.'; 
            if (!formData.password) newErrors.password = 'La contraseña es obligatoria.';
            if (!formData.celular) newErrors.celular = 'El celular es obligatorio.';
            if (!formData.emailContacto) newErrors.emailContacto = 'El email de contacto es obligatorio.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario inválido',
                text: 'Por favor, corrige los errores antes de enviar.',
            });
            return;
        }

        if (isDeleteMode) {
            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (!result.isConfirmed) {
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const url = isDeleteMode
                ? 'http://localhost/adm_ucb/src/servicios/usuariosAPI.php?action=baja'
                : 'http://localhost/adm_ucb/src/servicios/usuariosAPI.php?action=registro';

            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { success, message } = response.data;

            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: isDeleteMode ? 'Usuario eliminado' : 'Usuario registrado',
                    text: message || 'Operación completada con éxito.',
                });

                // Resetear formulario solo si no es modo eliminar
                if (!isDeleteMode) {
                    setFormData({
                        emailAdm: '',
                        nombre: '',
                        apellido: '',
                        password: '',
                        celular: '',
                        rol: '',
                        emailContacto: '',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message || 'Ocurrió un problema al procesar la solicitud.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: error.response?.data?.message || 'Hubo un problema al conectar con el servidor.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`registration-container ${darkMode ? 'dark-mode' : ''}`}> {/* Aplica la clase dependiendo del modo */}
            <Box className={`registration-form ${darkMode ? 'dark-mode' : ''}`} sx={{ maxWidth: '600px', margin: 'auto', padding: 4 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        {isDeleteMode ? 'Eliminar Usuario' : 'Registro de Usuarios'}
                    </Typography>
                    <Button
                        variant="outlined"
                        color={isDeleteMode ? 'primary' : 'secondary'}
                        onClick={() => setIsDeleteMode(!isDeleteMode)}
                    >
                        {isDeleteMode ? 'Cancelar' : 'Modo Eliminar'}
                    </Button>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Correo Electrónico del Admin"
                                name="emailAdm"
                                value={formData.emailAdm}
                                onChange={handleInputChange}
                                error={!!errors.emailAdm}
                                helperText={errors.emailAdm}
                                required
                            />
                        </Grid>
                        {!isDeleteMode && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        error={!!errors.nombre}
                                        helperText={errors.nombre}
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
                                        error={!!errors.apellido}
                                        helperText={errors.apellido}
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
                                        error={!!errors.password}
                                        helperText={errors.password}
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
                                        error={!!errors.celular}
                                        helperText={errors.celular}
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
                                        error={!!errors.emailContacto}
                                        helperText={errors.emailContacto}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        className={darkMode ? 'dark-mode' : ''}
                                        label="Rol"
                                        name="rol"
                                        value={formData.rol}
                                        onChange={handleInputChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="" disabled>
                                            Seleccionar Rol
                                        </option>
                                        <option value="alumni">Alumni</option>
                                        <option value="centro">Centro de Estudiantes</option>
                                        <option value="sociedad">Sociedad Científica</option>
                                        <option value="estudiante">Estudiante Regular</option>
                                        <option value="admin">Administrador</option>
                                        <option value="intercambio">Estudiante de Intercambio</option>
                                    </TextField>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color={isDeleteMode ? 'error' : 'primary'}
                                fullWidth
                                disabled={isSubmitting}
                                startIcon={isSubmitting && <CircularProgress size={20} />}
                            >
                                {isSubmitting
                                    ? 'Procesando...'
                                    : isDeleteMode
                                    ? 'Confirmar Eliminación'
                                    : 'Registrar Usuario'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {Object.keys(errors).length > 0 && (
                    <Box mt={2}>
                        <Alert severity="error">Por favor, corrige los errores antes de enviar.</Alert>
                    </Box>
                )}
            </Box>
        </div>
    );
}