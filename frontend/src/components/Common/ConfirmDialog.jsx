import { useRef } from "react";
import Dialog from "./Dialog";
import Button from "./Button";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  const dialogRef = useRef(null);
  function handleClose() {
    onClose();
    dialogRef.current?.close();
  }

  function handleConfirm() {
    onConfirm();
    dialogRef.current?.close();
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={title} ref={dialogRef}>
      <p>{message}</p>
      <div className="mt-2 flex gap-2 items-center justify-end">
        <Button onClick={handleClose} variant="coral_reverse">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="yellow">
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}
