import React from "react";
import { MapPin, Wrench } from "lucide-react";

const Maintenance = ({ properties = [] }) => { // Add default empty array
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">
          Maintenance Requests
        </h2>
        <p className="text-slate-500 mt-1">
          Track and manage all maintenance requests
        </p>
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
        {properties && properties.length > 0 ? ( // Add check for properties
          properties
            .filter((p) => p.maintenanceRequests > 0)
            .map((property, index) => (
              <div
                key={index}
                className="p-6 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{property.title}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {property.location}
                    </p>
                  </div>
                  {property.tenantName && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">
                        Reported by: {property.tenantName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {property.tenantPhone}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {property.maintenanceItems?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Wrench size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-900">
                          {item.issue}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.date}
                        </span>
                        <button className="text-red-600 text-xs font-bold hover:underline">
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="p-8 text-center text-slate-500">
            No maintenance requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;