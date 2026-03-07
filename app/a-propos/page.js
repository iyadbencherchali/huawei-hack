"use client";
import { IconShield, IconDocument, IconTarget } from "../components/Icons";

export default function About() {
    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            <section className="container" style={{ textAlign: "center", marginBottom: "6rem" }}>
                <h1 className="t-display" style={{ maxWidth: "800px", margin: "0 auto 1.5rem" }}>Energy should be a resource, not a burden.</h1>
                <p className="t-subheading" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    Pulse.dz was born from a simple observation: Algeria has one of the largest solar resources in the world, yet our rooftops remain empty. We are building the software intelligence layer that will change everything.
                </p>
            </section>

            <section className="container" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                    <div>
                        <span className="t-label">Our Mission</span>
                        <h2 className="t-display" style={{ marginTop: "1rem", marginBottom: "1.5rem", fontSize: "2.4rem" }}>
                            Virtualize and decentralize the Algerian power grid.
                        </h2>
                        <p className="t-subheading" style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                            We are not solar panel vendors. We are network engineers, AI specialists, and energy financiers.
                        </p>
                        <p className="t-subheading" style={{ color: "var(--text-secondary)" }}>
                            Our goal is to deploy the 'brain' — the Pulse Bridge and Sirocco-Shield — that allows millions of solar homes to orchestrate, share their surplus, and stabilize the Sonelgaz grid.
                        </p>
                    </div>
                    <div style={{ background: "linear-gradient(135deg, var(--blue), #112a4d)", height: "400px", borderRadius: "32px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "80%", height: "80%", border: "1px solid rgba(255,136,17,0.3)", borderRadius: "50%", position: "absolute", animation: "spin 20s linear infinite" }} />
                        <div style={{ width: "50%", height: "50%", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "50%", position: "absolute", animation: "spin 15s linear infinite reverse" }} />
                        <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--orange)", zIndex: 1, fontFamily: "var(--font-display)" }}>VPP</div>
                        <div style={{ position: "absolute", bottom: "30px", color: "white", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Virtual Power Plant</div>
                    </div>
                </div>
            </section>

            <section className="container" id="partenaires" style={{ marginBottom: "8rem", textAlign: "center" }}>
                <span className="t-label">Strategic Partners</span>
                <h2 className="t-display" style={{ margin: "1rem auto 3rem" }}>A trusted ecosystem</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", opacity: 0.6, filter: "grayscale(100%)" }}>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>Copernicus</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>BNA Mourabaha</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>LoRaWAN Alliance</div>
                    <div style={{ width: "160px", height: "60px", background: "rgba(30,58,95,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", color: "var(--blue)" }}>Huawei Cloud</div>
                </div>
            </section>
        </div>
    );
}
