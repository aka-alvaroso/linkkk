import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

function ProtectedRoute({ children }) {
  const { authChecked, checkLoginStatus } = useAuth();
  const navigate = useNavigate();
  const [revalidating, setRevalidating] = useState(false);
  const location = useLocation();

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
  }, [authChecked, checkLoginStatus, navigate, location.pathname]);

  if (!authChecked || revalidating) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    ); // Spinner bonito
  }

  return children;
}

export default ProtectedRoute;
