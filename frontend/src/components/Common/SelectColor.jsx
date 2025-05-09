import SelectSearchable from "./SelectSearchable";

const colors = [
  { id: 1, title: "Rojo", value: "RED", color: "bg-red-500 text-red-500" },
  {
    id: 2,
    title: "Naranja",
    value: "ORANGE",
    color: "bg-orange-500 text-orange-500",
  },
  {
    id: 3,
    title: "Ambar",
    value: "AMBER",
    color: "bg-amber-500 text-amber-500",
  },
  {
    id: 4,
    title: "Amarillo",
    value: "YELLOW",
    color: "bg-yellow-500 text-yellow-500",
  },
  { id: 5, title: "Lima", value: "LIME", color: "bg-lime-500 text-lime-500" },
  {
    id: 6,
    title: "Verde",
    value: "GREEN",
    color: "bg-green-500 text-green-500",
  },
  {
    id: 7,
    title: "Esmeralda",
    value: "EMERALD",
    color: "bg-emerald-500 text-emerald-500",
  },
  {
    id: 8,
    title: "Turquesa",
    value: "TEAL",
    color: "bg-teal-500 text-teal-500",
  },
  { id: 9, title: "Cian", value: "CYAN", color: "bg-cyan-500 text-cyan-500" },
  {
    id: 10,
    title: "Azul cielo",
    value: "SKY",
    color: "bg-sky-500 text-sky-500",
  },
  { id: 11, title: "Azul", value: "BLUE", color: "bg-blue-500 text-blue-500" },
  {
    id: 12,
    title: "Indigo",
    value: "INDIGO",
    color: "bg-indigo-500 text-indigo-500",
  },
  {
    id: 13,
    title: "Violeta",
    value: "VIOLET",
    color: "bg-violet-500 text-violet-500",
  },
  {
    id: 14,
    title: "Morado",
    value: "PURPLE",
    color: "bg-purple-500 text-purple-500",
  },
  {
    id: 15,
    title: "Fucsia",
    value: "FUCHSIA",
    color: "bg-fuchsia-500 text-fuchsia-500",
  },
  { id: 16, title: "Rosa ", value: "ROSE", color: "bg-rose-500 text-rose-500" },
  { id: 17, title: "Gris", value: "GRAY", color: "bg-gray-500 text-gray-500" },
  { id: 18, title: "Zinc", value: "ZINC", color: "bg-zinc-500 text-zinc-500" },
  {
    id: 19,
    title: "Neutral",
    value: "NEUTRAL",
    color: "bg-neutral-500 text-neutral-500",
  },
  {
    id: 20,
    title: "Piedra",
    value: "STONE",
    color: "bg-stone-500 text-stone-500",
  },
];

export default function SelectColor({ onSelect, selectedColor }) {
  return (
    <SelectSearchable
      items={colors}
      selectedItems={selectedColor}
      onSelect={onSelect}
      multiple={false}
      placeholder="Seleccionar color..."
      btnVariant="white_reverse"
      renderItem={(item) => {
        return (
          <div className="flex items-center gap-2">
            <span className={`${item.color} rounded-full p-2 text-xs`}></span>
            <span>{item.title}</span>
          </div>
        );
      }}
    />
  );
}
