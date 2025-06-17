import SelectSearchable from "../Common/SelectSearchable";

export default function GroupSelector({
  groups,
  selectedGroup,
  onSelect,
  btnVariant,
}) {
  return (
    <SelectSearchable
      items={groups}
      selectedItems={selectedGroup}
      onSelect={onSelect}
      multiple={false}
      placeholder="Seleccionar grupo..."
      btnVariant={btnVariant || "navy_reverse"}
      listClassName={"bg-primary text-white border-2 border-navy border-dashed"}
    />
  );
}
