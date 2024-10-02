// Docentes.js
import React from 'react';
import './Docentes.css'; // Asegúrate de crear este archivo para los estilos.

const docentesData = [
  {
    id: 1,
    nombre: "Mgr. Jessica Lanza",
    especialidad: "Directora de Carrera",
    correo: "Djlanza@ucb.edu.bo",
    imagen: require('./assets/JessicaLanza.jpg'), // Cambia esta ruta a la ubicación correcta de tu imagen
  },
  {
    id: 2,
    nombre: "Lic. Jorge Eduardo Jung Mariscal",
    especialidad: "Lic. Jorge Eduardo Jung Mariscal",
    correo: "jjung@ucb.edu.bo",
    imagen: require('./assets/Jorgejung.jpg'), // Cambia esta ruta a la ubicación correcta de tu imagen
  },
  {
    id: 3,
    nombre: "Lic. Mabel Aguirre Clavel",
    especialidad: "Docente Tiempo Completo",
    correo: "maguirre@ucb.edu.bo",
    imagen: require('./assets/MabelAguirre.jpg'), // Cambia esta ruta a la ubicación correcta de tu imagen
  },
  {
    id: 4,
    nombre: "Sergio Villegas",
    especialidad: "Docente Tiempo Completo",
    correo: "svillegas.r@ucb.edu.bo",
    imagen: require('./assets/SergioVillegas.jpg'), // Cambia esta ruta a la ubicación correcta de tu imagen
  },
];

const Docentes = () => {
  return (
    <div className="wrapper">
      <div className="container">
        {docentesData.map((docente) => (
          <div key={docente.id}>
            <input type="radio" name="slide" id={`c${docente.id}`} defaultChecked={docente.id === 1} />
            <label htmlFor={`c${docente.id}`} className="card" style={{ backgroundImage: `url(${docente.imagen})` }}>
              <div className="row">
                <div className="icon">{docente.id}</div>
                <div className="description">
                  <h4>{docente.nombre}</h4>
                  <p>{docente.especialidad}</p>
                  <p>{docente.correo}</p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docentes;
