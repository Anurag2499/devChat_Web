import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 400) {
        navigate('/login');
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavBar />

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
