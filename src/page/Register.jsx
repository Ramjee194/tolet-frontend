import React, { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { Mail, Lock, User, Phone, MapPin, Camera, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { IoCallOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "user", // Default role
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      alert("Registration Successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-6">
      <div className="flex w-full max-w-[1240px] bg-white  rounded-[2.5rem] overflow-hidden border border-gray-100">
        
        {/* LEFT SIDE: THE VIBE  */}
        <div 
          className="hidden lg:flex lg:w-[45%] relative p-16 flex-col justify-between text-white overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/hotel2.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md w-fit p-3 rounded-2xl border border-white/30 mb-8">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-6xl font-black leading-[1.1] tracking-tight">
              Start Your <br /> <span className="text-red-500">Journey.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-200 font-medium max-w-sm">
              The most trusted platform for finding verified rentals and premium stays.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            {[
              "Verified Property Listings",
              "Direct Owner Communication",
              "Zero Hidden Charges",
              "Secure Documentation"
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                <span className="text-sm font-semibold tracking-wide uppercase opacity-80">{text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">© 2026 Toletforrent Pro</p>
          </div>
        </div>

        {/*  RIGHT SIDE: THE FORM  */}
        <div className="w-full lg:w-[55%] p-8 md:p-14 overflow-y-auto max-h-[90vh]">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Join us today and explore premium rentals.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* ROLE PICKER (Pro Toggle) */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-full max-w-md mx-auto mb-8">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'user'})}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.role === 'user' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'}`}
              >
                I am a Renter
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'owner'})}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.role === 'owner' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'}`}
              >
                I am an Owner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white outline-none transition-all font-medium"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white  outline-none transition-all font-medium"
                    placeholder="Enter E-mail"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Phone Number</label>
                <div className="relative group">
                  <IoCallOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white  outline-none transition-all font-medium"
                    placeholder="Enter phone"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400  transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white  outline-none transition-all font-medium"
                    placeholder="Lucknow, India"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400  transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white  outline-none transition-all font-medium"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-black text-slate-400 ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400  transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white 
                     outline-none transition-all font-medium"
                    placeholder="confirm password"
                  />
                </div>
              </div>
            </div>

            {/* OWNER DOCUMENT SECTION */}
            {formData.role === "owner" && (
              <div className="mt-4 p-6 bg-red-50/50 border border-red-100 rounded-[2rem] space-y-4 animate-in fade-in slide-in-from-top-4">
                <h4 className="text-sm font-black text-red-600 uppercase tracking-widest">Owner Verification</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-red-200 bg-white rounded-2xl cursor-pointer hover:border-red-400 transition-all">
                    <Camera className="text-red-400 mb-2" size={24} />
                    <span className="text-[10px] font-bold text-slate-500">PROFILE PHOTO</span>
                    <input type="file" className="hidden" />
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-red-200 bg-white rounded-2xl cursor-pointer hover:border-red-400 transition-all">
                    <CreditCard className="text-red-400 mb-2" size={24} />
                    <span className="text-[10px] font-bold text-slate-500">AADHAR CARD</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-red-500 hover:bg-red-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-10 font-bold text-sm">
            Already a member? <Link to="/login" className="text-red-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;