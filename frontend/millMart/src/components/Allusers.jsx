
import { useEffect } from "react";
import { fetchAllUsers } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="min-h-full p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">All Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse ">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="border border-gray-300 px-6 py-3 text-left">Name</th>
                <th className="border border-gray-300 px-6 py-3 text-left">Email</th>
                <th className="border border-gray-300 px-6 py-3 text-left">Role</th>
                <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
                 <th className="border border-gray-300 px-6 py-3 text-left">VerifyStatus</th>
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
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                     <td className="border border-gray-300 px-6 py-3">
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isVerify ? "Verify" : "Not-Verify"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
