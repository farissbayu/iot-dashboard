import UserListItem from "../../components/UserListItem";

const users = [
  {
    id: 1,
    username: "Faris",
    email: "faris@email.com",
    isAdmin: false,
  },
  {
    id: 2,
    username: "Bayu",
    email: "bayu@email.com",
    isAdmin: true,
  },
  {
    id: 5,
    username: "Baysu",
    email: "bayu@email.com",
    isAdmin: true,
  },
];

export default function UserListPage() {
  return (
    <div className="bg-pageBackground h-screen flex flex-col items-center space-y-8">
      <h1 className="mt-8 text-4xl font-bold text-darkFont">User List</h1>
      <div id="table-container" className="container w-11/12">
        <table className="w-full border-separate table border-spacing-y-2">
          <thead className="text-left text-darkFont text-2xl">
            <tr>
              <th className="p-4 max-w-8">Id</th>
              <th className="p-4 max-w-20">Username</th>
              <th className="p-4 max-w-60">Email</th>
              <th className="p-4 max-w-16">Role</th>
              <th className="p-4 max-w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserListItem key={user.id} user={user} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
