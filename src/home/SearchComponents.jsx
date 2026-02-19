import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { CiCalculator1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoBedSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchComponents() {
  const [search,setSearch] = useState("");

  const handlesearch =(e)=>{
    e.preventDefault();
    console.log(search);
  }




  return (
    <div className="">
      <div>
        <h1 className="lg:text-5xl md:text-5xl font-bold text-center mt-10 m-5 p-6">
          Start Your Search
        </h1>
        <p className="text-xl font-bold m-7 p-4 text-center">
          Find your perfect rental with our intelligent search. We'll help you
          discover properties that match your lifestyle and budget.
        </p>

        <div className="flex items-center justify-center ">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}

              placeholder="Search by location, neighborhood or property type"
              className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button onClick={handlesearch}className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition">
              <CiSearch />
            </button>
          </div>
        </div>
        <div className="w-full mt-8 flex justify-center">
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Studio
                <FaHome />
              </Link>
            </li>

            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Bedroom
                <IoBedOutline />
              </Link>
            </li>

            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                2+ Bedroom
                <CiCalculator1 />
              </Link>
            </li>

            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Pet Friendly
                <CiHeart />
              </Link>
            </li>

            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Furnished
                <IoBedSharp />
              </Link>
            </li>

            <li>
              <Link
                to="/property-search"
                className="flex items-center gap-2 bg-gray-50 shadow-sm border border-gray-100 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Parking
                <FaCar />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchComponents;
