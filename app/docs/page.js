"use client";
import { IconShield, IconSatellite, IconBolt, IconDocument, IconArrowRight } from "../components/Icons";

export default function Docs() {
  return (
    <div className="docs-page container reveal visible" style={{ padding: "var(--space-2xl) 0", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ marginBottom: "var(--space-2xl)", textAlign: "center" }}>
        <h1 className="t-display" style={{ color: "var(--blue)", marginBottom: "var(--space-sm)" }}>Documentation Pulse.dz</h1>
        <p className="t-subheading" style={{ color: "var(--text-secondary)" }}>
          L'intelligence énergétique conçue pour la réalité algérienne.
        </p>
      </header>

      <section style={{ marginBottom: "var(--space-2xl)" }}>
        <h2 className="t-title" style={{ color: "var(--blue)", marginBottom: "var(--space-md)", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "0.5rem" }}>La Vision</h2>
        <p style={{ lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Pulse.dz est le maillon manquant entre les foyers algériens et l'énergie solaire. Bien que le soleil soit abondant et la technologie disponible, l'adoption est freinée par quatre obstacles majeurs : le sable, les compteurs inadaptés, le coût initial et le décalage entre production et consommation.
        </p>
        <p style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
          Notre plateforme orchestre intelligemment ces éléments pour transformer votre toit en une centrale de profit automatique.
        </p>
      </section>

      <div className="docs-grid" style={{ display: "grid", gap: "var(--space-xl)" }}>
        
        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconShield size={24} color="var(--orange)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Sirocco-Shield</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Notre IA prédit les tempêtes de sable 24 heures à l'avance en croisant les images satellites Copernicus et les données météo locales. Elle vous alerte précisément au moment où vos panneaux commencent à perdre en efficacité, vous permettant de planifier un nettoyage certifié avant que vos revenus ne chutent.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconSatellite size={24} color="var(--blue)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Pulse Bridge IoT</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Un capteur intelligent non-invasif qui se fixe sur votre compteur Sonelgaz existant. Aucun remplacement de matériel n'est nécessaire. Il lit votre consommation et votre production en temps réel et transmet les données via le réseau LoRaWAN, fonctionnant même dans les zones sans couverture Wi-Fi ou 4G.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconBolt size={24} color="var(--orange)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Orchestration des Appareils</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            L'IA de Pulse identifie les moments optimaux pour faire fonctionner vos appareils les plus gourmands (climatisation, lave-linge, pompe à eau) en utilisant directement votre production solaire gratuite plutôt que l'électricité payante du réseau. Chaque kWh optimisé est un crédit de gagné sur votre facture.
          </p>
        </div>

        <div className="docs-item">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <IconDocument size={24} color="var(--green)" />
            <h3 className="t-subtitle" style={{ color: "var(--blue)", margin: 0 }}>Financement Green Sukuk</h3>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            Nous automatisons la génération de votre dossier de prêt Mourabaha. L'application calcule vos économies futures pour garantir un financement avec 0 DA d'apport. Vos mensualités sont couvertes par les économies d'énergie générées par vos nouveaux panneaux.
          </p>
        </div>

      </div>

      <footer style={{ marginTop: "var(--space-3xl)", textAlign: "center" }}>
        <a href="/" className="btn-primary">
          Retour à l'accueil
        </a>
      </footer>
    </div>
  );
}
