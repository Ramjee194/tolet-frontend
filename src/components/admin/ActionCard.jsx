import React from "react";

const ActionCard = ({ icon, title, desc, badge, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 cursor-pointer transition-all group"
  >
    <div
      className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
    >
      {React.cloneElement(icon, { size: 20 })}
    </div>
    {badge && (
      <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2 inline-block tracking-widest">
        {badge}
      </span>
    )}
    <h3 className="text-sm font-black text-slate-800 mb-1">{title}</h3>
    <p className="text-[11px] text-slate-400 font-medium">{desc}</p>
  </div>
);

export default ActionCard;