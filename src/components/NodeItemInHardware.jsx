export default function NodeItemInHardware({node}) {
  return (
    <tr className="shadow-lg bg-white hover:bg-gray-50">
      <td className="p-4 max-w-8">{node.id_node}</td>
      <td className="p-4 max-w-32 word-wrap break-words">{node.name}</td>
      <td className="p-4 max-w-24 word-wrap break-words">{node.location}</td>
    </tr>
  );
}
