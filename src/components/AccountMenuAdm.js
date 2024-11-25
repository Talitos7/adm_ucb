import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AccountMenu = ({ darkMode, handleThemeChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserExit = () => {
    localStorage.removeItem('userRole'); // Opcional: limpiar el rol del usuario
    navigate('/'); // Redirige al inicio de sesión o página principal
  };

  const handlePerfilClick = () => {
    const userRole = localStorage.getItem('usuarioRol'); // Recupera el rol del usuario
    switch (userRole) {
      case 'admin':
        navigate('/perfilAdm');
        break;
      case 'alumni':
        navigate('/perfilAlumni');
        break;
      case 'centro':
        navigate('/perfilCentro');
        break;
      case 'estudiante':
        navigate('/perfilEstudiante');
        break;
      case 'intercambio':
        navigate('/perfilIntercambio');
        break;
      case 'sociedad':
        navigate('/perfilSociedad');
        break;
      default:
        navigate('/'); // Redirige a la página principal en caso de rol desconocido
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Configuraciones">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle fontSize="large" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handlePerfilClick}>
          <Avatar /> Ver perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleThemeChange}>
          <ListItemIcon>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </MenuItem>
        <MenuItem onClick={handleUserExit}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
