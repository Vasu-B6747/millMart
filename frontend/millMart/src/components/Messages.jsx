// import { useSelector,useDispatch } from "react-redux"
// import { useState,useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { fetchMessages } from "../slices/messageSlice"
// export default function Messages(){
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const {userData}=useSelector((state)=>{
//        return state.user
//     })
//     const {userMessages}=useSelector((state)=>{
//         return state.messages
//     })
//     const userId=userData._id
//     useEffect(()=>{
//         dispatch(fetchMessages(userId))
//     },[])
//     return(
//         <div>
//             <table>
//                 <tr>
//                     <th>UserName</th>
//                     <th>EquipmentName</th>
//                     <th>Messages</th>
//                     <th>Response</th>
//                 </tr>
//                 {userMessages.length>0&&userMessages.map((ele)=><tr>
//                     <td>{ele.sender.name}</td>
//                     <td>{ele.equipmentId.title}</td>
//                     <td>{ele.content}</td>
//                     <td><button onClick={()=>navigate(`/equipment/chat/${ele.sender._id}/${ele.equipmentId._id}`)}>Reply</button></td>
//                 </tr>)}
//             </table>
            
//         </div>
//     )
// }
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchMessages } from "../slices/messageSlice";

// export default function Messages() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { userData } = useSelector((state) => state.user);
//   const { userMessages } = useSelector((state) => state.messages);

//   const userId = userData?._id;

//   const [uniqueConversations, setUniqueConversations] = useState([]);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchMessages(userId));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (userMessages.length > 0 && userId) {
//       // Group by unique (otherUserId + equipmentId) pairs
//       const convMap = new Map();

//       userMessages.forEach((msg) => {
//         const otherUser = msg.sender._id === userId ? msg.receiver : msg.sender;
//         const key = `${otherUser._id}-${msg.equipmentId._id}`;

//         if (!convMap.has(key)) {
//           convMap.set(key, {
//             otherUser,
//             equipment: msg.equipmentId,
//             lastMessage: msg.content,
//           });
//         }
//       });

//       setUniqueConversations(Array.from(convMap.values()));
//     }
//   }, [userMessages, userId]);

//   return (
//     <div>
//       <h2>Messages</h2>
//       {uniqueConversations.length === 0 ? (
//         <p>No messages found.</p>
//       ) : (
//         <table border="1" cellPadding="8" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Equipment</th>
//               <th>Last Message</th>
//               <th>Response</th>
//             </tr>
//           </thead>
//           <tbody>
//             {uniqueConversations.map((conv, index) => (
//               <tr key={index}>
//                 <td>{conv.otherUser.name}</td>
//                 <td>{conv.equipment.title}</td>
//                 <td>{conv.lastMessage}</td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       navigate(`/equipment/chat/${conv.otherUser._id}/${conv.equipment._id}`)
//                     }
//                   >
//                     Reply
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMessages } from "../slices/messageSlice";

export default function Messages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { userMessages } = useSelector((state) => state.messages);

  const userId = userData?._id;

  const [uniqueConversations, setUniqueConversations] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMessages(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userMessages.length > 0 && userId) {
      const convMap = new Map();

      userMessages.forEach((msg) => {
        const otherUser = msg.sender._id === userId ? msg.receiver : msg.sender;
        const key = `${otherUser._id}-${msg.equipmentId._id}`;

        if (!convMap.has(key)) {
          convMap.set(key, {
            otherUser,
            equipment: msg.equipmentId,
            lastMessage: msg.content,
          });
        }
      });

      setUniqueConversations(Array.from(convMap.values()));
    }
  }, [userMessages, userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Messages</h2>

      {uniqueConversations.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 border-b">Sender</th>
                <th className="py-3 px-4 border-b">Equipment</th>
                <th className="py-3 px-4 border-b">Last Message</th>
                <th className="py-3 px-4 border-b">Response</th>
              </tr>
            </thead>
            <tbody>
              {uniqueConversations.map((conv, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b">{conv.otherUser.name}</td>
                  <td className="py-3 px-4 border-b">{conv.equipment.title}</td>
                  <td className="py-3 px-4 border-b">{conv.lastMessage}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() =>
                        navigate(`/equipment/chat/${conv.otherUser._id}/${conv.equipment._id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
