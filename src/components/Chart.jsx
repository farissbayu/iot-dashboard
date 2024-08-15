/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/ui/IconButton";

export default function Chart({ sensor, nodeId }) {
  const navigate = useNavigate();

  function handleEmbedPage() {
    navigate(
      `/node/${nodeId}/${sensor.id_feed}?sensor-name=${sensor.sensor_name}`
    );
  }

  return (
    <li className="bg-white p-4 my-4 rounded-lg flex flex-col items-center">
      <h3 className="text-xl font-bold text-darkFont">{sensor.field}</h3>
      <div className="flex flex-row w-full justify-between my-2">
        <p className="text-darkFont">{sensor.sensor_name}</p>
        <IconButton buttonType="embed" onClick={handleEmbedPage} />
      </div>

      <div className="w-full h-96 overflow-hidden">
        <Line
          data={{
            labels: sensor.feed.time,
            datasets: [
              {
                label: "",
                data: sensor.feed.value,
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
            scales: {
              x: {
                title: {
                  display: true,
                  text: sensor.x_label,
                },
              },
              y: {
                title: {
                  display: true,
                  text: sensor.y_label,
                },
              },
            },
          }}
        />
      </div>
    </li>
  );
}
