import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import './CarouselSection.css'; 

import video from '../assets/back1video.mp4'
import video2 from '../assets/back4video.mp4'
import video3 from '../assets/back3video.mp4'
import gifExample from '../assets/3dgifmaker34947.gif'; 

function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const descriptions = [
    {
      title: "NUESTRA HISTORIA",
      text: "La carrera de Administración de Empresas en la Universidad Católica Boliviana San Pablo (UCB) en La Paz tiene una rica historia que se remonta a los inicios de la universidad. La UCB fue fundada en 1966 en esta ciudad, y desde sus primeros años ofreció programas en áreas relacionadas con la economía y la administración empresarial. La creación de la carrera de Administración de Empresas formó parte de la misión de la UCB de ofrecer una formación integral inspirada en valores cristianos y orientada al servicio de la sociedad boliviana, en particular, en temas de desarrollo económico y gestión organizacional.",
      gif: gifExample // Añadimos la ruta del gif para esta sección
    },
    {
      title: "NUESTRA EVOLUCIÓN",
      text: "La carrera ha evolucionado para responder a las necesidades cambiantes del mercado laboral y las exigencias de un entorno globalizado. La UCB también ha promovido un enfoque humanista en la formación de sus estudiantes, preparándolos no solo para liderar en sus campos, sino también para asumir responsabilidades éticas y sociales. Hoy, la UCB se destaca por su visión de formar profesionales comprometidos y con un fuerte sentido de servicio, sostenibilidad y justicia social​",
      gif: gifExample // GIF para esta sección
    },
    {
      title: "NUESTRO IMPACTO EMPRESARIAL EN BOLIVIA",
      text: "La carrera de Administración de Empresas en la Universidad Católica Boliviana (UCB) de La Paz tiene un impacto significativo en el sector empresarial de Bolivia al formar profesionales capacitados en gestión corporativa, análisis de negocios, y responsabilidad social. Con un enfoque en habilidades estratégicas como el análisis de mercados y la planificación financiera sostenible, los egresados están preparados para liderar en diversas industrias, incluyendo el sector privado y emprendimientos propios. La UCB ofrece infraestructura moderna, programas de intercambio internacional, y prácticas empresariales avanzadas, lo que proporciona a los estudiantes una formación integral y competitiva en el mercado laboral.",
      gif: gifExample // GIF para esta sección
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
        <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div>
        <video autoPlay loop muted>
            <source src={video2} type="video/mp4" />
          </video>
        </div>
        <div>
        <video autoPlay loop muted>
            <source src={video3} type="video/mp4" />
          </video>
        </div>
      </Carousel>

      <div className="content-overlay">
        <div className="text-section">
          <h2>{descriptions[currentSlide].title}</h2>
          <p>{descriptions[currentSlide].text}</p>
        </div>
      </div>

      <div className="gif-section">
        <img src={descriptions[currentSlide].gif} alt="GIF relacionado" />
      </div>
    </section>
  );
}

export default CarouselSection;
