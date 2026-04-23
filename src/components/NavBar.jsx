/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

const themes = ['dark', 'light', 'aqua', 'valentine', 'coffee'];

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const requestCount = requests?.length || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'dark',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  }, [selectedTheme]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 🔥 TOP NAVBAR */}
      <div className="navbar sticky top-0 z-50 bg-base-300/90 backdrop-blur-md shadow-lg px-4">
        <div className="flex-1 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            DevChat 🚀
          </Link>

          {/* 🔥 MOBILE RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:hidden">
            {/* ♟️ CHESS */}
            <a
              href="https://playchess-anurag.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs btn-circle bg-white text-black shadow-md"
            >
              ♟️
            </a>

            {/* 🔴 LOGOUT */}
            <button
              onClick={handleLogout}
              className="btn btn-xs btn-circle bg-red-500 text-white shadow-md"
            >
              ⎋
            </button>
          </div>
        </div>

        {/* DESKTOP MENU */}
        {user && (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/" className="btn btn-ghost btn-sm">
              Home
            </Link>

            <Link to="/connections" className="btn btn-ghost btn-sm">
              🤝 Connections
            </Link>

            <Link to="/requests" className="btn btn-ghost btn-sm relative">
              🔔 Requests
              {requestCount > 0 && (
                <span className="badge badge-error badge-xs absolute -top-1 -right-2">
                  {requestCount}
                </span>
              )}
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                  <img src={user.photoUrl} alt="user" />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
                <li>
                  <Link to="/profile">Edit Profile</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 MOBILE NAV */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-t shadow-lg flex justify-around items-center py-3 md:hidden z-50">
          {/* HOME */}
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 transition ${
              isActive('/') ? 'text-green-400 scale-110' : 'text-gray-700'
            }`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-[11px] font-medium">Home</span>
          </Link>

          {/* CONNECTIONS */}
          <Link
            to="/connections"
            className={`flex flex-col items-center gap-1 transition ${
              isActive('/connections')
                ? 'text-green-400 scale-110'
                : 'text-gray-700'
            }`}
          >
            <span className="text-2xl">🤝</span>
            <span className="text-[11px] font-medium">Connections</span>
          </Link>

          {/* CENTER BADGE */}
          <div className="flex flex-col items-center">
            <span className="text-lg animate-pulse">🚀</span>
            <span className="text-[10px] font-semibold text-primary">
              Anurag
            </span>
          </div>

          {/* REQUESTS */}
          <Link
            to="/requests"
            className={`relative flex flex-col items-center gap-1 transition ${
              isActive('/requests')
                ? 'text-green-400 scale-110'
                : 'text-gray-700'
            }`}
          >
            <span className="text-2xl">🔔</span>

            {requestCount > 0 && (
              <span className="absolute -top-1 right-3 badge badge-error badge-xs">
                {requestCount}
              </span>
            )}

            <span className="text-[11px] font-medium">Requests</span>
          </Link>

          {/* 🔥 PROFILE (DIRECT NAVIGATION) */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition ${
              isActive('/profile')
                ? 'text-green-400 scale-110'
                : 'text-gray-700'
            }`}
          >
            <span className="text-2xl">👤</span>
            <span className="text-[11px] font-medium">Profile</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavBar;
