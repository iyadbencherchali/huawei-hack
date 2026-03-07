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
              {/* Simple Header */}
              <div className="bg-[#050035] rounded-2xl p-8 mb-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Résultats de Simulation</h2>
                    <p className="text-blue-200 flex items-center gap-2 text-sm">
                       <MapPin className="w-4 h-4" />
                       {simulationData?.location?.city || simulationData?.location?.address || "Algérie"}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-white/10 rounded-xl px-5 py-3 text-center border border-white/10">
                      <div className="text-[10px] text-blue-200/60 font-bold uppercase tracking-wider mb-1">Précision</div>
                      <div className="text-2xl font-bold text-emerald-400">{simulationData?.confidenceScore || 87}%</div>
                    </div>
                    <div className="bg-white/10 rounded-xl px-5 py-3 text-center border border-white/10">
                      <div className="text-[10px] text-blue-200/60 font-bold uppercase tracking-wider mb-1">Capacité</div>
                      <div className="text-2xl font-bold text-white">{simulationData?.systemSizeKw?.toFixed(1) || "3.0"} kW</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Panneaux", value: simulationData?.panels, unit: "Unités", color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Investissement", value: simulationData?.cost, unit: "DA", color: "text-orange-600", bg: "bg-orange-50" },
                  { label: "Autonomie", value: `${simulationData?.energyCoverage || 0}%`, unit: "", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "ROI", value: simulationData?.roi, unit: "", color: "text-gray-900", bg: "bg-gray-50" }
                ].map((kpi, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{kpi.label}</div>
                    <div className={`text-3xl font-bold ${kpi.color} mb-1 tracking-tight`}>
                      {kpi.value} <span className="text-sm font-bold text-gray-300 uppercase">{kpi.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content: Chart & Expert */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-6">Production Mensuelle Éstimée</h3>
                  <SolarCharts monthlyGenerationMwh={simulationData?.monthlyGenerationMwh} />
                </div>

                <div className="bg-[#050035] rounded-2xl p-8 text-white shadow-lg flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Étude Technique</h3>
                    <p className="text-blue-200/70 text-sm mb-6">
                      Une visite sur site est nécessaire pour valider la structure de votre toiture et optimiser l'installation.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {['Structure de toiture', 'Raccordement électrique', 'Analyse d\'ombrage'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs font-medium text-blue-100/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={handleReserveCall} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 font-bold text-base shadow-lg shadow-orange-500/20 border-0 transition-all hover:scale-[1.02]">
                    Réserver Expert →
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