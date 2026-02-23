import { useState, useEffect } from "react";
import axios from "axios";
import { indianNames } from "../utils/constants";

export const useAdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/v1/listings");

      if (res.data && Array.isArray(res.data)) {
        // Enhance properties with additional data
        const enhancedProperties = res.data.map((property, index) => {
          const tenantIndex = index % indianNames.length;
          const hasTenant = index % 2 === 0;

          return {
            ...property,
            views: Math.floor(Math.random() * 300) + 50,
            status:
              index % 3 === 0
                ? "occupied"
                : index % 3 === 1
                  ? "vacant"
                  : "maintenance",
            monthlyRevenue: Math.floor(parseInt(property.price) * 0.9),
            ...(hasTenant && {
              tenantName: indianNames[tenantIndex].name,
              tenantPhone: indianNames[tenantIndex].phone,
              tenantEmail: indianNames[tenantIndex].email,
              tenantOccupation: indianNames[tenantIndex].occupation,
              tenantAvatar: `https://ui-avatars.com/api/?name=${indianNames[tenantIndex].name.replace(" ", "+")}&background=random&size=100`,
              leaseStart: "2026-01-01",
              leaseEnd: "2026-12-31",
              rentDueDate: "5th of every month",
              lastPaymentDate: "2026-03-05",
              securityDeposit: Math.floor(parseInt(property.price) * 2),
            }),
            maintenanceRequests: Math.floor(Math.random() * 4),
            maintenanceItems: [
              {
                id: 1,
                issue: "AC not working",
                status: "pending",
                date: "2026-03-10",
              },
              {
                id: 2,
                issue: "Leaking tap",
                status: "completed",
                date: "2026-03-05",
              },
            ],
            documents: [
              { name: "Lease Agreement.pdf", size: "2.4 MB" },
              { name: "Property Inspection.pdf", size: "1.1 MB" },
              { name: "Rent Receipts.pdf", size: "3.2 MB" },
            ],
            amenities: ["Gym", "Pool", "Parking", "Security", "Power Backup"],
          };
        });

        setProperties(enhancedProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/auth/v1/listings/${id}`);
      if (res.status === 200) {
        await fetchProperties(); // Refresh the list
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      return { success: false, error };
    }
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    deleteProperty,
  };
};