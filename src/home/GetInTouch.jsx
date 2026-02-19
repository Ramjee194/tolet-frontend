import { MapPin, Phone, Mail } from "lucide-react";

export default function GetInTouch() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Get in Touch
      </h3>

      {/* Info Section */}
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="p-3 bg-blue-100 dark:bg-slate-900 rounded-xl">
            <MapPin className="w-6 h-6 text-black dark:text-slate-800" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            KV House, 4/37 Vibhav Khand <br />
            Gomti Nagar, Lucknow, <br />
            Uttar Pradesh, 226010
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
            <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <a
            href="tel:+918853389395"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition"
          >
            +91 8853389395
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
            <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <a
            href="mailto:toletforrent9@gmail.com"
            className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
          >
            toletforrent9@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
