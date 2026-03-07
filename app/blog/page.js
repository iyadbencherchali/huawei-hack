"use client";
import Link from 'next/link';
import { IconArrowRight } from "../components/Icons";

export default function Blog() {
    const posts = [
        {
            id: 1,
            tag: "Technology",
            title: "How Sirocco-Shield AI Anticipates Sandstorms in Southern Algeria",
            desc: "A technical deep-dive into the algorithm protecting solar yields against the Sirocco wind.",
            date: "March 12, 2026",
            read: "5 min",
            image: "linear-gradient(135deg, var(--orange), var(--orange-dark))"
        },
        {
            id: 2,
            tag: "Financing",
            title: "The Complete Guide to Solar Mourabaha Financing in 2026",
            desc: "How to finance your solar installation with zero down payment using new banking facilities.",
            date: "March 05, 2026",
            read: "8 min",
            image: "linear-gradient(135deg, #16a34a, #4ade80)"
        },
        {
            id: 3,
            tag: "Case Study",
            title: "From 14,000 DA to 2,500 DA: The Benali Family in Blida",
            desc: "Analysis of a 5 kWp residential installation optimized by the Pulse Bridge.",
            date: "Feb 28, 2026",
            read: "4 min",
            image: "linear-gradient(135deg, var(--blue), #2a5080)"
        },
        {
            id: 4,
            tag: "Regulation",
            title: "What Changes with the New Grid Injection Law",
            desc: "Sonelgaz now buys back your surplus energy. Here's how Pulse automates the entire process.",
            date: "Feb 15, 2026",
            read: "6 min",
            image: "linear-gradient(135deg, var(--sand-dark), var(--cream-dark))"
        }
    ];

    return (
        <div className="page-wrapper" style={{ paddingTop: "120px" }}>
            <section className="container" style={{ marginBottom: "5rem" }}>
                <h1 className="t-display">Pulse.dz Blog</h1>
                <p className="t-subheading" style={{ maxWidth: "600px", marginTop: "1rem" }}>
                    News on Algeria's energy transition, financing guides, and the latest technology breakthroughs.
                </p>
            </section>

            <section className="container" style={{ marginBottom: "8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2.5rem" }}>
                    {posts.map(post => (
                        <article key={post.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer" }} className="post-card fade-in">
                            <div style={{ width: "100%", height: "240px", borderRadius: "20px", background: post.image, marginBottom: "0.5rem", transition: "transform 0.4s ease", overflow: "hidden" }} className="post-image" />
                            <div>
                                <span className="t-label" style={{ fontSize: "0.75rem", marginBottom: "0.5rem", display: "inline-block" }}>{post.tag}</span>
                                <h3 className="t-display" style={{ fontSize: "1.4rem", lineHeight: 1.3, marginBottom: "0.5rem" }}>{post.title}</h3>
                                <p className="t-subheading" style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {post.desc}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1rem", marginTop: "auto" }}>
                                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{post.date} · {post.read} read</div>
                                    <IconArrowRight size={16} color="var(--blue)" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="container" style={{ marginBottom: "6rem", textAlign: "center" }}>
                <div style={{ background: "rgba(30, 58, 95, 0.03)", borderRadius: "24px", padding: "4rem 2rem" }}>
                    <h2 className="t-display" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Stay up to date on solar energy</h2>
                    <p className="t-subheading" style={{ marginBottom: "2rem" }}>Subscribe to our bi-monthly newsletter.</p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", maxWidth: "600px", margin: "0 auto" }}>
                        <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "16px 24px", fontSize: "1rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.1)", outline: "none" }} />
                        <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
