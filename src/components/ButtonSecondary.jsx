export default function ButtonSecondary({
    onClick,
    children,
    width
}) {
    return (
        <button className={`${width} px-8 py-2 text-center text-secondary text-xl rounded-2xl border-2 border-solid border-secondary transition hover:bg-slate-100 duration-300 ease-in-out`} onClick={onClick}>{children}</button>
    );
};