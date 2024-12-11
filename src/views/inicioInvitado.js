import React from 'react';
import CarouselSection from '../components/CarouselSection';
import DocenteSection from '../components/DocenteSection';
import InfoSec from '../components/secInfo';
import BeneficiosSec from '../components/beneficiosSec';
import Footer from '../components/Footer';
import { Box, } from "@mui/material";

function inicioInvitado() {
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
        <CarouselSection />
        <DocenteSection />
        <InfoSec/>
        <BeneficiosSec/>
        <Footer />
    </Box>
  );
}

export default inicioInvitado;