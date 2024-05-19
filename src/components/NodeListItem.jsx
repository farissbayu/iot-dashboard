/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ButtonDetailItem from "./ButtonDetailItem";
import ButtonEditItem from "./ButtonEditItem";
import ButtonDeleteItem from "./ButtonDeleteItem";

export default function NodeListItem({ node, onDeleteClick }) {
  const { username } = JSON.parse(localStorage.getItem("userData")) || "";
  
  const navigate = useNavigate();  

  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-8">{node.id_node}</td>
      <td className="p-4 max-w-48 word-wrap break-words">{node.name}</td>
      <td className="p-4 max-w-24 word-wrap break-words">{node.location}</td>
      <td className="p-4 max-w-20 flex flex-row space-x-2">
        <ButtonDetailItem
          onClick={() => navigate(`/node/${username}/${node.id_node }/detail`)}
        />
        <ButtonEditItem
          onClick={() => navigate(`/node/${username}/${node.id_node}/edit`)}
        />
        <ButtonDeleteItem onClick={() => onDeleteClick(node.id_node)}/>
      </td>
    </tr>
  );
}
