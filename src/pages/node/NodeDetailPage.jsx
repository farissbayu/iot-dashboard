/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import "chart.js/auto";
import Button from "../../components/ui/Button.jsx";
import { getNodeDetail } from "../../api/node-request.js";
import useApi from "../../hooks/useApi.js";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart.jsx";
import { getHardwareList } from "../../api/hardware-request.js";
import { formatDate } from "../../utils/helper.js";

export default function NodeDetailPage() {
  const token = localStorage.getItem("token") || "";
  const { id: nodeId } = useParams();
  const navigate = useNavigate();

  const [nodeDetail, setNodeDetail] = useState({});

  const { url: nodeDetailUrl, config: nodeDetailConfig } = getNodeDetail(
    token,
    nodeId
  );
  const { url: hardwareListUrl, config: hardwareListConfig } =
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
        await sendRequest(nodeDetailUrl, nodeDetailConfig);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchHardwareList() {
      try {
        await fetchListHardware(hardwareListUrl, hardwareListConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeDetail();
    fetchHardwareList();
  }, []);

  useEffect(() => {
    if (data.code === 200) {
      const { Node: node, Feed: feed } = data.data;

      const times = feed ? feed.map((f) => formatDate(f.time)) : [];

      const sensorList = node.id_hardware_sensor.map((sensor, index) => {
        let sensorName = "";
        let value = [];

        if (hardwareListData.code !== -1) {
          sensorName = hardwareListData.data.find(
            (hardware) => hardware.id_hardware === sensor
          ).name;
        }

        if (feed) {
          value = feed.map((item) => item.value[index]);
        }
        const field = node.field_sensor[index];

        return {
          id_feed: index,
          field,
          sensor_name: sensorName,
          feed: {
            time: times,
            value,
          },
        };
      });

      const { id_node, name, location } = node;
      const hardware = hardwareListData.data.find(
        (hardware) => hardware.id_hardware === node.id_hardware_node
      );

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
    return <p>Error: {error}</p>;
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
            <Chart key={data.id_feed} sensor={data} nodeId={node.id_node} />
          ))}
        </div>
      </div>
    </div>
  );
}
