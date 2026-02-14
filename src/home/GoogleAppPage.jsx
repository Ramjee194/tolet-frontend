import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

export default function GooglePlay() {
  return (
    <section className="bg-white py-24 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Get the Toletforrent App
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Experience the easiest way to find your next home. Browse verified
            listings, chat with owners, and manage your rental journey on the
            go.
          </p>

          <ul className="mt-6 space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <FaCheck className="text-green-600" />
              <span>Real-time alerts</span>
            </li>

            <li className="flex items-center gap-3">
              <FaCheck className="text-green-600" />
              <span>Direct chat</span>
            </li>

            <li className="flex items-center gap-3">
              <FaCheck className="text-green-600" />
              <span>Map search</span>
            </li>
          </ul>

          <button className="mt-8 flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition shadow-md">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png"
              alt=""
              className="w-14 h-8"
            />
            Get it on Google Play
          </button>
        </div>

        <div className="flex justify-center">
          <img src="/Toletlogo.png.png" alt="Tolet Logo" />
        </div>
      </div>
    </section>
  );
}
