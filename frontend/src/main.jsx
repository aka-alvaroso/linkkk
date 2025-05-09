import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/fonts.css"; // Añade esta línea
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <BrowserRouter>
      <AuthProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </NotificationProvider>
);
