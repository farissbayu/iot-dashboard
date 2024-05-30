/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { getUserDetail, deleteUser } from "../../api/user-request";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../store/AuthProvider";
import DeletionModal from "../../components/DeletionModal";

export default function ProfilePage() {
  const token = localStorage.getItem("token") || "";
  const { userId } = JSON.parse(localStorage.getItem("userData")) || -1;
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clearUserData } = useAuth();

  const { url: getUserUrl, config: getUserConfig } = getUserDetail(
    token,
    userId
  );

  const { url: deleteUrl, config: deleteConfig } = deleteUser(token, userId);
  const { sendRequest: deleteUserRequest } = useApi();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    sendRequest: getUserData,
  } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        await getUserData(getUserUrl, getUserConfig);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  const handleButtonNavigation = () =>
    navigate(
      `/profile/${userData.data.username.toLowerCase()}/change-password`
    );

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleDeleteUser() {
    try {
      await deleteUserRequest(deleteUrl, deleteConfig);
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

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: ${userError}</p>;
  }

  return (
    <>
      <div className="bg-pageBackground h-screen flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold text-darkFont mt-8">
          {userData.data.username + "'s profile"}
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
                  <td>{userData.data.id_user}</td>
                </tr>
                <tr id="profile-username">
                  <td>Username</td>
                  <td>{userData.data.username}</td>
                </tr>
                <tr id="profile-email">
                  <td>Email</td>
                  <td>{userData.data.email}</td>
                </tr>
                <tr id="profile-role">
                  <td>role</td>
                  <td>{userData.data.is_admin ? "Admin" : "User"}</td>
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
              onClick={handleOpenModal}
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
          <DeletionModal
            title="Are you sure want to delete your account?"
            onCancel={handleCloseModal}
            modalIsOpen={isModalOpen}
            onDelete={handleDeleteUser}
          />
        </div>
      )}
    </>
  );
}
