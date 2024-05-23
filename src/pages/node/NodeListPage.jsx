/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import NodeListItem from "../../components/NodeListItem";
import { useEffect, useState } from "react";
import Table from "../../components/Table.jsx";
import TableHead from "../../components/TableHead.jsx";
import Button from "../../components/ui/Button.jsx";
import PaginationButtons from "../../components/PaginationButton.jsx";
import useApi from "../../hooks/useApi.js";
import { deleteNode, getNodeList } from "../../api/node-request.js";
import DeletionModal from "../../components/DeletionModal.jsx";

export default function NodeListPage() {
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeId, setNodeId] = useState(-1);

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
    setNodeId(null);
  }, []);

  const filteredItems = nodeList.data.filter((item) =>
    keys.some((key) => item.Node[key].toLowerCase().includes(query))
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

  function handleOpenModal(nodeId) {
    setIsModalOpen(true);
    setNodeId(nodeId);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setNodeId(-1);
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
          {(nodeList.code === -1 || nodeList.data.size === 0) && (
            <p>No user node found.</p>
          )}
          {nodeList.data.size !== 0 && nodeList.code !== -1 && (
            <div id="table-container">
              <Table>
                <TableHead customStyle="text-2xl">
                  <tr>
                    <th className="p-4 max-w-8">Id</th>
                    <th className="p-4 max-w-48">Name</th>
                    <th className="p-4 max-w-24">Location</th>
                    <th className="p-4 max-w-20">Action</th>
                  </tr>
                </TableHead>
                <tbody>
                  {currentItems.map((node) => {
                    return (
                      <NodeListItem
                        key={node.Node.id_node}
                        node={node.Node}
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
            title={`Are you sure want to delete node ${nodeId}`}
            onCancel={handleCloseModal}
            modalIsOpen={isModalOpen}
            onDelete={handleDeleteNode}
          />
        </div>
      )}
    </>
  );
}
