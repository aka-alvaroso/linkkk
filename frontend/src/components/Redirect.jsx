import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIPData, getVPN } from "../utils/getUserData";
import { AlignRight, Eye, EyeOff } from "lucide-react";
import { animate } from "animejs";

// import { useAuth } from '../context/Auth';

export default function Redirect() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [link, setLink] = useState(null);
  const [userData, setUserData] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordInput, setPasswordInput] = useState("password");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const getLink = async () => {
      const { ip, country } = await getIPData();
      const { proxy, hosting } = await getVPN({ ip });
      const device = navigator.userAgent.includes("Mobi") ? true : false;

      setUserData({ ip, country, proxy, hosting, device });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}link/${shortCode}`
        );
        const link = await response.json();
        let url = link.longUrl;

        setLink(link);

        if (!link.status) {
          setError("status");
          return;
        }

        if (link.password) {
          setError("password");
          return;
        }

        if (link.accessLimit && link.accessLimit <= link.accesses.length) {
          setError("accessLimit");
          return;
        }

        if (link.d_expire && new Date(link.d_expire) < new Date()) {
          setError("expireAt");
          return;
        }

        // Use a for loop instead of forEach
        for (const blockedCountry of link.blockedCountries) {
          if (blockedCountry.code.toUpperCase() === country.toUpperCase()) {
            setError("blockedCountry");
            return; // This will exit the getLink function
          }
        }

        // 1. Que el usuario sea de movil y el enlace tenga url para movil
        // 2. Que el usuario sea de movil y el enlace tenga url para ordenador pero no para movil
        // 3. Que el usuario sea de movil y que el enlace no tenga url para movil ni para ordenador
        // 4. que el usuario sea de ordenador y el enlace tenga url para movil pero no para ordenador
        // 5. que el usuario sea de ordenador y el enlace tenga url para ordenador
        // 6. que el usuario sea de ordenador y que el enlace no tenga url para movil ni para ordenador

        if (device) {
          if (link.mobileUrl) {
            url = link.mobileUrl;
          }
          if (link.desktopUrl && !link.mobileUrl) {
            setError("mobileUrl");
            return;
          }
          if (!link.mobileUrl && !link.desktopUrl) {
            url = link.longUrl;
          }
        } else {
          if (link.desktopUrl) {
            url = link.desktopUrl;
          }
          if (link.mobileUrl && !link.desktopUrl) {
            setError("desktopUrl");
            return;
          }
          if (!link.mobileUrl && !link.desktopUrl) {
            url = link.longUrl;
          }
        }

        const access = await fetch(
          `${import.meta.env.VITE_API_URL}access/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              linkId: link.id,
              device: device ? "MOBILE" : "DESKTOP",
              ip: ip,
              is_vpn: proxy || hosting ? "true" : "false",
              country: country.toUpperCase(),
              method: "LINK",
            }),
          }
        );

        if (access.status !== 201) {
          console.error(access.json());
          setStatus(access.json());
        } else {
          window.location.href = url;
        }
      } catch (e) {
        console.error(e);
        setStatus(e);
      }
    };

    getLink();
  }, [shortCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = link.longUrl;
    const password = e.target[0].value;
    if (link.password === password) {
      setPasswordError(null);

      if (link.accessLimit && link.accessLimit <= link.accesses.length) {
        setError("accessLimit");
        return;
      }

      // alert(JSON.stringify(link));
      if (link.d_expire && new Date(link.d_expire) < new Date()) {
        setError("expireAt");
        return;
      }

      for (const blockedCountry of link.blockedCountries) {
        if (
          blockedCountry.code.toUpperCase() === userData.country.toUpperCase()
        ) {
          setError("blockedCountry");
          return; // This will exit the getLink function
        }
      }

      // alert(JSON.stringify(userData));
      if (userData.device) {
        if (link.mobileUrl) {
          url = link.mobileUrl;
        }
        if (link.desktopUrl && !link.mobileUrl) {
          setError("mobileUrl");
          return;
        }
        if (!link.mobileUrl && !link.desktopUrl) {
          url = link.longUrl;
        }
      } else {
        if (link.desktopUrl) {
          url = link.desktopUrl;
        }
        if (link.mobileUrl && !link.desktopUrl) {
          setError("desktopUrl");
          return;
        }
        if (!link.mobileUrl && !link.desktopUrl) {
          url = link.longUrl;
        }
      }

      const access = await fetch(
        `${import.meta.env.VITE_API_URL}access/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            linkId: link.id,
            device: userData.device ? "MOBILE" : "DESKTOP",
            ip: userData.ip,
            is_vpn: userData.proxy || userData.hosting ? "true" : "false",
            country: userData.country.toUpperCase(),
            method: "LINK",
          }),
        }
      );

      if (access.status !== 201) {
        console.error(access.json());
        setStatus(access.json());
      } else {
        window.location.href = url;
      }
    } else {
      if (passwordError) {
        animate(".error", {
          x: [
            { to: "-1.5rem", ease: "outBack", duration: 100 },
            { to: "1.5rem", ease: "outBack", duration: 100 },
            { to: 0, ease: "outBack", duration: 100 },
          ],
        });
      } else {
        setPasswordError("Contraseña incorrecta");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-primary text-white">
      {error && error === "status" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-xl mt-4">El enlace no está activo.</p>
        </div>
      )}

      {error && error === "password" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice text-center">
            Enlace protegido
          </h1>
          <p className="text-lg mt-4 text-center max-w-lg">
            ¡Un momento! Linky está protegiendo este enlace con una clave, si no
            la conoces, no te dejará acceder.
          </p>

          {passwordError && (
            <p className="error text-lg mt-4 bg-coral text-white/75 py-2 px-4 rounded-xl  ">
              {passwordError}
            </p>
          )}

          <form
            className="mt-4 flex flex-col w-11/12 max-w-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-2 px-4">
              <input
                type={passwordInput}
                className="w-full outline-none"
                placeholder="ClaveSecreta123"
                required
                autoFocus
              />
              <button
                type="button"
                className="transition hover:cursor-pointer hover:text-yellow"
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
            <button
              type="submit"
              className="bg-yellow text-navy font-bold rounded-lg px-4 py-2 mt-4 w-full border-2 border-yellow hover:bg-primary  hover:text-white hover:cursor-pointer transition"
            >
              Acceder
            </button>
          </form>
          <img
            src="/images/linky_security.png"
            alt="Linky Security"
            className="w-36 mt-16 sm:w-48"
          />
          <p className="text-sm mt-4 text-center underline transition hover:cursor-pointer hover:text-yellow">
            Acerca de Linkkk
          </p>
        </div>
      )}

      {error && error === "accessLimit" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">Este enlace no admite más accesos.</p>
        </div>
      )}

      {error && error === "expireAt" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">Este enlace ha caducado.</p>
        </div>
      )}

      {error && error === "blockedCountry" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">Este enlace está bloqueado en tu país.</p>
        </div>
      )}

      {error && error === "mobileUrl" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">
            Este enlace no tiene una URL para dispositivos móviles.
          </p>
        </div>
      )}

      {error && error === "desktopUrl" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">
            Este enlace no tiene una URL para dispositivos de escritorio.
          </p>
        </div>
      )}

      {!error && <p className="text-lg mt-4">Redireccionando...</p>}

      {status && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow font-brice">Error</h1>
          <p className="text-lg mt-4">{status}</p>
        </div>
      )}
    </div>
  );
}
