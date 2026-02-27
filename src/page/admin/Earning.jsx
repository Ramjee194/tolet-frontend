import React from "react";
import { CheckCircle2, DollarSign } from "lucide-react";

const Earning = ({ properties = [] }) => { // Add default empty array
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Earning Overview</h2>
        <p className="text-slate-500 mt-1">Track your earnings and revenue</p>
      </div>

      {/* Earning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-sm text-green-600 mb-2">Total Earnings</p>
          <p className="text-3xl font-black text-slate-900">₹2,45,800</p>
          <p className="text-xs text-green-600 mt-2">↑ 15.2% from last month</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <p className="text-sm text-blue-600 mb-2">Monthly Revenue</p>
          <p className="text-3xl font-black text-slate-900">₹24,580</p>
          <p className="text-xs text-blue-600 mt-2">Current month</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
          <p className="text-sm text-purple-600 mb-2">Pending Payouts</p>
          <p className="text-3xl font-black text-slate-900">₹3,200</p>
          <p className="text-xs text-purple-600 mt-2">2 pending payments</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <p className="text-sm text-orange-600 mb-2">Average Yield</p>
          <p className="text-3xl font-black text-slate-900">8.5%</p>
          <p className="text-xs text-orange-600 mt-2">Annual return</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100">
        <h3 className="text-lg font-black mb-4">Monthly Earnings</h3>
        <div className="h-[300px] w-full relative flex flex-col justify-end gap-2">
          <div className="flex items-end justify-between h-full px-4 border-b border-slate-100">
            {[65, 75, 85, 70, 95, 80].map((h, i) => (
              <div
                key={i}
                className="group relative w-12 flex flex-col items-center"
              >
                <div
                  className="w-full bg-green-500 rounded-t-lg transition-all group-hover:bg-green-600"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-white rounded-[32px] p-6 border border-slate-100">
        <h3 className="text-lg font-black mb-4">Recent Payouts</h3>
        <div className="space-y-3">
          {properties && properties.length > 0 ? ( 
            
            properties.slice(0, 4).map((property, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium text-slate-900">
                      {property.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {property.tenantName || "No tenant"} • March 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{property.price}</p>
                  <p className="text-xs text-slate-400">5 Mar 2026</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 py-4">
              No payout data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earning;