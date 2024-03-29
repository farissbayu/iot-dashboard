import { Form, redirect, useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/ButtonSecondary";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputForm from "../../components/InputForm";
import { hardwares } from "../../data/hardwares";
import { useEffect, useState } from "react";

export default function NodeCreatePage() {
  const [sensors, setSensors] = useState([]);
  const navigate = useNavigate();
  const hardwareData = hardwares.map((hardware) => hardware.name);

  const handleSensorChange = (index, sensorType, event) => {
    const { value } = event.target;

    setSensors((prevSensors) => {
      const updatedSensors = [...prevSensors];
      updatedSensors[index][sensorType] = value;
      return updatedSensors;
    });
  };

  const handleAddField = (event) => {
    if (event) {
      event.preventDefault();
    }
    let newSensorField = {
      hardware_sensor: "",
      field_sensor: "",
    };
    setSensors([...sensors, newSensorField]);
  };

  const handleRemoveField = (index) => {
    let data = [...sensors];
    data.splice(index, 1);
    setSensors(data);
  };

  useEffect(() => {
    handleAddField();
    console.log(sensors);
  }, []);

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div className="w-full my-8 mx-8 flex flex-col">
        <ButtonSecondary
          customStyles="w-[150px] py-1 px-1"
          onClick={() => navigate(-1)}
        >
          {"<"} Back
        </ButtonSecondary>
        <div className="w-2/3 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-16 px-4 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Create Node</h1>
          <Form
            method="post"
            id="create-node-form"
            className="w-3/4 flex flex-col justify-around py-2 space-y-4"
          >
            <h2 className="text-center text-2xl text-darkFont">Node data</h2>
            <InputForm
              id="name"
              name="name"
              placeholder="Node name"
              type="text"
            >
              Name
            </InputForm>
            <InputForm
              id="location"
              name="location"
              placeholder="Node location"
              type="text"
            >
              Location
            </InputForm>
            <div className="flex flex-col space-y-2">
              <label htmlFor="hardware" className="text-formColor text-sm">
                Hardware
              </label>
              <select
                id="hardware"
                name="hardware"
                className="text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm"
              >
                {hardwareData.map((hardwareItem, index) => {
                  return (
                    <option
                      key={index}
                      value={hardwareItem.toLowerCase()}
                      className="text-black"
                    >
                      {hardwareItem}
                    </option>
                  );
                })}
              </select>
            </div>
            <h2 className="text-center text-2xl text-darkFont">Node sensor</h2>
            {sensors.map((sensor, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row w-full space-x-4 items-end justify-between"
                >
                  <InputForm
                    id={`hardware-sensor-${index}`}
                    name={`hardware_sensor_${index}`}
                    placeholder="Hardware sensor"
                    type="text"
                    value={sensor.hardware_sensor}
                    onChange={(event) =>
                      handleSensorChange(index, "hardware_sensor", event)
                    }
                  >
                    Type
                  </InputForm>
                  <InputForm
                    id={`field-sensor-${index}`}
                    name={`field_sensor_${index}`}
                    placeholder="Field sensor"
                    type="text"
                    value={sensor.field_sensor}
                    onChange={(event) =>
                      handleSensorChange(index, "field_sensor", event)
                    }
                  >
                    Field name
                  </InputForm>

                  {index !== sensors.length - 1 ? (
                    <button
                      type="button"
                      className="w-[38px] h-[38px] font-bold text-white rounded-lg bg-buttonRed"
                      onClick={(event) => handleRemoveField(index)}
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
            <ButtonPrimary type="submit">Create</ButtonPrimary>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return redirect("/node/faris");
};
