import { useState } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-10 text-2xl">
        <Link to={'/settings'} className="text-xl"><FaArrowLeft className="text-[#00A430] mr-2 cursor-pointer" /></Link>

        <h2 className="text-[#00A430]  font-semibold">
          Personal Information
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Left Profile Upload Section */}
        <label
          htmlFor="profileImage"
          className="bg-[#00A430] rounded-xl flex flex-col items-center justify-center w-full md:w-1/3 py-10 cursor-pointer hover:bg-green-700 transition"
        >
          {/* Image Preview */}
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
              <FaCamera className="text-gray-600 text-xl" />
            </div>
          )}

          <div className="bg-[#00A430] text-white px-3 py-1 rounded-md">
            Profile
          </div>
          <p className="text-white mt-2 text-lg font-semibold">Admin</p>

          {/* Hidden Input */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Right Form */}
        <div className="flex-1 justify-end w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#00A430] rounded-md px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#00A430] rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
<div className="flex justify-end items-end ">
<button className="bg-[#00A430] hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
            Save & Exit
          </button>
</div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
