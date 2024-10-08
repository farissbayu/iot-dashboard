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
import { generateSerialNumber } from "../../utils/helper.js";

export default function HardwareListPage() {
  // get auth data
  const { isAdmin } = JSON.parse(localStorage.getItem("userData")) || false;
  const token = localStorage.getItem("token");

  // state for modal use
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hardwareId, setHardwareId] = useState(-1);

  const navigate = useNavigate();

  // state and keys for searching functionality
  const [query, setQuery] = useState("");
  const keys = ["name", "type", "description"];

  // state for hardware filter type
  const [typeFilter, setTypeFilter] = useState("");

  // state for pagination
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

  let filteredItems = [];
  let indexOfLastItem = -1;
  let indexOfFirstItem = -1;
  let currentItems = [];
  let totalPages = -1;

  if (
    hardwareList.code === 200 &&
    hardwareList.data &&
    hardwareList.data.length > 0
  ) {
    // filter items based on the query and type
    filteredItems = hardwareList.data.filter((item) =>
      keys.some(
        (key) =>
          item[key].toLowerCase().includes(query) &&
          (typeFilter === "" || item.type === typeFilter)
      )
    );

    // find last index of list
    indexOfLastItem = currentPage * itemsPerPage;
    // find first item index
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // slice item for current page
    currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    // find total page for filtered items
    totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearchChange(event) {
    setQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  }

  function handleTypeFilterChange(event) {
    setTypeFilter(event.target.value);
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
        {(hardwareList.code === -1 || hardwareList.code === 400) && (
          <p>Failed to load hardware list.</p>
        )}
        {hardwareList.code === 200 && (
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
            <select
              className="w-1/6 p-2 rounded-md border border-darkFont"
              value={typeFilter}
              onChange={handleTypeFilterChange}
            >
              <option value="">All</option>
              <option value="microcontroller unit">Microcontroller unit</option>
              <option value="single-board computer">
                Singleboard computer
              </option>
              <option value="sensor">Sensor</option>
            </select>
            {hardwareList.code === -1 || hardwareList.data.length === 0 ? (
              <p>No hardware found.</p>
            ) : (
              <div id="table-container">
                <Table>
                  <TableHead customStyle="text-2xl">
                    <tr>
                      <th className="p-4 max-w-4">No.</th>
                      <th className="p-4 max-w-16">Name</th>
                      <th className="p-4 max-w-16">Type</th>
                      <th className="p-4 max-w-48">Description</th>
                      <th className="p-4 max-w-20">Action</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {currentItems.map((hardware, index) => {
                      return (
                        <HardwareListItem
                          key={hardware.id_hardware}
                          hardware={{
                            ...hardware,
                            serialNumber: generateSerialNumber(
                              index,
                              currentPage,
                              itemsPerPage
                            ),
                          }}
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
        )}
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
