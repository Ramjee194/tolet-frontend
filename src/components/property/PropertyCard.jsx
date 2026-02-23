import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Maximize, MessageSquare, Heart, 
  Star, Clock, Eye, Shield, TrendingUp 
} from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const PropertyCard = ({ 
  property, 
  currentImageIndex, 
  onPrevImage, 
  onNextImage 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property._id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    // Add wishlist logic here
    console.log('Added to wishlist:', property._id);
  };

  const handleMessageClick = (e) => {
    e.stopPropagation();
    // Add message logic here
    console.log('Message host:', property._id);
  };

  const handleViewDealClick = (e) => {
    e.stopPropagation();
    navigate(`/property/${property._id}`);
  };

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <ImageCarousel 
          images={property.images}
          propertyId={property._id}
          currentIndex={currentImageIndex[property._id] || 0}
          onPrev={onPrevImage}
          onNext={onNextImage}
        />

        {/* Tags Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.tags?.slice(0, 3).map((tag, idx) => (
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
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition z-10"
        >
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
          {property.amenities?.slice(0, 3).map((item, idx) => (
            <span key={idx} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">
              {item}
            </span>
          ))}
          {property.amenities?.length > 3 && (
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
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handleMessageClick}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
            >
              <MessageSquare size={16} className="text-slate-500" />
            </button>
            <button 
              onClick={handleViewDealClick}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg transition"
            >
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
  );
};

export default PropertyCard;