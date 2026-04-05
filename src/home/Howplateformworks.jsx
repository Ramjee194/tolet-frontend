import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlineShieldCheck, HiOutlineChatAlt2, HiOutlineKey } from "react-icons/hi";

const steps = [
  {
    id: "01",
    title: "Smart Search",
    description: "Use our AI-driven filters to find verified luxury lofts, apartments, or studios in your preferred city.",
    icon: <HiOutlineSearch size={28} />,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "02",
    title: "Instant Verification",
    description: "Every listing is 100% verified. Browse high-resolution photos and legal documents with total peace of mind.",
    icon: <HiOutlineShieldCheck size={28} />,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "03",
    title: "Direct Connection",
    description: "Skip the middlemen. Chat directly with property owners in real-time to ask questions and schedule tours.",
    icon: <HiOutlineChatAlt2 size={28} />,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "04",
    title: "Secure Fast-Track",
    description: "Apply through the app and get approved in record time. Your next home is just one digital signature away.",
    icon: <HiOutlineKey size={28} />,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

export default function Howplateformworks() {
  return (
    <section className="bg-white py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
          >
            How to Plateform <span className="text-red-400 cursor-pointer">Works</span>
          </motion.h2>
          <p className="mt-4 text-slate-500 text-lg font-medium">
            We’ve simplified the rental journey into four premium, secure steps.
          </p>
          <div className="mt-6 h-1 w-24 bg-green-500 mx-auto rounded-full" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Subtle connecting line for Desktop */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Number Badge */}
              <div className="mb-6 inline-block">
                <span className="text-5xl font-black text-red-300 group-hover:text-red-500 transition-colors duration-300">
                  {step.id}
                </span>
              </div>

              {/* Icon Container */}
              <div className={`w-16 h-16 ${step.bgColor} ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.description}
              </p>

              {/* Success Indicator (Green Dot) */}
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Verified Step</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          {/* <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-slate-200">
            Get Started on Google Play
          </button> */}
        </motion.div>

      </div>
    </section>
  );
}