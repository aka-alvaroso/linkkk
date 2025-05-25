import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brush,
  Calendar,
  Copy,
  CornerDownRight,
  Folder,
  Github,
  Info,
  Lock,
  MapPinX,
  MousePointerBan,
  Plus,
  QrCode,
  Share,
  Sparkle,
  Split,
  Tag,
  TextCursorInput,
  Zap,
} from "lucide-react";
import { animate, onScroll } from "animejs";
import { useUserData } from "../context/UserDataContext";
import { useNotification } from "../context/NotificationContext";
import Button from "../components/Common/Button";

export default function Home() {
  const navigate = useNavigate();
  const { refreshUserData } = useUserData();
  const { showNotification } = useNotification();

  const [error, setError] = useState(null);

  useEffect(() => {
    animate("p.title", {
      // Property keyframes
      y: [
        { to: "-2.75rem", ease: "outBounce", duration: 600 },
        { to: 0, ease: "outBounce", duration: 600 },
      ],
      delay: (_, i) => i * 50,
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });

    animate(".paso", {
      translateX: ["200%", "0%"],
      ease: "easeOutExpo",
      delay: (_, i) => i * 10000,
      autoplay: onScroll({
        container: ".scroll-container",
        enter: "bottom-=200 top",
        leave: "bottom-=500 top",
        sync: true,
        // debug: true,
      }),
    });

    animate(".card-feature", {
      // Property keyframes
      y: [
        { to: "2.75rem", ease: "outBounce", duration: 0 },
        { to: 0, ease: "outBounce", duration: 600 },
      ],
      delay: (_, i) => i * 100,
      ease: "inOutCirc",
      loopDelay: 1000,
      autoplay: onScroll({
        // debug: true,
        enter: "bottom-=500 top",
        leave: "bottom-=500 top",
      }),
    });
  }, []);

  const scrollToElement = (selector) => {
    const element = document.querySelector(selector);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = document.getElementById("main-input").value;

    if (!url) {
      setError("Ingresa una URL válida.");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}link/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        longUrl: url,
      }),
      credentials: "include",
    });

    if (response.ok) {
      refreshUserData({ onlyLinks: true });
      showNotification({
        title: "Enlace creado",
        message: "El enlace se ha creado correctamente.",
        type: "success",
      });

      navigate(`/links`);
    } else {
      const data = await response.json();
      setError(data.error);
    }
  };

  return (
    <div
      className="
      relative mx-auto w-full flex flex-col
    "
    >
      <section
        id="home"
        className="relative mx-auto w-full py-4 flex flex-col items-center justify-center bg-primary"
      >
        <div className="w-full h-full z-10 lg:w-3/4">
          <div className="w-4/5 flex flex-col items-center justify-center mt-20 lg:w-[70%] m-auto">
            <img
              src="/images/clip_throwing_plane.png"
              alt="Clip character"
              className="hidden xl:block absolute -bottom-20 left-10 transition"
            />
            <img
              src="/images/clipboard.png"
              alt="Linky character pointing to input"
              className="hidden opacity-0 xl:block xl:opacity-100 absolute -bottom-15 right-20 transition"
            />
            <h1 className="text-center text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-[-5px_5px_0px_rgba(24,30,106)]">
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                P
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                o
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                t
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                e
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                n
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                c
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                i
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                a
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3 ml-4">
                t
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                u
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                s
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3 ml-4">
                l
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                i
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                n
              </p>
              <p className="title inline-block font-brice text-pink transition-transform duration-100 hover:-translate-y-1/3">
                k
              </p>
              <p className="title inline-block font-brice text-light-blue transition-transform duration-100 hover:-translate-y-1/3">
                k
              </p>
              <p className="title inline-block font-brice text-orange transition-transform duration-100 hover:-translate-y-1/3">
                k
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                s
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3 ml-4">
                a
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                l
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3 ml-4">
                s
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                i
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                g
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                u
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                i
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                e
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                n
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                t
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                e
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3 ml-4">
                n
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                i
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                v
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                e
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                l
              </p>
              <p className="title inline-block font-brice transition-transform duration-200 hover:-translate-y-1/3">
                .
              </p>
            </h1>
            <form
              action=""
              className="w-full mt-8 flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              {error && (
                <p className="mb-4 bg-coral text-white py-2 px-4 rounded-xl z-1">
                  Error: {error}
                </p>
              )}

              <input
                type="text"
                name="main-input"
                id="main-input"
                placeholder="https://mienlace.largo.com"
                className="w-full xl:w-3/4 bg-transparent text-white outline-none text-xl border-2 border-white rounded-xl p-4
                focus:shadow-[0_7px_0_0_rgba(24,30,106)] focus:border-navy transition"
                autoFocus
              />
              <button
                type="submit"
                className="w-full md:w-1/2 flex items-center justify-center py-2 p-6 rounded-xl mt-4 text-lg bg-yellow text-navy border-2 border-navy font-bold hover:cursor-pointer hover:bg-light-blue hover:shadow-[0_5px_0_0_rgba(24,30,106)] transition"
              >
                Acortar
              </button>
              <p className="mt-4 text-center text-white">
                ¿Quieres más opciones?{" "}
                <a
                  onClick={() => navigate("/register")}
                  className="text-light-blue underline"
                >
                  Regístrate
                </a>{" "}
                o
                <a
                  onClick={() => navigate("/login")}
                  className="text-light-blue underline"
                >
                  {" "}
                  inicia sesión
                </a>
              </p>
            </form>
            <p className="mt-16 text-white">
              ¿No estás convencido? Prueba con este ejemplo
            </p>
            <div className="w-11/12 lg:w-2xl mt-4 bg-transparent border-2 border-white rounded-xl border-dashed p-4 flex">
              <div>
                <div className="w-full flex gap-2 items-center">
                  <p className="flex items-center gap-2 text-white rounded-4xl px-2 py-1 text-xs">
                    <span className="relative w-3 h-3 mr-1 bg-green-500 rounded-4xl">
                      <span className="absolute top-0 left-0 w-full h-full rounded-4xl bg-green-500 animate-ping"></span>
                    </span>
                    Activo
                  </p>
                  <p className="text-xs text-neutral-300">Expira: Nunca</p>
                </div>
                <div className="w-full flex flex-col mt-2">
                  <p className="text-xl font-bold text-white">
                    linkkk.dev/r/google
                  </p>
                  <p className="text-sm text-neutral-300 flex gap-2 items-center">
                    <CornerDownRight size={15} />
                    <span className="w-10/12 overflow-hidden text-ellipsis">
                      https://www.google.com
                    </span>
                  </p>
                </div>

                <p className="w-full flex items-center text-start text-sm text-white mt-4">
                  <Folder width={15} height={15} className={`mr-1`} />
                  Sin Grupo
                </p>

                <div className="w-full flex flex-wrap gap-2 items-center mt-2 rounded-4xl"></div>
              </div>
              <div className="hidden sm:grid w-1/4 grid-cols-2 gap-2 p-2 ml-auto">
                <Button
                  variant="lavender"
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://linkkk.dev/r/google"
                    );
                  }}
                >
                  <Copy size={25} />
                </Button>
                <Button
                  variant="yellow"
                  size="lg"
                  onClick={() => {
                    window.open(
                      "https://linkkk.dev/r/google",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <Share size={25} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative flex overflow-x-hidden bg-pink text-navy border-y-2 border-navy">
        <div className="py-6 flex items-center animate-marquee whitespace-nowrap">
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Personalizable
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Sin Anuncios
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Fácil y rápido
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Analíticas precisas
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Ahorra tiempo
          </span>
          <Sparkle fill="#fff563" size={30} />
        </div>
        <div className="absolute flex items-center mx-4 top-0 py-6 animate-marquee2 whitespace-nowrap">
          <span className="font-bold text-4xl mx-4 font-brice">
            Personalizable
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Sin Anuncios
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Fácil y rápido
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Analíticas precisas
          </span>
          <Sparkle fill="#fff563" size={30} />
          <span className="font-bold text-4xl mx-4 font-brice">
            Ahorra tiempo
          </span>
          <Sparkle fill="#fff563" size={30} />
        </div>
      </div>
      <section className="bg-navy text-white flex flex-col md:flex-row items-center justify-evenly py-12">
        <img
          src="images/browser.png"
          alt="Browser character"
          className="w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4"
        />
        <div className="bg-orange text-white w-11/12 md:w-1/3 p-8 rounded-xl">
          <h3 className="font-bold text-3xl font-brice">¿Qué es Linkkk?</h3>
          <p className="mt-4 text-md lg:text-xl">
            Linkkk es un servicio basado en la generación de enlaces cortos y
            únicos, permitiendo a los usuarios compartir contenidos de manera
            fácil y rápida. Además, permite reunir diferentes analíticas de cada
            enlace creado para determinar su popularidad y rendimiento.
          </p>
          <button
            className="w-full lg:w-1/2 mt-8 bg-yellow rounded-xl text-navy font-bold border-2 border-navy py-3 px-8
          transition hover:cursor-pointer hover:bg-transparent hover:border-dashed"
            onClick={() => navigate("/links/create")}
          >
            Probar
          </button>
        </div>
      </section>
      {/* Secciones:
      - Hero
      - Que es linkkk
      - Scroll effect
        - Fácil y rápido
        - Personalizable
        - Analíticas precisas
      - Planes
      - Footer
      */}
      <section className="min-h-screen overflow-hidden bg-pink text-navy flex flex-col lg:flex-row items-center justify-center gap-8 py-8 relative">
        <div className="w-11/12 flex justify-center items-center lg:w-1/3">
          <img
            src="images/create_link2.gif"
            alt="Create link GIF"
            className="object-cover h-[500px] border-3 border-navy rounded-xl lg:h-[750px]"
          />
        </div>
        <div className="w-11/12 lg:w-1/3">
          <h3 className="font-bold text-3xl font-brice">Fácil y rápido</h3>
          <p className="mt-4 text-md lg:text-lg">
            En solo 3 pasos, podrás compartir tus sitios favoritos:
          </p>
          <ol className="list-inside mt-3 text-md lg:text-xl relative">
            <li className="paso w-full h-24 absolute top-0 bg-yellow text-navy border-2 border-navy py-6 px-4 rounded-xl my-2 transition hover:-translate-y-1 hover:shadow-[0_5px_0_0_rgba(24,30,106)]">
              <span className="font-bold font-brice text-2xl mr-2">1.</span>
              Pega el enlace de destino
            </li>
            <li className="paso w-full h-24 absolute top-25 bg-lavender text-navy border-2 border-navy py-6 px-4 rounded-xl my-2 transition hover:-translate-y-1 hover:shadow-[0_5px_0_0_rgba(24,30,106)]">
              <span className="font-bold font-brice text-2xl mr-2">2.</span>
              Dale a 'Acortar' y copia el enlace corto
            </li>
            <li className="paso w-full h-24 absolute top-50 sm:top-50 xl:top-50 bg-orange text-navy border-2 border-navy py-6 px-4 rounded-xl my-2 transition hover:-translate-y-1 hover:shadow-[0_5px_0_0_rgba(24,30,106)]">
              <span className="font-bold font-brice text-2xl mr-2">3.</span>
              ¡Comparte el enlace corto quien desees!
            </li>
          </ol>
          <button className="flex mt-96 bg-yellow text-navy font-bold py-3 px-6 rounded-xl border-2 border-navy transition hover:cursor-pointer hover:shadow-[0_5px_0_0_rgba(24,30,106)]">
            <Plus width={20} height={20} />
            <span className="ml-2">Crear enlace</span>
          </button>
        </div>
      </section>

      <section className="relative min-h-screen bg-lavender text-navy flex flex-col items-center justify-evenly py-12">
        <img
          src="images/thinking_link_machine.png"
          alt="Thinking link machine"
          className="hidden xl:block absolute -top-56 left-20 w-72"
        />

        <h3 className="font-bold text-3xl font-brice text-center">
          Personaliza los enlaces a tu gusto
        </h3>

        <div className="w-11/12 flex items-center justify-center">
          <div className="grid grid-rows-3 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center mt-8 transition relative">
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Lock width={32} height={32} />
              <p className="text-lg font-bold">Protección con contraseña</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <MousePointerBan width={32} height={32} />
              <p className="text-lg font-bold">Límite de accesos</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Calendar width={32} height={32} />
              <p className="text-lg font-bold">Fecha de expiracion</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Split width={32} height={32} />
              <p className="text-lg font-bold">Redirección inteligente</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <MapPinX width={32} height={32} />
              <p className="text-lg font-bold">Bloqueo de países</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <TextCursorInput width={32} height={32} />
              <p className="text-lg font-bold">Sufijo personalizado</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Brush width={32} height={32} />
              <p className="text-lg font-bold">Personalización de meta datos</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Folder width={32} height={32} />
              <p className="text-lg font-bold">Gestion de grupos</p>
            </div>
            <div className="card-feature w-full h-full min-w-52 min-h-52 flex flex-col items-center justify-center p-12 border-2 border-navy rounded-xl transition hover:-translate-y-2 hover:bg-yellow  hover:shadow-[0_7px_0_0_rgba(24,30,106)]">
              <Tag width={32} height={32} />
              <p className="text-lg font-bold">Gestión de etiquetas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="z-10 relative bg-light-blue py-8 lg:py-24 flex flex-col items-center justify-center">
        <img
          src="images/clip_walking.png"
          alt="clip_walking"
          className="hidden lg:block absolute -top-40 right-30 w-64 object-cover z-100"
        />

        <div className="relative inline-block">
          <h3 className="font-bold text-3xl font-brice text-center">
            Descubre el lado PRO
          </h3>
          <span className="absolute -top-4 left-12 lg:-top-3 lg:-right-5 w-8 h-8">
            <Sparkle fill="#fff563" />
          </span>
          <span className="absolute -bottom-5 right-12 lg:-bottom-6 lg:right-8 w-8 h-8">
            <Sparkle fill="#fff563" />
          </span>
        </div>
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-start justify-center gap-8 py-8">
          {/* Plan GRATUITO */}
          <div className="w-full lg:w-1/3 relative flex flex-col items-center justify-center gap-4 text-navy bg-lavender border-2 border-navy border-dashed p-8 rounded-xl">
            <h3 className="font-bold text-2xl font-brice">Plan gratuito</h3>
            <p className="text-md">
              Disfruta permanentemente de nuestro plan gratis, pudiendo acceder
              a muchas funcionalidades de la aplicación.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Generación de hasta 100
              enlaces mensuales.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Generación de hasta 50
              códigos QR.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso limitado al panel de
              estadísticas de tus enlaces.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso limitado a la creación
              avanzada de enlaces.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Creación de grupos de
              enlaces. (Máx 5 grupos)
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Creación de etiquetas para
              tus enlaces. (Máx 15 etiquetas)
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso limitado a la API
              Pública. (100 peticiones/día)
            </p>
          </div>
          {/* Plan PRO */}
          <div className="w-full lg:w-1/3 relative flex flex-col items-center justify-center gap-4 text-navy bg-yellow border-2 border-navy p-8 rounded-xl">
            <h3 className="font-bold text-2xl font-brice">Plan PRO</h3>
            <p className="text-md">
              Accede a todas las funcionalidades PRO de la aplicación y disfruta
              de la experiencia al completo.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Todo lo de gratuito más:
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Generación ilimitada de
              enlaces.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Generación ilimitada de
              códigos QR.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso total al panel de
              estadísticas de tus enlaces.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso total a la creación
              avanzada de enlaces.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Creación de grupos de
              enlaces. (Máx 50 grupos)
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Creación de etiquetas para
              tus enlaces. (Máx 100 etiquetas)
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Exportación de datos de tus
              enlaces en formato CSV y JSON.
            </p>
            <p className="text-md self-start font-bold">
              <span className="font-bold">+</span> Acceso a la API Pública.
              (10000 peticiones/día)
            </p>
          </div>
        </div>
      </section>

      <div className="relative flex overflow-x-hidden bg-navy text-orange border-y-2 border-orange">
        <div className="py-6 flex items-center animate-marquee whitespace-nowrap">
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Personalizable
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Sin Anuncios
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Fácil y rápido
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Analíticas precisas
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Ahorra tiempo
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
        </div>
        <div className=" absolute flex items-center mx-4 top-0 py-6 animate-marquee2 whitespace-nowrap">
          <span className="font-bold text-4xl mx-4 font-brice">
            Personalizable
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Sin Anuncios
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Fácil y rápido
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Analíticas precisas
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
          <span className="font-bold text-4xl mx-4 font-brice">
            Ahorra tiempo
          </span>
          <Sparkle fill="#FFE066" size={30} className="text-yellow" />
        </div>
      </div>

      <footer className="bg-primary text-white flex flex-col items-center justify-center gap-4 p-12">
        <div>
          <div
            className="flex items-center justify-center gap-4 p-4 border-2 border-primary border-dashed rounded-xl transition hover:cursor-pointer hover:border-white"
            onClick={() => scrollToElement("#home")}
          >
            <button className="w-[50px] h-[50px] rounded-xl border-2 border-white text-white text-2xl font-[900] hover:cursor-pointer">
              k.
            </button>
            <h3 className="font-bold text-4xl font-brice">Linkkk</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="flex items-center justify-center gap-2 bg-yellow text-primary border-2 border-yellow p-3 rounded-xl hover:cursor-pointer hover:bg-primary hover:text-yellow hover:border-dashed transition">
            <Lock width={25} height={25} />
            <span className="ml-2">Privacidad</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-yellow text-primary border-2 border-yellow p-3 rounded-xl hover:cursor-pointer hover:bg-primary hover:text-yellow hover:border-dashed transition">
            <Info width={25} height={25} />
            <span className="ml-2">Acerca de Linkkk</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-yellow text-primary border-2 border-yellow p-3 rounded-xl hover:cursor-pointer hover:bg-primary hover:text-yellow hover:border-dashed transition">
            <Github width={25} height={25} />
            <span className="ml-2">Github</span>
          </button>
        </div>
        <p>
          Diseñado y desarrollado con ❤️ por{" "}
          <a className="text-light-blue underline" href="https://alvaroso.dev/">
            aka_alvaroso
          </a>
        </p>
      </footer>
    </div>
  );
}
