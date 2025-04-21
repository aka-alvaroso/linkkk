import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/Auth";
import { Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("home");
  let username = "";

  if (isAuthenticated()) {
    const token = localStorage.getItem("jwt");
    username = jwtDecode(token).username;
  }

  return (
    <div className="sticky w-11/12 flex items-center justify-start p-2.5 bg-red-800 z-1000 rounded-4xl backdrop-blur-sm mx-auto xl:w-full md:mb-2">
      <button
        className="w-[50px] h-[50px] rounded-3xl rounded-tl-md rounded-br-md bg-neutral-800 text-white text-2xl font-[900] hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        k.
      </button>

      <div className="hidden md:flex md:ml-5 justify-between items-center w-3/5">
        <button
          className="flex h-[50px] items-center gap-1 px-2 rounded-3xl  bg-amber-50 border-2 border-amber-300 hover:cursor-pointer hover:bg-amber-300 hover:text-amber-50 transition"
          onClick={() => {
            navigate("/links/create");
            setActive("create");
          }}
        >
          <Plus width={20} height={20} />
          Crear enlace
        </button>
        <button
          className={`relative  flex h-[50px] items-center gap-1 px-2 rounded-3xl hover:cursor-pointer before:content-[''] before:left-0 before:bottom-0 before:rounded-4xl before:absolute before:w-full before:h-1 ${
            active === "home" ? "before:bg-amber-300" : "before:bg-transparent"
          } hover:before:bg-amber-100`}
          onClick={() => {
            navigate("/");
            setActive("home");
          }}
        >
          Inicio
        </button>
        <button
          className={`relative  flex h-[50px] items-center gap-1 px-2 rounded-3xl hover:cursor-pointer before:content-[''] before:left-0 before:bottom-0 before:rounded-4xl before:absolute before:w-full before:h-1 ${
            active === "links" ? "before:bg-amber-300" : "before:bg-transparent"
          } hover:before:bg-amber-100`}
          onClick={() => {
            navigate("/links");
            setActive("links");
          }}
        >
          Mis enlaces
        </button>
        <button
          className={`relative  flex h-[50px] items-center gap-1 px-2 rounded-3xl hover:cursor-pointer before:content-[''] before:left-0 before:bottom-0 before:rounded-4xl before:absolute before:w-full before:h-1 ${
            active === "groups"
              ? "before:bg-amber-300"
              : "before:bg-transparent"
          } hover:before:bg-amber-100`}
          onClick={() => {
            navigate("/groups");
            setActive("groups");
          }}
        >
          Mis grupos
        </button>
        <button
          className={`relative  flex h-[50px] items-center gap-1 px-2 rounded-3xl hover:cursor-pointer before:content-[''] before:left-0 before:bottom-0 before:rounded-4xl before:absolute before:w-full before:h-1 ${
            active === "tags" ? "before:bg-amber-300" : "before:bg-transparent"
          } hover:before:bg-amber-100`}
          onClick={() => {
            navigate("/tags");
            setActive("tags");
          }}
        >
          Mis etiquetas
        </button>
      </div>

      {isAuthenticated() ? (
        <>
          <div
            className="ml-auto relative h-[50px] rounded-3xl rounded-tr-md bg-neutral-800 text-white py-0.5 px-4 flex items-center gap-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            {username}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

            <div
              className={`absolute top-[50px] right-0 z-1000 ${
                dropdownOpen ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-3xl rounded-tr-md shadow-sm w-44`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <ul className="py-2 flex items-center justify-center text-sm text-gray-700">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-red-100 hover:text-red-600 rounded-3xl transition"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <button
          className="ml-auto h-[50px] rounded-3xl rounded-tr-md bg-neutral-800 text-white py-0.5 px-4"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
      )}
    </div>
  );
}
