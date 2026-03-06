"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu, IconClose, IconGlobe, IconChevronDown, IconSun } from "./Icons";

export default function Header() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [lang, setLang] = useState("FR");

    useEffect(() => {
        const h = () => setNavScrolled(window.scrollY > 100);
        window.addEventListener("scroll", h);
        // Initial check
        h();
        return () => window.removeEventListener("scroll", h);
    }, []);

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const closeMobile = () => setMobileOpen(false);
    const navItems = [
        { href: "/#problemes", label: "Le Problème" },
        { href: "/#solution", label: "Solution" },
        { href: "/#piliers", label: "Piliers" },
        { href: "/comment-ca-marche", label: "Comment ça marche" },
    ];

    return (
        <>
            <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
                <div className="nav-inner">
                    <Link href="/" className="nav-logo"><span className="nav-logo-dot" /><span>Pulse.dz</span></Link>
                    <ul className="nav-links">
                        {navItems.map((n) => (<li key={n.href}><Link href={n.href} className="nav-link">{n.label}</Link></li>))}
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div className={`lang-switcher lang-switcher-desktop ${langOpen ? "open" : ""}`} onClick={() => setLangOpen(!langOpen)}>
                            <IconGlobe size={14} />
                            <span>{lang}</span>
                            <IconChevronDown size={12} />
                            <div className="lang-dropdown">
                                {["FR", "AR", "ⵜⵎⵣ"].map((l) => (
                                    <button key={l} className={`lang-option ${lang === l ? "active" : ""}`}
                                        onClick={(e) => { e.stopPropagation(); setLang(l); setLangOpen(false); }}>
                                        {l === "FR" ? "Français" : l === "AR" ? "العربية" : "Tamazight"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Link href="/#simuler" className="nav-cta">Simuler gratuitement</Link>
                        <button className="nav-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Menu"><IconMenu /></button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-overlay ${mobileOpen ? "open" : ""}`}>
                <div className="mobile-overlay-bg" onClick={closeMobile} />
                <div className="mobile-drawer">
                    <div className="mobile-drawer-header">
                        <Link href="/" className="nav-logo" onClick={closeMobile}><span className="nav-logo-dot" /><span>Pulse.dz</span></Link>
                        <button className="mobile-drawer-close" onClick={closeMobile}><IconClose /></button>
                    </div>
                    <ul className="mobile-nav-links">
                        {navItems.map((n) => (
                            <li key={n.href}><Link href={n.href} className="mobile-nav-link" onClick={closeMobile}>{n.label}</Link></li>
                        ))}
                    </ul>
                    <Link href="/#simuler" className="mobile-drawer-cta" onClick={closeMobile}>Simuler gratuitement →</Link>
                </div>
            </div>
        </>
    );
}
