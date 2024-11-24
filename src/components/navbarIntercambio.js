import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbarI';

const NavbarUsuario = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Bienvenida', path: '/Bienvenida4' },
    { label: 'aefgesgseg', path: '/EmpresasAliadas3' },
    { label: 'Empresas', path: '/EmpresasAliadas3' },
    { label: 'Pasantías', path: '/pasantiasEstudiantes2' },
    { label: 'Intercambios', path: '/IntercambioParaAlum' },
    { label: 'Sociedad Científica', path: '/SociedadUsuarios2' },
    { label: 'Alumni', path: '/AlumniUsuarios2' },
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
