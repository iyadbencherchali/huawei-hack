"use client";

import { useEffect, useRef, useState } from "react";

const ReliableMap = ({ onSelectLocation, selectedLocation, className = "" }) => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple map initialization with a timeout to ensure stability
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMapClick = (e) => {
    if (!onSelectLocation) return;
    
    // Get click coordinates relative to the map container
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to approximate lat/lng (Algeria coordinates)
    const lat = 28.0339 - (y / rect.height) * 10; // Rough conversion
    const lng = 1.6596 + (x / rect.width) * 20; // Rough conversion
    
    onSelectLocation({
      lat: lat,
      lng: lng,
      address: `Position: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      city: "Algérie"
    });
  };

  if (!isLoaded) {
    return (
      <div className={`${className} bg-gray-100 animate-pulse rounded-lg flex items-center justify-center`}>
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {/* Simple map using a background image */}
      <div
        ref={mapRef}
        className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg cursor-crosshair relative"
        style={{
          backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=28.0339,1.6596&zoom=6&size=800x600&maptype=roadmap&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWbUfBwH8Y5U')",
          minHeight: '400px'
        }}
        onClick={handleMapClick}
      >
        {/* Map overlay for better interaction */}
        <div className="absolute inset-0 bg-transparent hover:bg-blue-100 hover:bg-opacity-10 transition-colors" />
        
        {/* Instructions */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm text-sm text-gray-700">
          Cliquez sur la carte pour sélectionner votre emplacement
        </div>
        
        {/* Selected location marker */}
        {selectedLocation && (
          <div 
            className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2"
            style={{
              left: `${((selectedLocation.lng - 1.6596) / 20) * 100}%`,
              top: `${((28.0339 - selectedLocation.lat) / 10) * 100}%`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReliableMap;
