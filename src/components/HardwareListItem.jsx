import { useNavigate } from "react-router-dom";
import ButtonDetailItem from "./ButtonDetailItem";
import ButtonEditItem from "./ButtonEditItem";
import ButtonDeleteItem from "./ButtonDeleteItem";

export default function HardwareListItem({ hardware, isAdmin }) {
  const navigate = useNavigate();

  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-8">{hardware.id}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.name}</td>
      <td className="p-4 max-w-16 word-wrap break-words">{hardware.type}</td>
      <td className="p-4 max-w-48 word-wrap break-words">
        {hardware.description}
      </td>
      <td className="p-4 max-w-20 flex flex-row space-x-2">
        <ButtonDetailItem
          onClick={() => navigate(`${hardware.id}/detail`)}
        />
        {isAdmin ? (
          <>
            <ButtonEditItem
              onClick={() => navigate(`${hardware.id}/edit`)}
            />
            <ButtonDeleteItem />
          </>
        ) : null}
      </td>
    </tr>
  );
}
