import React from 'react';
import ResponsiveNavbar from './ResponsiveNavbar';

const NavbarInvitado = ({ darkMode, handleThemeChange }) => {
  const menuItems = [
    { label: 'Inicio', path: '/' },
  ]; // Sin opciones, solo Inicio

  return (
    <ResponsiveNavbar
      menuItems={menuItems}
      darkMode={darkMode}
      handleThemeChange={handleThemeChange}
    />
  );
};

export default NavbarInvitado;
