/* eslint-disable react/prop-types */
import { deleteNode } from "../api/node-request";
import useApi from "../hooks/useApi";
import Button from "./ui/Button";

export default function NodeDeletionModal({
  nodeId,
  onCloseModal,
  modalIsOpen,
  onDeleteNode
}) {

  return (
    <dialog
      className="bg-white p-6 rounded-lg max-w-md mx-auto"
      open={modalIsOpen}
    >
      <h2 className="text-xl font-bold mb-4">
        Are you sure you want to delete node {nodeId}?
      </h2>
      <div className="flex justify-center">
        <Button
          buttonType="primary"
          customStyles="bg-buttonRed mx-2"
          onClick={onDeleteNode}
        >
          {/* {loading ? "Deleting..." : "Delete"} */}
          Delete
        </Button>
        <Button
          buttonType="primary"
          customStyles="bg-primary mx-2"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </div>
    </dialog>
  );
}
