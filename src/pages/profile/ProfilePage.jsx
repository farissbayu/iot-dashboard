import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = {
    id: 1,
    username: "Faris",
    email: "faris@email.com",
    isAdmin: false,
  };

  const handleButtonNavigation = () =>
    navigate(`/profile/${user.username.toLowerCase()}/change-password`);

  return (
    <div className="bg-pageBackground h-screen flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold text-darkFont mt-8">
        {user.username + "'s profile"}
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
                <td>{user.id}</td>
              </tr>
              <tr id="profile-username">
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr id="profile-email">
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr id="profile-role">
                <td>role</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
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
            onClick={handleButtonNavigation}
            buttonType="primary"
          >
            Change password
          </Button>
        </div>
      </div>
    </div>
  );
}
