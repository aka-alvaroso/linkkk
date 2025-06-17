import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { ArrowLeftIcon } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-center gap-4 max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Linky te da la bienvenida a los PRO
        </h1>

        <p className="text-md">
          ¡Gracias por tu compra! Tu pago ha sido procesado con éxito.
        </p>

        <img
          src="/images/linky_ok.png"
          alt="Linky Ok"
          className="hidden xl:block w-72"
        />

        <Button
          variant="yellow"
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
    </div>
  );
}
