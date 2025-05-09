import { useRef } from "react";
import Dialog from "../Common/Dialog";
import TagForm from "./TagForm";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";

export default function EditTagDialog({ isOpen, onClose, tag }) {
  const dialogRef = useRef(null);
  const { refreshUserData } = useUserData();
  const { showNotification } = useNotification();

  const onSubmit = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}tag/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        tagId: Number(tag.id),
        name: data.title,
        color: data.color?.value,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await refreshUserData({ onlyTags: true });
      showNotification({
        title: "Etiqueta actualizada",
        message: "La etiqueta se ha actualizado correctamente.",
        type: "success",
      });
    } else {
      console.error(responseData.error);
      showNotification({
        title: "Error al actualizar etiqueta",
        message: `Error: ${responseData.error} - ${JSON.stringify(
          responseData.details
        )}`,
        type: "error",
      });
    }

    onClose();
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6">
        Editar etiqueta{" "}
        <span className="font-brice text-yellow">{tag?.name}</span>
      </h2>
      <TagForm onSuccess={onSubmit} defaultValues={tag} />
    </Dialog>
  );
}
