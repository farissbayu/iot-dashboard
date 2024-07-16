import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import HardwareEditForm from "../../components/form/HardwareEditForm";
import { editHardware } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";

export default function HardwareEditPage() {
  const token = localStorage.getItem("token");
  const { id: hardwareId } = useParams();

  const navigate = useNavigate();

  const { data, error, loading, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  async function handleSubmit(formData) {
    console.log(formData);

    const { url, config } = editHardware(token, hardwareId, formData);

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

  if (error) {
    return <p>{error}</p>;
  }

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
          <h1 className="text-4xl font-bold text-darkFont">Edit Hardware</h1>
          <HardwareEditForm
            onSubmit={handleSubmit}
            submitLoading={loading}
            hardwareId={hardwareId}
          />
        </div>
      </div>
    </div>
  );
}
