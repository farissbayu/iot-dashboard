/* eslint-disable react/prop-types */

export default function Dropdown({
  id,
  name,
  label,
  value,
  onChange,
  options,
  loading = false,
  defaultOptionText,
  customStyles,
  optionKey = "",
  optionValue = "",
  isRequired = false,
}) {
  return (
    <div className={`flex flex-col space-y-2 ${customStyles}`}>
      <label htmlFor={id} className="text-formColor text-sm">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm w-full"
        required={isRequired}
      >
        <option value="">{loading ? "Loading..." : defaultOptionText}</option>
        {options.map((option) => (
          <option
            key={option[optionKey] || option}
            value={option[optionValue] || option}
            className="text-black"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
