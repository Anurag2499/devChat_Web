/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        'http://localhost:7777/profile/edit',
        { firstName, lastName, age, gender, about, photoUrl },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('res', res);
      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 align-center">
      <legend className="fieldset-legend">Edit Profile</legend>

      <label className="label">First name: </label>
      <input
        type="text"
        className="input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label className="label">Last name: </label>
      <input
        type="text"
        className="input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label className="label">Age : </label>
      <input
        type="number"
        className="input"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label className="label">Gender : </label>
      <input
        type="text"
        className="input"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <label className="label">About : </label>
      <input
        type="text"
        className="input"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <label className="label">Photo URL : </label>
      <input
        type="text"
        className="input"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        className="btn btn-primary my-3 w-40 mx-auto"
        onClick={() => saveProfile()}
      >
        Save Profile
      </button>
    </fieldset>
  );
};

export default EditProfile;
