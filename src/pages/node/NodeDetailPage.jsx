import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/ButtonSecondary";
import { NODE_DETAIL, dataArray } from "../../data/nodeDetail.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const { sensor } = NODE_DETAIL;
const labels = dataArray.map((data) => data.date);
const values = dataArray.map((data) => data.value);

export default function NodeDetailPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div id="main-container" className="w-full my-8 mx-16 flex flex-col space-y-4">
        <ButtonSecondary
          customStyles="w-1/12 py-1"
          onClick={() => navigate(-1)}
        >
          {"<"} Back
        </ButtonSecondary>
        <h1 className="font-bold text-3xl text-darkFont text-center">
          {NODE_DETAIL.name}
        </h1>
        <div className="w-full rounded-lg bg-white shadow-md grid grid-cols-2 p-4">
          <p className="whitespace-normal break-all">Node id</p>
          <p className="whitespace-normal break-all">{NODE_DETAIL.id_node}</p>
          <p className="whitespace-normal break-all">Location</p>
          <p className="whitespace-normal break-all">{NODE_DETAIL.location}</p>
          <p className="whitespace-normal break-all"> Number of sensors</p>
          <p className="whitespace-normal break-all">{sensor.length}</p>
          <p className="whitespace-normal break-all">Hardware</p>
          <p className="whitespace-normal break-all">
            {NODE_DETAIL.hardware.type}
          </p>
        </div>
        <h2 className="font-bold text-2xl text-darkFont text-center">Sensor</h2>
        <ul>
          {sensor.map((data) => {
            return (
              <li
                key={data.id_sensor}
                className="w-full rounded-lg bg-white shadow-md p-2 my-2 text-center"
              >
                {data.name}
              </li>
            );
          })}
        </ul>
        <h2 className="font-bold text-2xl text-darkFont text-center">Feed</h2>
        <ul>
          {sensor.map((data) => {
            return (
              <li key={data.id_sensor}>
                <div className="bg-white flex flex-col items-center p-4 my-4 rounded-lg w-full">
                  <h3 className="text-xl font-bold text-darkFont">{data.name}</h3>
                  <Line
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: data.name,
                          data: values,
                          borderColor: "#064FF0",
                          backgroundColor: "white",
                        },
                      ],
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
