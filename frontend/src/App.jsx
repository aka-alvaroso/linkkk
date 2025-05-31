import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/Auth.jsx";
import { useUserData } from "./context/UserDataContext.jsx";

// import Redirect from "./pages/Redirect.jsx";
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
import LegalNotice from "./pages/legal_notice.jsx";
import TermsAndConditions from "./pages/terms.jsx";
import PrivacyPolicy from "./pages/privacy.jsx";

import { useState, useEffect } from "react";

import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import GuestOrUserRoute from "./components/Auth/GuestOrUserRoute.jsx";
import LoadingPage from "./pages/Loading.jsx";

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
  const { loading: userDataLoading } = useUserData();

  if (!authChecked || userDataLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      {/* Rutas públicas */}

      {/* Rutas que requieren mínimo sesión de invitado */}
      <Route element={<ResponsiveLayout />}>
        <Route
          path="/login"
          element={
            <GuestOrUserRoute>
              <Login />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestOrUserRoute>
              <Register />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/legal"
          element={
            <GuestOrUserRoute>
              <LegalNotice />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <GuestOrUserRoute>
              <TermsAndConditions />
            </GuestOrUserRoute>
          }
        />
        <Route
          path="/privacy"
          element={
            <GuestOrUserRoute>
              <PrivacyPolicy />
            </GuestOrUserRoute>
          }
        />
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
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
