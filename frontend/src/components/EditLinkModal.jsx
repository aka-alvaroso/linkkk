import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import Loading from "../components/Loading";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Folder,
  Link,
  Tag,
  X,
} from "lucide-react";

export default function EditLinkModal({ onClose, link }) {
  const { authLoading, isLoggedIn, isGuestSession } = useAuth();
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState("0");
  const [passwordInput, setPasswordInput] = useState("password");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countriesMenuOpen, setCountriesMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const longUrl = document.getElementById("longUrl").value;
    const status = document.getElementById("status").checked ? true : false;
    const tags = tagsSelected.map((tag) => tag.id);
    const expirationDate = document.getElementById("expirationDate").value;
    const password = document.getElementById("password").value;
    const accessLimit = document.getElementById("limit").value;
    const blockedCountries = selectedCountries.map((country) => country.id);
    const mobileUrl = document.getElementById("mobileUrl").value;
    const desktopUrl = document.getElementById("desktopUrl").value;
    const sufix = document.getElementById("customSuffix").value;

    // Enviar datos al servidor
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}link/${link.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            longUrl: longUrl,
            status: status,
            groupId: groupSelected,
            tags: tags,
            d_expire: expirationDate,
            password: password,
            accessLimit: accessLimit,
            blockedCountries: blockedCountries,
            mobileUrl: mobileUrl,
            desktopUrl: desktopUrl,
            sufix: sufix,
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

  // fetchTags();
  const fetchTags = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}tag/user/`, {
        credentials: "include",
      });

      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      setTags(data);

      // Inicializar tags seleccionados
      const initialSelectedTags = data.filter((tag) =>
        link.tags.some((linkTag) => linkTag.id === tag.id)
      );
      setTagsSelected(initialSelectedTags);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagClick = (tag) => {
    if (tagsSelected.find((selectedTag) => selectedTag.id === tag.id)) {
      setTagsSelected(
        tagsSelected.filter((selectedTag) => selectedTag.id !== tag.id)
      );
    } else {
      setTagsSelected([...tagsSelected, tag]);
    }
  };

  // fetchGroups();
  const fetchGroups = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}group/user/`,
        {
          credentials: "include",
        }
      );

      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      setGroups(data);

      if (data.length > 0 && link.group) {
        setGroupSelected(link.group.id.toString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetchCountries();
  const fetchCountries = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}countries/get`,
        {
          credentials: "include",
        }
      );

      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      setCountries(data);

      // Inicializar tags seleccionados
      const initialSelectedCountries = data.filter((country) =>
        link.blockedCountries.some(
          (linkCountry) => linkCountry.id === country.id
        )
      );
      setSelectedCountries(initialSelectedCountries);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (isLoggedIn === null || isGuestSession === null) return;

    fetchCountries();
    fetchGroups();
    fetchTags();
    setLoading(false);
  }, [authLoading, isLoggedIn, isGuestSession]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={() => {
        onClose();
      }}
    >
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
      <div
        className="editLinkModal relative w-11/12 max-h-8/12 overflow-auto bg-lavender text-navy shadow-[10px_10px_0px_0px_rgba(7,0,77)] rounded-4xl p-6 md:p-8 lg:w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Link size={24} />
            <p className="font-brice">Editar link</p>
          </h2>
          <button
            onClick={() => onClose()}
            className=" text-neutral-500 hover:text-neutral-800 hover:cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm p-4 bg-red-100 rounded-4xl">
            Error: {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-6 flex flex-col gap-4">
            <h2 className="text-2xl font-brice text-yellow">
              Información básica
            </h2>

            {/* Long URL */}
            <div className="flex gap-2 items-center">
              <label htmlFor="longUrl" className="block text-sm font-bold mb-1">
                Url larga:
              </label>
              <input
                required
                autoFocus
                type="text"
                id="longUrl"
                defaultValue={link.longUrl}
                placeholder={link.longUrl}
                className="w-1/2 h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>

            {/* Estado */}
            <div className="flex gap-2 items-center">
              <label htmlFor="status" className="block text-sm font-bold mb-1">
                Estado:
              </label>
              <input
                id="status"
                type="radio"
                name="status"
                value={true}
                defaultChecked={link.status === true}
                className="w-5 h-5 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <label htmlFor="status" className="block text-sm font-bold mb-1">
                Activo
              </label>
              <input
                type="radio"
                name="status"
                value={false}
                defaultChecked={link.status === false}
                className="w-5 h-5 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
              <label htmlFor="status" className="block text-sm font-bold mb-1">
                Inactivo
              </label>
            </div>

            {/* Grupo */}
            <div className="flex gap-2 mt-4">
              <p className="flex items-center">
                <Folder size={20} className="mr-1" />
                <span className="block text-sm font-bold">Grupo:</span>
              </p>
              <select
                name=""
                id=""
                className="w-3/4 bg-neutral-100 p-2 rounded-xl text-sm sm:w-1/4"
                onChange={(e) => setGroupSelected(e.target.value)}
                value={groupSelected}
              >
                <option value="0">Sin grupo</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Etiquetas */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="flex items-center text-neutral-800">
                <Tag width={25} height={25} className="mr-1" />
                <span className="w-full text-neutral-800 text-md">
                  Etiquetas:
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const colorClasses = colorMap[tag.color];
                  return (
                    <div
                      key={tag.id}
                      className={`${colorClasses} rounded-4xl px-2 py-1 text-xs flex items-center hover:cursor-pointer`}
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag.name}
                      {tagsSelected.find(
                        (selectedTag) => selectedTag.id === tag.id
                      ) ? (
                        <Check width={15} height={15} className="ml-1" />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fecha expiración */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="expirationDate"
                className="block text-sm font-bold mb-1"
              >
                Fecha de expiración:
              </label>

              <input
                type="date"
                id="expirationDate"
                defaultValue={link.d_expire ? formatDate(link.d_expire) : ""}
                className="h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <h2 className="text-2xl font-brice text-yellow">
              Ajustes avanzados
            </h2>

            {/* Contraseña */}
            <div className="flex gap-2 mt-4">
              <p className="flex items-center">
                <span className="block text-sm font-bold">Contraseña:</span>
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type={passwordInput}
                  id="password"
                  placeholder={link.password}
                  defaultValue={link.password}
                  className="w-3/4 h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <button
                  type="button"
                  className="p-1 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition"
                  onClick={() => {
                    if (passwordInput === "password") {
                      setPasswordInput("text");
                    } else {
                      setPasswordInput("password");
                    }
                  }}
                >
                  {passwordInput === "password" ? (
                    <EyeOff width={20} height={20} />
                  ) : (
                    <Eye width={20} height={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Limite accesos */}
            <div className="flex gap-2 mt-4">
              <p className="flex items-center">
                <span className="block text-sm font-bold">
                  Límite de accesos:
                </span>
              </p>
              <input
                type="number"
                id="limit"
                min={0}
                placeholder={link.accessLimit}
                defaultValue={link.accessLimit}
                className="w-3/4 h-10 p-2 rounded-xl border-2 border-white text-white focus:outline-none"
              />
            </div>

            {/* Bloqueo paises */}
            <div className="">
              <p className="flex items-center">
                <span className="block text-sm font-bold">
                  Boqueo por países:
                </span>
              </p>

              <button
                className="relative p-2 border-2 border-yellow mt-4 rounded-4xl text-sm flex items-center justify-between"
                type="button"
                onClick={() => setCountriesMenuOpen(!countriesMenuOpen)}
              >
                {selectedCountries.length > 0
                  ? `${selectedCountries.length} país${
                      selectedCountries.length > 1 ? "es" : ""
                    } seleccionado${selectedCountries.length > 1 ? "s" : ""}`
                  : "Seleccionar países"}

                {countriesMenuOpen ? (
                  <ChevronUp width={20} height={20} />
                ) : (
                  <ChevronDown width={20} height={20} />
                )}

                {countriesMenuOpen && (
                  <div className="absolute top-full right-0 w-full bg-white p-2 rounded-4xl h-48 overflow-y-auto">
                    {countries.map((country) => (
                      <div
                        key={country.id}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-200/50 rounded-4xl"
                        onClick={() => {
                          if (
                            selectedCountries.find(
                              (selectedCountry) =>
                                selectedCountry.id === country.id
                            )
                          ) {
                            setSelectedCountries(
                              selectedCountries.filter(
                                (selectedCountry) =>
                                  selectedCountry.id !== country.id
                              )
                            );
                          } else {
                            setSelectedCountries([
                              ...selectedCountries,
                              country,
                            ]);
                          }
                        }}
                      >
                        {selectedCountries.find(
                          (selectedCountry) => selectedCountry.id === country.id
                        ) ? (
                          <Check width={20} height={20} />
                        ) : (
                          <></>
                        )}
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </button>
              <div className="w-full flex flex-wrap gap-2 mt-4">
                {selectedCountries.map((country) => (
                  <div
                    onClick={() => {
                      setSelectedCountries(
                        selectedCountries.filter(
                          (selectedCountry) => selectedCountry.id !== country.id
                        )
                      );
                    }}
                    key={country.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-xl bg-light-blue hover:cursor-pointer"
                  >
                    {country.name}
                    <X width={20} height={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Redirección inteligente */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="flex items-center">
                <span className="block text-sm font-bold">
                  Redirección inteligente:
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col w-1/2">
                  <p className="flex items-center">URL para móviles</p>
                  <input
                    type="text"
                    id="mobileUrl"
                    defaultValue={link.mobileUrl}
                    placeholder="https://mienlace.largo.com"
                    className="w-3/4 h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <p className="flex items-center">URL para ordenadores</p>
                  <input
                    type="text"
                    id="desktopUrl"
                    defaultValue={link.desktopUrl}
                    placeholder="https://mienlace.largo.com"
                    className="w-3/4 h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>
            </div>

            {/* Sufijo personalizado */}
            <div className="flex gap-2 mt-4">
              <p className="flex items-center">
                <span className="block text-sm font-bold">
                  Sufijo personalizado:
                </span>
              </p>
              <input
                type="text"
                id="customSuffix"
                defaultValue={link.sufix}
                placeholder="micampaña"
                className="h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-2 items-center mt-12">
              <button
                type="submit"
                className="w-1/2 h-10 p-2 rounded-xl bg-yellow font-bold text-navy border-2 border-yellow transition hover:bg-transparent hover:text-yellow hover:cursor-pointer"
              >
                Confirmar
              </button>
              <button
                type="button" // Change to type="button" to prevent form submission
                className="w-1/2 h-10 p-2 rounded-xl bg-transparent text-navy border-2 border-navy border-dashed transition hover:bg-navy hover:text-white hover:cursor-pointer"
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
