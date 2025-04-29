import { FileWarning, Folder, TriangleAlert, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteGroupModal({ onClose, link }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar datos al servidor
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}link/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: Number(link.id) }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onClose();
        navigate(`/links`);
      } else {
        console.error(data.error + " - " + JSON.stringify(data.details)) ||
          "Failed to delete link";
      }
    } catch (err) {
      console.error("Network error or server not responding");
      console.error("Error deleting link:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="relative w-11/12 bg-white rounded-4xl p-6 md:p-8 lg:w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-red-500">
            <Folder width={24} height={24} />
            <p>Eliminar enlace - linkkk.dev/{link.shortUrl}</p>
          </h2>
          <button
            onClick={() => onClose()}
            className=" text-neutral-500 hover:text-neutral-800 hover:cursor-pointer"
          >
            <X width={24} height={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6 flex flex-col items-center justify-center gap-4">
            <TriangleAlert width={36} height={36} className="text-red-500" />
            <div className="flex gap-2 items-center justify-center">
              <p className=" text-neutral-800 text-sm p-4">
                ¿Estás seguro de que deseas eliminar el enlace linkkk.dev/
                {link.shortUrl}? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-2 items-center w-full">
              <button
                type="submit"
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-800 text-white hover:bg-neutral-900 hover:cursor-pointer"
              >
                Eliminar
              </button>
              <button
                type="button" // Change to type="button" to prevent form submission
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-100 text-neutral-800 border-2 border-y-neutral-800 hover:bg-neutral-200 hover:cursor-pointer"
                onClick={() => onClose()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
