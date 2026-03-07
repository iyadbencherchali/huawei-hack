"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const APPLIANCES = [
  { id: 1, name: "Air Conditioner",  icon: "❄️", power: 1.8, time: "13:00", reason: "Maximum solar radiation — run for free.", status: "optimal",    aiControlled: true  },
  { id: 2, name: "Washing Machine",  icon: "👕", power: 0.8, time: "12:30", reason: "Solar production peaks soon.",            status: "optimal",    aiControlled: true  },
  { id: 3, name: "Water Pump",       icon: "💧", power: 0.6, time: "11:00", reason: "Pre-peak window, good efficiency.",      status: "ready",      aiControlled: true  },
  { id: 4, name: "EV Charging",      icon: "🚗", power: 3.2, time: "14:00", reason: "Surplus energy available (0.8 kW).",    status: "optimal",    aiControlled: false },
  { id: 5, name: "Dishwasher",       icon: "🍽️", power: 0.5, time: "18:30", reason: "Solar dropping — use stored buffer.",   status: "suboptimal", aiControlled: true  },
  { id: 6, name: "Pool Pump",        icon: "🏊", power: 1.1, time: "20:00", reason: "Off-peak grid tariff available.",       status: "suboptimal", aiControlled: false },
  { id: 7, name: "Water Heater",     icon: "🔥", power: 2.0, time: "07:00", reason: "Early morning — grid only.",            status: "off",        aiControlled: true  },
];

const MONTHLY = [6.2, 7.8, 10.4, 12.1, 15.8, 18.2, 21.0, 20.4, 15.2, 11.3, 7.5, 5.8];
const MONTHS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const HOURLY  = [0,0,0,0,0,0.2,0.8,1.5,2.3,3.1,3.6,3.8,3.8,3.5,3.0,2.4,1.6,0.8,0.2,0,0,0,0,0];

const STATUS_STYLES = {
  optimal:    { bg: "rgba(16,185,129,0.1)",  border: "#10b981", dot: "#10b981", label: "Optimized"   },
  ready:      { bg: "rgba(245,158,11,0.08)", border: "#f59e0b", dot: "#f59e0b", label: "Ready"        },
  suboptimal: { bg: "rgba(249,115,22,0.08)", border: "#f97316", dot: "#f97316", label: "Sub-optimal"  },
  off:        { bg: "rgba(107,114,128,0.06)",border: "#9ca3af", dot: "#9ca3af", label: "Off"          },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIOptimizationDashboard() {
  const [appliances, setAppliances]     = useState(APPLIANCES);
  const [aiOverride, setAiOverride]     = useState(true);
  const [solarProd, setSolarProd]       = useState(3.8);
  const [consumption, setConsumption]   = useState(2.2);
  const [currentHour, setCurrentHour]   = useState(13);
  const [activeTab, setActiveTab]       = useState("daily");

  // Simulate live fluctuation
  useEffect(() => {
    const iv = setInterval(() => {
      setSolarProd(p => Math.max(0, +(p + (Math.random() - 0.48) * 0.12).toFixed(2)));
      setConsumption(c => Math.max(0.5, +(c + (Math.random() - 0.5) * 0.08).toFixed(2)));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const surplus = +(solarProd - consumption).toFixed(2);
  const efficiency = Math.round((solarProd / 4.2) * 100);
  const co2Today = +(solarProd * 0.487).toFixed(1);
  const savingsMonth = Math.round(MONTHLY[new Date().getMonth()] * 1000 * 8.5);

  const toggleControl = (id) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, aiControlled: !a.aiControlled } : a));
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", background: "#f8fafc", fontFamily: "var(--font-body)" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #0f1c2e 0%, #1E3A5F 100%)", padding: "48px 0 40px", color: "white" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "32px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Link href="/#platform" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>← Platform Overview</Link>
                <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "3px 10px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 700 }}>
                  ● LIVE
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, marginBottom: "6px" }}>
                🤖 AI Energy Optimization
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "560px", lineHeight: 1.5, fontSize: "0.95rem" }}>
                Real-time AI orchestration of your home energy using live solar production data. Powered by Huawei Cloud AI.
              </p>
            </div>

            {/* Global AI Override Toggle */}
            <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div>
                <div style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>AI Auto-Control</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{aiOverride ? "Huawei Cloud AI managing schedule" : "Manual override active"}</div>
              </div>
              <button
                onClick={() => setAiOverride(v => !v)}
                style={{
                  width: "52px", height: "28px", borderRadius: "14px", border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s",
                  background: aiOverride ? "#10b981" : "#4b5563",
                }}
              >
                <div style={{ position: "absolute", top: "3px", left: aiOverride ? "27px" : "3px", width: "22px", height: "22px", borderRadius: "50%", background: "white", transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
              </button>
            </div>
          </div>

          {/* Live Energy Flow */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "24px 28px" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>⚡ Live Energy Flow</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
              {/* Solar */}
              <div style={{ textAlign: "center", minWidth: "110px" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>☀️</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b" }}>{solarProd} <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>kW</span></div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase" }}>Solar Panels</div>
              </div>
              {/* Arrow to Home */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", flex: 1, minWidth: "80px" }}>
                <div style={{ height: "3px", background: "linear-gradient(90deg, #f59e0b, #10b981)", width: "100%", borderRadius: "2px", position: "relative" }}>
                  <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "8px solid #10b981" }} />
                </div>
                <div style={{ fontSize: "0.7rem", color: "#10b981", marginTop: "6px", fontWeight: 600 }}>{Math.min(solarProd, consumption).toFixed(1)} kW</div>
              </div>
              {/* Home */}
              <div style={{ textAlign: "center", minWidth: "110px" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>🏠</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#60a5fa" }}>{consumption} <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>kW</span></div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase" }}>Home</div>
              </div>
              {/* Arrow to Grid */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 12px", flex: 1, minWidth: "80px" }}>
                <div style={{ height: "3px", background: surplus > 0 ? "linear-gradient(90deg, #10b981, #c084fc)" : "linear-gradient(90deg, #ef4444, #60a5fa)", width: "100%", borderRadius: "2px", position: "relative" }}>
                  <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `8px solid ${surplus > 0 ? "#c084fc" : "#ef4444"}` }} />
                </div>
                <div style={{ fontSize: "0.7rem", color: surplus > 0 ? "#c084fc" : "#ef4444", marginTop: "6px", fontWeight: 600 }}>{Math.abs(surplus).toFixed(1)} kW {surplus > 0 ? "surplus" : "from grid"}</div>
              </div>
              {/* Grid */}
              <div style={{ textAlign: "center", minWidth: "110px" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>⚡</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: surplus > 0 ? "#c084fc" : "#ef4444" }}>
                  {surplus > 0 ? "+" : ""}{surplus} <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>kW</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase" }}>{surplus > 0 ? "To Grid" : "From Grid"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "32px", paddingBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Solar Efficiency",   value: `${efficiency}%`,        color: "#10b981", icon: "☀️", sub: "of 4.2 kW peak"        },
            { label: "CO₂ Avoided Today",  value: `${co2Today} kg`,        color: "#3b82f6", icon: "🌱", sub: "vs. grid electricity"   },
            { label: "Est. Monthly Saving", value: `${savingsMonth.toLocaleString()} DA`, color: "#f59e0b", icon: "💰", sub: "vs. full grid usage" },
            { label: "AI-Controlled",       value: `${appliances.filter(a=>a.aiControlled).length}/${appliances.length}`, color: "#c084fc", icon: "🤖", sub: "appliances" },
          ].map((m,i) => (
            <div key={i} style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>{m.icon}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: m.color }}>{m.value}</div>
              </div>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.85rem", marginTop: "8px" }}>{m.label}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>{m.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "24px", alignItems: "start" }}>
          {/* ── AI Appliance Schedule ── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text-primary)" }}>🤖 AI Appliance Schedule</h2>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Today — {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"short" })}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {appliances.map((a) => {
                const s = STATUS_STYLES[a.status];
                return (
                  <div key={a.id} style={{ background: s.bg, borderRadius: "12px", padding: "16px 20px", border: `1px solid ${s.border}22`, display: "flex", alignItems: "center", gap: "16px", transition: "transform 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                  >
                    {/* Time */}
                    <div style={{ background: "white", border: `1px solid ${s.border}44`, borderRadius: "8px", padding: "6px 12px", minWidth: "60px", textAlign: "center" }}>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: s.dot }}>{a.time}</div>
                    </div>

                    {/* Icon + Name */}
                    <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>{a.name}</span>
                        <span style={{ background: `${s.dot}22`, color: s.dot, padding: "2px 8px", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>{s.label}</span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{a.reason}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>⚡ {a.power} kW</div>
                    </div>

                    {/* AI / Manual Toggle */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                        {a.aiControlled && aiOverride ? "AI" : "Manual"}
                      </div>
                      <button
                        onClick={() => toggleControl(a.id)}
                        disabled={!aiOverride}
                        style={{
                          width: "42px", height: "22px", borderRadius: "11px", border: "none", cursor: aiOverride ? "pointer" : "not-allowed",
                          background: a.aiControlled && aiOverride ? "#10b981" : "#9ca3af",
                          opacity: aiOverride ? 1 : 0.6, position: "relative", transition: "background 0.3s",
                        }}
                        title={aiOverride ? (a.aiControlled ? "Switch to Manual" : "Switch to AI") : "Enable AI Auto-Control first"}
                      >
                        <div style={{ position: "absolute", top: "2px", left: a.aiControlled && aiOverride ? "22px" : "2px", width: "18px", height: "18px", borderRadius: "50%", background: "white", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Analytics Panel ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Chart Toggle */}
            <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>📊 Solar Production</h3>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["daily", "monthly"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "5px 12px", borderRadius: "8px", border: "none", background: activeTab === tab ? "var(--blue)" : "#f1f5f9", color: activeTab === tab ? "white" : "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer", textTransform: "capitalize" }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "daily" ? (
                <>
                  {/* Hourly bar chart */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "100px" }}>
                    {HOURLY.map((v, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <div style={{ width: "100%", height: v > 0 ? `${(v / 3.8) * 90}%` : "4px", background: i === currentHour ? "#f59e0b" : "rgba(30,58,95,0.2)", borderRadius: "3px 3px 0 0", minHeight: "4px", transition: "height 0.5s" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "6px" }}>
                    <span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>
                  </div>
                  <div style={{ marginTop: "12px", padding: "10px 14px", background: "#fef3c7", borderRadius: "8px", border: "1px solid #fde68a", fontSize: "0.78rem", color: "#92400e", fontWeight: 600 }}>
                    ☀️ Peak window: 11:00 – 15:00 · Today's total: ~18.4 kWh
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "100px" }}>
                    {MONTHLY.map((v, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <div style={{ width: "100%", height: `${(v / 21) * 90}%`, background: i === new Date().getMonth() ? "#f59e0b" : "rgba(30,58,95,0.2)", borderRadius: "3px 3px 0 0", minHeight: "4px" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "6px" }}>
                    {MONTHS.map(m => <span key={m}>{m}</span>)}
                  </div>
                  <div style={{ marginTop: "12px", padding: "10px 14px", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0", fontSize: "0.78rem", color: "#166534", fontWeight: 600 }}>
                    🌱 Best months: Jun–Aug · Annual: ~152 MWh projected
                  </div>
                </>
              )}
            </div>

            {/* Efficiency Gauge */}
            <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "16px" }}>📈 System Efficiency</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Self-Consumption Rate", value: surplus > 0 ? 100 : Math.round((solarProd / consumption) * 100), color: "#10b981" },
                  { label: "Panel Output", value: efficiency, color: "#f59e0b" },
                  { label: "AI Optimization Score", value: aiOverride ? 94 : 62, color: "#c084fc" },
                ].map((g, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>{g.label}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: g.color }}>{Math.min(g.value, 100)}%</span>
                    </div>
                    <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min(g.value, 100)}%`, background: g.color, borderRadius: "3px", transition: "width 1s" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation & AI Insights */}
            <div style={{ background: "white", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.2rem" }}>📖</span>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", margin: 0 }}>AI Orchestration Guide</h3>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px" }}>
                Learn how Pulse uses predictive AI to schedule your heavy appliances for maximum solar efficiency.
              </p>
              <Link href="/docs#orchestration" style={{ display: "block", textAlign: "center", background: "#f1f5f9", color: "var(--blue)", padding: "10px", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.85rem", border: "1px solid #e2e8f0" }}>
                View Technical Docs →
              </Link>
            </div>

            {/* Monthly Savings */}
            <div style={{ background: "linear-gradient(135deg, #1E3A5F, #0f1c2e)", borderRadius: "14px", padding: "20px", color: "white" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "8px" }}>Estimated Monthly Savings</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f59e0b" }}>{savingsMonth.toLocaleString()} <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>DA</span></div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "4px", marginBottom: "16px" }}>vs. full grid-only usage this month</div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "16px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <div style={{ color: "rgba(255,255,255,0.6)" }}>CO₂ Avoided</div>
                <div style={{ color: "#10b981", fontWeight: 700 }}>{(MONTHLY[new Date().getMonth()] * 0.487).toFixed(1)} tons/mo</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginTop: "8px" }}>
                <div style={{ color: "rgba(255,255,255,0.6)" }}>AI Engine</div>
                <div style={{ color: "#60a5fa", fontWeight: 700 }}>Huawei Cloud AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
