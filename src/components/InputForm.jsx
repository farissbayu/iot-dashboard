export default function InputForm({
  id,
  children,
  name,
  placeholderText,
  customStyles,
  type
}) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className='text-formColor text-sm'>
                {children}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholderText}
                className={`text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm ${customStyles}`}
            />
        </div>
    );
}
