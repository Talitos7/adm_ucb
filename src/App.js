import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importación única
import NavbarInvitado from './components/NavbarInvitado';
//import NavbarEstudiante from './components/NavbarEstudiante';
import NavbarAdmin from './components/navbaradmin';
import Pasantias from './views/pasantias';
import Perfil from './views/perfil';
import CarouselSection from './components/CarouselSection';
import DocenteSection from './components/DocenteSection';
import Footer from './components/Footer';
import InfoSec from './components/secInfo'
import BeneficiosSec from './components/beneficiosSec'
import AdminPage from './views/admin';
import PublicationsIntercambio from './views/PublicationsIntercambio';
import PublicationsAlumni from './views/PublicationsAlumni';
import PublicationsSociedad from './views/PublicationsSociedad';
import MallaCurricular from './views/MallaCurricular';
import LoginPage from './views/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmpresasAliadas from './views/EmpresasAliadas';
import EmpresasAliadasAdmi from './views/EmpresasAliadasAdmi';
import UserRegistrationForm from './views/UserRegistrationForm';
import AdminPublications from './views/AdminPublications';
import Eventos from './views/EventosView.js';
import './App.css'; 

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#303030' : '#f5f5f5',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        <Route path="/login" element={<LoginPage />} />
          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <NavbarInvitado darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <CarouselSection />
                <DocenteSection />
                <InfoSec/>
                <BeneficiosSec/>
                <Footer />
              </>
            }
          />

          {/* Página de administración */}
          <Route
            path="/admin"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AdminPage />
              </>
            }
          />

          {/* Página de pasantías */}
          <Route
            path="/pasantias"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Pasantias />
              </>
            }
          />

          {/* Página de publicaciones */}
          <Route
            path="/PublicationsIntercambio"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PublicationsIntercambio darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/PublicationsSociedad"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PublicationsSociedad darkMode={darkMode} />
              </>
            }
          />
           <Route
            path="/PublicationsAlumni"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PublicationsAlumni darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/UserRegistrationForm"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <UserRegistrationForm darkMode={darkMode} />
              </>
            }
          />
          <Route path="/MallaCurricular" element={<MallaCurricular darkMode={darkMode} />} />

          {/* Ruta para la página de Pasantías */}
          <Route path="/pasantias" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <Pasantias /> {/* Componente que renderiza la vista de pasantías */}
          </>
          } />
          <Route path="/empresas" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <EmpresasAliadas />
          </>
          } />
          <Route path="/empresasAdmi" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <EmpresasAliadasAdmi />
          </>
          } />
          <Route path="/AdminPublications" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <AdminPublications />
          </>
          } />
          <Route
            path="/eventos"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Eventos darkMode={darkMode} />
              </>
            }
          />
        {/* Ruta para la página de Perfil */}
          <Route path="/perfil" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <Perfil /> {/* Componente que renderiza la vista de pasantías */}
          </>
        } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
