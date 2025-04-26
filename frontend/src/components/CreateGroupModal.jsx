import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Folder, X } from "lucide-react";

export default function CreateGroupModal({ onClose }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.getElementById("group-name").value;
    const description = document.getElementById("group-description").value;
    const color = document.getElementById("group-color").value;

    // Enviar datos al servidor
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}group/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          credentials: "include",
          body: JSON.stringify({
            title: title,
            description: description,
            color: color,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onClose();
      } else {
        setError(data.error || "Failed to create group");
      }
    } catch (err) {
      setError("Network error or server not responding");
      console.error("Error creating group:", err);
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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Folder width={24} height={24} />
            <p>Crear grupo</p>
          </h2>
          <button
            onClick={() => onClose()}
            className=" text-neutral-500 hover:text-neutral-800 hover:cursor-pointer"
          >
            <X width={24} height={24} />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm p-4 bg-red-100 rounded-4xl">
            Error: {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <label
                htmlFor="group-name"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Nombre del grupo:
              </label>
              <input
                required
                autoFocus
                type="text"
                id="group-name"
                placeholder="Grupo de usuarios"
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="group-description"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Descripcion:
              </label>
              <input
                required
                type="text"
                id="group-description"
                placeholder="Descripción del grupo"
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="group-color"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Color:
              </label>
              <select
                name="group-color"
                id="group-color"
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
                defaultValue="NEUTRAL"
              >
                <option value="RED">RED</option>
                <option value="ORANGE">ORANGE</option>
                <option value="YELLOW">YELLOW</option>
                <option value="GREEN">GREEN</option>
                <option value="BLUE">BLUE</option>
                <option value="PURPLE">PURPLE</option>
                <option value="PINK">PINK</option>
                <option value="GRAY">GRAY</option>
                <option value="AMBER">AMBER</option>
                <option value="LIME">LIME</option>
                <option value="EMERALD">EMERALD</option>
                <option value="TEAL">TEAL</option>
                <option value="CYAN">CYAN</option>
                <option value="SKY">SKY</option>
                <option value="INDIGO">INDIGO</option>
                <option value="VIOLET">VIOLET</option>
                <option value="FUCHSIA">FUCHSIA</option>
                <option value="ROSE">ROSE</option>
                <option value="ZINC">ZINC</option>
                <option value="NEUTRAL">NEUTRAL</option>
                <option value="STONE">STONE</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <button
                type="submit"
                className="w-1/2 h-10 p-2 rounded-4xl bg-neutral-800 text-white hover:bg-neutral-900 hover:cursor-pointer"
                onClick={() => navigate("/groups")}
              >
                Crear
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
