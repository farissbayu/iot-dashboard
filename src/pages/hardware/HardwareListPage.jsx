import { useNavigate } from "react-router-dom";
import HardwareListItem from "../../components/HardwareListItem";
import { hardwares } from "../../data/hardwares.js";
import Table from "../../components/Table.jsx";
import TableHead from "../../components/TableHead.jsx";
import Button from "../../components/ui/Button.jsx";

export default function HardwareListPage() {
  const navigate = useNavigate();
  const isAdmin = true;
  return (
    <div className="bg-pageBackground h-screen flex">
      <div
        id="hardware-list-container"
        className="w-full mx-8 flex flex-col space-y-4"
      >
        <div id="top-container" className="flex flex-row justify-between mt-8">
          <h1 className="font-bold text-4xl text-darkFont">Hardwares</h1>
          {isAdmin && (
            <Button onClick={() => navigate("create")} buttonType="primary">
              Create hardware
            </Button>
          )}
        </div>
        <div id="table-container">
          <Table>
            <TableHead>
              <tr>
                <th className="p-4 max-w-8">Id</th>
                <th className="p-4 max-w-16">Name</th>
                <th className="p-4 max-w-16">Type</th>
                <th className="p-4 max-w-48">Description</th>
                <th className="p-4 max-w-20">Action</th>
              </tr>
            </TableHead>
            <tbody>
              {hardwares.map((hardware) => {
                return (
                  <HardwareListItem
                    key={hardware.id}
                    hardware={hardware}
                    isAdmin={isAdmin}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
