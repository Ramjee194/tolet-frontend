import React, { useState, useEffect } from 'react';
import { 
  Plus, Download, TrendingUp, Home, Users, 
  BarChart3, ArrowUpRight, CheckCircle2, 
  Clock, MessageSquare, Bell, Settings,
  CreditCard, PieChart, FileText, ClipboardCheck,
  Eye, Edit2, Trash2, MapPin, Bed, Bath, Maximize,
  Calendar, Filter, Search, Grid, List, X, Star,
  ChevronRight, DollarSign, Phone, Mail, CalendarClock,
  Wrench, FileCheck, AlertCircle
} from 'lucide-react';
import { FiTool } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data with Indian names
  const stats = [
    { label: "Total Revenue", value: "₹24,580", change: "+12.5%", sub: "This Month", icon: <CreditCard className="text-emerald-600" />, trend: "up" },
    { label: "Occupancy Rate", value: "94.2%", change: "+3.1%", sub: "Current", icon: <PieChart className="text-blue-600" />, trend: "up" },
    { label: "Active Properties", value: "8", change: "+2", sub: "Total", icon: <Home className="text-purple-600" />, trend: "up" },
    { label: "Tenant Satisfaction", value: "4.8/5", change: "+0.2", sub: "Average Rating", icon: <Star className="text-orange-500" />, trend: "up" }
  ];

  const recentActivity = [
    { type: "payment", text: "Rent payment received from Rajesh Kumar", time: "2 hours ago"  },
    { type: "app", text: "New application for Downtown Apartment from Priya Sharma", time: "4 hours ago" },
    { type: "fix", text: "Maintenance request completed at Penthouse Suite", time: "1 day ago",  },
    { type: "msg", text: "Message from Amit Patel about lease renewal", time: "2 days ago" }
  ];

  
  const indianNames = [
    { name: "Rajesh yadav", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Software Engineer" },
    { name: "Priya Sharma", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Doctor" },
    { name: "Amit Patel", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Business Owner" },
    { name: "Sunita Yadav", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Teacher" },
    { name: "Vikram Singh", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Bank Manager" },
    { name: "Anjali Gupta", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Architect" },
    { name: "Rahul Verma", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Marketing Head" },
    { name: "Pooja Yadav", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Fashion Designer" },
    { name: "Suresh yadav", phone: "8404827541", email: "ramjee@gmail.com", occupation: "Chartered Accountant" },
    { name: "Neha yadav", phone: "8404827541", email: "ramjee@gmail.com", occupation: "HR Manager" }
  ];

  // Fetch properties from API
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/v1/listings");
      
      if (res.data && Array.isArray(res.data)) {
        // Enhance properties with additional data using Indian names
        const enhancedProperties = res.data.map((property, index) => {
          const tenantIndex = index % indianNames.length;
          const hasTenant = index % 2 === 0; // Alternate properties have tenants
          
          return {
            ...property,
            views: Math.floor(Math.random() * 300) + 50,
            status: index % 3 === 0 ? 'occupied' : index % 3 === 1 ? 'vacant' : 'maintenance',
            monthlyRevenue: Math.floor(parseInt(property.price) * 0.9),
            ...(hasTenant && {
              tenantName: indianNames[tenantIndex].name,
              tenantPhone: indianNames[tenantIndex].phone,
              tenantEmail: indianNames[tenantIndex].email,
              tenantOccupation: indianNames[tenantIndex].occupation,
              tenantAvatar: `https://ui-avatars.com/api/?name=${indianNames[tenantIndex].name.replace(' ', '+')}&background=random&size=100`,
              leaseStart: '2026-01-01',
              leaseEnd: '2026-12-31',
              rentDueDate: '5th of every month',
              lastPaymentDate: '2026-03-05',
              securityDeposit: Math.floor(parseInt(property.price) * 2),
            }),
            maintenanceRequests: Math.floor(Math.random() * 4),
            maintenanceItems: [
              { id: 1, issue: "AC not working", status: "pending", date: "2026-03-10" },
              { id: 2, issue: "Leaking tap", status: "completed", date: "2026-03-05" }
            ],
            documents: [
              { name: "Lease Agreement.pdf", size: "2.4 MB" },
              { name: "Property Inspection.pdf", size: "1.1 MB" },
              { name: "Rent Receipts.pdf", size: "3.2 MB" }
            ],
            amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Power Backup'],
          };
        });

        setProperties(enhancedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties based on search
  const filteredProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.tenantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique tenants
  const tenants = properties.filter(p => p.tenantName).map(p => ({
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
    lastPayment: p.lastPaymentDate
  }));

  // Render different content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'properties':
        return renderPropertiesContent();
      case 'tenants':
        return renderTenantsContent();
      case 'maintenance':
        return renderMaintenanceContent();
      case 'finance':
        return renderFinanceContent();
      default:
        return renderDashboardContent();
    }
  };

  // Dashboard Content
  const renderDashboardContent = () => (
    <>
      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{s.icon}</div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={12} /> {s.change}
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{s.value}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
              <span className="text-[10px] text-slate-300 font-medium">• {s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* PERFORMANCE ANALYTICS */}
        <div className="xl:col-span-8 space-y-8">
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-black">Performance Analytics</h2>
                <p className="text-sm text-slate-400 font-medium">Track your property performance over time</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl text-xs font-bold">
                <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-green-600">Revenue</button>
                <button className="px-4 py-2 text-slate-400">Occupancy</button>
              </div>
            </div>
            
            {/* Chart Visualization */}
            <div className="h-[300px] w-full relative flex flex-col justify-end gap-2">
              <div className="flex items-end justify-between h-full px-4 border-b border-slate-100">
                {[40, 65, 55, 85, 70, 95].map((h, i) => (
                  <div key={i} className="group relative w-12 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t-lg transition-all group-hover:bg-blue-200" style={{ height: `${h-15}%` }}></div>
                    <div className="w-full bg-green-600 rounded-t-lg -mt-2 shadow-lg shadow-blue-100 transition-all group-hover:bg-green-700" style={{ height: `${h}%` }}></div>
                    <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section>
            <h2 className="text-xl font-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActionCard icon={<Plus />} title="List New Property" desc="Add a new rental property" color="bg-blue-600" onClick={() => navigate("/add-property")} />
              <ActionCard icon={<Users />} title="Screen Tenants" desc="Review pending applications" badge="3 pending" color="bg-purple-600" />
              <ActionCard icon={<CreditCard />} title="Collect Rent" desc="Send reminders & track" color="bg-emerald-600" />
              <ActionCard icon={<FiTool />} title="Schedule Maintenance" desc="Coordinate property upkeep" badge="2 urgent" color="bg-orange-600" />
              <ActionCard icon={<TrendingUp />} title="Market Analysis" desc="View rental market trends" color="bg-indigo-600" />
              <ActionCard icon={<ClipboardCheck />} title="Generate Reports" desc="Create financial reports" color="bg-slate-700" />
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR: RECENT ACTIVITY */}
        <div className="xl:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black">Recent Activity</h2>
              <button className="text-xs font-bold text-green-600 hover:underline">View All</button>
            </div>

            <div className="space-y-8 relative before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">{act.text}</p>
                    <div className="flex items-center gap-2 mt-1 text-slate-400">
                      <Clock size={12} />
                      <span className="text-[11px] font-medium">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Portfolio Insights */}
          <div className="bg-white rounded-[32px] p-8 text-gray-800 relative overflow-hidden border border-slate-100">
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-2">Portfolio Insights</h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-6">Your rental yield in the Downtown area is 12% higher than the local average. Consider increasing rates on renewal.</p>
              <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-black text-sm shadow-xl border border-green-200">Get Full Audit</button>
            </div>
            <TrendingUp size={120} className="absolute -bottom-4 -right-4 text-blue-500/30 rotate-12" />
          </div>
        </div>
      </div>
    </>
  );

  // Properties Content
  const renderPropertiesContent = () => (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Your Properties</h2>
          <p className="text-slate-500 mt-1">Manage and monitor all your listed properties</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="flex border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50">
            <Filter size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Property Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Total Properties</p>
          <p className="text-2xl font-bold text-slate-900">{properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Occupied</p>
          <p className="text-2xl font-bold text-green-600">{properties.filter(p => p.status === 'occupied').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Vacant</p>
          <p className="text-2xl font-bold text-orange-600">{properties.filter(p => p.status === 'vacant').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Under Maintenance</p>
          <p className="text-2xl font-bold text-red-600">{properties.filter(p => p.status === 'maintenance').length}</p>
        </div>
      </div>

      {/* Properties Grid/List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100">
          <Home size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No properties found</h3>
          <p className="text-slate-500 mb-6">Get started by adding your first property</p>
          <button
            onClick={() => navigate("/add-property")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
          >
            <Plus size={18} className="inline mr-2" />
            Add New Property
          </button>
        </div>
      ) : (
        <>
          {selectedProperty ? (
            // Property Detail View
            <PropertyDetail 
              property={selectedProperty} 
              onBack={() => setSelectedProperty(null)} 
            />
          ) : (
            // Grid/List View
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property._id} 
                  property={property} 
                  viewMode={viewMode}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  // Tenants Content with Indian Names
  const renderTenantsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Tenant Management</h2>
        <p className="text-slate-500 mt-1">Manage all your tenants and their details</p>
      </div>

      {/* Tenant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Total Tenants</p>
          <p className="text-2xl font-bold text-slate-900">{tenants.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Active Leases</p>
          <p className="text-2xl font-bold text-green-600">{tenants.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Lease Expiring Soon</p>
          <p className="text-2xl font-bold text-orange-600">2</p>
        </div>
      </div>

      {/* Tenants List */}
      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tenant</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rent</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lease End</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((tenant, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={tenant.avatar} className="w-10 h-10 rounded-full" alt={tenant.name} />
                      <div>
                        <p className="font-bold text-slate-900">{tenant.name}</p>
                        <p className="text-xs text-slate-500">{tenant.occupation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {tenant.phone}</p>
                      <p className="text-sm flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {tenant.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{tenant.property}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-green-600">₹{tenant.rent}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={14} className="text-slate-400" />
                      <span className="text-sm">{tenant.leaseEnd}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                        <MessageSquare size={16} className="text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                        <FileText size={16} className="text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Maintenance Content
  const renderMaintenanceContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Maintenance Requests</h2>
        <p className="text-slate-500 mt-1">Track and manage all maintenance requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Total Requests</p>
          <p className="text-2xl font-bold text-slate-900">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="text-2xl font-bold text-orange-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500">Completed this month</p>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
        {properties.filter(p => p.maintenanceRequests > 0).map((property, index) => (
          <div key={index} className="p-6 border-b border-slate-100 last:border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900">{property.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {property.location}
                </p>
              </div>
              {property.tenantName && (
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">Reported by: {property.tenantName}</p>
                  <p className="text-xs text-slate-500">{property.tenantPhone}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {property.maintenanceItems?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Wrench size={16} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">{item.issue}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                    <button className="text-blue-600 text-xs font-bold hover:underline">Update</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Finance Content
  const renderFinanceContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Financial Overview</h2>
        <p className="text-slate-500 mt-1">Track your earnings and manage finances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">Total Revenue</p>
          <p className="text-3xl font-black text-slate-900">₹24,580</p>
          <p className="text-xs text-green-600 mt-2">↑ 12.5% from last month</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <p className="text-sm text-orange-600 mb-2">Pending Payments</p>
          <p className="text-3xl font-black text-slate-900">₹3,200</p>
          <p className="text-xs text-orange-600 mt-2">2 tenants pending</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <p className="text-sm text-green-600 mb-2">Security Deposits</p>
          <p className="text-3xl font-black text-slate-900">₹16,000</p>
          <p className="text-xs text-green-600 mt-2">Held for 4 tenants</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <p className="text-sm text-purple-600 mb-2">Maintenance Expenses</p>
          <p className="text-3xl font-black text-slate-900">₹5,430</p>
          <p className="text-xs text-purple-600 mt-2">This month</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-[32px] p-6 border border-slate-100">
        <h3 className="text-lg font-black mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {tenants.slice(0, 4).map((tenant, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-500" />
                <div>
                  <p className="font-medium text-slate-900">Rent received from {tenant.name}</p>
                  <p className="text-xs text-slate-500">{tenant.property} • March 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹{tenant.rent}</p>
                <p className="text-xs text-slate-400">5 Mar 2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white text-slate-700 hidden lg:flex flex-col p-6 z-50 border-r border-slate-100">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">Owner Panel</span>
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => {
              setActiveTab('dashboard');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<Home size={20} />} 
            label="Properties" 
            active={activeTab === 'properties'}
            onClick={() => {
              setActiveTab('properties');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Tenants" 
            active={activeTab === 'tenants'}
            onClick={() => {
              setActiveTab('tenants');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<FiTool size={20} />} 
            label="Maintenance" 
            active={activeTab === 'maintenance'}
            onClick={() => {
              setActiveTab('maintenance');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="Finance" 
            active={activeTab === 'finance'}
            onClick={() => {
              setActiveTab('finance');
              setSelectedProperty(null);
            }}
          />
        </nav>

        <div className="pt-6 border-t border-slate-200">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              {activeTab === 'dashboard' && 'Owner Dashboard'}
              {activeTab === 'properties' && 'Property Management'}
              {activeTab === 'tenants' && 'Tenant Management'}
              {activeTab === 'maintenance' && 'Maintenance Requests'}
              {activeTab === 'finance' && 'Financial Overview'}
            </h1>
            <p className="text-slate-500 mt-1">
              {activeTab === 'dashboard' && 'Manage your property portfolio with comprehensive analytics'}
              {activeTab === 'properties' && 'View and manage all your listed properties'}
              {activeTab === 'tenants' && 'Manage your tenants and lease agreements'}
              {activeTab === 'maintenance' && 'Track and manage maintenance requests'}
              {activeTab === 'finance' && 'Monitor your financial performance'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={18} /> Export Report
            </button>
            <button 
              onClick={()=>navigate("/add-property")} 
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-black text-sm shadow-lg hover:bg-green-700 transition-all"
            >
              <Plus size={18} /> Add Property
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ property, viewMode, onClick }) => {
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            {property.images && property.images[0] ? (
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <Home size={24} className="text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">{property.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                property.status === 'occupied' ? 'bg-green-100 text-green-700' :
                property.status === 'vacant' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {property.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin size={14} /> {property.location || "Location not specified"}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="font-bold text-slate-900">₹{property.price}/month</span>
              {property.tenantName && (
                <span className="text-slate-500 flex items-center gap-1">
                  <Users size={14} /> {property.tenantName}
                </span>
              )}
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-400" />
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
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <Home size={40} className="text-slate-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
            property.status === 'occupied' ? 'bg-green-100 text-green-700' :
            property.status === 'vacant' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {property.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye size={12} /> {property.views} views
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 mb-1">{property.title}</h3>
        <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
          <MapPin size={14} /> {property.location || "Location not specified"}
        </p>
        {property.tenantName && (
          <p className="text-xs text-slate-600 mb-2 flex items-center gap-1">
            <Users size={12} /> Tenant: {property.tenantName}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">₹{property.price}/month</span>
          {property.maintenanceRequests > 0 && (
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              {property.maintenanceRequests} maintenance
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Property Detail Component
const PropertyDetail = ({ property, onBack }) => (
  <div className="bg-white rounded-[32px] border border-slate-100 p-8">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
      <ChevronRight size={20} className="rotate-180" />
      <span>Back to Properties</span>
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Images */}
      <div>
        <div className="rounded-2xl overflow-hidden mb-4 h-80">
          {property.images && property.images[0] ? (
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <Home size={60} className="text-slate-400" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {property.images?.slice(1, 5).map((img, idx) => (
            <div key={idx} className="h-20 rounded-lg overflow-hidden">
              <img src={img} alt={`${property.title} ${idx + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Details */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-slate-900">{property.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            property.status === 'occupied' ? 'bg-green-100 text-green-700' :
            property.status === 'vacant' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {property.status}
          </span>
        </div>

        <p className="text-slate-500 flex items-center gap-1 mb-6">
          <MapPin size={16} /> {property.location || "Location not specified"}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Monthly Rent</p>
            <p className="text-xl font-bold text-green-600">₹{property.price}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Total Views</p>
            <p className="text-xl font-bold text-slate-900">{property.views}</p>
          </div>
        </div>

        {property.tenantName && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-3">Current Tenant</h3>
            <div className="flex items-center gap-3 mb-3">
              <img src={property.tenantAvatar} className="w-12 h-12 rounded-full" alt="tenant" />
              <div>
                <p className="font-bold text-slate-900">{property.tenantName}</p>
                <p className="text-sm text-slate-600">{property.tenantOccupation}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="flex items-center gap-2"><Phone size={14} className="text-slate-500" /> {property.tenantPhone}</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-slate-500" /> {property.tenantEmail}</p>
              <p className="flex items-center gap-2"><Calendar size={14} className="text-slate-500" /> Lease: {property.leaseStart} - {property.leaseEnd}</p>
              <p className="flex items-center gap-2"><DollarSign size={14} className="text-slate-500" /> Security: ₹{property.securityDeposit}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-bold text-slate-900 mb-3">Description</h3>
          <p className="text-slate-600">{property.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-slate-900 mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities?.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
            Edit Property
          </button>
          <button className="px-6 py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Navigation Item Component
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
      active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

// Action Card Component
const ActionCard = ({ icon, title, desc, badge, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 cursor-pointer transition-all group"
  >
    <div className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    {badge && <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2 inline-block tracking-widest">{badge}</span>}
    <h3 className="text-sm font-black text-slate-800 mb-1">{title}</h3>
    <p className="text-[11px] text-slate-400 font-medium">{desc}</p>
  </div>
);

export default OwnerDashboard;