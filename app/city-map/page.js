"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// ─── Mock Building Data ─────────────────────────────────────
const BUILDINGS = [
  { id: 1, name: "Villa Hydra", neighborhood: "Hydra", lat: 36.745, lng: 3.045, roof: 120, potential: "high", capacity: 4.8, production: 7200, co2: 3.5, homes: 2 },
  { id: 2, name: "Résidence Les Pins", neighborhood: "Hydra", lat: 36.747, lng: 3.048, roof: 340, potential: "high", capacity: 13.6, production: 20400, co2: 9.9, homes: 5 },
  { id: 3, name: "Immeuble Bab Ezzouar", neighborhood: "Bab Ezzouar", lat: 36.730, lng: 3.185, roof: 480, potential: "high", capacity: 19.2, production: 28800, co2: 14.0, homes: 8 },
  { id: 4, name: "Villa El Biar", neighborhood: "El Biar", lat: 36.770, lng: 3.030, roof: 95, potential: "high", capacity: 3.8, production: 5700, co2: 2.8, homes: 1 },
  { id: 5, name: "Centre Commercial Dely Ibrahim", neighborhood: "Dely Ibrahim", lat: 36.752, lng: 2.995, roof: 900, potential: "medium", capacity: 30.0, production: 39000, co2: 19.0, homes: 12 },
  { id: 6, name: "Lycée Ben Aknoun", neighborhood: "Ben Aknoun", lat: 36.757, lng: 3.010, roof: 600, potential: "medium", capacity: 18.0, production: 23400, co2: 11.4, homes: 7 },
  { id: 7, name: "Immeuble Alger Centre", neighborhood: "Alger Centre", lat: 36.754, lng: 3.058, roof: 200, potential: "medium", capacity: 6.0, production: 7800, co2: 3.8, homes: 2 },
  { id: 8, name: "Usine Rouiba", neighborhood: "Rouiba", lat: 36.723, lng: 3.283, roof: 2000, potential: "high", capacity: 80.0, production: 120000, co2: 58.4, homes: 35 },
  { id: 9, name: "Cité HLM Hussein Dey", neighborhood: "Hussein Dey", lat: 36.738, lng: 3.100, roof: 420, potential: "low", capacity: 8.4, production: 8400, co2: 4.1, homes: 2 },
  { id: 10, name: "École Kouba", neighborhood: "Kouba", lat: 36.737, lng: 3.085, roof: 300, potential: "low", capacity: 6.0, production: 6000, co2: 2.9, homes: 2 },
  { id: 11, name: "Résidence Birkhadem", neighborhood: "Birkhadem", lat: 36.706, lng: 3.028, roof: 180, potential: "medium", capacity: 5.4, production: 7020, co2: 3.4, homes: 2 },
  { id: 12, name: "Hôpital Birtraria", neighborhood: "Birtraria", lat: 36.762, lng: 3.018, roof: 700, potential: "high", capacity: 28.0, production: 42000, co2: 20.5, homes: 12 },
];

const NEIGHBORHOODS = ["All", ...Array.from(new Set(BUILDINGS.map(b => b.neighborhood)))];
const POTENTIALS = ["All", "high", "medium", "low"];

const COLORS = { high: "#10b981", medium: "#f59e0b", low: "#ef4444" };
const LABELS = { high: "High Potential", medium: "Medium Potential", low: "Low Potential" };

// ─── Lazy-loaded Map Component (avoids SSR issues with Leaflet) ─────────────
const CityMap = dynamic(() => import("./CityMapInner"), { ssr: false, loading: () => (
  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1E3A5F", borderRadius: "16px" }}>
    <div style={{ color: "white", textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🗺️</div>
      <div style={{ fontWeight: 600 }}>Loading Map...</div>
    </div>
  </div>
)});

// ─── Main Page ───────────────────────────────────────────────
export default function CityMapDashboard() {
  const [selected, setSelected] = useState(null);
  const [neighborhoodFilter, setNeighborhoodFilter] = useState("All");
  const [potentialFilter, setPotentialFilter] = useState("All");
  const [showAIModal, setShowAIModal] = useState(false);

  const filtered = BUILDINGS.filter(b =>
    (neighborhoodFilter === "All" || b.neighborhood === neighborhoodFilter) &&
    (potentialFilter === "All" || b.potential === potentialFilter)
  );

  const metrics = {
    capacity: filtered.reduce((s, b) => s + b.capacity, 0).toFixed(1),
    production: (filtered.reduce((s, b) => s + b.production, 0) / 1000).toFixed(1),
    co2: filtered.reduce((s, b) => s + b.co2, 0).toFixed(1),
    homes: filtered.reduce((s, b) => s + b.homes, 0),
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#f8fafc", fontFamily: "var(--font-body)" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, var(--blue) 0%, #0f1c2e 100%)", padding: "48px 0 40px", color: "white" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Link href="/#city-map" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>← Back to Overview</Link>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>LIVE</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "8px" }}>🏙️ Solar City Map</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", lineHeight: 1.5 }}>
                Interactive map of Algiers showing solar potential across buildings. Click any building to explore details and simulate your installation.
              </p>
            </div>
            <button
              onClick={() => setShowAIModal(true)}
              style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b", padding: "12px 20px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}
            >
              🤖 Predict Solar Expansion
            </button>
          </div>

          {/* Metric Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: "12px", marginTop: "32px" }}>
            {[
              { label: "Installed Capacity", value: metrics.capacity, unit: "MW", color: "#60a5fa" },
              { label: "Annual Production", value: metrics.production, unit: "GWh", color: "#f59e0b" },
              { label: "CO₂ Avoided", value: metrics.co2, unit: "tons/yr", color: "#10b981" },
              { label: "Homes Powered", value: metrics.homes, unit: "homes", color: "#c084fc" },
            ].map((m, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color }}>{m.value}<span style={{ fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginLeft: "4px" }}>{m.unit}</span></div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", marginTop: "4px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter:</span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", marginRight: "4px" }}>Neighborhood:</span>
            {NEIGHBORHOODS.map(n => (
              <button key={n} onClick={() => setNeighborhoodFilter(n)} style={{ padding: "6px 14px", borderRadius: "100px", border: "1px solid", borderColor: neighborhoodFilter === n ? "var(--blue)" : "var(--gray-200)", background: neighborhoodFilter === n ? "var(--blue)" : "white", color: neighborhoodFilter === n ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ width: "1px", height: "24px", background: "var(--gray-200)" }} />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-secondary)", marginRight: "4px" }}>Potential:</span>
            {POTENTIALS.map(p => (
              <button key={p} onClick={() => setPotentialFilter(p)} style={{ padding: "6px 14px", borderRadius: "100px", border: "1px solid", borderColor: potentialFilter === p ? (COLORS[p] || "var(--blue)") : "var(--gray-200)", background: potentialFilter === p ? (COLORS[p] || "var(--blue)") : "white", color: potentialFilter === p ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
                {p === "All" ? "All" : LABELS[p]}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            {filtered.length} buildings shown
          </div>
        </div>
      </div>

      {/* ── Map + Side Panel ── */}
      <div className="container" style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: "20px", padding: "24px 20px", alignItems: "start" }}>
        {/* Map */}
        <div style={{ height: "600px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", position: "relative" }}>
          {/* Legend */}
          <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 1000, background: "white", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0" }}>
            {Object.entries(COLORS).map(([k, color]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>{LABELS[k]}</span>
              </div>
            ))}
            <hr style={{ margin: "10px 0", border: "0", borderTop: "1px solid #eee" }} />
            <Link href="/docs#city-map" style={{ fontSize: "0.7rem", color: "var(--blue)", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              📖 Map Methodology →
            </Link>
          </div>
          <CityMap buildings={filtered} onSelect={setSelected} selected={selected} />
        </div>

        {/* Side Panel */}
        {selected && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden", position: "sticky", top: "100px" }}>
            {/* Panel Header */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS[selected.potential]}, ${COLORS[selected.potential]}bb)`, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ background: "rgba(255,255,255,0.25)", color: "white", padding: "3px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{LABELS[selected.potential]}</span>
                  <h2 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "1.3rem", marginTop: "8px", fontWeight: 700 }}>{selected.name}</h2>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", marginTop: "4px" }}>📍 {selected.neighborhood}, Algiers</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Roof Surface", value: `${selected.roof} m²`, icon: "📐" },
                  { label: "System Size", value: `${selected.capacity} kW`, icon: "⚡" },
                  { label: "Annual Production", value: `${selected.production.toLocaleString()} kWh`, icon: "☀️" },
                  { label: "CO₂ Avoided", value: `${selected.co2} t/yr`, icon: "🌱" },
                  { label: "Homes Powered", value: `${selected.homes} homes`, icon: "🏠" },
                  { label: "Est. ROI", value: "~8 years", icon: "💰" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1rem", marginBottom: "4px" }}>{s.icon}</div>
                    <div style={{ fontWeight: 800, color: "var(--blue)", fontSize: "1rem" }}>{s.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Energy Bar */}
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", marginBottom: "8px" }}>Annual Energy Coverage</div>
                <div style={{ height: "8px", background: "#dcfce7", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "112%", maxWidth: "100%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: "4px" }} />
                </div>
                <div style={{ marginTop: "6px", fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>112% — Surplus exported to grid</div>
              </div>

              <Link href="/simulation" style={{ display: "block", textAlign: "center", background: "var(--blue)", color: "white", padding: "14px 24px", borderRadius: "12px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", transition: "transform 0.2s", marginBottom: "10px" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                ☀️ Simulate on this Rooftop →
              </Link>
              <button onClick={() => setSelected(null)} style={{ display: "block", width: "100%", textAlign: "center", background: "transparent", border: "1px solid #e2e8f0", color: "var(--text-secondary)", padding: "10px", borderRadius: "12px", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                Close Panel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Building List ── */}
      <div className="container" style={{ paddingBottom: "60px" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "16px", color: "var(--text-primary)" }}>
          All Buildings ({filtered.length})
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "14px" }}>
          {filtered.map(b => (
            <div key={b.id} onClick={() => setSelected(b)} style={{ background: "white", borderRadius: "12px", padding: "16px 20px", border: `1px solid ${selected?.id === b.id ? COLORS[b.potential] : "#e2e8f0"}`, cursor: "pointer", transition: "all 0.2s", boxShadow: selected?.id === b.id ? `0 0 0 2px ${COLORS[b.potential]}33` : "none" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.08)`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = selected?.id === b.id ? `0 0 0 2px ${COLORS[b.potential]}33` : "none"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: COLORS[b.potential], flexShrink: 0 }} />
                <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", margin: 0 }}>{b.name}</h4>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "10px", fontWeight: 600 }}>📍 {b.neighborhood}</p>
              <div style={{ display: "flex", gap: "12px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <span>⚡ {b.capacity} kW</span>
                <span>☀️ {(b.production / 1000).toFixed(1)} MWh</span>
                <span>🌱 {b.co2}t CO₂</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Expansion Modal ── */}
      {showAIModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowAIModal(false)}>
          <div style={{ background: "white", borderRadius: "24px", padding: "40px", maxWidth: "560px", width: "100%" }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🤖</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--blue)", marginBottom: "8px" }}>AI Solar Expansion Prediction</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>Based on current adoption patterns and building data, our Huawei Cloud AI model predicts the following expansion opportunities:</p>
            </div>
            {[
              { zone: "Bab Ezzouar Industrial Zone", potential: "+28 MW", confidence: "94%", timeline: "12 months", color: "#10b981" },
              { zone: "Kouba Residential District", potential: "+8.4 MW", confidence: "87%", timeline: "18 months", color: "#f59e0b" },
              { zone: "Alger Centre Commercial", potential: "+5.2 MW", confidence: "79%", timeline: "24 months", color: "#3b82f6" },
            ].map((z, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: "12px", padding: "16px 20px", marginBottom: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{z.zone}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Est. timeline: {z.timeline} · AI confidence: {z.confidence}</div>
                </div>
                <div style={{ fontWeight: 800, color: z.color, fontSize: "1.1rem", whiteSpace: "nowrap", marginLeft: "16px" }}>{z.potential}</div>
              </div>
            ))}
            <button onClick={() => setShowAIModal(false)} style={{ display: "block", width: "100%", padding: "14px", background: "var(--blue)", color: "white", border: "none", borderRadius: "12px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginTop: "8px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
