/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      //  console.log(res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold">No Connections!</h1>
      </div>
    );
  }
  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold">You have No Connections, Haha!!</h1>
      </div>
    );
  }
  console.log(connections);
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl text-center my-3">Connections</h1>
      </div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-sm w-full md:w-1/2 mx-auto my-3"
          >
            <figure className="ml-2">
              <img
                className="h-30 w-25 rounded-full"
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
