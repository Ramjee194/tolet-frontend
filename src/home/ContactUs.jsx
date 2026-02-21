import React, { useState } from "react";
import GetInTouch from "./GetInTouch";
import { Footer } from "./Footer";

const ContactUs = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    message:""
  });

const handleSubmit = (e) => {
  e.preventDefault();

  const phoneNumber = "918404827541"; 

  const text = `
New Contact Message:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
  `;

  const encodedText = encodeURIComponent(text);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  window.open(whatsappURL, "_blank");

  // reset form
  setFormData({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
};

  return (
    <>
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 pt-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Fill out the form or reach us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white"
                  placeholder="ramjee yadav"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white"
                  placeholder="ramjeekumaryadav558@gmail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white"
                  placeholder="+91 8404827541"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e)=>setFormData({...formData,message:e.target.value})}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-primary text-white bg-black font-semibold shadow-md hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
         {/* Contact Info + Map */}
<div className="space-y-6">
   <GetInTouch />

   <div className="overflow-hidden rounded-2xl shadow-lg">
     <iframe
       className="w-full h-72 md:h-80"
       src="https://www.google.com/maps/embed?pb=..."
       allowFullScreen=""
       loading="lazy"
     ></iframe>
   </div>
</div>

        </div>
      </div>

    </div>
   <div>
    <GetInTouch/>
   </div>
   <div>
    <Footer/>
   </div>

    </>
  );
};

export default ContactUs;
