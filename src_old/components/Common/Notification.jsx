import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { CircleAlert, CircleCheck, XCircleIcon } from "lucide-react";

export default function Notification({ id, title, message, type, duration }) {
  const notificationRef = useRef(null);

  useEffect(() => {
    if (notificationRef.current) {
      animate(notificationRef.current, {
        translateY: "-100px",
        duration: 300,
        ease: "inElastic",
      });

      setTimeout(() => {
        animate(notificationRef.current, {
          translateY: "100px",
          duration: 300,
          ease: "inElastic",
        });
      }, duration - 500);
    }
  }, [duration]);

  return (
    <div
      ref={notificationRef}
      key={id}
      className={`flex items-center justify-between w-[98.5%] max-w-md fixed translate-y-[100px] bottom-25 right-0.5 md:bottom-4 md:right-4 z-500 px-8 py-4 rounded-xl border-2 border-dashed transition-all 
        ${
          type === "success"
            ? "bg-green-950/90 border-green-400 text-green-400"
            : type === "error"
            ? "bg-red-950/90 text-coral border-coral"
            : "bg-amber-950/90 text-amber-400 border-amber-400"
        }
            `}
    >
      <div className="flex flex-col gap-1">
        {title && <h2 className="text-lg font-bold ">{title}</h2>}
        <span className="text-sm">{message}</span>
      </div>
      {type === "success" ? (
        <CircleCheck size={25} />
      ) : type === "error" ? (
        <XCircleIcon size={25} />
      ) : (
        <CircleAlert size={25} />
      )}
    </div>
  );
}
