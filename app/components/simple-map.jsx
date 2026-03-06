"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SimpleMap = ({ onSelectLocation, selectedLocation, className = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Stable click handler to prevent re-renders
  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    
    // Remove existing marker
    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    // Add new marker
    if (mapInstanceRef.current) {
      const marker = L.marker([lat, lng]).addTo(mapInstanceRef.current);
      markerRef.current = marker;

      // Call callback with location data
      if (onSelectLocation) {
        onSelectLocation({
          lat: lat,
          lng: lng,
          address: `Position: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          city: "Algérie"
        });
      }
    }
  }, [onSelectLocation]);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || isInitializedRef.current) return;

    // Initialize map with mobile-friendly options
    const map = L.map(mapRef.current, {
      center: [28.0339, 1.6596], // Algeria center
      zoom: 6,
      zoomControl: true,
      attributionControl: true,
      // Mobile-friendly options
      tap: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      dragging: true,
      // Prevent map from jumping on mobile
      inertia: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 1500,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Store map instance
    mapInstanceRef.current = map;
    isInitializedRef.current = true;

    // Add click handler
    map.on("click", handleMapClick);

    // Add touch events for mobile
    map.on("tap", handleMapClick);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []); // Remove onSelectLocation dependency to prevent re-renders

  // Update marker when selectedLocation changes (separate effect)
  useEffect(() => {
    if (mapInstanceRef.current && selectedLocation && isInitializedRef.current) {
      // Remove existing marker
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
      }

      // Add new marker at selected location
      const marker = L.marker([selectedLocation.lat, selectedLocation.lng]).addTo(mapInstanceRef.current);
      markerRef.current = marker;

      // Center map on selected location
      mapInstanceRef.current.setView([selectedLocation.lat, selectedLocation.lng], 10);
    }
  }, [selectedLocation]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '300px' }}
      />
      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-sm text-gray-600">
        Cliquez sur la carte pour sélectionner votre emplacement
      </div>
    </div>
  );
};

export default SimpleMap;