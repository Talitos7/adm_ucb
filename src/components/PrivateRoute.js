import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return usuario ? children : <Navigate to="/login" />;
}

// En las rutas:
<Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />