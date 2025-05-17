
import { useSelector, useDispatch } from "react-redux";
import {
  approveEquipments,
  rejectEquipment,
  verifyEquipments,
  unverifyEquipment,
  fetchEquipments,
} from "../slices/equipmentSlice"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApproveEquips() {
  const dispatch = useDispatch();
  const { equipmentData, loading } = useSelector((state) => state.equipments);
  const [view, setView] = useState("approved"); // Options: approved, requested, verified, unverified

  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

  const getFilteredEquipments = () => {
    const all = equipmentData || [];
    switch (view) {
      case "approved":
        return all.filter((e) => e.isApproved === true);
      case "requested":
        return all.filter((e) => e.isApproved === false);
      case "verified":
        return all.filter((e) => e.isVerified === true);
      case "unverified":
        return all.filter((e) => e.isVerified === false);
      default:
        return all;
    }
  };

  const filteredEquipments = getFilteredEquipments();

  const handleAction = async (type, id) => {
    try {
      if (type === "approve") {
        await dispatch(approveEquipments(id)).unwrap();
        toast.success("Equipment approved.");
      } else if (type === "reject") {
        await dispatch(rejectEquipment(id)).unwrap();
        toast.success("Equipment rejected.");
      } else if (type === "verify") {
        await dispatch(verifyEquipments(id)).unwrap();
        toast.success("Equipment verified.");
      } else if (type === "unverify") {
        await dispatch(unverifyEquipment(id)).unwrap();
        toast.success("Equipment unverified.");
      }
    } catch (error) {
      toast.error("Action failed.");
    }
  };
//   const handleAction = async (type, id) => {
//   try {
//     if (type === "approve") {
//       await dispatch(approveEquipments(id)).unwrap();
//       toast.success("Equipment approved.");
//     } else if (type === "reject") {
//       await dispatch(rejectEquipment(id)).unwrap();
//       toast.success("Equipment rejected.");
//     } else if (type === "verify") {
//       await dispatch(verifyEquipments(id)).unwrap();
//       toast.success("Equipment verified.");
//     } else if (type === "unverify") {
//       await dispatch(unverifyEquipment(id)).unwrap();
//       toast.success("Equipment unverified.");
//     }

//     // ✅ Re-fetch the updated data
//     dispatch(fetchEquipments());
//   } catch (error) {
//     toast.error("Action failed.");
//   }
// };


  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {["approved", "requested", "verified", "unverified"].map((v) => (
            <button
              key={v}
              className={`text-sm border rounded-md px-4 py-2 font-semibold ${
                view === v ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-800"
              } hover:bg-purple-700 hover:text-white`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)} Equipments
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center capitalize">
          {view} Equipments
        </h2>

        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading equipments...</div>
        ) : (
          <EquipmentTable equipments={filteredEquipments} view={view} onAction={handleAction} />
        )}
      </div>
    </div>
  );
}

function EquipmentTable({ equipments, view, onAction }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-indigo-100 text-indigo-700">
            <th className="border border-gray-300 px-6 py-3 text-left">Title</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Type</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Brand</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Price</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Approved</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Verified</th>
            <th className="border border-gray-300 px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipments.length > 0 ? (
            equipments.map((equip) => (
              <tr key={equip._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-6 py-3">{equip.title}</td>
                <td className="border border-gray-300 px-6 py-3">{equip.equipmentType}</td>
                <td className="border border-gray-300 px-6 py-3">{equip.brand}</td>
                <td className="border border-gray-300 px-6 py-3">₹{equip.price}</td>
                <td className="border border-gray-300 px-6 py-3">
                  {equip.isApproved ? "✅" : "❌"}
                </td>
                <td className="border border-gray-300 px-6 py-3">
                  {equip.isVerified ? "✅" : "❌"}
                </td>
                <td className="border border-gray-300 px-6 py-3 space-x-2">
                   {view === "approved" && (
                    <>
                      <button
                        onClick={() => onAction("reject", equip._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {view === "requested" && (
                    <>
                      <button
                        onClick={() => onAction("approve", equip._id)}
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onAction("reject", equip._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {view === "unverified" && (
                    <button
                      onClick={() => onAction("verify", equip._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Verify
                    </button>
                  )}
                  {view === "verified" && (
                    <button
                      onClick={() => onAction("unverify", equip._id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Unverify
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No equipment found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
