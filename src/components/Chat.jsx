import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chat = () => {
  const { targetUserId } = useParams();
  const [targetUserName, setTargetUserName] = useState('');
  const [targetUserImg, setTargetUserImg] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatDisabled, setChatDisabled] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const isOnline = onlineUsers.includes(targetUserId);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userName = user?.firstName;
  const userImg = user?.photoUrl;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit('chatOnline', { userId });

    socket.on('chatOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => socket.disconnect();
  }, [userId]);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const messages = res.data.messages;
      const otherDetails = res.data.participants.find(
        (p) => p._id === targetUserId,
      );

      setTargetUserName(otherDetails?.firstName || 'User');
      setTargetUserImg(
        otherDetails?.photoUrl ||
          'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      );

      const formatted = messages.map((msg) => ({
        userName: msg?.senderId?.firstName,
        userImg: msg?.senderId?.photoUrl,
        text: msg?.text,
        isOwn: msg?.senderId?._id === userId,
      }));

      setMessages(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchChatMessages();
  }, [userId]);

  useEffect(() => {
    if (!user) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit('joinChat', {
      username: userName,
      userId,
      targetUserId,
    });

    newSocket.on(
      'receiveMessage',
      ({ userName, userImg, loggedInUserId, text }) => {
        setMessages((prev) => [
          ...prev,
          { userName, text, isOwn: loggedInUserId === userId, userImg },
        ]);
      },
    );

    return () => newSocket.disconnect();
  }, [user, userId, targetUserId]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !socket) return;

    socket.emit('sendMessage', {
      userName,
      userImg,
      userId,
      targetUserId,
      text: inputValue,
    });

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (messages.length > 30) setChatDisabled(true);
  }, [messages]);

  return (
    <div className="h-full flex justify-center items-start px-2 pt-4 pb-4 bg-[#0f172a]">
      <div className="w-full max-w-2xl h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* 🔥 HEADER */}
        <div className="flex items-center gap-3 p-4 bg-gray-900 border-b border-gray-700">
          <div className="relative">
            <img
              src={targetUserImg}
              className="w-10 h-10 rounded-full object-cover"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
            )}
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg">
              {targetUserName}
            </h2>
            <p className="text-xs text-gray-400">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* 🔥 MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          {messages.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              Start the conversation 👋
            </p>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[75%]">
                {!msg.isOwn && (
                  <img
                    src={msg.userImg || targetUserImg}
                    className="w-7 h-7 rounded-full"
                  />
                )}

                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                    msg.isOwn
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  <p className="text-[10px] opacity-60 text-right mt-1">
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {msg.isOwn && (
                  <img
                    src={msg.userImg || userImg}
                    className="w-7 h-7 rounded-full"
                  />
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* 🔥 INPUT */}
        <div className="p-3 bg-gray-900 border-t border-gray-700 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatDisabled}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
