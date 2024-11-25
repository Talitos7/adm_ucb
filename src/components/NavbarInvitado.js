import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbar';

const NavbarInvitado = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Malla Curricular', path: '/MallaCurricular' }, // Nuevo enlace
  ];  

  return (
    <ResponsiveNavbar
      menuItems={menuItems}
      darkMode={darkMode}
      handleThemeChange={handleThemeChange}
    />
  );
};

export default NavbarInvitado;
