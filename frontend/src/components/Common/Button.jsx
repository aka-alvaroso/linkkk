import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "rounded-xl font-medium transition-all focus:outline-none disabled:opacity-50 cursor-pointer";

  const variants = {
    yellow:
      "bg-yellow text-navy border-2 border-yellow border-dashed hover:bg-transparent hover:text-yellow",
    yellow_reverse:
      "bg-transparent text-yellow border-2 border-yellow border-dashed hover:bg-yellow hover:text-navy",
    primary:
      "bg-primary text-white border-2 border-primary border-dashed hover:bg-transparent hover:text-primary",
    primary_reverse:
      "bg-transparent text-primary border-2 border-primary border-dashed hover:bg-primary hover:text-white",
    white:
      "bg-white text-navy border-2 border-white border-dashed hover:bg-transparent hover:text-white",
    white_reverse:
      "bg-transparent text-white border-2 border-white border-dashed hover:bg-white hover:text-navy",
    coral:
      "bg-coral text-white border-2 border-coral border-dashed hover:bg-transparent hover:text-coral",
    coral_reverse:
      "bg-transparent text-coral border-2 border-coral border-dashed hover:bg-coral hover:text-white",
    navy: "bg-navy text-white border-2 border-navy border-dashed hover:bg-transparent hover:text-navy",
    navy_reverse:
      "bg-transparent text-navy border-2 border-navy border-dashed hover:bg-navy hover:text-white",
    lavender:
      "bg-lavender text-navy border-2 border-lavender border-dashed hover:bg-transparent hover:text-lavender",
    lavender_reverse:
      "bg-transparent text-lavender border-2 border-lavender border-dashed hover:bg-lavender hover:text-navy",
    pink: "bg-pink text-navy border-2 border-pink border-dashed hover:bg-transparent hover:text-pink",
    pink_reverse:
      "bg-transparent text-pink border-2 border-pink border-dashed hover:bg-pink hover:text-navy",
    orange:
      "bg-orange text-navy border-2 border-orange border-dashed hover:bg-transparent hover:text-orange",
    orange_reverse:
      "bg-transparent text-orange border-2 border-orange border-dashed hover:bg-orange hover:text-navy",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${
        variant === "custom" ? "" : variants[variant]
      } ${variant === "custom" ? "" : sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="animate-spin m-auto" size={24} />
      ) : (
        children
      )}
    </button>
  );
}
