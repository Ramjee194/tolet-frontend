import React from "react";
import LocationComponent from "./Location";
import { FaIndianRupeeSign, FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import SearchComponents from "./SearchComponents";
import TrustedSection from "./TrustedClients";
import LiveActivity from "./LiveActivity";
import WhyChoose from "./ChoosingPage";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { MdStayPrimaryLandscape } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import GooglePlay from "./GoogleAppPage";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center">
          <LocationComponent />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mt-6">
            Find Homes, PGs & Offices{" "}
            <span className="text-red-400 block sm:inline text-5xl md:text-7xl">
              Near You
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 font-semibold mt-6 max-w-xl">
            Connect directly with owners for verified Room, House, Commercial
            Space, and PG listings. Rent with confidence.
          </p>

          {/* MARKET CARD */}
          <div className="mt-10 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Chinhat Market Insights
            </h3>

            <p className="text-gray-500 text-sm mb-6">
              Real-time property trends
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-2xl font-bold text-gray-900">
                  <FaIndianRupeeSign size={18} />
                  2,000
                </div>
                <span className="text-gray-500 text-sm uppercase">
                  Avg. Rent
                </span>
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                  24/7
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <span className="text-gray-500 text-sm uppercase">
                  Availability
                </span>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    +8.9%
                  </span>
                </div>
                <span className="text-gray-500 text-sm uppercase">
                  This Month
                </span>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-10 mt-10">
            <button onClick={()=>navigate("/property-search")}  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 py-3 transition">
              <CiSearch size={18} />
              Find Your Next Home
            </button>

            <button onClick={()=>navigate("/owner-dashboard")} className="flex items-center justify-center gap-2 hover:bg-green-600 text-gray-900 rounded-xl px-8 py-3 transition border border-gray-300">
              <FaPlus size={18} />
              List Your Property
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 relative p-6 lg:p-12 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <img
              src="/hotel1.png"
              alt="Hotel"
              className="w-full h-[250px] sm:h-[450px] lg:h-[350px] rounded-t-3xl shadow-2xl object-cover"
            />

            {/* RATING */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-semibold text-gray-800">4.9</span>
            </div>

            {/* PRICE CARD */}
            <div className="bg-white/95 backdrop-blur-md rounded-b-3xl shadow-xl p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    ₹18,000
                    <span className="text-sm text-gray-500 font-medium">
                      {" "}
                      /month
                    </span>
                  </h3>

                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    Luxury Apartment
                  </p>

                  <p className="text-sm text-gray-500">Downd on, Chinhat</p>
                </div>

                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.JR4CFs4rlssIIXMQKyBVYQHaHa?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Property"
                  className="w-16 h-16 rounded-full object-cover shadow-md"
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-5 border-t pt-4">
                <span>
                  <IoBedOutline />3 Beds
                </span>
                <span>
                  <FaBath />2 Baths
                </span>
                <span>
                  <MdStayPrimaryLandscape />
                  1400 sqft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH COMPONENT AT BOTTOM */}
      <div className="py-12 px-6 sm:px-10 lg:px-16">
        <SearchComponents />
      </div>

      <div className="py-12 px-6 sm:px-10 lg:px-16">
        <TrustedSection />
      </div>

      <div className="py-12 px-6 sm:px-10 lg:px-16">
        <LiveActivity />
      </div>

      <div className="py-12 px-6 sm:px-10 lg:px-16">
        <WhyChoose />
      </div>

      <div className="py-6 py-24 px-6 lg:px-16 bg-green-100 px-6 sm:px-10 lg:px-16">
        <h1 className="text-5xl text-center">
          Ready to Experience the Difference?
        </h1>
        <p className="text-xl p-4 text-center">
          Join thousands of satisfied users who've found their perfect rental
          match through our innovative platform.
        </p>
        <ul className="flex flex-col sm:flex-row rounded-2xl justify-center items-center gap-6 mt-8">
          <li>
            <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg">
              <CiSearch size={20} />
              <span>Start Searching</span>
            </button>
          </li>

          <li>
            <button className="flex items-center gap-2 hover:bg-amber-600 text-black px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg">
              <IoPersonOutline size={20} />
              <span>Join Community</span>
            </button>
          </li>
        </ul>
      </div>
      {/*googlePlay */}
      <div className="py-12 px-6 sm:px-10 lg:px-16">
       <GooglePlay/>
      </div>

      {/*Footer */}
       <div className="">
       <Footer/>
      </div>
    </div>
  );
}

export default LandingPage;
