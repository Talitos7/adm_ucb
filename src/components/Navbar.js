import React from 'react';
import logo from '../assets/ADMLogo.png';
import './Navbar.css'; // Asegúrate de enlazar tu archivo CSS

const Navbar = ({ handleNavClick }) => {
  return (
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
  );
};

export default Navbar;
