/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./ui/Button";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function InfoSendDataModal({
  onCancel,
  modalIsOpen,
  nodeId,
  token,
}) {
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopyMessage("Token copied to clipboard!");
      setTimeout(() => {
        setCopyMessage("");
      }, 2000);
    });
  };

  return (
    <dialog
      className="bg-white p-6 rounded-lg max-w-md mx-auto"
      open={modalIsOpen}
    >
      <h2 className="text-xl font-bold mb-4 text-center">Guide to Send Data</h2>

      <div className="grid grid-cols-1 gap-y-4 mb-4">
        <div>
          <strong>API URL:</strong> {`${apiUrl}channel`}
        </div>
        <div>
          <strong>Method:</strong> POST
        </div>
        <div className="flex items-center gap-x-2">
          <strong>Token:</strong>
          <Button
            onClick={handleCopy}
            buttonType="secondary"
            customStyles="border-secondary px-4 py-1"
          >
            Copy
          </Button>
        </div>
        {copyMessage && (
          <div className="text-green-500 mt-2">{copyMessage}</div>
        )}
        <div>
          <strong>Request Body:</strong>
          <pre className="bg-gray-100 p-2 rounded mt-1">
            {`{
  "id_node": ${nodeId},
  "value": []
}`}
          </pre>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={onCancel} className="hover:underline">
          Cancel
        </button>
      </div>
    </dialog>
  );
}
