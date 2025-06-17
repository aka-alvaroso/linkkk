export default function Card({
  children,
  rounded = "xl",
  custom = false,
  onClick,
  className,
}) {
  return (
    <div
      className={`bg-transparent border-2 border-navy border-dashed rounded-${rounded} p-4 transition hover:border-white ${
        custom ? className : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
