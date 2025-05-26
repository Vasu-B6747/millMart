// import { useEffect, useState } from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import { fetchMessages,createMessage } from '../slices/messageSlice';
// import axios from '../configure/baseURL'

// const socket = io('http://localhost:3045'); // Backend Socket.IO server

// const Chat = () => {   //{ userId, receiverId }
//     const {userData}=useSelector((state)=>{
//         return state.user
//     })
//     const dispatch=useDispatch()
//     const { recId,id } = useParams(); // This will be the buyerId if seller is logged in
//     // console.log(recId,id)
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//     const userId=userData._id
//     const receiverId=recId 
//     console.log(receiverId,userId)
//     const {messages} = useSelector((state) => state.messages);

// useEffect(() => {
//   if (messages?.length > 0) {
//     setChat(messages);
//   }
// }, [messages]);
//   useEffect(() => {
//     // Join your room
//     dispatch(fetchMessages(userId))
//     socket.emit('join', userId);

//     // Listen for incoming messages
//     socket.on('newMessage', (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   const sendMessage = () => {
//     const msgData = {
//       sender: userId,
//       receiver:  receiverId ,
//       equipmentId:id,
//       content: message,
//     };
//     console.log(msgData)
//     dispatch(createMessage(msgData))
//     socket.emit('sendMessage', msgData);
//     // setChat((prev) => [...prev, msgData]); // Also update local view
//     setMessage('');
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px' }}>
//       <h3>Chat</h3>
//       <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
//         {chat.map((msg, index) => (
//           <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === userId ? 'right' : 'left' }}>
//             <span><strong>{msg.sender === userId ? 'You' : 'Them'}:</strong> {msg.content}</span>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         style={{ width: '80%', padding: '8px' }}
//       />
//       <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Send</button>
//     </div>
//   );
// };

// export default Chat;
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import { fetchMessages, createMessage } from '../slices/messageSlice';

// // Socket.IO client connection
// const socket = io('http://localhost:3045');

// const Chat = () => {
//   const dispatch = useDispatch();
//   const { recId, id } = useParams(); // receiverId and equipmentId from route
//   const { userData } = useSelector((state) => state.user);
//   const { messages } = useSelector((state) => state.messages);

//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);

//   const userId = userData?._id;
//   const receiverId = recId || '6821c6ea475a5a1a5d0d6f90';

//  useEffect(() => {
//   if (userId && messages?.length > 0) {
//     const filtered = messages.filter(
//       (msg) =>
//         (msg.sender === userId && msg.receiver === receiverId) ||
//         (msg.sender === receiverId && msg.receiver === userId)
//     );
//     setChat(filtered);
//   }
// }, [messages, userId, receiverId]);


//   useEffect(() => {
//     if (!userId) return;

//     dispatch(fetchMessages(userId)); // Load chat history from Redux
//     socket.emit('join', userId);     // Join user's private room

//     socket.on('newMessage', (msg) => {
//       // Avoid duplicates by checking message ID (if present)
//       setChat((prev) => {
//         const exists = prev.some(m => m._id === msg._id);
//         return exists ? prev : [...prev, msg];
//       });
//     });

//     return () => {
//       socket.off('newMessage');
//       socket.disconnect();
//     };
//   }, [userId]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       sender: userId,
//       receiver: receiverId,
//       equipmentId: id,
//       content: message,
//     };

//     dispatch(createMessage(msgData));        // Save to DB and trigger backend socket emit
//     // socket.emit('sendMessage', msgData);     // Optional: trigger client socket
//     socket.on('newMessage', (msg) => {
//   setChat((prev) => {
//     const exists = prev.some(m => m._id === msg._id);
//     return exists ? prev : [...prev, msg];
//   });
// });
//     setMessage('');
//   };
// if (!userId) return <div>Loading user...</div>;

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px' }}>
//       <h3>Chat</h3>
//       <div
//         style={{
//           border: '1px solid #ccc',
//           padding: '10px',
//           height: '300px',
//           overflowY: 'scroll',
//         }}
//       >
//         {/* {chat.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: '10px',
//               textAlign: msg.sender === userId ? 'right' : 'left',
//             }}
//           >
//             <span>
//               <strong>{msg.sender === userId ? 'You' : 'Them'}:</strong>{' '}
//               {msg.content}
//             </span>
//           </div>
//         ))} */}
//         {chat.map((msg, index) => {
//   const isMine = msg.sender === userId;
//   return (
//     <div
//       key={index}
//       style={{
//         marginBottom: '10px',
//         textAlign: isMine ? 'right' : 'left',
//       }}
//     >
//       <span>
//         <strong>{isMine ? 'You' : 'Them'}:</strong> {msg.content}
//       </span>
//     </div>
//   );
// })}

//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         style={{ width: '80%', padding: '8px' }}
//       />
//       <button onClick={sendMessage} style={{ padding: '8px 16px' }}>
//         Send
//       </button>
//     </div>
//   );
// };

// export default Chat;
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchConversation, createMessage } from '../slices/messageSlice';

// Socket.IO client connection (consider moving this outside component to avoid reconnects)
const socket = io('http://localhost:3045');

const Chat = () => {
  const dispatch = useDispatch();
  const { recId, id } = useParams(); // recId = receiverId, id = equipmentId
  const { userData } = useSelector((state) => state.user);
  const { messages, loading, error } = useSelector((state) => state.messages);

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const userId = userData?._id;
  const receiverId = recId || '6821c6ea475a5a1a5d0d6f90'; // fallback receiverId

  // Load conversation messages on mount or when user/receiver changes
  useEffect(() => {
    if (!userId) return;

    dispatch(fetchConversation({ userId, receiverId }));
    socket.emit('join', userId);

    socket.on('newMessage', (msg) => {
      // Append only new messages (avoid duplicates)
      setChat((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [userId, receiverId, dispatch]);

  // Sync Redux messages to local chat state
  useEffect(() => {
    if (messages?.length > 0) {
      setChat(messages);
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: userId,
      receiver: receiverId,
      equipmentId: id,
      content: message,
    };

    dispatch(createMessage(msgData));
    setMessage('');
  };

  if (!userId) return <div>Loading user...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h3>Chat</h3>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '300px',
          overflowY: 'scroll',
        }}
      >
        {chat.map((msg) => {
          const isMine = msg.sender === userId;
          return (
            <div
              key={msg._id || msg.createdAt} // fallback keys for safety
              style={{ marginBottom: '10px', textAlign: isMine ? 'right' : 'left' }}
            >
              <span>
                <strong>{isMine ? 'You' : 'Them'}:</strong> {msg.content}
              </span>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '8px' }}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>
        Send
      </button>
      {loading && <p>Loading messages...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Chat;

