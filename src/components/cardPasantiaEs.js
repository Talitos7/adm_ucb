import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function PasantiasCards() {
    const [pasantias, setPasantias] = useState([]);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPasantia, setSelectedPasantia] = useState(null);

    useEffect(() => {
        const fetchPasantias = async () => {
            try {
                const response = await axios.get('http://localhost/adm_ucb/src/servicios/mostrarPasantias.php');
                console.log('Respuesta de la API (raw):', response.data);
    
                let rawData = response.data;
    
                // Si la respuesta contiene "Conexión exitosa", eliminarla
                if (typeof rawData === 'string' && rawData.startsWith('Conexión exitosa')) {
                    rawData = rawData.replace('Conexión exitosa', '').trim();
                }
    
                const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    
                console.log('Datos parseados:', data);
    
                if (data.success && data.pasantias) {
                    setPasantias(data.pasantias);
                    setError(''); // Limpiar errores
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
    

    const handleOpenDialog = (idPasantia) => {
        setSelectedPasantia(idPasantia);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPasantia(null);
    };

    // Función para eliminar pasantía
    const eliminarPasantia = async () => {
        try {
            const response = await axios.delete('http://localhost/adm_ucb/src/servicios/eliminarPasantia.php', {
                data: { idpsantia: selectedPasantia }
            });
    
            console.log('Respuesta de la API (eliminación):', response.data);
    
            let responseData = response.data;
    
            if (typeof responseData === 'string') {
                const jsonString = responseData.startsWith('Conexión exitosa')
                    ? responseData.replace('Conexión exitosa', '').trim()
                    : responseData;
                responseData = JSON.parse(jsonString);
            }
    
            if (responseData.success) {
                setPasantias(pasantias.filter((pasantia) => pasantia.idpsantia !== selectedPasantia));
                setError(''); 
            } else {
                setError(responseData.message || 'No se pudo eliminar la pasantía.');
            }
        } catch (error) {
            console.error('Error al eliminar la pasantía:', error);
            setError('Error al conectar con el servidor.');
        } finally {
            handleCloseDialog(); 
        }
    };

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

            {/* Modal de confirmación */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar esta pasantía? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={eliminarPasantia} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
