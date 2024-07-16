/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import HardwareDetailItem from "../../components/HardwareDetailItem";
import Button from "../../components/ui/Button";
import { getHardwareDetail } from "../../api/hardware-request";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import NodeListInHardware from "../../components/NodeListInHardware";

export default function HardwareDetailPage() {
  const token = localStorage.getItem("token") || "";
  const { id: hardwareId } = useParams();
  const navigate = useNavigate();

  const [hardware, setHardware] = useState({});
  const [nodes, setNodes] = useState([]);

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

  useEffect(() => {
    if (data.code === 200) {
      setHardware(data.data.hardware);
      setNodes(data.data.node);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: ${error}</p>;
  }

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
        {(data.code === -1 || data.code === 400) && (
          <p>Failed to load hardware detail.</p>
        )}
        {data.code === 200 && (
          <>
            <HardwareDetailItem hardware={hardware} />
            <NodeListInHardware nodes={nodes} />
          </>
        )}
      </div>
    </div>
  );
}
