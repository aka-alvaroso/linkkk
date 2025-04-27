import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestSession, setIsGuestSession] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false); // 👈 nuevo!

  const checkLoginStatus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/status`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(data.isAuthenticated);
      return data.isAuthenticated;
    } catch {
      setIsLoggedIn(false);
      return false;
    }
  };

  const checkGuestSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/guest`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsGuestSession(data.isGuest);
      return data.isGuest;
    } catch {
      setIsGuestSession(false);
      return false;
    }
  };

  const initializeAuth = async () => {
    setAuthLoading(true);

    const isLogged = await checkLoginStatus();
    const isGuest = await checkGuestSession();

    if (!isLogged && !isGuest) {
      await createGuestSession();
    }

    setAuthLoading(false);
    setAuthChecked(true);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const createGuestSession = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}auth/guest`, {
        method: "POST",
        credentials: "include",
      });
      setIsGuestSession(true);
    } catch (error) {
      console.error("Error creando sesión de invitado", error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/logout`, {
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setIsGuestSession(false);
      } else {
        console.error("Error cerrando sesión", res.json());
      }
    } catch (error) {
      console.error("Error cerrando sesión", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isGuestSession,
        authLoading,
        authChecked,
        checkLoginStatus,
        checkGuestSession,
        createGuestSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
