import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { animate } from "animejs";
import Button from "./Button";

export default function SelectSearchable({
  items = [],
  onSelect,
  selectedItems = [],
  multiple = false,
  placeholder = "Selecciona",
  btnVariant = "navy",
  listClassName = "max-w-48 bg-navy text-white border-2 border-white border-dashed",
  renderItem,
  position = "bottom",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const menuRef = useRef(null);

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

  const handeClose = () => {
    if (!menuRef.current) return;

    animate(menuRef.current, {
      scale: [1, 0.95],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInQuad",
      onComplete: () => {
        setIsOpen(false);
      },
    });
  };

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const openAnimation = animate(menuRef.current, {
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    });

    openAnimation.play();
  }, [isOpen]);

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

  const positions = {
    bottom: "top-12 left-0",
    top: "bottom-12 left-0",
    left: "-top-20 -left-50",
    right: "-top-20 -right-50",
    bottomLeft: "top-0 right-50",
    bottomRight: "top-0 left-50",
    topLeft: "bottom-0 right-50",
    topRight: "bottom-0 left-50",
  };

  return (
    <div ref={containerRef} className={`relative ${isOpen ? "z-500" : ""}`}>
      <Button
        variant={btnVariant}
        className="flex items-center gap-2"
        onClick={() => {
          if (isOpen) {
            handeClose();
          } else {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="text-md max-w-sm overflow-hidden text-ellipsis">
          {multiple && selectedItems?.length > 0
            ? `${selectedItems.length} seleccionados`
            : selectedItems?.title || placeholder}
        </span>

        <ChevronDown
          size={20}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute w-full z-1000 ${positions[position]}`}
        >
          {/* Ensure submenu has high z-index */}
          <div className={`rounded-xl shadow w-full ${listClassName} `}>
            <input
              autoFocus
              type="text"
              className="w-full p-2 mb-2 focus:outline-none"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul
              className="p-2 max-h-40 overflow-y-auto 
              [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-navy/50
            [&::-webkit-scrollbar-thumb]:rounded-full

            "
            >
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className={`w-full cursor-pointer px-2 py-1 rounded hover:bg-white/25  flex items-center justify-between `}
                  onClick={() => handleClick(item)}
                >
                  {renderItem ? (
                    renderItem(item)
                  ) : (
                    <p className="w-4/5 overflow-hidden text-ellipsis">
                      {item.title}
                    </p>
                  )}
                  {isSelected(item) && <Check size={20} />}
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
