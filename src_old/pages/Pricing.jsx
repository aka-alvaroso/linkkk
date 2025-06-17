import React from "react";
import CheckoutForm from "../components/Pro/CheckoutForm";

export default function Pricing() {
  return (
    <div className="w-full h-full">
      <div className="w-full md:w-3xl mx-auto flex flex-col justify-center gap-4 mt-8">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Realizar pago
        </h1>
        <div className="w-full md:w-3xl bg-navy text-white p-4 border-2 border-white border-dashed rounded-xl">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
