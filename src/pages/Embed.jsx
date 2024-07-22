import { Line } from "react-chartjs-2";
import { useLocation, useParams } from "react-router-dom";
import { getNodeDetail } from "../api/node-request";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/helper";

// Page for embeded chart
export default function Embed() {
  const token = localStorage.getItem("token") || "";
  const { nodeId, sensorIndex } = useParams(); // get path from url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // get query param from url
  const sensorName = queryParams.get("sensor-name");

  const [sensor, setSensor] = useState({});

  // get node detail url and config
  const { url: nodeDetailUrl, config: nodeDetailConfig } = getNodeDetail(
    token,
    nodeId
  );

  // get data from api
  const { data, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchNodeDetail() {
      try {
        await sendRequest(nodeDetailUrl, nodeDetailConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNodeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.code === 200) {
      const { Node: node, Feed: feed } = data.data;

      const field = node.field_sensor[sensorIndex];
      const times = feed ? feed.map((f) => formatDate(f.time)) : [];
      const value = feed ? feed.map((item) => item.value[sensorIndex]) : [];

      // map data into sensor state
      setSensor({
        id_node: node.id_node,
        name: sensorName,
        field,
        times,
        value,
      });
    }
  }, [data.code, data.data, sensorName, sensorIndex]);

  return (
    <div className="bg-white p-4 my-4 rounded-lg flex flex-col items-center">
      <h3 className="text-xl font-bold text-darkFont">{sensor.field}</h3>
      <p className="text-darkFont">{sensor.name}</p>

      <div className="w-full h-96 overflow-hidden">
        <Line
          data={{
            labels: sensor.times,
            datasets: [
              {
                label: "",
                data: sensor.value,
                borderColor: "#064FF0",
                backgroundColor: "white",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
