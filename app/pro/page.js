"use client";
import { IconShield, IconWallet, IconDocument, IconBolt, IconArrowRight } from "../components/Icons";

export default function EspacePro() {
    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            {/* Hero Section */}
            <section className="container" style={{ textAlign: "center", marginBottom: "6rem", maxWidth: "800px" }}>
                <span className="t-label">Réseau Pulse Pro</span>
                <h1 className="t-display" style={{ margin: "1rem auto" }}>Devenez installateur certifié Pulse.</h1>
                <p className="t-subheading" style={{ margin: "0 auto 2rem" }}>
                    Rejoignez le premier réseau d'installateurs solaires certifiés en Algérie. Nous vous apportons des clients éligibles au financement (BNA, BEA, Badr), prêts à signer. Accédez aussi à notre marketplace : nettoyage à la demande, matériel certifié, et leads géolocalisés.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <a href="#postuler" className="btn-primary">Postuler au réseau <IconArrowRight size={18} style={{ marginLeft: "6px" }} /></a>
                    <a href="#avantages" className="btn-secondary">Voir les avantages</a>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container" id="avantages" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, var(--orange), var(--orange-light))", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconBolt size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Chantiers Qualifiés</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            Fini la prospection à froid. Nous vous envoyons des clients dont la toiture a été validée par IA et dont le besoin est clairement identifié en kWc.
                        </p>
                    </div>

                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #16a34a, #4ade80)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconWallet size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Paiement Garanti</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            Grâce au financement bancaire intégré auprès de BNA, BEA ou Badr, vous êtes payé dès la validation de la mise en service par le Pulse Bridge.
                        </p>
                    </div>

                    <div style={{ background: "rgba(30,58,95,0.03)", padding: "3rem 2rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, var(--blue), #2a5080)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <IconShield size={32} color="white" />
                        </div>
                        <h3 className="t-display" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Pro Hub Avancé</h3>
                        <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                            Vue portefeuille de toutes vos installations actives, diagnostics temps réel avec consentement client, détection proactive des anomalies, et gestion des devis intégrée.
                        </p>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="container" id="postuler" style={{ marginBottom: "6rem", maxWidth: "800px" }}>
                <div style={{ background: "white", padding: "4rem", borderRadius: "32px", boxShadow: "0 20px 80px rgba(30,58,95,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 className="t-display" style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>Demande d'Agrément</h2>
                        <p className="t-subheading" style={{ fontSize: "1.1rem" }}>La certification Pulse exige un standard de qualité strict. Remplissez ce formulaire et notre équipe technique vous contactera sous 48h.</p>
                    </div>

                    <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} onSubmit={(e) => { e.preventDefault(); alert("Candidature envoyée avec succès!"); }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Nom de l'entreprise</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Sarl Solar Algérie" required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>RC / NIF</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="00000000000" required />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Nom du Gerant</label>
                                <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Amine..." required />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Téléphone mobile</label>
                                <input type="tel" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="05 55 55 55 55" required />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Wilayas d'intervention</label>
                            <input type="text" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} placeholder="Alger, Blida, Tipaza..." required />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--blue)" }}>Expérience d'installation (Années / Nombre de chantiers)</label>
                            <textarea style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", minHeight: "120px" }} placeholder="Précisez votre expérience avec les onduleurs hybrides..." required />
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: "1rem", justifyContent: "center", padding: "18px" }}>
                            Envoyer la candidature <IconDocument size={18} style={{ marginLeft: "8px" }} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
