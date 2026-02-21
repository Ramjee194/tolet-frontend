import React from "react";
import LandingPage from "./LandingPage";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <>
    <div className="relative  w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hotel1.png')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-4">
          
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 text-center">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1
            className="
            text-2xl 
            sm:text-3xl 
            md:text-4xl 
            lg:text-5xl 
            xl:text-6xl 
            font-bold 
            text-white 
            leading-tight 
            mb-6
          "
          >
            Find Homes, PGs & Offices
            <span className="text-red-500 block sm:inline"> Near You</span>
          </h1>

          {/* Paragraph */}
          <p
            className="
            text-sm 
            sm:text-base 
            md:text-lg 
            lg:text-xl 
            text-gray-200 
            mb-8
          "
          >
            Find your perfect flat, villa, PG, or hostel at affordable rental
            prices. Spacious flats in prime locations, luxury villas, and
            budget-friendly accommodations for students and
            professionals.Connect directly with owners for verified Room, House,
            Commercial Space, and PG listings. Rent with confidence.
          </p>

          {/* Buttons */}
          <div
            className="
            flex 
            flex-col 
            sm:flex-row 
            items-center 
            justify-center 
            gap-4 
            sm:gap-6
          "
          >
            <button
           onClick={()=>navigate("/property-search")}
              className="
              w-full sm:w-auto
              bg-red-500 
              hover:bg-red-600 
              text-white 
              px-8 
              py-3 
              rounded-full 
              transition 
              duration-300
            "
            >
              Explore Now
            </button>

            <button
            onClick={()=>navigate("/contact-us")}
              className="
              w-full sm:w-auto
              bg-white 
              hover:bg-gray-200 
              text-black 
              px-8 
              py-3 
              rounded-full 
              transition 
              duration-300
            "
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
    <LandingPage/>
    </>
  );
}

export default Home;
