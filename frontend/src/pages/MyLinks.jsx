import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import { useNotification } from "../context/NotificationContext";

import GroupSelector from "../components/Group/GroupSelector";
import TagSelector from "../components/Tag/TagSelector";

import {
  Calendar,
  Check,
  ChevronDown,
  Copy,
  CornerDownRight,
  Edit,
  Folder,
  Link2Off,
  Minus,
  Plus,
  QrCode,
  RotateCw,
  Search,
  Share,
  Trash,
  X,
} from "lucide-react";
import EditLinkDialog from "../components/Link/EditLinkDialog";
import DeleteLinkDialog from "../components/Link/DeleteLinkDialog";
import Button from "../components/Common/Button";
import Card from "../components/Common/Card";
import { generateQrCode, base64ToBlob } from "../utils/qrCode";

export default function MyLinks() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { userData, refreshUserData } = useUserData();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [filteredLinks, setFilteredLinks] = useState(userData?.links);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [filters, setFilters] = useState({
    shortUrl: "",
    status: "",
    tags: [],
    group: null,
  });

  useEffect(() => {
    setFilteredLinks(
      userData.links.filter((link) => {
        const matchesSearch =
          !filters.shortUrl ||
          link.shortUrl
            .toLowerCase()
            .includes(filters.shortUrl.toLowerCase()) ||
          link.longUrl.toLowerCase().includes(filters.shortUrl.toLowerCase());

        const matchesTags = filters.tags.every((tag) =>
          link.tags.some((linkTag) => linkTag.id === tag.id)
        );

        const matchesStatus =
          filters.status === "active"
            ? link.status
            : filters.status === "inactive"
            ? !link.status
            : true;

        const matchesGroup =
          !filters.group || link.group?.id === filters.group.id;

        return matchesSearch && matchesGroup && matchesTags && matchesStatus;
      })
    );
  }, [filters, userData.links]);

  useEffect(() => {
    const groupId = searchParams.get("groupId");
    const tagId = searchParams.get("tagId");

    const group = userData.groups?.find((g) => g.id === groupId);
    const tag = userData.tags?.find((t) => t.id === tagId);

    setFilters((prev) => ({
      ...prev,
      group: group || null,
      tags: tag ? [tag] : [],
    }));
  }, [searchParams, userData.groups, userData.tags]);

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };

  const handleGenerateQrCode = async (link) => {
    const response = await generateQrCode(link);

    refreshUserData({ onlyLinks: true });
    if (response.ok) {
      showNotification({
        title: "Código QR generado",
        message: "El código QR se ha generado correctamente.",
        type: "success",
      });
    }
  };

  const copyQrCodeToClipboard = async (link) => {
    const qrCodeBase64 = link?.qrBinaryBytes
      ? `data:image/png;base64,${btoa(
          String.fromCharCode.apply(null, Object.values(link.qrBinaryBytes))
        )}`
      : null;

    if (!qrCodeBase64) {
      showNotification({
        title: "Error",
        message: "No hay código QR para copiar.",
        type: "error",
      });
      return;
    }

    try {
      const blob = await base64ToBlob(qrCodeBase64);
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      showNotification({
        title: "Copiado",
        message: "Código QR copiado al portapapeles.",
        type: "success",
      });
    } catch (err) {
      console.error("Error al copiar el código QR:", err);
      showNotification({
        title: "Error",
        message: "No se pudo copiar el código QR.",
        type: "error",
      });
    }
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

  return (
    <div className="w-full bg-primary flex flex-col items-center justify-center py-12">
      <EditLinkDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        allGroups={userData.groups}
        allTags={userData.tags}
        countries={userData.countries}
        linkData={selectedLink}
        setLinkData={setSelectedLink}
      />
      <DeleteLinkDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
        }}
        link={selectedLink}
      />

      <div className="w-11/12 lg:w-4/6 p-4 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Mis enlaces
        </h1>
        <Button
          variant="yellow"
          onClick={() => navigate("/links/create")}
          className="flex items-center gap-2 mt-4"
        >
          Crear
          <Plus width={20} height={20} />
        </Button>

        <p className="text-white text-md">
          Mostrando: <span className="font-bold">{filteredLinks.length}</span>
        </p>
      </div>

      {/* FILTROS */}
      <div className="w-11/12 lg:w-4/6 p-4 flex gap-4 items-center justify-start flex-wrap">
        <div
          className={`min-w-48 max-w-48 flex items-center gap-2 bg-primary  border-2 border-dashed rounded-xl py-2 px-4 
          ${
            filters.shortUrl || filters.longUrl
              ? "text-white border-white"
              : "text-navy border-navy"
          }`}
        >
          <Search size={20} />
          <input
            id="filters-search-input"
            type="text"
            placeholder="Buscar enlaces"
            className="w-full focus:outline-none placeholder:text-navy"
            onChange={(e) =>
              setFilters({
                ...filters,
                shortUrl: e.target.value,
                longUrl: e.target.value,
              })
            }
          />
        </div>
        {/* Grupo */}
        <GroupSelector
          groups={userData.groups}
          selectedGroup={filters.group}
          onSelect={(group) => setFilters({ ...filters, group: group })}
        />
        {/* Tags */}
        <TagSelector
          tags={userData.tags}
          selectedTags={filters.tags}
          onSelect={(tags) => setFilters({ ...filters, tags: tags })}
        />
        {/* Estado */}
        <div
          className="w-30 h-10 relative flex items-center justify-center p-1 border-2 border-navy border-dashed rounded-xl cursor-pointer"
          onClick={() => {
            if (filters.status === "active") {
              setFilters({ ...filters, status: "" });
            } else if (filters.status === "") {
              setFilters({ ...filters, status: "inactive" });
            } else {
              setFilters({ ...filters, status: "active" });
            }
          }}
        >
          <div
            className={`absolute rounded-lg w-1/3 h-3/4 flex items-center justify-center transition ${
              filters.status === ""
                ? "bg-navy text-primary"
                : filters.status === "active"
                ? "bg-yellow text-navy transform -translate-x-8"
                : "bg-coral text-white transform translate-x-8"
            }
            }`}
          >
            <Check
              size={20}
              className={`${filters.status !== "active" ? "hidden" : ""}`}
            />
            <X
              size={20}
              className={`${filters.status !== "inactive" ? "hidden" : ""}`}
            />
            <Minus
              size={20}
              className={`${filters.status !== "" ? "hidden" : ""}`}
            />
          </div>
        </div>

        {/* Limpiar filtros */}
        {(filters.tags.length > 0 ||
          filters.group ||
          filters.status ||
          filters.shortUrl ||
          filters.longUrl) && (
          <button
            className="xl:ml-auto flex items-center gap-2 text-navy bg-yellow border-2 border-yellow border-dashed py-2 px-4 rounded-xl transition hover:cursor-pointer hover:bg-primary hover:text-yellow"
            onClick={() => {
              document.getElementById("filters-search-input").value = "";
              setFilters({
                shortUrl: "",
                longUrl: "",
                status: "",
                tags: [],
                group: null,
              });
            }}
          >
            <X width={20} height={20} />
            <span className="ml-2">Limpiar filtros</span>
          </button>
        )}
      </div>

      <div className="w-11/12 lg:w-4/6 flex flex-col gap-4 items-center justify-center py-8 z-10">
        {userData.links.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-8 text-navy">
            <Link2Off size={32} />
            <p className="text-xl font-bold my-2">No tienes enlaces creados.</p>
            <Button
              variant="yellow"
              onClick={() => {
                navigate("/links/create");
              }}
              className="flex items-center gap-2 mt-4"
            >
              Crear uno
              <Plus width={20} height={20} />
            </Button>
          </div>
        )}
        {filteredLinks.length === 0 && userData.links.length !== 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-8 text-navy">
            <Link2Off size={32} />
            <p className="text-lg font-bold my-2">
              No se han encontrado enlaces
            </p>
            <Button
              variant="yellow"
              onClick={() => {
                navigate("/links/create");
              }}
              className="flex items-center gap-2 mt-4"
            >
              Crear uno
              <Plus width={20} height={20} />
            </Button>
          </div>
        )}
        {filteredLinks.map((link) => (
          <Card
            key={link.id}
            custom
            rounded="3xl"
            className={`w-full flex flex-col lg:flex-row items-center text-white cursor-pointer `}
            onClick={() =>
              navigate(`/dashboard/${link.sufix ? link.sufix : link.shortUrl}`)
            }
          >
            {/* Info */}
            <div className="w-full lg:w-2/4 h-full flex flex-col items-start justify-center">
              {link.status ? (
                <div
                  className={`relative flex items-center justify-center p-1 gap-2 border-2 border-dashed rounded-xl border-yellow w-26 h-8"`}
                >
                  <div
                    className={`w-1/4 h-full rounded-lg flex items-center justify-center bg-yellow text-navy`}
                  >
                    <Check size={20} />
                  </div>
                  <p className="text-white">Activo</p>
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center p-1 gap-2 border-2 border-dashed rounded-xl border-coral w-26 h-8"`}
                >
                  <p className="text-white">Inactivo</p>
                  <div
                    className={`w-1/4 h-full rounded-lg flex items-center justify-center bg-coral text-white`}
                  >
                    <X size={20} />
                  </div>
                </div>
              )}

              <p className="w-full text-xl font-bold overflow-hidden text-ellipsis mt-2">
                linkkk.dev/r/{link.sufix ? link.sufix : link.shortUrl}
              </p>
              <p className="w-full text-sm flex gap-2 items-center">
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
            <div className="hidden w-sm lg:w-1/6 h-full lg:flex flex-col items-center justify-center gap-4 ">
              <div className="relative flex items-center justify-center p-1 gap-2 w-3/4">
                <img
                  src={
                    link.qrBinaryBytes
                      ? `data:image/png;base64,${btoa(
                          String.fromCharCode.apply(
                            null,
                            Object.values(link.qrBinaryBytes)
                          )
                        )}`
                      : "https://imgs.search.brave.com/2splr4Zrzryy1n8Ymw9T1CY1Dn-B5KaujQ2CksNLjnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9xcnRh/Zy5uZXQvYXBpL3Fy/LnBuZw"
                  }
                  alt="Código QR"
                  className={`w-full h-full rounded-xl ${
                    link.qrBinaryBytes ? "" : "blur-xs"
                  }`}
                />
                {!link.qrBinaryBytes && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-xl bg-primary/70">
                    <Button
                      variant="ligth_blue"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateQrCode(link);
                      }}
                    >
                      <RotateCw width={20} height={20} />
                    </Button>
                  </div>
                )}
                {link.qrBinaryBytes && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-xl bg-primary/70">
                    <Button
                      variant="yellow_reverse"
                      size="md"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyQrCodeToClipboard(link);
                      }}
                    >
                      <Copy size={20} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="w-full sm:w-3/4 lg:w-1/4 h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <button
                className="py-4 row-span-2 bg-yellow text-navy font-bold rounded-xl border-2 border-yellow flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    "https://linkkk.dev/r/" +
                      (link.sufix ? link.sufix : link.shortUrl)
                  );
                  showNotification({
                    message: "El enlace ha sido copiado al portapapeles",
                    type: "success",
                  });
                }}
              >
                <Copy size={30} />
              </button>
              <button
                className="py-4 bg-lavender text-navy font-bold rounded-xl border-2 border-lavender flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-lavender"
                onClick={(e) => {
                  e.stopPropagation();

                  if (!isLoggedIn) {
                    navigate("/login");
                    return;
                  }

                  setSelectedLink(link);
                  setIsEditDialogOpen(true);
                }}
              >
                <Edit size={30} />
              </button>
              <button
                className="py-4 bg-coral text-white font-bold rounded-xl border-2 border-coral flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-coral"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLink(link);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash size={30} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
