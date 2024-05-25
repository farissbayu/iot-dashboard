/* eslint-disable react/prop-types */
export default function TextArea({
  id,
  children,
  name,
  row,
  col,
  customStyles,
  ...props
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-formColor text-sm">
        {children}
      </label>
      <textarea
        id={id}
        name={name}
        rows={row}
        cols={col}
        className={`text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm ${customStyles}`}
        {...props}
      />
    </div>
  );
}
