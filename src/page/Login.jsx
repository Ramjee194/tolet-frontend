import React, { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("success", res.data);

      alert("Login successfull");
      navigate("/");
    } catch (error) {
      console.log("Login failed");
      console.error(error.message);
      console.log("error occured", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex w-full max-w-[1200px] min-h-[800px] bg-white shadow-2xl rounded-3xl overflow-hidden m-4">
        {/* Left Side: Visual/Branding (Hidden on small screens) */}
        <div
          className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center p-12 flex-col justify-between text-white"
          style={{ backgroundImage: "url('/hotel1.png')" }}
        >
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight">Sign-In Now</h1>
            <p className="mt-4 text-lg text-gray-200">
              Join thousands of users finding their dream homes.
            </p>
          </div>

          <div className="relative z-10">
            <ul className="space-y-6">
              {[
                "Create your account to get started.",
                "Connect directly with property owners without hassle.",
                "Save your favorite listings and manage bookings in one place.",
                "Explore available flats and properties easily.",
                "Connect directly with property owners.",
                "Get a secure and smooth experience every time you log in.",
                "Save your favorite listings in one place.",
              ].map((text, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <TbPointFilled className="text-green-400" size={24} />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <span className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-semibold">
              Let's Start Your Journey
            </span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-blue-50 rounded-2xl mb-4">
              <SiGnuprivacyguard size={40} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Sign-In Now</h2>
            <p className="text-gray-500 mt-2">
              Please fill in the details to Sign In
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email  */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter E-mail"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all"
                />
              </div>
            </div>

            {/*Phone */}

            {/* <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Phone Number
              </label>
              <div className="relative">
                <IoCallOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="String"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter Phone-number"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all"
                />
              </div>
            </div> */}

            {/*password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter Password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all"
                />
              </div>
            </div>

            <p className=" text-end text-gray-500 mt-0">
              <a
                href="/forgot-password"
                className="text-red-600 font-bold hover:underline"
              >
                Forgot-Password ?
              </a>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                    ${
                      isSubmitting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-400"
                    }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sign In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign-In
                </span>
              )}
            </button>
            <p className="text-center text-gray-500 mt-8">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-red-600 font-bold hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
