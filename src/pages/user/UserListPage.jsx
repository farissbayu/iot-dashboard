/* eslint-disable react-hooks/exhaustive-deps */
import Table from "../../components/Table";
import TableHead from "../../components/TableHead";
import UserListItem from "../../components/UserListItem";
import useApi from "../../hooks/useApi";
import { deleteUser, getUserList } from "../../api/user-request";
import { useEffect, useState } from "react";
import PaginationButtons from "../../components/PaginationButton";
import DeletionModal from "../../components/DeletionModal";

export default function UserListPage() {
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(-1);

  const [query, setQuery] = useState("");
  const keys = ["username", "email"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { url: getUserUrl, config: getUserConfig } = getUserList(token);
  const { url: deleteUserUrl, config: deleteUserConfig } = deleteUser(
    token,
    userId
  );

  const {
    data: userList,
    loading: userLoading,
    error: userError,
    sendRequest: getListUser,
  } = useApi({
    code: -1,
    status: "",
    data: [],
  });

  const { sendRequest: deleteUserRequest } = useApi({
    code: -1,
    status: "",
    data: {},
  });

  useEffect(() => {
    async function getUsers() {
      try {
        await getListUser(getUserUrl, getUserConfig);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    getUsers();
  }, []);

  const filteredItems = userList.data.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(query))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearchChange(event) {
    setQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  }

  function handleOpenModal(currentId) {
    setIsModalOpen(true);
    setUserId(currentId);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setUserId(-1);
  }

  async function handleDeleteUser() {
    try {
      await deleteUserRequest(deleteUserUrl, deleteUserConfig);
      setIsModalOpen(false);
      await getListUser(getUserUrl, getUserConfig);
    } catch (error) {
      console.error(error);
    }
  }

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (userError) {
    return <p>Error: {userError}</p>;
  }

  return (
    <>
      <div className="bg-pageBackground min-h-screen max-h-full flex">
        <div className="w-full mx-8 flex flex-col space-y-4">
          <h1 className="mt-8 text-4xl font-bold text-darkFont">User List</h1>
          <input
            type="search"
            placeholder="search"
            className="p-2 w-1/4 rounded-md border border-darkFont"
            value={query}
            onChange={handleSearchChange}
          />
          <div id="table-container">
            <Table>
              <TableHead customStyle="text-2xl">
                <tr>
                  <th className="p-4 max-w-8">Id</th>
                  <th className="p-4 max-w-20">Username</th>
                  <th className="p-4 max-w-60">Email</th>
                  <th className="p-4 max-w-16">Role</th>
                  <th className="p-4 max-w-16">Action</th>
                </tr>
              </TableHead>
              <tbody>
                {currentItems.map((user) => {
                  return (
                    <UserListItem
                      key={user.id_user}
                      user={user}
                      onDeleteClick={handleOpenModal}
                    />
                  );
                })}
              </tbody>
            </Table>
          </div>
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-50">
          <DeletionModal
            title={`Are you sure want to delete user ${userId}`}
            onCancel={handleCloseModal}
            modalIsOpen={isModalOpen}
            onDelete={handleDeleteUser}
          />
        </div>
      )}
    </>
  );
}
