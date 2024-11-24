import React from 'react';
import Carousel from '../components/CarouselSection'; 
import Docentes from '../components/DocenteSection'
import Info from '../components/secInfo'
import Beneficios from '../components/beneficiosSec'

function Edit() {
  return (
    <div>
      <Carousel/> {/* Componente de carrusel editable */}
      <Docentes/> {/* Componente de docentes editable */}
      <Info/> {/* Componente de Info editable */}
      <Beneficios/> {/* Componente de Beneficios editable */}
    </div>
  );
}

export default Edit;
