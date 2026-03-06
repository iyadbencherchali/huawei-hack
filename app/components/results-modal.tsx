"use client"

import { useRef } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Printer, Phone } from "lucide-react"
import { SolarCharts } from "./solar-charts"
import Image from "next/image"

interface ResultsModalProps {
  open: boolean
  onClose: () => void
  simulationData: any
  loading: boolean
}

export function ResultsModal({ open, onClose, simulationData, loading }: ResultsModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handleReserveCall = () => {
    const phoneNumber = "213550555555"
    const message = `Bonjour, je souhaite réserver un appel pour une simulation solaire personnalisée.${simulationData ? `\n\nDétails de ma simulation:\n- Nombre de panneaux: ${simulationData.panels}\n- Capacité: ${simulationData.capacity}\n- Coût: ${simulationData.cost}\n- ROI: ${simulationData.roi}` : ''}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!open) return null

  const handlePrint = () => {
    const content = printRef.current
    if (!content) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      alert("Veuillez autoriser les fenêtres pop-up pour imprimer")
      return
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Résultats de Simulation Pulse.dz</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
            }
            .logo-accent {
              color: #FFAA00;
            }
            .logo-primary {
              color: #050035;
            }
            h1 {
              color: #050035;
              margin-top: 10px;
            }
            .metrics {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              border: 1px solid #eee;
              border-radius: 8px;
              overflow: hidden;
            }
            .metric {
              flex: 1;
              padding: 15px;
              border-right: 1px solid #eee;
            }
            .metric:last-child {
              border-right: none;
            }
            .metric-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #FFAA00;
            }
            .metric-desc {
              font-size: 12px;
              color: #999;
            }
            .note {
              margin-top: 30px;
              padding: 15px;
              background-color: #f9f9f9;
              border-radius: 8px;
              font-size: 14px;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
              <span class="logo-accent">Pulse</span><span class="logo-primary">.dz</span>
            </div>
            <h1>Résultats de votre simulation solaire</h1>
          </div>
          
          <div class="metrics">
            <div class="metric">
              <div class="metric-label">Nombre de panneaux</div>
              <div class="metric-value">${simulationData?.panels || 30}</div>
              <div class="metric-desc">Nécessaire pour couvrir votre consommation</div>
            </div>
            
            <div class="metric">
              <div class="metric-label">Coût de l'installation</div>
              <div class="metric-value">${simulationData?.cost || "2 500 000"} DA</div>
              <div class="metric-desc">Investissement pour votre transition énergétique</div>
            </div>
            
            <div class="metric">
              <div class="metric-label">Retour sur investissement</div>
              <div class="metric-value">${simulationData?.roi || "5 ans"}</div>
              <div class="metric-desc">suivi de 20 ans d'électricité gratuite</div>
            </div>
          </div>
          
          <div class="note">
            <p><strong>Note:</strong> Cette simulation est basée sur les informations que vous avez fournies et représente une estimation. Pour une analyse plus précise, veuillez nous contacter pour une étude personnalisée.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Pulse.dz. Tous droits réservés.</p>
            <p>Contact: pulse.dz.contact@gmail.com | Tél: 0550 55 55 55</p>
            <p>Alger, bab ezzouar, usthb, startp hall</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    printWindow.onload = () => {
      printWindow.print()
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="p-6 md:p-8" ref={printRef}>
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-primary font-medium">Calcul de votre simulation en cours...</p>
              <p className="text-sm text-gray-500 mt-2">Nous analysons les données solaires de votre région</p>
            </div>
          ) : (
            <div>
              {/* Premium Header */}
              <div className="bg-gradient-to-r from-[#050035] to-blue-900 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF8A00]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Résultats de votre Simulation</h2>
                    <p className="text-blue-100 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {simulationData?.location?.city || simulationData?.location?.address || "Algérie"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Confidence Score Badge */}
                    <div className="bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl px-4 py-3 text-center">
                      <div className="text-xs text-green-200 font-medium mb-1">Précision</div>
                      <div className="text-xl font-bold text-green-400">{simulationData?.confidenceScore || 87}%</div>
                    </div>
                    {/* System Size */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-center">
                      <div className="text-xs text-blue-200 font-medium mb-1">Système</div>
                      <div className="text-xl font-bold text-white">{simulationData?.systemSizeKw?.toFixed(1) || "3.0"} kW</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key metrics - 4 premium cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Card 1: Installation */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Installation</span>
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1 relative z-10 tracking-tight">
                    {simulationData?.panels} <span className="text-lg font-medium text-gray-400 -ml-1">panneaux</span>
                  </div>
                  <p className="text-xs text-gray-500 relative z-10 font-medium">Système {simulationData?.systemSizeKw?.toFixed(1)} kW • 550W/panneau</p>
                </div>

                {/* Card 2: Cost */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-100 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF8A00] flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Investissement</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[#FF8A00] mb-1 relative z-10 tracking-tight">
                    {simulationData?.cost} <span className="text-lg font-medium text-gray-400">DA</span>
                  </div>
                  <p className="text-xs text-gray-500 relative z-10 font-medium">Économie: {simulationData?.annualSavings}/an</p>
                </div>

                {/* Card 3: Energy Coverage */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-100 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Couverture</span>
                  </div>
                  <div className="text-3xl font-extrabold text-purple-600 mb-1 relative z-10 tracking-tight">
                    {simulationData?.energyCoverage || 0}<span className="text-lg font-medium text-gray-400">%</span>
                  </div>
                  <p className="text-xs text-gray-500 relative z-10 font-medium">De votre consommation couverte</p>
                </div>

                {/* Card 4: ROI */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Amortissement</span>
                  </div>
                  <div className="text-3xl font-extrabold text-green-500 mb-1 relative z-10 tracking-tight">
                    {simulationData?.roi}
                  </div>
                  <p className="text-xs text-gray-500 relative z-10 font-medium">Suivi de +20 ans gratuit</p>
                </div>
              </div>

              {/* Energy Flow Visual */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-5">Flux Énergétique</h3>
                <div className="flex items-center justify-between gap-2">
                  {/* Solar */}
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-2">
                      <span className="text-2xl">☀️</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800">Panneaux</div>
                    <div className="text-xs font-semibold text-[#FF8A00]">{(simulationData?.annualProductionKwh || 0).toLocaleString()} kWh/an</div>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <svg className="w-8 h-8 text-[#FF8A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-[10px] text-gray-400 font-medium">Production</span>
                  </div>
                  {/* Home */}
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-2">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800">Maison</div>
                    <div className="text-xs font-semibold text-blue-600">{(simulationData?.annualConsumptionKwh || 0).toLocaleString()} kWh/an</div>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-[10px] text-gray-400 font-medium">Surplus</span>
                  </div>
                  {/* Grid */}
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-2">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800">Réseau</div>
                    <div className="text-xs font-semibold text-emerald-600">
                      {(simulationData?.energyCoverage || 0) > 100 
                        ? `+${((simulationData?.annualProductionKwh || 0) - (simulationData?.annualConsumptionKwh || 0)).toLocaleString()} kWh`
                        : `${((simulationData?.annualConsumptionKwh || 0) - (simulationData?.annualProductionKwh || 0)).toLocaleString()} kWh`
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Score + Algeria Comparison Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Solar Potential Score */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative overflow-hidden">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-5">☀ Score Solaire</h3>
                  <div className="flex items-center gap-6">
                    {/* Circular gauge */}
                    <div className="relative w-28 h-28 flex-shrink-0">
                      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                        <circle
                          cx="50" cy="50" r="42"
                          stroke={
                            (simulationData?.solarScore || 0) >= 85 ? '#22c55e' :
                            (simulationData?.solarScore || 0) >= 70 ? '#FF8A00' :
                            (simulationData?.solarScore || 0) >= 55 ? '#eab308' : '#ef4444'
                          }
                          strokeWidth="8" fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${((simulationData?.solarScore || 0) / 100) * 264} 264`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-gray-900">{simulationData?.solarScore || 0}</span>
                        <span className="text-xs text-gray-400 font-medium">/100</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-lg font-bold mb-2 ${(simulationData?.solarScore || 0) >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {simulationData?.solarScoreLabel || 'N/A'}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Potentiel solaire de votre toiture</p>
                      {/* Factor breakdown */}
                      <div className="space-y-1.5">
                        {[
                          { label: 'Ensoleillement', w: 40, color: 'bg-yellow-400' },
                          { label: 'Surface toit', w: 25, color: 'bg-blue-400' },
                          { label: 'Type de toit', w: 15, color: 'bg-purple-400' },
                          { label: 'Adéquation conso.', w: 20, color: 'bg-green-400' },
                        ].map((f) => (
                          <div key={f.label} className="flex items-center gap-2 text-[10px]">
                            <span className="text-gray-500 w-24 truncate">{f.label}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                              <div className={`${f.color} h-1.5 rounded-full`} style={{ width: `${f.w * 2.5}%` }}></div>
                            </div>
                            <span className="text-gray-400 w-6 text-right">{f.w}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Algeria Solar Comparison */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-5">Comparaison Solaire Algérie</h3>
                  <div className="space-y-4">
                    {[
                      { city: 'Tamanrasset', value: 2300, zone: 'sahara' },
                      { city: 'Ghardaïa', value: 2100, zone: 'south' },
                      { city: 'Djelfa', value: 1900, zone: 'hauts' },
                      { city: 'Alger', value: 1700, zone: 'north' },
                    ].map((item) => {
                      const isCurrentZone = item.zone === simulationData?.solarZone;
                      const pct = Math.round((item.value / 2300) * 100);
                      return (
                        <div key={item.city}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${isCurrentZone ? 'text-[#FF8A00] font-bold' : 'text-gray-700'}`}>
                              {item.city} {isCurrentZone && '← Vous'}
                            </span>
                            <span className={`text-sm font-bold ${isCurrentZone ? 'text-[#FF8A00]' : 'text-gray-500'}`}>
                              {item.value.toLocaleString()} kWh/kW/an
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${isCurrentZone ? 'bg-[#FF8A00]' : 'bg-gray-300'}`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-[10px] text-gray-400 mt-2">Source: Atlas Solaire Algérien (CDER)</p>
                  </div>
                </div>
              </div>

              {/* System Health + ROI Timeline Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* System Health */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-5">🔧 Durée de Vie</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-extrabold text-blue-700">25</div>
                      <div className="text-[10px] text-blue-500 font-semibold mt-1">Années</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-extrabold text-[#FF8A00]">0.5%</div>
                      <div className="text-[10px] text-orange-500 font-semibold mt-1">Dégradation/an</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <div className="text-2xl font-extrabold text-green-600">88%</div>
                      <div className="text-[10px] text-green-500 font-semibold mt-1">Perf. à 25 ans</div>
                    </div>
                  </div>
                  {/* Degradation bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>An 1: 100%</span>
                      <span>An 10: 95%</span>
                      <span>An 25: 88%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 relative overflow-hidden">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-orange-400" style={{ width: '100%' }}></div>
                      <div className="absolute right-0 top-0 h-full bg-gray-100" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>

                {/* ROI Financial Timeline */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-5">📈 Projection Financière</h3>
                  {(() => {
                    const cost = simulationData?.totalCostDa || 0;
                    const savings = simulationData?.annualSavingsDa || 0;
                    const roiY = simulationData?.roiYearsRaw || 99;
                    const breakEvenYear = Math.ceil(roiY);
                    const profitAt25 = savings > 0 ? (savings * 25) - cost : 0;

                    const milestones = [
                      { year: 0, label: 'Installation', value: -cost, color: 'text-red-500' },
                      { year: Math.min(10, breakEvenYear), label: `Année ${Math.min(10, breakEvenYear)}`, value: (savings * Math.min(10, breakEvenYear)) - cost, color: (savings * Math.min(10, breakEvenYear)) - cost >= 0 ? 'text-green-500' : 'text-red-500' },
                      { year: breakEvenYear, label: `Break-even (An ${breakEvenYear})`, value: 0, color: 'text-[#FF8A00]' },
                      { year: 25, label: 'Année 25', value: profitAt25, color: 'text-green-600' },
                    ];

                    // Remove duplicates by year
                    const unique = milestones.filter((m, i, arr) => i === arr.findIndex(a => a.year === m.year));

                    return (
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                        <div className="space-y-4">
                          {unique.map((m, i) => (
                            <div key={i} className="flex items-start gap-4 relative">
                              <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 z-10 flex items-center justify-center ${
                                m.year === breakEvenYear ? 'border-[#FF8A00] bg-orange-50' :
                                m.year === 0 ? 'border-red-400 bg-red-50' : 'border-green-400 bg-green-50'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  m.year === breakEvenYear ? 'bg-[#FF8A00]' :
                                  m.year === 0 ? 'bg-red-400' : 'bg-green-400'
                                }`}></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-gray-700">{m.label}</div>
                                <div className={`text-sm font-bold ${m.color}`}>
                                  {m.year === breakEvenYear && m.year !== 0 ? 'Rentabilisé ✓' :
                                    `${m.value >= 0 ? '+' : ''}${m.value.toLocaleString()} DA`}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Chart and Info Box */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-6 mb-8">
                <SolarCharts
                  monthlyGenerationMwh={simulationData?.monthlyGenerationMwh}
                />

                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 sm:p-8 flex flex-col justify-center shadow-sm relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-5">
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v2M12 19v2M3 12H1m22 0h-2m-3.414-6.586l1.414-1.414M5.414 17.586l-1.414 1.414M18.586 18.586l1.414 1.414M5.414 5.414L4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /></svg>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Passez au Solaire</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">
                      Cette estimation est calculée selon l&apos;ensoleillement moyen de votre région. Un ingénieur de <span className="text-black font-bold">Pulse.dz</span> peut affiner cette étude avec une visite technique gratuite.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="font-medium">Sans engagement</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="font-medium">Devis précis en 24h</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="font-medium">Assistance Mourabaha</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center mt-auto opacity-70 relative z-10">
                    <Image
                      src="/images/logo.png"
                      alt="Pulse.dz"
                      width={120}
                      height={40}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end mt-8 gap-4">
                <Button variant="outline" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-50 rounded-lg px-6" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" /> Imprimer
                </Button>
                <Button onClick={handleReserveCall} className="bg-[#050035] hover:bg-[#050035]/90 text-white rounded-lg px-6">
                  <Phone className="mr-2 h-4 w-4" /> Réservez Un Appel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}