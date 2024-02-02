export default function ButtonPrimary({
  onClick,
  children,
  customStyles,
  type,
}) {
  return (
    <button
      className={`px-8 py-2 text-center text-white text-xl bg-primary rounded-2xl ${customStyles} hover:shadow-lg duration-300 ease-in-out`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
