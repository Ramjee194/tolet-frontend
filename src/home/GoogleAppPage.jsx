import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { IoShieldCheckmarkOutline, IoChatbubblesOutline, IoFlashOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import FAQ from "./FAQ";
import Howplateformworks from "./Howplateformworks";

export default function ToletPremiumWhite() {
  return (
    <>
    <FAQ/>
    <Howplateformworks/>
    <section className="relative bg-white py-24 px-6 lg:px-16 overflow-hidden">
      {/* Subtle Background Glows for Depth */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-50 blur-[100px] rounded-full -mr-32 -mt-32 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-50 blur-[100px] rounded-full -ml-32 -mb-32 opacity-60" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/*  LEFT CONTENT: Brand Narrative */}
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-red-600" />
            <span className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Verified Properties Only</span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
            The smarter way to <br />
            <span className="text-red-400 cursor-pointer underline decoration-green-500/30 underline-offset-8">find your home.</span>
          </h2>

          <p className="mt-8 text-xl text-slate-600 max-w-lg leading-relaxed font-light">
            Experience the Toletforrent difference. A premium, secure, and lightning-fast ecosystem designed to get you the keys to your next luxury rental faster than ever.
          </p>

          {/* Premium Feature Grid */}
          <div className="mt-12 space-y-6 max-w-md">
            <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="p-3 bg-green-100 rounded-xl text-green-700">
                <IoShieldCheckmarkOutline size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Elite Verification</h4>
                <p className="text-slate-500 text-sm">Every listing undergoes a 12-point security check for your peace of mind.</p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="p-3 bg-red-50 rounded-xl cursor-pointer text-red-300">
                <IoChatbubblesOutline size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Owner-Direct Network</h4>
                <p className="text-slate-500 text-sm">Skip the middleman. Negotiate and chat directly with property owners.</p>
              </div>
            </div>
          </div>

          {/* Google Play Button - High Contrast */}
          <motion.button 
            whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 flex items-center gap-4 bg-slate-900 text-white pl-3 pr-10 py-3.5 rounded-2xl transition-all"
          >
            <div className="bg-white/10 p-2.5 rounded-xl">
                <img
                    src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png"
                    alt="Google Play"
                    className="w-8 h-5 object-contain"
                />
            </div>
            <div className="text-left">
              <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Available On</p>
              <p className="text-lg font-bold tracking-tight">Google Play</p>
            </div>
          </motion.button>
        </div>

        {/* --- RIGHT CONTENT: The Showcase Mockup --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Floating Verification Badge */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-12 top-1/4 z-20 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 hidden xl:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <IoFlashOutline size={18} />
              </div>
              <p className="text-slate-900 font-bold text-sm tracking-tight">Instant Approval</p>
            </div>
          </motion.div>

          {/* App Mockup with Logo Integration */}
          <div className="relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-[3.5rem] -z-10" />
            <img 
              src="/Toletlogo.png.png" 
              alt="Toletforrent Mobile Experience" 
              className="w-full max-w-[420px] h-auto rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[10px] border-white"
            />
          </div>

          {/* Live User Search UI Component */}
          <motion.div 
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -right-8 bottom-1/4 z-20 bg-white/90 backdrop-blur-md border border-slate-100 p-5 rounded-3xl shadow-xl max-w-[200px] hidden xl:block"
          >
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Live Search</span>
            </div>
            <p className="text-slate-800 font-bold text-sm">Verified Lofts in Manhattan</p>
            <div className="mt-3 flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                ))}
                <div className="text-[10px] font-bold text-slate-400 self-center ml-4">+12 Users</div>
            </div>
          </motion.div>
         
        </motion.div>

      </div>
      
    </section>
    
    </>
  );
}