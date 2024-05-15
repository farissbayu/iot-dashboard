import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import ChangePasswordForm from "../../components/form/ChangePasswordForm";
import useApi from "../../hooks/useApi";

const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;

export default function ProfilePage() {
  const { loading, data, error, sendRequest } = useApi();
  const [ success, setSuccess ] = useState(false);
  const navigate = useNavigate();

  function handleChangePassword(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const changePasswordBody = {
      old_password: formData.get("currentPassword"),
      new_password: formData.get("newPassword")
    }

    console.log(changePasswordBody);
    console.log(userId);
  }
  
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="bg-pageBackground h-screen flex">
      <div className="w-full mt-8 mx-8 flex flex-col">
        <Button
          customStyles="w-1/12 py-1 border-secondary"
          onClick={() => navigate(-1)}
          buttonType="secondary"
        >
          {"<"} Back
        </Button>
        <div className="w-2/3 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-12 px-8 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Change Password</h1>
          <ChangePasswordForm onSubmit={handleChangePassword} loading={loading}/>
        </div>
      </div>
    </div>
  );
}
