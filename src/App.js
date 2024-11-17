import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Asegúrate de tener react-router-dom
import Navbar from './components/Navbar'; // Para la página principal
import NavbarAdmin from './components/navbaradmin'; // Para la página Admin
import Pasantias from './views/pasantias'; // Asegúrate de importar la vista de pasantías
import CarouselSection from './components/CarouselSection';
import DocenteSection from './components/DocenteSection';
import MallaSection from './components/MallaCurricularSection';
import Footer from './components/Footer';
import AdminPage from './views/admin'; // Importa tu página Admin
import LoginPage from './views/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
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
    <Router> {/* Envuelve todo con Router */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={
            <>
              <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
              <CarouselSection />
              <DocenteSection />
              <MallaSection />
              <Footer /> {/* Footer fuera de las rutas */}
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          {/* Ruta para la página Admin con su Navbar específico */}
          <Route path="/admin" element={
            <>
              <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <AdminPage/> {/* Página de administración */}
            </>
          } />

          {/* Ruta para la página de Pasantías */}
          <Route path="/pasantias" element={
          <>
          <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
            <Pasantias /> {/* Componente que renderiza la vista de pasantías */}
          </>
        } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
