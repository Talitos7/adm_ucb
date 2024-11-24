import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';
const NavbarAdmin = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida' },
    { label: 'Empresas', path: '/empresasAdmi' },
    { label: 'Pasantías', path: '/pasantias' },
    { label: 'Publicaciones', path: '/AdminPublications' },
    { label: 'Sociedad Cientifica', path: '/PublicationsSociedad' },
    { label: 'Alumni', path: '/PublicationsAlumni' },
    { label: 'Intercambios', path: '/PublicationsIntercambio' },
    { label: 'Eventos', path: '/eventos' }, // Nueva opción
    { label: 'Solicitudes', path: '/AdminPublications' },
    { label: 'Registro', path: '/UserRegistrationForm' },
  ];

  return (
    <ResponsiveNavbar
      menuItems={menuItems}
      darkMode={darkMode}
      handleThemeChange={handleThemeChange}
    />
  );
};

export default NavbarAdmin;
