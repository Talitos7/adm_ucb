import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importar el hook useLocation
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselSection.css';

import video from '../assets/back1video.mp4';
import video2 from '../assets/back4video.mp4';
import video3 from '../assets/back3video.mp4';
import gifExample from '../assets/3dgifmaker34947.gif';

function CarouselSection() {
  const location = useLocation(); // Obtener la ubicación actual
  const isPublicaciones = location.pathname === '/Editar'; // Verificar si estamos en la ruta /Publicaciones

  const initialDescriptions = [
    {
      title: "NUESTRA HISTORIA",
      text: "La carrera de Administración de Empresas en la Universidad Católica Boliviana San Pablo (UCB) en La Paz tiene una historia que data de los inicios de la universidad, fundada en 1966. Desde entonces, la UCB ha ofrecido programas en economía y administración, integrando valores cristianos y un enfoque en el desarrollo económico y la gestión organizacional para el servicio de la sociedad boliviana.",
      gif: gifExample,
    },
    {
      title: "NUESTRA EVOLUCIÓN",
      text: "La carrera ha evolucionado para adaptarse al mercado laboral y un entorno globalizado, con un enfoque humanista que prepara a los estudiantes para liderar con responsabilidad ética y social. La UCB se destaca por formar profesionales comprometidos con el servicio, la sostenibilidad y la justicia social.​",
      gif: gifExample,
    },
    {
      title: "NUESTRO IMPACTO EMPRESARIAL EN BOLIVIA",
      text: "La carrera de Administración de Empresas en la UCB forma líderes en gestión, análisis de negocios y responsabilidad social, con enfoque estratégico y formación integral gracias a su infraestructura moderna e intercambios internacionales.",
      gif: gifExample,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [descriptions, setDescriptions] = useState(() => {
    const savedDescriptions = localStorage.getItem('descriptions');
    return savedDescriptions ? JSON.parse(savedDescriptions) : initialDescriptions;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('descriptions', JSON.stringify(descriptions));
  }, [descriptions]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(descriptions[currentSlide].text);
  };

  const handleSaveClick = () => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[currentSlide].text = editText;
    setDescriptions(updatedDescriptions);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

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
          {isEditing ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows="5"
                style={{ width: '100%' }}
              />
              <button onClick={handleSaveClick}>Guardar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          ) : (
            <p>{descriptions[currentSlide].text}</p>
          )}
        </div>
        {!isEditing && isPublicaciones && (
          <button onClick={handleEditClick} className="edit-button">
            Editar
          </button>
        )}
      </div>

      <div className="gif-section">
        <img src={descriptions[currentSlide].gif} alt="GIF relacionado" />
      </div>
    </section>
  );
}

export default CarouselSection;
