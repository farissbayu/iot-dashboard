/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import useApi from "../../hooks/useApi";
import { createNode } from "../../api/node-request";
import NodeCreateForm from "../../components/form/NodeCreateForm";

export default function NodeCreatePage() {
  const token = localStorage.getItem("token");
  const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;
  const { username } = JSON.parse(localStorage.getItem("userData")) || "name";

  const { loading, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const nodeBody = {
      ...formData,
      id_user: userId,
      is_public: false,
    };

    const { url, config } = createNode(token, nodeBody);

    try {
      await sendRequest(url, config);
      navigate(`/node/${username}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
          <h1 className="text-4xl font-bold text-darkFont">Create Node</h1>
          <NodeCreateForm onSubmit={handleSubmit} submitLoading={loading} />
        </div>
      </div>
    </div>
  );
}
