import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida5' },
    { label: 'Empresas', path: '/EmpresasAliadas4' },
    { label: 'Pasantías', path: '/pasantiasEstudiantes3' },
    { label: 'Intercambios', path: '/IntercambiosAlum3' },
    { label: 'Sociedad Científica', path: '/SociedadUsuarios3' },
    { label: 'Alumni', path: '/AlumniUsuarios3' },
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
