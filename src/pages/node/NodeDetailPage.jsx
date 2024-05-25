/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import "chart.js/auto";
import Button from "../../components/ui/Button.jsx";
import { getNodeDetail } from "../../api/node-request.js";
import useApi from "../../hooks/useApi.js";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart.jsx";
import { getHardwareList } from "../../api/hardware-request.js";

const token = localStorage.getItem("token") || "";

export default function NodeDetailPage() {
  const { id: nodeId } = useParams();
  const navigate = useNavigate();

  const [nodeDetail, setNodeDetail] = useState({});

  const { url, config } = getNodeDetail(token, nodeId);
  const { url: getHardwareUrl, config: getHardwareConfig } =
    getHardwareList(token);

  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const { data: hardwareListData, sendRequest: fetchListHardware } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  useEffect(() => {
    async function fetchNodeDetail() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchHardwareList() {
      try {
        await fetchListHardware(getHardwareUrl, getHardwareConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeDetail();
    fetchHardwareList();
  }, []);

  useEffect(() => {
    if (data.code === 200) {
      const nodeSensor = data.data.id_hardware_sensor;
      const sensorList = hardwareListData.data.filter((hardware) =>
        nodeSensor.includes(hardware.id_hardware)
      );

      sensorList.forEach((nodeSensor, index) => {
        nodeSensor.field = data.data.field_sensor[index];
      });

      const { id_node, name, location, hardware } = data.data;

      setNodeDetail({
        id_node,
        name,
        location,
        hardware,
        sensor: sensorList,
      });
    }
  }, [data, hardwareListData.data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: ${error}</p>;
  }

  const node =
    {
      id_node: nodeDetail.id_node,
      name: nodeDetail.name,
      location: nodeDetail.location,
    } || {};
  const hardware = nodeDetail.hardware || {};
  const sensor = nodeDetail.sensor || [];

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
          <p className="whitespace-normal break-all">{hardware.name}</p>
          <p className="whitespace-normal break-all">Hardware type</p>
          <p className="whitespace-normal break-all">{hardware.type}</p>
        </div>
        <h2 className="font-bold text-2xl text-darkFont text-center">Feed</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sensor.map((data) => (
            <Chart key={data.id_hardware} sensor={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
