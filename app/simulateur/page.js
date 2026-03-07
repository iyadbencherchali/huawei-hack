"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { IconArrowRight, IconBolt, IconShield, IconSun, IconWallet, IconDocument, IconTarget, IconWind, IconMeter, IconCreditCard } from "../components/Icons";

const LocationMap = dynamic(() => import("../components/LocationMap"), { ssr: false });

export default function Simulator() {
    const [step, setStep] = useState(1);

    // Form Inputs
    const [region, setRegion] = useState("nord");
    const [exactProvince, setExactProvince] = useState("");
    const [surface, setSurface] = useState("50");
    const [orientation, setOrientation] = useState("sud");
    const [inclinaison, setInclinaison] = useState("incline");
    const [annualBill, setAnnualBill] = useState("60000");
    const [semesterConsumption, setSemesterConsumption] = useState("3000");
    const [objectif, setObjectif] = useState("optimal");
    const [isLoading, setIsLoading] = useState(false);

    // Results
    const [results, setResults] = useState(null);

    const STEP_LABELS = [
        { id: 1, name: "Lieu" },
        { id: 2, name: "Toit" },
        { id: 3, name: "Conso" },
        { id: 4, name: "Objectif" },
        { id: 5, name: "Résultat" },
    ];

    const OBJECTIFS = [
        { id: "eco30", label: "Réduire -30%", desc: "Réduction modérée de la facture", icon: "💡", factor: 0.3 },
        { id: "eco50", label: "Réduire -50%", desc: "Couper la facture en deux", icon: "⚡", factor: 0.5 },
        { id: "eco70", label: "Réduire -70%", desc: "Quasi-autonomie énergétique", icon: "🔋", factor: 0.7 },
        { id: "autonome", label: "Être autonome", desc: "Indépendance énergétique maximale", icon: "🏠", factor: 0.85 },
        { id: "optimal", label: "Optimiser le ROI", desc: "Meilleur retour sur investissement", icon: "📈", factor: 0.55 },
        { id: "partage", label: "Anticiper le partage", desc: "Préparer les Pulse Credits & bornes VE", icon: "🤝", factor: 0.6 },
    ];

    const runSimulation = () => {
        setIsLoading(true);
        setTimeout(() => {
            const area = parseFloat(surface) || 50;
            const reg = REGIONS.find(r => r.id === region);
            const ori = ORIENTATIONS.find(o => o.id === orientation);
            const obj = OBJECTIFS.find(o => o.id === objectif);

            // Formule: Surface × Rendement × Heures ensoleillement × Coefficient inclinaison/orientation
            let orientationEff = ori.eff;
            if (inclinaison === "plat") orientationEff = Math.max(0.9, orientationEff);
            const numPanels = Math.floor(area / M2_PER_PANEL);
            const systemKwp = (numPanels * PANEL_WATTAGE) / 1000;
            const actualSurface = numPanels * M2_PER_PANEL;
            const dailyProduction = systemKwp * reg.insol * orientationEff * PANEL_EFFICIENCY;
            const annualProduction = Math.round(dailyProduction * 365);

            // Économies = Consommation actuelle (DA) × Pourcentage couvert par le solaire
            const currentBill = parseFloat(annualBill) || 60000;
            const solarCoverage = Math.min(1, (annualProduction * SONELGAZ_PRICE) / currentBill);
            const annualSavings = Math.round(currentBill * solarCoverage);
            const monthlySavings = Math.round(annualSavings / 12);

            // 3 Kits: Économique, Optimal, Premium — avec réductions LF2026
            const kitEco = Math.round(systemKwp * COST_PER_KWP_ECO * LF2026_REDUCTION);
            const kitOptimal = Math.round(systemKwp * COST_PER_KWP_OPTIMAL * LF2026_REDUCTION);
            const kitPremium = Math.round(systemKwp * COST_PER_KWP_PREMIUM * LF2026_REDUCTION);

            // ROI = Coût ÷ Économies annuelles
            const roiEco = (kitEco / annualSavings).toFixed(1);
            const roiOptimal = (kitOptimal / annualSavings).toFixed(1);
            const roiPremium = (kitPremium / annualSavings).toFixed(1);

            // Mensualités (5 ans / 60 mois)
            const mensualiteEco = Math.round(kitEco / 60);
            const mensualiteOptimal = Math.round(kitOptimal / 60);
            const mensualitePremium = Math.round(kitPremium / 60);

            // CO2 évité (kg/an) — ~0.5 kg CO2 par kWh thermique évité en Algérie
            const co2Avoided = Math.round(annualProduction * 0.5);

            // Courbe mensuelle de production
            const monthlyProd = [
                0.05, 0.06, 0.08, 0.09, 0.11, 0.13,
                0.14, 0.12, 0.09, 0.06, 0.04, 0.03
            ].map(f => Math.round(annualProduction * f));

            const savings25y = annualSavings * 25;

            // Timeline ROI sur 20 ans — cumul des économies vs coût d'installation
            const roiTimeline = Array.from({ length: 21 }, (_, year) => {
                const cumulSavings = annualSavings * year;
                return { year, savings: cumulSavings };
            });
            const breakEvenYear = Math.ceil(parseFloat(roiOptimal));

            setResults({
                systemKwp: systemKwp.toFixed(1),
                numPanels,
                actualSurface,
                annualProduction,
                monthlyProd,
                annualSavings,
                monthlySavings,
                savings25y,
                solarCoverage: Math.round(solarCoverage * 100),
                currentAnnualBill: currentBill,
                co2Avoided,
                kits: [
                    { name: "Économique", price: kitEco, roi: roiEco, mensualite: mensualiteEco, tag: null },
                    { name: "Optimal", price: kitOptimal, roi: roiOptimal, mensualite: mensualiteOptimal, tag: "Recommandé" },
                    { name: "Premium", price: kitPremium, roi: roiPremium, mensualite: mensualitePremium, tag: null },
                ],
                autoRemboursement: mensualiteOptimal < monthlySavings,
                objectifLabel: obj.label,
                roiTimeline,
                breakEvenYear,
                kitOptimalPrice: kitOptimal,
            });

            setIsLoading(false);
            setStep(5);
        }, 1500);
    };

    const shareResults = (platform) => {
        const text = `🌞 Pulse.dz — Mon potentiel solaire\n\n📍 ${exactProvince}\n⚡ Production: ${results.annualProduction.toLocaleString()} kWh/an\n💰 Économies: ${results.annualSavings.toLocaleString()} DA/an\n🌍 CO2 évité: ${results.co2Avoided.toLocaleString()} kg/an\n\nSimulez votre toit → pulse.dz`;
        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        } else {
            // Copy to clipboard for Instagram Stories
            navigator.clipboard.writeText(text).then(() => {
                alert('Résultats copiés ! Collez-les dans votre Story Instagram.');
            });
        }
    };

    // Step progress bar component
    const ProgressBar = () => (
        <div style={{ display: "inline-flex", background: "rgba(30,58,95,0.05)", padding: "4px", borderRadius: "100px", marginBottom: "40px", border: "1px solid rgba(30,58,95,0.02)", flexWrap: "wrap" }}>
            {STEP_LABELS.map((s) => (
                <div key={s.id} style={{
                    padding: "8px 18px",
                    borderRadius: "100px",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: step === s.id ? "var(--blue-dark)" : "transparent",
                    color: step === s.id ? "var(--orange)" : (step > s.id ? "var(--blue-dark)" : "var(--text-muted)"),
                    transition: "all 0.4s var(--ease-out-expo)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    <span style={{ opacity: 0.5, fontSize: "0.55rem" }}>{s.id}.</span> {s.name}
                </div>
            ))}
        </div>
    );

    const BackButton = ({ goTo }) => (
        <button onClick={() => setStep(goTo)} style={{ background: "rgba(30,58,95,0.05)", border: "none", color: "var(--blue-dark)", fontSize: "0.7rem", fontWeight: 800, cursor: "pointer", marginBottom: "32px", padding: "8px 16px", borderRadius: "100px", display: "flex", alignItems: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ← Retour
        </button>
    );

    const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

    return (
        <>
            <div className="simulator-fullscreen" style={{ position: "relative", height: "calc(100vh - 80px)", width: "100vw", overflow: "hidden", background: "#f0f2f5" }}>

                {/* Background Map Layer — always mounted, hidden on results */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, display: step === 5 ? "none" : "block" }}>
                    <LocationMap
                        onSelectRegion={({ province, zoneId }) => {
                            setExactProvince(province);
                            setRegion(zoneId);
                        }}
                    />
                </div>

                {/* Overlays Container */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 50, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>

                    {/* ===== STEP 1: LOCALISATION ===== */}
                    {step === 1 && (
                        <div style={{ position: "absolute", left: "40px", top: "60px", bottom: "40px", width: "100%", maxWidth: "420px", pointerEvents: "auto", display: "flex", flexDirection: "column", animation: "slideRight 0.6s var(--ease-out-expo)" }}>
                            <div className="glass-card" style={{ flex: 1, background: "var(--cream)", backdropFilter: "blur(20px)", padding: "48px", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30, 58, 95, 0.12), 0 0 0 1px rgba(30, 58, 95, 0.03)", overflowY: "auto", border: "1px solid rgba(255, 255, 255, 0.8)" }}>
                                <ProgressBar />
                                <div style={{ width: "48px", height: "48px", background: "var(--blue-dark)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", color: "var(--orange)", boxShadow: "var(--shadow-orange-glow)" }}>
                                    <IconTarget size={24} />
                                </div>
                                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "var(--blue-dark)", marginBottom: "16px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>Où est votre <em>toit</em> ?</h1>
                                <p style={{ color: "var(--text-secondary)", marginBottom: "40px", fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 400 }}>Sélectionnez votre wilaya parmi les 58. Le système charge automatiquement les coefficients d'ensoleillement NASA et le tarif Sonelgaz pour votre zone.</p>

                                <div style={{ background: "rgba(30,58,95,0.04)", padding: "24px", borderRadius: "20px", marginBottom: "40px", border: "1px solid rgba(30,58,95,0.04)" }}>
                                    {exactProvince ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <div className="hero-eyebrow-dot" style={{ background: "var(--orange)" }} />
                                            <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--blue-dark)", fontFamily: "var(--font-body)" }}>{exactProvince}</span>
                                        </div>
                                    ) : (
                                        <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic" }}>Cliquez sur la carte pour sélectionner...</span>
                                    )}
                                </div>

                                <button
                                    disabled={!exactProvince}
                                    onClick={() => setStep(2)}
                                    className="btn-primary"
                                    style={{ width: "100%", padding: "22px", opacity: exactProvince ? 1 : 0.5, fontSize: "1.05rem", letterSpacing: "0.02em" }}
                                >
                                    Configuration du toit <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 2: CONFIGURATION DU TOIT ===== */}
                    {step === 2 && (
                        <div style={{ position: "absolute", left: "40px", top: "60px", bottom: "40px", width: "100%", maxWidth: "420px", pointerEvents: "auto", display: "flex", flexDirection: "column", animation: "slideRight 0.6s var(--ease-out-expo)" }}>
                            <div className="glass-card" style={{ flex: 1, background: "var(--cream)", backdropFilter: "blur(20px)", padding: "48px", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30, 58, 95, 0.12)", overflowY: "auto", border: "1px solid rgba(255, 255, 255, 0.8)" }}>
                                <ProgressBar />
                                <BackButton goTo={1} />
                                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--blue-dark)", marginBottom: "32px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Configuration du <em>toit</em></h2>

                                {/* Surface */}
                                <div style={{ marginBottom: "40px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "baseline" }}>
                                        <label style={{ fontWeight: 600, color: "var(--blue-dark)", fontSize: "1rem", opacity: 0.8 }}>Surface utile</label>
                                        <span style={{ color: "var(--orange)", fontWeight: 800, fontSize: "1.4rem", fontFamily: "var(--font-display)" }}>{surface} m²</span>
                                    </div>
                                    <input
                                        type="range" min="20" max="400" step="10"
                                        value={surface} onChange={(e) => setSurface(e.target.value)}
                                        style={{ width: "100%", accentColor: "var(--orange)" }}
                                    />
                                </div>

                                {/* Orientation */}
                                <div style={{ marginBottom: "40px" }}>
                                    <label style={{ display: "block", fontWeight: 600, marginBottom: "16px", color: "var(--blue-dark)", fontSize: "1rem", opacity: 0.8 }}>Orientation</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                        {ORIENTATIONS.map(o => (
                                            <div
                                                key={o.id}
                                                onClick={() => setOrientation(o.id)}
                                                style={{ padding: "20px 12px", border: `1.5px solid ${orientation === o.id ? "var(--orange)" : "rgba(30,58,95,0.08)"}`, borderRadius: "20px", textAlign: "center", cursor: "pointer", background: orientation === o.id ? "var(--white)" : "rgba(30,58,95,0.02)", transition: "all 0.4s var(--ease-out-expo)", boxShadow: orientation === o.id ? "0 10px 30px rgba(255, 136, 17, 0.15)" : "none" }}
                                            >
                                                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: orientation === o.id ? "var(--orange)" : "var(--blue-dark)" }}>{o.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Type de toiture */}
                                <div style={{ marginBottom: "48px" }}>
                                    <label style={{ display: "block", fontWeight: 600, marginBottom: "16px", color: "var(--blue-dark)", fontSize: "1rem", opacity: 0.8 }}>Type de toiture</label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <div onClick={() => setInclinaison("incline")} style={{ padding: "22px 28px", borderRadius: "24px", border: `1.5px solid ${inclinaison === "incline" ? "var(--orange)" : "rgba(30,58,95,0.08)"}`, background: inclinaison === "incline" ? "var(--white)" : "rgba(30,58,95,0.02)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.4s var(--ease-out-expo)", boxShadow: inclinaison === "incline" ? "0 10px 30px rgba(255, 136, 17, 0.1)" : "none" }}>
                                            <span style={{ fontWeight: 600, color: "var(--blue-dark)", fontSize: "1.05rem" }}>Incliné (Villa)</span>
                                            {inclinaison === "incline" && <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}><IconBolt size={14} color="white" /></div>}
                                        </div>
                                        <div onClick={() => setInclinaison("plat")} style={{ padding: "22px 28px", borderRadius: "24px", border: `1.5px solid ${inclinaison === "plat" ? "var(--orange)" : "rgba(30,58,95,0.08)"}`, background: inclinaison === "plat" ? "var(--white)" : "rgba(30,58,95,0.02)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.4s var(--ease-out-expo)", boxShadow: inclinaison === "plat" ? "0 10px 30px rgba(255, 136, 17, 0.1)" : "none" }}>
                                            <span style={{ fontWeight: 600, color: "var(--blue-dark)", fontSize: "1.05rem" }}>Plat (Terrasse)</span>
                                            {inclinaison === "plat" && <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}><IconBolt size={14} color="white" /></div>}
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => setStep(3)} className="btn-primary" style={{ width: "100%", padding: "22px", fontSize: "1.05rem" }}>
                                    Consommation électrique <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 3: CONSOMMATION ÉLECTRIQUE ===== */}
                    {step === 3 && (
                        <div style={{ position: "absolute", left: "40px", top: "60px", bottom: "40px", width: "100%", maxWidth: "420px", pointerEvents: "auto", display: "flex", flexDirection: "column", animation: "slideRight 0.6s var(--ease-out-expo)" }}>
                            <div className="glass-card" style={{ flex: 1, background: "var(--cream)", backdropFilter: "blur(20px)", padding: "48px", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30, 58, 95, 0.12)", overflowY: "auto", border: "1px solid rgba(255, 255, 255, 0.8)" }}>
                                <ProgressBar />
                                <BackButton goTo={2} />
                                <div style={{ width: "48px", height: "48px", background: "var(--blue-dark)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", color: "var(--orange)" }}>
                                    <IconBolt size={24} />
                                </div>
                                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--blue-dark)", marginBottom: "16px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Votre <em>consommation</em></h2>
                                <p style={{ color: "var(--text-secondary)", marginBottom: "40px", fontSize: "1rem", lineHeight: 1.6 }}>Entrez les montants de votre facture Sonelgaz. Sur l'app mobile, vous pourrez scanner votre facture avec l'OCR intégré.</p>

                                {/* Facture annuelle */}
                                <div style={{ marginBottom: "40px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "baseline" }}>
                                        <label style={{ fontWeight: 600, color: "var(--blue-dark)", fontSize: "1rem", opacity: 0.8 }}>Facture annuelle</label>
                                        <span style={{ color: "var(--orange)", fontWeight: 800, fontSize: "1.4rem", fontFamily: "var(--font-display)" }}>{parseInt(annualBill).toLocaleString()} DA</span>
                                    </div>
                                    <input
                                        type="range" min="10000" max="500000" step="5000"
                                        value={annualBill} onChange={(e) => setAnnualBill(e.target.value)}
                                        style={{ width: "100%", accentColor: "var(--orange)" }}
                                    />
                                </div>

                                {/* Consommation semestre */}
                                <div style={{ marginBottom: "48px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "baseline" }}>
                                        <label style={{ fontWeight: 600, color: "var(--blue-dark)", fontSize: "1rem", opacity: 0.8 }}>Consommation / semestre</label>
                                        <span style={{ color: "var(--orange)", fontWeight: 800, fontSize: "1.4rem", fontFamily: "var(--font-display)" }}>{parseInt(semesterConsumption).toLocaleString()} kWh</span>
                                    </div>
                                    <input
                                        type="range" min="500" max="20000" step="100"
                                        value={semesterConsumption} onChange={(e) => setSemesterConsumption(e.target.value)}
                                        style={{ width: "100%", accentColor: "var(--orange)" }}
                                    />
                                </div>

                                <button onClick={() => setStep(4)} className="btn-primary" style={{ width: "100%", padding: "22px", fontSize: "1.05rem" }}>
                                    Choisir mon objectif <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 4: OBJECTIF ===== */}
                    {step === 4 && (
                        <div style={{ position: "absolute", left: "40px", top: "60px", bottom: "40px", width: "100%", maxWidth: "420px", pointerEvents: "auto", display: "flex", flexDirection: "column", animation: "slideRight 0.6s var(--ease-out-expo)" }}>
                            <div className="glass-card" style={{ flex: 1, background: "var(--cream)", backdropFilter: "blur(20px)", padding: "48px", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30, 58, 95, 0.12)", overflowY: "auto", border: "1px solid rgba(255, 255, 255, 0.8)" }}>
                                <ProgressBar />
                                <BackButton goTo={3} />
                                <div style={{ width: "48px", height: "48px", background: "var(--blue-dark)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", color: "var(--orange)" }}>
                                    <IconTarget size={24} />
                                </div>
                                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--blue-dark)", marginBottom: "16px", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Votre <em>objectif</em></h2>
                                <p style={{ color: "var(--text-secondary)", marginBottom: "40px", fontSize: "1rem", lineHeight: 1.6 }}>Ce choix influence le dimensionnement recommandé et la sélection des kits.</p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
                                    {OBJECTIFS.map(o => (
                                        <div
                                            key={o.id}
                                            onClick={() => setObjectif(o.id)}
                                            style={{
                                                padding: "24px 28px",
                                                borderRadius: "24px",
                                                border: `1.5px solid ${objectif === o.id ? "var(--orange)" : "rgba(30,58,95,0.08)"}`,
                                                background: objectif === o.id ? "var(--white)" : "rgba(30,58,95,0.02)",
                                                cursor: "pointer",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                transition: "all 0.4s var(--ease-out-expo)",
                                                boxShadow: objectif === o.id ? "0 10px 30px rgba(255, 136, 17, 0.1)" : "none"
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 700, color: objectif === o.id ? "var(--orange)" : "var(--blue-dark)", fontSize: "1.1rem", marginBottom: "4px" }}>{o.icon} {o.label}</div>
                                                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{o.desc}</div>
                                            </div>
                                            {objectif === o.id && <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconBolt size={14} color="white" /></div>}
                                        </div>
                                    ))}
                                </div>

                                <button onClick={runSimulation} className="btn-primary" style={{ width: "100%", padding: "22px", fontSize: "1.05rem" }} disabled={isLoading}>
                                    {isLoading ? "Calcul en cours..." : "Voir mes résultats"}
                                    {!isLoading && <IconArrowRight size={20} style={{ marginLeft: "10px" }} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ===== STEP 5: RÉSULTATS ===== */}
                    {step === 5 && results && (
                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "var(--cream)", zIndex: 200, pointerEvents: "auto", overflowY: "auto", padding: "80px 20px" }}>
                            <div style={{ maxWidth: "1100px", margin: "0 auto", animation: "fadeUp 1s var(--ease-out-expo)" }}>

                                {/* Progress */}
                                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                                    <ProgressBar />
                                </div>

                                {/* Header — Hero Number */}
                                <div style={{ textAlign: "center", marginBottom: "80px" }}>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 24px", background: "rgba(255,136,17,0.08)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(255,136,17,0.15)" }}>
                                        <div className="hero-eyebrow-dot" style={{ background: "var(--orange)" }} />
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Rapport de Potentiel — {exactProvince.split(":")[0]}</span>
                                    </div>

                                    {/* Hero: Économies annuelles */}
                                    <div style={{ marginBottom: "16px" }}>
                                        <span style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 500, color: "var(--blue-dark)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{results.annualSavings.toLocaleString()}</span>
                                        <span style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--orange)", marginLeft: "12px" }}>DA/an</span>
                                    </div>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>d'économies estimées avec un système de <strong style={{ color: "var(--blue-dark)" }}>{results.systemKwp} kWc</strong></p>
                                </div>

                                {/* Key Metrics Grid */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "60px" }}>
                                    <div style={{ background: "white", padding: "32px", borderRadius: "24px", border: "1px solid rgba(30,58,95,0.06)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Production annuelle</div>
                                        <div style={{ fontSize: "2rem", fontWeight: 500, color: "var(--blue-dark)", fontFamily: "var(--font-display)" }}>{results.annualProduction.toLocaleString()}</div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>kWh</div>
                                    </div>
                                    <div style={{ background: "white", padding: "32px", borderRadius: "24px", border: "1px solid rgba(30,58,95,0.06)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Couverture solaire</div>
                                        <div style={{ fontSize: "2rem", fontWeight: 500, color: "var(--blue-dark)", fontFamily: "var(--font-display)" }}>{results.solarCoverage}<span style={{ color: "var(--orange)" }}>%</span></div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>de votre facture</div>
                                    </div>
                                    <div style={{ background: "white", padding: "32px", borderRadius: "24px", border: "1px solid rgba(30,58,95,0.06)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>CO₂ évité</div>
                                        <div style={{ fontSize: "2rem", fontWeight: 500, color: "#16a34a", fontFamily: "var(--font-display)" }}>{results.co2Avoided.toLocaleString()}</div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>kg / an</div>
                                    </div>
                                    <div style={{ background: "white", padding: "32px", borderRadius: "24px", border: "1px solid rgba(30,58,95,0.06)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Économies 25 ans</div>
                                        <div style={{ fontSize: "2rem", fontWeight: 500, color: "var(--blue-dark)", fontFamily: "var(--font-display)" }}>{(results.savings25y / 1000000).toFixed(1)}<span style={{ color: "#16a34a" }}>M</span></div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>DA</div>
                                    </div>
                                </div>

                                {/* Monthly Production Curve */}
                                <div style={{ background: "white", padding: "48px", borderRadius: "32px", border: "1px solid rgba(30,58,95,0.06)", marginBottom: "60px" }}>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "32px" }}>Courbe mensuelle de production (kWh)</div>
                                    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "200px" }}>
                                        {results.monthlyProd.map((val, i) => {
                                            const max = Math.max(...results.monthlyProd);
                                            return (
                                                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--orange)" }}>{val}</span>
                                                    <div style={{
                                                        width: "100%",
                                                        height: `${(val / max) * 160}px`,
                                                        background: `linear-gradient(to top, var(--orange), rgba(255,136,17,0.4))`,
                                                        borderRadius: "8px 8px 4px 4px",
                                                        transition: "height 1s var(--ease-out-expo)",
                                                        minHeight: "8px"
                                                    }} />
                                                    <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>{MONTHS[i]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Timeline ROI sur 20 ans */}
                                <div style={{ background: "white", padding: "48px", borderRadius: "32px", border: "1px solid rgba(30,58,95,0.06)", marginBottom: "60px" }}>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "32px" }}>Timeline ROI — 20 ans (Kit Optimal)</div>
                                    <div style={{ position: "relative", height: "220px", display: "flex", alignItems: "flex-end", gap: "4px" }}>
                                        {results.roiTimeline.map((point, i) => {
                                            const maxSavings = results.roiTimeline[20].savings;
                                            const barH = maxSavings > 0 ? (point.savings / maxSavings) * 180 : 0;
                                            const isPastBreakEven = point.savings >= results.kitOptimalPrice;
                                            const isBreakEvenYear = i === results.breakEvenYear;
                                            return (
                                                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", position: "relative" }}>
                                                    {isBreakEvenYear && (
                                                        <div style={{ position: "absolute", top: "-28px", background: "var(--orange)", color: "white", padding: "3px 8px", borderRadius: "8px", fontSize: "0.55rem", fontWeight: 800, whiteSpace: "nowrap", zIndex: 5 }}>⚡ Rentable</div>
                                                    )}
                                                    <div style={{
                                                        width: "100%",
                                                        height: `${Math.max(barH, 4)}px`,
                                                        background: isPastBreakEven
                                                            ? "linear-gradient(to top, #16a34a, #4ade80)"
                                                            : "linear-gradient(to top, var(--blue-dark), rgba(30,58,95,0.4))",
                                                        borderRadius: "6px 6px 2px 2px",
                                                        transition: "height 1s var(--ease-out-expo)",
                                                        border: isBreakEvenYear ? "2px solid var(--orange)" : "none"
                                                    }} />
                                                    {i % 5 === 0 && <span style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>A{i}</span>}
                                                </div>
                                            );
                                        })}
                                        {/* Break-even line */}
                                        {(() => {
                                            const linePos = results.kitOptimalPrice / results.roiTimeline[20].savings * 100;
                                            return linePos <= 100 ? (
                                                <div style={{ position: "absolute", left: 0, right: 0, bottom: `${linePos * 1.8}px`, borderTop: "2px dashed var(--orange)", zIndex: 3 }}>
                                                    <span style={{ position: "absolute", right: 0, top: "-18px", fontSize: "0.6rem", color: "var(--orange)", fontWeight: 700 }}>Coût installation: {results.kitOptimalPrice.toLocaleString()} DA</span>
                                                </div>
                                            ) : null;
                                        })()}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                                        <span>Année 0</span>
                                        <span style={{ color: "#16a34a", fontWeight: 700 }}>■ Après rentabilité</span>
                                        <span>Année 20</span>
                                    </div>
                                </div>

                                {/* 3 Kits Recommandés */}
                                <div style={{ marginBottom: "60px" }}>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "32px", textAlign: "center" }}>3 kits recommandés — prix après réductions LF2026</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                                        {results.kits.map((kit, i) => (
                                            <div key={i} style={{
                                                background: "white",
                                                padding: "40px 32px",
                                                borderRadius: "32px",
                                                border: kit.tag ? "2px solid var(--orange)" : "1px solid rgba(30,58,95,0.06)",
                                                boxShadow: kit.tag ? "0 20px 60px rgba(255,136,17,0.12)" : "0 10px 40px rgba(30,58,95,0.04)",
                                                position: "relative",
                                                textAlign: "center"
                                            }}>
                                                {kit.tag && (
                                                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "var(--orange)", color: "white", padding: "6px 20px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>{kit.tag}</div>
                                                )}
                                                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--blue-dark)", marginBottom: "24px" }}>{kit.name}</h3>
                                                <div style={{ marginBottom: "8px" }}>
                                                    <span style={{ fontSize: "2.4rem", fontWeight: 500, color: "var(--blue-dark)", fontFamily: "var(--font-display)" }}>{kit.price.toLocaleString()}</span>
                                                    <span style={{ fontSize: "1rem", color: "var(--text-muted)", marginLeft: "8px" }}>DA</span>
                                                </div>
                                                <div style={{ padding: "12px", background: "rgba(255,136,17,0.05)", borderRadius: "16px", marginBottom: "20px" }}>
                                                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Mensualité : </span>
                                                    <span style={{ fontWeight: 700, color: "var(--orange)" }}>{kit.mensualite.toLocaleString()} DA/mois</span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                                                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Rentable en</span>
                                                    <span style={{ fontWeight: 700, color: "var(--blue-dark)" }}>{kit.roi} ans</span>
                                                </div>
                                                {results.autoRemboursement && i === 1 && (
                                                    <div style={{ marginTop: "16px", padding: "12px", background: "rgba(22,163,74,0.06)", borderRadius: "12px", fontSize: "0.8rem", color: "#16a34a", fontWeight: 600 }}>
                                                        ✓ Auto-remboursement : mensualité ({kit.mensualite.toLocaleString()} DA) &lt; économies ({results.monthlySavings.toLocaleString()} DA/mois)
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
                                    <button onClick={() => setStep(1)} style={{ background: "rgba(30,58,95,0.05)", border: "1px solid rgba(30,58,95,0.1)", color: "var(--blue-dark)", padding: "18px 36px", borderRadius: "100px", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}>
                                        Nouvelle simulation
                                    </button>
                                </div>

                                {/* Financing CTA */}
                                <div style={{ background: "var(--blue-dark)", borderRadius: "40px", padding: "60px", color: "white", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: "40px" }}>
                                    <div style={{ position: "relative", zIndex: 2 }}>
                                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "16px" }}>Prêt à franchir le pas&nbsp;?</h3>
                                        <p style={{ opacity: 0.7, maxWidth: "500px", margin: "0 auto 40px" }}>
                                            Financement bancaire disponible avec 0 DA d'apport auprès de nos banques partenaires (BNA, BEA, Badr).
                                        </p>
                                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                                            <button className="btn-primary" style={{ padding: "18px 40px", fontSize: "1rem" }}>Démarrer mon dossier</button>
                                        </div>
                                    </div>
                                </div>

                                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", opacity: 0.6 }}>
                                    *Estimations basées sur les données NASA POWER et le tarif Sonelgaz en vigueur. Prix après réductions LF2026.
                                </p>
                            </div>
                        </div>
                    )}

                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                input[type="range"] {
                    -webkit-appearance: none;
                    height: 8px;
                    border-radius: 4px;
                    background: rgba(0,0,0,0.05);
                    outline: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 24px;
                    height: 24px;
                    background: var(--orange);
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(255, 136, 17, 0.3);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideRight {
                    from { transform: translateX(-40px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                input[type="range"]:hover::-webkit-slider-thumb {
                    transform: scale(1.1);
                    box-shadow: 0 6px 15px rgba(255, 136, 17, 0.4);
                }
                .glass-card {
                    transition: transform 0.3s var(--ease-out-expo);
                }
            `}} />
            </div>
        </>
    );
}

const REGIONS = [
    { id: "nord", name: "Nord (Alger, Oran...)", insol: 4.5, desc: "Ensoleillement modéré" },
    { id: "hauts", name: "Hauts Plateaux (Sétif...)", insol: 5.2, desc: "Ensoleillement élevé" },
    { id: "sud", name: "Sud (Ghardaïa, Adrar...)", insol: 6.5, desc: "Ensoleillement maximum" }
];

const ORIENTATIONS = [
    { id: "sud", name: "Sud", eff: 1.0 },
    { id: "est", name: "Est", eff: 0.85 },
    { id: "ouest", name: "Ouest", eff: 0.85 },
    { id: "nord", name: "Nord", eff: 0.60 }
];

const PANEL_WATTAGE = 500;
const M2_PER_PANEL = 2.5;
const PANEL_EFFICIENCY = 0.8; // Rendement panneaux
const SONELGAZ_PRICE = 5.5; // DA per kWh
const LF2026_REDUCTION = 0.82; // ~18% reduction from LF2026 (TVA + douane)

// Coût par kWc pour chaque gamme
const COST_PER_KWP_ECO = 150000;
const COST_PER_KWP_OPTIMAL = 180000;
const COST_PER_KWP_PREMIUM = 230000;
