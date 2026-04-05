import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';

function Thirdownerform() {
    const navigate = useNavigate();
    
    // State to store selected files
    const [files, setFiles] = useState({});

    // Handle file input changes
    const handleFileChange = (e, itemName) => {
        setFiles({
            ...files,
            [itemName]: e.target.files[0] // Store the actual file object
        });
    };

    const handleFinalSubmit = async () => {
        try {
            const ownerStep1 = JSON.parse(localStorage.getItem("ownerStep1")) || {};
            const ownerStep2 = JSON.parse(localStorage.getItem("ownerStep2")) || {};

            // 1. Create FormData Instance
            const formData = new FormData();

            // 2. Append text data from previous steps
            const combinedData = { ...ownerStep1, ...ownerStep2 };
            Object.keys(combinedData).forEach(key => {
                formData.append(key, combinedData[key]);
            });

            // 3. Append Files from current step
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    formData.append(key, files[key]);
                }
            });

            // 4. Send Request with multipart/form-data headers
            await axios.post(`${import.meta.env.VITE_API_URL}/api/ownerform/register`, formData, {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            });
            

            // Clear storage and redirect
            localStorage.removeItem("ownerStep1");
            localStorage.removeItem("ownerStep2");
            alert("Owner Registered Successfully");
            navigate("/owner-dashboard"); 

        } catch (error) {
            console.error("Upload Error:", error);
            alert("Failed to submit form");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-100 mt-0">
            <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => navigate("/secondownerform")} />

            <div className="space-y-4 mt-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">If Property is Under Loan</h3>
                {["loanNoc", "utilityBill", "noDuesLoan"].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                        <label className="text-sm font-medium text-gray-600 mb-2 sm:mb-0 capitalize">
                            {item.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, item)}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-slate-700 hover:file:bg-green-300 cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-4 mt-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">If Property is Co-owned</h3>
                {["nocCoOwners", "jointOwnershipProof", "noDuesCoOwned"].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                        <label className="text-sm font-medium text-gray-600 mb-2 sm:mb-0 capitalize">
                            {item.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, item)}
                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-slate-700 hover:file:bg-green-300 cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-5">
                <button 
                    onClick={handleFinalSubmit} 
                    className="bg-red-600 hover:bg-red-700 font-bold text-white px-8 py-2 rounded-md transition"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Thirdownerform;