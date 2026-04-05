import React, { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";

function LocationComponent() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Not Supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          );

          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          setLocation(city || "Location Found");
        } catch (error) {
          setLocation("Unable to fetch city");
        }

        setLoading(false);
      },
      () => {
        setLocation("Permission Denied");
        setLoading(false);
      },
    );
  };

  return (
    <div className="p-6">
      <button
        onClick={getLocation}
        disabled={loading}
        className="flex items-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-full shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <div
          className={`p-2 rounded-full ${loading ? "bg-blue-100 animate-pulse" : "bg-blue-50"}`}
        >
          <FaLocationCrosshairs
            className={`text-lg ${loading ? "text-black" : "text-black"}`}
          />
        </div>

        <div className="flex flex-col items-start text-sm">
          <span className="font-semibold leading-tight">
            {loading
              ? "Locating..."
              : location
                ? "Location Found"
                : "Current Location"}
          </span>
          {location && (
            <span className="text-xs text-gray-500 truncate max-w-[150px]">
              {location}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

export default LocationComponent;
