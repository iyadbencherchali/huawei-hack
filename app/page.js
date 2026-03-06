"use client";
import { useState, useEffect } from "react";
import {
  IconArrowRight, IconShield, IconWind, IconMeter, IconWallet, IconClock,
  IconSatellite, IconBolt, IconDocument, IconBrain, IconCreditCard,
  IconBell, IconLightbulb, IconTrendDown, IconSun, IconChevronDown
} from "./components/Icons";

export default function Home() {
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
              <span>Système d&apos;Orchestration Énergétique</span>
            </div>
            <h1 className="t-display hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: "1.05", fontWeight: "500" }}>Votre toit peut <em>produire</em> votre énergie.</h1>
            <p className="t-subheading hero-subtitle">
              Pulse.dz est le cerveau énergétique de votre maison. Prédisez les tempêtes, optimisez vos appareils et injectez votre surplus intelligemment dans le réseau algérien.
            </p>
            <div className="hero-actions">
              <a href="/simulation" className="btn-primary">
                Simuler gratuitement <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </a>
              <a href="/docs" className="btn-secondary">
                Read Docs
              </a>
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
          <div className="proof-item"><div className="proof-value">3,900<span>h</span></div><div className="proof-label">d&apos;ensoleillement / an (Max Algérie)</div></div>
          <div className="proof-item"><div className="proof-value">40<span>%</span></div><div className="proof-label">de rendement perdu sans nettoyage</div></div>
          <div className="proof-item"><div className="proof-value">0<span> DA</span></div><div className="proof-label">d&apos;apport initial (Financement)</div></div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="partners">
        <div className="container partners-inner reveal">
          <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Sonelgaz</div>
          <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> BNA</div>
          <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> Huawei Solaire</div>
          <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> ANIREF</div>
          <div className="partner-logo"><span style={{ color: "var(--orange)" }}>●</span> APRUE</div>
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
              { Icon: IconWind, cls: "sand", title: "Le Sirocco détruit vos rendements", desc: "Les tempêtes de sable réduisent l'efficacité de vos panneaux jusqu'à 40% sans que vous ne le voyiez. On prédit le danger 24h avant.", sol: "Alerte de nettoyage prédictive" },
              { Icon: IconMeter, cls: "meter", title: "Compteurs aveugles de Sonelgaz", desc: "Les compteurs actuels ne mesurent pas votre production solaire. Votre surplus est invisible, gaspillé et perdu pour le réseau.", sol: "Pulse Bridge : Lecture en temps réel" },
              { Icon: IconWallet, cls: "money", title: "Coût d'entrée prohibitif", desc: "L'investissement initial reste le premier frein en Algérie — les solutions de financement classiques ne sont pas adaptées au solaire.", sol: "Dossier bancaire 0 apport automatisé" },
              { Icon: IconClock, cls: "clock", title: "Décalage production / consommation", desc: "Vous produisez à midi quand vous êtes au travail, mais vous consommez le soir. L'énergie gratuite n'est jamais là quand on en a besoin.", sol: "IA d'orchestration de la consommation" },
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
            <span className="t-label">L&apos;application Pulse.dz</span>
            <h2 className="t-display">Votre centrale solaire, dans votre poche.</h2>
            <p className="t-subheading">Production en temps réel, alertes intelligentes, financement intégré et optimisation IA — tout dans une seule application.</p>
            <div className="showcase-features">
              {[
                { Icon: IconSatellite, t: "Bridge sans modification", d: "Un capteur intelligent qui se fixe simplement sur votre compteur actuel pour lire vos flux d'énergie seconde par seconde." },
                { Icon: IconBrain, t: "Orchestration Intelligente", d: "L'IA vous dit quand lancer votre climatiseur, lave-linge ou pompe à eau pour utiliser votre propre énergie gratuite." },
                { Icon: IconCreditCard, t: "Crédits Énergétiques", d: "Chaque surplus injecté est comptabilisé. Gagnez des crédits pour réduire drastiquement vos prochaines factures Sonelgaz." },
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
                  <div><div className="phone-greeting">Pulse Board</div><div className="phone-title" style={{ fontSize: "0.85rem" }}>Production Mensuelle</div></div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", marginBottom: "4px" }}>kWh produits</div>
                <div className="showcase-graph-area">
                  <div className="showcase-graph-bars">{[1, 2, 3, 4, 5, 6, 7].map((b) => <div className="graph-bar" key={b} />)}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"].map((m) => <span key={m} style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.25)" }}>{m}</span>)}
                </div>
                <div className="phone-mini-cards" style={{ marginTop: "10px" }}>
                  <div className="phone-mini-card"><div className="phone-mini-label">Ce mois</div><div className="phone-mini-value green">312 kWh</div></div>
                  <div className="phone-mini-card"><div className="phone-mini-label">Économies</div><div className="phone-mini-value amber">8,400 DA</div></div>
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
              { n: "01", Icon: IconShield, cls: "orange", t: "Sirocco-Shield", d: "Notre IA croise les images Copernicus et la météo locale pour prédire les tempêtes 24h à l'avance et notifier le moment idéal pour un nettoyage.", link: "/docs#sirocco" },
              { n: "02", Icon: IconSatellite, cls: "blue", t: "Pulse Bridge IoT", d: "Se fixe sur votre compteur existant (sans le remplacer). Utilise le réseau LoRaWAN pour transmettre vos données même sans Wi-Fi.", link: "/docs#bridge" },
              { n: "03", Icon: IconDocument, cls: "green", t: "Dossier Green Sukuk", d: "Génère instantanément votre dossier Mourabaha. 0 DA d'apport, remboursé par vos propres économies d'énergie.", link: "/docs#financement" },
              { n: "04", Icon: IconBolt, cls: "gold", t: "Réseau Pulse Pro", d: "Communauté d'installateurs et d'agents de nettoyage certifiés. On s'occupe de tout, du financement à l'entretien.", link: "/pro" },
            ].map((p, i) => (
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
            <a href="/docs" style={{ color: "var(--blue)", fontWeight: "600", textDecoration: "underline" }}>Read Docs →</a>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="mission" style={{ background: "var(--blue)", color: "white", padding: "var(--space-3xl) 0", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="reveal" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span className="t-label" style={{ color: "var(--orange-light)" }}>Notre Vision</span>
            <h2 className="t-display" style={{ color: "white", marginBottom: "var(--space-lg)" }}>Le maillon manquant de l&apos;énergie solaire en Algérie.</h2>
            <p className="t-subheading" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.25rem", lineHeight: "1.6" }}>
              Le soleil est là, la technologie existe, mais quatre obstacles bloquaient l&apos;adoption : le sable, les compteurs aveugles, le coût initial et le décalage horaire production/consommation.
            </p>
            <div style={{ marginTop: "var(--space-xl)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", textAlign: "left" }}>
              <div className="reveal reveal-delay-1">
                <h4 style={{ color: "var(--orange-light)", marginBottom: "0.5rem" }}>Intelligence Locale</h4>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}>Un cerveau domotique conçu pour la réalité algérienne, pas un produit copié d&apos;ailleurs.</p>
              </div>
              <div className="reveal reveal-delay-2">
                <h4 style={{ color: "var(--orange-light)", marginBottom: "0.5rem" }}>0 Apport Initial</h4>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}>Démocratiser le solaire avec un financement bancaire remboursé par vos propres économies.</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "-100px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse at center, rgba(255,136,17,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      </section>

      <hr className="section-divider" />

      {/* ===== APP PREVIEW ===== */}
      <section className="app-preview" id="apercu">
        <div className="container">
          <div className="app-preview-header reveal">
            <span className="t-label">Aperçu de l&apos;application</span>
            <h2 className="t-display">3 écrans qui changent votre rapport à l&apos;énergie.</h2>
          </div>
          <div className="app-preview-track reveal">
            {/* Phone 1 — Simulator */}
            <div>
              <div className="app-preview-phone">
                <div className="app-preview-screen preview-screen-light">
                  <div style={{ fontSize: "0.55rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "8px" }}>Simulateur Solaire</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--blue)", marginBottom: "8px" }}>Votre potentiel</div>
                  <div style={{ background: "var(--white)", borderRadius: "14px", padding: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: "0.5rem", color: "var(--text-muted)", marginBottom: "4px" }}>Économies annuelles</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--orange)" }}>86,400 DA</div>
                    <div style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>soit 7,200 DA / mois</div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                    <div style={{ flex: 1, background: "var(--orange-glow)", borderRadius: "10px", padding: "8px", textAlign: "center" }}><div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--orange)" }}>3.5</div><div style={{ fontSize: "0.45rem", color: "var(--text-muted)" }}>kWc</div></div>
                    <div style={{ flex: 1, background: "rgba(30,58,95,0.04)", borderRadius: "10px", padding: "8px", textAlign: "center" }}><div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--blue)" }}>22m²</div><div style={{ fontSize: "0.45rem", color: "var(--text-muted)" }}>surface</div></div>
                    <div style={{ flex: 1, background: "rgba(74,222,128,0.08)", borderRadius: "10px", padding: "8px", textAlign: "center" }}><div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#16a34a" }}>3.2a</div><div style={{ fontSize: "0.45rem", color: "var(--text-muted)" }}>ROI</div></div>
                  </div>
                </div>
              </div>
              <div className="app-preview-phone-label">Simulateur</div>
            </div>
            {/* Phone 2 — Dashboard (center, featured) */}
            <div>
              <div className="app-preview-phone">
                <div className="app-preview-screen preview-screen-dark">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                    <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)" }}>Bonjour, Amine</div>
                    <IconBell size={12} color="rgba(255,255,255,0.4)" />
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "white", fontWeight: 600 }}>Votre Énergie</div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "14px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Production</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#ff8811", lineHeight: 1 }}>3.2<span style={{ fontSize: "0.9rem", fontWeight: 400 }}> kW</span></div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", marginTop: "10px" }}><div style={{ height: "100%", width: "78%", background: "linear-gradient(90deg, #ff8811, #ffa94d)", borderRadius: "2px" }} /></div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "10px" }}><div style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Batterie</div><div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#4ade80" }}>87%</div></div>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "10px" }}><div style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Crédits</div><div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffa94d" }}>+124</div></div>
                  </div>
                  <div style={{ background: "rgba(255,136,17,0.1)", borderRadius: "12px", padding: "10px", border: "1px solid rgba(255,136,17,0.1)", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                    <IconLightbulb size={12} color="#ff8811" />
                    <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Lancez vos appareils maintenant pour maximiser l&apos;autoconsommation.</div>
                  </div>
                </div>
              </div>
              <div className="app-preview-phone-label">Dashboard</div>
            </div>
            {/* Phone 3 — Marketplace */}
            <div>
              <div className="app-preview-phone">
                <div className="app-preview-screen preview-screen-sand">
                  <div style={{ fontSize: "0.55rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "8px" }}>Marketplace</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--blue)", marginBottom: "6px" }}>Services</div>
                  <div style={{ background: "rgba(255,136,17,0.08)", borderRadius: "12px", padding: "10px", border: "1px solid rgba(255,136,17,0.1)", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><IconWind size={14} color="#ff8811" /><div style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--orange)" }}>Alerte nettoyage</div></div>
                    <div style={{ fontSize: "0.5rem", color: "var(--text-secondary)", marginTop: "4px" }}>Perte de 28% — 420 DA/jour</div>
                  </div>
                  {["Karim D. — ★ 4.9 — 2 km", "Ali S. — ★ 4.7 — 3.1 km"].map((a, i) => (
                    <div key={i} style={{ background: "var(--white)", borderRadius: "10px", padding: "8px", marginBottom: "6px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#1E3A5F,#2a5080)" : "linear-gradient(135deg,#16a34a,#4ade80)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6rem", fontWeight: 700 }}>{a[0]}</div>
                      <div><div style={{ fontSize: "0.55rem", fontWeight: 600, color: "var(--blue)" }}>{a.split(" — ")[0]}</div><div style={{ fontSize: "0.45rem", color: "var(--text-muted)" }}>{a.split(" — ").slice(1).join(" · ")}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="app-preview-phone-label">Marketplace</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials" id="temoignages">
        <div className="container">
          <div className="testimonials-header reveal">
            <span className="t-label">Ils ont fait le pas</span>
            <h2 className="t-display">Des Algériens parlent de leurs économies.</h2>
          </div>
          <div className="testimonials-layout">
            <div className="testimonial-featured reveal">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">En 3 mois, ma facture Sonelgaz est passée de 8 000 DA à 4 200 DA. Le jour de la tempête de sable, j&apos;ai reçu l&apos;alerte 18 heures avant. Pulse.dz m&apos;a convaincu que le solaire, c&apos;est sérieux.</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <div className="testimonial-author-name">Amine B.</div>
                  <div className="testimonial-author-location">Blida — Villa individuelle</div>
                  <div className="testimonial-saving"><IconTrendDown size={14} color="#16a34a" /> 3 800 DA/mois économisés</div>
                </div>
              </div>
            </div>
            <div className="testimonials-side">
              {[
                { text: "Le dossier Mourabaha était prêt en 10 minutes. La BNA l'a accepté en une semaine. Je n'ai rien avancé.", name: "Sara M.", loc: "Oran", initial: "S", bg: "linear-gradient(135deg, var(--orange), var(--orange-light))" },
                { text: "En tant qu'installateur, Pulse.dz m'envoie des clients qualifiés. Ils ont déjà simulé et financé — je n'ai plus qu'à poser.", name: "Karim D.", loc: "Installateur — Alger", initial: "K", bg: "linear-gradient(135deg, #1E3A5F, #2a5080)" },
                { text: "Je suis agent de nettoyage Pulse. 3 à 5 interventions par semaine, payé rapidement. C'est un vrai métier.", name: "Youcef T.", loc: "Agent — Ghardaïa", initial: "Y", bg: "linear-gradient(135deg, #16a34a, #4ade80)" },
              ].map((t, i) => (
                <div className={`testimonial-small reveal reveal-delay-${i + 1}`} key={i}>
                  <p className="testimonial-small-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" style={{ width: 36, height: 36, fontSize: "0.8rem", background: t.bg }}>{t.initial}</div>
                    <div><div className="testimonial-author-name" style={{ fontSize: "0.85rem" }}>{t.name}</div><div className="testimonial-author-location">{t.loc}</div></div>
                  </div>
                </div>
              ))}
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
              { q: "Est-ce légal de poser des panneaux en Algérie ?", a: "Oui, c'est totalement légal. Pulse.dz assure la conformité de votre installation avec les normes de Sonelgaz pour une injection sécurisée ou une autoconsommation totale." },
              { q: "Comment fonctionne le financement Mourabaha ?", a: "Nous préparons votre dossier Green Sukuk. Une banque partenaire (comme la BNA) finance l'équipement à 0 DA d'apport, et vous remboursez via vos économies d'énergie." },
              { q: "Que se passe-t-il pendant les tempêtes de sable ?", a: "Notre technologie Sirocco-Shield vous alerte 48h avant. L'application vous propose alors un nettoyage certifié pour éviter une perte de rendement de 40%." },
              { q: "Quelle est la durée de vie des panneaux ?", a: "Les panneaux sélectionnés par Pulse sont garantis 25 ans. Le Pulse Bridge et les onduleurs intelligents assurent une surveillance constante pour prévenir toute panne." },
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



    </>
  );
}
