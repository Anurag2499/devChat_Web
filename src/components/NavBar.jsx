/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';

const themes = ['dark', 'light', 'aqua', 'valentine', 'coffee'];

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const requestCount = requests?.length || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {/* 🔥 TOP NAVBAR */}
      <div className="navbar sticky top-0 z-50 bg-base-300/90 backdrop-blur-md shadow-lg px-4">
        {/* LEFT - LOGO */}
        <div className="flex-1 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            DevChat 🚀
          </Link>

          {/* 🔥 MOBILE RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:hidden">
            {/* ♟️ CHESS GAME LINK */}
            <a
              href="https://playchess-anurag.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs btn-circle bg-white text-black shadow-md"
              title="Play Chess"
            >
              ♟️
            </a>
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

            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="select select-bordered select-sm"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {capitalize(theme)}
                </option>
              ))}
            </select>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                  <img src={user.photoUrl} alt="user" />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 MOBILE BOTTOM NAV */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-t shadow-md flex justify-around items-center py-2 md:hidden z-50">
          <Link to="/" className="flex flex-col items-center text-xs">
            🏠
            <span>Home</span>
          </Link>

          <Link
            to="/connections"
            className="flex flex-col items-center text-xs"
          >
            🤝
            <span>Connections</span>
          </Link>

          {/* 🔥 YOUR NAME BADGE */}
          <div className="flex flex-col items-center text-xs">
            <div className="text-[10px] font-semibold text-primary">
              Developer 🚀
            </div>
            <span className="text-[10px] text-gray-500">Anurag</span>
          </div>

          <Link
            to="/requests"
            className="flex flex-col items-center text-xs relative"
          >
            🔔
            {requestCount > 0 && (
              <span className="badge badge-error badge-xs absolute -top-1 right-2">
                {requestCount}
              </span>
            )}
            <span>Requests</span>
          </Link>

          {/* PROFILE MENU */}
          <div className="dropdown dropdown-top">
            <label
              tabIndex={0}
              className="flex flex-col items-center text-xs cursor-pointer"
            >
              👤
              <span>Profile</span>
            </label>

            <ul className="menu menu-sm dropdown-content mb-2 p-2 shadow bg-base-100 rounded-box w-40">
              <li>
                <Link to="/profile">View Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
