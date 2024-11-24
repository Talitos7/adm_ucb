import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida2' },
    { label: 'Empresas', path: '/empresas' },
    { label: 'Pasantías', path: '/pasantiasEstudiantes' },
    { label: 'Intercambios', path: '/PublicationsIntercambio' },
    { label: 'Sociedad Científica', path: '/PublicationsSociedad' },
    { label: 'Alumni', path: '/AlumniUsuarios' },
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
