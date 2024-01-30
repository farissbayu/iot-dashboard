export default function ButtonPrimary({
    onClick,
    children,
    customStyles
}) {
    return (
        <button className={`px-8 py-2 text-center text-white text-xl bg-primary rounded-2xl ${customStyles} hover:opacity-90`} onClick={onClick}>{children}</button>
    );
};