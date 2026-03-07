"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing marker icons in leaflet with bundlers
const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const defaultCenter = [36.7538, 3.0588]; // Alger by default

// Invalidate map size after mount to fix rendering in dynamic containers
function MapResizer() {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => map.invalidateSize(), 200);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
}

function LocationMarker({ onLocationSelect }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            if (onLocationSelect) {
                onLocationSelect(e.latlng);
            }
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={icon}></Marker>
    );
}

export default function LocationMap({ onSelectRegion }) {
    const containerRef = useRef(null);
    const [mapKey, setMapKey] = useState(0);

    // Clean up any lingering Leaflet instances on the container before mounting
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const mapDiv = container.querySelector('.leaflet-container');
            if (mapDiv && mapDiv._leaflet_id) {
                mapDiv._leaflet_id = null;
            }
        }
        setMapKey(prev => prev + 1);
    }, []);

    const handleLocationSelect = useCallback((latlng) => {
        let zoneId = "nord";
        if (latlng.lat < 33) zoneId = "sud";
        else if (latlng.lat < 35.5) zoneId = "hauts";

        if (onSelectRegion) {
            onSelectRegion({
                province: `Coordonnées: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`,
                zoneId: zoneId
            });
        }
    }, [onSelectRegion]);

    return (
        <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            <MapContainer
                key={mapKey}
                center={defaultCenter}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onLocationSelect={handleLocationSelect} />
                <MapResizer />
            </MapContainer>
        </div>
    );
}
