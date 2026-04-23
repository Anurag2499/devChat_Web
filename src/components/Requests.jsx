import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { Link } from 'react-router-dom';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + '/request/review/' + status + '/' + requestId,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/review', {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
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
  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-6">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-2">No Requests 🎉</h1>

          <p className="text-white/70 text-sm mb-4">
            You're all caught up! No pending requests.
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
        Requests 🔔
      </h1>

      {/* List */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-lg"
            >
              {/* Top Section */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    photoUrl || `https://ui-avatars.com/api/?name=${firstName}`
                  }
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="flex-1">
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

              {/* 🔥 Action Buttons */}
              <div className="flex justify-between mt-4 gap-3">
                {/* Reject */}
                <button
                  onClick={() => reviewRequest('rejected', request._id)}
                  className="btn flex-1 bg-white text-red-500 rounded-xl hover:scale-105 active:scale-95 transition"
                >
                  ❌ Reject
                </button>

                {/* Accept */}
                <button
                  onClick={() => reviewRequest('accepted', request._id)}
                  className="btn flex-1 bg-white text-green-500 rounded-xl hover:scale-105 active:scale-95 transition"
                >
                  ❤️ Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
