import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import HardwareListItem from "../../components/HardwareListItem";

const hardwares = [
  {
    id: 1,
    name: "Arduino",
    type: "Microcontroller unit",
    description: "Perangkat purwarupa (prototyping) yang bersifat open source",
  },
  {
    id: 2,
    name: "Soil mosture sensor",
    type: "Sensor",
    description: "Sensor untuk mendeteksi kelembaban tanah",
  },
];

export default function HardwareListPage() {
  const navigate = useNavigate();
    const isAdmin = true;
  return (
    <div className="bg-pageBackground h-screen flex">
      <div
        id="hardware-list-container"
        className="w-full mx-8 flex flex-col space-y-4 bg-primary"
      >
        <div id="top-container" className="flex flex-row justify-between mt-8">
          <h1 className="font-bold text-4xl text-darkFont">Hardwares</h1>
          {isAdmin && <ButtonPrimary onClick={() => navigate("create")}>Create hardware</ButtonPrimary>}
        </div>
        <div id="table-container">
          <table className="w-full border-separate table border-spacing-y-2">
            <thead className="text-left text-darkFont text-2xl">
              <tr>
                <th className="p-4 max-w-8">Id</th>
                <th className="p-4 max-w-16">Name</th>
                <th className="p-4 max-w-16">Type</th>
                <th className="p-4 max-w-48">Description</th>
                <th className="p-4 max-w-20">Action</th>
              </tr>
            </thead>
            <tbody>{hardwares.map((hardware) => {
                return (<HardwareListItem key={hardware.id} hardware={hardware} isAdmin={isAdmin}/>);
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
