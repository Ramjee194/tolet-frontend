import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Secondownerform = () => {
  const navigate = useNavigate();

  // State for text inputs and files
  const [formData, setFormData] = useState({
    identityProofType: "",
    addressProofType: "",
    ownershipDocType: "",
  });

  const [files, setFiles] = useState({});

  // Handle Dropdown Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileChange = (e, fieldName) => {
    // We store the actual file object in state
    setFiles({ ...files, [fieldName]: e.target.files[0] });
  };

  const handlenext2 = () => {
    try {
      // NOTE: We can only save text data to localStorage.
      // File objects will be lost on refresh, so we usually pass them
      // or handle the final upload in the last step.
      localStorage.setItem("ownerStep2", JSON.stringify(formData));

      // If you need to persist files across refreshes,
      // you'd typically use a Redux store or a Context API provider.
      // For now, let's proceed to step 3.
      navigate("/thirdownerform");
    } catch (error) {
      console.error("Error saving step 2:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-100 mt-0">
      <FaArrowLeftLong
        className="mb-4 cursor-pointer"
        size={20}
        onClick={() => navigate("/firstownerform")}
      />

      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Property Ownership Verification
      </h2>

      <div className="space-y-6">
        {/* --- Selection Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Identity Proof
            </label>
            <select
              name="identityProofType"
              onChange={handleChange}
              value={formData.ownershipDocType}
              className="p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full outline-none"
            >
              <option value="">Select Any One</option>
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="passport">Passport</option>
              <option value="dl">Driving License</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Address Proof
            </label>
            <select
              name="addressProofType"
              value={formData.addressProofType}
              onChange={handleChange}
              className="p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full outline-none"
            >
              <option value="">Select Any One</option>
              <option value="utility">Utility Bill (Electricity/Water)</option>
              <option value="bank">Bank Statement</option>
              <option value="voter">Voter ID</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Ownership Documents Type
            </label>
            <select
              name="ownershipDocType"
              value={formData.ownershipDocType}
              onChange={handleChange}
              className="p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full outline-none"
            >
              <option value="">Select Document Type</option>
              <option value="sale_deed">Sale Deed (Registered)</option>
              <option value="tax_receipt">Property Tax Receipt</option>
              <option value="khata">Khata Certificate</option>
            </select>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* --- File Upload Section --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Upload Documents
          </h3>

          {[
            { label: "Landlord Verification", key: "landlordVerif" },
            { label: "Property Tax Receipt", key: "taxReceipt" },
            { label: "Utility Bill (Electricity)", key: "utilityBill" },
            { label: "Rental Agreement Draft", key: "rentalDraft" },
            { label: "Bank Account Details", key: "bankDetails" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <label className="text-sm font-medium text-gray-600 mb-2 sm:mb-0">
                {item.label}
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, item.key)}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-slate-700 hover:file:bg-green-300 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handlenext2}
            className="px-8 py-2 mt-4 bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md active:transform active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Secondownerform;
