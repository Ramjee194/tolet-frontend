import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  RefreshCw,
  ChevronDown,
  X,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePropertySearch } from "../hooks/usePropertySearch"; // Change this import
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertySkeleton from "../components/property/PropertySkeleton";
import SearchBar from "../components/property/SearchBar";
import { Footer } from "../components/layout/Footer";

const PropertySearch = () => {
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Use the correct hook for property search
  const { listings, loading, error, refreshing, handleRefresh } =
    usePropertySearch(); // Changed from useAdminProperties

  // Image carousel handlers
  const nextImage = (propertyId, imagesLength, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % imagesLength,
    }));
  };

  const prevImage = (propertyId, imagesLength, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + imagesLength) % imagesLength,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md">
          <div className="text-red-500 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-slate-500 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-24">
            <PropertyFilters />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header with results count and sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {listings?.length || 0}+ stays in Manhattan
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                    {listings?.length || 0} properties
                  </span>
                  Most guests book within 24 hours
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition flex items-center gap-2"
                >
                  <Filter size={18} />
                  <span className="text-red-500">Filters</span>
                </button>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none">
                    <option>Sort: Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Top Rated</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition"
                >
                  <RefreshCw
                    size={18}
                    className={refreshing ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Property Cards Grid */}
            {!listings || listings.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                <Home size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  No properties found
                </h3>
                <p className="text-slate-500 mb-6">
                  Try adjusting your filters or be the first to list a property.
                </p>
                <button 
                  onClick={() => navigate("/add-property")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Add Your Property
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-1"} gap-6`}
              >
                {listings.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    currentImageIndex={currentImageIndex}
                    onPrevImage={prevImage}
                    onNextImage={nextImage}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>
            <PropertyFilters isMobile={true} />
          </div>
        </div>
      )}

      <div className="mt-12 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default PropertySearch;