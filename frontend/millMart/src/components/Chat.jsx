import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Send, LoaderCircle } from 'lucide-react';
import { fetchConversation, createMessage } from '../slices/messageSlice';

// Initialize socket (put outside component if needed)
const socket = io('http://localhost:3045');

const Chat = () => {
  const dispatch = useDispatch();
  const { recId, id } = useParams(); // receiverId and equipmentId
  const { userData } = useSelector((state) => state.user);
  const { messages, loading, error } = useSelector((state) => state.messages);

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  const userId = userData?._id;
  const receiverId = recId || '6821c6ea475a5a1a5d0d6f90'; // fallback

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Fetch conversation & setup socket
  useEffect(() => {
    if (!userId) return;

    dispatch(fetchConversation({ userId, receiverId }));
    socket.emit('join', userId);

    socket.on('newMessage', (msg) => {
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

  // Update chat state from Redux
  useEffect(() => {
    if (messages?.length) {
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

  if (!userId) return <div className="p-6 text-center text-gray-600">Loading user...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Chat with Seller</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-100">
        {chat.map((msg) => {
          const isMine = msg.sender === userId;
          return (
            <div
              key={msg._id || msg.createdAt}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  isMine
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div  />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
            title="Send"
          >
            <Send size={18} />
          </button>
        </div>
        {loading && (
          <div className="flex justify-center mt-2 text-indigo-500">
            <LoaderCircle className="animate-spin" size={20} />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
