/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit('join', { userId });
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchConnections();
  }, []);

  // 🔥 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    );
  }

  // 🔥 Empty State
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-6">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-2">
            No Connections Yet 💔
          </h1>

          <p className="text-white/70 text-sm mb-4">
            Start connecting with people to see them here.
          </p>

          <Link
            to="/"
            className="btn bg-white text-pink-500 rounded-xl px-6 hover:scale-105 transition"
          >
            🔍 Explore Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-4 pb-24">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center py-6">
        Your Connections ❤️
      </h1>

      {/* List */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            connection;

          const isOnline = onlineUsers.includes(_id);

          return (
            <div
              key={_id}
              className="flex items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-lg"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      photoUrl ||
                      `https://ui-avatars.com/api/?name=${firstName}`
                    }
                    alt="user"
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  {/* Online Dot */}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div>
                  <h2 className="text-white font-semibold text-lg">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <p className="text-white/70 text-sm">
                      {age}, {gender}
                    </p>
                  )}

                  {about && (
                    <p className="text-white/60 text-xs line-clamp-1">
                      {about}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Chat Button */}
              <Link
                to={`/chat/${_id}`}
                className="btn btn-sm bg-white text-pink-500 rounded-xl hover:scale-105 transition"
              >
                💬 Chat
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
