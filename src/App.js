import React, { useEffect, useState } from "react";
import image1 from './assets/back4.jpg';
import image2 from './assets/back2.jpg';
import image3 from './assets/back1.jpg';
import logo from './assets/ADM - H.png'; 
import "./App.css"; 

// Importa el componente Docentes
import Docentes from './Docentes'; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [sliderItems] = useState([image1, image2, image3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('docentes'); // Cambiado a 'docentes'

  const showSlider = (type) => {
    if (type === "next") {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderItems.length - 1 ? 0 : prevIndex + 1
      );
    } else if (type === "prev") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? sliderItems.length - 1 : prevIndex - 1
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNavClick = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <header>
        <a href="#" onClick={() => handleNavClick('historia')}>
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <nav>
          <a href="#" onClick={() => handleNavClick('historia')}>Historia</a>
          <a href="#" onClick={() => handleNavClick('docentes')}>Docentes</a>
          <a href="#" onClick={() => handleNavClick('malla')}>Malla</a>
          <a href="#" onClick={() => handleNavClick('iniciar-sesion')}>Iniciar Sesión</a>
        </nav>
      </header>

      {/* Carousel */}
      <div className="carousel">
        <div className="list">
          {sliderItems.map((image, index) => (
            <div
              key={index}
              className={`item ${index === currentIndex ? "active" : ""}`}
            >
              {index === currentIndex && (
                <img src={image} alt={`Slider ${index + 1}`} />
              )}
              <div className="content">
                <div className="author">ADMINISTRACIÓN DE EMPRESAS</div>
                <div className="title">NUESTRA HISTORIA</div>
                <div className="topic">DIRECTORA JESSICA LANZA</div>
                <div className="des">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
                <div className="buttons">
                  <button>VER MÁS</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button onClick={() => showSlider("prev")} id="prev">
            &lt;
          </button>
          <button onClick={() => showSlider("next")} id="next">
            &gt;
          </button>
        </div>
      </div>

      {/* Thumbnails dentro de la sección historia */}
      <div className="thumbnails">
        {sliderItems.map((image, index) => (
          <div
            key={index}
            className={`thumbnail-card ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
            <div className="thumbnail-info">
              <div className="thumbnail-name">...</div>
              <div className="thumbnail-description">Descripcion</div>
            </div>
          </div>
        ))}
      </div>

      {/* Secciones dinámicas */}
      <div className="scroll-container"> {/* Añadido scroll-container */}
        <div className="section" id="historia">
          {currentSection === 'historia' && (
            <>
              <h2>Nuestra Historia</h2>
              <p>Aquí puedes añadir el contenido sobre la historia.</p>
            </>
          )}
        </div>
        <div className="section" id="docentes">
          {currentSection === 'docentes' && (
            <>
              <h2 className="docentes-heading">NUESTROS QUERIDOS DOCENTES</h2> {/* Clase añadida aquí */}
              {/* Renderiza el componente Docentes */}
              <Docentes />
            </>
          )}
        </div>
        <div className="section" id="malla">
          {currentSection === 'malla' && (
            <>
              <h2>Malla</h2>
              <p>Aquí puedes añadir el contenido sobre la malla curricular.</p>
            </>
          )}
        </div>
        <div className="section" id="iniciar-sesion">
          {currentSection === 'iniciar-sesion' && (
            <>
              <h2>Iniciar Sesión</h2>
              <p>Aquí puedes añadir el contenido para iniciar sesión.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
