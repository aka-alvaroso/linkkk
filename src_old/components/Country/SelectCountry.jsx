import SelectSearchable from "../Common/SelectSearchable";

export default function SelectCountry({
  onSelect,
  selectedCountries,
  countries,
}) {
  return (
    <SelectSearchable
      items={countries}
      selectedItems={selectedCountries}
      onSelect={onSelect}
      multiple={true}
      placeholder="Seleccionar país..."
      btnVariant="white_reverse"
      position="bottom"
      listClassName="bg-navy min-w-48 border-2 border-white border-dashed rounded-xl p-2 text-white"
      renderItem={(item) => {
        return (
          <div className="flex items-center gap-2 mr-2">
            <span className={`rounded-full p-2 text-xs`}>
              <img
                src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.webp`}
              />
            </span>
            <span>{item.title}</span>
          </div>
        );
      }}
    />
  );
}
