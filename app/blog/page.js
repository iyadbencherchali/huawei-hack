"use client";
import Link from 'next/link';
import { IconArrowRight } from "../components/Icons";

export default function Blog() {
    const posts = [
        {
            id: 1,
            tag: "Technologie",
            title: "Comment l'IA de Sirocco-Shield anticipe les tempêtes de sable dans le Sud algérien",
            desc: "Une plongée technique dans l'algorithme qui protège les rendements solaires contre le sirocco.",
            date: "12 Mars 2026",
            read: "5 min",
            image: "linear-gradient(135deg, var(--orange), var(--orange-dark))"
        },
        {
            id: 2,
            tag: "Financement",
            title: "Le guide complet du financement Solaire en 2026",
            desc: "Comment financer votre installation à 0 apport grâce aux banques partenaires BNA/BEA/Badr et la LF 2026.",
            date: "05 Mars 2026",
            read: "8 min",
            image: "linear-gradient(135deg, #16a34a, #4ade80)"
        },
        {
            id: 3,
            tag: "Étude de Cas",
            title: "De 14,000 DA à 2,500 DA : L'histoire de la famille Benali à Blida",
            desc: "Analyse d'une installation résidentielle de 5 kWc optimisée par le Pulse Bridge.",
            date: "28 Fév 2026",
            read: "4 min",
            image: "linear-gradient(135deg, var(--blue), #2a5080)"
        },
        {
            id: 4,
            tag: "Réglementation",
            title: "Ce qui change avec la nouvelle loi sur l'injection réseau",
            desc: "La Sonelgaz rachète désormais votre surplus. Voici comment Pulse automatise le processus.",
            date: "15 Fév 2026",
            read: "6 min",
            image: "linear-gradient(135deg, var(--sand-dark), var(--cream-dark))"
        }
    ];

    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            <section className="container" style={{ marginBottom: "5rem" }}>
                <h1 className="t-display">Le Blog Pulse.dz</h1>
                <p className="t-subheading" style={{ maxWidth: "600px", marginTop: "1rem" }}>
                    L'actualité de la transition énergétique en Algérie, des guides de financement et les dernières avancées technologiques.
                </p>
            </section>

            <section className="container" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2.5rem" }}>
                    {posts.map(post => (
                        <article key={post.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer", group: "true" }} className="post-card fade-in">
                            <div style={{ width: "100%", height: "240px", borderRadius: "20px", background: post.image, marginBottom: "0.5rem", transition: "transform 0.4s ease", overflow: "hidden" }} className="post-image" />

                            <div>
                                <span className="t-label" style={{ fontSize: "0.75rem", marginBottom: "0.5rem", display: "inline-block" }}>{post.tag}</span>
                                <h3 className="t-display" style={{ fontSize: "1.4rem", lineHeight: 1.3, marginBottom: "0.5rem" }}>{post.title}</h3>
                                <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {post.desc}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1rem", marginTop: "auto" }}>
                                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{post.date} · {post.read} de lecture</div>
                                    <IconArrowRight size={16} color="var(--blue)" className="post-arrow" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="container" style={{ marginBottom: "6rem", textAlign: "center" }}>
                <div style={{ background: "rgba(30, 58, 95, 0.03)", borderRadius: "24px", padding: "4rem 2rem" }}>
                    <h2 className="t-display" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Ne manquez aucune actualité solaire</h2>
                    <p className="t-subheading" style={{ marginBottom: "2rem" }}>Inscrivez-vous à notre newsletter bimensuelle.</p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", maxWidth: "600px", margin: "0 auto" }}>
                        <input type="email" placeholder="votre@email.com" style={{ flex: 1, padding: "16px 24px", fontSize: "1rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} />
                        <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>S'inscrire</button>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .post-card:hover .post-image { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .post-card:hover h3 { color: var(--orange); }
        .post-card .post-arrow { transition: transform 0.2s; }
        .post-card:hover .post-arrow { transform: translateX(4px); }
      `}</style>
        </div>
    );
}
