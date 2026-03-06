"use client";
import { useEffect, useState } from "react";
import { IconTarget, IconBolt, IconDocument, IconWallet, IconShield } from "../components/Icons";

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const stepElements = document.querySelectorAll(".timeline-step");
            let current = 0;
            stepElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                // If the top of the step is above the middle of the screen
                if (rect.top < window.innerHeight * 0.6) {
                    current = index;
                }
            });
            setActiveStep(current);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const steps = [
        {
            num: "01",
            title: "Simulation en 60s",
            Icon: IconTarget,
            color: "orange",
            desc: "Découvrez votre potentiel. Entrez votre facture et votre wilaya. Notre algorithme calcule vos économies instantanément en tenant compte de l'ensoleillement de votre région géographique.",
            visual: "Le point de départ vers votre autonomie."
        },
        {
            num: "02",
            title: "Qualification Experte",
            Icon: IconBolt,
            color: "blue",
            desc: "Un ingénieur Pulse vous appelle pour analyser techniquement votre toiture via imagerie satellite et dimensionner précisément votre installation.",
            visual: "Analyse experte et dimensionnement."
        },
        {
            num: "03",
            title: "Dossier Mourabaha 0 Apport",
            Icon: IconDocument,
            color: "green",
            desc: "Notre outil exclusif Green Sukuk génère automatiquement votre dossier de financement islamique. Vous n'avez qu'à le signer en agence, sans avancer 1 DA.",
            visual: "Financement rapide et transparent."
        },
        {
            num: "04",
            title: "Installation Certifiée",
            Icon: IconWallet,
            color: "gold",
            desc: "Un installateur de la communauté 'Pulse Pro' — formé et certifié par nos ingénieurs — déploie votre système avec le capteur Pulse Bridge en moins de 48 heures.",
            visual: "Déploiement premium par des pros."
        },
        {
            num: "05",
            title: "Orchestration par IA",
            Icon: IconShield,
            color: "orange",
            desc: "Le système prend vie. Sirocco-Shield surveille la météo, vous alerte avant les tempêtes de sable, et vous aide à gagner des Pulse Credits pour chaque kWh produit.",
            visual: "L'énergie devient intelligente."
        }
    ];

    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            <section className="container" style={{ marginBottom: "6rem", textAlign: "center" }}>
                <span className="t-label">Le Processus Pulse.dz</span>
                <h1 className="t-display" style={{ marginTop: "1rem", maxWidth: "800px", margin: "1rem auto" }}>
                    De la facture au contrôle total en 5 étapes.
                </h1>
                <p className="t-subheading" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    Une transition énergétique fluide, sans surprise et sans investissement de départ.
                </p>
            </section>

            <section className="timeline-section container" style={{ marginBottom: "8rem" }}>
                <div className="timeline-grid">
                    {/* Sticky Visual Side (Desktop) */}
                    <div className="timeline-visual-col">
                        <div className="timeline-sticky-box">
                            {steps.map((s, i) => (
                                <div key={i} className={`timeline-visual-card fade-in ${activeStep === i ? "active" : ""}`}>
                                    <div className={`timeline-visual-icon timeline-bg-${s.color}`}>
                                        <s.Icon size={48} color="white" />
                                    </div>
                                    <div className="timeline-visual-num">{s.num}</div>
                                    <p className="timeline-visual-text">{s.visual}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scrolling Steps Side */}
                    <div className="timeline-content-col">
                        <div className="timeline-track-line" />
                        {steps.map((s, i) => (
                            <div key={i} className={`timeline-step ${activeStep >= i ? "active" : ""}`}>
                                <div className="timeline-step-dot" />
                                <div className="timeline-step-content reveal" style={{ animationDelay: "0ms" }}>
                                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                                        <span className="timeline-step-number">{s.num}</span>
                                        <h2 className="timeline-step-title">{s.title}</h2>
                                    </div>
                                    <p className="timeline-step-desc">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mini CTA at bottom */}
            <section className="container" style={{ marginBottom: "6rem", textAlign: "center" }}>
                <div style={{ background: "rgba(30, 58, 95, 0.03)", borderRadius: "24px", padding: "4rem 2rem" }}>
                    <h2 className="t-display" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Prêt à commencer l'étape 01 ?</h2>
                    <p className="t-subheading" style={{ marginBottom: "2rem" }}>La simulation est 100% gratuite et sans engagement.</p>
                    <a href="/#simuler" className="btn-primary" style={{ display: "inline-flex" }}>Simuler gratuitement <IconBolt size={18} color="white" style={{ marginLeft: "8px" }} /></a>
                </div>
            </section>
        </div>
    );
}
