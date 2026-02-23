import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Bed, Bath, Maximize, MessageSquare, Heart,
  Star, Clock, Eye, Shield, TrendingUp, ArrowLeft,
  Calendar, Users, Wifi, Coffee, Car, Tv, Home,
  ChevronLeft, ChevronRight, X,
  Share2, Phone, MessageCircle
} from 'lucide-react';
import axios from 'axios';
import { Footer } from '../components/layout/Footer';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/auth/v1/listings/${id}`);
      
      if (res.data) {
        // Enhance with mock data for UI including owner contact info
        const enhanced = {
          ...res.data,
          host: "Ayushi",
          hostPhone: "+91 8404827541", // Owner's phone number
          hostEmail: "ayushi@gmail.com",
          hostAvatar: "https://i.pravatar.cc/100?u=1",
          hostVerified: true,
          response: "Instant response",
          rating: "4.8",
          reviews: 24,
          beds: Math.floor(Math.random() * 3) + 1,
          baths: Math.floor(Math.random() * 2) + 1,
          sqft: Math.floor(Math.random() * 1000) + 600,
          amenities: [
            "WiFi", "Kitchen", "Washer", "Dryer", "AC", "Heating",
            "TV", "Parking", "Pool", "Gym", "Elevator", "Pet Friendly"
          ],
          hostSince: "2020",
          responseRate: "98%",
          responseTime: "within an hour",
          houseRules: [
            "Check-in: After 3PM",
            "Checkout: 11AM",
            "No smoking",
            "No parties or events",
            "Pets allowed"
          ],
          safety: [
            "Smoke alarm",
            "Carbon monoxide alarm",
            "First aid kit",
            "Fire extinguisher"
          ]
        };
        setProperty(enhanced);
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Call function
  const handleCall = () => {
    if (property?.hostPhone) {
      window.location.href = `tel:${property.hostPhone}`;
    } else {
      alert("Owner phone number not available");
    }
  };

  // WhatsApp function
  const handleWhatsApp = () => {
    if (property?.hostPhone) {
      // Remove any non-numeric characters from phone number
      const phoneNumber = property.hostPhone.replace(/\D/g, '');
      const message = encodeURIComponent(
        `Hi, I'm interested in your property "${property.title}". Is it still available?`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    } else {
      alert("Owner WhatsApp number not available");
    }
  };

  // Share function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Save to wishlist function
  const handleSave = () => {
    // Add to localStorage or send to API
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    if (!savedProperties.includes(property._id)) {
      savedProperties.push(property._id);
      localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
      alert("Property saved to wishlist!");
    } else {
      alert("Property already in wishlist");
    }
  };

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Property not found</h2>
          <button
            onClick={() => navigate('/property-search')}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={property.images?.[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/property')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={20} />
            <span>Back to search</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title and Actions */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-amber-400 fill-amber-400" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-slate-400">({property.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-slate-600">{property.location || "Manhattan, NY"}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center gap-2"
            >
              <Heart size={18} />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button 
              onClick={handleShare}
              className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition flex items-center gap-2"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-3xl overflow-hidden">
          <div 
            className="lg:row-span-2 h-[400px] lg:h-[500px] cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <img
              src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"}
              alt="Main"
              className="w-full h-full object-cover hover:opacity-95 transition"
            />
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-2 h-[250px]">
            {property.images?.slice(1, 3).map((img, idx) => (
              <div 
                key={idx} 
                className="cursor-pointer"
                onClick={() => {
                  setCurrentImageIndex(idx + 1);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`View ${idx + 2}`}
                  className="w-full h-full object-cover hover:opacity-95 transition"
                />
              </div>
            ))}
          </div>
          {property.images?.length > 3 && (
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="hidden lg:block absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              Show all photos
            </button>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info with Call & WhatsApp */}
            <div className="flex flex-col md:flex-row md:items-start justify-between p-6 bg-slate-50 rounded-2xl gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={property.hostAvatar}
                  className="w-16 h-16 rounded-full object-cover"
                  alt="Host"
                />
                <div>
                  <h3 className="text-lg font-semibold">Hosted by {property.host}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                    <Shield size={14} className="text-blue-500" />
                    <span>Verified host since {property.hostSince}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>{property.responseRate} response rate</span>
                    <span>{property.responseTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  <Phone size={18} />
                  <span>Call</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    {item === "WiFi" && <Wifi size={18} className="text-slate-600" />}
                    {item === "Kitchen" && <Coffee size={18} className="text-slate-600" />}
                    {item === "Parking" && <Car size={18} className="text-slate-600" />}
                    {item === "TV" && <Tv size={18} className="text-slate-600" />}
                    {!["WiFi", "Kitchen", "Parking", "TV"].includes(item) && 
                      <Home size={18} className="text-slate-600" />
                    }
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.houseRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Clock size={18} className="text-slate-600" />
                    <span className="text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Safety Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.safety.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Shield size={18} className="text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold">₹{property.price}</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-slate-400">({property.reviews})</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="border border-slate-200 rounded-xl mb-4">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 border-r">
                    <label className="text-xs font-semibold text-slate-500">CHECK-IN</label>
                    <input type="date" className="block w-full outline-none text-sm" />
                  </div>
                  <div className="p-3">
                    <label className="text-xs font-semibold text-slate-500">CHECKOUT</label>
                    <input type="date" className="block w-full outline-none text-sm" />
                  </div>
                </div>
                <div className="p-3">
                  <label className="text-xs font-semibold text-slate-500">GUESTS</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={16} className="text-slate-400" />
                    <span>2 guests</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition mb-4">
                Reserve
              </button>

              {/* Quick Contact Buttons for Mobile */}
              <div className="lg:hidden flex gap-3 mb-4">
                <button
                  onClick={handleCall}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  <Phone size={18} />
                  Call
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">₹{property.price} x 12 months</span>
                  <span className="font-semibold">₹{property.price * 12}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Security deposit</span>
                  <span className="font-semibold">₹{Math.floor(property.price * 1.5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service fee</span>
                  <span className="font-semibold">₹{Math.floor(property.price * 0.1)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total (1 year)</span>
                    <span>₹{property.price * 12 + Math.floor(property.price * 1.6)}</span>
                  </div>
                </div>
              </div>

              {/* Owner Contact Info */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Owner Contact:</p>
                <p className="text-sm flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <a href={`tel:${property.hostPhone}`} className="text-blue-600 hover:underline">
                    {property.hostPhone}
                  </a>
                </p>
                <p className="text-sm flex items-center gap-2 mt-1">
                  <MessageCircle size={14} className="text-slate-400" />
                  <span className="text-slate-600">Available on WhatsApp</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;