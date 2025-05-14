
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   activateUser,
//   InactivateUser,
//   removeUser,
//   fetchAllUsers,
// } from "../slices/userSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function ActivateUser() {
//   const [activate, setActivate] = useState(true);
//   const dispatch = useDispatch();
//   const { users, loading } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   const activeUsers = users.filter((user) => user.isActive === true);
//   const requestedUsers = users.filter((user) => user.isActive === false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 overflow-x-auto">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             className={`text-sm border rounded-md px-4 py-2 font-semibold ${
//               activate ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-800"
//             } hover:bg-purple-700 hover:text-white`}
//             onClick={() => setActivate(true)}
//           >
//             Activated Users
//           </button>
//           <button
//             className={`text-sm border rounded-md px-4 py-2 font-semibold ${
//               !activate ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-800"
//             } hover:bg-purple-700 hover:text-white`}
//             onClick={() => setActivate(false)}
//           >
//             Requested Users
//           </button>
//         </div>

//         {loading ? (
//           <div className="text-center text-lg text-gray-600">Loading users...</div>
//         ) : activate ? (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Activated Users</h2>
//             <UserTable
//               users={activeUsers}
//               actionType="deactivate"
//               dispatch={dispatch}
//               loading={loading}
//             />
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-center">Requested Users</h2>
//             <UserTable
//               users={requestedUsers}
//               actionType="activate"
//               dispatch={dispatch}
//               loading={loading}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function UserTable({ users, actionType, dispatch, loading }) {
//   const handleAction = async (type, userId) => {
//     try {
//       if (type === "activate") {
//         await dispatch(activateUser(userId)).unwrap();
//         toast.success("User activated. Email sent successfully.");
//       } else if (type === "deactivate") {
//         await dispatch(InactivateUser(userId)).unwrap();
//         toast.success("User deactivated. Email sent successfully.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       await dispatch(removeUser(userId)).unwrap();
//       toast.success("User deleted.");
//     } catch (error) {
//       toast.error("Failed to delete user.");
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr className="bg-indigo-100 text-indigo-700">
//             <th className="border border-gray-300 px-6 py-3 text-left">Name</th>
//             <th className="border border-gray-300 px-6 py-3 text-left">Email</th>
//             <th className="border border-gray-300 px-6 py-3 text-left">Role</th>
//             <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
//             {actionType === "deactivate" && (
//               <>
//                 <th className="border border-gray-300 px-6 py-3 text-left">Deactivate</th>
//                 <th className="border border-gray-300 px-6 py-3 text-left">Delete</th>
//               </>
//             )}
//             {actionType === "activate" && (
//               <th className="border border-gray-300 px-6 py-3 text-left">Activate</th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-6 py-3">{user.name}</td>
//                 <td className="border border-gray-300 px-6 py-3">{user.email}</td>
//                 <td className="border border-gray-300 px-6 py-3 capitalize">{user.role}</td>
//                 <td className="border border-gray-300 px-6 py-3">
//                   {user.isActive ? "Active" : "Inactive"}
//                 </td>

//                 {actionType === "deactivate" && (
//                   <>
//                     <td className="border border-gray-300 px-6 py-3">
//                       <button
//                         className="text-sm border rounded-md bg-orange-500 hover:bg-orange-700 text-white py-1 px-3"
//                         onClick={() => handleAction("deactivate", user._id)}
//                         disabled={loading}
//                       >
//                         Deactivate
//                       </button>
//                     </td>
//                     <td className="border border-gray-300 px-6 py-3">
//                       <button
//                         className="text-sm border rounded-md bg-red-500 hover:bg-red-700 text-white py-1 px-3"
//                         onClick={() => handleDelete(user._id)}
//                         disabled={loading}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}

//                 {actionType === "activate" && (
//                   <td className="border border-gray-300 px-6 py-3">
//                     <button
//                       className="text-sm border rounded-md bg-green-500 hover:bg-green-700 text-white py-1 px-3"
//                       onClick={() => handleAction("activate", user._id)}
//                       disabled={loading}
//                     >
//                       Activate
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-gray-500">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  activateUser,
  InactivateUser,
  removeUser,
  verifyUser,
  unverifyUser,
  fetchAllUsers,
} from "../slices/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserManagement() {
  const [view, setView] = useState("activated"); // Options: 'activated', 'requested', 'verified', 'unverified'
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const getFilteredUsers = () => {
    switch (view) {
      case "activated":
        return users.filter((u) => u.isActive === true);
      case "requested":
        return users.filter((u) => u.isActive === false);
      case "verified":
        return users.filter((u) => u.isVerify === true);
      case "unverified":
        return users.filter((u) => u.isVerify === false);
      default:
        return users;
    }
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {["activated", "requested", "verified", "unverified"].map((v) => (
            <button
              key={v}
              className={`text-sm border rounded-md px-4 py-2 font-semibold ${
                view === v ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-800"
              } hover:bg-purple-700 hover:text-white`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)} Users
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {view.charAt(0).toUpperCase() + view.slice(1)} Users
        </h2>

        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading users...</div>
        ) : (
          <UserTable
            users={filteredUsers}
            view={view}
            dispatch={dispatch}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

function UserTable({ users, view, dispatch, loading }) {
  const handleAction = async (type, userId) => {
    try {
      if (type === "activate") {
        await dispatch(activateUser(userId)).unwrap();
        toast.success("User activated.");
      } else if (type === "deactivate") {
        await dispatch(InactivateUser(userId)).unwrap();
        toast.success("User deactivated.");
      } else if (type === "verify") {
        await dispatch(verifyUser(userId)).unwrap();
        toast.success("User verified.");
      } else if (type === "unverify") {
        await dispatch(unverifyUser(userId)).unwrap();
        toast.success("User unverified.");
      }
    } catch (err) {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(removeUser(userId)).unwrap();
      toast.success("User deleted.");
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-indigo-100 text-indigo-700">
            <th className="border border-gray-300 px-6 py-3 text-left">Name</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Email</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Role</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Active</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Verified</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-6 py-3">{user.name}</td>
                <td className="border border-gray-300 px-6 py-3">{user.email}</td>
                <td className="border border-gray-300 px-6 py-3 capitalize">{user.role}</td>
                <td className="border border-gray-300 px-6 py-3">
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border border-gray-300 px-6 py-3">
                  {user.isVerify ? "Verified" : "Unverified"}
                </td>
                <td className="border border-gray-300 px-6 py-3 space-x-2">
                  {/* Activation Toggle */}
                  {view === "requested" && (
                    <button
                      onClick={() => handleAction("activate", user._id)}
                      className="text-sm bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                      disabled={loading}
                    >
                      Activate
                    </button>
                  )}
                  {view === "activated" && (
                    <>
                      <button
                        onClick={() => handleAction("deactivate", user._id)}
                        className="text-sm bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded-md"
                        disabled={loading}
                      >
                        Deactivate
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* Verification Toggle */}
                  {view === "unverified" && (
                    <button
                      onClick={() => handleAction("verify", user._id)}
                      className="text-sm bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                      disabled={loading}
                    >
                      Verify
                    </button>
                  )}
                  {view === "verified" && (
                    <button
                      onClick={() => handleAction("unverify", user._id)}
                      className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-md"
                      disabled={loading}
                    >
                      Unverify
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
