import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function SelectSearchable({
  items = [],
  onSelect,
  selectedItems = [],
  multiple = false,
  placeholder = "Selecciona",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const isSelected = (item) => {
    if (multiple) {
      return selectedItems.some((i) => i.id === item.id);
    } else {
      return selectedItems?.id === item.id;
    }
  };

  const handleClick = (item) => {
    if (multiple) {
      const alreadySelected = selectedItems.some((i) => i.id === item.id);
      if (alreadySelected) {
        onSelect(selectedItems.filter((i) => i.id !== item.id));
      } else {
        onSelect([...selectedItems, item]);
      }
    } else {
      setIsOpen(false);
      if (selectedItems?.id === item.id) {
        onSelect(null);
      } else {
        onSelect(item);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${isOpen ? "z-500" : ""}`}>
      <button
        className={`z-500 bg-transparent border-2 border-dashed rounded-xl shadow p-2 flex items-center justify-between w-48 hover:cursor-pointer 
        ${
          (multiple && selectedItems?.length > 0) ||
          (!multiple && selectedItems !== null)
            ? "border-white text-white"
            : "border-navy text-navy"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md max-w-10/12 overflow-hidden text-ellipsis">
          {multiple && selectedItems?.length > 0
            ? `${selectedItems.length} seleccionados`
            : selectedItems?.title || placeholder}
        </span>

        <ChevronDown
          size={20}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 w-full z-1000 ">
          {" "}
          {/* Ensure submenu has high z-index */}
          <div className="rounded-xl bg-yellow shadow p-2 w-full">
            <input
              autoFocus
              type="text"
              className="w-full border-b-2 border-navy p-1 mb-2 focus:outline-none"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul
              className="max-h-40 overflow-y-auto 
              [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-navy/50
            [&::-webkit-scrollbar-thumb]:rounded-full

            "
            >
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className={`w-full cursor-pointer px-2 py-1 rounded hover:bg-navy/25 hover:text-primary flex items-center justify-between `}
                  onClick={() => handleClick(item)}
                >
                  <p className="w-4/5 overflow-hidden text-ellipsis">
                    {item.title}
                  </p>
                  {isSelected(item) && <Check width={20} height={20} />}
                </li>
              ))}
              {filteredItems.length === 0 && (
                <li className="italic px-2">Sin resultados</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
