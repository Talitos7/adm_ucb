import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import './CarouselSection.css'; 

import back1 from '../assets/back5.jpeg';
import back2 from '../assets/back2.jpeg';
import back3 from '../assets/back1.jpeg';

function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const descriptions = [
    {
      title: "Bienvenido a Administración de Empresas",
      text: "La carrera de Administración de Empresas en la Universidad Católica Boliviana \"San Pablo\" (UCB) en La Paz tiene una rica historia que se remonta a los inicios de la universidad. La UCB fue fundada en 1966 en esta ciudad, y desde sus primeros años ofreció programas en áreas relacionadas con la economía y la administración empresarial. La creación de la carrera de Administración de Empresas formó parte de la misión de la UCB de ofrecer una formación integral inspirada en valores cristianos y orientada al servicio de la sociedad boliviana, en particular, en temas de desarrollo económico y gestión organizacional.",
    },
    {
      title: "Nuestra Evolución",
      text: "La carrera ha evolucionado para responder a las necesidades cambiantes del mercado laboral y las exigencias de un entorno globalizado. La UCB también ha promovido un enfoque humanista en la formación de sus estudiantes, preparándolos no solo para liderar en sus campos, sino también para asumir responsabilidades éticas y sociales. Hoy, la UCB se destaca por su visión de formar profesionales comprometidos y con un fuerte sentido de servicio, sostenibilidad y justicia social​.",
    },
    {
      title: "Nuestro Impacto Empresarial en Bolivia",
      text: "La carrera de Administración de Empresas en la Universidad Católica Boliviana (UCB) de La Paz tiene un impacto significativo en el sector empresarial de Bolivia al formar profesionales capacitados en gestión corporativa, análisis de negocios, y responsabilidad social. Con un enfoque en habilidades estratégicas como el análisis de mercados y la planificación financiera sostenible, los egresados están preparados para liderar en diversas industrias, incluyendo el sector privado y emprendimientos propios. La UCB ofrece infraestructura moderna, programas de intercambio internacional, y prácticas empresariales avanzadas, lo que proporciona a los estudiantes una formación integral y competitiva en el mercado laboral.",
    },
  ];

  return (
    <section className="carousel-section">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={5000}
        className="carousel-background"
        onChange={(index) => setCurrentSlide(index)}
      >
        <div>
          <img src={back1} alt="Historia 1" />
        </div>
        <div>
          <img src={back2} alt="Historia 2" />
        </div>
        <div>
          <img src={back3} alt="Historia 3" />
        </div>
      </Carousel>

      <div className="content-overlay">
        <h2>{descriptions[currentSlide].title}</h2>
        <p>{descriptions[currentSlide].text}</p>
      </div>
    </section>
  );
}

export default CarouselSection;
