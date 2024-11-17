import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Avatar, Typography, Paper, Box } from '@mui/material';

export default function EmpresasAliadas() {
    const [empresas, setEmpresas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get('http://localhost/adm_ucb/src/servicios/empresasAPI.php');
                if (response.data.status === "success") {
                    setEmpresas(response.data.data);
                } else {
                    setError(response.data.message || 'No hay empresas disponibles.');
                }
            } catch (err) {
                console.error('Error al conectar con la API:', err);
                setError('Error al conectar con la API.');
            }
        };

        fetchEmpresas();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            {error ? (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {empresas.map((empresa) => (
                        <Grid item xs={12} sm={6} md={4} key={empresa.idempresa}>
                            <Paper
                                component="a"
                                href={empresa.linkempresa || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    padding: 2,
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                    transition: 'transform 0.2s, border-color 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        borderColor: '#0e7f99', // Cambiar el color del borde a celeste
                                    },
                                }}
                            >
                                {/* Imagen alineada a la izquierda */}
                                <Avatar
                                    src={`http://localhost/adm_ucb/src/servicios/uploadsEmpresas/${empresa.imagenempresa}`}
                                    alt={empresa.nombreempresa}
                                    sx={{ width: 80, height: 80, marginRight: 2 }}
                                />
                                {/* Contenedor de texto a la derecha */}
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {empresa.nombreempresa}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {empresa.descripcionempresa}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
