/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import useApi from "../../hooks/useApi";
import { editNode } from "../../api/node-request";
import NodeEditForm from "../../components/form/NodeEditForm";
import { useEffect, useState } from "react";

export default function NodeEditPage() {
  const token = localStorage.getItem("token");
  const { id: nodeId } = useParams();
  const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;
  const { username } = JSON.parse(localStorage.getItem("userData")) || "name";

  const [success, setSuccess] = useState(false);

  const { data, loading, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const nodeBody = {
      ...formData,
      id_user: userId,
      is_public: 0,
    };

    console.log(nodeBody);

    const { url, config } = editNode(token, nodeId, nodeBody);

    try {
      await sendRequest(url, config);
      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (success) {
      navigate(`/node/${username}`);
    }
  }, [data, success, navigate]);

  return (
    <div className="bg-pageBackground min-h-screen max-h-full flex">
      <div className="w-full my-8 mx-8 flex flex-col">
        <Button
          customStyles="w-[150px] py-1 px-1 border-secondary"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-16 px-8 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Edit Node</h1>
          <NodeEditForm
            onSubmit={handleSubmit}
            submitLoading={loading}
            nodeId={nodeId}
          />
        </div>
      </div>
    </div>
  );
}
