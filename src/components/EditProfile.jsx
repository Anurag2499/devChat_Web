/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  // 🔥 Image Upload (Cloudinary)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_using_cloudinary");
      data.append("cloud_name", "dxnj6knr8");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxnj6knr8/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();
      setPhotoUrl(uploadedImage.secure_url);
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🔥 Save Profile
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      setToast(true);

      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 px-4 py-6 pb-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🔥 LEFT: FORM */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Edit Profile ✏️
          </h2>

          {/* 🔥 PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={
                  photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition">
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {uploading && (
              <p className="text-white text-sm">Uploading image...</p>
            )}

            <p className="text-white text-sm opacity-80">
              Upload Profile Photo
            </p>
          </div>

          {/* 🔥 FORM */}
          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-white/90 text-gray-800"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-white/90 text-gray-800"
              />
            </div>

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-white/90 text-gray-800"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full rounded-xl bg-white/90 text-gray-800"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <textarea
              placeholder="Tell something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full rounded-xl bg-white/90 text-gray-800"
              rows={4}
            />

            {/* Error */}
            {error && <p className="text-red-200 text-sm">{error}</p>}

            {/* Save Button */}
            <button
              onClick={saveProfile}
              className="btn w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl py-3 hover:scale-105 active:scale-95 transition shadow-lg"
            >
              💾 Save Profile
            </button>
          </div>
        </div>

        {/* 🔥 RIGHT: LIVE PREVIEW */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-sm">
            <UserCard
              user={{ firstName, lastName, age, photoUrl, gender, about }}
              editFlag={true}
            />
          </div>
        </div>
      </div>

      {/* 🔥 Toast */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-white text-green-600 shadow-lg">
            <span>✅ Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;