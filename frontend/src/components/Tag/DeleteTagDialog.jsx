import { useRef } from "react"; // Import useRef
import Button from "../Common/Button";
import Dialog from "../Common/Dialog";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";

export default function DeleteTagDialog({ isOpen, onClose, tag }) {
  const dialogRef = useRef(null);
  const { showNotification } = useNotification();
  const { refreshUserData } = useUserData();

  const onSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}tag/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        tagId: Number(tag.id),
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await refreshUserData({ onlyTags: true });
      showNotification({
        title: "Etiqueta eliminada",
        message: "La etiqueta se ha eliminado correctamente.",
        type: "success",
      });
    } else {
      console.error(responseData.details);
      showNotification({
        title: "Error al eliminar etiqueta",
        message: responseData.details,
        type: "error",
      });
    }

    onClose();
    dialogRef.current?.close();
  };

  const handleCancel = () => {
    onClose();
    dialogRef.current?.close(); // Call the exposed close method from Dialog
  };

  return (
    // Pass the ref to the Dialog component
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6">
        ¿Eliminar etiqueta{" "}
        <span className="font-brice text-yellow">{tag?.name}</span>?
      </h2>
      <p className="text-sm  mb-4">
        Esta acción no se puede deshacer. Todos los enlaces asociados a esta
        etiqueta se quedarán sin ella.
      </p>
      <div className="flex items-center justify-end gap-4">
        {/* Update onClick for the Cancel button */}
        <Button variant="coral_reverse" size="md" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="coral" size="md" onClick={onSubmit}>
          {" "}
          {/* Keep existing onClick for Delete */}
          Eliminar
        </Button>
      </div>
    </Dialog>
  );
}
