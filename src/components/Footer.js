import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, IconButton, Link, TextField, Button } from '@mui/material';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from '../assets/ADMLogo.png';

const Footer = () => {
  const theme = useTheme(); 

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
        color: theme.palette.text.primary,
        padding: '20px 0',
        marginTop: '50px',
      }}
    >
      <Box className="footer-container" display="flex" justifyContent="space-around" flexWrap="wrap">
        {/* Columna de información de contacto */}
        <Box className="footer-column" textAlign="center" maxWidth="300px">
          <Box className="footer-logo" mb={2}>
            <img src={Logo} alt="Logo" style={{ width: '400px' }} /> 
          </Box>
          <Typography variant="body1"><FaPhone /> 641-754-0072</Typography>
          <Typography variant="body1"><FaEnvelope /> admin@gmail.com</Typography>
          <Typography variant="body1"><FaMapMarkerAlt /> Av. 14 de Septiembre Nº 4807 esquina, La Paz</Typography>
        </Box>

        {/* Columna de enlaces */}
        <Box className="footer-column" textAlign="center" maxWidth="200px">
          <Typography variant="h6" gutterBottom>ENLACES</Typography>
          <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="#" color="inherit" underline="none">Inicio</Link></li>
          </Box>
        </Box>

        {/* Columna de redes sociales*/}
        <Box className="footer-column" textAlign="center" maxWidth="300px">
          <Typography variant="h6" gutterBottom>REDES SOCIALES</Typography>
          <Box className="social-icons" display="flex" justifyContent="center" gap={2} mb={2}>
            <IconButton href="#"><FaFacebook color={theme.palette.mode === 'dark' ? 'white' : 'black'} /></IconButton>
            <IconButton href="#"><FaTwitter color={theme.palette.mode === 'dark' ? 'white' : 'black'} /></IconButton>
            <IconButton href="#"><FaInstagram color={theme.palette.mode === 'dark' ? 'white' : 'black'} /></IconButton>
            <IconButton href="#"><FaLinkedin color={theme.palette.mode === 'dark' ? 'white' : 'black'} /></IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
