import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importación única
import NavbarInvitado from './components/NavbarInvitado';
import NavbarEstudiante from './components/NavbarEstudiante';
import NavbarAdmin from './components/navbaradmin';
import Pasantias from './views/pasantias';
import PerfilAdm from './views/perfil';
import PerfilAlumni from './views/PerfilAlu';
import PerfilCentro from './views/PerfilCen';
import PerfilEstudiante from './views/PerfilEst';
import PerfilIntercambio from './views/PerfilInt';
import PerfilSociedad from './views/PerfilSoc';
import CarouselSection from './components/CarouselSection';
import DocenteSection from './components/DocenteSection';
import Footer from './components/Footer';
import InfoSec from './components/secInfo'
import BeneficiosSec from './components/beneficiosSec'
import AdminPage from './views/admin';
import EstudiantePage from './views/estudiante'
import PasantiasUsuario from './views/pasantiasEstudiantes'
import AlumniUsuarios from './views/AlumniUsuarios'
//Estudiantes
import PublicacionesdeInter from './views/IntercambioParaUsuarios'
import SociedadUsuarios from './views/SociedadUsuarios'
import EventosUsuario from './views/EventosUsuarios'
//Intercambio
import IntercambioPage from './views/IntercambioPage';
import Bienvenida4 from './views/Bienvenida4'
import NavbarIntercambio from './components/navbarIntercambio'
import PasantiasUsuario2 from './views/pasantiasEstudiantes2'
import PIntercambio from './views/IntercambioParaAlum'
import Empresas3 from './views/EmpresasAliadas3'
import AlumniUsuario2 from './views/AlumniUsuarios2'
import SociedadUsuarios2 from './views/SociedadUsuarios2'
import Eventos2 from './views/EventosUsuarios1'
//Alumni
import AlumniPage from './views/AlumniPage';
import NavbarAlunmni from './components/navbarAlumni'
import Empresas2 from './views/EmpresasAliadas2'
import Eventos3 from './views/EventosUsuarios2'
//Centro
import CentroPage from './views/centroPage'
import Bienvenida5 from './views/Bienvenida5'
import Empresas4 from './views/EmpresasAliadas4'
import PasantiasUsuario3 from './views/pasantiasEstudiantes3'
import Interambios3 from './views/IntercambiosAlum3'
import SociedadUsuarios3 from './views/SociedadUsuarios3'
import AlumniUsuarios3 from './views/AlumniUsuarios3'
import EventosPu from './views/EventosView2'
import NavbarCentro from './components/navbarCentro'
//Sociedad
import SociedadPage from './views/sociedadPage';
import Bienvenida6 from './views/Bienvenida6'
import Empresas5 from './views/EmpresasAliadas5'
import PasantiasUsuario4 from './views/pasantiasEstudiantes4'
import Intercambios4 from './views/intercambioAlum4'
import NavbarSociedad from './components/navbarSociedad'
import SociedadPubli from './views/PubliSociedadAlum'
import AlumniUsuarios4 from './views/AlumniUsuarios4'
//cosas
import Editar from './views/edit'
import PublicationsIntercambio from './views/PublicationsIntercambio';
import Bienvenida from './views/Bienvenida'
import Bienvenida2 from './views/Bienvenida2'
import Bienvenida3 from './views/Bienvenida3'
import PublicationsAlumni from './views/PublicationsAlumni';
import PublicationsAlumni2 from './views/PublicationsparaAlumni';
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
       
          {/* Página para editar */}
          <Route
            path="/Editar"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Editar />
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

          {/* Página de Bienvenida*/}
          <Route
            path="/Bienvenida"
            element={
              <>
                <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida darkMode={darkMode} />
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
          <Route 
            path="/MallaCurricular" 
            element={
              <>
                <NavbarInvitado darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <MallaCurricular darkMode={darkMode} handleThemeChange={handleThemeChange}/>
                <Footer />
              </>
            } 
          />
          {/* Ruta para la página de Pasantías */}
          <Route path="/pasantias" element={
            <>
            <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <Pasantias /> {/* Componente que renderiza la vista de pasantías */}
            </>
          } />
          <Route path="/empresas" element={
          <>
          <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
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
            <AdminPublications darkMode={darkMode} />
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
          {/* Ruta para la página de PerfilADM */}
          <Route path="/perfilAdm" element={
            <>
              <NavbarAdmin darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilAdm /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

          {/* Ruta para la página de PerfilALUMNI */}
          <Route path="/perfilAlumni" element={
            <>
              <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilAlumni /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

          {/* Ruta para la página de PerfilCENTRO */}
          <Route path="/perfilCentro" element={
            <>
              <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilCentro /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

          {/* Ruta para la página de PerfilESTUDIANTE */}
          <Route path="/perfilEstudiante" element={
            <>
              <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilEstudiante /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

          {/* Ruta para la página de PerfilINTERCAMBIO */}
          <Route path="/perfilIntercambio" element={
            <>
              <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilIntercambio /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

          {/* Ruta para la página de PerfilSOCIEDAD */}
          <Route path="/perfilSociedad" element={
            <>
              <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* NavbarAdmin */}
              <PerfilSociedad /> {/* Componente que renderiza la vista de pasantías */}
            </>
          }/>

        {/* Página de estudiante */}
        <Route
            path="/estudiante"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <EstudiantePage />
              </>
            }
          />

          {/* Página de pasantías */}
          <Route
            path="/pasantiasEstudiantes"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PasantiasUsuario />
              </>
            }
          />

          {/* Página de Bienvenida*/}
          <Route
            path="/Bienvenida2"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida2 darkMode={darkMode} />
              </>
            }
          />

          {/* Página de Intercambio par estudiantes*/}
          <Route
            path="/IntercambioParaUsuarios"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PublicacionesdeInter darkMode={darkMode} />
              </>
            }
          />

          {/* Página de Sociedad para Estudiantes*/}
          <Route
            path="/SociedadUsuarios"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <SociedadUsuarios darkMode={darkMode} />
              </>
            }
          />

          {/* Página de Eventos para Estudiantes*/}
          <Route
            path="/EventosUsuarios"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <EventosUsuario darkMode={darkMode} />
              </>
            }
          />

          {/* Página de Alumni para Usuarios*/}
          <Route
            path="/AlumniUsuarios"
            element={
              <>
                <NavbarEstudiante darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AlumniUsuarios darkMode={darkMode} />
              </>
            }
          />
         {/* Página de estudiante de intercambio */}
         <Route
            path="/IntercambioPage"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <IntercambioPage />
              </>
            }
          />

          <Route
            path="/EventosUsuarios1"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Eventos2 />
              </>
            }
          />

          {/* Página de Bienvenida*/}
          <Route
            path="/Bienvenida4"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida4 darkMode={darkMode} />
              </>
            }
          />

          <Route
            path="/EmpresasAliadas3"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Empresas3 />
              </>
            }
          />

          {/* Página de publicaciones */}
          <Route
            path="/IntercambioParaAlum"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PIntercambio darkMode={darkMode} />
              </>
            }
          />

          <Route
            path="/pasantiasEstudiantes2"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PasantiasUsuario2 />
              </>
            }
          />

          <Route
            path="/AlumniUsuarios2"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AlumniUsuario2 darkMode={darkMode} />
              </>
            }
          />

          <Route
            path="/SociedadUsuarios2"
            element={
              <>
                <NavbarIntercambio darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <SociedadUsuarios2 darkMode={darkMode}/>
              </>
            }
          />

          {/* Página de estudiante de Alumni */}
         <Route
            path="/AlumniPage"
            element={
              <>
                <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AlumniPage />
              </>
            }
          />
          {/* Página de Bienvenida*/}
          <Route
            path="/Bienvenida3"
            element={
              <>
                <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida3 darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/EmpresasAliadas2"
            element={
              <>
                <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Empresas2 />
              </>
            }
          />

          <Route
            path="/PublicationsparaAlumni"
            element={
              <>
                <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PublicationsAlumni2 darkMode={darkMode}/>
              </>
            }
          />

          <Route
            path="/EventosUsuarios2"
            element={
              <>
                <NavbarAlunmni darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Eventos3 />
              </>
            }
          />

           {/* Página de estudiante del centro */}
         <Route
            path="/centroPage"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <CentroPage />
              </>
            }
          />

          <Route
            path="/Bienvenida5"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida5 />
              </>
            }
          />

          <Route
            path="/EmpresasAliadas4"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Empresas4 />
              </>
            }
          />

        <Route
            path="/pasantiasEstudiantes3"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PasantiasUsuario3 />
              </>
            }
          />

          <Route
            path="/IntercambiosAlum3"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Interambios3 darkMode={darkMode}/>
              </>
            }
          />
          
          <Route
            path="/SociedadUsuarios3"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <SociedadUsuarios3 darkMode={darkMode}/>
              </>
            }
          />

          <Route
            path="/AlumniUsuarios3"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AlumniUsuarios3 darkMode={darkMode}/>
              </>
            }
          />

          <Route
            path="/EventosView2"
            element={
              <>
                <NavbarCentro darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <EventosPu />
              </>
            }
          />

          {/* Página de eSociedad*/}
         <Route
            path="/sociedadPage"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <SociedadPage/>
              </>
            }
          />

          <Route
            path="/Bienvenida6"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Bienvenida6/>
              </>
            }
          />

          <Route
            path="/EmpresasAliadas5"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Empresas5/>
              </>
            }
          />

          <Route
            path="/pasantiasEstudiantes4"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <PasantiasUsuario4/>
              </>
            }
          />

          <Route
            path="/intercambioAlum4"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Intercambios4 darkMode={darkMode}/>
              </>
            }
          />
          
          <Route
            path="/PubliSociedadAlum"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <SociedadPubli darkMode={darkMode}/>
              </>
            }
          />

          <Route
            path="/AlumniUsuarios4"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <AlumniUsuarios4 darkMode={darkMode}/>
              </>
            }
          />

          <Route
            path="/EventosUsuarios3"
            element={
              <>
                <NavbarSociedad darkMode={darkMode} handleThemeChange={handleThemeChange} />
                <Eventos3/>
              </>
            }
          />

        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
