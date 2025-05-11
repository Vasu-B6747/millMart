import { Link } from "react-router-dom";
export default function Sidebar() {
    return (
      <div className="w-64 bg-white shadow-md h-full hidden md:block">
        <div className="p-4 text-xl font-semibold text-blue-600">Dashboard</div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li><a href="#" className="block px-4 py-2 hover:bg-blue-100">Home</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-blue-100">Listings</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-blue-100">Messages</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-blue-100">Settings</a></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
  