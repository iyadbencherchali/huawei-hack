"use client";
import { useState, useEffect } from "react";
import {
  IconArrowRight, IconShield, IconWind, IconMeter, IconWallet, IconClock,
  IconSatellite, IconBolt, IconDocument, IconBrain, IconCreditCard,
  IconBell, IconLightbulb, IconTrendDown, IconSun, IconChevronDown
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
              Pulse.dz calcule votre potentiel solaire en 60 secondes, organise votre financement, et optimise votre production au quotidien grâce à l'IA.
            </p>
            <div className="hero-actions">
              <a href="/simulateur" className="btn-primary">
                Faites le test (60s) <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </a>
              <a href="/comment-ca-marche" className="btn-secondary">
                Comment ça marche
              </a>
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-value">12<span>,</span>400<span>+</span></div><div className="hero-stat-label">Simulations effectuées</div></div>
              <div><div className="hero-stat-value">48 <span>wilayas</span></div><div className="hero-stat-label">Couvertes en Algérie</div></div>
              <div><div className="hero-stat-value">2.8<span>M DA</span></div><div className="hero-stat-label">Économies générées</div></div>
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
              { Icon: IconWind, cls: "sand", title: "Le Sirocco détruit vos rendements", desc: "Les tempêtes de sable réduisent l'efficacité de vos panneaux jusqu'à 40%. Sans alerte, vous perdez de l'argent sans le savoir.", sol: "Sirocco-Shield IA prédit et alerte" },
              { Icon: IconMeter, cls: "meter", title: "Compteurs aveugles de Sonelgaz", desc: "Les compteurs actuels ne mesurent pas la production solaire. Votre surplus est invisible et perdu.", sol: "Pulse Bridge lit tout sans modification" },
              { Icon: IconWallet, cls: "money", title: "Coût d'entrée prohibitif", desc: "L'investissement initial est trop élevé pour la majorité des foyers algériens — aucune banque ne propose un produit adapté.", sol: "Financement Mourabaha 0 apport" },
              { Icon: IconClock, cls: "clock", title: "Décalage production / consommation", desc: "Vous produisez à midi quand personne n'est là. Vous consommez le soir quand le soleil disparaît.", sol: "L'IA optimise vos usages en temps réel" },
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
                { Icon: IconSatellite, t: "Monitoring en temps réel", d: "Production, consommation et batteries — visibles à chaque instant via le Pulse Bridge." },
                { Icon: IconBrain, t: "IA prédictive Sirocco-Shield", d: "Anticipe les tempêtes de sable 48h à l'avance et protège votre investissement." },
                { Icon: IconCreditCard, t: "Financement automatisé", d: "Dossier Mourabaha généré en 5 minutes, prêt pour dépôt en agence." },
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
              { n: "01", Icon: IconShield, cls: "orange", t: "Sirocco-Shield", d: "IA de prédiction des tempêtes de sable. Croise images satellites Copernicus, météo locale et données de luminosité du réseau Pulse pour alerter 48h à l'avance.", link: "/#solution" },
              { n: "02", Icon: IconSatellite, cls: "blue", t: "Pulse Bridge IoT", d: "Capteur non-invasif qui se fixe sur votre compteur Sonelgaz. Transmission LoRaWAN — fonctionne sans Wi-Fi ni 4G, portée de 5 à 40 km.", link: "/#solution" },
              { n: "03", Icon: IconDocument, cls: "green", t: "Green Sukuk", d: "Générateur automatique de dossiers Mourabaha. Scan OCR de la facture, simulation financière, export PDF prêt pour dépôt bancaire en 5 minutes.", link: "/comment-ca-marche" },
              { n: "04", Icon: IconBolt, cls: "gold", t: "Réseau Pulse Pro", d: "Notre communauté d'installateurs premium et agents de nettoyage certifiés. On s'occupe de tout, du financement à l'installation.", link: "/pro" },
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
            <a href="/comment-ca-marche" style={{ color: "var(--blue)", fontWeight: "600", textDecoration: "underline" }}>Voir le processus détaillé →</a>
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
                    <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Lancez vos appareils maintenant pour maximiser l'autoconsommation.</div>
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
              <p className="testimonial-text">En 3 mois, ma facture Sonelgaz est passée de 8 000 DA à 4 200 DA. Le jour de la tempête de sable, j'ai reçu l'alerte 18 heures avant. Pulse.dz m'a convaincu que le solaire, c'est sérieux.</p>
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

      <hr className="section-divider" />

      {/* ===== CTA + SIMULATOR ===== */}
      <section className="cta-section" id="simuler">
        <div className="container">
          <div className="cta-card">
            <h2 className="t-display">Combien votre toit peut-il vous faire économiser&nbsp;?</h2>
            <p className="t-subheading">Entrez votre facture et votre wilaya — résultat instantané, 100% gratuit.</p>
            <form className="cta-simulator" onSubmit={handleSimulate}>
              <div className="cta-simulator-row">
                <div className="cta-input-group">
                  <label className="cta-input-label">Facture moyenne (DA / mois)</label>
                  <input
                    type="number"
                    className="cta-input"
                    placeholder="Ex: 6000"
                    value={facture}
                    onChange={(e) => setFacture(e.target.value)}
                    required
                  />
                </div>
                <div className="cta-input-group">
                  <label className="cta-input-label">Votre Wilaya</label>
                  <select
                    className="cta-input"
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    required
                    style={{ appearance: "none", cursor: "pointer" }}
                  >
                    <option value="" disabled>Sélectionner...</option>
                    <option value="Nord">Nord (Alger, Oran, Constantine...)</option>
                    <option value="Hauts Plateaux">Hauts Plateaux (Sétif, Tiaret...)</option>
                    <option value="Sud">Sud (Adrar, Ghardaïa, Ouargla...)</option>
                  </select>
                </div>
                <div className="cta-input-group">
                  <button type="submit" className="btn-primary" style={{ height: "54px", width: "100%", justifyContent: "center" }}>
                    Calculer mes économies <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
                  </button>
                </div>
              </div>
              {simResult && (
                <div className="cta-result reveal visible">
                  <div className="cta-result-label">Économie annuelle estimée</div>
                  <div className="cta-result-value">{simResult.toLocaleString("fr-FR")} DA / an</div>
                  <div className="cta-result-sub">
                    Basé sur l'ensoleillement moyen de votre région. Pour un dossier complet, <a href="/simulateur" style={{ color: "var(--orange)", fontWeight: "600", textDecoration: "underline" }}>utilisez le simulateur avancé</a>.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

    </>
  );
}
