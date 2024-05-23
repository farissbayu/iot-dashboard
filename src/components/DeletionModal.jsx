/* eslint-disable react/prop-types */
import Button from "./ui/Button";

export default function DeletionModal({
  title,
  onCancel,
  modalIsOpen,
  onDelete,
}) {
  return (
    <dialog
      className="bg-white p-6 rounded-lg max-w-md mx-auto"
      open={modalIsOpen}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex justify-center">
        <Button
          buttonType="primary"
          customStyles="bg-buttonRed mx-2"
          onClick={onDelete}
        >
          {/* {loading ? "Deleting..." : "Delete"} */}
          Delete
        </Button>
        <Button
          buttonType="primary"
          customStyles="bg-primary mx-2"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </dialog>
  );
}
