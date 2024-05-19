/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { getUserDetail } from "../../api/user-request";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../store/AuthProvider";

const token = localStorage.getItem("token") || "";
const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;
const { url, config } = getUserDetail(token, userId);

export default function ProfilePage() {
  const { clearUserData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error, sendRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        await sendRequest(url, config);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  const handleButtonNavigation = () =>
    navigate(`/profile/${data.data.username.toLowerCase()}/change-password`);

  function handleDeleteAccount() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      clearUserData();
      navigate("/login", { replace: true });
    }, 1000);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: ${error}</p>;
  }

  return (
    <>
      <div className="bg-pageBackground h-screen flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold text-darkFont mt-8">
          {data.data.username + "'s profile"}
        </h1>
        <div
          id="profile-container"
          className="w-5/6 bg-white rounded-lg shadow-md flex flex-col relative"
        >
          <div id="profile-table-container" className="flex justify-center">
            <table className="w-full mx-8 my-4 table-fixed">
              <tbody>
                <tr id="profile-user-id">
                  <td>User Id</td>
                  <td>{data.data.id_user}</td>
                </tr>
                <tr id="profile-username">
                  <td>Username</td>
                  <td>{data.data.username}</td>
                </tr>
                <tr id="profile-email">
                  <td>Email</td>
                  <td>{data.data.email}</td>
                </tr>
                <tr id="profile-role">
                  <td>role</td>
                  <td>{data.data.is_admin ? "Admin" : "User"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="button-container"
            className="flex justify-end items-end mr-4 mb-4"
          >
            <Button
              customStyles="mx-4 bg-buttonRed"
              buttonType="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Delete account
            </Button>
            <Button
              customStyles="w-3/8 bg-primary"
              onClick={handleButtonNavigation}
              buttonType="primary"
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
      {/* Modal dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete your account?
            </h2>
            <div className="flex justify-center">
              <Button
                buttonType="primary"
                customStyles="bg-buttonRed mx-2"
                onClick={handleDeleteAccount}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
              <Button
                buttonType="primary"
                customStyles="bg-primary mx-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
