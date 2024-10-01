import React, { useEffect, useState } from "react";
import image1 from './assets/ucbof.jpg'; // Importa tus imágenes
import image2 from './assets/ucb2.jpg';
import image3 from './assets/ucb3.jpg';
import logo from './assets/ADM - H.png'; // Ajusta la ruta según tu estructura de carpetas
import "./App.css"; // Asegúrate de importar el CSS adaptado

const App = () => {
  // Adaptamos sliderItems para que utilice las imágenes importadas
  const [sliderItems] = useState([image1, image2, image3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeAutoNext = 7000; // Tiempo antes de cambiar automáticamente al siguiente slider

  // Función para mostrar el siguiente o anterior slider
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

  // Efecto para cambiar automáticamente de slider cada `timeAutoNext` milisegundos
  useEffect(() => {
    const autoNext = setInterval(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => clearInterval(autoNext); // Limpia el intervalo cuando el componente se desmonta
  }, [sliderItems.length]);

  return (
    <div>
      <header>
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <nav>
            <a href="/">Historia</a>
            <a href="/contacts">Docentes</a>
            <a href="/info">Malla</a>
            <a href="/info">Iniciar Sesión</a>
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

        {/* Arrows para navegar manualmente */}
        <div className="arrows">
          <button onClick={() => showSlider("prev")} id="prev">
            &lt;
          </button>
          <button onClick={() => showSlider("next")} id="next">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
