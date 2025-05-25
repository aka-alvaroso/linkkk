import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Common/Loading";
import { useNotification } from "../context/NotificationContext";
import { useUserData } from "../context/UserDataContext";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Settings,
  ScanQrCode,
  TrendingUpDown,
  Earth,
  LockIcon,
  Copy,
  QrCode,
  Share,
  ChartArea,
  CornerDownRight,
  Calendar,
  SquareArrowOutUpRight,
  Folder,
  Edit,
  MousePointerBan,
  Lock,
  MapPinX,
  Split,
  TextCursorInput,
  Brush,
  QrCodeIcon,
  RotateCw,
  ChevronUpIcon,
  Unlink,
  Trash,
  Check,
  X,
  ScanLine,
} from "lucide-react";
import EditLinkDialog from "../components/Link/EditLinkDialog";
import DeleteLinkDialog from "../components/Link/DeleteLinkDialog";
import ConfirmDialog from "../components/Common/ConfirmDialog";
import Button from "../components/Common/Button";
import { base64ToBlob, generateQrCode } from "../utils/qrCode";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData, refreshUserData } = useUserData();
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [link, setLink] = useState(
    userData?.links?.find(
      (l) => l.sufix === shortCode || l.shortUrl === shortCode
    ) || {}
  );
  const [stats, setStats] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { showNotification } = useNotification();

  const copyQrCodeToClipboard = async () => {
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
      console.log("qrCodeBase64: ", qrCodeBase64);
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

  const handleSwitch = async () => {
    setLink((prevLink) => ({
      ...prevLink,
      status: !prevLink.status,
    }));

    try {
      // Actualizar en la bd

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}link/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: link.id.toString(),
            longUrl: link.longUrl,
            status: !link.status,
            groupId: link.group ? link.group.id : undefined,
            tags: link.tags.map((tag) => tag.id),
            d_expire: link.d_expire ? new Date(link.d_expire) : undefined,
            password: link.password ? link.password : undefined,
            accessLimit: link.accessLimit ? link.accessLimit : undefined,
            blockedCountries: link.blockedCountries.map(
              (country) => country.id
            ),
            mobileUrl: link.mobileUrl ? link.mobileUrl : undefined,
            desktopUrl: link.desktopUrl ? link.desktopUrl : undefined,
            sufix: link.sufix ? link.sufix : undefined,
            metadataTitle: link.metadataTitle ? link.metadataTitle : undefined,
            metadataDescription: link.metadataDescription
              ? link.metadataDescription
              : undefined,
            metadataImage: link.metadataImage ? link.metadataImage : undefined,
            useMetadata: link.useCustomMetadata,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await refreshUserData({ onlyLinks: true });
        showNotification({
          title: "Enlace actualizado",
          message: "El enlace se ha actualizado correctamente.",
          type: "success",
        });
      } else {
        showNotification({
          title: "Error al actualizar el enlace",
          message: data.details,
          type: "error",
        });
        console.error("Error del servidor:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error de conexión al actualizar el enlace");
    }
  };

  const handleGenerateQrCode = async () => {
    const response = await generateQrCode(link);

    const data = await response.json();
    if (response.ok) {
      setLink((prevLink) => ({
        ...prevLink,
        qrBinaryBytes: data.qrBinaryBytes,
      }));
      refreshUserData({ onlyLinks: true });
      showNotification({
        title: "Código QR generado",
        message: "El código QR se ha generado correctamente.",
        type: "success",
      });
    } else {
      console.error("Error al generar el código QR:", data);
      showNotification({
        title: "Error al generar el código QR",
        message: data.details,
        type: "error",
      });
    }
  };

  useEffect(() => {
    setLink(
      userData.links.find(
        (l) => l.sufix === shortCode || l.shortUrl === shortCode
      ) || {}
    );

    const fetchStats = async () => {
      const responseStats = await fetch(
        `${import.meta.env.VITE_API_URL}link/stats/${shortCode}`,
        {
          credentials: "include",
        }
      );

      if (responseStats.ok) {
        const dataStats = await responseStats.json();
        setStats(dataStats);
      } else {
        switch (responseStats.status) {
          case 404:
            setError("Enlace no encontrado");
            break;
          default:
            setError("Error al obtener estadísticas");
            break;
        }
      }

      setLoading(false);
    };

    fetchStats();
  }, [shortCode, userData]);

  function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toString();
  }

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

  const qrCodeBase64 = link?.qrBinaryBytes
    ? `data:image/png;base64,${btoa(
        String.fromCharCode.apply(null, Object.values(link.qrBinaryBytes))
      )}`
    : null;

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loading />
      </div>
    );

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <>
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {link && (
        <div className="w-full min-h-full p-4 pb-24 bg-primary">
          <EditLinkDialog
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
            }}
            linkData={link}
            countries={userData.countries}
          />
          <DeleteLinkDialog
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
            }}
            onConfirm={() => {
              navigate("/links");
            }}
            link={link}
          />

          <div className="w-full lg:w-4/6 mx-auto">
            <h1 className="text-4xl font-bold my-4 text-yellow font-brice">
              Detalles del enlace
            </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-full">
              {/* LINK INFO */}
              <div className="flex flex-col lg:flex-row items-center justify-center rounded-4xl border-3 border-navy border-dashed text-white py-2 px-4 xl:col-span-2">
                <div className="w-full lg:w-8/12 h-full flex flex-col items-start justify-center">
                  <p className="w-full text-xl font-bold overflow-hidden text-ellipsis ">
                    linkkk.dev/r/{link.sufix ? link.sufix : link.shortUrl}
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
                    {link.tags?.map((tag) => {
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

                <div className="w-full lg:w-4/12 h-full grid grid-cols-2 grid-rows-2 gap-2 p-2">
                  <button
                    className="py-4 row-span-2 bg-yellow text-navy font-bold rounded-xl border-2 border-yellow flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-yellow"
                    onClick={() => {
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
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit size={30} />
                  </button>
                  <button
                    className="py-4 bg-coral text-white font-bold rounded-xl border-2 border-coral flex items-center justify-center transition hover:cursor-pointer hover:bg-transparent hover:border-dashed hover:text-coral"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash size={30} />
                  </button>
                </div>
              </div>

              {/* ACCESOS TOTALES */}
              <div className="flex flex-col items-start rounded-4xl border-3 border-yellow text-yellow py-2 px-4 h-full">
                <h2 className="font-bold w-full text-xl">Clics totales</h2>
                <span className="w-full font-bold text-6xl font-brice">
                  {stats.accesses ? formatNumber(stats.accesses.length) : "0"}
                  {/* {formatNumber("777777")} */}
                </span>
                <p className="text-md mb-4">Todos los tiempos</p>
              </div>

              {/* ESTADO */}
              <div className="mb-2 flex flex-col items-start rounded-4xl py-2 px-4 h-full border-3 border-navy border-dashed text-white">
                <div className="w-full h-full flex flex-col justify-between">
                  <p className="font-bold text-xl h-8">
                    Estado -{" "}
                    {link.status ? (
                      <span className="font-bold text-yellow">Activo</span>
                    ) : (
                      <span className="font-bold text-coral">Inactivo</span>
                    )}
                  </p>

                  {link.status ? (
                    <div
                      className="flex items-center justify-between p-4 w-full h-full mt-2 hover:cursor-pointer"
                      onClick={handleSwitch}
                    >
                      <div className="bg-yellow text-navy w-2/5 h-11/12 flex items-center justify-center rounded-xl transition">
                        <Check size={30} />
                      </div>

                      <div className="w-1 h-full bg-navy/50 rounded-xl"></div>

                      <div className="bg-navy/20 text-navy/50 w-2/5 h-11/12 flex items-center justify-center rounded-xl transition">
                        <X size={30} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-between p-4 w-full h-full mt-2 hover:cursor-pointer"
                      onClick={handleSwitch}
                    >
                      <div className="bg-navy/20 text-navy/50 w-2/5 h-11/12 flex items-center justify-center rounded-xl transition">
                        <Check size={30} />
                      </div>

                      <div className="w-1 h-full bg-navy/50 rounded-xl"></div>

                      <div className="bg-coral text-white w-2/5 h-11/12 flex items-center justify-center rounded-xl transition">
                        <X size={30} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AJUSTES */}
              <div className="flex flex-col items-start rounded-4xl bg-lavender/50 border-3 border-navy text-navy py-2 px-4 h-full xl:col-span-2">
                <p className="font-bold w-full text-xl mb-1">Configuración</p>
                {/* Límite de accesos - Si el enlace tiene número de limite*/}

                {!link.accessLimit &&
                  !link.d_expire &&
                  !link.password &&
                  !link.blockedCountries?.length > 0 &&
                  !link.mobileUrl &&
                  !link.desktopUrl &&
                  !link.sufix &&
                  !link.metadata && (
                    <p className="w-full h-8/12 flex flex-col items-center justify-center text-start text-lg my-1">
                      <Unlink size={40} className="mb-2" />
                      No hay ajustes avanzados
                    </p>
                  )}

                {link.accessLimit && (
                  <div className="w-full flex flex-col items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <MousePointerBan
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                      Límite de accesos:&nbsp; {link.accessLimit}
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Fecha de expiración - Si el enlace tiene fecha de expiración*/}
                {link.d_expire && (
                  <div className="w-full flex flex-col items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <Calendar width={20} height={20} className="mr-1" />
                      {/* dd/mm/yyyy - hh:mm:ss */}
                      Fecha de expiración:&nbsp;{" "}
                      {new Date(link.d_expire).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Contraseña - Si el enlace tiene contraseña*/}

                {link.password && (
                  <div className="w-full flex flex-col items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <Lock width={20} height={20} className="mr-1" />
                      Contraseña:&nbsp; Activada
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Bloqueo de países - Si el enlace tiene lista de paises bloqueados*/}
                {link.blockedCountries?.length > 0 && (
                  <div className="w-full flex flex-col items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <MapPinX width={20} height={20} className="mr-1" />
                      Bloqueo de países:&nbsp;{" "}
                      {link.blockedCountries.length.toString() +
                        " país/es bloqueado/s"}
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Redirección Inteligente - Si el enlace tiene un destino para mobile */}

                {(link.mobileUrl || link.desktopUrl) && (
                  <div className="w-full flex-col flex items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <Split width={20} height={20} className="mr-1" />
                      Redirección inteligente:&nbsp; Activada
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Sufijo personalizado - Si el enlace tiene un sufijo personalizado*/}
                {link.sufix && (
                  <div className="w-full flex-col flex items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <TextCursorInput
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                      Sufijo personalizado:&nbsp; /{link.sufix}
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}

                {/* Previsualizacion (metadatos) - Si el enlace tiene ajustes de previsualización*/}
                {link.metadata && (
                  <div className="w-full flex flex-col items-center justify-between text-start text-sm my-1 sm:flex-row">
                    <p className="flex items-center">
                      <Brush width={20} height={20} className="mr-1" />
                      Metadatos de previsualización:&nbsp; Activada
                    </p>
                    <button className="p-3 rounded-xl text-light-blue border-2 border-light-blue border-dashed hover:text-navy hover:bg-light-blue hover:cursor-pointer transition">
                      Cambiar
                    </button>
                  </div>
                )}
              </div>

              {/* GRÁFICA ACCESOS */}
              <div className="flex flex-col items-start rounded-4xl border-3 border-navy bg-light-blue py-2 px-4 h-full xl:col-span-2">
                <p className="font-bold w-full text-xl">Últimos accesos</p>
                <div className="w-11/12 min-h-[250px] flex items-center justify-center mt-4 xl:h-10/12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.last7Days}>
                      <CartesianGrid stroke="#07004D66" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="clics"
                        stroke="#07004D"
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CÓDIGO QR */}
              <div className="flex flex-col items-start rounded-4xl border-3 border-navy text-white py-2 px-4 h-full xl:col-span-2">
                <p className="font-bold w-full text-xl">Código QR</p>
                <div className="w-full flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative max-w-full w-auto h-auto max-h-[200px] object-contain my-4 rounded-xl">
                    <img
                      src={
                        qrCodeBase64
                          ? qrCodeBase64
                          : "https://imgs.search.brave.com/2splr4Zrzryy1n8Ymw9T1CY1Dn-B5KaujQ2CksNLjnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9xcnRh/Zy5uZXQvYXBpL3Fy/LnBuZw"
                      }
                      alt="Código QR"
                      className={`w-full h-full rounded-xl ${
                        qrCodeBase64 ? "" : "blur-sm"
                      }`}
                    />
                    {!qrCodeBase64 && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center  ">
                        <Button
                          variant="ligth_blue"
                          size="md"
                          onClick={() => {
                            handleGenerateQrCode();
                          }}
                        >
                          Generar Código QR
                        </Button>
                      </div>
                    )}

                    {qrCodeBase64 && (
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-xl bg-black/80">
                        <Button
                          variant="yellow_reverse"
                          size="md"
                          onClick={copyQrCodeToClipboard}
                        >
                          Copiar QR
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="w-full text-sm mb-4 text-center">
                    Escaneado {stats.qrAccesses} veces
                  </p>
                </div>
              </div>

              {/* GRÁFICA DISPOSITIVOS */}
              <div className="flex flex-col items-start rounded-4xl border-3 border-navy text-white py-2 px-4 h-full xl:col-span-2">
                <p className="font-bold w-full text-xl">Dispositivos</p>
                <div className="w-full h-[250px] flex items-center justify-center mt-4 xl:h-10/12">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Escritorio",
                            value: stats.desktopAccesses,
                            fill: "#FF8427",
                          },
                          {
                            name: "Móvil",
                            value: stats.mobileAccesses,
                            fill: "#FFE066",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      ></Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* TABLA DE ACCESOS */}
              <div className="flex flex-col items-start rounded-4xl border-3 border-navy text-white py-2 px-4 h-full xl:col-span-4">
                <p className="font-bold w-full text-xl">Tabla de accesos</p>
                <div className="w-full overflow-x-auto mt-4">
                  <AccessTable stats={stats} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Componente de tabla de accesos
function AccessTable({ stats }) {
  const data = React.useMemo(() => stats.accesses, [stats.accesses]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Definir columnas
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Fecha y Hora",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleString();
        },
      },
      {
        accessorKey: "device",
        header: "Dispositivo",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "method",
        header: "Método",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ip",
        header: "IP",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "is_vpn",
        header: "VPN",
        cell: (info) => {
          const value = info.getValue();
          if (value === "true" || value === true) {
            return (
              <span className="bg-red-100 p-1 rounded-sm text-red-600 font-bold">
                Sí
              </span>
            );
          } else {
            return (
              <span className="bg-green-100 p-1 rounded-sm text-green-600 font-bold">
                No
              </span>
            );
          }
        },
      },
      {
        accessorKey: "country",
        header: "País",
        cell: (info) => {
          const countryCode = info.getValue().toLowerCase();
          return (
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/w20/${countryCode}.webp`}
                alt={info.getValue()}
                className="h-4 w-auto"
              />
              <span>{info.getValue()}</span>
            </div>
          );
        },
      },
    ],
    []
  );

  // Configurar la tabla
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      {/* Filtros y controles */}
      <div className="flex flex-wrap gap-2 mb-4 justify-between items-center">
        <select
          className="p-2 rounded-xl text-sm border-2 bg-transparent border-yellow text-yellow focus:outline-none"
          value={pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="bg-primary">
              Mostrar {pageSize}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          className="p-2 rounded-xl text-sm text-white border-2 border-white border-dashed focus:outline-none focus:border-double placeholder:text-white"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border-2 border-navy">
        <table className="min-w-full divide-y divide-navy overflow-hidden">
          <thead className="text-white bg-navy">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className="w-4 h-4" />,
                          desc: (
                            <ChevronUpIcon className="w-4 h-4 rotate-180" />
                          ),
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className=" divide-y divide-navy">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/20">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:cursor-pointer"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:cursor-pointer"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:cursor-pointer"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:cursor-pointer"
          >
            {">>"}
          </button>
        </div>
        <span className="text-sm">
          Página{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
