/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import NodeListItem from "../../components/NodeListItem";
import { useEffect, useState } from "react";
import Table from "../../components/ui/Table.jsx";
import TableHead from "../../components/ui/TableHead.jsx";
import Button from "../../components/ui/Button.jsx";
import PaginationButtons from "../../components/PaginationButton.jsx";
import useApi from "../../hooks/useApi.js";
import { deleteNode, getNodeList } from "../../api/node-request.js";
import DeletionModal from "../../components/DeletionModal.jsx";
import { generateSerialNumber } from "../../utils/helper.js";

export default function NodeListPage() {
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeId, setNodeId] = useState(-1);
  const [nodeName, setNodeName] = useState("");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const keys = ["name", "location"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { url: getNodeUrl, config: getNodeConfig } = getNodeList(token);
  const { url: deleteUrl, config: deleteConfig } = deleteNode(token, nodeId);

  const {
    data: nodeList,
    loading: nodeLoading,
    error: nodeError,
    sendRequest: getListNode,
  } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const { sendRequest: deleteNodeRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchNodeList() {
      try {
        await getListNode(getNodeUrl, getNodeConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeList();
    setNodeId(-1);
    setNodeName("");
  }, []);

  let filteredItems = [];
  let indexOfLastItem = -1;
  let indexOfFirstItem = -1;
  let currentItems = [];
  let totalPages = -1;

  if (nodeList.code === 200 && nodeList.data && nodeList.data.length > 0) {
    filteredItems = nodeList.data.filter((item) =>
      keys.some((key) => item.Node[key].toLowerCase().includes(query))
    );

    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearchChange(event) {
    setQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  }

  function handleOpenModal(currentId, currentName) {
    setIsModalOpen(true);
    setNodeId(currentId);
    setNodeName(currentName);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setNodeId(-1);
    setNodeName("");
  }

  async function handleDeleteNode() {
    try {
      await deleteNodeRequest(deleteUrl, deleteConfig);
      setIsModalOpen(false);
      await getListNode(getNodeUrl, getNodeConfig);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (nodeLoading) {
    return <p>Loading...</p>;
  }

  if (nodeError) {
    return <p>Error: {nodeError}</p>;
  }

  return (
    <>
      <div className="bg-pageBackground min-h-screen max-h-full flex">
        {(nodeList.code === -1 || nodeList.code === 400) && (
          <p>Failed to load node list.</p>
        )}
        {nodeList.code === 200 && (
          <div
            id="node-list-container"
            className="w-full mx-8 flex flex-col space-y-4 my-4"
          >
            <div
              id="top-container"
              className="flex flex-row justify-between mt-8"
            >
              <h1 className="font-bold text-4xl text-darkFont">Nodes</h1>
              <Button
                onClick={() => navigate("create")}
                buttonType="primary"
                customStyles="bg-primary"
              >
                Create node
              </Button>
            </div>
            <input
              type="search"
              placeholder="search"
              className="p-2 w-1/4 rounded-md border border-darkFont"
              value={query}
              onChange={handleSearchChange}
            />
            {nodeList.data.length === 0 ? (
              <p>User not created node yet.</p>
            ) : (
              <div id="table-container">
                <Table>
                  <TableHead customStyle="text-2xl">
                    <tr>
                      <th className="p-4 max-w-8">No.</th>
                      <th className="p-4 max-w-48">Name</th>
                      <th className="p-4 max-w-24">Location</th>
                      <th className="p-4 max-w-20">Action</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {currentItems.map((node, index) => {
                      return (
                        <NodeListItem
                          key={node.Node.id_node}
                          node={{
                            ...node.Node,
                            serialNumber: generateSerialNumber(
                              index,
                              currentPage,
                              itemsPerPage
                            ),
                          }}
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
            title={`Are you sure want to delete node ${nodeName}`}
            onCancel={handleCloseModal}
            modalIsOpen={isModalOpen}
            onDelete={handleDeleteNode}
          />
        </div>
      )}
    </>
  );
}
