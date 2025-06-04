import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../Common/Button";
import { LoaderCircle } from "lucide-react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [seconds, setSeconds] = useState(5);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      // 1. Crear PaymentIntent en el backend
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}stripe/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ planId: 2 }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la intención de pago.");
        setProcessing(false);
        return;
      }

      const { clientSecret } = data;

      // 2. Confirmar el pago en el frontend
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (payload.error) {
        setError(`Pago fallido: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);

        setProcessing(false);
        setSucceeded(true);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}`);
      setProcessing(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        color: "#ffe066",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#ffe06666",
        },
        iconColor: "#fff",
      },
      invalid: {
        color: "#fff",
        iconColor: "#fff",
      },
    },
  };

  useEffect(() => {
    if (succeeded) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            window.location.href = "/";
            clearInterval(interval);
            return 0;
          }

          return prevSeconds - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [succeeded]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-2 grid-rows-3 gap-4 "
    >
      <div className="w-full col-span-2">
        <label htmlFor="card-element" className="text-lg font-bold">
          Tarjeta de Crédito o Débito
        </label>
        <CardNumberElement
          id="card-element"
          options={elementOptions}
          className="w-full p-2 mt-2 border-2 border-yellow border-dashed rounded-xl"
        />
      </div>
      <div className="w-full mt-4">
        <label htmlFor="card-expiry" className="text-lg font-bold">
          Fecha expiración
        </label>
        <CardExpiryElement
          id="card-expiry"
          options={elementOptions}
          className="w-full p-2 mt-2 border-2 border-yellow border-dashed rounded-xl"
        />
      </div>
      <div className="w-full mt-4">
        <label htmlFor="card-cvc" className="text-lg font-bold">
          Código de seguridad
        </label>
        <CardCvcElement
          id="card-cvc"
          options={elementOptions}
          className="w-full p-2 mt-2 border-2 border-yellow border-dashed rounded-xl"
        />
      </div>
      <Button
        disabled={processing || succeeded}
        id="submit"
        className="col-span-2 max-h-12 mt-5 flex items-center justify-center"
        variant="yellow"
        type="submit"
      >
        <span id="button-text">
          {processing ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Realizar pago"
          )}
        </span>
      </Button>
      {/* Muestra mensajes de error o éxito */}
      {error && (
        <p
          role="alert"
          className="col-span-2 bg-red-900 text-red-400 py-3 px-6 rounded-xl border-red-400 border-2 border-dashed"
        >
          {error}
        </p>
      )}
      {succeeded && (
        <p className="col-span-2 bg-green-900 text-green-400 py-3 px-6 rounded-xl border-green-400 border-2 border-dashed">
          ¡Pago exitoso! Gracias por tu compra.
          <br />
          <span className="text-white">
            Redirigiendo en {seconds} segundos...
          </span>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
