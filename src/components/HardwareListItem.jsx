/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ButtonDetailItem from "./ButtonDetailItem";
import ButtonEditItem from "./ButtonEditItem";
import ButtonDeleteItem from "./ButtonDeleteItem";

export default function HardwareListItem({ hardware, isAdmin, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-4">{hardware.id_hardware}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.name}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.type}</td>
      <td className="p-4 max-w-48 overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
        {hardware.description}
      </td>
      <td className="p-4 max-w-20 flex flex-row space-x-2">
        <ButtonDetailItem
          onClick={() => navigate(`${hardware.id_hardware}/detail`)}
        />
        {isAdmin ? (
          <>
            <ButtonEditItem onClick={() => navigate(`${hardware.id}/edit`)} />
            <ButtonDeleteItem
              onClick={() => onDeleteClick(hardware.id_hardware)}
            />
          </>
        ) : null}
      </td>
    </tr>
  );
}
