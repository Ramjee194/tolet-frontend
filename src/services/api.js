import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const propertyApi = {
  // Get all listings
  getAllListings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/listings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  },

  // Get single listing by ID
  getListingById: async (id) => {  // Remove the colon and type annotation
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/listings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching listing ${id}:`, error);
      throw error;
    }
  },

  // Create new listing
  createListing: async (listingData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/listings`, listingData);
      return response.data;
    } catch (error) {
      console.error("Error creating listing:", error);
      throw error;
    }
  },

  // Update listing
  updateListing: async (id, listingData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/v1/listings/${id}`, listingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating listing ${id}:`, error);
      throw error;
    }
  },

  // Delete listing
  deleteListing: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/v1/listings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting listing ${id}:`, error);
      throw error;
    }
  }
};