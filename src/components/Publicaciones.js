import React from 'react';
import { Box, Typography } from '@mui/material';

function Publicaciones({ imagen, titulo, descripcion }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ccc' }}>
      <Box sx={{ flex: 1, paddingRight: 2 }}>
        <img src={imagen} alt={titulo} style={{ width: '100%', borderRadius: '8px' }} />
      </Box>
      <Box sx={{ flex: 2 }}>
        <Typography variant="h6" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="body1">
          {descripcion}
        </Typography>
      </Box>
    </Box>
  );
}

export default Publicaciones;
