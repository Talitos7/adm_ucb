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
  Switch,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
            <Button key={item.label} sx={{ my: 2, color: 'inherit' }} onClick={() => navigateTo(item.path)}>
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Controles para tema oscuro y menú de cuenta */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleThemeChange} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <Tooltip title="Configuraciones">
            <AccountMenu /> {/* Este componente debe ser reutilizable y contener las opciones del usuario */}
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveNavbar;
