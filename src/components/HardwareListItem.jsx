/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import IconButton from "../components/ui/IconButton";

export default function HardwareListItem({ hardware, isAdmin, onDeleteClick }) {
  const navigate = useNavigate();

  const handleDetail = () => navigate(`${hardware.id_hardware}/detail`);
  const handleEdit = () => navigate(`${hardware.id_hardware}/edit`);
  const handleDelete = () => onDeleteClick(hardware.id_hardware);

  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-4">{hardware.serialNumber}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.name}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.type}</td>
      <td className="p-4 max-w-48 overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
        {hardware.description}
      </td>
      <td className="p-4 max-w-20 flex flex-row space-x-2">
        <IconButton buttonType="detail" onClick={handleDetail} />
        {isAdmin ? (
          <>
            <IconButton buttonType="edit" onClick={handleEdit} />
            <IconButton buttonType="delete" onClick={handleDelete} />
          </>
        ) : null}
      </td>
    </tr>
  );
}
