import { useRef, useState } from "react"; // Import useRef
import Button from "../Common/Button";
import Dialog from "../Common/Dialog";
import { useNotification } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserDataContext";

export default function DeleteLinkDialog({ isOpen, onClose, onConfirm, link }) {
  const { refreshUserData } = useUserData();
  const dialogRef = useRef(null);
  const { showNotification } = useNotification();
  const [buttonLoading, setButtonLoading] = useState(false);

  const onSubmit = async () => {
    setButtonLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}link/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: Number(link.id),
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      showNotification({
        title: "Link eliminado",
        message: "El enlace se ha eliminado correctamente.",
        type: "success",
      });
    } else {
      console.error(responseData.details);
    }

    await refreshUserData({ onlyLinks: true });
    setButtonLoading(false);
    onConfirm();
    onClose(false);
    handleCancel();
  };

  const handleCancel = () => {
    dialogRef.current?.close();
  };

  return (
    // Pass the ref to the Dialog component
    <Dialog isOpen={isOpen} onClose={onClose} ref={dialogRef} size="lg">
      <h2 className="text-xl font-bold font-brice mb-6 overflow-hidden text-ellipsis">
        ¿Eliminar link{" "}
        <span className="font-brice text-yellow">
          linkkk.dev/{link?.sufix || link?.shortUrl}
        </span>
        ?
      </h2>
      <p className="text-sm  mb-4">
        Esta acción no se puede deshacer. Al borrar este link nadie podrá
        acceder a él.
      </p>
      <div className="flex items-center justify-center sm:justify-end gap-4">
        {/* Update onClick for the Cancel button */}
        <Button variant="coral_reverse" size="md" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          variant="coral"
          size="md"
          onClick={onSubmit}
          loading={buttonLoading}
        >
          Eliminar
        </Button>
      </div>
    </Dialog>
  );
}
