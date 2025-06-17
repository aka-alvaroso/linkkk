import { useState } from "react";
import Button from "../Common/Button";
import SelectColor from "../Common/SelectColor";

export default function GroupForm({ defaultValues, onSuccess }) {
  const [title, setTitle] = useState(defaultValues?.title);
  const [description, setDescription] = useState(defaultValues?.description);
  const [color, setColor] = useState(defaultValues?.color);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      color: color,
    };
    onSuccess(data);
  };

  const onSelectColor = (color) => {
    setColor(color);
  };

  return (
    <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="my-2 grid grid-cols-4 gap-4 items-center">
        <label htmlFor="group-title" className="text-right">
          Título:
        </label>
        <input
          id="group-title"
          type="text"
          autoFocus
          placeholder="Nombre del grupo"
          className="col-span-3 focus:outline-none p-2 border border-white rounded-xl"
          defaultValue={defaultValues?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="my-2 grid grid-cols-4 gap-4 items-center">
        <label htmlFor="group-title" className="text-right">
          Descripción:
        </label>
        <input
          id="group-description"
          type="text"
          placeholder="Descripción del grupo"
          className="col-span-3 focus:outline-none p-2 border border-white rounded-xl"
          defaultValue={defaultValues?.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="my-2 w-full flex gap-2 items-center">
        <label htmlFor="group-color" className="text-right">
          Color:
        </label>
        <SelectColor onSelect={onSelectColor} selectedColor={color} />
      </div>

      <Button type="submit" variant="yellow_reverse" className="w-full">
        Guardar
      </Button>
    </form>
  );
}
