import React, { useEffect, useState } from 'react';
import NavbarAdmin from './navbaradmin';
import NavbarUsuario from './NavbarUsuario';
import NavbarInvitado from './NavbarInvitado';
import axios from 'axios';

const DynamicNavbar = ({ darkMode, handleThemeChange }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const response = await axios.get(
            `http://localhost/adm_ucb/src/servicios/loginUsuarios.php?emailAdm=${user.emailadm}&tipo=rol`
          );
          const { rol } = response.data;

          // Roles que comparten el mismo navbar
          const usuarioRoles = ['estudiante', 'sociedad', 'alumni', 'intercambios','centro'];

          if (rol === 'admin') {
            setRole('admin');
          } else if (usuarioRoles.includes(rol)) {
            setRole('usuario');
          } else {
            setRole('invitado');
          }
        } else {
          setRole('invitado');
        }
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
        setRole('invitado');
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return null; // Mientras carga, no muestra ningún navbar
  }

  // Renderiza solo un navbar basado en el rol
  switch (role) {
    case 'admin':
      return <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />;
    case 'usuario': // Para roles compartidos
      return <NavbarUsuario darkMode={darkMode} handleThemeChange={handleThemeChange} />;
    case 'invitado':
    default:
      return <NavbarInvitado darkMode={darkMode} handleThemeChange={handleThemeChange} />;
  }
};

export default DynamicNavbar;
