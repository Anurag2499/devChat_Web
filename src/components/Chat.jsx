import React, { useEffect, useState } from 'react';
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
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const userName = user?.firstName;
  const userImg = user?.photoUrl;

  //this useEffect will run when the component mounts and will establish a socket connection to the server. It emits a 'joinChat' event with the userId and targetUserId to join the appropriate chat room. When the component unmounts, it disconnects the socket to clean up resources.
  const [socket, setSocket] = useState(null);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });

      console.log('Fetched chat messages:', res.data);
      const messages = res.data.messages;
      const otherDetails = res.data.participants.find(
        (participant) => participant._id === targetUserId,
      );

      setTargetUserName(otherDetails?.firstName || 'Unknown User');
      setTargetUserImg(
        otherDetails?.photoUrl ||
          'https://png.pngtree.com/png-vector/20240121/ourmid/pngtree-a-school-boy-white-background-png-image_11510916.png',
      );

      const messgesDetails = messages.map((msg) => {
        return {
          userName: msg?.senderId?.firstName,
          userImg: msg?.senderId?.photoUrl,
          text: msg?.text,
          isOwn: msg?.senderId?._id === userId,
        };
      });
      setMessages(messgesDetails);
      //   setMessages(res.data.data);
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
    console.log('Socket receiveMessage listener set up');
    newSocket.emit('joinChat', {
      username: user?.firstName,
      userId,
      targetUserId,
    });
    console.log('Socket connected');

    newSocket.on(
      'receiveMessage',
      ({ userName, userImg, loggedInUserId, text }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { userName, text, isOwn: loggedInUserId === userId, userImg },
        ]);
      },
    );

    return () => {
      newSocket.disconnect();
      setSocket(null);
      console.log('Socket disconnected');
    };
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
    //     setMessages((prevMessages) => [
    //       ...prevMessages,
    //       { userName, text: inputValue, isOwn: true, userImg },
    //     ]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  const messagesEndRef = React.useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="chat-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        padding: '10px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        {/*  Header part*/}
        <div
          className="chat-header"
          style={{
            padding: '10px',
            borderBottom: '1px solid',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            Chat with {targetUserName || 'User'}
          </h1>
        </div>
        {/* body and message fields */}
        <div
          className="chat-messages"
          style={{ flex: 1, overflowY: 'auto', padding: '10px' }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat ${msg.isOwn ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      msg.isOwn
                        ? msg.userImg ||
                          'https://png.pngtree.com/png-vector/20240121/ourmid/pngtree-a-school-boy-white-background-png-image_11510916.png'
                        : targetUserImg
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.userName}
                <time className="text-xs opacity-50">
                  {new Date().toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">
                {msg.isOwn ? 'Delivered' : 'Received'}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* button fields */}
        <div
          className="chat-input-area"
          style={{
            display: 'flex',
            gap: '10px',
            flexShrink: 0,
            padding: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Enter your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={!user}
            style={{ flex: 1, padding: '8px' }}
          />
          <button
            className="btn btn-neutral"
            onClick={handleSendMessage}
            disabled={!user || !inputValue.trim()}
            style={{ padding: '8px 16px' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
