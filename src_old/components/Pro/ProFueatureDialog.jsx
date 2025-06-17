import { Sparkles } from "lucide-react";
import Button from "../Common/Button";
import Dialog from "../Common/Dialog";
import { useRef } from "react";

export default function ProFeatureDialog({ isOpen, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  const handleClose = () => {
    onClose();
    dialogRef.current?.close();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm" ref={dialogRef}>
      <h2 className="text-2xl font-bold font-brice mb-6 text-yellow">
        ¡Has descubierto una función PRO!
      </h2>
      <p className="text-md mb-4">
        Desbloquea esta característica y muchas más con Linkkk PRO. Tu apoyo nos
        ayuda a seguir mejorando.
      </p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button variant="coral_reverse" onClick={handleClose} className="w-1/2">
          No, gracias
        </Button>
        <Button
          variant="custom"
          className="flex items-center justify-center gap-2 w-1/2 text-navy bg-gradient-to-r 
        from-lavender to-light-blue py-2 hover:cursor-pointer hover:shadow-[0_6px_0_0_rgb(47,82,224)]"
          onClick={() => {
            handleClose();
            onConfirm();
          }}
        >
          <span className="font-bold font-brice text-md">Probar PRO</span>
          <Sparkles width={20} height={20} />
        </Button>
      </div>
    </Dialog>
  );
}
