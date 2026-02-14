import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function Navbar() {
  return (
    <div className="bg-white rounded-full font-bold text-sm ">
      <div className="flex justify-between items-center border border-gray-100 rounded-full px-6 py-1 mt-10">
        <div className="text-black text-lg font-bold">ToletForRent</div>

        <ul className="flex items-center space-x-8 text-black">
          <li className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent text-sm"
            />
            <CiSearch size={20} className="ml-2 text-gray-500" />
          </li>

          <li>Property Details</li>
          <li>Owner Dashboard</li>
          <li>Community </li>
          <li>...more</li>

          <li className="relative">
            <IoMdNotifications size={24} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </li>

          <li>
            <button className="font-bold text-white px-6 py-2 bg-red-500 rounded-full">
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
