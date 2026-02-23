import React from "react";
import {
  Plus,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CreditCard,
  Users,
  ClipboardCheck,
  Home,
} from "lucide-react";
import { FiTool } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ActionCard from "../../components/admin/ActionCard";
import { stats, recentActivity } from "../../utils/constants";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl">{s.icon}</div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={12} /> {s.change}
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{s.value}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {s.label}
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                • {s.sub}
              </span>
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
                <p className="text-sm text-slate-400 font-medium">
                  Track your property performance over time
                </p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl text-xs font-bold">
                <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-green-600">
                  Revenue
                </button>
                <button className="px-4 py-2 text-slate-400">Occupancy</button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="h-[300px] w-full relative flex flex-col justify-end gap-2">
              <div className="flex items-end justify-between h-full px-4 border-b border-slate-100">
                {[40, 65, 55, 85, 70, 95].map((h, i) => (
                  <div
                    key={i}
                    className="group relative w-12 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-blue-100 rounded-t-lg transition-all group-hover:bg-blue-200"
                      style={{ height: `${h - 15}%` }}
                    ></div>
                    <div
                      className="w-full bg-green-600 rounded-t-lg -mt-2 shadow-lg shadow-blue-100 transition-all group-hover:bg-green-700"
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section>
            <h2 className="text-xl font-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActionCard
                icon={<Plus />}
                title="List New Property"
                desc="Add a new rental property"
                color="bg-blue-600"
                onClick={() => navigate("/add-property")}
              />
              <ActionCard
                icon={<Users />}
                title="Screen Tenants"
                desc="Review pending applications"
                badge="3 pending"
                color="bg-purple-600"
              />
              <ActionCard
                icon={<CreditCard />}
                title="Collect Rent"
                desc="Send reminders & track"
                color="bg-emerald-600"
              />
              <ActionCard
                icon={<FiTool />}
                title="Schedule Maintenance"
                desc="Coordinate property upkeep"
                badge="2 urgent"
                color="bg-orange-600"
              />
              <ActionCard
                icon={<TrendingUp />}
                title="Market Analysis"
                desc="View rental market trends"
                color="bg-indigo-600"
              />
              <ActionCard
                icon={<ClipboardCheck />}
                title="Generate Reports"
                desc="Create financial reports"
                color="bg-slate-700"
              />
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR: RECENT ACTIVITY */}
        <div className="xl:col-span-4 space-y-6">
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black">Recent Activity</h2>
              <button className="text-xs font-bold text-green-600 hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-8 relative before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                    {act.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">
                      {act.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-slate-400">
                      <Clock size={12} />
                      <span className="text-[11px] font-medium">
                        {act.time}
                      </span>
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
              <p className="text-slate-800 text-sm leading-relaxed mb-6">
                Your rental yield in the Downtown area is 12% higher than the
                local average. Consider increasing rates on renewal.
              </p>
              <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-black text-sm shadow-xl border border-green-200">
                Get Full Audit
              </button>
            </div>
            <TrendingUp
              size={120}
              className="absolute -bottom-4 -right-4 text-blue-500/30 rotate-12"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;