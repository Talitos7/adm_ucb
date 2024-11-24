import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
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
          <Typography variant="body1"><FaPhone />2782222</Typography>
          <Typography variant="body1"><FaEnvelope /> coordinacionadm.lpz@ucb.edu.bo </Typography>
          <Typography variant="body1"><FaMapMarkerAlt /> Av. 14 de Septiembre N°4807, Obrajes, La Paz</Typography>
        </Box>

        {/* Columna de enlaces */}
        <Box className="footer-column" textAlign="center" maxWidth="200px">
          {/* Mapa de ubicación */}
          <Box mt={2}>
            <Typography variant="body1" gutterBottom>Nuestra Ubicación:</Typography>
            <iframe
              width="100%"
              height="200"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.068382077039!2d-68.11456612605546!3d-16.522645041306383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses!2sbo!4v1732418348691!5m2!1ses!2sbo"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>

        {/* Columna de redes sociales */}
        <Box className="footer-column" textAlign="center" maxWidth="300px">
          <Typography variant="h6" gutterBottom>REDES SOCIALES</Typography>
          <Box className="social-icons" display="flex" justifyContent="center" gap={2} mb={2}>
            <IconButton href="https://www.facebook.com/share/17kAqDdjjb/" target="_blank">
              <FaFacebook color={theme.palette.mode === 'dark' ? 'white' : 'black'} />
            </IconButton>
            <IconButton href="https://www.instagram.com/admi_ucb.oficial?igsh=YXJicHduNHA4cDZm" target="_blank">
              <FaInstagram color={theme.palette.mode === 'dark' ? 'white' : 'black'} />
            </IconButton>
            <IconButton href="https://www.tiktok.com/@adm_iie_lpz.ucb?_t=8reNbjGXCzg&_r=1" target="_blank">
              <FaTiktok color={theme.palette.mode === 'dark' ? 'white' : 'black'} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
