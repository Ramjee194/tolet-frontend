import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  RefreshCw,
  ChevronDown,
  X,
  Home,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Award,
  Car,
  Plus,
  Minus,
  Eye,
  Users,
  Calendar,
  Bed,
  Bath,
  Maximize,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import axios from "axios";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertySkeleton from "../components/property/PropertySkeleton";
import SearchBar from "../components/property/SearchBar";
import { Footer } from "../components/layout/Footer";

// Leaflet imports (unchanged)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

// ----------------------------------------------------------------------
// Professional Property Card Component (unchanged)
// ----------------------------------------------------------------------
const ProfessionalPropertyCard = ({ property, onClick }) => {
  const {
    _id,
    title = "Luxury 3BR Penthouse with Terrace",
    price = 8500,
    rating = 4.9,
    reviews = 31,
    location = "SoHo, Manhattan",
    beds = 3,
    baths = 3,
    sqft = 2200,
    hostResponse = "Instant response",
    communityRating = 4.8,
    amenities = ["Terrace", "Fireplace", "Wine Cellar"],
    images = [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
    ],
    featured = true,
    verified = true,
    instantBook = true,
  } = property;

  const host = property?.ownerId?.name || "";

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          Approved
        </div>
      )}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500";
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {verified && (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
              Verified
            </span>
          )}
          {instantBook && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
              Instant Book
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-slate-500 text-sm">/month</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-sm text-slate-700">
              {rating}
            </span>
            <span className="text-slate-400 text-xs">({reviews})</span>
          </div>
        </div>
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin size={14} />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 text-sm border-y border-slate-100 py-3 mb-3">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{beds} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{baths} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{sqft} sqft</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {property?.profileImage ? (
              <img
                src={property.profileImage}
                alt="host"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {host?.charAt(0) || "H"}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{host}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                {hostResponse}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Community</p>
            <p className="font-semibold text-sm text-slate-700">
              {communityRating}/5
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {amenities.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md"
            >
              {item}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md">
              +{amenities.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleViewDetails}
            className="flex-1 border border-red-200 hover:border-red-300 text-red-600 font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm bg-white hover:bg-red-50"
          >
            View Details
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main PropertySearch Component
// ----------------------------------------------------------------------
const PropertySearch = () => {
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showMap, setShowMap] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    priceMin: 5000,
    priceMax: 100000,
    selectedAmenities: [],
    propertyType: "",
    availability: "",
    search: "",
    sort: "best-match",
  });

  // Local UI filter values
  const [priceRange, setPriceRange] = useState([5000, 100000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [availability, setAvailability] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("best-match");

  // Dynamic filter options from backend
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [availabilityOptions, setAvailabilityOptions] = useState([]);
  const [loadingFilterOptions, setLoadingFilterOptions] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 9;

  // Data states
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [trendingProperties, setTrendingProperties] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);

  const debounceTimer = useRef(null);

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recently viewed", e);
      }
    }
  }, []);

  // Fetch trending properties
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setTrendingLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/auth/v1/listings/trending"
        );
        if (res.data && Array.isArray(res.data)) {
          setTrendingProperties(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Trending fetch failed", err);
        if (listings.length > 0) {
          setTrendingProperties(listings.slice(0, 3));
        }
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, [listings]);

  // Fetch all filter options from backend
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoadingFilterOptions(true);
      try {
        const [amenitiesRes, typesRes, availRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/filters/amenities"),
          axios.get("http://localhost:5000/api/auth/filters/property-types"),
          axios.get("http://localhost:5000/api/auth/filters/availability"),
        ]);

        if (Array.isArray(amenitiesRes.data)) setAmenityOptions(amenitiesRes.data);
        if (Array.isArray(typesRes.data)) setPropertyTypeOptions(typesRes.data);
        if (Array.isArray(availRes.data)) setAvailabilityOptions(availRes.data);
      } catch (err) {
        console.error("Failed to load filter options", err);
        // Fallback static lists (same as schema)
        setAmenityOptions([
          "Parking","Gym","24*7","Powerbackup","Lift","Swimmingpool",
          "Garden","Playground","CCTV","Water Supply","Internet/Wifi","Air-Conditioning"
        ]);
        setPropertyTypeOptions(["Apartment", "Villa", "PG/Hostel", "Office Space"]);
        setAvailabilityOptions(["immediate", "within15"]);
      } finally {
        setLoadingFilterOptions(false);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch listings with current filters
  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        propertyType: filters.propertyType || undefined,
        availability: filters.availability || undefined,
        search: filters.search || undefined,
        sort: filters.sort,
      };
      if (filters.selectedAmenities.length > 0) {
        params.selectedAmenities = filters.selectedAmenities.join(",");
      }

      const res = await axios.get(
        "http://localhost:5000/api/auth/v1/listings",
        { params }
      );
      if (res.data) {
        if (Array.isArray(res.data)) {
          setListings(res.data);
          setTotalCount(res.data.length);
        } else {
          setListings(res.data.listings || []);
          setTotalCount(res.data.totalCount || res.data.listings?.length || 0);
        }
      }
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // Debounced effect for filter changes
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchListings();
    }, 500);
    return () => clearTimeout(debounceTimer.current);
  }, [filters, currentPage, fetchListings]);

  // Sync local UI states to filters
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    }));
  }, [priceRange]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, selectedAmenities }));
  }, [selectedAmenities]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, propertyType }));
  }, [propertyType]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, availability }));
  }, [availability]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, sort: sortOption }));
  }, [sortOption]);

  // Filter setters with page reset
  const setPriceRangeWithReset = (newRange) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setCurrentPage(1);
  };
  const setPropertyTypeWithReset = (value) => {
    setPropertyType(value);
    setCurrentPage(1);
  };
  const setAvailabilityWithReset = (value) => {
    setAvailability(value);
    setCurrentPage(1);
  };
  const setSearchQueryWithReset = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const setSortOptionWithReset = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceRange([5000, 100000]);
    setSelectedAmenities([]);
    setPropertyType("");
    setAvailability("");
    setSearchQuery("");
    setSortOption("best-match");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchListings();
  };

  // Track view when property card is clicked
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
    setRecentlyViewed(newRecent);
  };

  const handlePropertyClick = (property) => {
    trackPropertyView(property);
    navigate(`/property/${property._id}`);
  };

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMore = totalCount > currentPage * itemsPerPage;

  // Quick filters – now using correct strings
  const quickFilters = [
    {
      label: "Under ₹15k",
      icon: <Minus size={14} />,
      action: () => setPriceRangeWithReset([5000, 15000]),
    },
    {
      label: "2 BHK+",
      icon: <Home size={14} />,
      // Use first property type from options if available, otherwise default
      action: () => setPropertyTypeWithReset(propertyTypeOptions[0] || "Apartment"),
    },
    {
      label: "With Parking",
      icon: <Car size={14} />,
      action: () => toggleAmenity("Parking"),
    },
  ];

  // If loading initially and no listings
  if (loading && !refreshing && listings.length === 0) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      <SearchBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSearch={setSearchQueryWithReset}
        searchValue={searchQuery}
      />

      {/* Hero Stats / Trust Badges (unchanged) */}
      <div className="max-w-7xl mx-auto px-4 mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Shield size={14} className="text-green-500" />
          <span>Verified properties</span>
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Award size={14} className="text-amber-500" />
          <span>10k+ happy tenants</span>
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Users size={14} className="text-blue-500" />
          <span>4.8 avg rating</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Quick Filter Chips */}
        {/* <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-slate-700 mr-2">
            Quick filters:
          </span>
          {quickFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={filter.action}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs hover:border-red-300 transition"
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
          <button className="text-xs text-red-600 hover:underline ml-2">
            + More
          </button>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-xs text-red-600 hover:underline"
              >
                Clear all
              </button>
            </div>
            <PropertyFilters />

            {/* Price Range */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold mb-3">Price Range (₹)</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRangeWithReset([+e.target.value, priceRange[1]])
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRangeWithReset([priceRange[0], +e.target.value])
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Amenities – dynamic */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {loadingFilterOptions ? (
                  <div className="text-sm text-slate-500">Loading amenities...</div>
                ) : (
                  amenityOptions.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-slate-300"
                      />
                      {amenity}
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Property Type – dynamic */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold mb-3">Property Type</h3>
              <select
                value={propertyType}
                onChange={(e) => setPropertyTypeWithReset(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">Any</option>
                {propertyTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability – dynamic */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === option}
                      onChange={() => setAvailabilityWithReset(option)}
                      className="rounded"
                    />
                    {option}
                  </label>
                ))}
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === ""}
                    onChange={() => setAvailabilityWithReset("")}
                    className="rounded"
                  />
                  Any
                </label>
              </div>
            </div>

            <button
              onClick={fetchListings}
              className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Apply Filters
            </button>
          </aside>

          {/* Main Content (unchanged except for listings rendering) */}
          <main className="lg:col-span-9 space-y-8">
            {/* Header with results count and sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {totalCount}+ stays in India
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {totalCount} properties
                  </span>
                  <span>Most guests book within 24 hours</span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-slate-400" /> 2.5k views today
                  </span>
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
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition flex items-center gap-2"
                >
                  <MapPin size={18} />
                  <span className="hidden sm:inline">
                    {showMap ? "Hide" : "Show"} Map
                  </span>
                </button>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOptionWithReset(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium focus:outline-none"
                  >
                    <option value="best-match">Sort: Best Match</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow transition"
                  title="Refresh"
                >
                  <RefreshCw
                    size={18}
                    className={refreshing ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Map (unchanged) */}
            {showMap && (
              <div className="h-96 rounded-2xl overflow-hidden relative z-0">
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {listings.map(
                    (property) =>
                      property.coordinates && (
                        <Marker
                          key={property._id}
                          position={[
                            property.coordinates.lat,
                            property.coordinates.lng,
                          ]}
                          eventHandlers={{
                            click: () => navigate(`/property/${property._id}`),
                          }}
                        >
                          <Popup>
                            <div className="text-sm">
                              <strong>{property.title}</strong>
                              <br />₹{property.price}/month
                              <br />
                              <button
                                onClick={() =>
                                  navigate(`/property/${property._id}`)
                                }
                                className="text-red-600 hover:underline mt-1"
                              >
                                View details
                              </button>
                            </div>
                          </Popup>
                        </Marker>
                      ),
                  )}
                </MapContainer>
              </div>
            )}

            {/* Recently Viewed (unchanged) */}
            {recentlyViewed.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" />
                    Recently viewed
                  </h2>
                  <button className="text-sm text-blue-600 hover:underline">
                    View all
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {recentlyViewed.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/property/${item.id}`)}
                      className="flex-shrink-0 w-48 bg-slate-50 rounded-lg overflow-hidden cursor-pointer hover:shadow transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-24 w-full object-cover"
                      />
                      <div className="p-2">
                        <p className="font-medium text-sm truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.location}
                        </p>
                        <p className="text-xs font-bold mt-1">
                          ₹{item.price}/mo
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending (unchanged) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <TrendingUp size={18} className="text-red-500" />
                  Trending in your area
                </h2>
                <button className="text-sm text-red-600 hover:underline">
                  See all
                </button>
              </div>
              {trendingLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-100 animate-pulse h-48 rounded-xl"
                    ></div>
                  ))}
                </div>
              ) : trendingProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingProperties.map((item) => (
                    <div
                      key={item._id}
                      className="relative bg-slate-50 rounded-xl overflow-hidden cursor-pointer hover:shadow transition group"
                      onClick={() => navigate(`/property/${item._id}`)}
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="h-32 w-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Trending
                      </span>
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {item.location}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-sm">
                            ₹{item.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                            <span className="text-xs">
                              {item.rating || 4.5}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-4">
                  No trending properties found.
                </p>
              )}
            </div>

            {/* Main listings */}
            {error ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
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
                  <RefreshCw
                    size={18}
                    className={refreshing ? "animate-spin" : ""}
                  />
                  Try Again
                </button>
              </div>
            ) : listings.length === 0 ? (
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
              <>
                <div
                  className={`grid grid-cols-1 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-1"} gap-6`}
                >
                  {listings.map((property) => (
                    <ProfessionalPropertyCard
                      key={property._id}
                      property={property}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition flex items-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCw size={18} className="animate-spin" />
                      ) : (
                        <Plus size={18} />
                      )}
                      Load more properties
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Trust Signals (unchanged) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Secure Booking</h4>
                  <p className="text-xs text-slate-500">
                    Your payments are protected
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">24/7 Support</h4>
                  <p className="text-xs text-slate-500">
                    We're here to help anytime
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Free Cancellation</h4>
                  <p className="text-xs text-slate-500">
                    Up to 24 hours before move-in
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter (unchanged) */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Get notified about new properties
              </h3>
              <p className="text-sm text-red-100 mb-4">
                Be the first to know when new listings match your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-slate-900"
                />
                <button className="px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50">
                  Subscribe
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer – same updates as desktop */}
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
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRangeWithReset([+e.target.value, priceRange[1]])
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRangeWithReset([priceRange[0], +e.target.value])
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="space-y-2 mb-4">
                {loadingFilterOptions ? (
                  <div className="text-sm">Loading...</div>
                ) : (
                  amenityOptions.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      {amenity}
                    </label>
                  ))
                )}
              </div>

              <h3 className="font-semibold mb-2">Property Type</h3>
              <select
                value={propertyType}
                onChange={(e) => setPropertyTypeWithReset(e.target.value)}
                className="w-full border p-2 rounded-lg mb-4"
              >
                <option value="">Any</option>
                {propertyTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <h3 className="font-semibold mb-2">Availability</h3>
              <div className="space-y-2 mb-4">
                {availabilityOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mobile-availability"
                      checked={availability === option}
                      onChange={() => setAvailabilityWithReset(option)}
                    />
                    {option}
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mobile-availability"
                    checked={availability === ""}
                    onChange={() => setAvailabilityWithReset("")}
                  />
                  Any
                </label>
              </div>

              <button
                onClick={() => {
                  fetchListings();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  clearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full mt-2 border border-red-600 text-red-600 py-3 rounded-xl"
              >
                Clear All
              </button>
            </div>
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