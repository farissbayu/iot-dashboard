export default function ButtonSecondary({ onClick, children, customStyles, type }) {
  return (
    <button
      className={`${customStyles} px-8 py-2 text-center text-secondary rounded-2xl border-2 border-solid border-secondary bg-white transition hover:shadow-md duration-300 ease-in-out`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
