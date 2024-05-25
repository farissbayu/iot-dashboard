/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import { getHardwareDetail } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";

const hardwareType = [
  { id: 0, name: "microcontroller unit" },
  { id: 1, name: "single-board computer" },
  { id: 2, name: "sensor" },
];

export default function HardwareEditForm({
  onSubmit,
  submitLoading,
  hardwareId,
}) {
  const token = localStorage.getItem("token");
  const [prevData, setPrevData] = useState({
    name: "",
    description: "",
    type: "",
  });
  const { url, config } = getHardwareDetail(hardwareId, token);
  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data.code === 200) {
      setPrevData(data.data.hardware);
    }
  }, [data]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPrevData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      id: hardwareId,
      name: e.target.name.value,
      description: e.target.description.value,
      type: e.target.type.value,
    };

    onSubmit(formData);

    console.log(formData);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form
      method="post"
      id="hardware-form"
      className="w-2/3 flex flex-col justify-around space-y-4"
      onSubmit={handleSubmit}
    >
      <Input
        id="name"
        name="name"
        placeholder="Hardware name"
        type="text"
        value={loading ? "Loading..." : prevData.name}
        onChange={handleInputChange}
      >
        Name
      </Input>
      <TextArea
        id="description"
        name="description"
        placeholder="Hardware description..."
        row="4"
        col="50"
        value={loading ? "Loading..." : prevData.description}
        onChange={handleInputChange}
      >
        Description
      </TextArea>
      <Dropdown
        id="type"
        name="type"
        label="Hardware Type"
        defaultOptionText="Select hardware type"
        value={loading ? "Loading..." : prevData.type}
        onChange={handleInputChange}
        options={hardwareType}
        optionKey="id"
        optionValue="name"
      />
      <Button
        customStyles="w-full bg-primary"
        type="submit"
        buttonType="primary"
      >
        {submitLoading ? "Loading..." : "Edit"}
      </Button>
    </form>
  );
}
