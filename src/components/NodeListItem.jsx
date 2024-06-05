/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import IconButton from "../components/ui/IconButton";

export default function NodeListItem({ node, onDeleteClick }) {
  const navigate = useNavigate();

  const handleDetail = () => navigate(`/node/${node.id_node}/detail`);
  const handleEdit = () => navigate(`/node/${node.id_node}/edit`);
  const handleDelete = () => onDeleteClick(node.id_node);

  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-8">{node.id_node}</td>
      <td className="p-4 max-w-48 word-wrap break-words">{node.name}</td>
      <td className="p-4 max-w-24 word-wrap break-words">{node.location}</td>
      <td className="p-4 max-w-20 flex flex-row space-x-2">
        <IconButton buttonType="detail" onClick={handleDetail} />
        <IconButton buttonType="edit" onClick={handleEdit} />
        <IconButton buttonType="delete" onClick={handleDelete} />
      </td>
    </tr>
  );
}
