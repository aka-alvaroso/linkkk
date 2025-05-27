import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestSession, setIsGuestSession] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/status`, {
        credentials: "include",
      });
      const data = await res.json();
      setIsLoggedIn(data.isAuthenticated);
      setUser(data.user);
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

  const login = async (username, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        setUser(data.user);
        return true;
      } else {
        const data = await res.json();
        console.log(data.details);
        return false;
      }
    } catch (error) {
      console.error("Error iniciando sesión", error);
      return false;
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

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isGuestSession,
        authLoading,
        authChecked,
        checkLoginStatus,
        checkGuestSession,
        createGuestSession,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
