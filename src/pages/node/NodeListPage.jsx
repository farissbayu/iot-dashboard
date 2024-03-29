import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import { nodes } from "../../data/nodes.js";
import NodeListItem from "../../components/NodeListItem";
import { useState } from "react";
import Table from "../../components/Table.jsx";
import TableHead from "../../components/TableHead.jsx";

export default function NodeListPage() {
  const [query, setQuery] = useState("");
  const keys = ["name", "location"];
  const navigate = useNavigate();

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div
        id="node-list-container"
        className="w-full mx-8 flex flex-col space-y-4"
      >
        <div id="top-container" className="flex flex-row justify-between mt-8">
          <h1 className="font-bold text-4xl text-darkFont">Nodes</h1>
          <ButtonPrimary onClick={() => navigate("create")}>
            Create node
          </ButtonPrimary>
        </div>
        <input
          type="search"
          placeholder="search"
          className="p-2 w-1/4 rounded-md border border-darkFont"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div id="table-container">
          <Table>
            <TableHead>
              <tr>
                <th className="p-4 max-w-8">Id</th>
                <th className="p-4 max-w-48">Name</th>
                <th className="p-4 max-w-24">Location</th>
                <th className="p-4 max-w-20">Action</th>
              </tr>
            </TableHead>
            <tbody>
              {nodes
                .filter((item) =>
                  keys.some((key) => item[key].toLowerCase().includes(query))
                )
                .map((node) => {
                  return <NodeListItem key={node.id_node} node={node} />;
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
