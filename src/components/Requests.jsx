import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + requestId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(requestId));
      console.log(res.data);
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
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold">No Requests Left!</h1>
      </div>
    );
  }
  console.log(requests);
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl text-center my-3">All Requests</h1>
      </div>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-sm w-full md:w-1/2 mx-auto my-3"
          >
            <figure className="ml-2">
              <img
                className="h-30 rounded-full"
                src={photoUrl}
                alt="ProfilePic"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + ' ' + lastName}</h2>
              {age && gender && (
                <p>
                  {age} years, {gender}
                </p>
              )}
              <p>{about}</p>
              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest('rejected', request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Requests;
