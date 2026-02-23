import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Home, User, Tag, MapPin, DollarSign, FileText, Image as ImageIcon, 
  Upload, CheckCircle, X, ChevronRight, Shield, Sparkles 
} from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  // Handle image selection and create previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    // Generate preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove a selected image
  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]); // clean up
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Owner name is required";
    if (!formData.title.trim()) newErrors.title = "Property title is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (formData.price <= 0) newErrors.price = "Price must be positive";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.propertyType) newErrors.propertyType = "Please select a property type";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (imageFiles.length === 0) newErrors.images = "At least one image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    setUploadProgress(0);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("propertyType", formData.propertyType);

    imageFiles.forEach(file => {
      data.append("images", file);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/v1/listings",
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        }
      );

      console.log("Success:", res.data);
      
      // Clean up preview URLs
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      
      alert(" Property Added Successfully!");
      
      // Clear form
      setFormData({
        name: "", title: "", price: "", description: "", location: "", propertyType: ""
      });
      setImageFiles([]);
      setImagePreviews([]);
      
      navigate("/property");
      
    } catch (error) {
      console.error("Submission error:", error);
      alert(" Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Input field styling with error state
  const inputClass = (field) => `
    w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none transition
    ${errors[field] 
      ? 'border-red-300 ' 
      : 'border-gray-200  '}
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with gradient */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-black bg-clip-text text-transparent mb-2">
            List Your <span className="text-red-500">Property</span>
          </h1>
          <p className="text-slate-500">Reach thousands of potential tenants in minutes</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* LEFT SIDE - INSTRUCTIONS & ILLUSTRATION */}
            <div className="lg:w-2/5 bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-10 flex flex-col">
              <div className="mb-8">
                
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                  Make your listing shine 
                </h2>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <span><strong>High-quality photos</strong> -Use well-lit, clear images (minimum 3).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <CheckCircle size={16} className="text-bg-green-600" />
                    </div>
                    <span><strong>Accurate description</strong> -Highlight unique features and amenities.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <span><strong>Competitive pricing</strong>  Check similar listings in your area.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <CheckCircle size={16} className="text-gree-600" />
                    </div>
                    <span><strong>Respond quickly</strong> -Faster replies = more bookings.</span>
                  </li>
                </ul>
              </div>

              {/* Illustration / Image */}
              <div className="mt-auto rounded-2xl overflow-hidden shadow-lg border border-white/50">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern interior"
                  className="w-full h-48 object-cover"
                />
                <div className="bg-white/80 backdrop-blur-sm p-3 text-center text-sm text-slate-600">
                  Example of a high-quality property photo
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="lg:w-3/5 p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Home className="text-red-600" />
                Property Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Owner Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Owner Name 
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="for example ramjee kumar yadav"
                      className={inputClass('name')}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Property Title 
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. ! BHk 2BHK Villa flat etc"
                      className={inputClass('title')}
                    />
                  </div>
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Price & Location - grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Price (₹/month) 
                    </label>
                    <div className="relative">
                      <input
                        type="String"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="Enter price"
                        className={inputClass('price')}
                      />
                    </div>
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Location 
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. Lucknow ,Mumbai etc"
                        className={inputClass('location')}
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Property Type 
                  </label>
                  <div className="relative">
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none appearance-none
                        ${errors.propertyType ? 'border-red-300' : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-200'}`}
                    >
                      <option value="">Select a type</option>
                      <option value="PG">PG / Paying Guest</option>
                      <option value="Villa">Villa</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Flat">Flat / Apartment</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronRight size={16} className="absolute right-3 top-3.5 text-slate-400 rotate-90" />
                  </div>
                  {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Description 
                  </label>
                  <div className="relative">
                    <textarea
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe your property: bedrooms, bathrooms,famous nearby places..."
                      className={`${inputClass('description')} pl-10 pt-3 resize-none`}
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Photos 
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-slate-50/50 hover:bg-slate-50 transition">
                    <input
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload size={32} className="text-red-400" />
                      <span className="text-sm font-medium text-slate-600">Click to upload Images</span>
                      <span className="text-xs text-slate-400">PNG, JPG ,PDF</span>
                    </label>
                  </div>
                  {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                          <img src={src} alt={`preview ${idx}`} className="w-full h-20 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                    ${isSubmitting 
                      ? 'bg-red-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-400'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Publish Listing
                    </span>
                  )}
                </button>

                <p className="text-xs text-center text-slate-400">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;