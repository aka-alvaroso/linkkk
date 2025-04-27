import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/Auth.jsx";

import Redirect from "./components/Redirect.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Groups from "./pages/Groups.jsx";
import Tags from "./pages/Tags.jsx";
import NotFound from "./pages/404.jsx";
import MyLinks from "./pages/MyLinks.jsx";
import CreateLink from "./pages/CreateLink.jsx";
import MobileLayout from "./Layouts/Mobile.jsx";
import DesktopLayout from "./Layouts/Desktop.jsx";
import { useState, useEffect } from "react";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestOrUserRoute from "./components/GuestOrUserRoute.jsx";

// Componente responsivo que elige el layout adecuado
function ResponsiveLayout({ children }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? (
    <DesktopLayout>{children}</DesktopLayout>
  ) : (
    <MobileLayout>{children}</MobileLayout>
  );
}

function App() {
  const { authChecked } = useAuth();

  if (!authChecked) {
    return <div>Cargando aplicación...</div>; // Protegemos la app entera si quieres
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/r/:shortCode" element={<Redirect />} />

      {/* Rutas que requieren mínimo sesión de invitado */}
      <Route element={<ResponsiveLayout />}>
        <Route
          path="/links"
          element={
            <GuestOrUserRoute>
              <MyLinks />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/"
          element={
            <GuestOrUserRoute>
              <Home />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/links/create"
          element={
            <GuestOrUserRoute>
              <CreateLink />
            </GuestOrUserRoute>
          }
        />

        {/* Rutas que requieren ser usuario logueado */}
        <Route
          path="/dashboard/:shortCode"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tags"
          element={
            <ProtectedRoute>
              <Tags />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Rutas públicas */}
      <Route path="/:shortCode" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
