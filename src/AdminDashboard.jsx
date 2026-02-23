import React, { useState } from "react";
import { Download } from "lucide-react";
import { useAdminProperties } from "./hooks/useAdminProperties";
import AdminSidebar from "./layout/AdminSidebar";
import Dashboard from "./page/admin/Dashboard";
import Properties from "./page/admin/Properties";
import Tenants from "./page/admin/Tenants";
import Earning from "./page/admin/Earning";
import Maintenance from "./page/admin/Maintenance";
import Finance from "./page/admin/Finance";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { properties, loading, fetchProperties } = useAdminProperties();

  // Get unique tenants for finance page
  const tenants = properties
    .filter((p) => p.tenantName)
    .map((p) => ({
      id: p._id,
      name: p.tenantName,
      phone: p.tenantPhone,
      email: p.tenantEmail,
      occupation: p.tenantOccupation,
      avatar: p.tenantAvatar,
      property: p.title,
      propertyId: p._id,
      rent: p.price,
      leaseEnd: p.leaseEnd,
      lastPayment: p.lastPaymentDate,
    }));

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "properties":
        return (
          <Properties
            properties={properties}
            loading={loading}
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            onPropertyUpdate={fetchProperties}
          />
        );
      case "tenants":
        return <Tenants properties={properties} />;
      case "earning":
        return <Earning properties={properties} />;
      case "maintenance":
        return <Maintenance properties={properties} />;
      case "finance":
        return <Finance tenants={tenants} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedProperty={setSelectedProperty}
      />
      <Properties
        properties={properties}
        loading={loading}
        selectedProperty={selectedProperty}
        setSelectedProperty={setSelectedProperty}
        onPropertyUpdate={fetchProperties}
        isAdmin={true} // Set based on user role
      />
      {/* Main Content */}
      <main className=" ">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              {activeTab === "dashboard" && "Admin Dashboard"}
              {activeTab === "properties" && "Property Management"}
              {activeTab === "tenants" && "Tenant Management"}
              {activeTab === "earning" && "Earning Overview"}
              {activeTab === "maintenance" && "Maintenance Requests"}
              {activeTab === "finance" && "Financial Overview"}
            </h1>
            <p className="text-slate-500 mt-1">
              {activeTab === "dashboard" &&
                "Manage your dashboard with comprehensive analytics"}
              {activeTab === "properties" &&
                "View and manage all your listed properties"}
              {activeTab === "tenants" &&
                "Manage your tenants and lease agreements"}
              {activeTab === "earning" &&
                "Monitor your earnings and revenue performance"}
              {activeTab === "maintenance" &&
                "Track and manage maintenance requests"}
              {activeTab === "finance" && "Monitor your financial performance"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={18} /> Export Report
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
