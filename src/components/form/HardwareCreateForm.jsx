/* eslint-disable react/prop-types */
import { useState } from "react";
import TextArea from "../TextArea";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";

const hardwareType = [
  { id: 0, name: "Microcontroller Unit" },
  { id: 1, name: "Single-Board Computer" },
  { id: 2, name: "Sensor" },
];

export default function HardwareCreateForm({ onSubmit, submitLoading }) {
  const [selectedType, setSelectedType] = useState("");

  function handleTypeChange(e) {
    setSelectedType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      type: selectedType,
    };

    onSubmit(formData);
  }

  console.log(hardwareType);

  return (
    <form
      method="post"
      id="create-hardware-form"
      className="w-2/3 flex flex-col justify-around space-y-4"
      onSubmit={handleSubmit}
    >
      <Input id="name" name="name" placeholder="Hardware name" type="text">
        Name
      </Input>
      <TextArea
        id="description"
        name="description"
        placeholder="Hardware description..."
        row="4"
        col="50"
      >
        Description
      </TextArea>
      <Dropdown
        id="type"
        name="type"
        label="Hardware Type"
        defaultOptionText="Select hardware type"
        value={selectedType}
        onChange={handleTypeChange}
        options={hardwareType}
        optionKey="id"
        optionValue="name"
      />
      <Button
        customStyles="w-full bg-primary"
        type="submit"
        buttonType="primary"
      >
        {submitLoading ? "Loading..." : "Create hardware"}
      </Button>
    </form>
  );
}
