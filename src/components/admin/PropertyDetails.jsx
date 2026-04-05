import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Users,
  Loader
} from "lucide-react";
import axios from "axios";

const PropertyDetail = ({
  property,
  onBack,
  onPropertyUpdate,
  isAdmin,
  onStatusChange,
  getStatusColor,
  updatingId
}) => {
  const navigate = useNavigate();
  const isUpdating = updatingId === property._id;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/listings/${property._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          alert("Listing deleted successfully");
          onBack();
        }
      } catch (error) {
        console.log("Failed to delete ", error.message);
        alert("Deletion unsuccessful");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-property/${property._id}`);
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ChevronRight size={20} className="rotate-180" />
        <span>Back to Properties</span>
      </button>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-slate-900">
          {property.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(property.status)}`}
        >
          {property.status || "Pending"}
        </span>
      </div>

      {/* Admin actions for detail view */}
      {isAdmin && property.status === "Pending" && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => onStatusChange(property._id, "Approved")}
            disabled={isUpdating}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isUpdating ? <Loader size={18} className="animate-spin" /> : null}
            Approve Property
          </button>
          <button
            onClick={() => onStatusChange(property._id, "Rejected")}
            disabled={isUpdating}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isUpdating ? <Loader size={18} className="animate-spin" /> : null}
            Reject Property
          </button>
        </div>
      )}

      {/* Rest of your property detail JSX */}
      <p className="text-slate-500 flex items-center gap-1 mb-6">
        <MapPin size={16} /> {property.location || "Location not specified"}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500 mb-1">Monthly Rent</p>
          <p className="text-xl font-bold text-green-600">₹{property.price}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-3">Description</h3>
        <p className="text-slate-600">{property.description}</p>
      </div>

      {/* Edit/Delete buttons for owner */}
      {!isAdmin && (
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
          >
            Edit Property
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;