"use client";
import { useState, useEffect } from "react";
import {
  IconArrowRight, IconShield, IconWind, IconMeter, IconWallet, IconClock,
  IconSatellite, IconBolt, IconDocument, IconBrain, IconCreditCard,
  IconBell, IconLightbulb, IconTrendDown, IconSun, IconChevronDown,
  IconApple, IconPlayStore
} from "./components/Icons";

export default function Home() {
  const [simResult, setSimResult] = useState(null);
  const [facture, setFacture] = useState("");
  const [wilaya, setWilaya] = useState("");

  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeFaq]); // Re-observe if FAQ expands

  const handleSimulate = (e) => {
    e.preventDefault();
    const m = parseInt(facture);
    if (!m || !wilaya) return;
    const f = wilaya === "Sud" ? 0.65 : wilaya === "Hauts Plateaux" ? 0.55 : 0.45;
    setSimResult(Math.round(m * 12 * f));
  };

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero parallax-section">
        <div className="parallax-orb parallax-orb-1" />
        <div className="hero-grid container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span>Système d'Orchestration Énergétique</span>
            </div>
            <h1 className="t-display hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: "1.05", fontWeight: "500" }}>Votre toit peut <em>produire</em> votre énergie.</h1>
            <p className="t-subheading hero-subtitle">
              Pulse.dz est un Système d'Orchestration Énergétique Décentralisé. Calculez votre potentiel solaire en 60 secondes, financez votre installation, et optimisez votre production grâce à l'IA.
            </p>
            <div className="hero-actions">
              <a href="/simulateur" className="btn-primary">
                Faites le test (60s) <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </a>
              <a href="/simulateur" className="btn-secondary">
                Simulation instantanée
              </a>
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-value">12<span>,</span>400<span>+</span></div><div className="hero-stat-label">Simulations effectuées</div></div>
              <div><div className="hero-stat-value">58 <span>wilayas</span></div><div className="hero-stat-label">Couvertes en Algérie</div></div>
              <div><div className="hero-stat-value">8.4<span>K DA</span></div><div className="hero-stat-label">Économies moyennes / mois</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-orb" />
            <div className="hero-image-wrapper reveal" style={{ position: "relative", width: "100%", height: "600px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "24px", overflow: "hidden", boxShadow: "var(--shadow-elevated)" }}>
                <img src="/images/hero-house.png" alt="Villa moderne avec panneaux solaires" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(30,58,95,0.8), transparent)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROOF BAR ===== */}
      <section className="proof-bar">
        <div className="container proof-bar-inner reveal">
          <div className="proof-item"><div className="proof-value">3,500<span>h</span></div><div className="proof-label">d'ensoleillement / an au Sahara</div></div>
          <div className="proof-item"><div className="proof-value">40<span>%</span></div><div className="proof-label">perte par poussière non traitée</div></div>
          <div className="proof-item"><div className="proof-value">0<span> DA</span></div><div className="proof-label">d'apport pour démarrer</div></div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="partners">
        <div className="partners-inner reveal">
          <div className="partners-track">
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Sonelgaz</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BNA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BEA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Badr</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> ANIREF</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> APRUE</div>
            {/* Duplicate for infinite loop */}
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Sonelgaz</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BNA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BEA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Badr</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> ANIREF</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> APRUE</div>
            {/* Triplicate for large screens */}
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Sonelgaz</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BNA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BEA</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Badr</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> ANIREF</div>
            <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> APRUE</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ===== PROBLEMS ===== */}
      <section className="problems parallax-section" id="problemes">
        <div className="parallax-orb parallax-orb-2" />
        <div className="container">
          <div className="problems-header reveal">
            <span className="t-label">Pourquoi le solaire ne décolle pas</span>
            <h2 className="t-display">4 frictions qui bloquent la transition énergétique</h2>
            <p className="t-subheading" style={{ marginTop: "var(--space-sm)" }}>Chaque obstacle a une solution. Pulse.dz les résout tous simultanément.</p>
          </div>
          <div className="problems-grid">
            {[
              { Icon: IconWind, cls: "sand", title: "Le Sirocco détruit vos rendements", desc: "Le vent de sable réduit l'efficacité jusqu'à 40%. Le problème : l'invisibilité de la perte. Sans alerte ni mesure, vous perdez des centaines de dinars par jour sans le savoir.", sol: "Sirocco-Shield IA prédit et alerte" },
              { Icon: IconMeter, cls: "meter", title: "Compteurs aveugles de Sonelgaz", desc: "Les compteurs électromécaniques sont incapables de distinguer la direction du flux. Votre surplus solaire injecté dans le réseau est invisible et perdu.", sol: "Pulse Bridge lit tout sans modification" },
              { Icon: IconWallet, cls: "money", title: "Barrière financière", desc: "Plusieurs centaines de milliers de dinars en une seule fois est impossible pour la majorité des foyers. Aucun produit bancaire spécifique n'existait pour le solaire résidentiel.", sol: "Financement bancaire via BNA/BEA/Badr" },
              { Icon: IconClock, cls: "clock", title: "Décalage production / consommation", desc: "Vous produisez au maximum entre 10h et 14h — quand la famille est absente. La consommation maximale est entre 18h et 22h, quand le soleil est couché.", sol: "Smart Charging Optimizer par l'IA" },
            ].map((p, i) => (
              <div className={`problem-card reveal reveal-delay-${i + 1}`} key={i}>
                <div className={`problem-icon ${p.cls}`}><p.Icon size={24} color={p.cls === "sand" ? "#d97706" : p.cls === "meter" ? "#2563eb" : p.cls === "money" ? "#16a34a" : "#db2777"} /></div>
                <h3 className="problem-title">{p.title}</h3>
                <p className="problem-desc">{p.desc}</p>
                <div className="problem-solution"><span className="problem-solution-dot" /><span>{p.sol}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="showcase" id="solution">
        <div className="container showcase-inner">
          <div className="showcase-content reveal">
            <span className="t-label">L'application Pulse.dz</span>
            <h2 className="t-display">Votre centrale solaire, dans votre poche.</h2>
            <p className="t-subheading">Production en temps réel, alertes intelligentes, financement intégré et optimisation IA — tout dans une seule application.</p>
            <div className="showcase-features">
              {[
                { Icon: IconSatellite, t: "Monitoring en temps réel", d: "Production, consommation et batteries — visibles à chaque instant via le Pulse Bridge IoT, transmis par LoRaWAN sans Wi-Fi ni 4G." },
                { Icon: IconBrain, t: "IA prédictive Sirocco-Shield", d: "Gradient Boosting Regressor entraîné sur 9 ans de données NASA. Anticipe les tempêtes, calcule la perte en DA, et alerte proactivement." },
                { Icon: IconCreditCard, t: "Pulse Finance", d: "Dossier de financement généré automatiquement, intégrant les réductions LF2026. Prêt à déposer auprès de BNA, BEA ou Badr." },
              ].map((f, i) => (
                <div className="showcase-feature" key={i}>
                  <div className="showcase-feature-icon"><f.Icon size={20} color="#ff8811" /></div>
                  <div className="showcase-feature-text"><h4>{f.t}</h4><p>{f.d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="showcase-visual reveal reveal-delay-2">
            <div className="showcase-phone">
              <div className="showcase-phone-screen">
                <div className="phone-header">
                  <div><div className="phone-greeting">Pulse Board</div><div className="phone-title" style={{ fontSize: "0.85rem" }}>Performances en direct</div></div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", marginBottom: "4px" }}>Production (kW)</div>
                <div className="showcase-graph-area">
                  <div className="showcase-graph-bars">{[1.2, 2.4, 3.8, 4.2].map((v, i) => <div className="graph-bar" key={i} style={{ height: `${v * 15}%` }} />)}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  {["09:00", "11:00", "13:00", "15:00"].map((t) => <span key={t} style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.25)" }}>{t}</span>)}
                </div>
                <div className="phone-mini-cards" style={{ marginTop: "10px" }}>
                  <div className="phone-mini-card"><div className="phone-mini-label">Production</div><div className="phone-mini-value orange">4.2 kW</div></div>
                  <div className="phone-mini-card"><div className="phone-mini-label">Cellule</div><div className="phone-mini-value blue">+1,240 PC</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 PILLARS ===== */}
      <section className="pillars parallax-section" id="piliers">
        <div className="parallax-orb parallax-orb-1" />
        <div className="container">
          <div className="pillars-header reveal">
            <span className="t-label">Les 4 Piliers</span>
            <h2 className="t-display">Une infrastructure complète, pas un gadget.</h2>
          </div>
          <div className="pillars-grid">
            {[
              { n: "01", Icon: IconShield, cls: "orange", t: "IA Active : Sirocco-Shield", d: "Là où les autres font de simples graphiques, Pulse.dz protège activement le matériel. L'IA anticipe les tempêtes, alerte, et agit.", link: "/#solution" },
              { n: "02", Icon: IconBolt, cls: "gold", t: "L'Énergie Sociale : Pulse Credits", d: "Le surplus énergétique est transformé en monnaie d'échange communautaire, créant un lien économique réel entre voisins d'un quartier.", link: "/pro" },
              { n: "03", Icon: IconSatellite, cls: "blue", t: "Local First : 58 Wilayas", d: "Algorithmes calibrés sur 9 ans de données NASA réelles. Conçu spécifiquement pour l'Algérie (climat, financement local), pas adapté d'ailleurs.", link: "/simulateur" },
              { n: "04", Icon: IconDocument, cls: "green", t: "Zéro Friction : All-in-One", d: "Un seul outil pour tout le parcours : Simuler, Financer, Installer, Monitorer, Partager. L'utilisateur ne quitte jamais l'écosystème.", link: "/simulateur" },
            ]
              .map((p, i) => (
                <a href={p.link} className={`pillar-card reveal reveal-delay-${i + 1}`} key={i} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <span className="pillar-number">{p.n}</span>
                  <div className={`pillar-icon ${p.cls}`}><p.Icon size={26} color={p.cls === "orange" ? "#ff8811" : p.cls === "blue" ? "#1E3A5F" : p.cls === "green" ? "#16a34a" : "#d97706"} /></div>
                  <h3 className="pillar-title">{p.t}</h3>
                  <p className="pillar-desc">{p.d}</p>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process">
        <div className="container">
          <div className="process-header reveal" style={{ textAlign: "center" }}>
            <span className="t-label">Prêt en 3 étapes</span>
            <h2 className="t-display">Comment rejoindre le réseau Pulse.dz</h2>
          </div>
          <div className="process-grid reveal">
            {[
              { Icon: IconMeter, t: "Simulation", d: "Entrez votre consommation et découvrez vos gains réels en 60 secondes." },
              { Icon: IconShield, t: "Installation", d: "Nos experts certifiés installent votre kit et le Pulse Bridge en moins d'une semaine." },
              { Icon: IconBrain, t: "Optimisation", d: "L'IA Sirocco-Shield prend le relais pour maximiser votre production chaque jour." },
            ].map((s, i) => (
              <div className="process-step" key={i}>
                <div className="process-icon-wrapper"><s.Icon size={32} color="var(--orange)" /></div>
                <h3 className="process-step-title">{s.t}</h3>
                <p className="process-step-desc">{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-xl)" }} className="reveal">
            <a href="/simulateur" style={{ color: "var(--blue)", fontWeight: "600", textDecoration: "underline" }}>Lancer la simulation →</a>
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM (MODULE E) ===== */}
      <section className="ecosystem" style={{ padding: "8rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="ecosystem-header reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="t-label">Les 5 Acteurs Modulaires</span>
            <h2 className="t-display">L'Écosystème Pulse en action.</h2>
            <p className="t-subheading" style={{ margin: "1rem auto 0", maxWidth: "700px", color: "var(--text-secondary)" }}>
              Pulse.dz ne connecte pas seulement des panneaux au réseau. Il connecte des objectifs économiques individuels pour créer une infrastructure nationale résiliente.
            </p>
          </div>
          <div className="ecosystem-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { Icon: IconSun, title: "Propriétaire (B2C)", desc: "Particulier ou PME avec un toit. Objectif : Réduire sa facture, sécuriser son approvisionnement et rentabiliser son toit via les Pulse Credits." },
              { Icon: IconShield, title: "Installateur (B2B)", desc: "Professionnel certifié. Objectif : Recevoir des chantiers pré-validés, sourcer du matériel de qualité, et développer son chiffre d'affaires." },
              { Icon: IconWind, title: "Agent de Nettoyage", desc: "Partenaire de proximité. Objectif : Gagner un revenu complémentaire grâce aux missions de nettoyage déclenchées par l'IA après les tempêtes." },
              { Icon: IconWallet, title: "Banque Partenaire", desc: "BNA, BEA, Badr. Objectif : Traiter et financer des dossiers solaires pré-formatés, rentables et conformes aux dispositifs de la LF 2026." },
              { Icon: IconSatellite, title: "Sonelgaz", desc: "Gestionnaire du réseau national. Objectif : Accéder aux données macroscopiques pour équilibrer la grille et lisser les pics de demande estivale." },
            ].map((actor, i) => (
              <div className="ecosystem-card" key={i} style={{ backgroundColor: "#fff", padding: "32px 24px", borderRadius: "24px", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.02)" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(30, 58, 95, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <actor.Icon size={24} color="var(--blue)" />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontFamily: "var(--font-display)", marginBottom: "12px", color: "var(--text)" }}>{actor.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{actor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PULSE CREDITS & EV CHARGING (MODULE E) ===== */}
      <section className="pulse-credits" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div className="reveal">
              <span className="t-label">Pulse Credits & Partage Légal</span>
              <h2 className="t-display" style={{ margin: "1rem 0" }}>Monétisez votre surplus, sans enfreindre la loi.</h2>
              <p className="t-subheading" style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Revendre de l'électricité à ses voisins via une batterie de rue est interdit (Loi 02-01 limitant la distribution à Sonelgaz). Pulse résout ce blocage par une approche 100% légale.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ padding: "24px", backgroundColor: "#fef2f2", borderRadius: "16px", borderLeft: "4px solid #ef4444" }}>
                  <h4 style={{ fontSize: "1.1rem", fontFamily: "var(--font-bold)", color: "#991b1b", marginBottom: "8px" }}>L'Illusion : La Batterie de Rue</h4>
                  <p style={{ fontSize: "0.95rem", color: "#b91c1c", lineHeight: 1.5 }}>Stocker et revendre de l'énergie entre foyers fait de vous un mini-distributeur. C'est juridiquement risqué sans concession d'État.</p>
                </div>
                <div style={{ padding: "24px", backgroundColor: "#f0fdf4", borderRadius: "16px", borderLeft: "4px solid var(--green)" }}>
                  <h4 style={{ fontSize: "1.1rem", fontFamily: "var(--font-bold)", color: "#166534", marginBottom: "8px" }}>La Solution Pulse : Bornes de Recharge (EV)</h4>
                  <p style={{ fontSize: "0.95rem", color: "#15803d", lineHeight: 1.5 }}>Le surplus alimente des bornes de recharge pour véhicules électriques dans la rue. Ce n'est plus de la distribution, mais de l'autoconsommation matérielle étendue. Vous gagnez des <strong>Pulse Credits</strong> pour chaque kWh rechargé, utilisables dans notre marketplace.</p>
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
              <div style={{ background: "linear-gradient(135deg, var(--blue), #112a4d)", height: "500px", borderRadius: "32px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(255, 136, 17, 0.1)", border: "2px solid var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px", zIndex: 2 }}>
                  <IconBolt size={40} color="var(--orange)" />
                </div>

                {/* Visual connecting lines */}
                <svg width="100%" height="150" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 1, opacity: 0.3 }}>
                  <path d="M 50 75 Q 150 0 250 75 T 450 75" fill="none" stroke="var(--orange)" strokeWidth="2" strokeDasharray="6 6" className="animated-path" />
                </svg>

                <div style={{ display: "flex", gap: "20px", zIndex: 2, width: "100%", justifyContent: "space-between" }}>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "20px", flex: 1, textAlign: "center", backdropFilter: "blur(10px)" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Surplus Toit</div>
                    <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-bold)", color: "#fff" }}>+ 4.2 kW</div>
                  </div>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "20px", flex: 1, textAlign: "center", backdropFilter: "blur(10px)" }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Achat Recharges</div>
                    <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-bold)", color: "var(--green)" }}>+ 1,240 Pc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ===== APP PREVIEW ===== */}
      <section className="app-preview" id="apercu">
        <div className="container">
          <div className="app-preview-header reveal">
            <span className="t-label">Aperçu de l'application</span>
            <h2 className="t-display">3 écrans qui changent votre rapport à l'énergie.</h2>
          </div>
          <div className="app-preview-track reveal">
            {/* Phone 1 — Economies */}
            <div>
              <div className="app-preview-phone">
                <img src="/screen1.png" alt="Économies et Pulse Credits" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='440' style='background:%23eee'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23999'>screen1.png</text></svg>" }} />
              </div>
              <div className="app-preview-phone-label">Factures réduites & Pulse Credits</div>
            </div>
            {/* Phone 2 — Map */}
            <div>
              <div className="app-preview-phone">
                <img src="/screen2.png" alt="Carte de précision" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='440' style='background:%23333'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23999'>screen2.png</text></svg>" }} />
              </div>
              <div className="app-preview-phone-label">Localisation ultra-précise</div>
            </div>
            {/* Phone 3 — Dashboard */}
            <div>
              <div className="app-preview-phone">
                <img src="/screen3.png" alt="Dashboard Actif" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='440' style='background:%23dfd8c8'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23666'>screen3.png</text></svg>" }} />
              </div>
              <div className="app-preview-phone-label">Dashboard Complet</div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== FAQ ===== */}
      <section className="faq">
        <div className="container">
          <div className="faq-header reveal">
            <span className="t-label">Des questions ?</span>
            <h2 className="t-display">Foire Aux Questions</h2>
          </div>
          <div className="faq-grid reveal">
            {[
              { q: "Est-ce légal de poser des panneaux en Algérie ?", a: "Oui, c'est totalement légal. Pulse.dz contourne les contraintes avec des mécanismes légaux existants et assure la conformité de votre installation pour une autoconsommation optimale." },
              { q: "Comment fonctionne le financement ?", a: "Pulse.dz génère automatiquement votre dossier de financement complet, intégrant les réductions de la LF 2026. Le dossier est prêt à déposer auprès de nos banques partenaires (BNA, BEA, Badr). L'installation se rembourse d'elle-même : la mensualité est inférieure aux économies mensuelles générées." },
              { q: "Que se passe-t-il pendant les tempêtes de sable ?", a: "Sirocco-Shield vous alerte 24h à 48h avant l'impact avec la perte estimée en DA. Après la tempête, le ML model mesure le gap de performance exact et vous propose un nettoyage si la perte dépasse 150 DA/jour." },
              { q: "Quelle est la durée de vie des panneaux ?", a: "Les panneaux sélectionnés par Pulse sont garantis 25 ans. Le Pulse Bridge mesure en temps réel votre production et l'IA Sirocco-Shield assure une surveillance constante pour prévenir toute panne." },
            ].map((f, i) => (
              <div className={`faq-item ${activeFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{f.q}</span>
                  <IconChevronDown size={20} className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UNIQUE APP PROMOTION CARD ===== */}
      <section className="app-promo" id="apercu" style={{ padding: "120px 0", background: "var(--cream)", position: "relative", overflow: "hidden" }}>

        {/* Abstract Background Shapes */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", background: "var(--orange-glow)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.2 }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "500px", height: "500px", background: "rgba(30,58,95,0.03)", borderRadius: "50%", filter: "blur(100px)", opacity: 0.4 }} />

        <div className="container" style={{ maxWidth: "1100px", position: "relative", zIndex: 10 }}>
          <div className="reveal visible" style={{
            background: "white",
            borderRadius: "56px",
            padding: "100px 80px",
            boxShadow: "0 60px 100px rgba(20, 41, 66, 0.12), 0 20px 40px rgba(20, 41, 66, 0.08)",
            border: "1px solid rgba(20, 41, 66, 0.03)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ position: "relative", zIndex: 2, maxWidth: "750px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "8px 24px", background: "rgba(30,58,95,0.04)", borderRadius: "100px", marginBottom: "40px", border: "1px solid rgba(30,58,95,0.05)" }}>
                <div className="hero-eyebrow-dot" style={{ background: "var(--blue)" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--blue)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Intelligence Portative</span>
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--blue-dark)", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "40px" }}>
                Votre centrale solaire, <br /><em style={{ fontStyle: "italic" }}>rediffusée</em> dans votre poche.
              </h2>

              <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "56px", opacity: 0.8 }}>
                L'application Pulse.dz transforme les données brutes de votre toit en décisions intelligentes. Monitoring 24/7, alertes IA Sirocco-Shield, Pulse Credits et financement bancaire intégré.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", opacity: 0.9 }}>
                <a href="#" className="btn-primary" style={{ background: "var(--blue-dark)", padding: "18px 36px", boxShadow: "0 20px 40px rgba(20,41,66,0.15)", borderRadius: "100px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <IconApple size={20} /> App Store
                </a>
                <a href="#" className="btn-secondary" style={{ padding: "18px 36px", borderColor: "rgba(30,58,95,0.15)", color: "var(--blue-dark)", borderRadius: "100px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <IconPlayStore size={20} /> Play Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes auroraSlow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(2%, 3%) scale(1.05); }
          100% { transform: translate(-1%, -2%) scale(0.98); }
        }
      `}</style>

    </>
  );
}
