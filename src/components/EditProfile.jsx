/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState('');
  const [dataSaved, setDataSaved] = useState('');
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  //saving the profile
  const saveProfile = async () => {
    setError('');
    setDataSaved('');
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
      console.log('asdf', res.data.user);
      dispatch(addUser(res.data.user));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      // setDataSaved('Profile updated successfully!');
    } catch (err) {
      console.log('err', err);
      console.log('err', err.response.data);
      setError(err?.response?.data || 'Something went wrong!');
    }
  };

  return (
    <div className="">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 align-center mx-8 my-10">
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
        <select
          className="select select-bordered w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          {/* <option value="">Select Gender</option> */}
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label className="label">Photo URL : </label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <label className="label">About : </label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4} // You can adjust the number of rows
          placeholder="Tell us something about yourself..."
        ></textarea>
        {error && <p className="text-red-500">{error}</p>}
        {/* {dataSaved && <p className="text-green-500">{dataSaved}</p>} */}
        <button
          className="btn btn-primary my-3 w-40 mx-auto"
          onClick={() => saveProfile()}
        >
          Save Profile
        </button>
      </fieldset>
      <UserCard
        user={{ firstName, lastName, age, photoUrl, gender, about }}
        editFlag={true}
      />
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
