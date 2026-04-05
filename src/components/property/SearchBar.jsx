import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Search, Grid, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SearchBar = ({ viewMode, setViewMode, searchValue, onSearch }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Fetch all listings for suggestions (only once)
  useEffect(() => {
    const fetchAllListings = async () => {
      setLoadingSuggestions(true);
      try {
        const res = await axios.get('http://localhost:5000/api/auth/v1/listings?limit=100');
        const data = Array.isArray(res.data) ? res.data : res.data.listings || [];
        setAllProperties(data);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    fetchAllListings();
  }, []);

  // Filter suggestions based on searchValue
  const filteredResults = useMemo(() => {
    if (!searchValue.trim()) return [];
    const query = searchValue.toLowerCase();

    return allProperties.filter((item) => {
      const title = String(item.title || '').toLowerCase();
      const location = String(item.location || '').toLowerCase();
      const description = String(item.description || '').toLowerCase();
      return title.includes(query) || location.includes(query) || description.includes(query);
    }).slice(0, 6);
  }, [searchValue, allProperties]);

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar - Simplified */}
          <div className="flex-1 flex items-center ml-20 gap-2 bg-gray-100 p-1 rounded-2xl md:max-w-2xl relative">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <MapPin size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                className="w-full bg-transparent outline-none text-sm"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
            </div>
            <button className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md">
              <Search size={18} />
            </button>

            {/* Dropdown Suggestions */}
            <AnimatePresence>
              {isFocused && searchValue.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {loadingSuggestions ? (
                    <div className="p-4 text-center text-gray-400">Loading suggestions...</div>
                  ) : filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <Link
                        key={item._id}
                        to={`/property/${item._id}`}
                        className="flex items-center justify-between p-4 hover:bg-red-50 border-b last:border-none group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin size={12} /> {item.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          ₹{item.price}/mo
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

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition ${viewMode === 'map' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              <Map size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;