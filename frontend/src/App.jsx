import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test.jsx";
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
  return (
    <Routes>
      {/* Rutas públicas sin layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/r/:shortCode" element={<Redirect />} />

      {/* Rutas con layout responsivo */}
      <Route element={<ResponsiveLayout />}>
        <Route path="/links" element={<MyLinks />} />

        <Route path="/" element={<Home />} />
        <Route path="/links/create" element={<CreateLink />} />

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

      <Route path="/:shortCode" element={<Redirect />} />
      {/* Ruta 404 */}
      <Route path="notfound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
