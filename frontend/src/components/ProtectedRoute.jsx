import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Mientras verifica la autenticación, muestra un loader
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, muestra el contenido
  return children;
}

export default ProtectedRoute;