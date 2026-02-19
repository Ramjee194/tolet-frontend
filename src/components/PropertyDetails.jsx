import React, { useState, useEffect } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Star,
  Share2,
  Heart,
  ChevronLeft,
  Wifi,
  Wind,
  ShieldCheck,
  Car,
  Tv,
  MessageCircle,
  X,
  Send,
  Navigation,
  Calendar,
  Zap,
  Utensils,
  Train,
  Check,
  Info,
  ThumbsUp,
  MessageSquare,
  Coffee,
  Droplets,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const PropertyFullDetail = () => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/v1/listings");
      if (res.data && Array.isArray(res.data)) {
        setProperties(res.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = properties.filter(
        (property) =>
          property.title?.toLowerCase().includes(query.toLowerCase()) ||
          property.location?.toLowerCase().includes(query.toLowerCase()) ||
          property.description?.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProperties(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredProperties([]);
      setShowSuggestions(false);
    }
  };

  // Navigate to property detail
  const handlePropertySelect = (property) => {
    // You can navigate to a dynamic route with property ID
    // navigate(`/property/${property._id}`);
    console.log("Selected property:", property);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const data = {
    title: "Luxury 2BR Apartment in Downtown Manhattan",
    address: "123 Broadway Street, New York, NY 10001",
    type: "Apartment",
    price: "4,500",
    deposit: "4,500",
    beds: 2,
    baths: 2,
    sqft: 1200,
    rating: 4.8,
    reviewCount: 127,
    availableDate: "Dec 15, 2024",
    responseTime: "2 hours",
    host: "Sarah",
    description:
      "Experience luxury living in this stunning 2-bedroom, 2-bathroom apartment located in the heart of Downtown Manhattan. This modern unit features floor-to-ceiling windows with breathtaking city views, premium finishes throughout, and an open-concept layout perfect for both relaxation and entertaining. The gourmet kitchen boasts stainless steel appliances, quartz countertops, and custom cabinetry. The master suite includes a walk-in closet and spa-like ensuite bathroom. Building amenities include 24/7 concierge, fitness center, rooftop terrace, and resident lounge.",
    keyFeatures: [
      "Floor-to-ceiling windows",
      "Hardwood floors",
      "In-unit washer/dryer",
      "Central air conditioning",
      "Dishwasher",
      "Walk-in closets",
      "Private balcony",
      "Pet-friendly",
      "24/7 doorman",
      "Fitness center",
      "Rooftop terrace",
      "Storage unit",
    ],
    scores: { walk: 98, bike: 85, transit: 95, noise: "Moderate" },
  };

  const amenities = [
    {
      category: "Essential",
      items: [
        { n: "WiFi", d: "High-speed internet" },
        { n: "Air Conditioning", d: "Central AC" },
        { n: "Heating", d: "Central system" },
      ],
    },
    {
      category: "Appliances",
      items: [
        { n: "Washer/Dryer", d: "In-unit" },
        { n: "Dishwasher", d: "Built-in" },
        { n: "Smart TV", d: "Living room" },
      ],
    },
    {
      category: "Building",
      items: [
        { n: "Gym", d: "24/7 access" },
        { n: "Pool", d: "Rooftop pool" },
        { n: "Security", d: "24/7 Doorman" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      {/* TOP NAVIGATION WITH SEARCH */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold text-black hover:bg-slate-100 p-2 rounded-lg transition"
          >
            <ChevronLeft size={20} /> Back
          </button>

          {/* Search Bar with Auto-suggestions */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() =>
                  searchQuery.length > 0 && setShowSuggestions(true)
                }
                placeholder="Search properties by title, location..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none "
              />
            </div>

            {/* Auto-suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl max-h-96 overflow-y-auto z-50">
                {loading ? (
                  <div className="p-4 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm mt-2">Loading properties...</p>
                  </div>
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <div
                      key={property._id}
                      onClick={() => handlePropertySelect(property)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200">
                        {property.images && property.images[0] ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home size={20} className="text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">
                          {property.title}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={12} />{" "}
                          {property.location || "Location not specified"}
                        </p>
                        <p className="text-sm font-bold text-green-600 mt-1">
                          ₹{property.price}/month
                        </p>
                      </div>
                    </div>
                  ))
                ) : searchQuery.length > 0 ? (
                  <div className="p-4 text-center text-slate-500">
                    <p>No properties found matching "{searchQuery}"</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Share2 size={20} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 mt-6">
        {/* 2. GALLERY GRID */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] rounded-3xl overflow-hidden mb-8">
          <div className="col-span-2 row-span-2">
            <img
              src="https://images.trvl-media.com/hotels/17000000/16010000/16009400/16009390/1db316c6_z.jpg"
              className="w-full h-full object-cover"
              alt="Main"
            />
          </div>
          <div className="col-span-1">
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
              className="w-full h-full object-cover"
              alt="Kitchen"
            />
          </div>
          <div className="col-span-1">
            <img
              src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"
              className="w-full h-full object-cover"
              alt="Bedroom"
            />
          </div>
          <div className="col-span-2">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.uFDR7bJ7jQ51_lGaIVcifAHaEd?cb=defcachec2&w=870&h=524&rs=1&pid=ImgDetMain&o=7&rm=3"
              className="w-full h-full object-cover"
              alt="View"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Info */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                  Verified
                </span>
                <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                  <Zap size={14} /> Available {data.availableDate}
                </span>
              </div>
              <h1 className="text-4xl font-black mb-2">{data.title}</h1>
              <p className="text-slate-500 flex items-center gap-1 mb-6">
                <MapPin size={18} /> {data.address}
              </p>

              <div className="flex flex-wrap gap-6 py-6 border-y border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Type
                  </span>
                  <span className="font-bold">{data.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Beds
                  </span>
                  <span className="font-bold">{data.beds} Bedrooms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Baths
                  </span>
                  <span className="font-bold">{data.baths} Bathrooms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Size
                  </span>
                  <span className="font-bold">{data.sqft} sq ft</span>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section>
              <h2 className="text-2xl font-black mb-4">About This Property</h2>
              <p className="text-slate-600 leading-relaxed">
                {data.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {data.keyFeatures.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-700 font-medium"
                  >
                    <Check
                      size={16}
                      className="text-green-600 bg-blue-50 rounded-full p-0.5"
                    />{" "}
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities Section */}
            <section className="bg-white p-8 rounded-[32px] border border-slate-50">
              <h2 className="text-2xl font-black mb-8">Amenities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {amenities.map((cat) => (
                  <div key={cat.category}>
                    <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-4">
                      {cat.category}
                    </h3>
                    <div className="space-y-4">
                      {cat.items.map((i) => (
                        <div key={i.n}>
                          <p className="text-sm font-bold text-slate-800">
                            {i.n}
                          </p>
                          <p className="text-xs text-slate-500">{i.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-400 italic">
                <Info size={14} /> Additional fees may apply for parking and
                furnished packages.
              </div>
            </section>

            {/* Neighborhood Insights */}
            <section>
              <h2 className="text-2xl font-black mb-6">
                Neighborhood Insights
              </h2>
              <div className="bg-white p-8 rounded-[32px] border border-slate-50 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      l: "Walk Score",
                      v: data.scores.walk,
                      c: "text-emerald-600",
                    },
                    {
                      l: "Bike Score",
                      v: data.scores.bike,
                      c: "text-blue-600",
                    },
                    {
                      l: "Transit Score",
                      v: data.scores.transit,
                      c: "text-purple-600",
                    },
                    {
                      l: "Noise Level",
                      v: data.scores.noise,
                      c: "text-orange-600",
                    },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center p-4 bg-slate-50 rounded-2xl"
                    >
                      <p className={`text-3xl font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mt-1">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Downtown Manhattan is the bustling heart of New York City,
                  offering an unparalleled urban lifestyle...
                </p>
                <button className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 transition-all">
                  <Navigation size={18} /> View on Map
                </button>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-black">Reviews & Ratings</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-orange-400">
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                    </div>
                    <span className="font-black text-xl">4.8</span>
                    <span className="text-slate-400 font-medium">
                      ({data.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm">
                  Write Review
                </button>
              </div>

              <div className="space-y-6">
                {[
                  {
                    user: "ramjee",
                    date: "Nov 15, 2026",
                    stay: "1 year lease",
                    comment:
                      "Absolutely loved living here! The apartment is exactly as described - modern, clean, and spacious. Sarah was incredibly responsive...",
                  },
                  {
                    user: "yadav",
                    date: "Oct 28, 2026",
                    stay: "8 months",
                    comment:
                      "This place exceeded all my expectations! The apartment is beautifully designed with high-end finishes and the kitchen is a dream...",
                  },
                ].map((rev, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-3xl border border-slate-50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-green-600">
                          {rev.user[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{rev.user}</p>
                          <p className="text-xs text-slate-400">
                            {rev.date} • {rev.stay}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-orange-400">
                        <Star fill="currentColor" size={14} />
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <ThumbsUp size={14} /> Helpful
                      </button>
                      <button className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <MessageSquare size={14} /> Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR: BOOKING CARD */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-2xl shadow-slate-100">
                <div className="mb-6">
                  <p className="text-4xl font-black">
                    ₹{data.price}
                    <span className="text-sm font-normal text-slate-400 ml-1">
                      /month
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 font-bold mt-1">
                    Security Deposit: ₹{data.deposit}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={22} /> Message Owner
                  </button>
                  <button className="w-full py-4 border-2 border-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
                    <Calendar size={20} /> Schedule Tour
                  </button>
                  <button className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Heart size={20} /> Save to List
                  </button>
                  <ul className="flex justify-between items-center gap-2">
                    {/* Call Button */}
                    <a
                      href="tel:+918404827541"
                      className="w-full py-4 border-2 border-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50"
                    >
                      <IoMdCall className="text-green-700" size={25} />
                      Call
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/918404827541?text=I%20am%20interested%20in%20your%20flat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 border-2 border-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50"
                    >
                      <FaWhatsapp className="text-green-500" size={25} />
                      WhatsApp
                    </a>
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Host Response</span>
                    <span className="text-emerald-500">
                      ~{data.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                      R
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">
                        Ramjee Yadav (Owner)
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Superhost • Verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SIMILAR PROPERTIES SECTION - Now showing real uploaded properties */}
        <section className="mt-20 border-t border-slate-100 pt-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black">Similar Properties</h2>
            <button className="text-red-600 font-bold text-sm underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property, i) => (
              <div
                key={property._id}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-50 group hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handlePropertySelect(property)}
              >
                <div className="h-48 relative">
                  {property.images && property.images[0] ? (
                    <img
                      src={property.images[0]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      alt={property.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <Home size={40} className="text-slate-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white text-[10px] font-bold px-2 py-1 rounded">
                    {property.propertyType || "FEATURED"}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-lg font-black text-slate-800 truncate">
                    {property.title}
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} />{" "}
                    {property.location || "Location not specified"}
                  </p>
                  <p className="text-xl font-bold text-green-600 mt-2">
                    ₹{property.price}/mo
                  </p>
                  <div className="flex gap-4 mt-4 text-[11px] font-bold text-slate-400 uppercase">
                    <span className="flex items-center gap-1">
                      <Bed size={14} /> 2 BR
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize size={14} /> 1100 sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* CONTACT MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black">Message Owner</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 bg-slate-50 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl mb-6 flex gap-4">
              {properties[0]?.images && properties[0].images[0] ? (
                <img
                  src={properties[0].images[0]}
                  className="w-14 h-14 rounded-xl object-cover"
                  alt="mini"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center">
                  <Home size={24} className="text-slate-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold truncate">{data.title}</p>
                <p className="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">
                  ₹{data.price}/mo
                </p>
              </div>
            </div>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl h-32 outline-none  mb-6"
              placeholder="Hii Ramjee! I'm interested in this 2BR apartment. Is it available for a viewing on March 15th?"
            ></textarea>
            <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
              <Send size={18} /> Send Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Home import if not already present
import { Home } from "lucide-react";

export default PropertyFullDetail;
