import React from 'react';
import './Docentes.css'; 

const docentesData = [
  {
    id: 1,
    nombre: "Mgr. Jessica Lanza",
    especialidad: "Directora de Carrera",
    correo: "Djlanza@ucb.edu.bo",
    imagen: require('./assets/JessicaLanza.jpg'), 
  },
  {
    id: 2,
    nombre: "Lic. Jorge Eduardo Jung Mariscal",
    especialidad: "Lic. Jorge Eduardo Jung Mariscal",
    correo: "jjung@ucb.edu.bo",
    imagen: require('./assets/Jorgejung.jpg'), 
  },
  {
    id: 3,
    nombre: "Lic. Mabel Aguirre Clavel",
    especialidad: "Docente Tiempo Completo",
    correo: "maguirre@ucb.edu.bo",
    imagen: require('./assets/MabelAguirre.jpg'), 
  },
  {
    id: 4,
    nombre: "Sergio Villegas",
    especialidad: "Docente Tiempo Completo",
    correo: "svillegas.r@ucb.edu.bo",
    imagen: require('./assets/SergioVillegas.jpg'), 
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
