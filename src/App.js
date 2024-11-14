import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CarouselSection from './components/CarouselSection'; 
import DocenteSection from './components/DocenteSection'; 
import MallaSection from './components/MallaCurricularSection'
import Footer from './components/Footer'
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <CarouselSection /> {/* Primera sección de la página con carrusel */}
      <DocenteSection /> {/* Sección de docentes */}
      <MallaSection/> {/* Sección de malla */}
      <Footer/> {/* Sección de Footer*/}
      <Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
