import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn, authChecked, checkLoginStatus } = useAuth();
  const navigate = useNavigate();
  const [revalidating, setRevalidating] = useState(false);

  useEffect(() => {
    if (!authChecked) return; // Todavía no hemos cargado el auth del todo.

    const validateSession = async () => {
      setRevalidating(true);
      const stillLoggedIn = await checkLoginStatus();
      setRevalidating(false);

      if (!stillLoggedIn) {
        navigate("/login");
      }
    };

    validateSession();
  }, [authChecked, checkLoginStatus, navigate]);

  if (!authChecked || revalidating) {
    return <div>Cargando sesión...</div>; // Spinner bonito
  }

  return children;
}

export default ProtectedRoute;
