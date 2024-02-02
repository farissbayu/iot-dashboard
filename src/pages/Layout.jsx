import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// export default function Layout() {
//   return (
//     <div className="bg-pageBackground flex flex-row">
//       <Sidebar />
//       <div className="container flex-1 ml-1/4">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

export default function Layout() {
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />
      <div className="ml-[200px] w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
