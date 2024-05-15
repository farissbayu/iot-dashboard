import NodeItemInHardware from "./NodeItemInHardware";
import TableHead from "./TableHead";

export default function NodeListInHardware({nodes}) {
  return (
    <div id="used-in-container" className="flex flex-col items-center">
      {nodes.length === 0 ? (
        <p>Hardware not yet used.</p>
      ) : (
        <>
          <h1 className="font-bold text-2xl text-darkFont">
            Used on the following nodes
          </h1>
          <table className="w-full border-separate table border-spacing-y-2">
            <TableHead customStyle="text-xl">
              <tr>
                <th className="p-4 max-w-8">Node id</th>
                <th className="p-4 max-w-32">Name</th>
                <th className="p-4 max-w-24">Location</th>
              </tr>
            </TableHead>
            <tbody>
              {nodes.map((node) => {
                return <NodeItemInHardware key={node.id_node} node={node} />;
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
