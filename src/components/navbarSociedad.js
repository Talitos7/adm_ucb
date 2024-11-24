import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida6' },
    { label: 'Empresas', path: '/EmpresasAliadas5' },
    { label: 'Pasantías', path: '/pasantiasEstudiantes4' },
    { label: 'Intercambios', path: '/intercambioAlum4' },
    { label: 'Sociedad Científica', path: '/PubliSociedadAlum' },
    { label: 'Alumni', path: '/AlumniUsuarios4' },
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
