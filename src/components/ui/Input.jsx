export default function Input({ id, children, customStyles, ...props }) {
  return (
    <div className="flex flex-col space-y-2 flex-1">
      {children && (
        <label htmlFor={id} className="text-formColor text-sm">
          {children}
        </label>
      )}
      <input
        id={id}
        className={`text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm ${customStyles}`}
        {...props}
      />
    </div>
  );
}
