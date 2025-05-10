import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import { Eye, EyeOff } from "lucide-react";
import Button from "../Common/Button";
import Dialog from "../Common/Dialog";
import SelectCountry from "../Country/SelectCountry";
import Input from "../Common/Input";
import GroupSelector from "../Group/GroupSelector";
import TagSelector from "../Tag/TagSelector";
import Switch from "../Common/Switch";
import { useNotification } from "../../context/NotificationContext";

export default function CreateLinkDialog({ isOpen, onClose, linkData }) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { userData, refreshUserData } = useUserData();
  const dialogRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [sufix, setSufix] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [groupSelected, setGroupSelected] = useState("0");
  const [tagsSelected, setTagsSelected] = useState([]);
  const [accessLimit, setAccessLimit] = useState(0);
  const [blockedCountries, setBlockedCountries] = useState([]);
  const [mobileUrl, setMobileUrl] = useState("");
  const [desktopUrl, setDesktopUrl] = useState("");
  const [metadataTitle, setMetadataTitle] = useState("");
  const [metadataDescription, setMetadataDescription] = useState("");
  const [metadataImage, setMetadataImage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (linkData) {
      setLongUrl(linkData.longUrl || "");
      setStatus(linkData.status || false);
      setGroupSelected(linkData.group?.id || undefined);
      setTagsSelected(linkData.tags || []);
      setExpirationDate(linkData.expirationDate || "");
      setPassword(linkData.password || "");
      setAccessLimit(linkData.accessLimit || 0);
      setBlockedCountries(linkData.blockedCountries || []);
      setMobileUrl(linkData.mobileUrl || undefined);
      setDesktopUrl(linkData.desktopUrl || undefined);
      setSufix(linkData.sufix || "");
      setMetadataTitle(linkData.metadataTitle || "");
      setMetadataDescription(linkData.metadataDescription || "");
      setMetadataImage(linkData.metadataImage || "");
    }
  }, [linkData]);

  const handleCancel = () => {
    onClose(false);
    dialogRef.current?.close();
  };

  const handleSubmit = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}link/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        longUrl: longUrl,
        status: status,
        groupId: groupSelected?.id,
        tags: tagsSelected?.map((tag) => tag.id),
        d_expire: expirationDate,
        password: password,
        accessLimit: parseInt(accessLimit),
        blockedCountries: blockedCountries?.map((country) => country.id),
        mobileUrl: mobileUrl,
        desktopUrl: desktopUrl,
        sufix: sufix,
        metadataTitle: metadataTitle,
        metadataDescription: metadataDescription,
        metadataImage: metadataImage,
      }),
    });

    const resData = await res.json();

    if (res.ok) {
      onClose();

      showNotification({
        title: "Enlace creado",
        message: "El enlace se ha creado correctamente.",
        type: "success",
      });
      await refreshUserData({ onlyLinks: true });
      navigate(`/links`);
    } else {
      console.error(resData);
      showNotification({
        title: "Error al crear el enlace",
        message: `Error: ${resData.error} ${
          resData.details ? " - " + JSON.stringify(resData.details) : ""
        }`,
        type: "error",
      });
    }

    setButtonLoading(false);
    onClose(true);
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef} size="xl">
      <div className="flex items-center justify-between">
        <h3 className="font-brice text-3xl">Crear enlace</h3>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Estado</p>
          <Switch
            checked={status}
            onChange={() => setStatus(!status)}
            size="md"
          />
        </div>
      </div>

      <div
        className="w-full my-6 grid grid-cols-1 md:grid-cols-2 gap-2 h-96 overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-white/50
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-white
        [&::-webkit-scrollbar-thumb]:rounded-full
      "
      >
        {/* LongURL */}
        <Input
          label="URL Destino"
          placeholder="https://www.google.com"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Sufix */}
        <Input
          label="Sufijo"
          placeholder="micampaña"
          value={sufix}
          onChange={(e) => setSufix(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Group */}
        <div className="flex flex-col gap-1">
          <p className="text-sm">Grupo</p>
          <GroupSelector
            groups={userData.groups}
            selectedGroup={groupSelected}
            onSelect={(group) => setGroupSelected(group)}
            btnVariant={"white_reverse"}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1">
          <p className="text-sm">Etiquetas</p>
          <TagSelector
            tags={userData.tags}
            selectedTags={tagsSelected}
            onSelect={(tags) => setTagsSelected(tags)}
            btnVariant={"white_reverse"}
          />
        </div>

        <div className=" w-full hmd:-px md:col-span-2 my-4 bg-primary" />

        {/* Date Expire */}
        <Input
          label="Fecha de Expiración"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Password */}
        <div className="flex items-end gap-2">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="ClaveSecreta123"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            inputClasses="w-full bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
          />
          <Button
            variant="yellow_reverse"
            size="md"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="flex items-center transition hover:cursor-pointer "
          >
            {showPassword ? (
              <EyeOff width={20} height={20} />
            ) : (
              <Eye width={20} height={20} />
            )}
          </Button>
        </div>

        {/* Access Limit */}
        <Input
          label="Límite de accesos"
          type="number"
          value={accessLimit}
          placeholder="1000"
          onChange={(e) => setAccessLimit(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Blocked Countries */}
        <div className="flex flex-col gap-1">
          <p className="text-sm">Países bloqueados</p>
          <SelectCountry
            countries={userData.countries.map((country) => {
              return {
                ...country,
                title: country.name,
              };
            })}
            selectedCountries={blockedCountries}
            onSelect={(countries) => {
              setBlockedCountries(countries);
            }}
          />
        </div>

        {/* Mobile URL */}
        <Input
          label="URL para móviles"
          type="text"
          value={mobileUrl}
          placeholder="https://mienlace.largo.com"
          onChange={(e) => {
            setMobileUrl(
              e.target.value.length > 0 ? e.target.value : undefined
            );
          }}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Desktop URL */}
        <Input
          label="URL para ordenadores"
          type="text"
          value={desktopUrl}
          placeholder="https://mienlace.largo.com"
          onChange={(e) => setDesktopUrl(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        {/* Metada */}
        <h4 className="text-lg md:col-span-2 mt-4">Metadatos</h4>
        <Input
          label="Título"
          type="text"
          value={metadataTitle}
          placeholder="Título del enlace"
          onChange={(e) => setMetadataTitle(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        <Input
          label="Descripción"
          type="text"
          value={metadataDescription}
          placeholder="Descripción del enlace"
          onChange={(e) => setMetadataDescription(e.target.value)}
          className="w-full"
          inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white"
        />

        <div className="md:col-span-2">
          <Input
            label="Imagen"
            type="text"
            value={metadataImage}
            placeholder="Url de la imagen"
            onChange={(e) => setMetadataImage(e.target.value)}
            className="w-full"
            inputClasses="bg-transparent border-2 border-primary border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white "
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-2 sticky -bottom-6 bg-navy py-6">
        <Button
          variant="coral_reverse"
          size="md"
          onClick={() => {
            handleCancel();
          }}
          className="w-1/2"
        >
          Cancelar
        </Button>
        <Button
          loading={buttonLoading}
          variant="yellow"
          size="md"
          onClick={() => {
            setButtonLoading(true);
            handleSubmit();
          }}
          className="w-1/2"
        >
          Guardar
        </Button>
      </div>
    </Dialog>
  );
}
