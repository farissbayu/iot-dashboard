/* eslint-disable react/prop-types */
export default function Table({ children }) {
  return (
    <table className="w-full border-separate table border-spacing-y-2">
      {children}
    </table>
  );
}
