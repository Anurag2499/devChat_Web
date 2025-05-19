/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return null;

  if (feedData.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold">No Users Available</h1>
      </div>
    );
  }

  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} editFlag={false} />
      </div>
    )
  );
};

export default Feed;
