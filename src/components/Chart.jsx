/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function Chart({ sensor }) {
  const [displayedData, setDisplayedData] = useState([]);
  const [displayedLabels, setDisplayedLabels] = useState([]);

  useEffect(() => {
    const generateRandomData = () => {
      const baseValue = Math.floor(Math.random() * (51 - 20 + 1)) + 20;
      const difference = Math.floor(Math.random() * (3 - -1 + 1)) - 1;
      const newData = baseValue + difference;

      const currentTime = new Date().toLocaleTimeString();

      setDisplayedData((prevData) => [...prevData.slice(-9), newData]);
      setDisplayedLabels((prevLabels) => [
        ...prevLabels.slice(-9),
        currentTime,
      ]);
    };

    const interval = setInterval(generateRandomData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <li className="bg-white p-4 my-4 rounded-lg flex flex-col items-center">
      <h3 className="text-xl font-bold text-darkFont">{sensor.field}</h3>
      <p className="text-darkFont">{sensor.name}</p>
      <div className="w-full h-96 overflow-hidden">
        <Line
          data={{
            labels: displayedLabels,
            datasets: [
              {
                label: "",
                data: displayedData,
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
    </li>
  );
}
