import { useNavigate } from "react-router-dom";
import HardwareDetailItem from "../../components/HardwareDetailItem";
import Button from "../../components/ui/Button";

const hardwareData = {
  id_hardware: 2,
  name: "Hartmann, Ziemann and Weber",
  type: "single-board computer",
  description: "Nullam molestie nibh in lectus. Pellentesque at nulla.",
  nodes: [
    {
      id_node: 10,
      name: "Lockman-Olson",
      location: "Miller",
      id_hardware: 2,
      id_user: 2,
    },
    {
      id_node: 13,
      name: "Simonis LLC",
      location: "Farmco",
      id_hardware: 2,
      id_user: 1,
    },
    {
      id_node: 20,
      name: "Yost LLC",
      location: "Dixon",
      id_hardware: 2,
      id_user: 1,
    },
  ],
};

const hardware = {
  id_hardware: hardwareData.id_hardware,
  name: hardwareData.name,
  type: hardwareData.type,
  description: hardwareData.description,
};

const nodes = hardwareData.nodes;

export default function HardwareDetailPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-pageBackground h-screen flex">
      <div
        id="main-container"
        className="w-full m-8 flex flex-col space-y-4"
      >
        <Button customStyles="w-1/12 py-1" onClick={() => navigate(-1)} buttonType="secondary">
          {"<"} Back
        </Button>
        <HardwareDetailItem hardware={hardware} />
        <div id="used-in-container" className="flex flex-col items-center">
          {nodes.length == 0 ? (
            <p>Hardware belum digunakan.</p>
          ) : (
            <>
              <h1 className="font-bold text-2xl text-darkFont">
                Used on the following nodes
              </h1>
              <table className="w-full border-separate table border-spacing-y-2">
                <thead className="text-left text-darkFont text-xl">
                  <tr>
                    <th className="p-4 max-w-8">Node id</th>
                    <th className="p-4 max-w-32">Name</th>
                    <th className="p-4 max-w-24">Location</th>
                    <th className="p-4 max-w-8">User id</th>
                  </tr>
                </thead>
                <tbody>
                  {nodes.map((node) => {
                    return (
                      <tr key={node.id} className="shadow-lg bg-white hover:bg-gray-50">
                        <td className="p-4 max-w-8">{node.id_node}</td>
                        <td className="p-4 max-w-32 word-wrap break-words">
                          {node.name}
                        </td>
                        <td className="p-4 max-w-24 word-wrap break-words">
                          {node.location}
                        </td>
                        <td className="p-4 max-w-8 word-wrap break-words">
                          {node.id_user}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
