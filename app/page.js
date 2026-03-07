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
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Optimization
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    color: "#16a34a",
                    fontWeight: 800,
                  }}
                >
                  +40% Output
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

          {/* DASHBOARD 1: SOLAR SIMULATION */}
          <div className="platform-grid reveal">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(30,58,95,0.1)",
                    color: "var(--blue)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  1
                </div>
                <h3 className="t-display" style={{ fontSize: "2rem" }}>
                  Solar Simulation
                </h3>
              </div>
              <p className="t-subheading" style={{ marginBottom: "24px" }}>
                Allow homeowners to estimate solar potential for their house
                instantly based on accurate meteorological data and AI.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    background: "white",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid var(--gray-200)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Estimated Size
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "var(--blue)",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                      marginTop: "4px",
                    }}
                  >
                    3.3{" "}
                    <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                      kW
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "4px",
                    }}
                  >
                    6 panels (550W each)
                  </div>
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid var(--gray-200)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Annual Savings
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "var(--orange)",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                      marginTop: "4px",
                    }}
                  >
                    90k{" "}
                    <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                      DA
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "4px",
                    }}
                  >
                    Payback period: 8 years
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid var(--gray-200)",
                  marginBottom: "32px",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: "16px",
                    color: "var(--text-primary)",
                    textTransform: "uppercase",
                  }}
                >
                  Energy Flow Visualization
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.85rem",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <IconSun size={28} color="#f59e0b" />
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      Solar
                      <br />
                      <strong
                        style={{ color: "var(--blue)", fontSize: "1rem" }}
                      >
                        4,488 kWh
                      </strong>
                    </div>
                  </div>
                  <IconArrowRight size={20} color="var(--gray-400)" />
                  <div>
                    <IconShield size={28} color="#10b981" />
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      House
                      <br />
                      <strong
                        style={{ color: "var(--blue)", fontSize: "1rem" }}
                      >
                        4,000 kWh
                      </strong>
                    </div>
                  </div>
                  <IconArrowRight size={20} color="var(--gray-400)" />
                  <div>
                    <IconBolt size={28} color="#3b82f6" />
                    <div
                      style={{
                        marginTop: "8px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      Grid
                      <br />
                      <strong
                        style={{ color: "var(--blue)", fontSize: "1rem" }}
                      >
                        488 kWh surplus
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/simulation"
                className="btn-primary"
                style={{
                  padding: "14px 24px",
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Run Your Simulation{" "}
                <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </a>
            </div>
            <div className="platform-visual">
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  Simulated Inputs
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      background: "var(--gray-100)",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    📍 Algiers
                  </span>
                  <span
                    style={{
                      background: "var(--gray-100)",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    📐 120 m² Roof
                  </span>
                  <span
                    style={{
                      background: "var(--gray-100)",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    ⚡ 4000 kWh / yr
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: "1px",
                  background: "var(--gray-200)",
                  margin: "24px 0",
                }}
              ></div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  Environmental Impact
                </div>
                <div
                  style={{
                    background: "#dcfce7",
                    border: "1px solid #bbf7d0",
                    color: "#166534",
                    padding: "20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      background: "white",
                      borderRadius: "50%",
                      display: "flex",
                    }}
                  >
                    <IconTarget size={28} color="#16a34a" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      2,200 kg
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        opacity: 0.8,
                      }}
                    >
                      CO2 avoided annually
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  <span>Energy Coverage</span>
                  <span style={{ color: "#16a34a" }}>112%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "var(--gray-200)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      background: "linear-gradient(90deg, #10b981, #34d399)",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD 2: SOLAR CITY MAP */}
          <div
            className="platform-grid reverse-grid reveal reveal-delay-2"
            id="city-map"
          >
            <div
              className="platform-visual"
              style={{
                background: "linear-gradient(135deg, #1E3A5F, #0f1c2e)",
                color: "white",
                padding: 0,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "30px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <IconGlobe size={24} color="#ff8811" />
                  <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                    City Solar Map
                  </span>
                </div>
              </div>
              {/* Simulated Map View Container */}
              <div
                style={{
                  position: "relative",
                  height: "300px",
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Floating Building Card */}
                <div
                  style={{
                    background: "white",
                    color: "var(--text-primary)",
                    padding: "16px",
                    borderRadius: "12px",
                    width: "240px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#10b981",
                      }}
                    ></div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      High Potential
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: "4px" }}>
                    Villa — 120 m² roof
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Production:</span> <strong>4500 kWh/yr</strong>
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>CO2 reduct:</span> <strong>2 tons/yr</strong>
                  </div>
                </div>
                {/* Simulated color markings on the grid */}
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "60%",
                    width: "40px",
                    height: "40px",
                    background: "rgba(16, 185, 129, 0.4)",
                    border: "2px solid #10b981",
                    transform: "rotate(15deg)",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "30%",
                    width: "50px",
                    height: "30px",
                    background: "rgba(245, 158, 11, 0.4)",
                    border: "2px solid #f59e0b",
                    transform: "rotate(-10deg)",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "30%",
                    right: "20%",
                    width: "35px",
                    height: "45px",
                    background: "rgba(239, 68, 68, 0.4)",
                    border: "2px solid #ef4444",
                    transform: "rotate(5deg)",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(30,58,95,0.1)",
                    color: "var(--blue)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <h3 className="t-display" style={{ fontSize: "2rem" }}>
                  Solar City Map
                </h3>
              </div>
              <p className="t-subheading" style={{ marginBottom: "24px" }}>
                Visualize solar potential across the entire city. Map view with
                buildings colored by solar potential to plan renewable
                infrastructure efficiently.
              </p>

              <ul
                style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      background: "#10b981",
                    }}
                  ></div>
                  <span
                    style={{ fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    Green = High Solar Potential
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      background: "#f59e0b",
                    }}
                  ></div>
                  <span
                    style={{ fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    Yellow = Medium Potential
                  </span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      background: "#ef4444",
                    }}
                  ></div>
                  <span
                    style={{ fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    Red = Low Potential
                  </span>
                </li>
              </ul>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  borderLeft: "4px solid var(--orange)",
                  paddingLeft: "16px",
                  fontStyle: "italic",
                }}
              >
                "This dashboard demonstrates how solar infrastructure can scale
                simultaneously across the city, allowing urban planners and
                citizens to act."
              </p>

              <a
                href="/city-map"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "24px",
                  padding: "14px 24px",
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 8px 24px rgba(30,58,95,0.2)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,58,95,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,95,0.2)"; }}
              >
                <IconGlobe size={18} /> Explore the City Map →
              </a>
            </div>
          </div>

          {/* DASHBOARD 3: AI ENERGY OPTIMIZATION */}
          <div className="platform-grid reveal reveal-delay-3">
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(30,58,95,0.1)",
                    color: "var(--blue)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  3
                </div>
                <h3 className="t-display" style={{ fontSize: "2rem" }}>
                  AI Energy Optimization
                </h3>
              </div>
              <p className="t-subheading" style={{ marginBottom: "24px" }}>
                Help households optimize energy consumption based on real-time
                solar production. AI analyzes patterns and orchestrates when to
                use power reliably.
              </p>

              <a
                href="/ai-optimization"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "28px",
                  padding: "14px 24px",
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 24px rgba(30,58,95,0.2)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,58,95,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,95,0.2)"; }}
              >
                <IconBolt size={18} /> Open AI Optimizer →
              </a>

              <div
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--gray-200)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <IconLightbulb size={24} color="#f59e0b" />
                  <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    AI Orchestration Recommendations
                  </span>
                </div>

                {[
                  {
                    time: "12:30",
                    action: "Run water pump",
                    reason: "Solar production peaks soon.",
                  },
                  {
                    time: "13:00",
                    action: "Run washing machine",
                    reason: "Maximum solar radiation detected.",
                  },
                  {
                    time: "14:00",
                    action: "Charge electric vehicle",
                    reason: "Surplus energy available.",
                  },
                ].map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      padding: "12px 0",
                      borderBottom:
                        i !== 2 ? "1px solid var(--gray-200)" : "none",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--orange-glow)",
                        color: "var(--orange)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        minWidth: "60px",
                        textAlign: "center",
                      }}
                    >
                      {rec.time}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: "2px",
                        }}
                      >
                        {rec.action}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {rec.reason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="platform-visual"
              style={{
                background: "var(--blue)",
                color: "white",
                padding: "40px",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Live Solar Production
                </div>
                <div
                  style={{
                    fontSize: "3rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#f59e0b",
                  }}
                >
                  3.8
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      color: "white",
                    }}
                  >
                    {" "}
                    kW
                  </span>
                </div>
              </div>
              {/* Simulated Graph */}
              <div
                style={{
                  height: "120px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.2)",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "20%",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "40%",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "70%",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "90%",
                    background: "#f59e0b",
                    borderRadius: "4px 4px 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "white",
                      color: "var(--blue)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    PEAK
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "100%",
                    background: "#f59e0b",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "80%",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    height: "50%",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "4px 4px 0 0",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 700,
                }}
              >
                <span>08:00</span>
                <span>10:00</span>
                <span>12:00</span>
                <span style={{ color: "white" }}>13:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
              <a
                href="/ai-optimization"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 24px",
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 8px 24px rgba(30,58,95,0.2)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,58,95,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,95,0.2)"; }}
              >
                <IconBolt size={18} /> Open AI Optimizer →
              </a>
            </div>
          </div>

          {/* DASHBOARD 4: SMART CITY IMPACT */}
          <div
            className="platform-grid reverse-grid reveal reveal-delay-4"
            style={{ marginBottom: 0 }}
          >
            <div className="platform-visual" style={{ padding: "40px" }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <IconTarget
                  size={40}
                  color="var(--orange)"
                  style={{ margin: "0 auto 16px" }}
                />
                <h4
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Overall City Impact
                </h4>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    background: "var(--gray-100)",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "var(--blue)",
                      lineHeight: 1.2,
                    }}
                  >
                    120<span style={{ fontSize: "1rem" }}> MW</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "8px",
                    }}
                  >
                    Installed Cap
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--gray-100)",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "var(--blue)",
                      lineHeight: 1.2,
                    }}
                  >
                    180<span style={{ fontSize: "1rem" }}> GWh</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "8px",
                    }}
                  >
                    Annual Prod
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(22,163,74,0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#16a34a",
                      lineHeight: 1.2,
                    }}
                  >
                    95k<span style={{ fontSize: "1rem" }}> t</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "8px",
                    }}
                  >
                    CO2 Avoided
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#d97706",
                      lineHeight: 1.2,
                    }}
                  >
                    42k
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "8px",
                    }}
                  >
                    Homes Powered
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(30,58,95,0.1)",
                    color: "var(--blue)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  4
                </div>
                <h3 className="t-display" style={{ fontSize: "2rem" }}>
                  Smart City Impact
                </h3>
              </div>
              <p className="t-subheading" style={{ marginBottom: "24px" }}>
                Showcase the large scale impact of solar energy adoption. This
                dashboard demonstrates the grand smart city vision translating
                into real metrics.
              </p>

              <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                  style={{ display: "flex", gap: "16px", marginBottom: "20px" }}
                >
                  <IconGlobe
                    size={24}
                    color="var(--blue)"
                    style={{ flexShrink: 0 }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Public Transparency
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Citizens and municipalities can actively track how clean
                      energy improves their urban infrastructure in real-time.
                    </p>
                  </div>
                </li>
                <li style={{ display: "flex", gap: "16px" }}>
                  <IconDocument
                    size={24}
                    color="var(--blue)"
                    style={{ flexShrink: 0 }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Data-Driven Policy
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Provides energy operators and governments actionable
                      insights to expand renewable grids intelligently.
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href="/smart-city"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "24px",
                  padding: "14px 24px",
                  background: "linear-gradient(135deg, var(--blue), #0f1c2e)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 8px 24px rgba(30,58,95,0.2)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <IconTarget size={18} /> View City Impact →
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
