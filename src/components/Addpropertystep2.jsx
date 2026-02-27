import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Car,
  Dumbbell,
  ShieldCheck,
  Zap,
  ArrowUpCircle,
  Waves,
  Flower2,
  Baby,
  Camera,
  Droplets,
  Wifi,
  Wind,
  ChevronLeft,
  CheckCircle2,
  Eye,
  X,
  Home,
  MapPin,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Addpropertystep2() {
  const [furnishedStatus, setFurnishedStatus] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [step1Data, setStep1Data] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // Load Step 1 data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("property_step1");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStep1Data(parsedData);

      // Check if images exist
      if (parsedData.images && parsedData.images.length > 0) {
        // Convert base64 images back to File objects for submission
        const files = parsedData.images.map((base64, index) => {
          return base64ToFile(base64, `image-${index}.jpg`);
        });
        setImageFiles(files);
      } else {
        alert("No images found. Please go back and add images.");
        navigate("/add-property");
      }
    } else {
      // If user tries to access step 2 without step 1, send them back
      navigate("/add-property");
    }
  }, [navigate]);

  // Helper function to convert base64 to File
  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleFinalSubmit = async () => {
    // Validate step 2 data
    if (!furnishedStatus) {
      alert("Please select furnished status");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData to handle the combined data
      const data = new FormData();

      // Append Step 1 Data
      data.append("name", step1Data.name || "");
      data.append("title", step1Data.title || "");
      data.append("price", step1Data.price || "");
      data.append("description", step1Data.description || "");
      data.append("location", step1Data.location || "");
      data.append("propertyType", step1Data.propertyType || "");

      // Append Step 2 Data
      data.append("furnishedStatus", furnishedStatus || "");
      data.append("additionalInfo", additionalInfo || "");
      data.append("profileImage", profileImage);

      // Append amenities as individual items for backend
      selectedAmenities.forEach((amenity, index) => {
        data.append(`amenities[${index}]`, amenity);
      });

      // Append images
      if (imageFiles.length > 0) {
        imageFiles.forEach((file, index) => {
          // Use the original filename from step1 if available, or create one
          const filename = file.name || `image-${index}.jpg`;
          data.append("images", file, filename);
        });
        console.log(`Appending ${imageFiles.length} images`);
      } else {
        alert("No images found. Please go back and add images.");
        setIsSubmitting(false);
        return;
      }

      // Log FormData contents for debugging
      for (let pair of data.entries()) {
        console.log(
          pair[0] + ": " + (pair[0] === "images" ? "File object" : pair[1]),
        );
      }
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/v1/listings",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("TOKEN:", localStorage.getItem("token"));

      console.log("Success:", res.data);
      alert("Property Posted Successfully!");

      // Clear localStorage and redirect
      localStorage.removeItem("property_step1");
      navigate("/property");
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response?.data?.message || "Failed to submit property");
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Error: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const amenitiesList = [
    { id: 1, name: "Parking", icon: <Car size={18} /> },
    { id: 2, name: "Gym", icon: <Dumbbell size={18} /> },
    { id: 3, name: "24*7 security", icon: <ShieldCheck size={18} /> },
    { id: 4, name: "Power Backup", icon: <Zap size={18} /> },
    { id: 5, name: "Lift", icon: <ArrowUpCircle size={18} /> },
    { id: 6, name: "Swimming pool", icon: <Waves size={18} /> },
    { id: 7, name: "Garden", icon: <Flower2 size={18} /> },
    { id: 8, name: "Playground", icon: <Baby size={18} /> },
    { id: 9, name: "CCTV", icon: <Camera size={18} /> },
    { id: 10, name: "Water supply", icon: <Droplets size={18} /> },
    { id: 11, name: "Internet/Wifi", icon: <Wifi size={18} /> },
    { id: 12, name: "Air-Condition", icon: <Wind size={18} /> },
  ];

  const handleToggleAmenity = (name) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-sm p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Property Configuration
          </h1>
          <p className="text-gray-500 text-sm">
            Review amenities and furnished status
          </p>
        </div>

        <div className="space-y-8">
          {/* Furnished Status */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">
              Furnished Status
            </label>
            <select
              value={furnishedStatus}
              onChange={(e) => setFurnishedStatus([e.target.value])}
              className="w-full border border-gray-200 p-3 rounded-sm bg-white outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="">Select Status</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Un-furnished">Un-furnished</option>
            </select>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Select Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenitiesList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleAmenity(item.name)}
                  className={`flex items-center gap-3 p-5 border rounded-sm cursor-pointer transition-all ${
                    selectedAmenities.includes(item.name)
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-green-200"
                  }`}
                >
                  <span
                    className={
                      selectedAmenities.includes(item.name)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-sm font-medium ${selectedAmenities.includes(item.name) ? "text-green-800" : "text-gray-600"}`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* profileImage */}
          <div>
            <label className="font-bold uppercase ">Choose Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full border border-gray-200 p-4 rounded-sm  outline-none focus:border-gray-400"
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">
              Additional Description
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-sm min-h-[100px] outline-none focus:border-gray-400"
              placeholder="Tell us more about the rules or specific features..."
            />
          </div>

          {/* Image Summary */}
          <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              📸 {imageFiles.length} photo{imageFiles.length !== 1 ? "s" : ""}{" "}
              uploaded from previous step
            </p>
            {imageFiles.length < 3 && (
              <p className="text-xs text-red-500 mt-1">
                Warning: Minimum 3 photos required for listing
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t">
          <button
            onClick={() => navigate("/add-property")}
            className="text-gray-400 font-bold hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="inline mb-1" size={18} /> Previous
          </button>
          <button
            onClick={() => setShowPreview(true)}
            disabled={!furnishedStatus}
            className={`px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all
              ${
                furnishedStatus
                  ? "bg-slate-800 text-white hover:bg-slate-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <Eye size={18} />
            Preview & Save
          </button>
        </div>
      </div>

      {/* --- PREVIEW MODAL --- */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-sm shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800 uppercase italic">
                Confirm Details
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Step 1 Data Review */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Property Title
                  </p>
                  <p className="font-bold text-slate-700">{step1Data.title}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Rent Amount
                  </p>
                  <p className="font-bold text-green-600">
                    ₹{step1Data.price}/mo
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Location
                </p>
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-red-500" />
                  <p className="font-medium text-slate-700">
                    {step1Data.location}
                  </p>
                </div>
              </div>

              {/* Photos Summary */}
              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Photos
                </p>
                <p className="font-bold text-slate-700">
                  {imageFiles.length} photo{imageFiles.length !== 1 ? "s" : ""}{" "}
                  uploaded
                </p>
                {imageFiles.length < 3 && (
                  <p className="text-xs text-red-500 mt-1">
                    ⚠️ Minimum 3 photos required
                  </p>
                )}
              </div>

              {/* Step 2 Data Review */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-sm border border-blue-100">
                <Home className="text-blue-600" size={24} />
                <div>
                  <p className="text-[10px] font-bold text-blue-700 uppercase">
                    Status
                  </p>
                  <p className="font-bold text-slate-800">
                    {furnishedStatus || "Not Set"}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              {selectedAmenities.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                    Amenities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAmenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-slate-700 px-3 py-1 rounded-sm text-xs font-bold border border-slate-200 shadow-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {additionalInfo && (
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Additional Info
                  </p>
                  <p className="text-sm text-slate-700">{additionalInfo}</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 py-4 text-slate-500 font-bold hover:bg-gray-50 uppercase text-xs"
              >
                Edit
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting || imageFiles.length < 5}
                className={`flex-[2] py-4 rounded-sm font-black uppercase text-xs transition-all
                  ${
                    isSubmitting || imageFiles.length < 5
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                {isSubmitting ? "Posting..." : "Final Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addpropertystep2;
