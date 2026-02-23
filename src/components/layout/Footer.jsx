import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
             
              <div>
                <h3 className="text-xl font-bold">Toletforrent</h3>
                <p className="text-sm text-gray-400">Rent with Confidence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting property owners and renters through intelligent
              matching, transparent processes, and community-driven insights.
            </p>
            <div className="flex space-x-4">
              {/* Social icons (you can replace href with real links) */}
              <Link
                to="#"
                className="text-gray-400 hover:text-white smooth-transition"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white smooth-transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69..."></path>
                </svg>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white smooth-transition"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569..."></path>
                </svg>
              </Link>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Get the App</h4>
              <div className="flex space-x-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.toletforrent.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 smooth-transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/properties"
                  className="hover:text-white smooth-transition"
                >
                  Find Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/property-listing"
                  className="hover:text-white smooth-transition"
                >
                  List Property
                </Link>
              </li>
              <li>
                <Link
                  to="/owner-dashboard-suite"
                  className="hover:text-white smooth-transition"
                >
                  Owner Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/community-hub-local-insights"
                  className="hover:text-white smooth-transition"
                >
                  Community Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/help-center" className="hover:text-white smooth-transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-white smooth-transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="hover:text-white smooth-transition"
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="hover:text-white smooth-transition"
                >
                  Legal Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Toletforrent. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 md:ml-auto">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white smooth-transition"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white smooth-transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
