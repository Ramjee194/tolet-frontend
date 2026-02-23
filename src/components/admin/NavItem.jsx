import React from "react";

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
      active
        ? "bg-red-600 text-white shadow-lg"
        : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

export default NavItem;