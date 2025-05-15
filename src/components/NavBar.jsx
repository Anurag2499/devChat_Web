/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
const themes = ['dark', 'light', 'aqua', 'valentine', 'coffee'];

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  }, [selectedTheme]);

  //   this is the handle theme dynamic value setting
  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        // BASE_URL + '/logout',
        'http://localhost:7777/logout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleHome = () => {
    try {
      if (!user) {
        console.log('user not present');
        navigate('/login');
      } else navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className="navbar bg-base-300 shadow-lg">
      <div className="flex-1 ">
        <a
          onClick={() => handleHome()}
          // to="/"
          className="btn btn-ghost text-xl hover:bg-base-200"
        >
          DevChat
        </a>
      </div>
      <div className="flex gap-2">
        {/* this is the theme dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            {capitalize(selectedTheme)}
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-10 w-44 p-2 shadow-2xl"
          >
            {themes.map((theme) => (
              <li key={theme}>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    value={theme}
                    checked={selectedTheme === theme}
                    onChange={handleThemeChange}
                    aria-label={capitalize(theme)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* this is the profile pic */}
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center ">
            <p className="mx-2 ">Welcome, {user.firstName} </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link onClick={() => handleLogout()}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
