/* eslint-disable no-unused-vars */
import React from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user, editFlag }) => {
  const { _id, firstName, lastName, age, photoUrl, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl">
      {/* 🔥 Image */}
      <img
        src={photoUrl || 'https://via.placeholder.com/400'}
        alt="user"
        className="w-full h-full object-cover"
      />

      {/* 🔥 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      {/* 🔥 User Info */}
      <div className="absolute bottom-20 left-4 right-4 text-white">
        <h2 className="text-2xl font-bold">
          {firstName} {lastName}
          {age && <span className="font-normal">, {age}</span>}
        </h2>

        {gender && <p className="text-sm opacity-80 capitalize">{gender}</p>}

        {about && (
          <p className="text-sm mt-2 line-clamp-2 opacity-90">{about}</p>
        )}
      </div>

      {/* 🔥 Action Buttons */}
      {!editFlag && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-6">
          {/* Skip */}
          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="px-5 py-2 rounded-full bg-white/90 text-gray-800 font-medium shadow-lg backdrop-blur-md 
      hover:scale-105 active:scale-95 transition"
          >
            Skip
          </button>

          {/* Interested */}
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 
      text-white font-medium shadow-lg hover:scale-105 active:scale-95 transition"
          >
            🤝 Interested
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
