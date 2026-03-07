"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const COLORS = { high: "#10b981", medium: "#f59e0b", low: "#ef4444" };
const LABELS = { high: "High Potential", medium: "Medium Potential", low: "Low Potential" };

export default function CityMapInner({ buildings, onSelect, selected }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import leaflet (avoids SSR)
    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          center: [36.742, 3.055],
          zoom: 12,
          zoomControl: false,
        });

        // Add zoom control top-right
        L.control.zoom({ position: "topright" }).addTo(map);

        // Tile layer — dark style for premium feel
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      // Clear existing markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      const map = mapInstanceRef.current;

      // Add building markers
      buildings.forEach((building) => {
        const color = COLORS[building.potential];
        const isSelected = selected?.id === building.id;

        // Custom circle marker
        const marker = L.circleMarker([building.lat, building.lng], {
          radius: isSelected ? 16 : 10,
          fillColor: color,
          color: isSelected ? "white" : color,
          weight: isSelected ? 3 : 1.5,
          opacity: 1,
          fillOpacity: 0.85,
        });

        // Tooltip on hover
        marker.bindTooltip(
          `<div style="font-family:sans-serif;padding:4px 2px">
            <strong style="color:${color}">${building.name}</strong><br/>
            <span style="color:#6b7280;font-size:0.75em">${LABELS[building.potential]}</span><br/>
            <div style="margin-top:4px;font-size:0.8em">
              ⚡ ${building.capacity} kW &nbsp;|&nbsp; ☀️ ${building.production.toLocaleString()} kWh/yr
            </div>
          </div>`,
          { sticky: true, className: "solar-tooltip" }
        );

        // Click → select building
        marker.on("click", () => onSelect(building));

        marker.addTo(map);
        markersRef.current.push(marker);
      });
    });
  }, [buildings, selected]);

  return (
    <>
      <style>{`
        .leaflet-container { background: #1a2744; }
        .solar-tooltip {
          background: white !important;
          border: none !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
          padding: 10px 14px !important;
          font-size: 0.85rem !important;
          max-width: 220px;
        }
        .solar-tooltip::before { display: none !important; }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
        }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
}
