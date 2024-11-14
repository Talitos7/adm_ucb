import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import AccountMenu from './AccountMenu';
import logo from '../assets/ADMLogo.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ darkMode, handleThemeChange }) {
  return (
    <AppBar position="static" color="default" sx={{ padding: '0.5rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo a la Izquierda */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 40, width: 'auto' }} />

        {/* Menú de Cuenta a la Derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleThemeChange} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={darkMode} onChange={handleThemeChange} color="default" />
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
