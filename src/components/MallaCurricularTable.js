import React, { useState } from 'react';
import './MallaCurricularTable.css';

const MallaCurricularTable = () => {
  const ciclos = [
    "1er Semestre",
    "2do Semestre",
    "3er Semestre",
    "4to Semestre",
    "5to Semestre",
    "6to Semestre",
    "7mo Semestre",
    "8vo Semestre",
    "9no Semestre",
  ];

  const materias = [
    ["Administración I", "Contabilidad Básica", "Fundamentos de Marketing", "Matemática Empresarial I", "Economía General", "", ""],
    ["Administración II", "Contabilidad Intermedia I", "Marketing Operativo", "Matemática Empresarial II", "Macroeconomía I", "Escritura Académica", ""],
    ["Costos I", "Matemática Financiera", "Probabilidad y Estadística I", "Microeconomía I", "Proceso del Método Científico", "Formación Humano Cristiana I", ""],
    ["Gestión del Talento Humano", "Gestión de Procesos", "Finanzas I", "Presupuestos", "Probabilidad y Estadística II", "Microeconomía II", "Libre"],
    ["Derecho Empresarial", "Comportamiento Organizacional", "Gerencia de Operaciones y Tecnología", "Business Intelligence", "Finanzas II", "Investigación de Mercados I", ""],
    ["Desarrollo Organizacional", "Taller de Innovación Digital", "Emprendimientos y Startup", "Ciencia de Datos y Toma de Decisiones", "Ética Profesional", "Formación Humano Cristiana II", ""],
    ["Dirección Estratégica I", "Taller de Habilidades Blandas", "Emprendimientos y Plan de Negocio", "Marketing Estratégico", "Formación Humano Cristiana III", "Libre", ""],
    ["Dirección Estratégica II", "Administración de Proyectos", "Práctica Preprofesional", "Taller de Grado I", "", "", ""],
    ["Taller de Grado II", "", "", "", "", "", ""],
  ];

  const requisitos = {
    "Administración II": {
      prerequisitos: ["Administración I"],
      desbloquea: ["Gestión del Talento Humano", "Gestión de Procesos"],
    },
    "Gestión del Talento Humano": {
      prerequisitos: ["Administración II"],
      desbloquea: [],
    },
    "Gestión de Procesos": {
      prerequisitos: ["Administración II"],
      desbloquea: [],
    },
  };

  const [highlighted, setHighlighted] = useState({ prerequisitos: [], desbloquea: [] });
  const [activeMateria, setActiveMateria] = useState(null); // Materia activa

  const handleMouseEnter = (materia) => {
    if (requisitos[materia]) {
      setHighlighted({
        prerequisitos: requisitos[materia].prerequisitos,
        desbloquea: requisitos[materia].desbloquea,
      });
    } else {
      setHighlighted({ prerequisitos: [], desbloquea: [] });
    }
    setActiveMateria(materia); // Setear materia activa
  };

  const handleMouseLeave = () => {
    setHighlighted({ prerequisitos: [], desbloquea: [] });
    setActiveMateria(null); // Limpiar materia activa
  };

  return (
    <div className="malla-curricular-container">
      <table className="malla-curricular-table">
        <thead>
          <tr>
            <th></th>
            <th colSpan="9">MATERIAS</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="ciclo-header">{ciclos[rowIndex]}</td>
              {row.map((materia, colIndex) => (
                <td
                  key={colIndex}
                  className={`cell ${
                    highlighted.prerequisitos.includes(materia) ? "prerequisite" : ""
                  } ${
                    highlighted.desbloquea.includes(materia) ? "unlocked" : ""
                  } ${activeMateria === materia ? "active-cell" : ""}`}
                  onMouseEnter={() => handleMouseEnter(materia)}
                  onMouseLeave={handleMouseLeave}
                >
                  {materia && (
                    <>
                      {materia} {activeMateria === materia && "✔"} {/* Icono ✔ */}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MallaCurricularTable;
