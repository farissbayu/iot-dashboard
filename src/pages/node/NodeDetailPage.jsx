import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "chart.js/auto";
import Button from "../../components/ui/Button.jsx";
import { downloadNodeData, getNodeDetail } from "../../api/node-request.js";
import useApi from "../../hooks/useApi.js";
import Chart from "../../components/Chart.jsx";
import { getHardwareList } from "../../api/hardware-request.js";
import { formatDate, jsonToCsv } from "../../utils/helper.js";
import DownloadDataModal from "../../components/DownloadDataModal.jsx";
import InfoSendDataModal from "../../components/InfoSendDataModal.jsx";

export default function NodeDetailPage() {
  const token = localStorage.getItem("token") || "";
  const { id: nodeId } = useParams();
  const navigate = useNavigate();

  const [nodeDetail, setNodeDetail] = useState({});
  const [downloadDataModalOpen, setDownloadDataModalOpen] = useState(false);
  const [infoSendDataModalOpen, setInfoSendDataModalOpen] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [isRefetching, setIsRefetching] = useState(false);

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

  const { data: feedData, sendRequest: sendDownloadFeed } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const fetchDataRef = useRef(null);

  fetchDataRef.current = async () => {
    setIsRefetching(true);
    try {
      await Promise.all([
        sendRequest(nodeDetailUrl, nodeDetailConfig),
        fetchListHardware(hardwareListUrl, hardwareListConfig),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefetching(false);
    }
  };

  const downloadDataRef = useRef(null);

  downloadDataRef.current = async (startDate, endDate) => {
    const { url: downloadDataUrl, config: downloadDataConfig } =
      downloadNodeData(token, nodeId, startDate, endDate);
    try {
      await sendDownloadFeed(downloadDataUrl, downloadDataConfig);
    } catch (error) {
      console.log(error);
      setDownloadError("Failed to download data. Please try again.");
    }
  };

  useEffect(() => {
    fetchDataRef.current();

    const intervalId = setInterval(() => {
      fetchDataRef.current();
    }, 30000); // Refetch every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data.code === 200 && hardwareListData.code === 200) {
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

        let xLabel = "X label";
        if (node.x_label !== null) {
          xLabel = node.x_label[index] || "";
        }

        let yLabel = "Y label";
        if (node.y_label !== null) {
          yLabel = node.y_label[index] || "";
        }

        return {
          id_feed: index,
          field,
          sensor_name: sensorName,
          feed: {
            time: times,
            value,
          },
          x_label: xLabel,
          y_label: yLabel,
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
  }, [data, hardwareListData]);

  useEffect(() => {
    if (feedData.code === 200) {
      const jsonData = feedData.data;
      const csvData = jsonToCsv(jsonData);
      let blob = new Blob([csvData], { type: "text/csv" });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    if (feedData.code === 400) {
      setDownloadError(feedData.message);
    }
  }, [feedData]);

  console.log(data);

  if (loading && !isRefetching) {
    return <p>Loading...</p>;
  }

  if (data.code === -1 && !isRefetching) {
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
    <>
      <div className="bg-pageBackground min-h-screen max-h-full flex">
        <div id="main-container" className="w-full m-8 flex flex-col space-y-4">
          <Button
            customStyles="w-1/12 py-1 border-secondary"
            onClick={() => navigate(-1)}
            buttonType="secondary"
          >
            {"<"} Back
          </Button>
          {(data.code === -1 || data.code === 400) && !isRefetching && (
            <p>Failed to load node detail.</p>
          )}
          {data.code === 200 && (
            <>
              <div className="w-full flex flex-row justify-between my-2">
                <h1 className="font-bold text-3xl text-darkFont text-center">
                  {node.name}
                </h1>
                <div className="flex flex-row gap-x-2 items-center">
                  <Button
                    buttonType="primary"
                    customStyles="bg-primary"
                    onClick={() => setDownloadDataModalOpen(true)}
                  >
                    Download data
                  </Button>
                  <button
                    className="border border-black rounded-full w-8 h-8 flex items-center justify-center text-md font-bold hover:bg-gray-200"
                    onClick={() => setInfoSendDataModalOpen(true)}
                  >
                    !
                  </button>
                </div>
              </div>

              <div className="w-full rounded-lg bg-white shadow-md grid grid-cols-2 p-4">
                <p className="whitespace-normal break-all">Node id</p>
                <p className="whitespace-normal break-all">{node.id_node}</p>
                <p className="whitespace-normal break-all">Location</p>
                <p className="whitespace-normal break-all">{node.location}</p>
                <p className="whitespace-normal break-all">Number of sensors</p>
                <p className="whitespace-normal break-all">{sensor.length}</p>
                <p className="whitespace-normal break-all">Hardware</p>
                <p className="whitespace-normal break-all">{hardware.name}</p>
                <p className="whitespace-normal break-all">Hardware type</p>
                <p className="whitespace-normal break-all">{hardware.type}</p>
              </div>
              <h2 className="font-bold text-2xl text-darkFont text-center">
                Feed
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sensor.map((data) => (
                  <Chart
                    key={data.id_feed}
                    sensor={data}
                    nodeId={node.id_node}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {downloadDataModalOpen && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
          <DownloadDataModal
            modalIsOpen={downloadDataModalOpen}
            onCancel={() => setDownloadDataModalOpen(false)}
            downloadData={downloadDataRef.current}
            error={downloadError}
            setError={setDownloadError}
          />
        </div>
      )}
      {infoSendDataModalOpen && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
          <InfoSendDataModal
            modalIsOpen={infoSendDataModalOpen}
            nodeId={node.id_node}
            token={token}
            onCancel={() => setInfoSendDataModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}
