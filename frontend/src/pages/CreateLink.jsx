import {
  ALargeSmall,
  AtSign,
  Check,
  ChevronDown,
  ChevronUp,
  FileType,
  Folder,
  Globe,
  Image,
  Minus,
  Monitor,
  Plus,
  TabletSmartphone,
  Tag,
  Twitter,
  User,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/Auth";
import Loading from "../components/Loading";

export default function CreateLink() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();
  const [tagsSelected, setTagsSelected] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState(0);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countriesMenuOpen, setCountriesMenuOpen] = useState(false);

  // fetchTags();
  useEffect(() => {
    const fetchTags = async () => {
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

  // fetchGroups();
  useEffect(() => {
    const fetchGroups = async () => {
      if (!isAuthenticated()) return navigate("/login");

      setLoading(true);

      const userId = jwtDecode(token).id;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}group/user/` + userId,
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
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  // fetchCountries();
  useEffect(() => {
    const fetchCountries = async () => {
      if (!isAuthenticated()) return navigate("/login");

      setLoading(true);

      // const userId = jwtDecode(token).id;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}countries/get`,
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
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const colorMap = {
    RED: "bg-red-100 text-red-400",
    ORANGE: "bg-orange-100 text-orange-400",
    YELLOW: "bg-yellow-100 text-yellow-400",
    GREEN: "bg-green-100 text-green-400",
    BLUE: "bg-blue-100 text-blue-400",
    PURPLE: "bg-purple-100 text-purple-400",
    PINK: "bg-pink-100 text-pink-400",
    GRAY: "bg-gray-100 text-gray-400",
    AMBER: "bg-amber-100 text-amber-400",
    LIME: "bg-lime-100 text-lime-400",
    EMERALD: "bg-emerald-100 text-emerald-400",
    TEAL: "bg-teal-100 text-teal-400",
    CYAN: "bg-cyan-100 text-cyan-400",
    SKY: "bg-sky-100 text-sky-400",
    INDIGO: "bg-indigo-100 text-indigo-400",
    VIOLET: "bg-violet-100 text-violet-400",
    FUCHSIA: "bg-fuchsia-100 text-fuchsia-400",
    ROSE: "bg-rose-100 text-rose-400",
    ZINC: "bg-zinc-100 text-zinc-400",
    NEUTRAL: "bg-neutral-100 text-neutral-400",
    STONE: "bg-stone-100 text-stone-400",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = document.getElementById("link-input").value;
    const sufix = document.getElementById("sufix-input")?.value || "";
    const tags = tagsSelected.map((tag) => tag.id);
    const password = document.getElementById("password-input")?.value || "";
    const accessLimit = document.getElementById("limit-input")?.value || "";
    const blockedCountries = selectedCountries.map((country) => country.id);
    const mobileUrl = document.getElementById("mobile-url")?.value || "";
    const desktopUrl = document.getElementById("desktop-url")?.value || "";
    const expirationDate = document.getElementById("date-input")?.value || "";
    const metadata = [
      document.getElementById("title-input")?.value || "",
      document.getElementById("description-input")?.value || "",
      document.getElementById("image-input")?.value || "",
    ];

    if (!url) {
      setError("Ingresa una URL válida.");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}link/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            userId: jwtDecode(localStorage.getItem("jwt")).id,
            url: url,
            groupId: groupSelected,
            tags: tags,
            sufix: sufix,
            password: password,
            accessLimit: accessLimit,
            blockedCountries: blockedCountries,
            mobileUrl: mobileUrl,
            desktopUrl: desktopUrl,
            expirationDate: expirationDate,
            metadata: metadata,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setError(null);
        navigate(`/dashboard/${data.sufix ? data.sufix : data.shortUrl}`);
      } else {
        setError(data.error || "Error al crear el enlace");
      }
    } catch (err) {
      setError(
        "Error al crear el enlace: " + (err.message || "Error desconocido")
      );
    } finally {
      setLoading(false);
    }

    return false;
  };

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="relative w-full lg:w-4/6 mx-auto py-6 pb-24 min-h-full mt-12 flex flex-col items-center justify-center bg-primary text-white">
      <h1 className="text-4xl font-bold text-yellow font-brice">
        Crear enlace
      </h1>

      <div className="relative w-70 mt-6 flex items-center justify-center rounded-full overflow-hidden">
        <div
          className={`absolute h-full w-5/12 bg-transparent rounded-xl transition-transform duration-300 ease-in-out border-2 border-yellow ${
            activeTab === "basic" ? "-translate-x-18" : "translate-x-18"
          }`}
        ></div>

        <button
          className={`relative z-10 py-3 px-8 w-1/2 font-semibold text-sm transition-colors duration-300 hover:cursor-pointer`}
          onClick={() => setActiveTab("basic")}
        >
          Básico
        </button>

        <button
          className={`relative z-10 py-3 px-8 w-1/2 font-semibold text-sm transition-colors duration-300 hover:cursor-pointer`}
          onClick={() => setActiveTab("advanced")}
        >
          Avanzado
        </button>
      </div>

      {error && (
        <div className="w-full mt-6 flex items-center justify-center">
          <p className="text-red-500 text-sm p-4 bg-red-100 rounded-xl">
            Error: {error}
          </p>
        </div>
      )}

      <div className="w-full mt-6 px-4">
        {activeTab === "basic" ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 rounded-4xl lg:grid-cols-2">
              {/* HEADER */}
              <div className="p-6 rounded-4xl lg:col-span-2">
                <h2 className="text-2xl">Crear nuevo enlace básico</h2>
                <p className="text-md">
                  Crea fácil y rápidamente un enlace acortado de tu sitio
                  favorito, listo para compartir.
                </p>
              </div>
              {/* URL LARGA */}
              <div className="p-6 rounded-4xl border-3 border-yellow border-dashed">
                <h2 className="text-xl font-bold">
                  Enlace largo
                  <span className="ml-2 text-xs text-red-500 font-medium">
                    *Obligatorio
                  </span>
                </h2>
                <p className="text-sm">
                  Introduce el enlace largo que deseas acortar
                </p>
                <input
                  id="link-input"
                  type="text"
                  placeholder="https://mienlace.largo.com"
                  className="mt-4 w-full h-10 p-2 rounded-xl text-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
                  required
                  autoFocus
                />
              </div>
              {/* ALIAS PERSONALIZADO */}
              <div className="p-6 rounded-4xl border-3 border-yellow border-dashed">
                <h2 className="text-xl font-bold">
                  Alias personalizado
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  ¿Quieres que tu enlace sea más reconocible? Añádele un alias
                  personalizado.
                </p>

                <div className="flex items-center mt-4">
                  <span className="w-1/4 h-10 p-2 rounded-l-xl text-orange bg-navy">
                    linkkk.dev/
                  </span>
                  <input
                    id="sufix-input"
                    type="text"
                    placeholder="micampaña"
                    className="w-3/4 h-10 p-2 rounded-r-xl bg-navy/50 text-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* BOTON ACORTAR */}
              <div className="flex items-center justify-center p-6 lg:col-span-2">
                <button
                  type="submit"
                  className="w-36 p-4 rounded-xl bg-transparent text-white font-bold border-2 border-white border-dashed transition duration-300 hover:cursor-pointer hover:bg-pink hover:text-navy hover:border-navy "
                >
                  Acortar
                </button>
              </div>

              {/* OPCIONES ORGANIZACIÓN */}
              <div className="bg-light-blue p-6 rounded-4xl lg:col-span-2 text-navy">
                <h2 className="text-xl font-bold">
                  Organización
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="  text-sm">
                  Asigna tu enlace a un grupo y añade etiquetas para localizarlo
                  fácilemente.
                </p>

                {/* Grupo */}
                <div className="flex gap-2 mt-4">
                  <p className="flex items-center text-neutral-800">
                    <Folder width={25} height={25} className="mr-1" />
                    <span className="w-full text-neutral-800 text-md">
                      Grupo:
                    </span>
                  </p>
                  <select
                    name=""
                    id=""
                    className="w-3/4 bg-neutral-100 p-2 rounded-4xl text-sm sm:w-1/4"
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
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 rounded-4xl lg:grid-cols-2">
              {/* HEADER */}
              <div className="p-6 rounded-4xl lg:col-span-2">
                <h2 className="text-2xl">Crear nuevo enlace avanzado</h2>
                <p className="text-md">
                  Crea un enlace personalizado con todas las opciones avanzadas
                  disponibles.
                </p>
              </div>

              {/* URL LARGA */}
              <div className="p-6 rounded-4xl border-3 border-yellow border-dashed">
                <h2 className="text-xl font-bold">
                  Enlace largo
                  <span className="ml-2 text-xs text-red-500 font-medium">
                    *Obligatorio
                  </span>
                </h2>
                <p className="text-sm">
                  Introduce el enlace largo que deseas acortar
                </p>
                <input
                  id="link-input"
                  type="text"
                  placeholder="https://mienlace.largo.com"
                  className="mt-4 w-full h-10 p-2 rounded-xl text-yellow focus:outline-none focus:ring-2 focus:ring-yellow"
                  required
                  autoFocus
                />
              </div>

              {/* ALIAS PERSONALIZADO */}
              <div className="p-6 rounded-4xl border-3 border-yellow border-dashed">
                <h2 className="text-xl font-bold">
                  Alias personalizado
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  ¿Quieres que tu enlace sea más reconocible? Añádele un alias
                  personalizado.
                </p>

                <div className="flex items-center mt-4">
                  <span className="w-1/4 h-10 p-2 rounded-l-xl bg-navy text-orange">
                    linkkk.dev/
                  </span>
                  <input
                    id="sufix-input"
                    type="text"
                    placeholder="micampaña"
                    className="w-3/4 h-10 p-2 rounded-r-  xl bg-navy/50 text-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* CONTRASEÑA */}
              <div className="p-6 rounded-4xl border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Protección con contraseña
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Si no quieres que entren usuarios no deseados a tu enlace,
                  puedes protegerlo con una contraseña.
                </p>

                <div className="flex items-center mt-4">
                  <input
                    id="password-input"
                    type="text"
                    placeholder="ContraseñaUltraSegura123"
                    className="w-full h-10 p-2 rounded-xl bg-navy/50 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              {/* ACCESS LIMIT */}
              <div className="p-6 rounded-4xl border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Límite de accesos
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Si deseas limite el número de veces que se puede acceder a tu
                  enlace, puedes establecerlo aquí.
                </p>

                <div className="flex items-center mt-4">
                  <input
                    id="limit-input"
                    type="number"
                    placeholder="1000"
                    className="w-full h-10 p-2 rounded-xl border-2 border-orange text-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* BLOQUEO DE PAISES */}
              <div className=" p-6 rounded-4xl lg:col-span-2 border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Bloqueo de países
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Bloquea el acceso a tu enlace desde ciertos países.
                </p>

                <button
                  className="relative w-3/4 p-2 mt-4 rounded-4xl text-sm sm:w-1/4 flex items-center justify-between"
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
                    <div className="absolute top-full right-0 w-full bg-navy p-2 rounded-4xl h-48 overflow-y-auto">
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
                            (selectedCountry) =>
                              selectedCountry.id === country.id
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
                            (selectedCountry) =>
                              selectedCountry.id !== country.id
                          )
                        );
                      }}
                      key={country.id}
                      className="flex items-center gap-2 px-2 py-1 rounded-xl hover:cursor-pointer"
                    >
                      {country.name}
                      <X width={20} height={20} />
                    </div>
                  ))}
                </div>
              </div>

              {/* REDIRECCION INTELIGENTE */}
              <div className="p-6 rounded-4xl border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Redirección inteligente
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  ¿Quieres separar tu tráfico? Puedes activar la redirección
                  inteligente.
                </p>

                <span className="flex items-center mt-4 gap-2">
                  <TabletSmartphone width={20} height={20} />
                  URL destino para móviles
                </span>
                <input
                  id="mobile-url"
                  type="text"
                  placeholder="https://mienlace.largo.com"
                  className="mt-4 w-full h-10 p-2 rounded-xl text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />

                <span className="flex items-center mt-4 gap-2">
                  <Monitor width={20} height={20} />
                  URL destino para ordenadores
                </span>
                <input
                  id="desktop-url"
                  type="text"
                  placeholder="https://mienlace.largo.com"
                  className="mt-4 w-full h-10 p-2 rounded-xl text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>

              {/* FECHA DE EXPIRACION */}
              <div className="p-6 rounded-4xl border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Fecha de expiración
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Establece una fecha en la que tu enlace se desactivará.
                </p>

                <div className="flex items-center mt-4">
                  <input
                    id="date-input"
                    type="date"
                    placeholder="1000"
                    className="w-full h-10 p-2 rounded-xl bg-neutral-100 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              {/* METADATA */}
              <div className="p-6 rounded-4xl lg:col-span-2 border-3 border-lavender border-dashed">
                <h2 className="text-xl font-bold">
                  Metadatos
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Añade metadatos a tu enlace para que sea más fácil de
                  identificar.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {/* Titulo */}
                  <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
                    <p className="flex items-center ">
                      <ALargeSmall width={25} height={25} className="mr-1" />
                      <span className="w-full  text-md">Titulo:</span>
                    </p>
                    <input
                      id="title-input"
                      type="text"
                      placeholder="Mi enlace largo"
                      className="h-10 p-2 rounded-xl border-2 border-white  focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  {/* Descripcion */}
                  <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
                    <p className="flex items-center ">
                      <Monitor width={25} height={25} className="mr-1" />
                      <span className="w-full  text-md">Descripción:</span>
                    </p>
                    <input
                      id="description-input"
                      type="text"
                      placeholder="Mi descripción"
                      className="h-10 p-2 rounded-xl border-2 border-white  focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  {/* Imagen */}
                  <div className="flex flex-col lg:flex-row items-center gap-2 mt-4">
                    <p className="flex items-center ">
                      <Image width={25} height={25} className="mr-1" />
                      <span className="w-full  text-md">Imagen:</span>
                    </p>
                    <input
                      id="image-input"
                      type="text"
                      placeholder="https://image.png"
                      className="h-10 p-2 rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>
                </div>
              </div>

              {/* BOTON ACORTAR */}
              <div className="flex items-center justify-center p-6 lg:col-span-2">
                <button
                  type="submit"
                  className="w-36 p-4 rounded-xl bg-transparent text-white font-bold border-2 border-white border-dashed transition duration-300 hover:cursor-pointer hover:bg-pink hover:text-navy hover:border-navy "
                >
                  Acortar
                </button>
              </div>

              {/* OPCIONES ORGANIZACIÓN */}
              <div className="bg-light-blue p-6 rounded-4xl lg:col-span-2 text-navy">
                <h2 className="text-xl font-bold">
                  Organización
                  <span className="ml-2 text-xs text-neutral-400 font-medium">
                    Opcional
                  </span>
                </h2>
                <p className="text-sm">
                  Asigna tu enlace a un grupo y añade etiquetas para localizarlo
                  fácilemente.
                </p>

                {/* Grupo */}
                <div className="flex gap-2 mt-4">
                  <p className="flex items-center text-neutral-800">
                    <Folder width={25} height={25} className="mr-1" />
                    <span className="w-full text-neutral-800 text-md">
                      Grupo:
                    </span>
                  </p>
                  <select
                    name=""
                    id=""
                    className="w-3/4 bg-neutral-100 p-2 rounded-4xl text-sm sm:w-1/4"
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
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
