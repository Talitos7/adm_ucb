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
import AccountMenu from './AccountMenuAdm'; // Ajusta si tu menú de cuenta es diferente
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ADMLogo.png';

const ResponsiveNavbarI = ({ menuItems, darkMode, handleThemeChange }) => {
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
      <Toolbar>
        {/* Logo de la aplicación */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 40, width: 'auto' }} />

        {/* Contenedor para los items del menú y el botón de cuenta */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {/* Menú para pantallas grandes */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: 'inherit',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#1976d2',
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={() => navigateTo(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Menú para pantallas pequeñas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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

          {/* Menú de cuenta */}
          <Tooltip title="Configuraciones">
            <AccountMenu darkMode={darkMode} handleThemeChange={handleThemeChange} />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveNavbarI;
