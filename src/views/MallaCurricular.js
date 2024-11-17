import React from 'react';
import './MallaCurricular.css';

const MallaCurricularTable = () => {
  const ciclos = [
    "1er Ciclo",
    "2do Ciclo",
    "3er Ciclo",
    "4to Ciclo",
    "5to Ciclo",
    "6to Ciclo",
    "7mo Ciclo",
    "8vo Ciclo",
    "9no Ciclo",
  ];

  const materias = [
    ["Administración I", "Contabilidad Básica", "Fundamentos de Marketing", "Matemática Empresarial I", "Economía General", "", "", "", ""],
    ["Administración II", "Contabilidad Intermedia I", "Marketing Operativo", "Matemática Empresarial II", "Macroeconomía I", "Escritura Académica", "", "", ""],
    ["Costos I", "Matemática Financiera", "Probabilidad y Estadística I", "Microeconomía I", "Proceso del Método Científico", "Formación Humano Cristiana I", "", "", ""],
    ["Gestión del Talento Humano", "Gestión de Procesos", "Finanzas I", "Presupuestos", "Probabilidad y Estadística II", "Microeconomía II", "Libre", "", ""],
    ["Derecho Empresarial", "Comportamiento Organizacional", "Gerencia de Operaciones y Tecnología", "Business Intelligence", "Finanzas II", "Investigación de Mercados I", "", "", ""],
    ["Desarrollo Organizacional", "Taller de Innovación Digital", "Emprendimientos y Startup", "Ciencia de Datos y Toma de Decisiones", "Ética Profesional", "Formación Humano Cristiana II", "", "", ""],
    ["Dirección Estratégica I", "Taller de Habilidades Blandas", "Emprendimientos y Plan de Negocio", "Marketing Estratégico", "Formación Humano Cristiana III", "Libre", "", "", ""],
    ["Dirección Estratégica II", "Administración de Proyectos", "Práctica Preprofesional", "Taller de Grado I", "", "", "", "", ""],
    ["Taller de Grado II", "", "", "", "", "", "", "", ""],
  ];

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
              <td>{ciclos[rowIndex]}</td>
              {row.map((materia, colIndex) => (
                <td key={colIndex} className={materia ? "filled-cell" : "empty-cell"}>
                  {materia}
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
