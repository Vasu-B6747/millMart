import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchMessages,createMessage } from '../slices/messageSlice';
import axios from '../configure/baseURL'

const socket = io('http://localhost:3045'); // Backend Socket.IO server

const Chat = () => {   //{ userId, receiverId }
    const {userData}=useSelector((state)=>{
        return state.user
    })
    const dispatch=useDispatch()
    const { recId,id } = useParams(); // This will be the buyerId if seller is logged in
    // console.log(recId,id)
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
    const userId=userData._id
    const receiverId=recId || '6821c6ea475a5a1a5d0d6f90'
    console.log(receiverId,userId)
    const {messages} = useSelector((state) => state.messages);

useEffect(() => {
  if (messages?.length > 0) {
    setChat(messages);
  }
}, [messages]);
  useEffect(() => {
    // Join your room
    dispatch(fetchMessages(userId))
    socket.emit('join', userId);

    // Listen for incoming messages
    socket.on('newMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    const msgData = {
      sender: userId,
      receiver: { _id: receiverId },
      equipmentId:id,
      content: message,
    };
    dispatch(createMessage(msgData))
    socket.emit('sendMessage', msgData);
    setChat((prev) => [...prev, msgData]); // Also update local view
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h3>Chat</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', textAlign: msg.sender === userId ? 'right' : 'left' }}>
            <span><strong>{msg.sender === userId ? 'You' : 'Them'}:</strong> {msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '8px' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Send</button>
    </div>
  );
};

export default Chat;
