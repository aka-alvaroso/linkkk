import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import {
  Ellipsis,
  Folder,
  Hash,
  Pencil,
  Plus,
  Search,
  Tag,
  Trash,
} from "lucide-react";
import Loading from "../components/Loading";
import CreateTagModal from "../components/CreateTagModal";
import EditTagModal from "../components/EditTagModal";
import DeleteTagModal from "../components/DeleteTagModal";

export default function Groups() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [tags, setTags] = useState([]);
  const [tagsFiltered, setTagsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState({});

  const handleSearch = (e) => {
    setTagsFiltered(
      tags.filter((tag) =>
        tag.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const fetchTags = useCallback(async () => {
    if (!isAuthenticated()) return navigate("/login");

    setLoading(true);

    const userId = jwtDecode(token).id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}tag/user/` + userId,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      if (response.status !== 200) {
        console.error(response.json());
        return;
      }

      const data = await response.json();
      setTags(data);
      setTagsFiltered(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated, navigate, token]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    fetchTags(); // Refresh groups when modal closes
  };

  const colorMap = {
    RED: "bg-red-500 text-red-500",
    ORANGE: "bg-orange-500 text-orange-500",
    YELLOW: "bg-yellow-500 text-yellow-500",
    GREEN: "bg-green-500 text-green-500",
    BLUE: "bg-blue-500 text-blue-500",
    PURPLE: "bg-purple-500 text-purple-500",
    PINK: "bg-pink-500 text-pink-500",
    GRAY: "bg-gray-500 text-gray-500",
    AMBER: "bg-amber-500 text-amber-500",
    LIME: "bg-lime-500 text-lime-500",
    EMERALD: "bg-emerald-500 text-emerald-500",
    TEAL: "bg-teal-500 text-teal-500",
    CYAN: "bg-cyan-500 text-cyan-500",
    SKY: "bg-sky-500 text-sky-500",
    INDIGO: "bg-indigo-500 text-indigo-500",
    VIOLET: "bg-violet-500 text-violet-500",
    FUCHSIA: "bg-fuchsia-500 text-fuchsia-500",
    ROSE: "bg-rose-500 text-rose-500",
    ZINC: "bg-zinc-500 text-zinc-500",
    NEUTRAL: "bg-neutral-500 text-neutral-500",
    STONE: "bg-stone-500 text-stone-500",
  };

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full lg:w-4/6 mx-auto h-full p-4 overflow-hidden">
      {isCreateModalOpen && (
        <CreateTagModal
          onClose={handleModalClose}
          userId={jwtDecode(token).id}
        />
      )}
      {isEditModalOpen && (
        <EditTagModal onClose={handleModalClose} tag={selectedTag} />
      )}
      {isDeleteModalOpen && (
        <DeleteTagModal onClose={handleModalClose} tag={selectedTag} />
      )}
      <div className="p-4 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-bold text-yellow font-brice">Etiquetas</h1>
        <button
          className="max-w-50 flex items-center gap-2 text-navy bg-yellow border-2 border-yellow border-dashed py-3 px-6 rounded-xl transition hover:cursor-pointer hover:bg-primary hover:text-yellow"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus width={20} height={20} />
          <span className="ml-2">Crear etiqueta</span>
        </button>
        <div className="max-w-48 flex items-center gap-2 bg-primary text-white border-2 border-white border-dashed rounded-xl p-2 ">
          <Search width={20} height={20} />
          <input
            type="text"
            placeholder="Buscar etiquetas"
            className="w-full py-1 px-2 focus:outline-none placeholder:text-white"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">
        {tags.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-neutral-800">
            <Hash width={42} height={42} />
            <p className="text-2xl font-bold my-4">No tienes etiquetas.</p>
            <button
              className="py-2 px-4 bg-transparent border-2 border-navy border-dashed text-white rounded-xl flex items-center gap-2 transition hover:cursor-pointer hover:bg-navy hover:text-white"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Crear una
              <Plus width={20} height={20} />
            </button>
          </div>
        )}

        {tagsFiltered.length === 0 && tags.length !== 0 && (
          <div className="w-full flex flex-col items-center justify-center text-neutral-800">
            <Hash width={42} height={42} />
            <p className="text-2xl font-bold my-4">
              No se han encontrado etiquetas con ese título.
            </p>
          </div>
        )}

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 place-items-center">
          {tagsFiltered.map((tag) => {
            const tagColor = colorMap[tag.color];

            return (
              <div
                key={tag.id}
                className="w-full md:max-w-sm h-40 flex flex-col items-center justify-between bg-primary border-2 border-navy text-white rounded-3xl p-4 hover:scale-102 transition-all duration-300"
              >
                <div className="w-full flex items-start gap-2">
                  <span
                    className={`${tagColor} flex items-center justify-center p-2 rounded-4xl text-white text-2xl font-bold`}
                  >
                    <Tag width={20} height={20} />
                  </span>
                  <h1
                    className={`text-lg font-bold bg-transparent w-4/6 overflow-hidden overflow-ellipsis`}
                  >
                    #{tag.name}
                  </h1>
                  <button
                    className="ml-auto p-1 hover:cursor-pointer transition hover:text-yellow"
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Pencil width={20} height={20} />
                  </button>
                  <button
                    className="ml-auto p-1 hover:cursor-pointer transition hover:text-coral"
                    onClick={() => {
                      setSelectedTag(tag);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash width={20} height={20} />
                  </button>
                </div>
                {/* Número de enlaces */}
                <button className="w-4/6 py-2 mt-auto text-light-blue border-2 border-light-blue rounded-xl flex justify-center items-center gap-2 transition hover:bg-light-blue hover:text-navy hover:cursor-pointer">
                  Ver enlaces
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
