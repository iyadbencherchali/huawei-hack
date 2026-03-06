"use client";
import { useState, useEffect } from "react";
import { IconArrowRight, IconBolt, IconShield, IconSun, IconWallet, IconDocument } from "../components/Icons";

export default function Simulator() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        facture: "",
        wilaya: "",
        toit: "",
        objectif: ""
    });
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Scroll to top on step change
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => setStep((s) => s - 1);

    const handleSimulate = () => {
        const m = parseInt(formData.facture || "6000");
        const isSud = formData.wilaya.includes("(Sud)");
        const facteurSoleil = isSud ? 0.65 : 0.45;

        // Rough calculations
        const economieAnnuelle = Math.round(m * 12 * facteurSoleil);
        const kwcNeeded = Math.max(1.5, Math.round((m / 2000) * 10) / 10);
        const surfaceNeeded = Math.round(kwcNeeded * 6.5);
        const roi = isSud ? 2.8 : 3.5;

        setResult({ economieAnnuelle, kwcNeeded, surfaceNeeded, roi });
        setStep(4);
    };

    const willayas = [
        { value: "Alger", label: "Alger" }, { value: "Oran", label: "Oran" }, { value: "Constantine", label: "Constantine" },
        { value: "Blida", label: "Blida" }, { value: "Setif", label: "Sétif" }, { value: "Annaba", label: "Annaba" },
        { value: "Ghardaia (Sud)", label: "Ghardaïa (Sud)" }, { value: "Adrar (Sud)", label: "Adrar (Sud)" }, { value: "Ouargla (Sud)", label: "Ouargla (Sud)" }
    ];

    return (
        <div className="page-wrapper" style={{ paddingTop: "120px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px" }}>

                {/* Progress Bar */}
                <div style={{ width: "100%", marginBottom: "3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                        <span style={{ color: step >= 1 ? "var(--orange)" : "" }}>1. Consommation</span>
                        <span style={{ color: step >= 2 ? "var(--orange)" : "" }}>2. Toiture</span>
                        <span style={{ color: step >= 3 ? "var(--orange)" : "" }}>3. Objectif</span>
                        <span style={{ color: step >= 4 ? "var(--orange)" : "" }}>4. Résultat</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(30, 58, 95, 0.05)", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: `${(step / 4) * 100}%`, height: "100%", background: "var(--orange)", transition: "width 0.4s ease-out" }} />
                    </div>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="fade-in" style={{ width: "100%", textAlign: "center" }}>
                        <h1 className="t-display" style={{ marginBottom: "1rem" }}>Combien payez-vous chaque mois ?</h1>
                        <p className="t-subheading" style={{ marginBottom: "3rem" }}>Cette information nous permet de calibrer la taille de l'installation nécessaire.</p>

                        <div style={{ textAlign: "left", maxWidth: "480px", margin: "0 auto" }}>
                            <div style={{ marginBottom: "2rem" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Facture Sonelgaz moyenne (en DA)</label>
                                <input
                                    type="number"
                                    style={{ width: "100%", padding: "16px", fontSize: "1.2rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }}
                                    placeholder="Ex: 6000"
                                    value={formData.facture}
                                    onChange={(e) => setFormData({ ...formData, facture: e.target.value })}
                                    autoFocus
                                />
                            </div>

                            <div style={{ marginBottom: "3rem" }}>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Dans quelle wilaya êtes-vous situé ?</label>
                                <select
                                    style={{ width: "100%", padding: "16px", fontSize: "1.1rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", appearance: "none", backgroundColor: "white" }}
                                    value={formData.wilaya}
                                    onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                                >
                                    <option value="" disabled>Sélectionnez votre wilaya...</option>
                                    {willayas.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
                                </select>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: "100%", justifyContent: "space-between" }}
                                onClick={handleNext}
                                disabled={!formData.facture || !formData.wilaya}
                            >
                                Suivant <IconArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="fade-in" style={{ width: "100%", textAlign: "center" }}>
                        <h1 className="t-display" style={{ marginBottom: "1rem" }}>Quelle est la nature de votre toit ?</h1>
                        <p className="t-subheading" style={{ marginBottom: "3rem" }}>Le type de toiture influence le type de structure de montage.</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
                            {[
                                { id: "terrasse", label: "Toit Terrasse (Plat)" },
                                { id: "tuile", label: "Toit en Tuiles (Incliné)" },
                            ].map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => setFormData({ ...formData, toit: t.id })}
                                    style={{
                                        padding: "2rem 1rem",
                                        borderRadius: "16px",
                                        border: `2px solid ${formData.toit === t.id ? "var(--orange)" : "rgba(0,0,0,0.05)"}`,
                                        background: formData.toit === t.id ? "rgba(255,136,17,0.02)" : "white",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div style={{ fontWeight: 600, color: formData.toit === t.id ? "var(--orange)" : "var(--blue)", fontSize: "1.1rem" }}>{t.label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "1rem", maxWidth: "480px", margin: "0 auto" }}>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={handleBack}>Retour</button>
                            <button
                                className="btn-primary"
                                style={{ flex: 2, justifyContent: "space-between" }}
                                onClick={handleNext}
                                disabled={!formData.toit}
                            >
                                Suivant <IconArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div className="fade-in" style={{ width: "100%", textAlign: "center" }}>
                        <h1 className="t-display" style={{ marginBottom: "1rem" }}>Quel est votre objectif principal ?</h1>
                        <p className="t-subheading" style={{ marginBottom: "3rem" }}>Nous optimiserons l'algorithme de Pulse selon votre priorité.</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", margin: "0 auto 3rem", textAlign: "left" }}>
                            {[
                                { id: "economie", label: "Réduire ma facture au maximum", desc: "Priorité au retour sur investissement rapide." },
                                { id: "autonomie", label: "Batterie et Autonomie", desc: "Je veux du stockage pour les coupures de courant." },
                            ].map(o => (
                                <div
                                    key={o.id}
                                    onClick={() => setFormData({ ...formData, objectif: o.id })}
                                    style={{
                                        padding: "1.5rem",
                                        borderRadius: "16px",
                                        border: `2px solid ${formData.objectif === o.id ? "var(--orange)" : "rgba(0,0,0,0.05)"}`,
                                        background: formData.objectif === o.id ? "rgba(255,136,17,0.02)" : "white",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600, color: formData.objectif === o.id ? "var(--orange)" : "var(--blue)", fontSize: "1.1rem", marginBottom: "4px" }}>{o.label}</div>
                                        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{o.desc}</div>
                                    </div>
                                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `2px solid ${formData.objectif === o.id ? "var(--orange)" : "rgba(0,0,0,0.2)"}`, background: formData.objectif === o.id ? "var(--orange)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {formData.objectif === o.id && <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%" }} />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: "1rem", maxWidth: "480px", margin: "0 auto" }}>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={handleBack}>Retour</button>
                            <button
                                className="btn-primary"
                                style={{ flex: 2, justifyContent: "space-between" }}
                                onClick={handleSimulate}
                                disabled={!formData.objectif}
                            >
                                Générer mon bilan <IconDocument size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: RESULT */}
                {step === 4 && result && (
                    <div className="fade-in" style={{ width: "100%", paddingBottom: "4rem" }}>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <span className="t-label">Votre Bilan Pulse.dz</span>
                            <h1 className="t-display" style={{ marginTop: "1rem" }}>Le soleil de {formData.wilaya.replace(" (Sud)", "")} peut payer votre énergie.</h1>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                            <div style={{ background: "white", padding: "2rem", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.02)" }}>
                                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Économies sur 20 ans</div>
                                <div style={{ color: "var(--orange)", fontSize: "3rem", fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                                    {(result.economieAnnuelle * 20).toLocaleString("fr-FR")} <span style={{ fontSize: "1.2rem", color: "var(--text-secondary)", fontWeight: 500 }}>DA</span>
                                </div>
                                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                    <IconSun size={16} color="var(--orange)" /> Soit {result.economieAnnuelle.toLocaleString("fr-FR")} DA / an
                                </div>
                            </div>

                            <div style={{ background: "var(--blue-dark)", padding: "2rem", borderRadius: "24px", color: "white", boxShadow: "0 10px 40px rgba(30, 58, 95, 0.2)" }}>
                                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Système Recommandé</div>
                                <div style={{ color: "white", fontSize: "3rem", fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                                    {result.kwcNeeded} <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>kWc</span>
                                </div>
                                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                                    <IconBolt size={16} color="#ff8811" /> Approx. {Math.max(4, Math.round(result.kwcNeeded * 2.2))} panneaux solaires
                                </div>
                            </div>

                            <div style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", padding: "2rem", borderRadius: "24px", color: "white", boxShadow: "0 10px 40px rgba(22, 163, 74, 0.2)" }}>
                                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Retour sur Investissement</div>
                                <div style={{ color: "white", fontSize: "3rem", fontWeight: 700, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                                    {result.roi} <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>ans</span>
                                </div>
                                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "0.9rem" }}>
                                    <IconShield size={16} color="white" /> Financement Mourabaha disponible
                                </div>
                            </div>
                        </div>

                        <div style={{ background: "rgba(30, 58, 95, 0.03)", borderRadius: "24px", padding: "3rem", textAlign: "center" }}>
                            <h3 className="t-display" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Passez à l'étape suivante</h3>
                            <p className="t-subheading" style={{ marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
                                Un conseiller Pulse Analyse va étudier votre toiture sur Google Earth et vous appeler pour valider ce devis gratuitement.
                            </p>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                <input
                                    type="tel"
                                    placeholder="Votre numéro (ex: 0555...)"
                                    style={{ padding: "16px 24px", fontSize: "1.1rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", width: "260px" }}
                                />
                                <button className="btn-primary">Être rappelé <IconArrowRight size={18} style={{ marginLeft: "8px" }} /></button>
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            <button
                                onClick={() => setStep(1)}
                                style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "0.9rem", cursor: "pointer", textDecoration: "underline" }}
                            >
                                Refaire une simulation
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
