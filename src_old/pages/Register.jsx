import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useUserData } from "../context/UserDataContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { refreshUserData } = useUserData();
  const { showNotification } = useNotification();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const session = await login(username, password);
      if (session) {
        await refreshUserData();
        showNotification({
          title: "¡Bienvenido!",
          type: "success",
        });
        navigate("/");
      } else {
        showNotification({
          title: "Error",
          message: "Login failed.",
          type: "error",
        });
      }
    } else {
      let errorMessage = "Error en el registro.";

      try {
        const errorData = await response.json();

        if (errorData && errorData.details) {
          errorMessage = errorData.details;
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message; // Fallback a errorData.message
        }
      } catch (error) {
        try {
          errorMessage =
            "Error en el registro: Respuesta inválida del servidor.";
        } catch (textErr) {
          errorMessage =
            "Error en el registro: No se pudo leer la respuesta del servidor.";
        }
      }
      showNotification({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
      <div className="relative mx-auto py-18 bg-lavender text-navy shadow-[15px_15px_0_0_rgba(24,30,106)] w-10/12 flex flex-col items-center justify-center rounded-4xl xl:w-1/3">
        <h1 className="text-4xl font-bold text-center z-10 font-brice">
          Crear cuenta
        </h1>
        <h4 className="text-center mt-4  z-1">
          ¡Accede a todas las funcionalidades!
        </h4>
        <form className="w-11/12 flex flex-col items-center justify-center z-1 xl:w-2/3">
          <input
            type="text"
            id="username"
            placeholder="Usuario"
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-white z-1"
          />
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-white z-1"
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-white z-1"
          />
          <button
            className="mt-4 w-11/12 h-10 p-2 rounded-xl bg-transparent text-navy border-2 border-yellow border-dashed z-1 hover:cursor-pointer hover:bg-yellow hover:text-navy transition"
            onClick={handleRegister}
          >
            Registrarme
          </button>
        </form>
        <p className="mt-4 z-1">
          ¿Ya tienes cuenta?{" "}
          <button
            className="underline hover:text-primary hover:cursor-pointer transition"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
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
