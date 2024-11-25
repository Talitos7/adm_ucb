import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida2' },
    { label: 'Empresas', path: '/empresas' },
    { label: 'Pasantías', path: '/pasantiasEstudiantes' },
    { label: 'Intercambios', path: '/IntercambioParaUsuarios' },
    { label: 'Sociedad Científica', path: '/SociedadUsuarios' },
    { label: 'Alumni', path: '/AlumniUsuarios' },
    { label: 'Eventos', path: '/EventosUsuarios' }, // Nueva opción
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
