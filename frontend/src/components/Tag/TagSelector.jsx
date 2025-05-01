import SelectSearchable from "../Common/SelectSearchable";

export default function GroupSelector({ tags, selectedTags, onSelect }) {
  const newTags = tags.map((tag) => {
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
    />
  );
}
