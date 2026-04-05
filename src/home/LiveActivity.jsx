import { motion, AnimatePresence } from "framer-motion";
import { FaCircle, FaChartLine, FaGlobeAmericas, FaBolt } from "react-icons/fa";

const activities = [
  { id: 1, type: "Lease", text: "New rental agreement signed in Ramjee Yadav, Lucknow", time: "2m ago", color: "bg-green-500", iconColor: "text-green-500" },
  { id: 2, type: "Listing", text: "Luxury Penthouse listed in Shalu, Gomtinagar", time: "5m ago", color: "bg-blue-500", iconColor: "text-blue-500" },
  { id: 3, type: "Approval", text: "Tenant application approved ,Kamta", time: "8m ago", color: "bg-purple-500", iconColor: "text-purple-500" },
  { id: 4, type: "Tour", text: "Property tour scheduled in Smriti mandan, SDE-1", time: "12m ago", color: "bg-orange-500", iconColor: "text-orange-500" },
  { id: 5, type: "Payment", text: "Security deposit received for Kumar, TX", time: "15m ago", color: "bg-emerald-500", iconColor: "text-emerald-500" },
];

export default function LiveActivity() {
  return (
    <section className="bg-[#F8FAFC] py-2 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* --- BRAND HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-600 font-bold tracking-widest text-xs uppercase mb-3"
            >
              <FaBolt className="animate-pulse" /> Live Network Pulse
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Platform Activity <span className="text-red-400">In Real-Time.</span>
            </h2>
          </div>
          
          {/* Quick Stats Mini-Cards */}
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FaGlobeAmericas /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Active Markets</p>
                <p className="text-lg font-bold text-slate-800">124</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg text-green-600"><FaChartLine /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Daily Deals</p>
                <p className="text-lg font-bold text-slate-800">1.2k</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTIVITY FEED --- */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-slate-200 hidden sm:block" />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-4"
          >
            <AnimatePresence>
              {activities.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ x: 10 }}
                  className="group relative flex items-center gap-6 bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                >
                  {/* Status Indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${item.color} ring-4 ring-white shadow-sm group-hover:scale-125 transition-transform`} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 ${item.iconColor} mb-1 inline-block`}>
                        {item.type}
                      </span>
                      <p className="text-slate-800 font-semibold text-base sm:text-lg">
                        {item.text}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          {/* <button className="text-slate-500 hover:text-blue-600 font-semibold text-sm underline decoration-slate-300 underline-offset-4 transition-all">
            View all market updates
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}