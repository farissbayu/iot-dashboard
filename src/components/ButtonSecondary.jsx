export default function ButtonSecondary({ onClick, children, width, type }) {
  return (
    <button
      className={`${width} px-8 py-2 text-center text-secondary text-xl rounded-2xl border-2 border-solid border-secondary transition hover:shadow-md duration-300 ease-in-out`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
