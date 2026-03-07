"use client";
import { useState, useEffect } from "react";
import {
  IconArrowRight,
  IconShield,
  IconWind,
  IconMeter,
  IconWallet,
  IconClock,
  IconSatellite,
  IconBolt,
  IconDocument,
  IconBrain,
  IconCreditCard,
  IconBell,
  IconLightbulb,
  IconTrendDown,
  IconSun,
  IconChevronDown,
  IconGlobe,
  IconTarget,
} from "./components/Icons";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeFaq]);

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="hero parallax-section"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dynamic Bento Grid Background */}
        <div className="bento-bg">
          <div
            className="bento-cell"
            style={{
              top: "10%",
              left: "5%",
              width: "150px",
              height: "150px",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="bento-cell"
            style={{
              top: "25%",
              left: "30%",
              width: "230px",
              height: "150px",
              animationDelay: "1s",
            }}
          ></div>
          <div
            className="bento-cell"
            style={{
              top: "15%",
              right: "10%",
              width: "300px",
              height: "230px",
              animationDelay: "2s",
            }}
          ></div>
          <div
            className="bento-cell"
            style={{
              bottom: "20%",
              left: "15%",
              width: "230px",
              height: "230px",
              animationDelay: "0.5s",
            }}
          ></div>
          <div
            className="bento-cell"
            style={{
              bottom: "10%",
              right: "25%",
              width: "150px",
              height: "150px",
              animationDelay: "1.5s",
            }}
          ></div>
        </div>
        <div className="parallax-orb parallax-orb-1" style={{ zIndex: 1 }} />

        <div
          className="hero-grid container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "center",
            paddingTop: "var(--nav-height)",
            zIndex: 2,
            position: "relative",
          }}
        >
          <div className="hero-content reveal">
            <div
              className="hero-eyebrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "1rem",
              }}
            >
              <span
                className="hero-eyebrow-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--orange)",
                }}
              />
              <span
                style={{
                  color: "var(--orange)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                }}
              >
                AI Infrastructure for Solar Smart Cities
              </span>
            </div>
            <h1
              className="t-display hero-title"
              style={{
                fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1.05",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
            >
              Smart AI Solutions for Renewable Urban Energy.
            </h1>
            <p
              className="t-subheading hero-subtitle"
              style={{
                fontSize: "1.1rem",
                maxWidth: "600px",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Pulse.dz uses artificial intelligence and real-time solar data to
              help citizens and cities simulate, install, and <strong>optimize renewable energy</strong>.
              <br />
              <br />
              Built with scalable AI infrastructure on{" "}
              <strong style={{ color: "var(--blue)" }}>Huawei Cloud</strong>.
            </p>
            <div
              className="hero-actions"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="/simulation"
                className="btn-primary"
                style={{
                  padding: "16px 24px",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "transform 0.2s",
                  boxShadow: "0 10px 30px rgba(30,58,95,0.2)",
                }}
              >
                Simulate My Solar Potential{" "}
                <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </a>
              <a
                href="#city-map"
                className="btn-secondary"
                style={{
                  padding: "16px 24px",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  color: "var(--blue)",
                  border: "1px solid rgba(30,58,95,0.1)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(30,58,95,0.1)";
                }}
              >
                Explore the City Solar Map
              </a>
            </div>
          </div>

          <div
            className="hero-visual reveal reveal-delay-2"
            style={{
              position: "relative",
              width: "100%",
              height: "550px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "var(--shadow-elevated)",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <img
              src="/images/hero-smart-city.png"
              alt="Smart City Infrastructure"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(30,58,95,0.9) 0%, rgba(30,58,95,0) 60%)",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "20px",
                bottom: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                pointerEvents: "none",
              }}
            ></div>

            {/* Overlay Info Card */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                padding: "16px 20px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    background: "rgba(37,99,235,0.1)",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <IconBrain size={24} color="#2563eb" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Powered by
                  </div>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--blue)",
                      fontWeight: 800,
                    }}
                  >
                    Huawei Cloud AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VERTICAL DATA TICKER (REPLACING MARQUEE) ===== */}
      <section className="data-ticker-section reveal">
        <div className="container">
          <div className="ticker-grid">
            {/* Column 1: Production & Efficiency */}
            <div className="ticker-column">
              {[1, 2].map((loop) => (
                <div key={`col1-${loop}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Solar Potential</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value">3,900<span>h</span></div>
                    <div className="ticker-footer">Average annual sunlight hours across Algerian territory.</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Maintenance Loss</span>
                      <div className="ticker-pulse" style={{ background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
                    </div>
                    <div className="ticker-value" style={{ color: 'var(--orange)' }}>40<span>%</span></div>
                    <div className="ticker-footer">Potential efficiency drop without AI-driven Sirocco-Shield.</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">System Yield</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value">98<span>%</span></div>
                    <div className="ticker-footer">Typical performance ratio for Pulse-optimized installations.</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Regional Coverage (Slow) */}
            <div className="ticker-column slow reverse">
              {[1, 2].map((loop) => (
                <div key={`col2-${loop}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Territory</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value">69<span> Wilayas</span></div>
                    <div className="ticker-footer">Pulse.dz is now available with full local support nationwide.</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Active Hubs</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value">12<span> Centers</span></div>
                    <div className="ticker-footer">Strategic logistics and maintenance hubs from Algiers to Tamanrasset.</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Urban Density</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value" style={{ color: 'var(--orange)' }}>84<span>%</span></div>
                    <div className="ticker-footer">Calculated rooftop availability in major metropolitan areas.</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: AI & Finance */}
            <div className="ticker-column">
              {[1, 2].map((loop) => (
                <div key={`col3-${loop}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Infrastructure</span>
                      <div className="ticker-pulse" style={{ background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
                    </div>
                    <div className="ticker-value">AI<span> Powered</span></div>
                    <div className="ticker-footer">Scalable intelligence orchestration on Huawei Cloud.</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">Upfront Cost</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value" style={{ color: '#16a34a' }}>0<span> DA</span></div>
                    <div className="ticker-footer">Full financing package with our partner banks (BNA, BEA).</div>
                  </div>
                  <div className="ticker-card">
                    <div className="ticker-header">
                      <span className="ticker-label">CO2 Offset</span>
                      <div className="ticker-pulse" />
                    </div>
                    <div className="ticker-value">12.4<span>t</span></div>
                    <div className="ticker-footer">Average carbon avoided per residential unit over 25 years.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS MARQUEE ===== */}
      <section className="marquee-container reveal">
        <div className="marquee-track">
          {/* Set 1 */}
          <div className="marquee-item">Sonelgaz</div>
          <div className="marquee-item">BNA</div>
          <div className="marquee-item">APRUE</div>
          <div className="marquee-item">ANIREF</div>
          <div
            className="marquee-item"
            style={{ color: "var(--orange)", fontWeight: 800 }}
          >
            Huawei Solar
          </div>
          {/* Set 2 (Duplicated for infinite scroll) */}
          <div className="marquee-item">Sonelgaz</div>
          <div className="marquee-item">BNA</div>
          <div className="marquee-item">APRUE</div>
          <div className="marquee-item">ANIREF</div>
          <div
            className="marquee-item"
            style={{ color: "var(--orange)", fontWeight: 800 }}
          >
            Huawei Solar
          </div>
        </div>
      </section>

      <div style={{ height: "4rem" }} />

      {/* ===== THE PROBLEM SECTION ===== */}
      <section
        className="problems"
        id="problemes"
        style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Bento Grid Background for Problems */}
        <div className="bento-bg" style={{ opacity: 0.4 }}>
          <div
            className="bento-cell"
            style={{ top: "15%", left: "10%", width: "200px", height: "150px" }}
          ></div>
          <div
            className="bento-cell"
            style={{ bottom: "20%", right: "8%", width: "250px", height: "200px" }}
          ></div>
        </div>
        <div className="container">
          <div
            className="problems-header reveal"
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 60px",
            }}
          >
            <span className="t-label">The Challenge</span>
            <h2 className="t-display" style={{ marginTop: "1rem" }}>
              Why is Solar Adoption Slow in Algeria?
            </h2>
            <p
              className="t-subheading"
              style={{ marginTop: "1rem", fontSize: "1.1rem" }}
            >
              We identified 4 key friction points preventing mass adoption of
              solar energy. Pulse.dz uses AI to automatically resolve them.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                Icon: IconWind,
                cls: "sand",
                title: "Dust & Sand Storms",
                desc: "Dust and sand storms reduce solar panel efficiency by up to 40% when ignored.",
                sol: "AI predicts cleaning needs before production drops.",
              },
              {
                Icon: IconMeter,
                cls: "meter",
                title: "Blind Electric Meters",
                desc: "Standard electric meters do not track solar energy production clearly.",
                sol: "Pulse Bridge reads energy flows in real time.",
              },
              {
                Icon: IconWallet,
                cls: "money",
                title: "High Installation Cost",
                desc: "Solar installation cost is perceived as far too high for average citizens.",
                sol: "Automated financing simulation & ROI analysis.",
              },
              {
                Icon: IconClock,
                cls: "clock",
                title: "Misaligned Energy Use",
                desc: "Solar energy is produced during the day while homes consume more at night.",
                sol: "AI suggests optimal appliance usage times.",
              },
            ].map((p, i) => (
              <div
                className={`reveal reveal-delay-${(i % 4) + 1}`}
                key={i}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "16px",
                  boxShadow: "var(--shadow-card)",
                  border: "1px solid var(--gray-200)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-elevated)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background:
                      p.cls === "sand"
                        ? "rgba(217,119,6,0.1)"
                        : p.cls === "meter"
                          ? "rgba(37,99,235,0.1)"
                          : p.cls === "money"
                            ? "rgba(22,163,74,0.1)"
                            : "rgba(219,39,119,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <p.Icon
                    size={26}
                    color={
                      p.cls === "sand"
                        ? "#d97706"
                        : p.cls === "meter"
                          ? "#2563eb"
                          : p.cls === "money"
                            ? "#16a34a"
                            : "#db2777"
                    }
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                    flexGrow: 1,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    background: "rgba(30,58,95,0.04)",
                    color: "var(--blue)",
                    padding: "14px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    border: "1px solid rgba(30,58,95,0.1)",
                  }}
                >
                  <div style={{ marginTop: "2px" }}>
                    <IconBrain size={16} />
                  </div>
                  <span style={{ lineHeight: 1.4 }}>{p.sol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM OVERVIEW ===== */}
      <section
        className="showcase"
        id="platform"
        style={{ padding: "100px 0", background: "var(--gray-100)", position: "relative", overflow: "hidden" }}
      >
        {/* Subtle Bento Grid for Showcase */}
        <div className="bento-bg" style={{ opacity: 0.3 }}>
           <div className="bento-cell" style={{ top: "40%", left: "2%", width: "120px", height: "300px" }}></div>
           <div className="bento-cell" style={{ bottom: "10%", right: "5%", width: "300px", height: "100px" }}></div>
        </div>
        <div className="container">
          <div
            className="reveal"
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 80px",
            }}
          >
            <span className="t-label">Platform Overview</span>
            <h2 className="t-display" style={{ marginTop: "1rem" }}>
              The Solar Intelligence Ecosystem
            </h2>
            <p className="t-subheading" style={{ marginTop: "1rem" }}>
              Four integrated dashboards designed to connect solar production,
              consumption, and grid interaction into a single intelligent
              platform.
            </p>
          </div>

          <div className="reveal" style={{ maxWidth: "600px", margin: "0 auto" }}>
            {/* CARD 1: SOLAR SIMULATION */}
            <div className="ecosystem-card" style={{ textAlign: "center", border: "1px solid var(--blue)", background: "rgba(30,58,95,0.02)" }}>
              <div className="t-label" style={{ justifyContent: "center" }}>
                Simulation
              </div>
              <h3 className="t-display" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Solar Simulator</h3>
              <p className="t-subheading" style={{ marginBottom: "2rem" }}>
                Accurately estimate your solar potential, installation costs, and ROI in seconds.
              </p>
              <a href="/simulation" className="btn-primary" style={{ padding: "16px 32px", fontSize: "1rem", margin: "0 auto" }}>
                Start My Simulation <IconArrowRight size={18} style={{ marginLeft: "10px" }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI AND DATA ARCHITECTURE ===== */}
      <section
        className="architecture parallax-section"
        style={{ padding: "100px 0", background: "white", position: "relative", overflow: "hidden" }}
      >
        {/* Bento Grid for Architecture section */}
        <div className="bento-bg" style={{ opacity: 0.5 }}>
           <div className="bento-cell" style={{ top: "5%", right: "15%", width: "200px", height: "200px" }}></div>
           <div className="bento-cell" style={{ bottom: "5%", left: "15%", width: "150px", height: "150px" }}></div>
        </div>
        <div className="parallax-orb parallax-orb-2" />
        <div className="container">
          <div
            className="reveal"
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 60px",
            }}
          >
            <span className="t-label">Data Architecture</span>
            <h2 className="t-display" style={{ marginTop: "1rem" }}>
              Powered by Intelligent Cloud Infrastructure
            </h2>
            <p className="t-subheading" style={{ marginTop: "1rem" }}>
              The platform explains how AI and robust data pipelines power the
              system sequentially, leveraging state-of-the-art APIs and cloud
              compute.
            </p>
          </div>

          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "60px",
            }}
          >
            {/* Huawei Cloud */}
            <div
              style={{
                padding: "30px",
                border: "1px solid var(--gray-200)",
                borderRadius: "16px",
                background: "var(--gray-100)",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <IconBrain size={32} color="#2563eb" />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--blue)",
                }}
              >
                Huawei Cloud
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Scalable AI models for solar output prediction, energy
                consumption orchestration, and predictive maintenance analysis.
              </p>
            </div>
            {/* PVGIS Database */}
            <div
              style={{
                padding: "30px",
                border: "1px solid var(--gray-200)",
                borderRadius: "16px",
                background: "var(--gray-100)",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <IconSun size={32} color="#f59e0b" />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--blue)",
                }}
              >
                PVGIS Engine
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Accurate solar radiation database directly calculating monthly
                and yearly solar power estimations dynamically.
              </p>
            </div>
            {/* OpenWeatherMap */}
            <div
              style={{
                padding: "30px",
                border: "1px solid var(--gray-200)",
                borderRadius: "16px",
                background: "var(--gray-100)",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <IconWind size={32} color="#0ea5e9" />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--blue)",
                }}
              >
                OpenWeatherMap
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Integrates localized sun hours, cloud coverage dynamics, and
                temperature parameters to ensure peak simulation accuracy.
              </p>
            </div>
            {/* Google Solar API (Optional Preview) */}
            <div
              style={{
                padding: "30px",
                border: "1px solid var(--gray-200)",
                borderRadius: "16px",
                background: "var(--gray-100)",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "white",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <IconSatellite size={32} color="#10b981" />
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--blue)",
                }}
              >
                Google Solar API
              </h3>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(16,185,129,0.1)",
                  color: "#16a34a",
                  padding: "4px 8px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                FUTURE ROADMAP
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Automatic rooftop detection and satellite-based solar potential
                analysis for zero-click simulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== USER EXPERIENCE GOALS REMINDER STRIP ===== */}
      <section
        style={{ background: "var(--blue)", color: "white", padding: "40px 0" }}
      >
        <div
          className="container reveal"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "30px",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "8px",
                fontFamily: "var(--font-display)",
              }}
            >
              Is it worth it for me?
            </div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              Instant AI viability analysis
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "8px",
                fontFamily: "var(--font-display)",
              }}
            >
              How large of a system?
            </div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              Automated capacity sizing
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "8px",
                fontFamily: "var(--font-display)",
              }}
            >
              How much will I save?
            </div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              Hyper-accurate financial ROI
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section
        className="cta"
        style={{
          padding: "120px 0",
          background: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,136,17,0.08) 0%, transparent 60%)",
          }}
        ></div>
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          <h2
            className="t-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              marginBottom: "24px",
            }}
          >
            Simulate your solar potential now.
          </h2>
          <p
            className="t-subheading"
            style={{ fontSize: "1.2rem", marginBottom: "40px" }}
          >
            Discover how much clean energy your roof can produce and join the
            renewable energy transition in Algeria today.
          </p>
          <a
            href="/simulation"
            className="btn-primary"
            style={{
              padding: "20px 40px",
              fontSize: "1.2rem",
              display: "inline-flex",
              alignItems: "center",
              background: "var(--orange)",
              color: "white",
              borderRadius: "12px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(255,136,17,0.3)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Start My Simulation{" "}
            <IconArrowRight size={24} style={{ marginLeft: "12px" }} />
          </a>
        </div>
      </section>
    </>
  );
}
