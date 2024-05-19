/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import NodeListItem from "../../components/NodeListItem";
import { useEffect, useState } from "react";
import Table from "../../components/Table.jsx";
import TableHead from "../../components/TableHead.jsx";
import Button from "../../components/ui/Button.jsx";
import PaginationButtons from "../../components/PaginationButton.jsx";
import useApi from "../../hooks/useApi.js";
import { getNodeList } from "../../api/node-request.js";

const token = localStorage.getItem("token");
const { url, config } = getNodeList(token);

export default function NodeListPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const keys = ["name", "location"];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  useEffect(() => {
    async function fetchNodeList() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeList();
  }, []);

  const filteredItems = data.data
    .filter((item) =>
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div
        id="node-list-container"
        className="w-full mx-8 flex flex-col space-y-4 my-4"
      >
        <div id="top-container" className="flex flex-row justify-between mt-8">
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
        {(data.code === -1 || data.data.size === 0) && (
          <p>No hardware found.</p>
        )}
        {data.data.size !== 0 && data.code !== -1 && (
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
                    <NodeListItem key={node.Node.id_node} node={node.Node} />
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
  );
}
