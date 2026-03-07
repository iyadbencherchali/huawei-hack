"use client";
import { IconShield, IconWallet, IconDocument, IconBolt, IconArrowRight } from "../components/Icons";

export default function ProSpace() {
    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            {/* Hero Section */}
            <section className="container" style={{ textAlign: "center", marginBottom: "6rem", maxWidth: "800px" }}>
                <span className="t-label">Pulse Pro Network</span>
                <h1 className="t-display" style={{ margin: "1rem auto" }}>Become a Certified Pulse Installer.</h1>
                <p className="t-subheading" style={{ margin: "0 auto 2rem" }}>
                    Join Algeria's first premium solar installer network. We send you pre-qualified, pre-financed clients — you focus on what you do best: installing.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <a href="#apply" className="btn-primary">Apply to the Network <IconArrowRight size={18} style={{ marginLeft: "6px" }} /></a>
                    <a href="#benefits" className="btn-secondary">See the Benefits</a>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container" id="benefits" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, var(--orange), var(--orange-light))", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconBolt size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Qualified Leads</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            No more cold prospecting. We send you clients whose rooftops have been AI-validated and whose energy needs are clearly quantified in kW.
                        </p>
                    </div>

                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #16a34a, #4ade80)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconWallet size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Guaranteed Payment</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            Thanks to integrated BNA Mourabaha financing, you get paid immediately upon commissioning validation by the Pulse Bridge.
                        </p>
                    </div>

                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, var(--blue), #2a5080)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconShield size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Premium Tools</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            Access the Pulse Pro platform: satellite-generated installation plans, inverter monitoring, and centralized after-sales support.
                        </p>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="container" id="apply" style={{ marginBottom: "6rem", maxWidth: "800px" }}>
                <div style={{ background: "white", padding: "4rem", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30,58,95,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 className="t-display" style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>Certification Application</h2>
                        <p className="t-subheading" style={{ fontSize: "1.1rem" }}>Pulse certification requires a strict quality standard. Fill out this form and our technical team will contact you within 48 hours.</p>
                    </div>

                    <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} onSubmit={(e) => { e.preventDefault(); alert("Application submitted successfully!"); }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Company Name</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Solar Algeria LLC" required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Business ID / Tax No.</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="00000000000" required />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Manager Name</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Amine..." required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Mobile Phone</label>
                                <input type="tel" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="05 55 55 55 55" required />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Service Regions (Wilayas)</label>
                            <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Algiers, Blida, Tipaza..." required />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Installation Experience (Years / Number of Projects)</label>
                            <textarea style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", minHeight: "120px" }} placeholder="Describe your experience with hybrid inverters..." required />
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: "1rem", justifyContent: "center", padding: "18px" }}>
                            Submit Application <IconDocument size={18} style={{ marginLeft: "8px" }} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
