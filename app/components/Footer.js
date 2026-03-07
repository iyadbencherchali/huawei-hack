import Link from "next/link";
import { IconSun } from "./Icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <Link
                            href="/"
                            className="nav-logo"
                            style={{ marginBottom: "0.5rem", display: "inline-flex", alignItems: "center" }}
                        >
                            <span className="nav-logo-dot" />
                            <img
                                src="/LOGO_2.png"
                                alt="Pulse.dz"
                                className="nav-logo-image"
                                style={{ height: "30px", marginLeft: "0.5rem" }}
                            />
                        </Link>
                        <p className="footer-brand-desc">
                            Système d'Orchestration Énergétique Décentralisé. Rendant le solaire
                            accessible, rentable et intelligent pour chaque Algérien.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link" aria-label="Facebook">
                                f
                            </a>
                            <a href="#" className="footer-social-link" aria-label="Instagram">
                                <IconSun size={16} />
                            </a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">
                                in
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Produit</h4>
                        <ul className="footer-col-links">
                            <li>
                                <Link href="/#solution">Application</Link>
                            </li>
                            <li>
                                <Link href="/#piliers">Pulse Bridge</Link>
                            </li>
                            <li>
                                <Link href="/simulateur">Simulateur Web</Link>
                            </li>
                            <li>
                                <Link href="/pro">Espace Pro (Installateurs)</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Ressources</h4>
                        <ul className="footer-col-links">

                            <li>
                                <Link href="/blog">Blog & Actualités</Link>
                            </li>
                            <li>
                                <Link href="/blog#guide">Guide d'installation</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Entreprise</h4>
                        <ul className="footer-col-links">
                            <li>
                                <Link href="/a-propos">À Propos de Pulse.dz</Link>
                            </li>
                            <li>
                                <Link href="/a-propos#partenaires">Partenaires</Link>
                            </li>
                            <li>
                                <Link href="mailto:contact@pulse.dz">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span className="footer-bottom-text">
                        © 2026 Pulse.dz — Tous droits réservés.
                    </span>
                    <div className="footer-bottom-links">
                        <Link href="#">Mentions légales</Link>
                        <Link href="#">Confidentialité</Link>
                        <Link href="#">CGU</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

