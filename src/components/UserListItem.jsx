/* eslint-disable react/prop-types */
import ButtonDeleteItem from "./ButtonDeleteItem";

export default function UserListItem({ user, onDeleteClick }) {
  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-8">{user.id_user}</td>
      <td className="p-4 max-w-20 word-wrap break-words">{user.username}</td>
      <td className="p-4 max-w-60 word-wrap break-words">{user.email}</td>
      <td className="p-4 max-w-16">{user.is_admin ? "admin" : "user"}</td>
      <td className="p-4 max-w-16">
        <ButtonDeleteItem onClick={() => onDeleteClick(user.id_user)} />
      </td>
    </tr>
  );
}
