import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { ArrowLeftIcon } from "lucide-react";

export default function LegalNotice() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-start gap-4 max-w-4xl">
        <div className="w-full flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-yellow font-brice">
            Aviso legal
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

        <h4 className="text-2xl font-bold text-yellow font-brice">
          1. Datos Identificativos
        </h4>
        <p className="text-md">
          En cumplimiento con el deber de información recogido en el artículo 10
          de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y del Comercio Electrónico (LSSI-CE), a continuación se
          reflejan los siguientes datos:
        </p>
        <p className="text-md">
          <strong>Titular del Sitio Web:</strong> Álvaro Barbero Roldán
        </p>
        <p className="text-md">
          <strong>NIF:</strong> 31******N
        </p>
        <p className="text-md">
          <strong>Domicilio:</strong> CH3, Córdoba, España
        </p>
        <p className="text-md">
          <strong>Correo Electrónico de Contacto:</strong>{" "}
          aka.alvaroso@gmail.com
        </p>
        <p className="text-md">
          <strong>Nombre del Sitio Web:</strong> Linkkk
        </p>
        <p className="text-md">
          <strong>URL:</strong> https://linkkk.dev
        </p>
        <h4 className="text-2xl font-bold text-yellow font-brice">
          2. Objeto del Sitio Web
        </h4>
        <p className="text-md">
          El sitio web Linkkk es una plataforma que ofrece herramientas para el
          acortamiento y gestión de enlaces URL, generación de códigos QR y
          provisión de estadísticas de uso de dichos enlaces.
        </p>
        <h4 className="text-2xl font-bold text-yellow font-brice">
          3. Propiedad Intelectual e Industrial
        </h4>
        <p className="text-md">
          El nombre de dominio, la marca "Linkkk", el logotipo, el código fuente
          y el diseño del sitio web son propiedad de Álvaro Barbero Roldán.
          Queda prohibida su reproducción, distribución o modificación, total o
          parcial, sin la autorización expresa del titular.
        </p>
        <p className="text-md">
          Cualquier uso no autorizado previamente por parte del titular será
          considerado un incumplimiento grave de los derechos de propiedad
          intelectual o industrial y dará lugar a las responsabilidades
          legalmente establecidas.
        </p>
        <h4 className="text-2xl font-bold text-yellow font-brice">
          4. Legislación Aplicable y Jurisdicción
        </h4>
        <p className="text-md">
          La relación entre Álvaro Barbero Roldán y los usuarios del sitio web
          se regirá por la normativa española vigente. Para la resolución de
          cualquier controversia que pudiera surgir, ambas partes se someten a
          los Juzgados y Tribunales de la ciudad de Córdoba, España.
        </p>
      </div>
    </div>
  );
}
