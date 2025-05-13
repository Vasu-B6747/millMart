// export default function Topbar() {
//     return (
//       <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
//         <div>
//         <h1 className="text-xl font-bold text-gray-700">Welcome to MillMart</h1>
//         <h6 className="text-[10px] font-bold text-gray-700">Buy/sell&Upgrade your Mill</h6>
//         </div>
//         <div className="flex items-center space-x-4">
//           <input type="text" placeholder="Search..." className="border px-2 py-1 rounded-md" />
//           <img src="https://via.placeholder.com/30" className="rounded-full" alt="user" />
//         </div>

//       </header>
//     );
//   }
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Topbar() {
//   const navigate = useNavigate();
//   const {userData}=useSelector((state)=>{
//     return state.user
//   })

//   // Hardcoded user data (for now)
  

//   const goToAccount = () => {
//     navigate("/account"); // Pass user data via location state
//   };

//   return (
//     <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
//       <div>
//         <h1 className="text-xl font-bold text-gray-700">Welcome to MillMart</h1>
//         <h6 className="text-[10px] font-bold text-gray-700">Buy/sell & Upgrade your Mill</h6>
//       </div>
//       <div className="flex items-center space-x-4">
//         <input type="text" placeholder="Search..." className="border px-2 py-1 rounded-md" />
//         <img
//           src={userData.profilePic}
//           // className="rounded-full cursor-pointer"
//           className="mt-4 rounded-full w-20 h-20"
//           alt="user"
//           onClick={goToAccount}
//         />
//       </div>
//     </header>
//   );
// }
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Topbar() {
  // State to toggle the dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Accessing user data from Redux
  const { userData } = useSelector((state) => state.user);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  if(!userData) return false

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-gray-700">Welcome to MillMart</h1>
        <h6 className="text-[10px] font-bold text-gray-700">Buy/sell & Upgrade your Mill</h6>
      </div>

      <div className="flex items-center space-x-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1 rounded-md"
        />
        {/* Profile image with click event */}
        <img
          src={userData.profilePic}
          className="mt-4 rounded-full w-12 h-12 cursor-pointer"
          alt="user"
          onClick={toggleDropdown}
        />

        {/* Dropdown for user details */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
            <div className="flex flex-col items-start">
              <p className="font-bold">{userData.name}</p>
              <p className="text-sm">{userData.email}</p>
              <p className="text-xs text-gray-500">Role: {userData.role}</p>
              <p className="text-xs text-gray-500">Address: {userData.address}</p>
              <img
                src={userData.profilePic}
                alt="Profile"
                className="mt-2 w-16 h-16 rounded-full"
                onClick={toggleDropdown}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

  