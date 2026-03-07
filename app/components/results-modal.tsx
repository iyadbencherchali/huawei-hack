"use client"

import { useRef } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Printer, Phone, MapPin } from "lucide-react"
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
              <div className="bg-[#050035] rounded-3xl p-8 md:p-12 mb-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                      Rapport d&apos;Analyse
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-3 text-white tracking-tight">Performance <span className="text-orange-400">Solaire.</span></h2>
                    <p className="text-blue-100/60 font-medium flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-orange-400" />
                       {simulationData?.location?.city || simulationData?.location?.address || "Algérie"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-center">
                      <div className="text-[10px] text-blue-200/50 font-black uppercase tracking-widest mb-1">Précision</div>
                      <div className="text-3xl font-black text-emerald-400">{simulationData?.confidenceScore || 87}%</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-center">
                      <div className="text-[10px] text-blue-200/50 font-black uppercase tracking-widest mb-1">Système</div>
                      <div className="text-3xl font-black text-white">{simulationData?.systemSizeKw?.toFixed(1) || "3.0"} <span className="text-sm opacity-40">kW</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key metrics - 4 premium cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Card 1: Installation */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#050035] flex items-center justify-center font-black">
                      01
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Installation</span>
                  </div>
                  <div className="text-4xl font-black text-[#050035] mb-2 relative z-10 tracking-tighter">
                    {simulationData?.panels} <span className="text-sm font-bold text-gray-300 uppercase">Panneaux</span>
                  </div>
                  <p className="text-[10px] text-gray-400 relative z-10 font-bold uppercase tracking-wider">Système {simulationData?.systemSizeKw?.toFixed(1)} kW</p>
                </div>

                {/* Card 2: Cost */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-100 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black">
                      02
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Investissement</span>
                  </div>
                  <div className="text-4xl font-black text-orange-500 mb-2 relative z-10 tracking-tighter">
                    {simulationData?.cost} <span className="text-sm font-bold text-gray-300 uppercase">DA</span>
                  </div>
                  <p className="text-[10px] text-gray-400 relative z-10 font-bold uppercase tracking-wider">Économie: {simulationData?.annualSavings}/an</p>
                </div>

                {/* Card 3: Energy Coverage */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                      03
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Autonomie</span>
                  </div>
                  <div className="text-4xl font-black text-emerald-600 mb-2 relative z-10 tracking-tighter">
                    {simulationData?.energyCoverage || 0}<span className="text-lg opacity-40">%</span>
                  </div>
                  <p className="text-[10px] text-gray-400 relative z-10 font-bold uppercase tracking-wider">Couverture de consommation</p>
                </div>

                {/* Card 4: ROI */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-900/10 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#050035] text-white flex items-center justify-center font-black">
                      04
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Rentabilité</span>
                  </div>
                  <div className="text-4xl font-black text-[#050035] mb-2 relative z-10 tracking-tighter">
                    {simulationData?.roi}
                  </div>
                  <p className="text-[10px] text-gray-400 relative z-10 font-bold uppercase tracking-wider">Temps d&apos;amortissement</p>
                </div>
              </div>

              {/* Energy Flow Visual */}
              <div className="bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-10 mb-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl opacity-20"></div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Architecture du Flux Énergétique</h3>
                <div className="flex items-center justify-between gap-4">
                  {/* Solar */}
                  <div className="flex-1 text-center group">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-orange-50">
                      <span className="text-3xl">☀️</span>
                    </div>
                    <div className="text-sm font-black text-[#050035] mb-1">Production</div>
                    <div className="text-xs font-bold text-orange-500">{(simulationData?.annualProductionKwh || 0).toLocaleString()} <span className="opacity-50">kWh/an</span></div>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <ChevronLeft className="w-8 h-8 text-orange-400 rotate-180 animate-pulse" />
                  </div>
                  {/* Home */}
                  <div className="flex-1 text-center group">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-50">
                      <span className="text-3xl">🏠</span>
                    </div>
                    <div className="text-sm font-black text-[#050035] mb-1">Maison</div>
                    <div className="text-xs font-bold text-blue-600">{(simulationData?.annualConsumptionKwh || 0).toLocaleString()} <span className="opacity-50">kWh/an</span></div>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <ChevronLeft className="w-8 h-8 text-blue-400 rotate-180" />
                  </div>
                  {/* Grid */}
                  <div className="flex-1 text-center group">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-50">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <div className="text-sm font-black text-[#050035] mb-1">Réseau</div>
                    <div className="text-xs font-bold text-emerald-600">
                      {(simulationData?.energyCoverage || 0) > 100 
                        ? `+${((simulationData?.annualProductionKwh || 0) - (simulationData?.annualConsumptionKwh || 0)).toLocaleString()} Surplus`
                        : `${((simulationData?.annualConsumptionKwh || 0) - (simulationData?.annualProductionKwh || 0)).toLocaleString()} Apport`
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Score + Algeria Comparison Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Solar Potential Score */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Indice de Rayonnement</h3>
                  <div className="flex items-center gap-8">
                    {/* Circular gauge */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="#f3f4f6" strokeWidth="10" fill="none" />
                        <circle
                          cx="50" cy="50" r="42"
                          stroke={
                            (simulationData?.solarScore || 0) >= 85 ? '#10b981' :
                            (simulationData?.solarScore || 0) >= 70 ? '#f97316' : '#eab308'
                          }
                          strokeWidth="10" fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${((simulationData?.solarScore || 0) / 100) * 264} 264`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-[#050035]">{simulationData?.solarScore || 0}</span>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">/100</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-black mb-2 ${(simulationData?.solarScore || 0) >= 70 ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {simulationData?.solarScoreLabel || 'Potentiel Élevé'}
                      </div>
                      <p className="text-xs text-gray-500 mb-4 font-medium leading-relaxed">Le potentiel solaire de votre zone géographique est optimal pour une installation photovoltaïque rentable.</p>
                      {/* Factor breakdown */}
                      <div className="space-y-2">
                        {[
                          { label: 'Irradiance Locale', w: 85, color: 'bg-orange-400' },
                          { label: 'Efficacité Système', w: 80, color: 'bg-blue-400' },
                        ].map((f) => (
                          <div key={f.label} className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-50 rounded-full h-1.5 p-0.5 border border-gray-100">
                              <div className={`${f.color} h-0.5 rounded-full`} style={{ width: `${f.w}%` }}></div>
                            </div>
                            <span className="text-[9px] font-black text-gray-400 uppercase w-24 text-right">{f.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Algeria Solar Comparison */}
                <div className="bg-[#050035] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-white">
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
                  <h3 className="text-[10px] font-black text-blue-300/40 uppercase tracking-[0.3em] mb-8">Analyse Comparative Régionale</h3>
                  <div className="space-y-5">
                    {[
                      { city: 'Tamanrasset', value: 2300, zone: 'sahara' },
                      { city: 'Ghardaïa', value: 2100, zone: 'south' },
                      { city: 'Alger', value: 1700, zone: 'north' },
                    ].map((item) => {
                      const isCurrentZone = item.zone === simulationData?.solarZone;
                      const pct = Math.round((item.value / 2300) * 100);
                      return (
                        <div key={item.city}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-black uppercase tracking-widest ${isCurrentZone ? 'text-orange-400' : 'text-blue-200/50'}`}>
                              {item.city} {isCurrentZone && '← PROJET'}
                            </span>
                            <span className={`text-xs font-black ${isCurrentZone ? 'text-white' : 'text-blue-200/30'}`}>
                              {item.value.toLocaleString()} <span className="opacity-30">kWh/kW</span>
                            </span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ${isCurrentZone ? 'bg-orange-400 shadow-[0_0_10px_#f97316]' : 'bg-white/10'}`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Performance & Financial Projections Title */}
              <div className="flex items-center gap-4 mb-8">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Performances & Projections</h3>
                 <div className="flex-1 h-px bg-gray-100"></div>
              </div>

              {/* Chart and Info Box */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <SolarCharts monthlyGenerationMwh={simulationData?.monthlyGenerationMwh} />
                </div>

                <div className="bg-[#050035] rounded-[2.5rem] p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400 mb-8 backdrop-blur border border-white/10">
                      <Phone className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 leading-tight">Expertise <br/>Sur Site.</h3>
                    <p className="text-blue-100/60 text-sm leading-relaxed mb-8 font-medium">
                      Cette estimation satellite est précise à 87%. Une visite technique gratuite de nos experts est nécessaire pour finaliser votre devis.
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[
                        'Étude de structure toiture',
                        'Analyse du raccordement',
                        'Optimisation de l&apos;ombrage'
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-bold text-blue-100/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={handleReserveCall} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-8 font-black text-lg shadow-xl shadow-orange-500/20 group relative overflow-hidden border-0">
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                       Réserver Expert <ChevronLeft size={20} className="rotate-180" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  ID Simulation: #{Math.random().toString(36).substr(2, 9).toUpperCase()} • 2026
                </p>
                <div className="flex gap-4">
                  <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#050035] px-6" onClick={handlePrint}>
                    <Printer className="mr-3 h-4 w-4" /> Version Imprimable
                  </Button>
                  <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#050035] hover:bg-gray-50 px-6" onClick={onClose}>
                    Fermer le Rapport
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}