import { CircleArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center text-white">
      <div className="w-full flex items-center justify-center">
        <span className="text-9xl font-bold text-yellow font-brice">4</span>
        <img src="/images/linky_404.png" alt="404" className="w-42 mt-8" />
        <span className="text-9xl font-bold text-yellow font-brice">4</span>
      </div>
      <h1 className="text-4xl font-bold text-yellow font-brice">
        Oops, página no encontrada.
      </h1>
      <p className="text-lg mt-4">Linky no encontró la página que buscas.</p>
      <button className="flex items-center gap-2 font-bold bg-primary text-yellow border-2 border-yellow border-dashed rounded-xl px-4 py-2 mt-4 transition hover:cursor-pointer hover:bg-yellow hover:text-navy">
        <CircleArrowLeft />
        Volver a Inicio
      </button>
    </div>
  );
}
