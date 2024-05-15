import { useNavigate, useParams } from "react-router-dom";
import HardwareDetailItem from "../../components/HardwareDetailItem";
import Button from "../../components/ui/Button";
import { getHardwareDetail } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";
import NodeListInHardware from "../../components/NodeListInHardware";

const token = localStorage.getItem("token") || "";

export default function HardwareDetailPage() {
  const { id: hardwareId } = useParams();
  const navigate = useNavigate();
  const { url, config } = getHardwareDetail(hardwareId, token);
  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function fetchHardwareDetail() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHardwareDetail();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: ${error}</p>;
  }

  const hardware = data.data.hardware || {};
  const nodes = data.data.node || [];

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div id="main-container" className="w-full m-8 flex flex-col space-y-4">
        <Button
          customStyles="w-1/12 py-1 border-secondary"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <HardwareDetailItem hardware={hardware || {}} />
        <NodeListInHardware nodes={nodes} />
      </div>
    </div>
  );
}
