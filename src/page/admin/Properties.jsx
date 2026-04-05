import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Grid, List, Home } from "lucide-react";
import PropertyCard from "../../components/admin/PropertyCard";
import PropertyDetail from "../../components/admin/PropertyDetails";
import axios from "axios";
import { propertyApi } from "../../services/api";

const Properties = ({
  properties = [],
  loading,
  selectedProperty,
  setSelectedProperty,
  onPropertyUpdate,
  isAdmin = false,
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [localProperties, setLocalProperties] = useState(properties);
  const [updatingId, setUpdatingId] = useState(null);

  // Update local state when props change - FIXED: Add condition to prevent infinite loop
  useEffect(() => {
    // Only update if properties actually changed
    if (JSON.stringify(properties) !== JSON.stringify(localProperties)) {
      setLocalProperties(properties);
    }
  }, [properties]); // Keep properties in dependency array

  // Get status color for badges
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Handle status change (Approve/Reject)
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/listings/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data) {
        // Update local state
        setLocalProperties((prev) =>
          prev.map((prop) =>
            prop._id === id ? { ...prop, status: newStatus } : prop,
          ),
        );

        // Call parent update if provided
        if (onPropertyUpdate) {
          onPropertyUpdate(res.data);
        }

        alert(`Property ${newStatus} successfully!`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        error.response?.data?.message || "Failed to update property status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter properties based on search and status
  const filteredProperties =
    localProperties && localProperties.length > 0
      ? localProperties.filter((property) => {
          const matchesSearch =
            property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (property.location &&
              property.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()));

          const matchesStatus =
            statusFilter === "All" || property.status === statusFilter;

          return matchesSearch && matchesStatus;
        })
      : [];

  // Handle property update from child
  const handlePropertyUpdate = (updatedProperty) => {
    setLocalProperties((prev) =>
      prev.map((prop) =>
        prop._id === updatedProperty._id ? updatedProperty : prop,
      ),
    );
  };

  // Calculate stats
  const totalProperties = localProperties.length;
  const pendingCount = localProperties.filter(
    (p) => p.status === "Pending",
  ).length;
  const approvedCount = localProperties.filter(
    (p) => p.status === "Approved",
  ).length;
  const rejectedCount = localProperties.filter(
    (p) => p.status === "Rejected",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            {isAdmin ? "Property Management" : "Your Properties"}
          </h2>
          <p className="text-slate-500 mt-1">
            {isAdmin
              ? "Review and manage all property listings"
              : "Manage and monitor all your listed properties"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
            />
          </div>
          <div className="flex border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-red-600 text-white" : "bg-white text-slate-600"}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-red-600 text-white" : "bg-white text-slate-600"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    

      {/* Property Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Total Properties</p>
          <p className="text-2xl font-bold text-slate-900">{totalProperties}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === status ? "bg-red-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {properties.status === "Pending" && (
  <div className="flex gap-2 mt-2">
    <button
      onClick={() => handleStatusChange(properties._id, "Approved")}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Approve
    </button>
    {filteredProperties.map((property) => (
  <PropertyCard
    key={property._id}
    property={property}
    viewMode={viewMode}
    onClick={() => setSelectedProperty(property)}
    onPropertyUpdate={handlePropertyUpdate}
    isAdmin={isAdmin}
    onStatusChange={handleStatusChange}
    getStatusColor={getStatusColor}
    updatingId={updatingId}
  />
))}

    <button
      onClick={() => handleStatusChange(propertyApi._id, "Rejected")}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Reject
    </button>
  </div>
)}




      {/* Properties Grid/List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : !localProperties || localProperties.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100">
          <Home size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            No properties found
          </h3>
          <p className="text-slate-500 mb-6">
            {isAdmin
              ? "No property listings to review"
              : "Get started by adding your first property"}
          </p>
          {!isAdmin && (
            <button
              onClick={() => navigate("/add-property")}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
            >
              <Plus size={18} className="inline mr-2" />
              Add New Property
            </button>
          )}
        </div>
      ) : (
        <>
          {selectedProperty ? (
            // Property Detail View
            <PropertyDetail
              property={selectedProperty}
              onBack={() => setSelectedProperty(null)}
              onPropertyUpdate={handlePropertyUpdate}
              isAdmin={isAdmin}
              onStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              updatingId={updatingId}
            />
          ) : (
            // Grid/List View
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProperties.map(
                (property) => (
                  statusFilter === "All"
                    ? properties
                    : properties.filter((p) => p.status === statusFilter),
                  (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      viewMode={viewMode}
                      onClick={() => setSelectedProperty(property)}
                      onPropertyUpdate={handlePropertyUpdate}
                      isAdmin={isAdmin}
                      onStatusChange={handleStatusChange}
                      getStatusColor={getStatusColor}
                      updatingId={updatingId}
                    />
                  )
                ),
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Properties;
