import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/Auth";
import { Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [active, setActive] = useState("home");

  return (
    <div className="w-full bg-primary z-1000 mx-auto">
      <div className="w-full flex p-3 items-center justify-start lg:w-5/6 xl:w-4/6 mx-auto">
        <button
          className="w-[50px] h-[50px] rounded-xl border-2 border-white text-white text-2xl font-[900] hover:cursor-pointer hover:bg-white hover:text-primary transition"
          onClick={() => {
            navigate("/");
            setActive("home");
          }}
        >
          k.
        </button>

        <div className="hidden lg:flex lg:ml-5 justify-between items-center w-3/5">
          <button
            className="flex h-[50px] items-center gap-1 px-2 rounded-xl text-yellow bg-transparent border-2 border-yellow border-dashed font-bold text-sm hover:cursor-pointer hover:bg-yellow hover:text-primary transition"
            onClick={() => {
              navigate("/links/create");
              setActive("create");
            }}
          >
            <Plus width={20} height={20} />
            Crear enlace
          </button>
          <button
            className={`hover:cursor-pointer ${
              active === "home" ? "text-yellow" : "text-white"
            }`}
            onClick={() => {
              navigate("/");
              setActive("home");
            }}
          >
            Inicio
          </button>
          <button
            className={`hover:cursor-pointer ${
              active === "links" ? "text-yellow" : "text-white"
            }`}
            onClick={() => {
              navigate("/links");
              setActive("links");
            }}
          >
            Mis enlaces
          </button>
          <button
            className={`hover:cursor-pointer ${
              active === "groups" ? "text-yellow" : "text-white"
            }`}
            onClick={() => {
              navigate("/groups");
              setActive("groups");
            }}
          >
            Mis grupos
          </button>
          <button
            className={`hover:cursor-pointer ${
              active === "tags" ? "text-yellow" : "text-white"
            }`}
            onClick={() => {
              navigate("/tags");
              setActive("tags");
            }}
          >
            Mis etiquetas
          </button>
        </div>

        {isAuthenticated() ? (
          <button
            className="ml-auto relative h-[50px] rounded-xl py-1 px-4 flex items-center gap-2 transition bg-coral text-white border-2 border-coral border-dashed hover:cursor-pointer hover:bg-transparent hover:text-coral"
            onClick={() => {
              logout();
            }}
          >
            Cerrar sesión
          </button>
        ) : (
          <button
            className="ml-auto relative h-[50px] rounded-xl py-1 px-4 flex items-center gap-2 transition bg-primary text-white border-2 border-white border-dashed hover:cursor-pointer hover:bg-white hover:text-primary"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </div>
  );
}
