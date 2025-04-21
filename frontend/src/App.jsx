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
import { AuthProvider } from "./context/Auth.jsx";
import { useState, useEffect } from "react";

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
    <AuthProvider>
      <Routes>
        {/* Rutas públicas sin layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="/r/:shortCode" element={<Redirect />} />

        {/* Rutas con layout responsivo */}
        <Route element={<ResponsiveLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:shortCode" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/links" element={<MyLinks />} />
          <Route path="/links/create" element={<CreateLink />} />
        </Route>

        <Route path="/:shortCode" element={<Redirect />} />
        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
