import React from "react";
import {
  Users,
  Phone,
  Mail,
  CalendarClock,
  MessageSquare,
  FileText,
} from "lucide-react";

const Tenants = ({ properties = [] }) => { // Add default empty array
  // Get unique tenants - Add safe check
  const tenants = properties && properties.length > 0
    ? properties
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
        }))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">
          Tenant Management
        </h2>
        <p className="text-slate-500 mt-1">
          Manage all your tenants and their details
        </p>
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
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Lease End
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.length > 0 ? (
                tenants.map((tenant, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tenant.avatar}
                          className="w-10 h-10 rounded-full"
                          alt={tenant.name}
                        />
                        <div>
                          <p className="font-bold text-slate-900">
                            {tenant.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {tenant.occupation}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-2">
                          <Phone size={14} className="text-slate-400" />{" "}
                          {tenant.phone}
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" />{" "}
                          {tenant.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-900">
                        {tenant.property}
                      </p>
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No tenants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tenants;