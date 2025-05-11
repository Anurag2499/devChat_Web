/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [email, setEmail] = useState('anurag@gmail.com');
  const [password, setPassword] = useState('Anurag@123');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex my-50 justify-center mx-20">
      <div className="card bg-base-300 w-96">
        <div className="card-body items-center text-center">
          <h1 className="card-title">Login</h1>
          <div>
            <div className="form-control my-4">
              <div className=" flex flex-row items-start">
                <span className="label-text">Username</span>
              </div>
              <label className="input validator my-1">
                <svg
                  className="h-[1em] text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Email/Username"
                  // pattern="[A-Za-z][A-Za-`z0-9\-]*"
                  minLength="4"
                  maxLength="30"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value), setError('');
                  }}
                  title="Only letters, numbers or dash"
                  // className="text-gray-500"
                />
              </label>
            </div>

            <div className="form-control mt-4">
              <div className="flex flex-row items-start">
                <span className="label-text">Password</span>
              </div>
              <label className="input validator my-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[1em] text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.1 0 2-.9 2-2V7a2 2 0 00-4 0v2c0 1.1.9 2 2 2zm0 0v2m6 0a6 6 0 10-12 0v2a2 2 0 002 2h8a2 2 0 002-2v-2z"
                  />
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Password"
                  // className="text-gray-500"
                  className="text-"
                  minLength="6"
                  maxLength="30"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value), setError('');
                  }}
                  title="Only letters, numbers or dash"
                />
              </label>
            </div>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end mt-1">
            <button
              className="btn btn-outline btn-default"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
