import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbar';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Empresas', path: '/empresas' },
    { label: 'Pasantías', path: '/pasantias' },
    { label: 'Intercambios', path: '/PublicationsIntercambio' },
    { label: 'Sociedad Científica', path: '/PublicationsSociedad' },
    { label: 'Alumni', path: '/PublicationsAlumni' },
    { label: 'Eventos', path: '/eventos' }, // Nueva opción
  ];

  return (
    <ResponsiveNavbar
      menuItems={menuItems}
      darkMode={darkMode}
      handleThemeChange={handleThemeChange}
    />
  );
};

export default NavbarUsuario;
