import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../slices/userSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };
  const {userData}=useSelector((state)=>{
    return state.user
  })

  return (
    <div className="w-64 bg-white shadow-md h-full hidden md:block">
      <div className="p-4 text-xl font-semibold text-blue-600">Dashboard</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li><Link to="/dashboard/home" className="block px-4 py-2 hover:bg-blue-100">Home</Link></li>
         {userData.role=='admin'&& <li><Link to="/dashboard/equipments" className="block px-4 py-2 hover:bg-blue-100">Listings</Link></li>}
         {/* <li><Link to="/dashboard/equipments" className="block px-4 py-2 hover:bg-blue-100">Listings</Link></li> */}
         {userData.role=='seller'&& <li><Link to="/dashboard/mylist" className="block px-4 py-2 hover:bg-blue-100">MyEquipments</Link></li>}
         {userData.role=='admin'&&  <li><Link to="/dashboard/users" className="block px-4 py-2 hover:bg-blue-100">Users</Link></li>}
          <li><Link to="/dashboard/account" className="block px-4 py-2 hover:bg-blue-100">Profile</Link></li>
          <li><Link to="/dashboard/chat" className="block px-4 py-2 hover:bg-blue-100">Messages</Link></li>
          <li><Link to="/dashboard/search" className="block px-4 py-2 hover:bg-blue-100">Settings</Link></li>
          <li>
            <button
              className="block px-4 ml-4 mt-4 bg-red-500 hover:bg-red-700 text-white py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
