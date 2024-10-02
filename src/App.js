import React, { useEffect, useState } from "react";
import image1 from './assets/back4.jpg';
import image2 from './assets/back2.jpg';
import image3 from './assets/back1.jpg';
import logo from './assets/ADM - H.png'; 
import "./App.css"; 

const App = () => {
  const [sliderItems] = useState([image1, image2, image3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeAutoNext = 7000; 


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

  useEffect(() => {
    const autoNext = setInterval(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => clearInterval(autoNext); 
  }, [sliderItems.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

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


    </div>
  );
};

export default App;
