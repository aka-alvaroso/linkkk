import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isGuestSession, setIsGuestSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/status`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
      } else {
        console.error(await res.json());
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const checkGuestSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/guest`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.isGuest) {
        setIsGuestSession(true);
      } else {
        setIsGuestSession(false);
      }
    } catch {
      setIsGuestSession(false);
    }
  };

  const createGuestSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/guest`, {
        method: "POST",
        credentials: "include",
      });
      setIsGuestSession(res.ok);
    } catch {
      setIsGuestSession(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const deleteGuestSession = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/guest`, {
        method: "DELETE",
      });
      setIsGuestSession(res.ok);
    } catch {
      setIsGuestSession(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const resLogin = await fetch(
          `${import.meta.env.VITE_API_URL}auth/status`,
          { credentials: "include" }
        );
        const loginData = await resLogin.json();

        const resGuest = await fetch(
          `${import.meta.env.VITE_API_URL}auth/guest`,
          { credentials: "include" }
        );
        const guestData = await resGuest.json();

        // Ahora actualizas el estado juntos
        setIsLoggedIn(loginData.isAuthenticated);
        setIsGuestSession(guestData.isGuest);

        // 🚀🚀🚀 ¡Aquí recién terminamos!
      } catch (error) {
        setIsLoggedIn(false);
        setIsGuestSession(false);
      } finally {
        setAuthLoading(false); // <-- Cuando ya están puestos los estados
      }
    };

    initAuth();
  }, []);

  // -----------------------------------------------------------------------------

  // Ignorar estos estados, (Son antiguos)
  const [token, setToken] = useState(null);
  const [guestToken, setGuestToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      console.error(e);
      return true;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedGuestToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("guestToken="))
      ?.split("=")[1];

    if (storedToken) {
      if (!isTokenExpired(storedToken)) {
        setToken(storedToken);
      } else {
        localStorage.removeItem("jwt");
      }
    }

    if (storedGuestToken) {
      if (!isTokenExpired(storedGuestToken)) {
        setGuestToken(storedGuestToken);
      } else {
        document.cookie = `guestToken=; expires=${new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 7
        ).toUTCString()}; path=/`;
      }
    }

    setLoading(false);
  }, []);

  const isAuthenticated = () => {
    return !!token && !isTokenExpired(token);
  };

  // const createGuestSession = async () => {
  //   if (!isAuthenticated() && !isGuestSession()) {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}auth/guest`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({}),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Guest session created");
  //       const data = await response.json();
  //       alert(JSON.stringify(data));
  //       document.cookie = `guestToken=${data.guestToken}; expires=${new Date(
  //         new Date().getTime() + 1000 * 60 * 60 * 24 * 7
  //       ).toUTCString()}; path=/`;
  //       setGuestToken(data.guestToken);
  //     } else {
  //       console.error(response.json());
  //     }
  //   }
  // };

  const value = {
    authLoading,
    isLoggedIn,
    isGuestSession,
    checkLoginStatus,
    logout,
    checkGuestSession,
    createGuestSession,
    deleteGuestSession,

    token,
    loading,
    guestToken,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
