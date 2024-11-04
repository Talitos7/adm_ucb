import React, { useState } from "react";
import logoADM from './assets/ADMLogo.png'; // Asegúrate de que la ruta sea correcta
import image1 from './assets/back1.jpeg';
import image2 from './assets/back2.jpeg';
import image3 from './assets/back5.jpeg';
import mallaADM from './assets/mallaADM.jpg'; // Importa la imagen de la malla
import Navbar from "./components/Navbar";
import "./App.css"; 

import Docentes from './components/Docentes'; 

const App = () => {
  const [sliderItems] = useState([image1, image2, image3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('docentes'); 

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

  const handleNavClick = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar handleNavClick={handleNavClick} /> {/* Usa el nuevo componente Navbar */}

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

      <div className="scroll-container"> 
        <div className="section" id="historia">
          {currentSection === 'historia' && (
            <>
              <h2>Nuestra Historia</h2>
              <p>Aquí puedes añadir el contenido sobre la historia.</p>
            </>
          )}
        </div>
        <div className="section" id="docentes">
          <h2 className="docentes-heading">NUESTROS QUERIDOS DOCENTES</h2> 
          <Docentes />
        </div>
        <div className="section malla-section" id="malla"> {/* Aplica la clase malla-section */}
          <h2>NUESTRA MALLA CURRICULAR</h2>
          <img src={mallaADM} alt="Malla Curricular" className="malla-image" /> {/* Imagen de la malla */}
        </div>
        <div className="section" id="footer">
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <img src={logoADM} alt="Logo" /> {/* Cambia logo.png al logo que desees */}
              </div>
              <div className="footer-about">
                <h3>SOBRE NOSOTROS</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis, voluptatem.</p>
                <p>Quaerat perferendis reprehenderit voluptatem cum nemo velit rem.</p>
              </div>
              <div className="footer-social">
                <h3>SÍGUENOS</h3>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </footer>
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
