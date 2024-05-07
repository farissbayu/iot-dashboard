export default function Button({
  children,
  customStyles,
  buttonType,
  ...props
}) {
  let buttonStyle = customStyles;
  if (buttonType === "primary") {
    buttonStyle +=
      " " +
      "px-8 py-2 text-center text-white bg-primary rounded-2xl opacity-85 hover:opacity-100 hover:shadow-lg duration-300 ease-in-out";
  }
  if (buttonType === "secondary") {
    buttonStyle +=
      " " +
      "py-2 text-center text-secondary rounded-2xl border-2 border-solid border-secondary bg-white transition hover:shadow-md duration-300 ease-in-out";
  }
  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
}
