import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PublicApi() {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full h-full bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-start gap-4 max-w-4xl px-4">
        <div className="relative w-full flex items-center justify-center gap-4">
          <div className="absolute top-0 -left-8 -rotate-45">
            <p className="text-lg font-brice">Beta</p>
          </div>
          <h1 className="text-4xl font-bold text-yellow font-brice">
            API para desarrolladores
          </h1>
          <Button
            variant="yellow_reverse"
            size="md"
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center gap-2 mt-4 ml-auto"
          >
            <ArrowLeftIcon size={20} />
            <span className="ml-2">Volver</span>
          </Button>
        </div>

        <div className="w-full flex flex-col items-start gap-4">
          <h4 className="text-2xl font-bold text-yellow font-brice">
            1. Introducción
          </h4>
          <p className="text-md">
            En esta sección, te proporcionaremos información sobre cómo utilizar
            nuestra API pública para desarrolladores. Esta, por el momento, sólo
            permite la creación y eliminación de enlaces.
          </p>
          <h4 className="text-2xl font-bold text-yellow font-brice">
            2. Autenticación
          </h4>
          <p className="text-md">
            Para acceder a la API, necesitarás proporcionar tu API Key. Puedes
            obtener tu API Key más abajo.
          </p>
          <h4 className="text-2xl font-bold text-yellow font-brice">
            3. Endpoints
          </h4>
          <p className="text-md">La API tiene los siguientes endpoints:</p>
          <ul className="list-disc pl-8">
            <li>
              <strong>/create</strong>: Crea un enlace.
            </li>
            <li>
              <strong>/delete</strong>: Elimina un enlace.
            </li>
          </ul>
          <h4 className="text-2xl font-bold text-yellow font-brice">
            4. API Key
          </h4>
          <Button
            variant="yellow_reverse"
            size="md"
            disabled={apiKey.length > 0}
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login");
                return;
              } else {
                fetch(`${import.meta.env.VITE_API_URL}public/create-api-key`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setApiKey(data.apiKey);
                  });
              }
            }}
            className="flex items-center gap-2 mt-4"
          >
            <span className="ml-2">Obtener mi API Key</span>
          </Button>
          {apiKey.length > 0 && (
            <p className="text-md mt-4">
              Tu API Key es:{" "}
              <span className="font-bold bg-navy p-2 rounded-xl">{apiKey}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
