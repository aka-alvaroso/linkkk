import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import EditLinkModal from "../components/EditLinkModal";

import Loading from "../components/Loading";
import {
  Calendar,
  ChevronDown,
  Copy,
  CornerDownRight,
  Edit,
  Folder,
  Link2Off,
  Plus,
  QrCode,
  RotateCw,
  Search,
  Share,
  Trash,
} from "lucide-react";

export default function MyLinks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const tagId = searchParams.get("tagId");
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const [activeFilters, setActiveFilters] = useState({ tags: [], group: "all" });
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    setFilteredLinks(
      links.filter((link) => {
        return (
          link.shortUrl.toLowerCase().includes(e.target.value.toLowerCase()) ||
          link.longUrl.toLowerCase().includes(e.target.value.toLowerCase()) ||
          link.group?.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          link.tags.find((tag) =>
            tag.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      })
    );
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Recuperar el id del usuario del token
  const token = localStorage.getItem("jwt");
  const userId = jwtDecode(token).id;

  const fetchLinks = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}link/user/` + userId,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (response.status !== 200) {
        console.error(response.json());
        return;
      }

      let data = await response.json();
      setLinks(data);
      // console.log(data);

      if (groupId) {
        data = data.filter((link) => link.group?.id === Number(groupId));
      }

      if (tagId) {
        data = data.filter((link) =>
          link.tags.find((tag) => tag?.id === Number(tagId))
        );
      }
      setFilteredLinks(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [userId, token, groupId, tagId]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]); // Ensure fetchLinks is called when dependencies change

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    // setIsDeleteModalOpen(false);
    fetchLinks(); // Refresh groups when modal closes
  };

  const colorMap = {
    RED: "bg-red-100 text-red-600",
    ORANGE: "bg-orange-100 text-orange-600",
    YELLOW: "bg-yellow-100 text-yellow-600",
    GREEN: "bg-green-100 text-green-600",
    BLUE: "bg-blue-100 text-blue-600",
    PURPLE: "bg-purple-100 text-purple-600",
    PINK: "bg-pink-100 text-pink-600",
    GRAY: "bg-gray-100 text-gray-600",
    AMBER: "bg-amber-100 text-amber-600",
    LIME: "bg-lime-100 text-lime-600",
    EMERALD: "bg-emerald-100 text-emerald-600",
    TEAL: "bg-teal-100 text-teal-600",
    CYAN: "bg-cyan-100 text-cyan-600",
    SKY: "bg-sky-100 text-sky-600",
    INDIGO: "bg-indigo-100 text-indigo-600",
    VIOLET: "bg-violet-100 text-violet-600",
    FUCHSIA: "bg-fuchsia-100 text-fuchsia-600",
    ROSE: "bg-rose-100 text-rose-600",
    ZINC: "bg-zinc-100 text-zinc-600",
    NEUTRAL: "bg-neutral-100 text-neutral-600",
    STONE: "bg-stone-100 text-stone-600",
  };

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full bg-primary flex flex-col items-center justify-center py-12">
      {isEditModalOpen && (
        <EditLinkModal onClose={handleCloseModal} link={selectedLink} />
      )}

      <div className="w-11/12 lg:w-4/6 p-4 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Mis enlaces
        </h1>
        <button
          className="max-w-48 flex items-center gap-2 text-navy bg-yellow border-2 border-yellow border-dashed py-3 px-6 rounded-xl transition hover:cursor-pointer hover:bg-primary hover:text-yellow"
          onClick={() => navigate("/links/create")}
        >
          <Plus width={20} height={20} />
          <span className="ml-2">Crear enlace</span>
        </button>
        <div className="max-w-48 flex items-center gap-2 bg-primary text-white border-2 border-white border-dashed rounded-xl p-2">
          <Search width={20} height={20} />
          <input
            type="text"
            placeholder="Buscar enlaces"
            className="w-full py-1 px-2 focus:outline-none placeholder:text-white"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>

      <div className="w-11/12 lg:w-4/6 flex flex-col gap-4 items-center justify-center py-8">
        {links.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-8">
            <Link2Off width={32} height={32} />
            <p className="text-lg font-bold my-2">No tienes enlaces creados.</p>
            <button className="py-2 px-4 bg-black text-white rounded-4xl flex gap-2">
              Crear uno
              <Plus width={20} height={20} />
            </button>
          </div>
        )}
        {filteredLinks.length === 0 && links.length !== 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-8 text-neutral-800">
            <Link2Off width={32} height={32} />
            <p className="text-lg font-bold my-2">
              No se han encontrado enlaces
            </p>
            <button className="py-2 px-4 bg-neutral-800 text-white rounded-4xl flex gap-2">
              Crear uno
              <Plus width={20} height={20} />
            </button>
          </div>
        )}
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className="w-11/12 flex flex-col lg:flex-row items-center rounded-4xl border-3 border-navy border-dashed text-white p-6 transition hover:border-yellow"
            onClick={() =>
              navigate(`/dashboard/${link.sufix ? link.sufix : link.shortUrl}`)
            }
          >
            {/* Info */}
            <div className="w-full lg:w-2/4 h-full flex flex-col items-start justify-center">
              {link.status ? (
                <p className="flex items-center gap-2 bg-green-100 text-green-600 rounded-4xl px-2 py-1 text-xs">
                  <span className="relative w-3 h-3 mr-1 bg-green-500 rounded-4xl">
                    <span className="absolute top-0 left-0 w-full h-full rounded-4xl bg-green-500 animate-ping"></span>
                  </span>
                  Activo
                </p>
              ) : (
                <p className="flex items-center gap-2 bg-red-100 text-red-600 rounded-4xl px-2 py-1 text-xs">
                  <span className="relative w-3 h-3 mr-1 bg-red-500 rounded-4xl">
                    <span className="absolute top-0 left-0 w-full h-full rounded-4xl bg-red-500 animate-ping"></span>
                  </span>
                  Inactivo
                </p>
              )}

              <p className="w-full text-xl font-bold overflow-hidden text-ellipsis mt-2">
                linkkk.dev/{link.sufix ? link.sufix : link.shortUrl}
              </p>
              <p className="text-sm flex gap-2 items-center ">
                <CornerDownRight width={20} height={20} />
                <span className="w-full overflow-hidden text-ellipsis">
                  {link.longUrl}
                </span>
              </p>
              <p className="flex items-center text-start text-sm mt-4">
                <Folder width={15} height={15} className="mr-1" />
                {link.group ? link.group.title : "Sin grupo"}
              </p>
              <div className="w-full flex flex-wrap gap-2 items-center mt-4">
                <p className="flex items-center text-start text-sm">
                  <Calendar width={15} height={15} className="mr-1" />
                  Creado:&nbsp;
                  {new Date(link.createdAt).toLocaleDateString()}
                </p>
                <p className="flex items-center text-start text-sm">
                  <Calendar width={15} height={15} className="mr-1" />
                  Expira:&nbsp;
                  {link.d_expire
                    ? new Date(link.d_expire).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "Nunca"}
                </p>
              </div>
              <div className="w-full flex flex-wrap gap-2 items-center mt-4">
                {link.tags.map((tag) => {
                  const colorClass = colorMap[tag.color];
                  return (
                    <span
                      key={tag.id}
                      className={`px-2 py-1 text-xs rounded-full ${colorClass}`}
                    >
                      #{tag.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* QrCode */}
            <div className="hidden w-full lg:w-1/4 h-full lg:flex flex-col items-center justify-center gap-4">
              <QrCode width={128} height={128} />
              <div className="flex items-center justify-center gap-2">
                <button className="flex border-2 bg-light-blue border-light-blue border-dashed text-navy rounded-xl px-4 py-2 text-sm hover:cursor-pointer hover:bg-light-blue hover:text-navy transition">
                  <Copy width={20} height={20} />
                </button>
                <button className="flex border-2 border-yellow border-dashed text-yellow rounded-xl px-4 py-2 text-sm hover:cursor-pointer hover:bg-yellow hover:text-navy transition">
                  <RotateCw width={20} height={20} />
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="w-full sm:w-1/2 lg:w-1/4 h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <button className="py-4 row-span-2 bg-yellow text-navy font-bold rounded-xl border-2 border-yellow flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-yellow">
                <Copy size={30} />
              </button>
              <button
                className="py-4 bg-lavender text-navy font-bold rounded-xl border-2 border-lavender flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-lavender"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLink(link);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit size={30} />
              </button>
              <button className="py-4 bg-coral text-white font-bold rounded-xl border-2 border-coral flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-coral">
                <Trash size={30} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
