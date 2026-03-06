"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
}

interface LeafletMapProps {
  onSelectLocation: (location: Location) => void;
  selectedLocation: Location | null;
  className?: string;
}

// Fix for default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

function LocationMarker({ onSelectLocation, selectedLocation }: { 
  onSelectLocation: (location: Location) => void;
  selectedLocation: Location | null;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(
    selectedLocation ? L.latLng(selectedLocation.lat, selectedLocation.lng) : null
  );

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelectLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        address: `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`,
        city: "Alger"
      });
    },
  });

  // Update marker when selectedLocation changes externally (from search)
  useEffect(() => {
    if (selectedLocation) {
      const newPos = L.latLng(selectedLocation.lat, selectedLocation.lng);
      setPosition(newPos);
      map.flyTo(newPos, map.getZoom());
    }
  }, [selectedLocation, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Emplacement sélectionné</Popup>
    </Marker>
  );
}

export default function LeafletMap({ onSelectLocation, selectedLocation, className = "" }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`w-full h-full bg-gray-200 animate-pulse ${className}`}></div>;
  }

  // Default center: Algiers, Algeria
  const defaultCenter: [number, number] = [36.7538, 3.0588];
  const defaultZoom = 12;

  return (
    <div className={`w-full h-full relative z-0 ${className}`}>
      <MapContainer
        center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        keyboard={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelectLocation={onSelectLocation} selectedLocation={selectedLocation} />
      </MapContainer>
    </div>
  );
}