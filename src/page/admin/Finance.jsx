import React from "react";
import { CheckCircle2 } from "lucide-react";

const Finance = ({ tenants = [] }) => { // Add default empty array
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">
          Financial Overview
        </h2>
        <p className="text-slate-500 mt-1">
          Track your earnings and manage finances
        </p>
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
          <p className="text-sm text-blue-600 mb-2">Security Deposits</p>
          <p className="text-3xl font-black text-slate-900">₹16,000</p>
          <p className="text-xs text-blue-600 mt-2">Held for 4 tenants</p>
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
          {tenants && tenants.length > 0 ? ( // Add check for tenants
            tenants.slice(0, 4).map((tenant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Rent received from {tenant.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tenant.property} • March 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{tenant.rent}</p>
                  <p className="text-xs text-slate-400">5 Mar 2026</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 py-4">
              No recent transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;