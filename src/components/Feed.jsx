/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL, emptyFeedContent } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // 🔥 NEW: index for learning cards
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    );
  }

  // 🔥 EMPTY FEED → LEARNING MODE (WITH NEXT/PREV)
  if (!feedData || feedData.length === 0) {
    const currentCard = emptyFeedContent[currentIndex];

    const handleNext = () => {
      if (currentIndex < emptyFeedContent.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    };

    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-pink-500 via-red-400 to-orange-400">
        {/* Header */}
        <h1 className="text-white text-2xl font-bold mb-2">
          No Users Found 👀
        </h1>

        <p className="text-white/80 mb-6 text-center">
          Learn something while you wait 🚀
        </p>

        {/* Card */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl transition-all">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800">{currentCard.title}</h2>

            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
              {currentCard.tag}
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {currentCard.text}
          </p>

          {/* Progress */}
          <p className="text-xs text-gray-400 mt-4 text-right">
            {currentIndex + 1} / {emptyFeedContent.length}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-full font-medium transition ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-pink-600 hover:scale-105'
            }`}
          >
            ⬅ Prev
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === emptyFeedContent.length - 1}
            className={`px-4 py-2 rounded-full font-medium transition ${
              currentIndex === emptyFeedContent.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-pink-600 hover:scale-105'
            }`}
          >
            Next ➡
          </button>
        </div>
      </div>
    );
  }

  // 🔥 MAIN FEED
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-4 pb-20">
      <p className="text-white/80 text-sm mb-4">
        👉 Swipe or connect with developers
      </p>

      <div className="w-full max-w-sm">
        <UserCard user={feedData[0]} editFlag={false} />
      </div>
    </div>
  );
};

export default Feed;
