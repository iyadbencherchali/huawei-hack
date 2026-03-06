"use client";

import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col items-center lg:items-start py-6 transition-all duration-300 sticky top-0 h-screen">
        <div className="flex items-center px-0 lg:px-6 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="ml-3 hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Pulse.dz</span>
        </div>

        <nav className="flex-1 w-full flex flex-col gap-2 px-3">
          <Link href="/" className="flex items-center p-3 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="ml-3 hidden lg:block font-medium">Accueil</span>
          </Link>
          <Link href="/simulation" className="flex items-center p-3 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="ml-3 hidden lg:block font-medium">Simulation</span>
          </Link>
          <div className="flex items-center p-3 bg-primary/10 text-primary rounded-xl transition-all font-semibold">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="ml-3 hidden lg:block">Documentation</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Documentation Technique</h1>
            <p className="text-sm text-gray-500 mt-0.5">Comment fonctionne notre simulateur solaire</p>
          </div>
          <Link href="/simulation" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            ← Retour à la simulation
          </Link>
        </header>

        <div className="max-w-4xl mx-auto px-6 md:px-12 py-10">
          {/* Hero */}
          <div className="bg-gradient-to-r from-[#050035] to-blue-900 rounded-2xl p-8 md:p-10 mb-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">📐 Méthodologie de Simulation</h2>
            <p className="text-blue-100 text-lg max-w-2xl">
              De la théorie solaire aux résultats de votre tableau de bord — comprenez chaque calcul derrière votre estimation.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 shadow-sm">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Table des matières</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { n: "1", label: "Théorie solaire en Algérie", id: "theorie" },
                { n: "2", label: "Dimensionnement du système", id: "dimensionnement" },
                { n: "3", label: "Calcul de la production", id: "production" },
                { n: "4", label: "Analyse financière", id: "finance" },
                { n: "5", label: "Score Solaire", id: "score" },
                { n: "6", label: "Tableau de bord (Dashboard)", id: "dashboard" },
                { n: "7", label: "Modal des résultats", id: "resultats" },
                { n: "8", label: "Sources & références", id: "sources" },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">{item.n}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Section 1: Theory */}
          <section id="theorie" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg">☀</span>
              1. Théorie Solaire en Algérie
            </h3>
            <div className="prose prose-gray max-w-none">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-4">
                <p className="text-gray-600 leading-relaxed mb-4">
                  L&apos;Algérie bénéficie d&apos;un des gisements solaires les plus importants au monde. L&apos;irradiance solaire varie considérablement du nord au sud :
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Zone</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Régions</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Irradiance (kWh/kWp/an)</th>
                        <th className="text-left py-2 font-semibold text-gray-700">Latitude</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-50"><td className="py-2 font-medium">Nord (Tell)</td><td>Alger, Oran, Constantine</td><td className="font-bold text-[#FF8A00]">1 700</td><td>≥ 32°N</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-2 font-medium">Hauts Plateaux</td><td>Djelfa, M&apos;sila, Batna</td><td className="font-bold text-[#FF8A00]">1 900</td><td>30°–32°N</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-2 font-medium">Sud</td><td>Ghardaïa, Biskra, Ouargla</td><td className="font-bold text-[#FF8A00]">2 100</td><td>27°–30°N</td></tr>
                      <tr><td className="py-2 font-medium">Sahara</td><td>Adrar, Tamanrasset, Illizi</td><td className="font-bold text-[#FF8A00]">2 300</td><td>≤ 27°N</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-3">La zone est déterminée automatiquement à partir de la latitude de votre position GPS.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Sizing */}
          <section id="dimensionnement" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">⚡</span>
              2. Dimensionnement du Système
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-4">
              <p className="text-gray-600 leading-relaxed mb-4">
                Contrairement aux simulateurs basiques qui remplissent le toit entier, notre algorithme dimensionne le système <strong>en fonction de votre consommation réelle</strong>.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 mb-4 space-y-1">
                <p className="text-gray-400">// Formule de dimensionnement</p>
                <p>kW_requis = consommation_annuelle / (irradiance × efficacité)</p>
                <p className="text-gray-400">// Contraintes</p>
                <p>système = max(kW_requis, 3.0 kW) <span className="text-gray-400">// minimum résidentiel</span></p>
                <p>système = min(système, capacité_toit) <span className="text-gray-400">// ne dépasse pas le toit</span></p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">60%</div>
                  <div className="text-xs text-blue-500 font-medium">Surface utile du toit</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">2.2 m²</div>
                  <div className="text-xs text-blue-500 font-medium">Par panneau 550W</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">3 kW</div>
                  <div className="text-xs text-blue-500 font-medium">Système minimum</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Production */}
          <section id="production" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg">📊</span>
              3. Calcul de la Production
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 mb-4">
                <p>production_annuelle = taille_système_kW × irradiance × efficacité</p>
                <p className="text-gray-400 mt-2">// Exemple: 3.3 kW × 1700 × 0.80 = 4,488 kWh/an</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                L&apos;efficacité système de <strong>80%</strong> inclut les pertes de :
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span>Onduleur (conversion DC→AC) : ~5%</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span>Câblage et connecteurs : ~3%</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span>Poussière et salissures : ~5%</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span>Température (chaleur) : ~5%</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span>Ombrage partiel : ~2%</li>
              </ul>
              <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="text-xs text-orange-700 font-medium">
                  📉 <strong>Dégradation</strong> : Les panneaux perdent ~0.5% de rendement par an. Après 25 ans, le système conserve ~88% de sa production initiale.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Financial */}
          <section id="finance" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF8A00] flex items-center justify-center text-lg">💰</span>
              4. Analyse Financière
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm font-bold text-gray-700 mb-1">Coût d&apos;installation</div>
                  <div className="text-2xl font-extrabold text-[#FF8A00]">220 000 DA/kW</div>
                  <p className="text-xs text-gray-500 mt-1">Système clé en main (panneaux + onduleur + pose + câblage)</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-bold text-gray-700 mb-1">Tarif électricité</div>
                  <div className="text-2xl font-extrabold text-green-600">8.5 DA/kWh</div>
                  <p className="text-xs text-gray-500 mt-1">Moyenne Sonelgaz (ou calculé depuis votre facture)</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 space-y-1">
                <p className="text-gray-400">// ROI (retour sur investissement)</p>
                <p>économies_annuelles = min(production, consommation) × tarif_kWh</p>
                <p>amortissement = coût_total / économies_annuelles</p>
                <p className="text-gray-400 mt-2">// Exemple: 726,000 DA / 90,000 DA/an ≈ 8 ans</p>
              </div>
            </div>
          </section>

          {/* Section 5: Solar Score */}
          <section id="score" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">🎯</span>
              5. Score Solaire (0–100)
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-600 leading-relaxed mb-4">
                Le Score Solaire évalue le potentiel de votre toiture sur une échelle de 0 à 100, basé sur 4 facteurs pondérés :
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { label: "Irradiance solaire", weight: "40%", desc: "Basée sur votre zone géographique", color: "bg-yellow-400", bgColor: "bg-yellow-50" },
                  { label: "Surface du toit", weight: "25%", desc: "De 10 m² (faible) à 200+ m² (excellent)", color: "bg-blue-400", bgColor: "bg-blue-50" },
                  { label: "Type de toit", weight: "15%", desc: "Incliné (95/100) > Plat (80/100)", color: "bg-purple-400", bgColor: "bg-purple-50" },
                  { label: "Adéquation consommation", weight: "20%", desc: "Le système couvre-t-il votre besoin?", color: "bg-green-400", bgColor: "bg-green-50" },
                ].map((f) => (
                  <div key={f.label} className={`${f.bgColor} rounded-lg p-3 flex items-center gap-4`}>
                    <div className={`w-2 h-10 ${f.color} rounded-full`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-700">{f.label}</span>
                        <span className="text-sm font-extrabold text-gray-900">{f.weight}</span>
                      </div>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-red-50 rounded-lg p-2"><div className="font-bold text-red-600">0–39</div><div className="text-red-400">Faible</div></div>
                <div className="bg-yellow-50 rounded-lg p-2"><div className="font-bold text-yellow-600">40–54</div><div className="text-yellow-500">Moyen</div></div>
                <div className="bg-blue-50 rounded-lg p-2"><div className="font-bold text-blue-600">55–69</div><div className="text-blue-500">Bon</div></div>
                <div className="bg-green-50 rounded-lg p-2"><div className="font-bold text-green-600">70–100</div><div className="text-green-500">Excellent</div></div>
              </div>
            </div>
          </section>

          {/* Section 6: Dashboard */}
          <section id="dashboard" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">🖥</span>
              6. Tableau de Bord
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-600 leading-relaxed mb-4">
                Le tableau de bord de simulation comprend :
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">📍</span>
                  <div><strong className="text-gray-800">Carte interactive</strong><p className="text-xs text-gray-500">Sélection GPS via clic ou recherche. La latitude détermine la zone solaire.</p></div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">📝</span>
                  <div><strong className="text-gray-800">Formulaire personnalisé</strong><p className="text-xs text-gray-500">Surface toiture (m²), type de toit, consommation annuelle (kWh), coût annuel (DA, optionnel).</p></div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">🔄</span>
                  <div><strong className="text-gray-800">Calcul en temps réel</strong><p className="text-xs text-gray-500">L&apos;algorithme traite en ~1.2s et ouvre le modal des résultats automatiquement.</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Results Modal */}
          <section id="resultats" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">📋</span>
              7. Modal des Résultats
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <p className="text-gray-600 leading-relaxed mb-4">
                Le modal affiche 8 sections interactives :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "📊", title: "Métriques clés", desc: "Panneaux, coût, couverture, amortissement" },
                  { icon: "🔄", title: "Flux énergétique", desc: "Solar → Maison → Réseau en temps réel" },
                  { icon: "🎯", title: "Score Solaire", desc: "Jauge circulaire 0–100 avec breakdown" },
                  { icon: "🗺", title: "Comparaison Algérie", desc: "Votre ville vs 4 régions solaires" },
                  { icon: "🔧", title: "Durée de vie", desc: "25 ans, dégradation 0.5%/an" },
                  { icon: "📈", title: "Projection financière", desc: "Timeline ROI avec break-even" },
                  { icon: "📉", title: "Graphique mensuel", desc: "Production kWh par mois sur 25 ans" },
                  { icon: "📱", title: "Actions", desc: "Imprimer le rapport, réserver un appel WhatsApp" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-700">{item.title}</div>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: Sources */}
          <section id="sources" className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center text-lg">📚</span>
              8. Sources & Références
            </h3>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>Atlas Solaire Algérien</strong> — Centre de Développement des Énergies Renouvelables (CDER), données d&apos;irradiance par wilaya</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>Sonelgaz</strong> — Grille tarifaire de l&apos;électricité résidentielle en Algérie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>IEA PVPS</strong> — Performance Ratio standards pour systèmes photovoltaïques (0.75–0.85)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>IRENA</strong> — Coûts des installations solaires en Afrique du Nord (2023–2024)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <span><strong>Facteur CO₂</strong> — 0.5 kg CO₂/kWh basé sur le mix énergétique algérien (gaz naturel dominant)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8">
            <Link
              href="/simulation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl text-lg font-semibold shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-500 transition-all active:scale-95"
            >
              Lancer ma simulation →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
