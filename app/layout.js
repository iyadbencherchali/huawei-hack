import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pulse.dz — Smart AI Solutions for Renewable Urban Energy",
  description:
    "Pulse.dz calculates your solar potential in 60 seconds, automates your financing, and optimizes your production daily using AI. Available across all 69 wilayas.",
  keywords: [
    "solar panels Algeria",
    "solar simulation Algeria",
    "solar financing Algeria",
    "renewable energy",
    "Pulse.dz",
    "Sonelgaz",
    "smart city solar",
    "Huawei Cloud AI",
  ],
  openGraph: {
    title: "Pulse.dz — Your Roof Can Power Your Life",
    description: "Simulate your solar savings in 60 seconds. Zero-down financing, AI-driven Sirocco-Shield, real-time energy monitoring.",
    type: "website",
    locale: "en_US",
    siteName: "Pulse.dz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse.dz — AI-Powered Solar Intelligence for Algerian Smart Cities",
    description: "Simulate your solar savings in 60 seconds. Zero-down financing available.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
