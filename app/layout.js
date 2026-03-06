import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pulse.dz — L'énergie intelligente pour chaque toit algérien",
  description:
    "Pulse.dz calcule votre potentiel solaire en 60 secondes, organise votre financement Mourabaha, et optimise votre production au quotidien grâce à l'IA. 48 wilayas couvertes.",
  keywords: [
    "panneau solaire Algérie",
    "simulation solaire Algérie",
    "financement solaire Algérie",
    "énergie solaire",
    "Pulse.dz",
    "Sonelgaz",
    "Mourabaha solaire",
  ],
  openGraph: {
    title: "Pulse.dz — Votre toit peut produire votre énergie",
    description: "Simulez vos économies solaires en 60 secondes. Financement 0 apport, IA prédictive Sirocco-Shield, monitoring en temps réel.",
    type: "website",
    locale: "fr_DZ",
    siteName: "Pulse.dz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse.dz — L'énergie intelligente pour chaque toit algérien",
    description: "Simulez vos économies solaires en 60 secondes. Financement 0 apport.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
