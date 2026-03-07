"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu, IconClose, IconSun } from "./Icons";

export default function Header() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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
        { href: "/simulation", label: "Simulation" },
        { href: "/docs", label: "Docs" },
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

                        <Link href="/simulation" className="nav-cta">Start Simulation →</Link>
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
                    <Link href="/simulation" className="mobile-drawer-cta" onClick={closeMobile}>Start Simulation →</Link>
                </div>
            </div>
        </>
    );
}
