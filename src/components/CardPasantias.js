import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';

export default function PasantiasCards() {
    const [pasantias, setPasantias] = useState([]);
    const [error, setError] = useState('');

    // Fetch de la API
    useEffect(() => {
        const fetchPasantias = async () => {
            try {
                const response = await axios.get('http://localhost/adm_ucb/src/servicios/mostrarPasantias.php');
                console.log('Respuesta de la API (raw):', response.data); // Depuración
    
                // Extraer JSON desde el texto si tiene prefijo
                const rawData = response.data;
                const jsonString = rawData.startsWith('Conexión exitosa')
                    ? rawData.replace('Conexión exitosa', '').trim()
                    : rawData;
    
                const data = JSON.parse(jsonString); // Parseamos el JSON
                console.log('Datos parseados:', data); // Depuración
    
                if (data.success && data.pasantias.length > 0) {
                    setPasantias(data.pasantias);
                } else {
                    setError(data.message || 'No hay pasantías disponibles.');
                }
            } catch (err) {
                console.error('Error en la conexión:', err);
                setError('Error al conectar con la API.');
            }
        };
    
        fetchPasantias();
    }, []);
    

    return (
        <div style={{ padding: '20px' }}>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Grid container spacing={3}>
                    {pasantias.map((pasantia) => (
                        <Grid item xs={12} sm={6} md={4} key={pasantia.idpsantia}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={pasantia.imagen_url || `http://localhost/adm_ucb/src/servicios/${pasantia.ruta_imagen}`}
                                        alt={pasantia.titulo}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {pasantia.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pasantia.detalle}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}
