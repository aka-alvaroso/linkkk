import SelectSearchable from "../Common/SelectSearchable";

export default function GroupSelector({ groups, selectedGroup, onSelect }) {
  return (
    <SelectSearchable
      items={groups}
      selectedItems={selectedGroup}
      onSelect={onSelect}
      multiple={false}
      placeholder="Buscar grupo..."
    />
  );
}
