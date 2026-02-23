import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, propertyId, currentIndex, onPrev, onNext }) => {
  if (!images || images.length === 0) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" 
        className="w-full h-full object-cover"
        alt="Default"
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <img 
        src={images[currentIndex]} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        alt={`Property ${currentIndex + 1}`}
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => onPrev(propertyId, images.length, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={(e) => onNext(propertyId, images.length, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;