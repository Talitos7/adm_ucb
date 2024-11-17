import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarAdmin from './components/navbaradmin';
import Pasantias from './views/pasantias';
import CarouselSection from './components/CarouselSection';
import DocenteSection from './components/DocenteSection';
import MallaSection from './components/MallaCurricularSection';
import Footer from './components/Footer';
import AdminPage from './views/admin';
import PublicationsIntercambio from './views/PublicationsIntercambio';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import PublicationsSociedad from './views/PublicationsSociedad';

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
          {/* Página principal */}
          <Route
            path="/"
            element={
              <>
                <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <CarouselSection />
                <DocenteSection />
                <MallaSection />
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
        </Routes>
        
      </ThemeProvider>
    </Router>
  );
}

export default App;
