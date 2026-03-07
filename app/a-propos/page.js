"use client";
import { IconShield, IconDocument, IconTarget } from "../components/Icons";

export default function About() {
    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            <section className="container" style={{ textAlign: "center", marginBottom: "6rem" }}>
                <h1 className="t-display" style={{ maxWidth: "800px", margin: "0 auto 1.5rem" }}>L'énergie doit être une ressource, pas un fardeau.</h1>
                <p className="t-subheading" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    Pulse.dz est né d'un constat simple : l'Algérie possède le plus grand gisement solaire au monde, mais nos toits restent vides. Nous construisons la couche d'intelligence logicielle qui va tout changer.
                </p>
            </section>

            <section className="container" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                    <div>
                        <span className="t-label">Notre Mission</span>
                        <h2 className="t-display" style={{ marginTop: "1rem", marginBottom: "1.5rem", fontSize: "2.4rem" }}>
                            Système d'Orchestration Énergétique Décentralisé.
                        </h2>
                        <p className="t-subheading" style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                            Nous ne sommes pas des vendeurs de panneaux. Nous sommes une plateforme d'orchestration — la vente n'est qu'un point d'entrée. Pulse.dz sert particuliers, PME, installateurs, banques et l'État.
                        </p>
                        <p className="t-subheading" style={{ color: "var(--text-secondary)" }}>
                            Chaque foyer connecté devient une micro-centrale intelligente capable de produire, consommer, stocker, et partager de l'énergie — le tout orchestré en temps réel par l'IA Sirocco-Shield et le réseau de Pulse Bridge IoT.
                        </p>
                    </div>
                    <div style={{ background: "linear-gradient(135deg, var(--blue), #112a4d)", height: "400px", borderRadius: "32px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* Abstract visual representing the grid */}
                        <div style={{ width: "80%", height: "80%", border: "1px solid rgba(255,136,17,0.3)", borderRadius: "50%", position: "absolute", animation: "spin 20s linear infinite" }} />
                        <div style={{ width: "50%", height: "50%", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "50%", position: "absolute", animation: "spin 15s linear infinite reverse" }} />
                        <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--orange)", zInedx: 1, fontFamily: "var(--font-display)" }}>VPP</div>
                        <div style={{ position: "absolute", bottom: "30px", color: "white", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Virtual Power Plant</div>
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: "8rem", textAlign: "center", background: "rgba(30,58,95,0.03)", padding: "5rem 2rem", borderRadius: "32px" }}>
                <span className="t-label" style={{ color: "var(--orange)" }}>La Vision Long Terme</span>
                <h2 className="t-display" style={{ margin: "1.5rem auto 2.5rem", maxWidth: "900px" }}>500 000 toits solaires en Algérie d'ici 5 ans.</h2>
                <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
                    <p className="t-subheading" style={{ marginBottom: "1.5rem" }}>
                        Dans 5 ans, Pulse.dz est l'infrastructure invisible derrière 500 000 toits solaires en Algérie. Chaque toit connecté est un nœud dans un réseau intelligent décentralisé.
                    </p>
                    <p className="t-subheading" style={{ marginBottom: "1.5rem" }}>
                        Sonelgaz ne gère plus un réseau unidirectionnel — il gère un réseau vivant où la production est distribuée, prévisible, et optimisée par l'IA.
                    </p>
                    <p className="t-subheading" style={{ fontWeight: 600, color: "var(--blue)" }}>
                        🌍 Pulse.dz exporte ensuite ce modèle vers le Maroc, la Tunisie, le Sénégal, et l'Afrique subsaharienne.
                    </p>
                </div>
            </section>

            <section className="container" style={{ marginBottom: "8rem", textAlign: "center" }}>
                <span className="t-label">Partenaires Stratégiques</span>
                <h2 className="t-display" style={{ margin: "1rem auto 3rem" }}>Un écosystème de confiance</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", opacity: 0.6, filter: "grayscale(100%)" }}>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>NASA POWER</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>BNA / BEA / Badr</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>LoRaWAN Alliance</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>Copernicus CAMS</div>
                </div>
            </section>

            <style jsx>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
