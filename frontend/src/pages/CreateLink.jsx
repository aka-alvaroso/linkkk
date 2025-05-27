import {
  ALargeSmall,
  ArrowBigDown,
  AtSign,
  Check,
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  FileType,
  Folder,
  Globe,
  Image,
  Minus,
  Monitor,
  Plus,
  PlusIcon,
  Settings,
  TabletSmartphone,
  Tag,
  Twitter,
  User,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { useNotification } from "../context/NotificationContext";

import Loading from "../components/Common/Loading";
import CreateGroupDialog from "../components/Group/CreateGroupDialog";
import CreateTagDialog from "../components/Tag/CreateTagDialog";
import Button from "../components/Common/Button";
import CreateLinkDialog from "../components/Link/CreateLinkDialog";
import GroupSelector from "../components/Group/GroupSelector";
import TagSelector from "../components/Tag/TagSelector";
import ProFeatureDialog from "../components/Pro/ProFueatureDialog";

export default function CreateLink() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userData, refreshUserData } = useUserData();
  const { showNotification } = useNotification();
  const [isCreateLinkDialogOpen, setIsCreateLinkDialogOpen] = useState(false);
  const [isProFeatureDialogOpen, setIsProFeatureDialogOpen] = useState(false);
  const [linkData, setLinkData] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const handleSubmit = async () => {
      if (!linkData.longUrl) {
        showNotification({
          title: "Error",
          message: "Ingresa una URL válida.",
          type: "error",
        });
        setSubmit(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}link/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...linkData,
          groupId: linkData.group?.id,
          tags: linkData.tags?.map((tag) => tag.id),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showNotification({
          title: "Enlace creado",
          message: "El enlace se ha creado correctamente.",
          type: "success",
        });
        await refreshUserData({ onlyLinks: true });
        navigate(`/links`);
      } else {
        showNotification({
          title: "Error",
          message: data.details,
          type: "error",
        });
        console.error(data.details);
      }
    };

    if (submit) {
      handleSubmit();
    }
  }, [submit]);

  return (
    <div className="relative w-full lg:w-4/6 mx-auto py-6 pb-24 min-h-full mt-12 flex flex-col items-center justify-center bg-primary text-white">
      <h1 className="text-6xl font-bold text-yellow font-brice">
        Crear enlace
      </h1>

      <p className="text-center max-w-2xl mt-6">
        Personaliza tus enlaces a tu gusto en segundos. Compártelo con quien
        quieras y luego revisa las estadísticas de tus enlaces.
      </p>

      <form
        className="mt-6 w-full max-w-lg flex flex-col items-center justify-center gap-4 p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <CreateLinkDialog
          isOpen={isCreateLinkDialogOpen}
          onClose={() => {
            setIsCreateLinkDialogOpen(false);
          }}
          countries={userData.countries.map((country) => ({
            ...country,
            title: country.name,
          }))}
          linkData={linkData}
          setLinkData={setLinkData}
        />
        <ProFeatureDialog
          isOpen={isProFeatureDialogOpen}
          onClose={() => {
            setIsProFeatureDialogOpen(false);
          }}
          onConfirm={() => {
            setIsProFeatureDialogOpen(false);
          }}
        />
        <input
          id="long-url"
          type="text"
          className="w-full h-13 p-2 text-lg rounded-xl border-2 border-navy border-dashed text-white bg-transparent transition focus:outline-none focus:border-white"
          placeholder="https://mienlace.largo.com"
          value={linkData.longUrl || ""}
          onChange={(e) =>
            setLinkData({ ...linkData, longUrl: e.target.value })
          }
        />

        <div className="flex items-center justify-center gap-4">
          {/* Grupo */}
          <GroupSelector
            groups={userData.groups}
            selectedGroup={linkData.group}
            onSelect={(group) => setLinkData({ ...linkData, group })}
          />
          {/* Tags */}
          <TagSelector
            tags={userData.tags}
            selectedTags={linkData.tags}
            onSelect={(tags) => setLinkData({ ...linkData, tags })}
          />
        </div>

        <div className="w-full grid grid-cols-6 gap-4">
          <Button
            variant="yellow_reverse"
            size="md"
            onClick={() => {
              if (user.planId !== 2) {
                setIsProFeatureDialogOpen(true);
              } else {
                setIsCreateLinkDialogOpen(true);
              }
            }}
            className="flex items-center gap-2 col-span-3 sm:col-span-2"
          >
            <Settings size={20} />
            <span className="ml-2">Avanzado</span>
          </Button>
          <Button
            variant="yellow"
            size="md"
            onClick={() => {
              setSubmit(true);
            }}
            className="flex items-center justify-center gap-2 col-span-3 sm:col-span-4"
            loading={submit}
          >
            <span className="ml-2">Acortar</span>
            <CornerDownLeft size={20} />
          </Button>
        </div>
      </form>

      <img
        src="/images/linky_ok.png"
        alt="Linky ok"
        className="w-1/2 max-w-[250px]"
      />
    </div>
  );
}
