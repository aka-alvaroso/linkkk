import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/fonts.css"; // Añade esta línea
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <BrowserRouter>
      <AuthProvider>
        <UserDataProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </UserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </NotificationProvider>
);
