import SelectSearchable from "../Common/SelectSearchable";

export default function TagSelector({
  tags,
  selectedTags,
  onSelect,
  btnVariant,
}) {
  const newTags = tags?.map((tag) => {
    return {
      id: tag.id,
      title: tag.name,
      color: tag.color,
    };
  });

  return (
    <SelectSearchable
      items={newTags}
      selectedItems={selectedTags}
      onSelect={onSelect}
      multiple={true}
      placeholder="Seleccionar tags..."
      btnVariant={btnVariant || "navy_reverse"}
      listClassName={"bg-primary text-white border-2 border-navy border-dashed"}
    />
  );
}
