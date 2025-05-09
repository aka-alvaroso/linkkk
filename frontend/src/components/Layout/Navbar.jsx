import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Plus } from "lucide-react";
import Button from "../Common/Button";
import AuthButton from "../Auth/AuthButton";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/", active: currentPath === "/" },
    { name: "Mis enlaces", path: "/links", active: currentPath === "/links" },
    { name: "Mis grupos", path: "/groups", active: currentPath === "/groups" },
    { name: "Mis etiquetas", path: "/tags", active: currentPath === "/tags" },
  ];

  return (
    <div className="w-full bg-primary z-1000 mx-auto">
      <div className="w-full flex p-3 items-center justify-start lg:w-5/6 xl:w-4/6 mx-auto">
        <Button
          variant="white"
          size="sm"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="font-brice text-3xl">k.</span>
        </Button>

        <div className="hidden lg:flex lg:ml-5 justify-between items-center w-3/5">
          <Button
            variant="yellow_reverse"
            size="md"
            onClick={() => {
              navigate("/links/create");
            }}
            className="flex gap-2 py-3 "
          >
            <Plus size={20} />
            Crear enlace
          </Button>

          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="custom"
              size="md"
              onClick={() => {
                navigate(link.path);
              }}
              className={`flex gap-2 py-3 ${
                link.active ? "text-yellow" : "text-white"
              }`}
            >
              {link.name}
            </Button>
          ))}
        </div>

        <AuthButton isLoggedIn={isLoggedIn} logout={logout} />
      </div>
    </div>
  );
}
