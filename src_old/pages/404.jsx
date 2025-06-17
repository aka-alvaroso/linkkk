import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-primary w-screen h-screen flex flex-col items-center justify-center text-white">
      <div className="w-full flex items-center justify-center">
        <span className="text-[10rem] font-bold text-yellow font-brice drop-shadow-[-5px_10px_0px_rgba(24,30,106)]">
          4
        </span>
        <img src="/images/linky_404.png" alt="404" className="w-50" />
        <span className="text-[10rem] font-bold text-yellow font-brice drop-shadow-[-5px_10px_0px_rgba(24,30,106)]">
          4
        </span>
      </div>
      <h1 className="text-4xl font-bold text-yellow font-brice ">
        Oops, página no encontrada.
      </h1>
      <p className="text-lg mt-4">Linky no encontró la página que buscas.</p>
      <button
        className="flex items-center gap-2 font-bold bg-primary text-yellow border-2 border-yellow border-dashed rounded-xl px-4 py-2 mt-4 transition hover:cursor-pointer hover:bg-yellow hover:text-navy"
        onClick={() => navigate("/")}
      >
        <CircleArrowLeft />
        Volver a Inicio
      </button>
    </div>
  );
}
