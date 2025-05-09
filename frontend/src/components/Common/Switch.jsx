import { Check, X } from "lucide-react";

export default function Switch({ checked, onChange, size = "md" }) {
  const handleChange = () => {
    onChange(!checked);
  };

  const sizeClassesContainer = {
    md: "w-16 h-8",
    lg: "w-18 h-10",
    xl: "w-20 h-12",
    "2xl": "w-24 h-14",
  };

  return (
    <div
      className={`relative flex items-center justify-center p-1 border-2 border-dashed rounded-xl border-yellow cursor-pointer ${sizeClassesContainer[size]}`}
      onClick={handleChange}
    >
      <div
        className={`w-1/2 h-full rounded-lg flex items-center justify-center transition  ${
          checked
            ? "-translate-x-[50%] bg-yellow text-navy"
            : "translate-x-[50%] bg-navy text-yellow"
        }`}
      >
        {checked ? <Check size={20} /> : <X size={20} />}
      </div>
    </div>
  );
}
