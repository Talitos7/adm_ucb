import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Hook de navegación

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Redirigir a la página admin cuando se hace clic en "Perfil"
  const handleProfileClick = () => {
    navigate('/admin'); // Redirige a la página admin
    handleClose(); // Cierra el menú
  };

  // Redirigir a la página admin cuando se hace clic en "Iniciar Sesión"
  const handleLoginClick = () => {
    navigate('/admin'); // Redirige a la página admin
    handleClose(); // Cierra el menú
  };

  // Redirigir a la página de Pasantías
  const handleInternshipsClick = () => {
    navigate('/pasantias'); 
    handleClose(); 
  };

  const handleEmpresasClick = () => {
    navigate('/empresas'); 
    handleClose(); 
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }} onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          Perfil
        </Typography>
        <Typography sx={{ minWidth: 100 }}>Registro de Usuarios</Typography>
        <Typography sx={{ minWidth: 100 }} onClick={handleInternshipsClick} style={{ cursor: 'pointer' }}>
          Pasantías
        </Typography>
        <Typography sx={{ minWidth: 100 }}>Eventos</Typography>
        <Typography sx={{ minWidth: 100 }}>Solicitudes</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle fontSize="large" /> {/* Ícono de perfil vacío */}
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
        <MenuItem onClick={handleLoginClick}> {/* Redirige a admin */}
          <Avatar /> Iniciar Sesión
        </MenuItem>
        <Divider />
        {/* Nueva opción para redirigir a Pasantías */}
        <MenuItem onClick={handleInternshipsClick}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Pasantías
        </MenuItem>
        {/* Nueva opción para redirigir a Empresas */}
        <MenuItem onClick={handleEmpresasClick}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Empresas
        </MenuItem>
        <MenuItem onClick={handleClose}>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
