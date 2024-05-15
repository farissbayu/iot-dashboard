export default function TableHead({ children, customStyle }) {
  return (
    <thead className={`text-left text-darkFont ${customStyle}`}>
      {children}
    </thead>
  );
}
