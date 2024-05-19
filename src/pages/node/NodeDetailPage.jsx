import { useNavigate, useParams } from "react-router-dom";
import 'chart.js/auto';
import Button from "../../components/ui/Button.jsx";
import { getNodeDetail } from "../../api/node-request.js";
import useApi from "../../hooks/useApi.js";
import { useEffect } from "react";
import Chart from "../../components/Chart.jsx";

const token = localStorage.getItem("token") || "";

export default function NodeDetailPage() {
  const { id: nodeId } = useParams();
  const navigate = useNavigate();
  const { url, config } = getNodeDetail(token, nodeId);
  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchNodeDetail() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeDetail();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: ${error}</p>;
  }

  const node = {
    id_node: data.data.id_node,
    name: data.data.name,
    location: data.data.location
  } || {};
  const hardware = data.data.hardware || {};
  const sensor = data.data.field_sensor || [];

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div id="main-container" className="w-full m-8 flex flex-col space-y-4">
        <Button
          customStyles="w-1/12 py-1 border-secondary"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <h1 className="font-bold text-3xl text-darkFont text-center">
          {node.name}
        </h1>
        <div className="w-full rounded-lg bg-white shadow-md grid grid-cols-2 p-4">
          <p className="whitespace-normal break-all">Node id</p>
          <p className="whitespace-normal break-all">{node.id_node}</p>
          <p className="whitespace-normal break-all">Location</p>
          <p className="whitespace-normal break-all">{node.location}</p>
          <p className="whitespace-normal break-all"> Number of sensors</p>
          <p className="whitespace-normal break-all">{sensor.length}</p>
          <p className="whitespace-normal break-all">Hardware</p>
          <p className="whitespace-normal break-all">
            {hardware.name}
          </p>
          <p className="whitespace-normal break-all">Hardware type</p>
          <p className="whitespace-normal break-all">
            {hardware.type}
          </p>
        </div>
        <h2 className="font-bold text-2xl text-darkFont text-center">Feed</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sensor.map((data) => (
            <Chart key={data.id_hardware} sensor={data}/>
          ))}
        </div>
      </div>
    </div>
  );
}
