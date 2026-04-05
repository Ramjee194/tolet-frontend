import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiSearch, CiCalculator1, CiHeart, CiLocationOn } from "react-icons/ci";
import { FaHome, FaCar } from "react-icons/fa";
import { IoBedOutline, IoBedSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function SearchComponents() {
  const [search, setSearch] = useState("");
  const [allProperties, setAllProperties] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  // 1. Fetch data from your backend
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/auth/v1/listings");
        const result = await response.json();
        
        // Safety check: Ensure we are setting an array
        const dataArray = Array.isArray(result) ? result : result.listings || result.data || [];
        setAllProperties(dataArray);
      } catch (error) {
        console.error("Backend Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBackendData();
  }, []);

  // 2. UPDATED FILTER LOGIC (With Error Protection)
  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();

    return allProperties.filter((item) => {
      // SAFE STRING CONVERSION: This prevents the .toLowerCase() crash
      const safeTitle = String(item.title || "").toLowerCase();
      const safeType = String(item.type || "").toLowerCase();
      const safeLocation = String(item.location || "").toLowerCase();
      const safeAddress = String(item.address || "").toLowerCase();

      return (
        safeTitle.includes(query) ||
        safeType.includes(query) ||
        safeLocation.includes(query) ||
        safeAddress.includes(query) ||
        // Check features array safely
        (Array.isArray(item.features) && 
         item.features.some(f => String(f).toLowerCase().includes(query)))
      );
    }).slice(0, 6);
  }, [search, allProperties]);

  const handlesearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div className="bg-white">
      <div>
        <h1 className="lg:text-5xl md:text-5xl font-bold text-center mt-4">
          Start Your <span className="text-red-500 cursor-pointer">Search</span>
        </h1>
        <p className="text-sm font-bold m-7 p-2 text-center text-gray-500">
          Find your perfect rental with our intelligent search. We'll help you
          discover properties that match your lifestyle and budget.
        </p>

        {/* --- SEARCH BAR --- */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-xl px-4 md:px-0">
            <input
              type="text"
              value={search}
              onFocus={() => setIsFocused(true)}
              // Delay blur so the Link click registers
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={loading ? "Loading listings..." : "Search by location, 2 BHK, Studio..."}
              className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
            />
            <button 
              onClick={handlesearch}
              className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
            >
              <CiSearch size={20} />
            </button>

            {/* --- DROPDOWN RESULTS --- */}
            <AnimatePresence>
              {isFocused && search.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-4 right-4 md:left-0 md:right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <Link
                        key={item._id || item.id}
                        to={`/property/${item._id || item.id}`}
                        className="flex items-center justify-between p-4 hover:bg-red-50 border-b last:border-none group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FaHome className="text-red-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <CiLocationOn /> {item.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded uppercase">
                          {item.type}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-400 italic">
                      No matching properties found.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- QUICK LINKS / CATEGORIES --- */}
        <div className="w-full mt-8 flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-4 px-4">
            {[
              { label: "Studio", icon: <FaHome />, val: "Studio" },
              { label: "Bedroom", icon: <IoBedOutline />, val: "Bedroom" },
              { label: "2+ Bedroom", icon: <CiCalculator1 />, val: "2 BHK" },
              { label: "Pet Friendly", icon: <CiHeart />, val: "Pet" },
              { label: "Furnished", icon: <IoBedSharp />, val: "Furnished" },
              { label: "Parking", icon: <FaCar />, val: "Parking" },
            ].map((cat) => (
              <li key={cat.label}>
                <button
                  onClick={() => setSearch(cat.val)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition shadow-sm
                    ${search === cat.val 
                      ? "bg-red-500 text-white border-red-500 shadow-red-200" 
                      : "bg-gray-50 border-gray-100 hover:border-red-300 hover:bg-gray-100 text-slate-700"}
                  `}
                >
                  {cat.label} {cat.icon}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchComponents;