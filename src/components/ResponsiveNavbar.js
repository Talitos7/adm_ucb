import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu'; // Ajusta si tu menú de cuenta es diferente
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ADMLogo.png';

const ResponsiveNavbar = ({ menuItems, darkMode, handleThemeChange }) => {
  const [anchorElNav, setAnchorElNav] = useState(null); // Para menú en dispositivos pequeños
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateTo = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" color="default" sx={{ padding: '0.5rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo de la aplicación */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 40, width: 'auto' }} />

        {/* Menú para pantallas pequeñas */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={() => navigateTo(item.path)}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Menú para pantallas grandes */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              sx={{
                my: 2,
                color: 'inherit',
                fontSize: '0.875rem', // Ajuste de tamaño más pequeño
                textTransform: 'none', // Evitar que el texto se transforme a mayúsculas
                '&:hover': {
                  color: '#1976d2', // Cambia el color al pasar el ratón (puedes cambiar el color aquí)
                  backgroundColor: 'transparent', // Puedes agregar un color de fondo si lo deseas
                },
              }}
              onClick={() => navigateTo(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Menú de cuenta */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Configuraciones">
            <AccountMenu darkMode={darkMode} handleThemeChange={handleThemeChange} />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveNavbar;
