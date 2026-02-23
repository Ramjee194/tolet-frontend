// components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Home,
  Users,
  DollarSign,
  FileText,
  Settings,
  Wrench
} from 'lucide-react';
import { FiTool } from 'react-icons/fi';

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin/dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { path: '/admin/properties', icon: <Home size={20} />, label: 'Properties' },
    { path: '/admin/tenants', icon: <Users size={20} />, label: 'Tenants' },
    { path: '/admin/earning', icon: <DollarSign size={20} />, label: 'Earning' },
    { path: '/admin/maintenance', icon: <FiTool size={20} />, label: 'Maintenance' },
    { path: '/admin/finance', icon: <FileText size={20} />, label: 'Finance' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white text-slate-700 hidden lg:flex flex-col p-6 z-50 border-r border-slate-100">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-red-600 p-2 rounded-lg">
          <Home size={24} className="text-white" />
        </div>
        <span className="text-xl font-black tracking-tight">Admin Panel</span>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {item.icon} <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200">
        <NavLink
          to="/admin/settings"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
        >
          <Settings size={20} /> <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;