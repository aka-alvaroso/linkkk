import Dialog from "../Common/Dialog";
import GroupForm from "./GroupForm";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";
import { useRef } from "react";

export default function EditGroupDialog({ isOpen, onClose, group }) {
  const dialogRef = useRef(null);
  const { showNotification } = useNotification();
  const { refreshUserData } = useUserData();

  const onSubmit = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}group/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          groupId: Number(group.id),
          title: data.title,
          description: data.description,
          color: data.color?.value,
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      await refreshUserData({ onlyGroups: true });
      showNotification({
        title: "Grupo actualizado",
        message: "El grupo se ha actualizado correctamente.",
        type: "success",
      });
    } else {
      console.error(responseData.details);
      showNotification({
        title: "Error al actualizar el grupo",
        message: responseData.details,
        type: "error",
      });
    }

    onClose(true);
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6">
        Editar grupo{" "}
        <span className="font-brice text-yellow">{group?.title}</span>
      </h2>
      <GroupForm onSuccess={onSubmit} defaultValues={group} />
    </Dialog>
  );
}
