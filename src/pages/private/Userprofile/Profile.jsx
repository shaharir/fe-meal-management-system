import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.profile.user);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl space-y-6">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="avatar avatar-online">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-3xl font-bold">
            {profile?.name?.slice(0, 2)?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="">{profile.roles.join(", ")}</p>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span className="">{profile.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Mobile:</span>
          <span className="">{profile.mobile}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Room No:</span>
          <span className="">{profile.roomNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Roles:</span>
          <span className="">{profile.roles.join(", ")}</span>
        </div>
      </div>

      {/* Optional: Edit Button */}
      <div className="flex justify-center mt-4">
        <button className="btn btn-primary px-6 py-2 rounded-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
