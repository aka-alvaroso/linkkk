import React from "react";

const Input = ({
  id,
  type = "text",
  placeholder = "",
  defaultValue,
  value,
  onChange,
  autoComplete = "off",
  name,
  inputClasses = "bg-transparent border-2 border-navy border-dashed text-white rounded-xl p-2 focus:outline-none focus:border-white",
  labelClasses = "text-white text-sm",
  disabled = false,
  required = false,
  error = "",
  label = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        className={`input transition ${inputClasses} ${
          error ? "input-error" : ""
        }`}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        autofill={autoComplete}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
