
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MainContent from "./Maincontent";
import { useSelector } from "react-redux";

export default function Millmart() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Topbar spans full width at the top */}
      <div className="flex-shrink-0">
        <Topbar />
      </div>

      {/* Content area: sidebar + main content horizontally */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: fixed width */}
        <div className="w-64 flex-shrink-0 overflow-y-auto bg-white border-r">
          <Sidebar />
        </div>

        {/* Main Content: scrollable area */}
        <div className="flex-1 overflow-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
}