import { useRef } from "react";
import Dialog from "../Common/Dialog";
import GroupForm from "./GroupForm";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";

export default function CreateGroupDialog({ isOpen, onClose }) {
  const { showNotification } = useNotification();
  const { refreshUserData } = useUserData();
  const dialogRef = useRef(null);

  const onSubmit = async (data) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}group/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          color: data.color.value,
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      await refreshUserData({ onlyGroups: true });
      showNotification({
        message: "Grupo creado correctamente",
        type: "success",
      });
      onClose();
      dialogRef.current?.close();
    } else {
      console.error(responseData.error);
      showNotification({
        title: "Error al crear grupo",
        message: responseData.details,
        type: "error",
      });
    }

    onClose();
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6">Crear grupo nuevo</h2>
      <GroupForm onSuccess={onSubmit} />
    </Dialog>
  );
}
