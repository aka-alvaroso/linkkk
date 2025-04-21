import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export default function AccessError({ link }) {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target[0].value;
    if (link.password === password) {
      navigate(`/${shortCode}`);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center text-white">
      {searchParams.get("error") === "status" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">El enlace no está activo.</p>
        </div>
      )}

      {searchParams.get("error") === "password" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">
            ¡Un momento!
          </h1>
          <p className="text-lg mt-4">
            Este enlace está protegido por contraseña. Pídesela a tu amigo para
            poder acceder.
          </p>

          <form
            className="mt-4 flex flex-col w-11/12 max-w-sm"
            onSubmit={handleSubmit}
          >
            <input
              type="password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              placeholder="ClaveSecreta123"
              required
              autoFocus
            />
            <button
              type="submit"
              className="bg-yellow text-navy font-bold rounded-lg px-4 py-2 mt-4 w-full border-2 border-yellow hover:bg-primary  hover:text-white transition"
            >
              Acceder
            </button>
          </form>
        </div>
      )}

      {searchParams.get("error") === "accessLimit" && (
        <p className="text-lg mt-4">Ha excedido el límite de accesos.</p>
      )}

      {searchParams.get("error") === "expireAt" && (
        <p className="text-lg mt-4">El enlace ha expirado.</p>
      )}

      {searchParams.get("error") === "blockedCountry" && (
        <p className="text-lg mt-4">Este enlace está bloqueado en tu país.</p>
      )}

      {searchParams.get("error") === "mobileUrl" && (
        <p className="text-lg mt-4">
          No se pudo encontrar la URL para móviles.
        </p>
      )}

      {searchParams.get("error") === "desktopUrl" && (
        <p className="text-lg mt-4">
          No se pudo encontrar la URL para ordenadores.
        </p>
      )}

      {searchParams.get("error") === "mobileUrl" && (
        <p className="text-lg mt-4">
          No se pudo encontrar la URL para móviles.
        </p>
      )}
    </div>
  );
}
