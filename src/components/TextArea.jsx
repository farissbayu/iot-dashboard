export default function TextArea({
  id,
  children,
  name,
  placeholderText,
  row,
  col,
  customStyles,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-formColor text-sm">
        {children}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholderText}
        rows={row}
        cols={col}
        className={`text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm ${customStyles}`}
      />
    </div>
  );
}
