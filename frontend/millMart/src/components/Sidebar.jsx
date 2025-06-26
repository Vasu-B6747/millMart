import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import {
  House,
  CircleUserRound,
  MessageCircleMore,
  Search,
  LogOut,
  Users,
  List,
  Landmark 
} from "lucide-react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="hidden md:flex flex-col justify-between bg-white border-r border-gray-200 w-50 h-screen shadow-lg">
      {/* Logo */}
      <div>
        <div className="p-4 text-1xl font-bold text-blue-600 tracking-wide border-b">
          Dashboard
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="flex flex-col space-y-1 text-gray-700 px-2">
            <SidebarItem icon={House} label="Home" to="/dashboard" />

            {userData?.role === "admin" && (
              <SidebarItem icon={List} label="Listings" to="/dashboard/equipments" />
            )}

            {userData?.role === "seller" && (
              <SidebarItem icon={List} label="My Equipments" to="/dashboard/mylist" />
            )}

            {userData?.role === "admin" && (
              <SidebarItem icon={Users} label="Users" to="/users" />
            )}

           
              <SidebarItem icon={Landmark } label="Payments" to="/transactions" />
            

            <SidebarItem icon={CircleUserRound} label="Profile" to="/account" />
            {userData.role!=='admin' &&<SidebarItem icon={MessageCircleMore} label="Messages" to="/chat" />}
           {userData.role!=='admin'&& <SidebarItem icon={Search} label="Nearby Equipment" to="/location" />}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 mb-20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

// Reusable Sidebar Item component
const SidebarItem = ({ icon: Icon, label, to }) => {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-50 transition font-medium"
      >
        <Icon size={20} className="text-blue-500" />
        <span>{label}</span>
      </Link>
    </li>
  );
};
