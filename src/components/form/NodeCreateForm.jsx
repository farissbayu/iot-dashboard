/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getHardwareList } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";

export default function NodeCreateForm({ onSubmit, submitLoading }) {
  const token = localStorage.getItem("token") || "";

  const { url, config } = getHardwareList(token);

  const {
    data: hardwares,
    loading: hardwareLoading,
    sendRequest: requestHardware,
  } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const [sensors, setSensors] = useState([]);
  const [selectedHardware, setSelectedHardware] = useState("");
  const [warning, setWarning] = useState("");

  const hardwareData = hardwares.data.filter(
    (hardware) => hardware.type !== "sensor"
  );
  const sensorData = hardwares.data.filter(
    (hardware) => hardware.type === "sensor"
  );

  useEffect(() => {
    handleAddField();
  }, []);

  useEffect(() => {
    async function fetchHardwareList() {
      try {
        await requestHardware(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHardwareList();
  }, []);

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

    const formData = {
      name: e.target.name.value,
      location: e.target.location.value,
      id_hardware_node: parseInt(selectedHardware),
      id_hardware_sensor: hardwareSensors.map(Number),
      field_sensor: fieldSensors,
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
      <Input id="name" name="name" placeholder="Node name" type="text" required>
        Name
      </Input>
      <Input
        id="location"
        name="location"
        placeholder="Node location"
        type="text"
        required
      >
        Location
      </Input>
      <Dropdown
        id="hardware"
        name="hardware"
        label="Hardware"
        value={selectedHardware}
        onChange={handleHardwareChange}
        options={hardwareData}
        loading={hardwareLoading}
        defaultOptionText="Select Hardware"
        optionKey="id_hardware"
        optionValue="id_hardware"
        isRequired={true}
      />
      <h2 className="text-center text-2xl text-darkFont">Node sensor</h2>
      {sensors.map((sensor, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center justify-between relative"
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
                loading={hardwareLoading}
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
                value={sensor.field_sensor}
                onChange={(e) => handleSensorChange(e, index, "field_sensor")}
                required
              />
            </div>

            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
              <div className="flex flex-col">
                {index === 0 && (
                  <label className="text-sm font-medium mb-1">X label</label>
                )}
                <Input placeholder="X label" type="text" customStyles="w-20" />
              </div>
              <div className="flex flex-col">
                {index === 0 && (
                  <label className="text-sm font-medium mb-1">Y label</label>
                )}
                <Input placeholder="Y label" type="text" customStyles="w-20" />
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
        {submitLoading ? "Loading..." : "Create"}
      </Button>
    </form>
  );
}
