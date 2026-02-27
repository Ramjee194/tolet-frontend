// utils/tracking.js
export const trackPropertyView = (property) => {
  const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
  const filtered = stored.filter((p) => p.id !== property._id);
  const newRecent = [
    {
      id: property._id,
      title: property.title,
      price: property.price,
      location: property.location,
      image: property.images?.[0] || "",
    },
    ...filtered,
  ].slice(0, 5);
  localStorage.setItem("recentlyViewed", JSON.stringify(newRecent));
};