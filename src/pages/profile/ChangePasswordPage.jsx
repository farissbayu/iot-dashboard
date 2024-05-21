import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import ChangePasswordForm from "../../components/form/ChangePasswordForm";
import useApi from "../../hooks/useApi";
import { changePassword } from "../../api/user-request";
import { useAuth } from "../../store/AuthProvider";

export default function ProfilePage() {
  const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;
  const token = localStorage.getItem("token");
  const [success, setSuccess] = useState(false);

  const { clearUserData } = useAuth();
  const { loading, sendRequest } = useApi();

  const navigate = useNavigate();

  async function handleChangePassword(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const changePasswordBody = {
      old_password: formData.get("currentPassword"),
      new_password: formData.get("newPassword"),
    };

    const { url, config } = changePassword(userId, changePasswordBody, token);

    try {
      await sendRequest(url, config);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        clearUserData();
        navigate("/login");
      }, 2000);
    }
  }, [success, navigate, clearUserData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (success) {
    return (
      <div className="bg-pageBackground h-screen flex">
        <div className="w-full mt-8 mx-8 flex flex-col">
        <div className="w-2/3 bg-white shadow-md rounded-lg mx-auto mt-4 flex flex-col items-center py-12 px-8 space-y-4">
          <h1 className="text-4xl font-bold text-darkFont">Success change password!</h1>
        </div>
        </div>
      </div>
    );
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
          <ChangePasswordForm
            onSubmit={handleChangePassword}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
