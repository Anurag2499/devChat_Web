/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { use, useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData.data[4]} />
      </div>
    )
  );
};

export default Feed;
