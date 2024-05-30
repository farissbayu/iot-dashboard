import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

export default function Embed() {
  const location = useLocation();
  const sensor = location.state;
  console.log(location);
  return (
    <div className="bg-white p-4 my-4 rounded-lg flex flex-col items-center">
      <h3 className="text-xl font-bold text-darkFont">{sensor.field}</h3>
      <p className="text-darkFont">{sensor.sensor_name}</p>

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
          }}
        />
      </div>
    </div>
  );
}
