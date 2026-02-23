import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const PropertyFilters = ({ isMobile = false }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Filters
        </h2>
        <button className="text-sm text-gray-400 hover:text-blue-600 transition">Clear All</button>
      </div>

      <div className="space-y-5">
        {/* Location Filter */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              defaultValue="Manhattan, NY" 
              className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Price Range</label>
          <div className="flex gap-3">
            <input type="number" placeholder="Min" className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            <input type="number" placeholder="Max" className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {['Apartment', 'Villa', 'Studio', 'Penthouse', 'Condo', 'Loft'].map(type => (
              <label key={type} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-slate-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Bedrooms</label>
          <div className="flex gap-2">
            {['Any', '1', '2', '3', '4+'].map(b => (
              <button key={b} className="px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-200 transition">
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">Amenities</label>
          <div className="space-y-2">
            {['Pet Friendly', 'Furnished', 'Parking', 'Gym', 'Pool', 'Laundry', 'AC', 'Garden'].map(item => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* More Filters */}
        <div>
          <label className="text-sm font-semibold text-red-700 block mb-2">More Filters</label>
          <button className="w-full p-3 bg-gray-50 rounded-xl text-sm text-left flex justify-between items-center hover:bg-gray-100 transition">
            <span>Instant Book</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {isMobile && (
          <div className="mt-8 flex gap-3">
            <button className="flex-1 py-3 border border-gray-300 rounded-xl font-medium">Clear</button>
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium">
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;