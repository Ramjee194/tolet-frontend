import React from 'react';
import { MapPin, Calendar, Users, Search, Grid, Map } from 'lucide-react';

const SearchBar = ({ viewMode, setViewMode }) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-gray-100 p-1 rounded-2xl md:max-w-2xl">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <MapPin size={18} className="text-gray-400" />
              <input type="text" placeholder="Where are you going?" className="w-full bg-transparent outline-none text-sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <Calendar size={18} className="text-gray-400" />
              <input type="text" placeholder="Check in - Check out" className="w-full bg-transparent outline-none text-sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <Users size={18} className="text-gray-400" />
              <input type="text" placeholder="2 guests" className="w-full bg-transparent outline-none text-sm" />
            </div>
            <button className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md">
              <Search size={18} />
            </button>
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