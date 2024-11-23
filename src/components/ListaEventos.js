import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const ListaEventos = ({ onEditar, onEliminar, reload }) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost/adm_ucb/src/servicios/eventosAPI.php');
      const eventosActivos = response.data.data.filter((evento) => evento.estado); // Filtra eventos activos
      setEventos(eventosActivos);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    } finally {
      setLoading(false); // Termina la carga independientemente del resultado
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEventos();
  }, [reload]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">Cargando eventos...</Typography>
      </Box>
    );
  }

  if (eventos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">No hay eventos disponibles.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Eventos
      </Typography>
      <Grid container spacing={3}>
        {eventos.map((evento) => {
          const fechaInicio = dayjs(evento.fechainicio).format('DD/MM/YYYY');
          const fechaFin = dayjs(evento.fechafin).format('DD/MM/YYYY');
          const hora = dayjs(evento.hora).format('HH:mm');
          const imageUrl = evento.urlfotoevento
            ? `http://localhost/adm_ucb/src/${evento.urlfotoevento}`
            : '/default-image.jpg'; // Fallback si no hay imagen

          return (
            <Grid item xs={12} sm={6} md={4} key={evento.idevento}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={imageUrl}
                  alt={evento.titulo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {evento.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {evento.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Fecha inicio:</strong> {fechaInicio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Fecha fin:</strong> {fechaFin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Hora:</strong> {hora}
                  </Typography>
                  {evento.enlaceregistro && (
                    <Typography variant="body2" color="primary">
                      <strong>Link:</strong>{' '}
                      <a href={evento.enlaceregistro} target="_blank" rel="noopener noreferrer">
                        {evento.enlaceregistro}
                      </a>
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => onEditar(evento)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" onClick={() => onEliminar(evento.idevento)}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListaEventos;
