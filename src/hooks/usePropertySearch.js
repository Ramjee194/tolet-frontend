import { useState, useEffect } from 'react';
import { propertyApi } from '../services/api';
import { enhancedData } from '../utils/constants';

export const usePropertySearch = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const enhanceListings = (data) => {
    return data.map((listing, index) => ({
      ...listing,
      host: enhancedData.hosts[index % enhancedData.hosts.length].name,
      hostAvatar: enhancedData.hosts[index % enhancedData.hosts.length].avatar,
      hostVerified: enhancedData.hosts[index % enhancedData.hosts.length].verified,
      response: enhancedData.hosts[index % enhancedData.hosts.length].response,
      communityRating: enhancedData.hosts[index % enhancedData.hosts.length].rating,
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 50) + 10,
      beds: Math.floor(Math.random() * 3) + 1,
      baths: Math.floor(Math.random() * 2) + 1,
      sqft: Math.floor(Math.random() * 1000) + 600,
      tags: enhancedData.tags[index % enhancedData.tags.length],
      amenities: enhancedData.amenities[index % enhancedData.amenities.length],
      status: enhancedData.statusMessages[index % enhancedData.statusMessages.length],
      oldPrice: index % 2 === 0 ? Math.round(parseInt(listing.price) * 1.15) : null,
      daysAgo: enhancedData.daysAgo[index % enhancedData.daysAgo.length],
      views: enhancedData.views[index % enhancedData.views.length],
      propertyType: enhancedData.propertyTypes[index % enhancedData.propertyTypes.length],
    }));
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyApi.getAllListings();
      
      if (data && Array.isArray(data)) {
        const enhanced = enhanceListings(data);
        setListings(enhanced);
      } else {
        setListings([]);
      }
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchListings();
  };

  const getListingById = (id) => {
    return listings.find(listing => listing._id === id);
  };

  return {
    listings,
    loading,
    error,
    refreshing,
    handleRefresh,
    fetchListings,
    getListingById
  };
};