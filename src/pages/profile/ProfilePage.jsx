import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { getUserDetail } from "../../api/user-request";
import useApi from "../../hooks/useApi";

const token = localStorage.getItem("token");
const { userId } = JSON.parse(localStorage.getItem("userData"));
const { url, config } = getUserDetail(token, userId);

export default function ProfilePage() {
  const {
    data: user,
    loading,
    error,
    sendRequest,
  } = useApi({
    code: -1,
    status: "",
    data: {},
  });
  // const [user, setUser] = useState();
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

  // const handleButtonNavigation = () =>
  //   navigate(`/profile/${user.username.toLowerCase()}/change-password`);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-pageBackground h-screen flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold text-darkFont mt-8">
        {user.data.username + "'s profile"}
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
                <td>{user.data.id_user}</td>
              </tr>
              <tr id="profile-username">
                <td>Username</td>
                <td>{user.data.username}</td>
              </tr>
              <tr id="profile-email">
                <td>Email</td>
                <td>{user.data.email}</td>
              </tr>
              <tr id="profile-role">
                <td>role</td>
                <td>{user.data.is_admin ? "Admin" : "User"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="button-container"
          className="flex justify-end items-end mr-4 mb-4"
        >
          <Button
            customStyles="w-3/8"
            // onClick={handleButtonNavigation}
            buttonType="primary"
          >
            Change password
          </Button>
        </div>
      </div>
    </div>
  );
}
