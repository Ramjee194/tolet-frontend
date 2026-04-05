import React, { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else if (res.data.user.role === "owner") navigate("/owner-dashboard");
      else navigate("/");
    } catch (error) {
      console.error("Login error", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-[1100px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
        
        {/* LEFT SIDE: THE BRAND EXPERIENCE  */}
        <div 
          className="hidden lg:flex lg:w-5/12 relative p-12 flex-col justify-between overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/hotel2.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="z-10">
            <div className="flex items-center gap-2 mb-8">
               {/* <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
                  <span className="text-white font-black text-xl">T</span>
               </div> */}
               {/* <span className="text-white font-bold tracking-tight text-xl">Toletforrent</span> */}
            </div>
            
            <h1 className="text-4xl font-extrabold text-white leading-[1.1] mb-4">
              Find your next <br /> 
              <span className="text-red-500">luxury Homes</span> 
            </h1>
            <p className="text-gray-300 text-sm font-medium max-w-xs">
              Securely access your dashboard to manage listings and discover new properties.
            </p>
          </div>

          <div className="z-10">
            <ul className="space-y-4">
              {[
                "Direct owner communication",
                "Verified luxury listings",
                "Secure payment gateway",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-3 text-white/90 text-sm font-semibold group cursor-default">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 transition-all group-hover:bg-green-500">
                    <TbPointFilled className="text-green-500 group-hover:text-white" size={14} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="z-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />)}
               </div>
               <p className="text-xs text-white/60 font-medium">Joined by 10k+ renters</p>
            </div>
          </div>
        </div>

        {/*  RIGHT SIDE: THE INTERACTIVE FORM  */}
        <div className="w-full lg:w-7/12 p-8 md:p-16 bg-white">
          <div className="max-w-md mx-auto">
            <header className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
              <p className="text-slate-500 text-sm font-medium italic border-l-4 border-red-500 pl-3">
                Login to access your personalized property feed.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter Email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all text-slate-900 font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-xs font-bold text-red-600 hover:text-red-700">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all text-slate-900 font-medium placeholder:text-slate-300"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign Into Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold tracking-tighter">New to the platform?</span></div>
              </div>

              <Link
                to="/register"
                className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Create an Account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;