import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.token);
      navigate("/");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
      <div className="relative mx-auto py-18 bg-yellow text-navy shadow-[15px_15px_0_0_rgba(24,30,106)] w-10/12 flex flex-col items-center justify-center rounded-4xl xl:w-1/3">
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
          {error && <p className="mt-4 text-red-500 z-1">Error: {error}</p>}
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
