import { useRef } from "react";
import Dialog from "../Common/Dialog";
import TagForm from "./TagForm";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";

export default function CreateTagDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const { refreshUserData } = useUserData();
  const { showNotification } = useNotification();

  const onSubmit = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}tag/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        tagName: data.title,
        color: data.color.value,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await refreshUserData({ onlyTags: true });
      showNotification({
        title: "Etiqueta creada",
        message: "La etiqueta se ha creado correctamente.",
        type: "success",
      });
    } else {
      console.error(responseData.error);
      showNotification({
        title: "Error al crear etiqueta",
        message: responseData.details,
        type: "error",
      });
    }

    onClose();
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6">
        Crear etiqueta nueva
      </h2>
      <TagForm onSuccess={onSubmit} />
    </Dialog>
  );
}
