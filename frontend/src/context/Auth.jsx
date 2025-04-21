import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      console.error(e);
      return true;
    }
  };

  // Cargar datos de autenticación al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      // Check if token is valid before setting it
      if (!isTokenExpired(storedToken)) {
        setToken(storedToken);
      } else {
        // Token is expired, clear localStorage
        localStorage.removeItem("jwt");
      }
    }

    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (jwtToken) => {
    setToken(jwtToken);

    // Guardar en localStorage para persistencia
    localStorage.setItem("jwt", jwtToken);
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);

    // Eliminar datos del localStorage
    localStorage.removeItem("jwt");
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!token && !isTokenExpired(token);
  };

  // Valores y funciones que estarán disponibles en el contexto
  const value = {
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
