import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DynamicNavbar from './components/DynamicNavbar';
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
import EmpresasAliadas from './views/EmpresasAliadas';
import EmpresasAliadasAdmi from './views/EmpresasAliadasAdmi';
import UserRegistrationForm from './views/UserRegistrationForm';
import AdminPublications from './views/AdminPublications';
import EventosView from './views/EventosView'; // Asegúrate de que la ruta sea correcta
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
        {/* Navbar dinámico */}
        <DynamicNavbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Routes>
          {/* Página de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <CarouselSection />
                <DocenteSection />
                <InfoSec/>
                <BeneficiosSec/>
                <Footer />
              </>
            }
          />

          {/* Página de administración */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Página de pasantías */}
          <Route path="/pasantias" element={<Pasantias />} />

          {/* Publicaciones */}
          <Route path="/PublicationsIntercambio" element={<PublicationsIntercambio />} />
          <Route path="/PublicationsSociedad" element={<PublicationsSociedad />} />
          <Route path="/PublicationsAlumni" element={<PublicationsAlumni />} />

          {/* Registro de usuario */}
          <Route path="/UserRegistrationForm" element={<UserRegistrationForm />} />

          {/* Empresas */}
          <Route path="/empresas" element={<EmpresasAliadas />} />
          <Route path="/empresasAdmi" element={<EmpresasAliadasAdmi />} />

          {/* Publicaciones de administración */}
          <Route path="/AdminPublications" element={<AdminPublications />} />

          {/* Eventos */}
          <Route path="/eventos" element={<EventosView />} />

          {/* Perfil del usuario */}
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
