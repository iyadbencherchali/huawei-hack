"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu, IconClose, IconGlobe, IconChevronDown, IconSun } from "./Icons";

export default function Header() {
    const pathname = usePathname();
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [lang, setLang] = useState("FR");

    // Force header visible on simulator page where body scroll is locked
    const isSimulator = pathname === "/simulateur";

    useEffect(() => {
        const h = () => setNavScrolled(window.scrollY > 100);
        window.addEventListener("scroll", h);
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
    ];

    return (
        <>
            <nav className={`nav ${navScrolled || isSimulator ? "scrolled" : ""}`}>
                <div className="nav-inner">
                    <Link href="/" className="nav-logo">
                        <span className="nav-logo-dot" />
                        <img
                            src="/LOGO_2.png"
                            alt="Pulse.dz"
                            className="nav-logo-image"
                            style={{ height: "30px" }}
                        />
                    </Link>
                    <ul className="nav-links">
                        {navItems.map((n) => (
                            <li key={n.href}>
                                <Link href={n.href} className="nav-link">
                                    {n.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                            className={`lang-switcher lang-switcher-desktop ${langOpen ? "open" : ""}`}
                            onClick={() => setLangOpen(!langOpen)}
                        >
                            <IconGlobe size={14} />
                            <span>{lang}</span>
                            <IconChevronDown size={12} />
                            <div className="lang-dropdown">
                                {["FR", "AR", "ⵜⵎⵣ"].map((l) => (
                                    <button
                                        key={l}
                                        className={`lang-option ${lang === l ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLang(l);
                                            setLangOpen(false);
                                        }}
                                    >
                                        {l === "FR" ? "Français" : l === "AR" ? "العربية" : "Tamazight"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Link href="/simulateur" className="nav-cta">
                            Simuler gratuitement
                        </Link>
                        <button
                            className="nav-menu-btn"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Menu"
                        >
                            <IconMenu />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-overlay ${mobileOpen ? "open" : ""}`}>
                <div className="mobile-overlay-bg" onClick={closeMobile} />
                <div className="mobile-drawer">
                    <div className="mobile-drawer-header">
                        <Link href="/" className="nav-logo" onClick={closeMobile}>
                            <span className="nav-logo-dot" />
                            <img
                                src="/LOGO_2.png"
                                alt="Pulse.dz"
                                className="nav-logo-image"
                                style={{ height: "30px" }}
                            />
                        </Link>
                        <button className="mobile-drawer-close" onClick={closeMobile}>
                            <IconClose />
                        </button>
                    </div>
                    <ul className="mobile-nav-links">
                        {navItems.map((n) => (
                            <li key={n.href}>
                                <Link
                                    href={n.href}
                                    className="mobile-nav-link"
                                    onClick={closeMobile}
                                >
                                    {n.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/simulateur"
                        className="mobile-drawer-cta"
                        onClick={closeMobile}
                    >
                        Simuler gratuitement →
                    </Link>
                </div>
            </div>
        </>
    );
}

