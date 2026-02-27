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

  // Realistic stats with proper Indian formatting
  const stats = [
    { 
      label: "Revenue this month", 
      value: "₹24,580", 
      change: "+12.5%", 
      sub: "vs last month", 
      icon: <CreditCard className="text-blue-600" />, 
      trend: "up" 
    },
    { 
      label: "Properties occupied", 
      value: "12", 
      change: "2 vacant", 
      sub: "out of 14 total", 
      icon: <Home className="text-indigo-600" />, 
      trend: "neutral" 
    },
    { 
      label: "Pending dues", 
      value: "₹3,200", 
      change: "from 2 tenants", 
      sub: "overdue by 5 days", 
      icon: <AlertCircle className="text-amber-600" />, 
      trend: "down" 
    },
    { 
      label: "Maintenance requests", 
      value: "4", 
      change: "2 urgent", 
      sub: "this week", 
      icon: <Wrench className="text-orange-600" />, 
      trend: "neutral" 
    }
  ];

  const recentActivity = [
    { 
      type: "payment", 
      text: "Rent payment received from Rajesh Kumar", 
      time: "2 hours ago",
      icon: <CheckCircle2 size={16} className="text-green-600" />
    },
    { 
      type: "application", 
      text: "New application for Downtown Apartment from Priya Sharma", 
      time: "4 hours ago",
      icon: <Users size={16} className="text-blue-600" />
    },
    { 
      type: "maintenance", 
      text: "Maintenance request completed at Penthouse Suite", 
      time: "1 day ago",
      icon: <Wrench size={16} className="text-orange-600" />
    },
    { 
      type: "message", 
      text: "Message from Amit Patel about lease renewal", 
      time: "2 days ago",
      icon: <MessageSquare size={16} className="text-purple-600" />
    }
  ];

  const indianNames = [
    { name: "Rajesh Yadav", phone: "98765 43210", email: "rajesh.y@email.com", occupation: "Software Engineer" },
    { name: "Priya Sharma", phone: "99887 66554", email: "priya.s@email.com", occupation: "Doctor" },
    { name: "Amit Patel", phone: "98765 12345", email: "amit.p@email.com", occupation: "Business Owner" },
    { name: "Sunita Yadav", phone: "98765 67890", email: "sunita.y@email.com", occupation: "Teacher" },
    { name: "Vikram Singh", phone: "99887 11223", email: "vikram.s@email.com", occupation: "Bank Manager" },
    { name: "Anjali Gupta", phone: "98765 44556", email: "anjali.g@email.com", occupation: "Architect" },
    { name: "Rahul Verma", phone: "99887 77889", email: "rahul.v@email.com", occupation: "Marketing Head" },
    { name: "Pooja Yadav", phone: "98765 99001", email: "pooja.y@email.com", occupation: "Fashion Designer" },
    { name: "Suresh Yadav", phone: "99887 22334", email: "suresh.y@email.com", occupation: "Chartered Accountant" },
    { name: "Neha Yadav", phone: "98765 55667", email: "neha.y@email.com", occupation: "HR Manager" }
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/v1/listings");
      
      if (res.data && Array.isArray(res.data)) {
        const enhancedProperties = res.data.map((property, index) => {
          const tenantIndex = index % indianNames.length;
          const hasTenant = index % 2 === 0;
          
          return {
            ...property,
            views: Math.floor(Math.random() * 200) + 30,
            status: index % 3 === 0 ? 'occupied' : index % 3 === 1 ? 'vacant' : 'maintenance',
            monthlyRevenue: Math.floor(parseInt(property.price) * 0.9),
            ...(hasTenant && {
              tenantName: indianNames[tenantIndex].name,
              tenantPhone: indianNames[tenantIndex].phone,
              tenantEmail: indianNames[tenantIndex].email,
              tenantOccupation: indianNames[tenantIndex].occupation,
              tenantAvatar: `https://ui-avatars.com/api/?name=${indianNames[tenantIndex].name.replace(' ', '+')}&background=4f46e5&color=fff&size=100`,
              leaseStart: '2026-01-01',
              leaseEnd: '2026-12-31',
              rentDueDate: '5th of every month',
              lastPaymentDate: '2026-03-05',
              securityDeposit: Math.floor(parseInt(property.price) * 2),
            }),
            maintenanceRequests: Math.floor(Math.random() * 3),
            maintenanceItems: [
              { id: 1, issue: "AC not cooling properly", status: "pending", date: "2026-03-10", priority: "high" },
              { id: 2, issue: "Kitchen sink leaking", status: "in-progress", date: "2026-03-08", priority: "medium" }
            ].slice(0, Math.floor(Math.random() * 2) + 1),
            documents: [
              { name: "Lease Agreement.pdf", size: "2.4 MB" },
              { name: "Property Inspection Report.pdf", size: "1.1 MB" }
            ],
            amenities: ['Gym', 'Pool', 'Parking', 'Security'],
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

  const filteredProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.tenantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const renderDashboardContent = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-gray-50 rounded-lg">
                {s.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                s.trend === 'up' ? 'bg-green-50 text-green-700' :
                s.trend === 'down' ? 'bg-red-50 text-red-700' :
                'bg-gray-50 text-gray-700'
              }`}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-semibold mt-3 text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>This year</option>
              </select>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2">
              {[65, 45, 80, 55, 70, 85].map((h, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-green-500 rounded-t-lg" 
                    style={{ height: `${h}px` }}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Home size={18} className="text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Quick actions</h4>
              </div>
              <button 
                onClick={() => navigate("/add-property")}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-2"
              >
                <Plus size={16} className="text-gray-400" /> Add new property
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-2">
                <FileText size={16} className="text-gray-400" /> Generate rent receipts
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-2">
                <MessageSquare size={16} className="text-gray-400" /> Send reminders
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <AlertCircle size={18} className="text-amber-600" />
                </div>
                <h4 className="font-medium text-gray-900">Need attention</h4>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">2 rent payments overdue</p>
                <p className="text-sm text-gray-600">3 maintenance requests pending</p>
                <p className="text-sm text-gray-600">1 lease expiring this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5">{act.icon}</div>
                <div>
                  <p className="text-sm text-gray-800">{act.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderPropertiesContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your properties</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your listed properties</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
            >
              <Grid size={18} className={viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400'} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
            >
              <List size={18} className={viewMode === 'list' ? 'text-gray-900' : 'text-gray-400'} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total properties</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-xl font-semibold text-green-600 mt-1">
            {properties.filter(p => p.status === 'occupied').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Vacant</p>
          <p className="text-xl font-semibold text-amber-600 mt-1">
            {properties.filter(p => p.status === 'vacant').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Under maintenance</p>
          <p className="text-xl font-semibold text-orange-600 mt-1">
            {properties.filter(p => p.status === 'maintenance').length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
          <Home size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first property</p>
          <button
            onClick={() => navigate("/add-property")}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
          >
            <Plus size={16} className="inline mr-1" />
            Add property
          </button>
        </div>
      ) : (
        <>
          {selectedProperty ? (
            <PropertyDetail 
              property={selectedProperty} 
              onBack={() => setSelectedProperty(null)} 
            />
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
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

  const renderTenantsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Tenants</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your tenants and lease agreements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total tenants</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{tenants.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Active leases</p>
          <p className="text-xl font-semibold text-green-600 mt-1">{tenants.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Leases ending soon</p>
          <p className="text-xl font-semibold text-amber-600 mt-1">2</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Tenant</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Rent</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Lease end</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tenants.map((tenant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={tenant.avatar} className="w-8 h-8 rounded-full" alt={tenant.name} />
                      <div>
                        <p className="font-medium text-gray-900">{tenant.name}</p>
                        <p className="text-xs text-gray-500">{tenant.occupation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{tenant.phone}</p>
                      <p className="text-sm text-gray-600">{tenant.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-900">{tenant.property}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">₹{tenant.rent}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-600">{tenant.leaseEnd}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MessageSquare size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Maintenance</h2>
        <p className="text-sm text-gray-500 mt-1">Track and manage maintenance requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Open requests</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">In progress</p>
          <p className="text-xl font-semibold text-amber-600 mt-1">2</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Completed this month</p>
          <p className="text-xl font-semibold text-green-600 mt-1">6</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
        {properties.filter(p => p.maintenanceRequests > 0).map((property, index) => (
          <div key={index} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{property.location}</p>
              </div>
              {property.tenantName && (
                <span className="text-xs text-gray-500">Reported by {property.tenantName}</span>
              )}
            </div>

            <div className="space-y-2">
              {property.maintenanceItems?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-900">{item.issue}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'pending' ? 'bg-amber-50 text-amber-700' : 
                      item.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinanceContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Finances</h2>
        <p className="text-sm text-gray-500 mt-1">Track earnings and manage finances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total revenue</p>
          <p className="text-2xl font-semibold text-gray-900">₹24,580</p>
          <p className="text-xs text-green-600 mt-2">↑ 12.5% from last month</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Pending payments</p>
          <p className="text-2xl font-semibold text-amber-600">₹3,200</p>
          <p className="text-xs text-gray-500 mt-2">From 2 tenants</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Security deposits</p>
          <p className="text-2xl font-semibold text-gray-900">₹16,000</p>
          <p className="text-xs text-gray-500 mt-2">Held for 4 tenants</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Maintenance expenses</p>
          <p className="text-2xl font-semibold text-orange-600">₹5,430</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-medium text-gray-900 mb-4">Recent transactions</h3>
        <div className="space-y-3">
          {tenants.slice(0, 4).map((tenant, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Rent from {tenant.name}</p>
                  <p className="text-xs text-gray-500">{tenant.property}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{tenant.rent}</p>
                <p className="text-xs text-gray-500">5 Mar 2026</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 hidden lg:block">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center">
              <Home size={16} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900">Owner Dashboard</span>
          </div>
        </div>
        
        <nav className="p-3">
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => {
              setActiveTab('dashboard');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<Home size={18} />} 
            label="Properties" 
            active={activeTab === 'properties'}
            onClick={() => {
              setActiveTab('properties');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Tenants" 
            active={activeTab === 'tenants'}
            onClick={() => {
              setActiveTab('tenants');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<Wrench size={18} />} 
            label="Maintenance" 
            active={activeTab === 'maintenance'}
            onClick={() => {
              setActiveTab('maintenance');
              setSelectedProperty(null);
            }}
          />
          <NavItem 
            icon={<FileText size={18} />} 
            label="Finances" 
            active={activeTab === 'finance'}
            onClick={() => {
              setActiveTab('finance');
              setSelectedProperty(null);
            }}
          />
          <div className="border-t border-gray-200 my-4"></div>
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      <main className="lg:ml-56 p-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'properties' && 'Properties'}
              {activeTab === 'tenants' && 'Tenants'}
              {activeTab === 'maintenance' && 'Maintenance'}
              {activeTab === 'finance' && 'Finances'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Download size={16} /> Export
            </button>
            <button 
              onClick={()=>navigate("/add-property")} 
              className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
            >
              <Plus size={16} /> Add property
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

const PropertyCard = ({ property, viewMode, onClick }) => {
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
            {property.images && property.images[0] ? (
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Home size={24} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                property.status === 'occupied' ? 'bg-green-50 text-green-700' :
                property.status === 'vacant' ? 'bg-amber-50 text-amber-700' :
                'bg-orange-50 text-orange-700'
              }`}>
                {property.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{property.location || "Location not specified"}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm font-medium text-gray-900">₹{property.price}/mo</span>
              {property.tenantName && (
                <span className="text-xs text-gray-500">{property.tenantName}</span>
              )}
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition overflow-hidden"
      onClick={onClick}
    >
      <div className="h-40 bg-gray-100 relative">
        {property.images && property.images[0] ? (
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home size={32} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            property.status === 'occupied' ? 'bg-green-50 text-green-700' :
            property.status === 'vacant' ? 'bg-amber-50 text-amber-700' :
            'bg-orange-50 text-orange-700'
          }`}>
            {property.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-2 truncate">{property.location || "Location not specified"}</p>
        {property.tenantName && (
          <p className="text-xs text-gray-600 mb-2">Tenant: {property.tenantName}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">₹{property.price}/mo</span>
          {property.maintenanceRequests > 0 && (
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
              {property.maintenanceRequests} request{property.maintenanceRequests > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const PropertyDetail = ({ property, onBack }) => {
  const navigate = useNavigate();
 
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/auth/v1/listings/${property._id}`);
        console.log(res.data);
        alert('Property deleted successfully');
        onBack();
      } catch (error) {
        console.log(error.message);
        alert('Failed to delete property');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronRight size={18} className="rotate-180" />
        <span className="text-sm">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden mb-3 h-64 bg-gray-100">
            {property.images && property.images[0] ? (
              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Home size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          {property.images && property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {property.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
            <span className={`text-xs px-3 py-1 rounded-full ${
              property.status === 'occupied' ? 'bg-green-50 text-green-700' :
              property.status === 'vacant' ? 'bg-amber-50 text-amber-700' :
              'bg-orange-50 text-orange-700'
            }`}>
              {property.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
            <MapPin size={14} /> {property.location || "Location not specified"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Monthly rent</p>
              <p className="text-lg font-semibold text-gray-900">₹{property.price}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Total views</p>
              <p className="text-lg font-semibold text-gray-900">{property.views}</p>
            </div>
          </div>

          {property.tenantName && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Current tenant</h3>
              <div className="flex items-center gap-3 mb-3">
                <img src={property.tenantAvatar} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <p className="font-medium text-gray-900">{property.tenantName}</p>
                  <p className="text-sm text-gray-600">{property.tenantOccupation}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">{property.tenantPhone}</p>
                <p className="text-gray-600">{property.tenantEmail}</p>
                <p className="text-gray-600">Lease ends: {property.leaseEnd}</p>
                <p className="text-gray-600">Security: ₹{property.securityDeposit}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600">{property.description}</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => navigate("/add-property")} 
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition mb-1 ${
      active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

export default OwnerDashboard;