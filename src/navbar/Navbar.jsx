import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseenter, setMouseEnter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Uncomment this

  const [user, setUser] = useState(null);

  // Load user from localStorage when component mounts or location changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]); // Re-run when route changes (in case user logs in/out)

  return (
    <div className="bg-white rounded-full font-bold text-sm mt-6">
      <div className="flex justify-between items-center px-4 md:px-6 py-2 shadow-sm">
        {/* Logo */}
        <div className="flex ml-15 text-black text-lg font-bold">
          <img className="w-24 h-14  rounded-xl" src="/toletforrentlogo.jfif" alt="" />
        </div>

        {/* Desktop Menu */}
        <ul
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          className={`hidden md:flex items-center space-x-6 text-black rounded-lg transition ${
            mouseenter ? " " : " "
          }`}
        >
          <Link to="/property">
            <li>SearchProperty</li>
          </Link>
          {/* <Link to="/property-details">
            <li>PropertyDetails</li>
          </Link> */}
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
            <button
              onClick={() => navigate("/property")}
              className="text-white px-5 py-2 bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              Book Now
            </button>
          </li>

          {/* User Profile Section */}
          {user ? (
            <li className="relative group">
              {/* Profile Circle - Show user's first letter or name */}
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer font-semibold text-lg">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email
                    ? user.email.charAt(0).toUpperCase()
                    : "U"}
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || ""}
                  </p>
                </div>

                {/* Dashboard Link */}
                {/* <div
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate("/owner-dashboard");
                    setIsOpen(false);
                  }}
                >
                  Dashboard
                </div> */}

                {/* Profile Link (optional) */}
                {/* <div
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                >
                  My Profile
                </div> */}

                {/* Logout Button */}
                <div
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-red-500 border-t border-gray-200"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/login");
                  }}
                >
                  Logout
                </div>
              </div>
            </li>
          ) : (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="text-white px-5 py-2 bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                Login
              </button>
            </li>
          )}
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

      {/* Mobile Menu */}
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

          {/* <Link to="/property-details" onClick={() => setIsOpen(false)}>
            <div className="py-2">Property Details</div>
          </Link> */}

          {/* <Link to="/owner-dashboard" onClick={() => setIsOpen(false)}>
            <div className="py-2">Owner Dashboard</div>
          </Link> */}

          <Link to="/community" onClick={() => setIsOpen(false)}>
            <div className="py-2">Community</div>
          </Link>

          <Link to="/more" onClick={() => setIsOpen(false)}>
            <div className="py-2">More</div>
          </Link>

          {/* Mobile User Section */}
          {user && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-semibold">{user.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user.email || ""}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="text-red-500 w-full text-left py-2"
              >
                Logout
              </button>
            </div>
          )}

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
