import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Upload, X, ChevronRight } from "lucide-react";

function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    description: "",
    location: "",
    propertyType: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("You can upload up to 10 images only");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValid =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isValid) alert(`${file.name} is not a valid image file`);
      return isValid;
    });

    // Add new files to existing ones
    const totalFiles = [...imageFiles, ...validFiles];
    console.log(totalFiles);

    if (totalFiles.length > 10) {
      alert("Total images cannot exceed 10");
      return;
    }

    setImageFiles(totalFiles);

    // Create previews for all files
    const newPreviews = totalFiles.map((file) => URL.createObjectURL(file));

    // Clean up old previews
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImagePreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Owner name is required";
    if (!formData.title.trim()) newErrors.title = "Property title is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.propertyType) newErrors.propertyType = "Select property type";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (imageFiles.length < 5)
      newErrors.images = `Add at least 5 photos (${imageFiles.length}/5 added)`;
    return newErrors;
  };

  const handleNextStep = () => {
    // Validate first
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert images to base64 for storage
    const processImagesForStorage = async () => {
      setUploadProgress(10);
      
      const imagePromises = imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      try {
        const imageBase64Array = await Promise.all(imagePromises);
        setUploadProgress(50);
        
        // Save text data and images to localStorage
        const step1Data = {
          ...formData,
          images: imageBase64Array,
          imageCount: imageFiles.length
        };
        
        localStorage.setItem("property_step1", JSON.stringify(step1Data));
        setUploadProgress(100);
        
        // Small delay to show 100% progress
        setTimeout(() => {
          setUploadProgress(0);
          navigate("/add-property/step2");
        }, 500);
        
      } catch (error) {
        console.error("Error processing images:", error);
        alert("Error processing images. Please try again.");
        setUploadProgress(0);
      }
    };

    processImagesForStorage();
  };

  const inputClass = (field) => `
    w-full px-4 py-2.5 bg-white border rounded-lg outline-none transition
    ${
      errors[field]
        ? "border-red-300 focus:border-red-500"
        : "border-gray-200 focus:border-gray-400"
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Property
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to list your property
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-5">
            {/* Owner Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Owner name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Rajesh Kumar"
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Property title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. 2BHK Fully Furnished Apartment"
                className={inputClass("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Rent (₹/month) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="15000"
                  className={inputClass("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Indiranagar, Bangalore"
                    className={`${inputClass("location")} pl-9`}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Property type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyType: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 bg-white border rounded-lg appearance-none cursor-pointer
                    ${errors.propertyType ? "border-red-300" : "border-gray-200"}`}
                >
                  <option value="">Select type</option>
                  <option value="Flat">Flat / Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="PG">PG / Paying Guest</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Office">Office Space</option>
                  <option value="Shop">Shop</option>
                </select>
                <ChevronRight
                  size={16}
                  className="absolute right-3 top-3 text-gray-400 rotate-90"
                />
              </div>
              {errors.propertyType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.propertyType}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your property - bedrooms, bathrooms, nearby amenities, etc."
                className={`${inputClass("description")} resize-none`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Photos <span className="text-red-500">*</span>
                <span className="text-gray-400 font-normal ml-1">
                  (Minimum 5 photos required)
                </span>
              </label>

              {/* Upload Area */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition mb-4">
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload photos
                  </span>
                  <span className="text-xs text-gray-400">
                    JPG, PNG (Max 10 photos)
                  </span>
                </label>
              </div>

              {/* Photo Count Indicator */}
              {imageFiles.length > 0 && (
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {imageFiles.length} photo
                    {imageFiles.length !== 1 ? "s" : ""} selected
                  </span>
                  <span
                    className={`text-xs ${imageFiles.length >= 5 ? "text-green-600" : "text-orange-500"}`}
                  >
                    {imageFiles.length >= 5
                      ? "✓ Minimum met"
                      : `${5 - imageFiles.length} more needed`}
                  </span>
                </div>
              )}

              {errors.images && (
                <p className="text-red-500 text-xs mb-3">{errors.images}</p>
              )}

              {/* Image Previews Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={src}
                          alt={`preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Saving images...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1">
                  <div
                    className="bg-gray-900 h-1 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={imageFiles.length < 5 || uploadProgress > 0}
                className={`px-8 py-2.5 rounded-lg text-white transition font-bold
                  ${imageFiles.length < 5 || uploadProgress > 0
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;