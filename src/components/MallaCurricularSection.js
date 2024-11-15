import React from 'react';
import { Grid, Typography } from '@mui/material';

import mallaCurricularImage from '../assets/mallaADM.jpg'; 

const MallaCurricularSection = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Malla Curricular
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={8}>
          <img
            src={mallaCurricularImage} 
            alt="Malla Curricular"
            style={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MallaCurricularSection;
