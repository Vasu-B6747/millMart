import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3045'); // Backend Socket.IO server

const Chat = () => {   //{ userId, receiverId }
    const {userData}=useSelector((state)=>{
        return state.user
    })
    const { id } = useParams(); // This will be the buyerId if seller is logged in
    console.log(id)
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
    const userId=userData._id
    const receiverId=id || '6821c6ea475a5a1a5d0d6f90'
    console.log(receiverId)
  useEffect(() => {
    // Join your room
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
      content: message,
    };
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
/*  
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:3045');

  useEffect(() => {
    socket.emit('join', userId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const handleSendMessage = () => {
    const message = {
      sender: userId,
      receiver: 'receiverId', // Replace with actual receiver ID
      content: newMessage,
    };
    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;

*/
