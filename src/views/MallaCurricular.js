import React from 'react';
import MallaCurricularTable from '../components/MallaCurricularTable';
import { Box, Typography, Paper, Divider } from '@mui/material';

const MallaCurricular = ({ darkMode }) => {
  return (
    <Box
      sx={{
          background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
          minHeight: "100vh",
          padding: 4,
          position: "relative",
      }}
    >
      
      {/* Leyenda */}
      <Paper sx={{ marginBottom: 4, padding: 2}} align="center">
        <Typography variant="h4" align="center" gutterBottom >
          Malla Curricular
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body1">
          <span style={{ color: '#2196f3', fontWeight: 'bold' }}>Azul:</span> Materia seleccionada.
        </Typography>
        <Typography variant="body1">
          <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Verde:</span> Materia que se habilita.
        </Typography>
        <Typography variant="body1">
          <span style={{ color: '#f44336', fontWeight: 'bold' }}>Rojo:</span> Prerrequisito.
        </Typography>
      </Paper>

      {/* Tabla de malla curricular */}
      <MallaCurricularTable darkMode={darkMode} />

      {/* Información adicional */}
      <Paper sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h6">Para graduarse, el estudiante debe acreditar:</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body1">40 asignaturas obligatorias</Typography>
        <Typography variant="body1">2 asignaturas libres. El estudiante puede escoger asignaturas de otras áreas o departamentos y solicitar la guía a la Dirección de Carrera</Typography>
        <Typography variant="body1">3 asignaturas de Formación Humano Cristiana</Typography>
        <Typography variant="body1">2 Talleres de Grado</Typography>
        <Typography variant="body1">Aprobar obligatoriamente el requisito de Idioma Inglés antes de inscribirse en séptimo semestre de su carrera.</Typography>
      </Paper>
    </Box>
  );
};

export default MallaCurricular;
