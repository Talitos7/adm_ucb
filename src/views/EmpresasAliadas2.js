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
                if (response.data?.status === "success" && response.data.data) {
                    setEmpresas(response.data.data);
                } else {
                    setError(response.data?.message || 'No hay empresas disponibles.');
                }
            } catch (err) {
                console.error('Error al conectar con la API:', err.message);
                setError('Error al conectar con la API.');
            }
        };

        fetchEmpresas();
    }, []);

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0e7f99 30%, #122e63 100%)',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}
        >
            {error ? (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            ) : (
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    sx={{ maxWidth: '1200px', margin: '0 auto' }}
                >
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
                                    padding: 3,
                                    borderRadius: '16px',
                                    border: '2px solid #e0e0e0',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.08)',
                                        borderColor: '#00796b',
                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            >
                                <Avatar
                                    src={`http://localhost/adm_ucb/src/servicios/uploadsEmpresas/${empresa.imagenempresa}`}
                                    alt={empresa.nombreempresa}
                                    sx={{ width: 80, height: 80, marginRight: 2 }}
                                />
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
