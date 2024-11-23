import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DynamicNavbar from './components/DynamicNavbar';
import Pasantias from './views/pasantias';
import Perfil from './views/perfil';
import CarouselSection from './components/CarouselSection';
import DocenteSection from './components/DocenteSection';
import Footer from './components/Footer';
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
        <DynamicNavbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <CarouselSection />
                <DocenteSection />
                <MallaCurricular />
                <Footer />
              </>
            }
          />

          {/* Página de administración */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Página de pasantías */}
          <Route path="/pasantias" element={<Pasantias />} />

          {/* Página de publicaciones */}
          <Route path="/PublicationsIntercambio" element={<PublicationsIntercambio darkMode={darkMode} />} />
          <Route path="/PublicationsSociedad" element={<PublicationsSociedad darkMode={darkMode} />} />
          <Route path="/PublicationsAlumni" element={<PublicationsAlumni darkMode={darkMode} />} />

          {/* Registro de usuario */}
          <Route path="/UserRegistrationForm" element={<UserRegistrationForm darkMode={darkMode} />} />

          {/* Empresas */}
          <Route path="/empresas" element={<EmpresasAliadas />} />
          <Route path="/empresasAdmi" element={<EmpresasAliadasAdmi />} />

          {/* Publicaciones de administración */}
          <Route path="/AdminPublications" element={<AdminPublications />} />

          {/* Perfil del usuario */}
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
