export default function PaginationButtons({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === number ? "bg-secondary text-white" : "bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
