/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getHardwareList } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";

export default function NodeEditForm({ onSubmit, submitLoading }) {
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
    let newSensorField = {
      hardware_sensor: "",
      field_sensor: "",
    };
    setSensors([...sensors, newSensorField]);
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
      <Input id="name" name="name" placeholder="Node name" type="text">
        Name
      </Input>
      <Input
        id="location"
        name="location"
        placeholder="Node location"
        type="text"
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
      />
      <h2 className="text-center text-2xl text-darkFont">Node sensor</h2>
      {sensors.map((sensor, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-4 items-end justify-between"
          >
            <Dropdown
              id={`hardware-sensor-${index}`}
              name={`hardware_sensor_${index}`}
              label={index === 0 && "Type"}
              value={sensor.hardware_sensor}
              onChange={(e) => handleSensorChange(e, index, "hardware_sensor")}
              options={sensorData}
              loading={hardwareLoading}
              defaultOptionText="Select sensor"
              optionKey="id_hardware"
              optionValue="id_hardware"
              className="flex-1"
            />
            <Input
              id={`field-sensor-${index}`}
              name={`field_sensor_${index}`}
              placeholder="Field sensor"
              type="text"
              value={sensor.field_sensor}
              onChange={(e) => handleSensorChange(e, index, "field_sensor")}
            >
              {index === 0 && "Field sensor"}
            </Input>

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
        );
      })}
      <Button type="submit" buttonType="primary" customStyles="bg-primary">
        {submitLoading ? "Loading..." : "Edit node"}
      </Button>
    </form>
  );
}
