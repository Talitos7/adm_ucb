import React from 'react';
import Carousel from '../components/CarouselSection'; 
import Docentes from '../components/DocenteSection';
import Info from '../components/secInfo';
import Beneficios from '../components/beneficiosSec';
import Footer from '../components/Footer';
import { Box, } from "@mui/material";

function Edit() {
  return (
    <Box
    sx={{
        width: '100%',
        marginRight: 0,
        marginLeft: 0,
        background: "linear-gradient(135deg, #0e7f99 30%, #122e63 100%)",
        minHeight: "100vh",
        position: "relative",
    }}>
      <Carousel/> {/* Componente de carrusel editable */}
      <Docentes/> {/* Componente de docentes editable */}
      <Info/> {/* Componente de Info editable */}
      <Beneficios/> {/* Componente de Beneficios editable */}
      <Footer />
    </Box>
  );
}

export default Edit;
