import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import HardwareCreateForm from "../../components/form/HardwareCreateForm";
import useApi from "../../hooks/useApi";
import { createHardware } from "../../api/hardware-request";
import { useEffect } from "react";

export default function HardwareCreatePage() {
  const token = localStorage.getItem("token");

  const { data, loading, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const navigate = useNavigate();

  async function handleSubmit(formData) {
    console.log(formData);

    const { url, config } = createHardware(token, formData);

    try {
      await sendRequest(url, config);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (data.code === 200) {
      navigate("/hardware");
    }
  }, [data, navigate]);

  return (
    <div className="bg-pageBackground h-screen flex">
      <div className="w-full mt-8 mx-8 flex flex-col">
        <Button
          customStyles="w-[150px] py-1 px-1 border-secondary"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <div className="w-5/6 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-16 px-4 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Create Hardware</h1>
          <HardwareCreateForm onSubmit={handleSubmit} submitLoading={loading} />
        </div>
      </div>
    </div>
  );
}
