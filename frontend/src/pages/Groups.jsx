import React, { useEffect, useState } from "react";
import { useUserData } from "../context/UserDataContext";
import {
  Ellipsis,
  Folder,
  FolderX,
  ImagePlay,
  Link2,
  Pencil,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Button from "../components/Common/Button";
import CreateGroupDialog from "../components/Group/CreateGroupDialog";
import EditGroupDialog from "../components/Group/EditGroupDialog";
import DeleteGroupDialog from "../components/Group/DeleteGroupDialog";
import Card from "../components/Common/Card";

export default function Groups() {
  console.log("Groups");
  const { userData } = useUserData();
  const [groupsFiltered, setGroupsFiltered] = useState(userData.groups);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSearch = (e) => {
    setGroupsFiltered(
      userData.groups.filter((group) =>
        group.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setGroupsFiltered(userData.groups);
  }, [userData.groups]);

  // Function to handle modal close and refresh groups
  const handleModalClose = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="w-full lg:w-4/6 mx-auto h-full p-4 overflow-hidden">
      <CreateGroupDialog
        isOpen={isCreateDialogOpen}
        onClose={handleModalClose}
      />
      <EditGroupDialog
        isOpen={isEditDialogOpen}
        onClose={handleModalClose}
        group={selectedGroup}
      />
      <DeleteGroupDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleModalClose}
        group={selectedGroup}
      />
      <div className="p-4 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold text-yellow font-brice">
          Mis grupos
        </h1>
        <Button
          variant="yellow"
          size="lg"
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus width={20} height={20} />
          <span className="ml-2">Crear grupo</span>
        </Button>
        <div className="max-w-48 flex items-center gap-2 bg-primary text-white border-2 border-white border-dashed rounded-xl p-2 ">
          <Search width={20} height={20} />
          <input
            type="text"
            placeholder="Buscar grupos"
            className="w-full py-1 px-2 focus:outline-none placeholder:text-white"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">
        {userData.groups.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-navy">
            <FolderX width={42} height={42} />
            <p className="text-2xl font-bold my-4">No tienes grupos.</p>
            <button
              className="py-2 px-4 bg-transparent border-2 border-navy border-dashed text-white rounded-xl flex items-center gap-2 transition hover:cursor-pointer hover:bg-navy hover:text-white"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Crear uno
              <Plus width={20} height={20} />
            </button>
          </div>
        )}

        {groupsFiltered.length === 0 && userData.groups.length !== 0 && (
          <div className="w-full flex flex-col items-center justify-center text-navy">
            <FolderX width={42} height={42} />
            <p className="text-2xl font-bold my-4">
              No se han encontrado grupos con ese título.
            </p>
          </div>
        )}

        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4">
          {groupsFiltered.map((group) => {
            const groupColor = colorMap[group.color];

            return (
              <Card
                key={group.id}
                custom
                rounded="3xl"
                className={"text-white flex flex-col gap-4"}
              >
                <div className="w-full flex items-start gap-2">
                  <span
                    className={`${groupColor} flex items-center justify-center p-2 rounded-4xl text-white text-2xl font-bold`}
                  >
                    <Folder width={20} height={20} />
                  </span>
                  <h1
                    className={`text-lg font-bold bg-transparent w-4/6 overflow-hidden overflow-ellipsis`}
                  >
                    {group.title}
                  </h1>
                </div>
                <div className="w-full text-left text-md overflow-hidden max-h-20 overflow-y-auto">
                  {group.description}
                </div>

                <div className="w-full grid grid-cols-2 gap-2 items-center mt-auto">
                  <Button
                    variant="yellow"
                    size="md"
                    onClick={() => {
                      setSelectedGroup(group);
                      setIsEditDialogOpen(true);
                    }}
                    className="flex justify-center"
                  >
                    <Pencil size={20} />
                  </Button>
                  <Button
                    variant="coral"
                    size="md"
                    onClick={() => {
                      setSelectedGroup(group);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="flex justify-center"
                  >
                    <Trash size={20} />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
