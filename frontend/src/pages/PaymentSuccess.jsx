import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-start gap-4 max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Pago realizado con éxito
        </h1>

        <p className="text-md">
          ¡Gracias por tu compra! Tu pago ha sido procesado con éxito.
        </p>

        <img
          src="/images/linky_ok.png"
          alt="Linky Ok"
          className="hidden xl:block absolute -top-56 left-20 w-72"
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
