/* eslint-disable no-unused-vars */
import React from 'react';

const UserCard = ({ user, editFlag }) => {
  const { firstName, lastName, age, photoUrl, gender, about } = user;
  console.log('user', user);
  return (
    <div className="card bg-base-300 w-96 shadow-2xl border-s-amber-950 p-6 mb-20">
      <figure>
        <img
          // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ', ' + gender}</p>}
        <p>{about}</p>
        {!editFlag && (
          <div className="card-actions justify-center">
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-success">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
