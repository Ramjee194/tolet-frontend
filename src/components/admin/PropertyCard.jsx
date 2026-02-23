import React from 'react';
import { MapPin, Bed, Bath, Maximize, Home, Eye, Users, Loader } from 'lucide-react';

const PropertyCard = ({
  property,
  viewMode,
  onClick,
  isAdmin,
  onStatusChange,
  getStatusColor,
  updatingId
}) => {
  const isUpdating = updatingId === property._id;

  if (viewMode === "list") {
    return (
      <div
        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            {property.images && property.images[0] ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <Home size={24} className="text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">{property.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(property.status)}`}
              >
                {property.status || "Pending"}
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin size={14} /> {property.location || "Location not specified"}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="font-bold text-slate-900">
                ₹{property.price}/month
              </span>
            </div>
            
            {/* Admin actions for list view */}
            {isAdmin && property.status === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(property._id, "Approved");
                  }}
                  disabled={isUpdating}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {isUpdating ? <Loader size={12} className="animate-spin" /> : null}
                  Approve
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(property._id, "Rejected");
                  }}
                  disabled={isUpdating}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {isUpdating ? <Loader size={12} className="animate-spin" /> : null}
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48">
        {property.images && property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <Home size={40} className="text-slate-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(property.status)}`}
          >
            {property.status || "Pending"}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye size={12} /> {property.views || 0} views
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 mb-1">{property.title}</h3>
        <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
          <MapPin size={14} /> {property.location || "Location not specified"}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">
            ₹{property.price}/month
          </span>
        </div>
        
        {/* Admin actions */}
        {isAdmin && property.status === "Pending" && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(property._id, "Approved");
              }}
              disabled={isUpdating}
              className="flex-1 px-2 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-1"
            >
              {isUpdating ? <Loader size={12} className="animate-spin" /> : null}
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(property._id, "Rejected");
              }}
              disabled={isUpdating}
              className="flex-1 px-2 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-1"
            >
              {isUpdating ? <Loader size={12} className="animate-spin" /> : null}
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;