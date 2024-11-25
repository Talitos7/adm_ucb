import React, { useState } from 'react';
import './MallaCurricularTable.css';
import { TableContainer, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';

const MallaCurricularTable = ({ darkMode }) => {
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
    ["Gestión del Talento Humano", "Gestión de Procesos", "Finanzas I", "Presupuestos", "Probabilidad y Estadística II", "Microeconomía II", "Libre I"],
    ["Derecho Empresarial", "Comportamiento Organizacional", "Gerencia de Operaciones y Tecnología", "Business Intelligence", "Finanzas II", "Investigación de Mercados I", ""],
    ["Desarrollo Organizacional", "Taller de Innovación Digital", "Emprendimientos y Startup", "Ciencia de Datos y Toma de Decisiones", "Ética Profesional", "Formación Humano Cristiana II", ""],
    ["Dirección Estratégica I", "Taller de Habilidades Blandas", "Emprendimientos y Plan de Negocio", "Marketing Estratégico", "Formación Humano Cristiana III", "Libre II", ""],
    ["Dirección Estratégica II", "Administración de Proyectos", "Práctica Preprofesional", "Taller de Grado I", "", "", ""],
    ["Taller de Grado II", "", "", "", "", "", ""],
  ];

  const requisitos = {
    // Primer semestre
    "Administración I": {
      prerequisitos: [],
      desbloquea: ["Administración II"],
    },
    "Contabilidad Básica": {
      prerequisitos: [],
      desbloquea: ["Contabilidad Intermedia I"],
    },
    "Fundamentos de Marketing": {
      prerequisitos: [],
      desbloquea: ["Marketing Operativo"],
    },
    "Matemática Empresarial I": {
      prerequisitos: [],
      desbloquea: ["Matemática Empresarial II", "Matemática Financiera"],
    },
    "Economía General": {
      prerequisitos: [],
      desbloquea: ["Macroeconomía I", "Microeconomía I"],
    },
  
    // Segundo semestre
    "Administración II": {
      prerequisitos: ["Administración I"],
      desbloquea: ["Gestión del Talento Humano", "Gestión de Procesos"],
    },
    "Contabilidad Intermedia I": {
      prerequisitos: ["Contabilidad Básica"],
      desbloquea: ["Costos I"],
    },
    "Marketing Operativo": {
      prerequisitos: ["Fundamentos de Marketing"],
      desbloquea: ["Investigación de Mercados I"],
    },
    "Matemática Empresarial II": {
      prerequisitos: ["Matemática Empresarial I"],
      desbloquea: ["Probabilidad y Estadística I", "Microeconomía I"],
    },
    "Macroeconomía I": {
      prerequisitos: ["Economía General"],
      desbloquea: [],
    },
    "Escritura Académica": {
      prerequisitos: [],
      desbloquea: ["Proceso del Método Científico"],
    },
  
    // Tercer semestre
    "Costos I": {
      prerequisitos: ["Contabilidad Intermedia I"],
      desbloquea: ["Finanzas I", "Presupuestos"],
    },
    "Matemática Financiera": {
      prerequisitos: ["Matemática Empresarial I"],
      desbloquea: ["Finanzas I"],
    },
    "Probabilidad y Estadística I": {
      prerequisitos: ["Matemática Empresarial II"],
      desbloquea: ["Probabilidad y Estadística II"],
    },
    "Microeconomía I": {
      prerequisitos: ["Economía General", "Matemática Empresarial II"],
      desbloquea: ["Microeconomía II"],
    },
    "Proceso del Método Científico": {
      prerequisitos: ["Escritura Académica"],
      desbloquea: [],
    },
    "Formación Humano Cristiana I": {
      prerequisitos: [],
      desbloquea: ["Formación Humano Cristiana II"],
    },
  
    // Cuarto semestre
    "Gestión del Talento Humano": {
      prerequisitos: ["Administración II"],
      desbloquea: ["Comportamiento Organizacional", "Derecho Empresarial"],
    },
    "Gestión de Procesos": {
      prerequisitos: ["Administración II"],
      desbloquea: ["Gerencia de Operaciones y Tecnología", "Business Intelligence"],
    },
    "Finanzas I": {
      prerequisitos: ["Costos I", "Matemática Financiera"],
      desbloquea: ["Finanzas II", "Emprendimientos y Startup"],
    },
    "Presupuestos": {
      prerequisitos: ["Costos I"],
      desbloquea: [],
    },
    "Probabilidad y Estadística II": {
      prerequisitos: ["Probabilidad y Estadística I"],
      desbloquea: ["Investigación de Mercados I"],
    },
    "Microeconomía II": {
      prerequisitos: ["Microeconomía I"],
      desbloquea: [],
    },
  
    // Quinto semestre
    "Derecho Empresarial": {
      prerequisitos: ["Gestión del Talento Humano"],
      desbloquea: ["Ética Profesional"],
    },
    "Comportamiento Organizacional": {
      prerequisitos: ["Gestión del Talento Humano"],
      desbloquea: ["Desarrollo Organizacional"],
    },
    "Gerencia de Operaciones y Tecnología": {
      prerequisitos: ["Gestión de Procesos"],
      desbloquea: [],
    },
    "Business Intelligence": {
      prerequisitos: ["Gestión de Procesos"],
      desbloquea: ["Taller de Innovación Digital", "Ciencia de Datos y Toma de Decisiones"],
    },
    "Finanzas II": {
      prerequisitos: ["Finanzas I"],
      desbloquea: ["Emprendimientos y Plan de Negocio"],
    },
    "Investigación de Mercados I": {
      prerequisitos: ["Marketing Operativo", "Probabilidad y Estadística II"],
      desbloquea: ["Emprendimientos y Startup", "Marketing Estratégico"],
    },
  
    // Sexto semestre
    "Desarrollo Organizacional": {
      prerequisitos: ["Comportamiento Organizacional"],
      desbloquea: ["Taller de Habilidades Blandas"],
    },
    "Taller de Innovación Digital": {
      prerequisitos: ["Business Intelligence"],
      desbloquea: [],
    },
    "Emprendimientos y Startup": {
      prerequisitos: ["Finanzas I", "Investigación de Mercados I"],
      desbloquea: ["Dirección Estratégica I", "Emprendimientos y Plan de Negocio"],
    },
    "Ciencia de Datos y Toma de Decisiones": {
      prerequisitos: ["Business Intelligence"],
      desbloquea: [],
    },
    "Ética Profesional": {
      prerequisitos: ["Derecho Empresarial"],
      desbloquea: [],
    },
    "Formación Humano Cristiana II": {
      prerequisitos: ["Formación Humano Cristiana I"],
      desbloquea: ["Formación Humano Cristiana III"],
    },
    // Séptimo semestre
    "Dirección Estratégica I": {
      prerequisitos: ["Emprendimientos y Startup"],
      desbloquea: ["Dirección Estratégica II", "Práctica Preprofesional", "Taller de Grado I"],
    },
    "Taller de Habilidades Blandas": {
      prerequisitos: ["Desarrollo Organizacional"],
      desbloquea: ["Práctica Preprofesional", "Taller de Grado I"],
    },
    "Emprendimientos y Plan de Negocio": {
      prerequisitos: ["Emprendimientos y Startup", "Finanzas II"],
      desbloquea: ["Administración de Proyectos", "Práctica Preprofesional", "Taller de Grado I"],
    },
    "Marketing Estratégico": {
      prerequisitos: ["Investigación de Mercados I"],
      desbloquea: ["Práctica Preprofesional", "Taller de Grado I"],
    },
    "Formación Humano Cristiana III": {
      prerequisitos: ["Formación Humano Cristiana II"],
      desbloquea: ["Práctica Preprofesional", "Taller de Grado I"],
    },
    "Libre II": {
      prerequisitos: [],
      desbloquea: ["Práctica Preprofesional", "Taller de Grado I"],
    },
    //Octavo semestre
    "Dirección Estratégica II": {
      prerequisitos: ["Dirección Estratégica I"],
      desbloquea: [],
    },
    "Administración de Proyectos": {
      prerequisitos: ["Emprendimientos y Plan de Negocio"],
      desbloquea: [],
    },
    "Práctica Preprofesional": {
      prerequisitos: ["Dirección Estratégica I",
                      "Taller de Habilidades Blandas",
                      "Emprendimientos y Plan de Negocio",
                      "Marketing Estratégico",
                      "Formación Humano Cristiana III",
                      "Libre II"],
      desbloquea: [],
    },
    "Taller de Grado I": {
      prerequisitos: ["Dirección Estratégica I",
                      "Taller de Habilidades Blandas",
                      "Emprendimientos y Plan de Negocio",
                      "Marketing Estratégico",
                      "Formación Humano Cristiana III",
                      "Libre II"],
      desbloquea: ["Taller de Grado II"],
    },
    //Noveno semestre
    "Taller de Grado II": {
      prerequisitos: ["Taller de Grado I"],
      desbloquea: [],
    },
  };  

  const [highlighted, setHighlighted] = useState({ prerequisitos: [], desbloquea: [] });
  const [activeMateria, setActiveMateria] = useState(null);

  const handleMouseEnter = (materia) => {
    if (requisitos[materia]) {
      setHighlighted({
        prerequisitos: requisitos[materia].prerequisitos,
        desbloquea: requisitos[materia].desbloquea,
      });
    } else {
      setHighlighted({ prerequisitos: [], desbloquea: [] });
    }
    setActiveMateria(materia);
  };

  const handleMouseLeave = () => {
    setHighlighted({ prerequisitos: [], desbloquea: [] });
    setActiveMateria(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={`malla-curricular-container ${darkMode ? 'dark' : ''}`}>
        <TableBody>
          {materias.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="ciclo-header">{ciclos[rowIndex]}</TableCell>
              {row.map((materia, colIndex) => (
                <TableCell
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
                      {materia} {activeMateria === materia && "✔"}
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );  
};

export default MallaCurricularTable;
