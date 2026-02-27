import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  MessageSquare,
  Heart,
  Star,
  Clock,
  Eye,
  Shield,
  TrendingUp,
  ArrowLeft,
  Calendar,
  Users,
  Wifi,
  Coffee,
  Car,
  Tv,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Phone,
  MessageCircle,
  ThumbsUp,
  Navigation,
  Award,
  RotateCw,
} from "lucide-react";
import axios from "axios";
import { Footer } from "../components/layout/Footer";

// ✅ Leaflet imports – named imports only!
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix marker icons in Vite (ES module imports)
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showvisitpopup, setShowVisitPopup] = useState(false);
  const [showbookingpopup, setshowbookingpopup] = useState(false);
  const [tenure, setTenure] = useState(3);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const deposit = 2000;
  const totalPayable = property?.price + deposit + tenure;

  // 3D View state
  const [is3DViewOpen, setIs3DViewOpen] = useState(false);
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [formData,setFormData] = useState({
    date:"",
    time:"",
    message:"",
    duration:"",
  })

  // Mock reviews
  const mockReviews = [
    {
      id: 1,
      user: "Rahul Sharma",
      avatar: "https://i.pravatar.cc/100?u=2",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Amazing property! Very clean and exactly as described. The host was very responsive. Location is perfect with easy access to metro and markets.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Priya Patel",
      avatar: "https://i.pravatar.cc/100?u=3",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great place to stay. The apartment is spacious and well maintained. Only minor issue was the WiFi connectivity in one room, but host fixed it quickly.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Amit Kumar",
      avatar: "https://i.pravatar.cc/100?u=4",
      rating: 5,
      date: "2 months ago",
      comment:
        "Best decision to rent here. Premium location, modern amenities, and fantastic landlord. Highly recommended!",
      helpful: 15,
    },
    {
      id: 4,
      user: "Sneha ",
      avatar: "https://i.pravatar.cc/100?u=5",
      rating: 5,
      date: "3 months ago",
      comment:
        "Loved the place! The view from the balcony is breathtaking. The host was kind enough to provide all essentials. Will definitely recommend.",
      helpful: 7,
    },
  ];

  useEffect(() => {
    fetchPropertyDetails();
    setReviews(mockReviews);
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/auth/v1/listings/${id}`,
      );

      if (res.data) {
        const enhanced = {
          ...res.data,
          host: res.data.ownerId?.name,
          hostPhone: res.data.ownerId?.phone,
          hostEmail: res.data.ownerId?.email,
          hostAvatar: res.data.ownerId?.profileImage,
          hostVerified: true,
          response: "Instant response",
          rating: 4.8,
          reviews: 24,
          beds: Math.floor(Math.random() * 3) + 1,
          baths: Math.floor(Math.random() * 2) + 1,
          sqft: Math.floor(Math.random() * 1000) + 600,
          amenities: [
            "WiFi",
            "Kitchen",
            "Washer",
            "Dryer",
            "AC",
            "Heating",
            "TV",
            "Parking",
            "Pool",
            "Gym",
            "Elevator",
            "Pet Friendly",
          ],
          hostSince: "2020",
          responseRate: "98%",
          responseTime: "within an hour",
          houseRules: [
            "Check-in: After 3PM",
            "Checkout: 11AM",
            "No smoking",
            "No parties or events",
            "Pets allowed",
          ],
          safety: [
            "Smoke alarm",
            "Carbon monoxide alarm",
            "First aid kit",
            "Fire extinguisher",
          ],
          coordinates: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        };
        setProperty(enhanced);
        await fetchSimilarProperties(enhanced);
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProperties = async (currentProperty) => {
    try {
      setSimilarLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/v1/listings",
        { params: { limit: 8 } },
      );

      if (response.data && Array.isArray(response.data)) {
        const filtered = response.data
          .filter((p) => p._id !== currentProperty._id)
          .slice(0, 4)
          .map((p) => ({
            id: p._id,
            title: p.title,
            price: p.price,
            location: p.location,
            rating: p.rating || 4.5,
            reviews: p.reviews || 0,

            image:
              p.images?.[0] ||
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
          }));
        setSimilarProperties(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch similar properties", err);
      setSimilarProperties([]);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Track recently viewed (same as in PropertySearch)
  const trackPropertyView = (property) => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const filtered = stored.filter((p) => p.id !== property._id);
    const newRecent = [
      {
        id: property._id,
        title: property.title,
        price: property.price,
        location: property.location,
        image: property.images?.[0] || "",
      },
      ...filtered,
    ].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(newRecent));
  };

  // Handler for similar property clicks – opens in new tab
  const handleSimilarPropertyClick = (similarItem) => {
    const propertyForTracking = {
      _id: similarItem.id,
      title: similarItem.title,
      price: similarItem.price,
      location: similarItem.location,
      images: [similarItem.image],
    };
    trackPropertyView(propertyForTracking);
    window.open(`/property/${similarItem.id}`, "_blank");
  };

  const handleCall = () => {
    if (property?.hostPhone) {
      window.location.href = `tel:${property.hostPhone}`;
    } else {
      alert("Owner phone number not available");
    }
  };

 const handlerequest = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await axios.post(
      `http://localhost:5000/api/auth/v1/listings/${id}/visit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("success", res.data);
    alert("Visit request sent successfully!");
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
 
  

  const handleWhatsApp = () => {
    if (property?.hostPhone) {
      const phoneNumber = property.hostPhone.replace(/\D/g, "");
      const message = encodeURIComponent(
        `Hi, I'm interested in your property "${property.title}". Is it still available?`,
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    } else {
      alert("Owner WhatsApp number not available");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    const savedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]",
    );
    if (!savedProperties.includes(property._id)) {
      savedProperties.push(property._id);
      localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
      alert("Property saved to wishlist!");
    } else {
      alert("Property already in wishlist");
    }
  };

  const handleHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r,
      ),
    );
  };

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + property.images.length) % property.images.length,
      );
    }
  };

  // 3D Cube drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setCubeRotation((prev) => ({
      x: prev.x + dy * 0.5,
      y: prev.y + dx * 0.5,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const rotateLeft = () => {
    setCubeRotation((prev) => ({ ...prev, y: prev.y - 90 }));
  };
  const rotateRight = () => {
    setCubeRotation((prev) => ({ ...prev, y: prev.y + 90 }));
  };
  const rotateUp = () => {
    setCubeRotation((prev) => ({ ...prev, x: prev.x - 90 }));
  };
  const rotateDown = () => {
    setCubeRotation((prev) => ({ ...prev, x: prev.x + 90 }));
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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Property not found
          </h2>
          <button
            onClick={() => navigate("/property")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Modal (Standard) */}
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

      {/* 3D View Modal */}
      {is3DViewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            onClick={() => setIs3DViewOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={24} />
          </button>

          <div
            className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative w-full h-full transform-style-3d cursor-grab"
              style={{
                transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                transition: isDragging ? "none" : "transform 0.3s",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Cube faces */}
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "translateZ(200px)",
                  backgroundImage: `url(${property.images?.[0] || ""})`,
                }}
              />
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "rotateY(180deg) translateZ(200px)",
                  backgroundImage: `url(${property.images?.[1] || property.images?.[0] || ""})`,
                }}
              />
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "rotateY(-90deg) translateZ(200px)",
                  backgroundImage: `url(${property.images?.[2] || property.images?.[0] || ""})`,
                }}
              />
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "rotateY(90deg) translateZ(200px)",
                  backgroundImage: `url(${property.images?.[3] || property.images?.[0] || ""})`,
                }}
              />
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "rotateX(90deg) translateZ(200px)",
                  backgroundImage: `url(${property.images?.[4] || property.images?.[0] || ""})`,
                }}
              />
              <div
                className="absolute w-full h-full bg-cover bg-center border-2 border-white shadow-2xl"
                style={{
                  transform: "rotateX(-90deg) translateZ(200px)",
                  backgroundImage: `url(${property.images?.[5] || property.images?.[0] || ""})`,
                }}
              />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 p-3 rounded-full">
            <button
              onClick={rotateLeft}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={rotateRight}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              <ChevronRight size={24} />
            </button>
            <button
              onClick={rotateUp}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              <ChevronUp size={24} />
            </button>
            <button
              onClick={rotateDown}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            Drag to rotate • Arrow buttons to navigate
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/property")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={20} />
            <span>Back </span>
          </button>
          {/* <button
            onClick={() => setIs3DViewOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition"
          >
            <RotateCw size={18} />
            <span>3D View</span>
          </button> */}
        </div>
      </div>

      {/* Main Content - Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery + Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Large Main Image */}
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src={
                    property.images?.[currentImageIndex] ||
                    property.images?.[0] ||
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {property.images?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {property.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {property.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                        index === currentImageIndex
                          ? "border-red-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-slate-400">
                    ({property.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="text-slate-600">
                    {property.location || "Manhattan, NY"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} className="text-slate-400" />
                  <span className="text-slate-600">245 views this week</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between p-6 bg-slate-50 rounded-2xl gap-4">
              <div className="flex items-center gap-4">
                {property?.profileImage && (
                  <img
                    src={property.profileImage}
                    alt="host"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{property.host}</h3>
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

            {/* About */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-slate-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    {item === "WiFi" && (
                      <Wifi size={18} className="text-slate-600" />
                    )}
                    {item === "Kitchen" && (
                      <Coffee size={18} className="text-slate-600" />
                    )}
                    {item === "Parking" && (
                      <Car size={18} className="text-slate-600" />
                    )}
                    {item === "TV" && (
                      <Tv size={18} className="text-slate-600" />
                    )}
                    {!["WiFi", "Kitchen", "Parking", "TV"].includes(item) && (
                      <Home size={18} className="text-slate-600" />
                    )}
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map View - Interactive Leaflet Map */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-slate-100 rounded-xl overflow-hidden h-64 relative">
                <MapContainer
                  center={[
                    property.coordinates?.lat || 12.9716,
                    property.coordinates?.lng || 77.5946,
                  ]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      property.coordinates?.lat || 12.9716,
                      property.coordinates?.lng || 77.5946,
                    ]}
                  >
                    <Popup>
                      {property.title}
                      <br />
                      Exact location provided after booking.
                    </Popup>
                  </Marker>
                </MapContainer>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates?.lat},${property.coordinates?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 z-[1000]"
                >
                  <Navigation size={16} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Exact location provided after booking
              </p>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Star size={20} className="text-amber-400 fill-amber-400" />
                  {property.rating} · {property.reviews} reviews
                </h2>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  View all
                </button>
              </div>

              {/* Rating Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <span className="text-3xl font-bold text-slate-800">
                    {property.rating}
                  </span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= Math.round(property.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Overall rating</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">Cleanliness</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">Location</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">4.5</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">Value</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">4.6</span>
                  </div>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-slate-100 pb-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900">
                            {review.user}
                          </h4>
                          <span className="text-xs text-slate-400">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              className={
                                star <= review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          {review.comment}
                        </p>
                        <button
                          onClick={() => handleHelpful(review.id)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 mt-2"
                        >
                          <ThumbsUp size={12} />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.houseRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
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
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
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
                    <label className="text-xs font-semibold text-slate-500">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      className="block w-full outline-none text-sm"
                    />
                  </div>
                  <div className="p-3">
                    <label className="text-xs font-semibold text-slate-500">
                      CHECKOUT
                    </label>
                    <input
                      type="date"
                      className="block w-full outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="text-xs font-semibold text-slate-500">
                    GUESTS
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={16} className="text-slate-400" />
                    <span> guests</span>
                  </div>
                </div>
              </div>

              <button onClick={()=>navigate("/property")} className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition mb-4">
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
                  <span className="text-slate-600">
                    ₹{property.price} x 12 months
                  </span>
                  <span className="font-semibold">₹{property.price * 12}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Security deposit</span>
                  <span className="font-semibold">
                    ₹{Math.floor(property.price * 1.5)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service fee</span>
                  <span className="font-semibold">
                    ₹{Math.floor(property.price * 0.1)}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total (1 months)</span>
                    <span>
                      ₹
                      {property.price * 1 + Math.floor(property.price * tenure)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner Contact Info */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Owner Contact:</p>
                <p className="text-sm flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <a
                    href={`tel:${property.hostPhone}`}
                    className="text-blue-600 hover:underline"
                  >
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

        {/* Similar Properties Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Similar Properties You Might Like
          </h2>
          {similarLoading ? (
            <div className="text-center py-8">
              Loading similar properties...
            </div>
          ) : similarProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProperties.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSimilarPropertyClick(item)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {item.location}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-red-600">
                        ₹{item.price}
                        <span className="text-xs font-normal text-slate-500">
                          /mo
                        </span>
                      </span>
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="text-amber-400 fill-amber-400"
                        />
                        <span className="text-xs font-medium">
                          {item.rating}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({item.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No similar properties found.</p>
          )}
        </div>
      </div>

      {/* Visit & Booking Popups */}
      <div className="flex justify-center items-center w-full py-8">
        <div className="flex items-center gap-4">
          <button
          
            onClick={() => setShowVisitPopup(true)}
            className="font-bold text-gray-50 bg-green-600 px-8 py-3 rounded-sm shadow-sm hover:bg-green-700 transition-colors"
          >
            Request for visit
          </button>
          {showvisitpopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-sm shadow-sm flex flex-col gap-4 w-full max-w-md">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">
                    Schedule for visit
                  </h3>
                  <button
                    onClick={() => setShowVisitPopup(false)}
                    className="text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
                <label>Choose Date for Visit</label>
                <input
                value={formData.date}
                onChange={(e)=>setFormData(e.target.value)}
                  type="date"
                  name="date"
                  className="border outline-none border-gray-200 px-5 py-1 bg-white text-slate-900 rounded-sm"
                />
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    Choose Time when to Visit
                  </p>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={()=>setFormData(e.target.value)}
                    name="time"
                    className="w-full border outline-none border-gray-200 px-5 py-3 rounded-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase text-gray-500">
                    Duration
                  </label>
                  <select value={formData.duration} onChange={(e)=>setFormData(e.target.value)} className="w-full border border-gray-200 px-4 py-3 rounded-sm shadow-sm bg-white outline-none appearance-none">
                    <option value="30m">30 Minutes</option>
                    <option value="50m">45 Minutes</option>
                    <option value="1h">60 Minutes</option>
                    <option value="1.5h">1.3 Hours</option>
                    <option value="2h">2 Hours</option>
                  </select>
                </div>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e)=>setFormData(e.target.value)}
                  placeholder="Type your description (Optional)"
                  className="border border-gray-200 p-3 rounded-sm outline-none"
                ></textarea>
                <button onClick={handlerequest} className="font-bold text-white bg-green-600 p-3 rounded-sm hover:bg-green-700 shadow-sm">
                  Confirm Request
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setshowbookingpopup(true)}
            className="font-bold text-white bg-green-600 px-8 py-3 rounded-sm shadow-sm hover:bg-green-700 transition-all active:scale-95"
          >
            Confirm Booking
          </button>
          {showbookingpopup && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="relative w-full max-w-md bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setshowbookingpopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl"
                >
                  ✕
                </button>
                <div className="p-6 border-b border-gray-50">
                  <h3 className="text-xl font-bold text-slate-800">
                    Book this Single room
                  </h3>
                  <p className="text-sm text-gray-500">
                    Review your stay details
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium text-gray-600">
                      Monthly Rent
                    </span>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{property.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium text-gray-600">
                      Security Deposit
                    </span>
                    <span className="text-gray-800 font-semibold">
                      ₹{deposit}
                    </span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="border border-gray-200 p-2.5 rounded-sm shadow-sm text-sm focus:ring-1 focus:ring-green-500 outline-none bg-gray-50"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        Tenure
                      </label>
                      <select
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="border border-gray-200 p-2.5 rounded-sm shadow-sm text-sm bg-gray-50 focus:ring-1 focus:ring-green-500 outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                          <option key={m} value={m}>
                            {m} Months
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">
                        Total Pay Now
                      </p>
                      <p className="text-xs text-slate-400">
                        (Deposit + 1st Month Rent)
                      </p>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                      ₹{totalPayable.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button className="w-full bg-green-600 text-white font-bold py-4 rounded-sm shadow-sm hover:bg-green-700 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
                    Pay & Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
