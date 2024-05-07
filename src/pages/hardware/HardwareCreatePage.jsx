import { Form, redirect, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/ui/Button";

const hardwareType = [
  "Microcontroller Unit",
  "Single-Board Computer",
  "Sensor",
];

export default function HardwareCreatePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-pageBackground h-screen flex">
      <div className="w-full mt-8 mx-8 flex flex-col">
        <Button
          customStyles="w-[150px] py-1 px-1"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <div className="w-5/6 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-16 px-4 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Create Hardware</h1>
          <Form
            method="post"
            id="create-hardware-form"
            className="w-2/3 flex flex-col justify-around space-y-4"
          >
            <Input
              id="name"
              name="name"
              placeholderText="Hardware name"
              type="text"
            >
              Name
            </Input>
            <TextArea
              id="description"
              name="description"
              placeholderText="Hardware description..."
              row="4"
              col="50"
            >
              Description
            </TextArea>
            <div className="flex flex-col space-y-2">
              <label htmlFor="hardwareType" className="text-formColor text-sm">
                Hardware Type
              </label>
              <select
                id="hardwareType"
                name="hardwareType"
                className="text-black p-2 mt-1 border border-solid border-formColor rounded-lg text-sm"
              >
                {hardwareType.map((type, index) => {
                  return (
                    <option
                      key={index}
                      value={type.toLowerCase()}
                      className="text-black"
                    >
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            <Button customStyles="w-full" type="submit" buttonType="primary">
              Create Hardware
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const hardwareBody = {
    name: data.get("name"),
    description: data.get("description"),
    hardwareType: data.get("hardwareType"),
  };

  console.log(hardwareBody);
  return redirect("/hardware");
};