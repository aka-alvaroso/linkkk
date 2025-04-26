import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn, authLoading, checkLoginStatus } = useAuth();

  // Mientras verifica la autenticación, muestra un loader
  if (authLoading) {
    return <div>Cargando...</div>;
  }

  checkLoginStatus().then(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return children;
}

export default ProtectedRoute;
