/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { emptyFeed } from '../utils/feedSlice';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        { emailId: email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      dispatch(emptyFeed());
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-4 py-6 sm:px-6">
      <div className="card w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-3xl">
        <div className="card-body text-center px-6 py-8 sm:px-8 sm:py-10">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back ❤️' : 'Create Account 🔥'}
          </h1>

          <p className="text-white/70 text-xs sm:text-sm mb-4">
            {isLogin ? 'Login to continue' : 'Start your journey'}
          </p>

          {/* Form */}
          <div className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError('');
                  }}
                  className="input input-bordered w-full rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-400 focus:scale-[1.02] transition-all duration-200"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError('');
                  }}
                  className="input input-bordered w-full rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-400 focus:scale-[1.02] transition-all duration-200"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="input input-bordered w-full rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-400 focus:scale-[1.02] transition-all duration-200"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="input input-bordered w-full rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-pink-400 focus:scale-[1.02] transition-all duration-200"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-200 text-sm mt-3">{error}</p>}

          {/* Button */}
          <button
            onClick={isLogin ? handleLogin : handleSignUp}
            className="btn w-full mt-6 bg-white text-pink-500 font-semibold rounded-xl py-3 text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {/* Toggle */}
          <p
            className="text-xs sm:text-sm text-white/80 mt-5 cursor-pointer hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin
              ? 'New here? Create an account'
              : 'Already have an account? Login'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
