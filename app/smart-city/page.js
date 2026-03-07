"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DISTRICTS = [
  { name: "Hydra",         adoption: 78, capacity: 28.4, production: 42600,  co2: 20.7, homes: 1840, type: "Residential" },
  { name: "Bab Ezzouar",  adoption: 62, capacity: 42.1, production: 63150,  co2: 30.7, homes: 2700, type: "Mixed"       },
  { name: "Rouiba",       adoption: 71, capacity: 80.0, production: 120000, co2: 58.4, homes: 5200, type: "Industrial"  },
  { name: "El Biar",      adoption: 55, capacity: 18.6, production: 27900,  co2: 13.6, homes: 1200, type: "Residential" },
  { name: "Dely Ibrahim", adoption: 48, capacity: 30.0, production: 39000,  co2: 19.0, homes: 1680, type: "Commercial"  },
  { name: "Kouba",        adoption: 34, capacity: 9.6,  production: 9600,   co2: 4.7,  homes: 410,  type: "Residential" },
  { name: "Hussein Dey",  adoption: 28, capacity: 8.4,  production: 8400,   co2: 4.1,  homes: 360,  type: "Mixed"       },
  { name: "Birkhadem",    adoption: 41, capacity: 14.2, production: 18460,  co2: 9.0,  homes: 795,  type: "Residential" },
];

const MONTHLY_PROD  = [320, 405, 580, 650, 810, 920, 1050, 1020, 760, 570, 380, 295];
const MONTHLY_SAVED = [980, 1240,1780,2000,2490,2820,3220, 3130, 2330,1750,1165,905];
const MONTHS        = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BUILDING_TYPES = ["All", "Residential", "Commercial", "Industrial", "Mixed"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function SmartCityDashboard() {
  const [districtFilter,  setDistrictFilter]  = useState("All");
  const [typeFilter,      setTypeFilter]      = useState("All");
  const [chartMode,       setChartMode]       = useState("production");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const filtered = DISTRICTS.filter(d =>
    (districtFilter === "All" || d.name === districtFilter) &&
    (typeFilter === "All" || d.type === typeFilter)
  );

  const totals = {
    capacity:   filtered.reduce((s, d) => s + d.capacity,   0).toFixed(1),
    production: (filtered.reduce((s, d) => s + d.production, 0) / 1000).toFixed(1),
    co2:        filtered.reduce((s, d) => s + d.co2,        0).toFixed(1),
    homes:      filtered.reduce((s, d) => s + d.homes,      0),
    avgAdoption: Math.round(filtered.reduce((s, d) => s + d.adoption, 0) / (filtered.length || 1)),
  };

  const solarShare  = Math.min(Math.round((totals.production / 180) * 100), 100);
  const gridShare   = 100 - solarShare;

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#f8fafc", fontFamily: "var(--font-body)" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1E3A5F 60%, #1a4d2e 100%)", padding: "48px 0 40px", color: "white" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Link href="/#platform" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>← Platform Overview</Link>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, marginBottom: "6px" }}>
                🏙️ Smart City Impact
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "580px", lineHeight: 1.5, fontSize: "0.95rem" }}>
                City-wide renewable energy dashboard tracking solar adoption and CO₂ impact across all districts.
              </p>
            </div>
          </div>

          {/* Big KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "14px" }}>
            {[
              { icon: "⚡", label: "Installed Capacity",    value: totals.capacity,         unit: "MW",      color: "#60a5fa" },
              { icon: "☀️", label: "Annual Production",     value: totals.production,        unit: "GWh",     color: "#f59e0b" },
              { icon: "🌱", label: "CO₂ Avoided",           value: totals.co2,               unit: "t CO₂/yr",color: "#10b981" },
              { icon: "🏠", label: "Homes Powered",          value: totals.homes.toLocaleString(), unit: "homes", color: "#c084fc" },
              { icon: "📈", label: "Avg Adoption Rate",     value: `${totals.avgAdoption}%`, unit: "",        color: "#f97316" },
            ].map((m, i) => (
              <div key={i} title={`${m.label}: ${m.value} ${m.unit}`} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "14px", padding: "18px", border: "1px solid rgba(255,255,255,0.1)", cursor: "default", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{m.icon}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", marginLeft: "3px" }}>{m.unit}</span></div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", marginTop: "5px", letterSpacing: "0.05em" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "14px 0" }}>
        <div className="container" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Filter:</span>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--text-secondary)" }}>District:</span>
            {["All", ...DISTRICTS.map(d => d.name)].map(n => (
              <button key={n} onClick={() => setDistrictFilter(n)} style={{ padding: "5px 12px", borderRadius: "100px", border: `1px solid ${districtFilter === n ? "var(--blue)" : "var(--gray-200)"}`, background: districtFilter === n ? "var(--blue)" : "white", color: districtFilter === n ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ width: "1px", height: "20px", background: "var(--gray-200)" }} />
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--text-secondary)" }}>Type:</span>
            {BUILDING_TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: "5px 12px", borderRadius: "100px", border: `1px solid ${typeFilter === t ? "var(--blue)" : "var(--gray-200)"}`, background: typeFilter === t ? "var(--blue)" : "white", color: typeFilter === t ? "white" : "var(--text-secondary)", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                {t}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{filtered.length} districts shown</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "28px", paddingBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* ── District Adoption Grid ── */}
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "20px", color: "var(--text-primary)" }}>📊 Solar Adoption by District</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {filtered.map((d, i) => {
                  const barColor = d.adoption >= 60 ? "#10b981" : d.adoption >= 40 ? "#f59e0b" : "#ef4444";
                  const isSelected = selectedDistrict?.name === d.name;
                  return (
                    <div key={i} onClick={() => setSelectedDistrict(isSelected ? null : d)} style={{ cursor: "pointer", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${isSelected ? barColor : "transparent"}`, background: isSelected ? `${barColor}08` : "transparent", transition: "all 0.2s" }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>{d.name}</span>
                          <span style={{ background: "#f1f5f9", color: "var(--text-muted)", padding: "2px 8px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 600 }}>{d.type}</span>
                        </div>
                        <div style={{ display: "flex", gap: "16px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                          <span title="Installed capacity">⚡ {d.capacity} MW</span>
                          <span title="Homes powered">🏠 {d.homes.toLocaleString()}</span>
                          <span style={{ fontWeight: 800, color: barColor }}>{d.adoption}%</span>
                        </div>
                      </div>
                      <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${d.adoption}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}bb)`, borderRadius: "4px", transition: "width 0.8s" }} />
                      </div>
                      {isSelected && (
                        <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
                          {[
                            { label: "Capacity",    value: `${d.capacity} MW` },
                            { label: "Production",  value: `${(d.production/1000).toFixed(1)} GWh` },
                            { label: "CO₂ Avoided", value: `${d.co2} t/yr` },
                            { label: "Homes",        value: d.homes.toLocaleString() },
                          ].map((s, j) => (
                            <div key={j} style={{ background: "white", borderRadius: "8px", padding: "10px 12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                              <div style={{ fontWeight: 800, color: "var(--blue)", fontSize: "0.95rem" }}>{s.value}</div>
                              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Production / Savings Chart ── */}
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>📈 Annual Trends</h2>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[["production","☀️ Production (MWh)"],["savings","💰 Savings (k DA)"]].map(([key, label]) => (
                    <button key={key} onClick={() => setChartMode(key)} style={{ padding: "5px 12px", borderRadius: "8px", border: "none", background: chartMode === key ? "var(--blue)" : "#f1f5f9", color: chartMode === key ? "white" : "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "140px" }}>
                {(chartMode === "production" ? MONTHLY_PROD : MONTHLY_SAVED).map((v, i) => {
                  const max = chartMode === "production" ? 1050 : 3220;
                  const now = new Date().getMonth();
                  return (
                    <div key={i} title={`${MONTHS[i]}: ${v}${chartMode === "production" ? " MWh" : " k DA"}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", cursor: "pointer" }}>
                      <div style={{ width: "100%", height: `${(v / max) * 130}px`, background: i === now ? "#f59e0b" : "rgba(30,58,95,0.15)", borderRadius: "4px 4px 0 0", transition: "background 0.2s", minHeight: "4px" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#1E3A5F"}
                        onMouseLeave={e => e.currentTarget.style.background = i === now ? "#f59e0b" : "rgba(30,58,95,0.15)"}
                      />
                      <span style={{ fontSize: "0.6rem", color: i === now ? "#f59e0b" : "var(--text-muted)", fontWeight: i === now ? 700 : 500 }}>{MONTHS[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Policy Insights ── */}
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "20px", color: "var(--text-primary)" }}>🏛️ Policy & Planning Insights</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[
                  { icon: "⚡", color: "#3b82f6", title: "Priority Zone", body: "Kouba and Hussein Dey have <35% adoption. Fast-track subsidy programs could add 15 MW within 12 months." },
                  { icon: "🏭", color: "#f59e0b", title: "Industrial Opportunity", body: "Rouiba Industrial Zone already leads at 80 MW. Expanding to 120 MW could power an additional 18,000 homes." },
                  { icon: "🌍", color: "#10b981", title: "CO₂ Progress",  body: "Current 160 t/yr avoidance represents 34% of the city's 2030 carbon target. On track with AI optimization." },
                  { icon: "📣", color: "#c084fc", title: "Public Benefit",  body: "Average household saves ~68,000 DA/year. Expansion programs directly reduce the energy poverty index by 12%." },
                ].map((p, i) => (
                  <div key={i} style={{ background: `${p.color}08`, borderRadius: "12px", padding: "16px", border: `1px solid ${p.color}22` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "1.2rem" }}>{p.icon}</span>
                      <span style={{ fontWeight: 700, color: p.color, fontSize: "0.85rem" }}>{p.title}</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" }}>
            {/* Energy Mix Pie */}
            <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>⚡ Energy Coverage Mix</h3>
              {/* Simple segmented ring */}
              <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 20px" }}>
                <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.5"
                    strokeDasharray={`${solarShare} ${100 - solarShare}`} strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3.5"
                    strokeDasharray={`${gridShare} ${100 - gridShare}`}
                    strokeDashoffset={`${-(solarShare)}`} strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10b981" }}>{solarShare}%</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Solar</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[{ color:"#10b981", label:"Solar Energy", pct: solarShare }, { color:"#3b82f6", label:"Grid (Sonelgaz)", pct: gridShare }].map((s,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:s.color }} />
                      <span style={{ fontSize:"0.82rem", color:"var(--text-secondary)", fontWeight:600 }}>{s.label}</span>
                    </div>
                    <span style={{ fontWeight:800, color:s.color, fontSize:"0.9rem" }}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Global Analytics Guide */}
            <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.2rem" }}>📊</span>
                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>Analytics Guide</h3>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
                Understanding our city-wide CO₂ logic and adoption tracking methodology.
              </p>
              <Link href="/docs#impact" style={{ display: "block", textAlign: "center", background: "#f8fafc", color: "var(--blue)", padding: "10px", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.85rem", border: "1px solid #e2e8f0" }}>
                Technical Overview →
              </Link>
            </div>

            {/* Action Buttons */}
            <Link href="/simulation" style={{ display:"block", textAlign:"center", background:"var(--blue)", color:"white", padding:"14px", borderRadius:"12px", fontWeight:700, textDecoration:"none", fontSize:"0.9rem" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
            >
              ☀️ Simulate New Installation →
            </Link>
            <Link href="/city-map" style={{ display:"block", textAlign:"center", background:"white", color:"var(--blue)", padding:"14px", borderRadius:"12px", fontWeight:700, textDecoration:"none", fontSize:"0.9rem", border:"1px solid var(--gray-200)" }}>
              🗺️ Open City Solar Map
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
