import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react"; // Import forwardRef and useImperativeHandle
import { animate } from "animejs";

// Wrap component definition with forwardRef
const Dialog = forwardRef(({ isOpen, onClose, children, size = "md" }, ref) => {
  // Add ref as the second argument
  const [show, setShow] = useState(false);
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  useEffect(() => {
    if (!show || !backgroundRef.current) return;

    const animation = animate(backgroundRef.current, {
      opacity: [0, 1],
      scale: [0.99, 1],
      duration: 300,
      easing: "easeOutQuad",
      autoplay: false,
    });

    animation.play();

    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [show]);

  const handleClose = () => {
    if (!backgroundRef.current) return;

    animate(backgroundRef.current, {
      opacity: [1, 0],
      scale: [1, 0.99],
      duration: 200,
      easing: "easeInQuad",
      onComplete: () => {
        setShow(false);
        onClose?.();
      },
    });
  };

  // Expose the handleClose function via the ref
  useImperativeHandle(ref, () => ({
    close: handleClose, // Expose internal handleClose as 'close'
  }));

  if (!show) return null;

  const dialogSize = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  return (
    <div
      ref={backgroundRef}
      className="dialog-background fixed inset-0 z-1000 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === backgroundRef.current) handleClose();
      }}
    >
      <div
        className={`bg-navy border-2 border-primary border-dashed text-white rounded-2xl mx-4 p-6 relative max-w-full max-h-[75vh] overflow-auto md:${dialogSize[size]}
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-white/20
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-white
        [&::-webkit-scrollbar-thumb]:rounded-full
        `}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}); // Close forwardRef

export default Dialog; // Export the wrapped component
