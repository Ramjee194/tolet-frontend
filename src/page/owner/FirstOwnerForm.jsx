import axios from "axios";
import React, { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { Mail, User, MapPin } from "lucide-react";
import { IoCallOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";

function Firstownerform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePhoto: "",
  });

  // Files must be handled separately as they can't be stringified into LocalStorage
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlenext = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Logic: Save text data to local storage for Step 2 & 3
      localStorage.setItem("ownerStep1", JSON.stringify(formData));

      // Note: If your API requires registration NOW, use FormData
      // However, usually in multi-step forms, we only hit the API on the final step.
      // If you MUST hit an API here:
      /*
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if(profilePhoto) data.append("profilePhoto", profilePhoto);
      await axios.post("http://localhost:5000/api/auth/register", data);
      */

      navigate("/secondownerform");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex w-full max-w-[1200px] min-h-[800px] bg-white shadow-xl rounded-3xl overflow-hidden m-4">
        {/* Left Side: Branding */}
        <div
          className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center p-12 flex-col justify-between text-white"
          style={{ backgroundImage: "url('/hotel1.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight">
              Register as Owner
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Start listing your property today.
            </p>
          </div>
          <div className="relative z-10">
            <ul className="space-y-4">
              {["Verified Profiles", "Direct Messaging", "Easy Dashboard"].map(
                (text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <TbPointFilled className="text-red-500" size={24} /> {text}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-red-50 rounded-2xl mb-4">
              <SiGnuprivacyguard size={40} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Owner Details</h2>
          </div>

          <form onSubmit={handlenext} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  required
                  type="text"
                  placeholder="Ramjee kumar yadav"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  required
                  type="email"
                  placeholder="ramjeekumaryadav733@gmail.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <IoCallOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  required
                  type="tel"
                  placeholder="+91-8404827541"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-all"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  required
                  type="text"
                  placeholder="City, State"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-red-500 transition-all"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Profile Photo
              </label>
              <div className="relative">
                <ImProfile
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                disabled={loading}
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-10 py-3 rounded-xs font-bold text-white shadow-lg transition-all active:scale-95 disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Firstownerform;
