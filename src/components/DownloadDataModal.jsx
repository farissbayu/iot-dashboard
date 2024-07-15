/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./ui/Button";
import { formatDate } from "../utils/helper";

export default function DownloadDataModal({
  onCancel,
  modalIsOpen,
  downloadData,
  error,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateIsEmpty, setDateIsEmpty] = useState(false);

  function handleStartDate(e) {
    setStartDate(e.target.value);
    setDateIsEmpty(false);
  }

  function handleEndDate(e) {
    setEndDate(e.target.value);
    setDateIsEmpty(false);
  }

  function handleDownloadAll() {
    const startDate = "1970-01-01";
    const endDate = formatDate(new Date());
    downloadData(startDate, endDate);
  }

  const handleDownloadInterval = () => {
    if (startDate && endDate) {
      downloadData(startDate, endDate);
    } else {
      setDateIsEmpty(true);
    }
  };

  return (
    <dialog
      className="bg-white p-6 rounded-lg max-w-md mx-auto"
      open={modalIsOpen}
    >
      <h2 className="text-xl font-bold mb-4">Download Data</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDate}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDate}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        {dateIsEmpty && <p>Please select start and end date!</p>}
        {error && <p>No data in selected interval!</p>}
        <Button
          onClick={handleDownloadInterval}
          customStyles="w-full py-1 border-secondary"
          buttonType="secondary"
        >
          Download Interval Data
        </Button>
        <Button
          onClick={handleDownloadAll}
          customStyles="bg-primary"
          buttonType="primary"
        >
          Download All Data
        </Button>
        <button onClick={onCancel} className="hover:underline">
          Cancel
        </button>
      </div>
    </dialog>
  );
}
