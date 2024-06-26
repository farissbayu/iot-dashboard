/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HardwareListItem from "../../components/HardwareListItem";
import Table from "../../components/ui/Table.jsx";
import TableHead from "../../components/ui/TableHead.jsx";
import Button from "../../components/ui/Button.jsx";
import useApi from "../../hooks/useApi.js";
import { deleteHardware, getHardwareList } from "../../api/hardware-request.js";
import PaginationButtons from "../../components/PaginationButton.jsx";
import DeletionModal from "../../components/DeletionModal.jsx";

export default function HardwareListPage() {
  const { isAdmin } = JSON.parse(localStorage.getItem("userData")) || false;
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hardwareId, setHardwareId] = useState(-1);

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const keys = ["name", "type", "description"];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const { url: getHardwareUrl, config: getHardwareConfig } =
    getHardwareList(token);
  const { url: deleteUrl, config: deleteConfig } = deleteHardware(
    token,
    hardwareId
  );

  const {
    data: hardwareList,
    loading: hardwareLoading,
    error: hardwareError,
    sendRequest: getListHardware,
  } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const { sendRequest: deleteHardwareRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchHardwareList() {
      try {
        await getListHardware(getHardwareUrl, getHardwareConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHardwareList();
  }, []);

  const filteredItems = hardwareList.data.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(query))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearchChange(event) {
    setQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  }

  function handleOpenModal(currentId) {
    setIsModalOpen(true);
    setHardwareId(currentId);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setHardwareId(-1);
  }

  async function handleDeleteHardware() {
    try {
      await deleteHardwareRequest(deleteUrl, deleteConfig);
      setIsModalOpen(false);
      await getListHardware(getHardwareUrl, getHardwareConfig);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (hardwareLoading) {
    return <p>Loading...</p>;
  }

  if (hardwareError) {
    return <p>Error: {hardwareError}</p>;
  }

  return (
    <>
      <div className="bg-pageBackground min-h-screen max-h-full flex">
        <div
          id="hardware-list-container"
          className="w-full mx-8 flex flex-col space-y-4 my-4"
        >
          <div
            id="top-container"
            className="flex flex-row justify-between mt-8"
          >
            <h1 className="font-bold text-4xl text-darkFont">Hardwares</h1>
            {isAdmin && (
              <Button
                onClick={() => navigate("create")}
                buttonType="primary"
                customStyles="bg-primary"
              >
                Create hardware
              </Button>
            )}
          </div>
          <input
            type="search"
            placeholder="search"
            className="p-2 w-1/4 rounded-md border border-darkFont"
            value={query}
            onChange={handleSearchChange}
          />
          {(hardwareList.code === -1 || hardwareList.data.size === 0) && (
            <p>No hardware found.</p>
          )}
          {hardwareList.data.size !== 0 && hardwareList.code !== -1 && (
            <div id="table-container">
              <Table>
                <TableHead customStyle="text-2xl">
                  <tr>
                    <th className="p-4 max-w-4">Id</th>
                    <th className="p-4 max-w-16">Name</th>
                    <th className="p-4 max-w-16">Type</th>
                    <th className="p-4 max-w-48">Description</th>
                    <th className="p-4 max-w-20">Action</th>
                  </tr>
                </TableHead>
                <tbody>
                  {currentItems.map((hardware) => {
                    return (
                      <HardwareListItem
                        key={hardware.id_hardware}
                        hardware={hardware}
                        isAdmin={isAdmin}
                        onDeleteClick={handleOpenModal}
                      />
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
          <DeletionModal
            title={`Are you sure want to delete hardware ${hardwareId}`}
            onCancel={handleCloseModal}
            modalIsOpen={isModalOpen}
            onDelete={handleDeleteHardware}
          />
        </div>
      )}
    </>
  );
}
