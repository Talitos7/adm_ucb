import React, { useState } from 'react';
import './Bienvenida.css'; // Vamos a agregar los estilos en un archivo CSS separado

function WelcomeSection() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('Juan Pérez'); // Puedes cambiar esto a un nombre dinámico o pasado como prop

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Almacena la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="welcome-section">
      <div className="circle">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="image-upload"
          style={{ display: 'none' }} // Ocultamos el input real
        />
        <label htmlFor="image-upload">
          {/* Si hay imagen cargada, la mostramos; si no, mostramos una imagen por defecto */}
          <img src={image || 'https://via.placeholder.com/150'} alt="User" className="circle-image" />
        </label>
      </div>
      <div className="welcome-text">
        <h1>Bienvenido</h1>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default WelcomeSection;
