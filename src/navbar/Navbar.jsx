import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseenter,setMouseEnter] = useState(false);
  const navigate = useNavigate();

  

  // const [search, setSearch] = useState();

  // const handleSearch = ()=>{
  //    navigate(`/search?query=${search}`);

  //   console.log(search)
  // }

  return (
    <div className="bg-white  rounded-full font-bold text-sm  mt-6">
      <div className="flex justify-between items-center  px-4 md:px-6 py-2 shadow-sm">
        {/* Logo */}
        <div className="flex text-black text-lg font-bold">
          <img
            className="w-16 h-10"
            src="https://static.vecteezy.com/system/resources/previews/010/982/757/large_2x/house-icon-logo-illustration-home-symbol-template-for-graphic-and-web-design-collection-free-vector.jpg"
            alt=""
          />
          ToletForRent
        </div>

        {/* Desktop Menu */}
        <ul onMouseEnter={()=>setMouseEnter(true)}
            onMouseLeave={()=>setMouseEnter(false)}
            className={`rounded-lg transition ${mouseenter ? "bg-red-500 border-b-2":"bg-red-500 rounded-lg border border-b-2"}`}
         className="hidden md:flex items-center space-x-6  text-black">
          {/* Search */}
          {/* <li className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="outline-none bg-transparent text-sm w-32 lg:w-48"
            />
            <button onClick={handleSearch}>
              <CiSearch size={20} className="ml-2 text-gray-500" />
            </button>{" "}
          </li> */}

          <Link to="/property-search">
            <li>SearchProperty</li>
          </Link>
          <Link to="/property-details">
            <li>PropertyDetails</li>
          </Link>
          <Link className="whitespace-nowrap" to="/owner-dashboard">
            <li>Owner Dashboard</li>
          </Link>
          <Link to="/community">
            <li>Community</li>
          </Link>
          <Link to="/more">
            <li>More</li>
          </Link>

          {/* Notification */}
          <li className="relative">
            <IoMdNotifications size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </li>

          <li>
            <button onClick ={()=>navigate("/property-search")}  className="text-white px-5 py-2 bg-red-500 rounded-full hover:bg-red-600 transition">
              Book Now
            </button>
          </li>
           <li>
            <button onClick ={()=>navigate("/login")}  className="text-white px-5 py-2 bg-red-500 rounded-full hover:bg-red-600 transition">
              Login
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {isOpen ? (
            <HiX size={26} onClick={() => setIsOpen(false)} />
          ) : (
            <HiMenu size={26} onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* for Mobile  */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-lg p-4 space-y-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none bg-transparent text-sm w-full"
            />
            <CiSearch size={20} className="ml-2 text-gray-500" />
          </div>

          <Link to="/property-details" onClick={() => setIsOpen(false)}>
            <div>Property Details</div>
          </Link>

          <Link to="/Owner-dashboard" onClick={() => setIsOpen(false)}>
            <div>Owner Dashboard</div>
          </Link>

          <Link to="/Community" onClick={() => setIsOpen(false)}>
            <div>Community</div>
          </Link>

          <Link to="/more" onClick={() => setIsOpen(false)}>
            <div>More</div>
          </Link>

          <div className="flex items-center justify-between">
            <div className="relative">
              <IoMdNotifications size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            <button className="text-white px-5 py-2 bg-red-500 rounded-full w-full ml-4">
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
