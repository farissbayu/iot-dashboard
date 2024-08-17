/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import { getHardwareList } from "../../api/hardware-request";
import { getNodeDetail } from "../../api/node-request";

export default function NodeEditForm({ onSubmit, submitLoading, nodeId }) {
  const token = localStorage.getItem("token") || "";

  const { url: nodeDetailUrl, config: nodeDetailConfig } = getNodeDetail(
    token,
    nodeId
  );
  const { url: hardwareListUrl, config: hardwareListConfig } =
    getHardwareList(token);

  const [nodeData, setNodeData] = useState({
    name: "",
    location: "",
    hardware: "",
    sensor: [],
  });

  const {
    data: nodeDetailData,
    // loading: nodeDetailLoading,
    // error: nodeDetailError,
    sendRequest: nodeDetailRequest,
  } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const {
    data: hardwareListData,
    loading: hardwareListLoading,
    sendRequest: hardwareListRequest,
  } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const [sensors, setSensors] = useState([]);
  const [selectedHardware, setSelectedHardware] = useState("");
  const [warning, setWarning] = useState("");

  const hardwareData = hardwareListData.data.filter(
    (hardware) => hardware.type !== "sensor"
  );
  const sensorData = hardwareListData.data.filter(
    (hardware) => hardware.type === "sensor"
  );

  useEffect(() => {
    handleAddField();
  }, []);

  useEffect(() => {
    async function fetchHardwareList() {
      try {
        await hardwareListRequest(hardwareListUrl, hardwareListConfig);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchNode() {
      try {
        await nodeDetailRequest(nodeDetailUrl, nodeDetailConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNode();
    fetchHardwareList();
  }, []);

  useEffect(() => {
    if (nodeDetailData.code === 200 && hardwareListData.data.length > 0) {
      const { Node: node } = nodeDetailData.data;
      const sensorList = node.id_hardware_sensor.map((sensor, index) => {
        const { id_hardware, name, type } = hardwareListData.data.find(
          (hardware) => hardware.id_hardware === sensor
        );
        const field = node.field_sensor[index];

        const xLabel = (node.x_label && node.x_label[index]) || "";
        const yLabel = (node.y_label && node.y_label[index]) || "";

        return {
          id_hardware,
          name,
          type,
          field,
          x_label: xLabel,
          y_label: yLabel,
        };
      });

      const { id_node, name, location } = node;
      const hardware = hardwareListData.data.find(
        (hardware) => hardware.id_hardware === node.id_hardware_node
      );

      setNodeData({
        id_node,
        name,
        location,
        hardware,
        sensor: sensorList,
      });

      setSelectedHardware(hardware.id_hardware);
      setSensors(
        sensorList.map((sensor) => ({
          hardware_sensor: sensor.id_hardware,
          field_sensor: sensor.field,
          x_label: sensor.x_label,
          y_label: sensor.y_label,
        }))
      );
    }
  }, [nodeDetailData, hardwareListData.data]);

  function handleHardwareChange(event) {
    setSelectedHardware(event.target.value);
  }

  function handleAddField(event) {
    if (event) {
      event.preventDefault();
    }
    if (sensors.length < 10) {
      let newSensorField = {
        hardware_sensor: "",
        field_sensor: "",
      };
      setSensors([...sensors, newSensorField]);
    } else {
      setWarning("Maksimal sensor yang bisa ditambahkan adalah 10");
    }
  }

  function handleRemoveField(index) {
    let data = [...sensors];
    data.splice(index, 1);
    setSensors(data);
  }

  function handleSensorChange(event, index, field) {
    const { value } = event.target;
    const updatedSensors = [...sensors];
    updatedSensors[index][field] = value;
    setSensors(updatedSensors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const hardwareSensors = sensors
      .map((sensor) => sensor.hardware_sensor)
      .filter(Boolean);
    const fieldSensors = sensors
      .map((sensor) => sensor.field_sensor)
      .filter(Boolean);
    const xLabels =
      sensors.map((sensor) => sensor.x_label).filter(Boolean) || [];
    const yLabels =
      sensors.map((sensor) => sensor.y_label).filter(Boolean) || [];

    const formData = {
      name: e.target.name.value,
      location: e.target.location.value,
      id_hardware_node: parseInt(selectedHardware),
      id_hardware_sensor: hardwareSensors.map(Number),
      field_sensor: fieldSensors,
      x_label: xLabels,
      y_label: yLabels,
    };

    onSubmit(formData);
  }

  return (
    <form
      method="post"
      id="create-node-form"
      className="w-full flex flex-col justify-around py-2 space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center text-2xl text-darkFont">Node data</h2>
      <Input
        id="name"
        name="name"
        placeholder="Node name"
        type="text"
        value={nodeData.name || ""}
        onChange={(e) =>
          setNodeData((prevState) => ({ ...prevState, name: e.target.value }))
        }
        required
      >
        Name
      </Input>
      <Input
        id="location"
        name="location"
        placeholder="Node location"
        type="text"
        value={nodeData.location || ""}
        onChange={(e) =>
          setNodeData((prevState) => ({
            ...prevState,
            location: e.target.value,
          }))
        }
        required
      >
        Location
      </Input>
      <Dropdown
        id="hardware"
        name="hardware"
        label="Hardware"
        onChange={handleHardwareChange}
        options={hardwareData}
        loading={hardwareListLoading}
        defaultOptionText="Select Hardware"
        optionKey="id_hardware"
        optionValue="id_hardware"
        value={selectedHardware || ""}
        isRequired={true}
      />
      <h2 className="text-center text-2xl text-darkFont">Node sensor</h2>
      {sensors.map((sensor, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4 items-end justify-between"
          >
            <div className="flex flex-col flex-1">
              {index === 0 && (
                <label className="text-sm font-medium mb-1">Sensor Type</label>
              )}
              <Dropdown
                id={`hardware-sensor-${index}`}
                name={`hardware_sensor_${index}`}
                value={sensor.hardware_sensor}
                onChange={(e) =>
                  handleSensorChange(e, index, "hardware_sensor")
                }
                options={sensorData}
                loading={hardwareListLoading}
                defaultOptionText="Select sensor"
                optionKey="id_hardware"
                optionValue="id_hardware"
                className="flex-1"
                isRequired={true}
              />
            </div>
            <div className="flex flex-col flex-1">
              {index === 0 && (
                <label className="text-sm font-medium mb-1">Field sensor</label>
              )}
              <Input
                id={`field-sensor-${index}`}
                name={`field_sensor_${index}`}
                placeholder="Field sensor"
                type="text"
                value={sensor.field_sensor || ""}
                onChange={(e) => handleSensorChange(e, index, "field_sensor")}
                required
              />
            </div>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
              <div className="flex flex-col">
                {index === 0 && (
                  <label className="text-sm font-medium mb-1">X label</label>
                )}
                <Input
                  id={`x-label-${index}`}
                  name={`x_label_${index}`}
                  placeholder="X label"
                  type="text"
                  value={sensor.x_label || ""}
                  onChange={(e) => handleSensorChange(e, index, "x_label")}
                  required
                  customStyles="w-20"
                />
              </div>
              <div className="flex flex-col">
                {index === 0 && (
                  <label className="text-sm font-medium mb-1">Y label</label>
                )}
                <Input
                  id={`y-label-${index}`}
                  name={`y_label_${index}`}
                  placeholder="Y label"
                  type="text"
                  value={sensor.y_label || ""}
                  onChange={(e) => handleSensorChange(e, index, "y_label")}
                  required
                  customStyles="w-20"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end h-full pb-1">
              {index !== sensors.length - 1 ? (
                <button
                  type="button"
                  className="w-[38px] h-[38px] font-bold text-white rounded-lg bg-buttonRed"
                  onClick={() => handleRemoveField(index)}
                >
                  -
                </button>
              ) : (
                <button
                  type="button"
                  className="w-[38px] h-[38px] font-bold text-white rounded-lg bg-buttonGreen"
                  onClick={(event) => handleAddField(event)}
                >
                  +
                </button>
              )}
            </div>
          </div>
        );
      })}
      {sensors.length === 10 && (
        <p className="text-red-500 text-center text-sm">{warning}</p>
      )}
      <Button type="submit" buttonType="primary" customStyles="bg-primary">
        {submitLoading ? "Loading..." : "Edit node"}
      </Button>
    </form>
  );
}
