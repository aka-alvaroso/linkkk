import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Loading from "../components/Loading";

function GuestOrUserRoute({ children }) {
  const {
    authChecked,
    checkLoginStatus,
    checkGuestSession,
    createGuestSession,
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateSession = async () => {
      // No hacemos nada hasta que el contexto haya terminado la primera carga
      if (!authChecked) return;

      setLoading(true);

      // Revalidar sesión de usuario
      const stillLoggedIn = await checkLoginStatus();
      // Revalidar sesión de invitado
      const stillGuest = await checkGuestSession();

      if (!stillLoggedIn && !stillGuest) {
        // Si no es user ni guest ➔ crear sesión de invitado
        await createGuestSession();
      }

      setLoading(false);
    };

    validateSession();
  }, [
    authChecked,
    checkLoginStatus,
    checkGuestSession,
    createGuestSession,
    location.pathname,
  ]);

  if (!authChecked || loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return children;
}

export default GuestOrUserRoute;
