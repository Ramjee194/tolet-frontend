import React, { useEffect, useState } from 'react';
import { 
  MapPin, Bed, Bath, Maximize, MessageSquare, Heart, 
  Bell, Sparkles, ChevronDown, Filter, X, Star, 
  ThumbsUp, ThumbsDown, RefreshCw, Search, Calendar, Users,
  ChevronLeft, ChevronRight, Map, Grid, Layers, Award,
  Clock, Eye, Shield, TrendingUp, Home, Building, Hotel
} from 'lucide-react';
import axios from 'axios';
import { Footer } from '../home/Footer';

const PropertyPlatform = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [currentImageIndex, setCurrentImageIndex] = useState({}); // For carousel

  // Enhanced UI data
  const enhancedData = {
    hosts: [
      { name: "Ayushi", response: "Instant response", rating: "4.6/5", avatar: "https://i.pravatar.cc/100?u=1", verified: true },
      { name: "Priyam Dubey", response: "24*7", rating: "4.1/5", avatar: "https://i.pravatar.cc/100?u=2", verified: false },
      { name: "Puja Yadav", response: "1hr response", rating: "4.5/5", avatar: "https://i.pravatar.cc/100?u=3", verified: true },
      { name: "Rahul Sharma", response: "Quick response", rating: "4.8/5", avatar: "https://i.pravatar.cc/100?u=4", verified: true },
      { name: "Neha Gupta", response: "Usually in 30min", rating: "4.9/5", avatar: "https://i.pravatar.cc/100?u=5", verified: true },
      { name: "Vikram Singh", response: "Instant response", rating: "4.7/5", avatar: "https://i.pravatar.cc/100?u=6", verified: false },
    ],
    amenities: [
      ["Gym", "Doorman", "Rooftop", "Pool", "Spa"],
      ["Hardwood Floors", "High Ceilings", "Exposed Brick", "Fireplace", "Terrace"],
      ["Pool", "Gym", "Concierge", "Spa", "Private Garden"],
      ["Parking", "Pet Friendly", "Laundry", "Dishwasher", "Smart Home"],
      ["Balcony", "Garden", "Security", "Elevator", "AC"],
    ],
    tags: [
      ["Verified", "Instant Book", "New", "Premium"],
      ["Verified", "New", "Trending"],
      ["Instant Book", "Premium", "Featured"],
      ["Verified", "Premium", "New", "Luxury"],
      ["Instant Book", "Verified", "Eco-friendly"],
      ["New", "Featured", "Limited"],
    ],
    statusMessages: [
      "🔥 5 people viewed today",
      "💰 Price reduced yesterday",
      "📈 3 people booked this week",
      "✨ Added 2 days ago",
      "⚡ Hot property - 10 views today",
      "🎉 Limited time offer",
    ],
    daysAgo: [2, 5, 1, 3, 7, 4],
    views: [24, 56, 128, 89, 43, 210],
    propertyTypes: ["Apartment", "Villa", "Studio", "Penthouse", "Condo", "Loft"],
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/api/auth/v1/listings");
      if (res.data && Array.isArray(res.data)) {
        const enhanced = res.data.map((listing, index) => ({
          ...listing,
          host: enhancedData.hosts[index % enhancedData.hosts.length].name,
          hostAvatar: enhancedData.hosts[index % enhancedData.hosts.length].avatar,
          hostVerified: enhancedData.hosts[index % enhancedData.hosts.length].verified,
          response: enhancedData.hosts[index % enhancedData.hosts.length].response,
          communityRating: enhancedData.hosts[index % enhancedData.hosts.length].rating,
          rating: (4 + Math.random()).toFixed(1),
          reviews: Math.floor(Math.random() * 50) + 10,
          beds: Math.floor(Math.random() * 3) + 1,
          baths: Math.floor(Math.random() * 2) + 1,
          sqft: Math.floor(Math.random() * 1000) + 600,
          tags: enhancedData.tags[index % enhancedData.tags.length],
          amenities: enhancedData.amenities[index % enhancedData.amenities.length],
          status: enhancedData.statusMessages[index % enhancedData.statusMessages.length],
          oldPrice: index % 2 === 0 ? Math.round(parseInt(listing.price) * 1.15) : null,
          daysAgo: enhancedData.daysAgo[index % enhancedData.daysAgo.length],
          views: enhancedData.views[index % enhancedData.views.length],
          propertyType: enhancedData.propertyTypes[index % enhancedData.propertyTypes.length],
        }));
        setListings(enhanced);
      } else {
        setListings([]);
      }
    } catch (err) {
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchListings();
  };

  // Image carousel handlers
  const nextImage = (propertyId, imagesLength, e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % imagesLength
    }));
  };

  const prevImage = (propertyId, imagesLength, e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
      <div className="h-64 bg-slate-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="flex gap-4">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  

  // Filter Sidebar Component (enhanced)
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Filters
        </h2>
        <button className="text-sm text-gray-400 hover:text-blue-600 transition">Clear All</button>
      </div>

      <div className="space-y-5">
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

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">Price Range</label>
          <div className="flex gap-3">
            <input type="number" placeholder="Min" className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            <input type="number" placeholder="Max" className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
          </div>
        </div>

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

        <div>
          <label className="text-sm font-semibold text-red-700 block mb-2">More Filters</label>
          <button className="w-full p-3 bg-gray-50 rounded-xl text-sm text-left flex justify-between items-center hover:bg-gray-100 transition">
            <span>Instant Book</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  // Main content
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
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
          <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-500 mb-6">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-6 py-3  text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2 mx-auto"
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
      {/* Top Search Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Logo */}
            

            {/* Search Bar */}
            <div className="flex-1 flex flex-col items-center md:flex-row items-stretch md:items-center gap-2 bg-gray-100 p-1 rounded-2xl md:max-w-2xl">
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

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-24">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header with results count and sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {listings.length}+ stays in Manhattan
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                    {listings.length} properties
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
                  <span className='text-red-500'>Filters</span>
                </button>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none ">
                    <option>Sort: Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Top Rated</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
                <button 
                  onClick={handleRefresh}
                  className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition"
                >
                  <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {/* Property Cards Grid */}
            {listings.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                <Home size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No properties found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters or be the first to list a property.</p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                  Add Your Property
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-1'} gap-6`}>
                {listings.map((property) => (
                  <div 
                    key={property._id} 
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Section with Carousel */}
                    <div className="relative h-56 overflow-hidden">
                      {/* Image Carousel */}
                      <div className="relative w-full h-full">
                        {property.images && property.images.length > 0 ? (
                          <img 
                            src={property.images[currentImageIndex[property._id] || 0]} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            alt={property.title}
                          />
                        ) : (
                          <img 
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" 
                            className="w-full h-full object-cover"
                            alt="Default"
                          />
                        )}
                        
                        {/* Image Navigation Arrows */}
                        {property.images && property.images.length > 1 && (
                          <>
                            <button 
                              onClick={(e) => prevImage(property._id, property.images.length, e)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button 
                              onClick={(e) => nextImage(property._id, property.images.length, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}

                        {/* Image Counter */}
                        {property.images && property.images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            {(currentImageIndex[property._id] || 0) + 1} / {property.images.length}
                          </div>
                        )}
                      </div>

                      {/* Tags Overlay */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {property.tags && property.tags.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white tracking-wider shadow-lg backdrop-blur-sm
                              ${tag === 'Verified' ? 'bg-emerald-500/90' : 
                                tag === 'Instant Book' ? 'bg-orange-500/90' : 
                                tag === 'Premium' ? 'bg-purple-500/90' :
                                tag === 'New' ? 'bg-red-500/90' :
                                tag === 'Trending' ? 'bg-pink-500/90' :
                                tag === 'Featured' ? 'bg-amber-500/90' : 'bg-slate-700/90'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition">
                        <Heart size={16} className="text-slate-600 hover:text-red-500" />
                      </button>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="font-bold text-slate-800">₹{property.price}</span>
                        <span className="text-xs text-slate-500">/month</span>
                      </div>

                      {/* Views & Time */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-slate-600">
                        <Eye size={12} />
                        <span>{property.views}</span>
                        <Clock size={12} className="ml-1" />
                        <span>{property.daysAgo}d ago</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      {/* Title & Rating */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-800 line-clamp-1 flex-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 ml-2">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          {property.rating}
                          <span className="text-slate-400 font-normal text-xs">({property.reviews})</span>
                        </div>
                      </div>

                      {/* Location */}
                      <p className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                        <MapPin size={12} /> {property.location || "Manhattan, NY"}
                      </p>

                      {/* Specs */}
                      <div className="flex gap-3 text-slate-500 text-xs font-medium mb-3">
                        <span className="flex items-center gap-1"><Bed size={14} /> {property.beds} beds</span>
                        <span className="flex items-center gap-1"><Bath size={14} /> {property.baths} baths</span>
                        <span className="flex items-center gap-1"><Maximize size={14} /> {property.sqft} sqft</span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {property.amenities && property.amenities.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                            {item}
                          </span>
                        ))}
                        {property.amenities && property.amenities.length > 3 && (
                          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                            +{property.amenities.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Host & Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <img 
                            src={property.hostAvatar} 
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" 
                            alt="host"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-xs font-semibold text-slate-800">{property.host}</p>
                              {property.hostVerified && (
                                <Shield size={10} className="text-blue-500" />
                              )}
                            </div>
                            <p className="text-[10px] text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                              {property.response}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                            <MessageSquare size={16} className="text-slate-500" />
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition">
                            View Deal
                          </button>
                        </div>
                      </div>

                      {/* Status Message */}
                      {property.status && (
                        <p className="text-[10px] text-slate-400 mt-3 italic flex items-center gap-1">
                          <TrendingUp size={10} className="text-orange-400" />
                          {property.status}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {listings.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">1</button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">2</button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">3</button>
                <span>...</span>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">8</button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
                  <ChevronRight size={16} />
                </button> */}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
                <X size={20} />
              </button>
            </div>
            <FilterSidebar />
            <div className="mt-8 flex gap-3">
              <button className="flex-1 py-3 border border-gray-300 rounded-xl font-medium">Clear</button>
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium" onClick={() => setIsMobileFilterOpen(false)}>
                Apply
              </button>
            </div>
          </div>
        </div>
        
      
      )}
     
      <div className='mt-12 p-0'>
        <Footer/>
      </div>
    </div>
    
  
  );
};

export default PropertyPlatform;