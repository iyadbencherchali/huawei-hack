"use client";
import { IconShield, IconSatellite, IconBolt, IconDocument, IconArrowRight } from "../components/Icons";

export default function Docs() {
  return (
    <div className="docs-page container reveal visible" style={{ padding: "var(--space-2xl) 0", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ marginBottom: "var(--space-2xl)", textAlign: "center" }}>
        <h1 className="t-display" style={{ color: "var(--blue)", marginBottom: "var(--space-sm)" }}>Pulse.dz Documentation</h1>
        <p className="t-subheading" style={{ color: "var(--text-secondary)" }}>
          Energy intelligence built for the Algerian reality.
        </p>
      </header>

      <section style={{ marginBottom: "var(--space-2xl)" }}>
        <h2 className="t-title" style={{ color: "var(--blue)", marginBottom: "var(--space-md)", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "0.5rem" }}>The Vision</h2>
        <p style={{ lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Pulse.dz is the missing link between Algerian households and solar energy. While sunlight is abundant and technology is available, adoption is held back by four major obstacles: dust, inadequate meters, upfront costs, and the mismatch between solar production and consumption patterns.
        </p>
        <p style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
          Our platform intelligently orchestrates these elements to turn your rooftop into an automatic profit center.
        </p>
      </section>

      <div className="docs-grid" style={{ display: "grid", gap: "var(--space-xl)" }}>
        
        <div className="docs-item" id="city-map">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "24px" }}>🏙️</span>
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>City Map Analysis</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Our rooftop analysis uses high-resolution satellite data to calculate the exact square meters of usable space. We factor in the orientation, shading from nearby buildings, and the regional 1,700–2,300 kWh/m² annual irradiance. This allows us to predict system yields with 94% accuracy before a single technician visits the site.
          </p>
        </div>

        <div className="docs-item" id="orchestration">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "24px" }}>🤖</span>
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>AI Orchestration (Sirocco-Shield)</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Sirocco-Shield is not just a protector; it's a scheduler. By predicting the 24-hour solar curve, the AI identifies "Net-Zero Windows" where your free solar production exceeds your home's base load. It then prioritizes running appliances (ACs, pumps) during these windows, effectively treating your appliances as "thermal batteries."
          </p>
        </div>

        <div className="docs-item" id="impact">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "24px" }}>📈</span>
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Smart City Impact Metrics</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            The Impact Dashboard aggregates real-time data from every Pulse Bridge across the city. We calculate CO₂ avoidance using the Algerian grid emission factor (0.487 kg/kWh). This transparency allows city planners to identify "Solar Deserts"—districts with high potential but low adoption—to prioritize local incentives.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconShield size={24} color="var(--orange)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Sirocco-Shield Protection</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Our AI predicts sandstorms 24 hours in advance by cross-referencing Copernicus satellite imagery with local weather data. It alerts you precisely when your panels start losing efficiency, allowing you to schedule a certified cleaning before your output drops.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconSatellite size={24} color="var(--blue)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Pulse Bridge IoT</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            A non-invasive smart sensor that clips onto your existing Sonelgaz meter — no hardware replacement needed. It reads your consumption and production in real time and transmits data over the LoRaWAN network, working even in areas without Wi-Fi or 4G coverage.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconDocument size={24} color="var(--green)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Green Sukuk Financing</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            We automate the generation of your Mourabaha loan application. The app calculates your future savings to guarantee zero-down financing. Your monthly repayments are covered by the energy savings generated by your new solar panels.
          </p>
        </div>

      </div>

      <footer style={{ marginTop: "var(--space-3xl)", textAlign: "center" }}>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </footer>
    </div>
  );
}
