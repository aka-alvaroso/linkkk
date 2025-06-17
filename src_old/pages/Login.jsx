import React from "react";
import { useNavigate } from "react-router-dom";

import { useUserData } from "../context/UserDataContext";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { refreshUserData } = useUserData();
  const { showNotification } = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();

    const isLoggedIn = await login(
      document.querySelector("#username").value,
      document.querySelector("#password").value
    );

    if (!isLoggedIn) {
      showNotification({
        title: "Error",
        message: "No se pudo iniciar sesión",
        type: "error",
      });
    } else {
      await refreshUserData({
        onlyLinks: false,
        onlyGroups: false,
        onlyTags: false,
        onlyCountries: false,
      });
      showNotification({
        title: "Sesión iniciada",
        message: "¡Bienvenido de nuevo!",
        type: "success",
      });
    }
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
      {/* El div que contenía la imagen se elimina */}
      <div className="relative mx-auto py-18 bg-yellow text-navy shadow-[15px_15px_0_0_rgba(24,30,106)] w-10/12 flex flex-col items-center justify-center rounded-4xl xl:w-1/3">
        {/* La imagen ahora es hija de este div y se posiciona relativamente a él */}
        <img
          src="/images/linky_muro.png"
          alt="Linky character security"
          className="absolute bottom-2/3 xs:bottom-1/2 left-1/2 -translate-x-1/2 scale-60 z-10 mb-[-20px] sm:mb-[-30px] md:mb-[-40px]" // Clases modificadas para posicionamiento
        />
        <h1 className="text-4xl font-bold text-center z-10 font-brice">
          Iniciar Sesión
        </h1>
        <h4 className="text-center mt-4  z-1">¡Bienvenido de vuelta!</h4>
        <form className="w-11/12 flex flex-col items-center justify-center z-1 xl:w-2/3">
          <input
            type="text"
            id="username"
            placeholder="Usuario"
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-white z-1"
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-white z-1"
          />
          <button
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-transparent text-navy border-2 border-orange border-dashed z-1 hover:cursor-pointer hover:bg-orange hover:text-navy transition"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 z-1">
          ¿No tienes cuenta?{" "}
          <button
            className="underline hover:text-primary hover:cursor-pointer transition"
            onClick={() => navigate("/register")}
          >
            Regístrate
          </button>
        </p>

        <p className="mt-4 z-1">
          <button
            className="underline hover:text-primary hover:cursor-pointer transition"
            onClick={() => navigate("/")}
          >
            Prefiero seguir como invitado
          </button>
        </p>
      </div>
    </div>
  );
}
