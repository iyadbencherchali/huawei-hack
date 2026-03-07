import Link from "next/link";
import { IconSun } from "./Icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <Link href="/" className="nav-logo" style={{ marginBottom: "0.5rem", display: "inline-flex" }}><span className="nav-logo-dot" /><span>Pulse.dz</span></Link>
                        <p className="footer-brand-desc">Decentralized Solar Energy Intelligence. Making solar accessible, profitable, and smart for every Algerian citizen.</p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link" aria-label="Facebook">f</a>
                            <a href="#" className="footer-social-link" aria-label="Instagram"><IconSun size={16} /></a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">in</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Product</h4>
                        <ul className="footer-col-links">
                            <li><Link href="/simulation">Solar Simulator</Link></li>
                            <li><Link href="/pro">Pro Network (Installers)</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Resources</h4>
                        <ul className="footer-col-links">
                            <li><Link href="/docs">Documentation</Link></li>
                            <li><Link href="/blog">Blog & News</Link></li>
                            <li><Link href="/simulation/methodology">Methodology</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="footer-col-title">Company</h4>
                        <ul className="footer-col-links">
                            <li><Link href="/a-propos">About Pulse.dz</Link></li>
                            <li><Link href="/a-propos#partenaires">Partners</Link></li>
                            <li><Link href="mailto:contact@pulse.dz">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span className="footer-bottom-text">© 2026 Pulse.dz — All rights reserved.</span>
                    <div className="footer-bottom-links">
                        <Link href="#">Legal Notice</Link>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
