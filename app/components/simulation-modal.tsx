"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, Sun, Home, Zap, TrendingUp, Grid3x3 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SimpleMap from "./simple-map";
import { SolarCharts } from "./solar-charts";

// 🇩🇿 Monthly solar distribution
const MONTHLY_SOLAR_DISTRIBUTION = [
  0.055, 0.065, 0.085, 0.095, 0.115, 0.125,
  0.120, 0.110, 0.090, 0.070, 0.045, 0.025
];

interface SimulationModalProps {
  open: boolean;
  onClose: () => void;
}

export function SimulationModal({ open, onClose }: SimulationModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [simulationData, setSimulationData] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [roofType, setRoofType] = useState("");
  const [consumption, setConsumption] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setSimulationData(null);
      setLoading(false);
      setSelectedLocation(null);
    }
  }, [open]);

  const handleSelectLocation = useCallback((location: { lat: number; lng: number }) => {
    setSelectedLocation({ lat: location.lat, lng: location.lng });
  }, []);

  const MapComponent = useCallback(() => (
    <SimpleMap 
      onSelectLocation={handleSelectLocation} 
      selectedLocation={selectedLocation} 
      className="w-full h-full" 
    />
  ), [handleSelectLocation, selectedLocation]);

  const handleReserveCall = useCallback(() => {
    const phoneNumber = "213550555555";
    const message = `Bonjour, je souhaite réserver un appel pour une simulation solaire personnalisée.${simulationData ? `\n\nDétails:\n- Panneaux: ${simulationData.panels}\n- Capacité: ${simulationData.capacity}\n- Coût: ${simulationData.cost}\n- ROI: ${simulationData.roi}` : ''}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }, [simulationData]);

  const runSimulation = () => {
    if (!selectedLocation) {
      alert("Veuillez sélectionner un emplacement sur la carte");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const roofAreaValue = parseFloat(roofArea) || 0;
      const consumptionValue = parseFloat(consumption) || 0;
      const costValue = parseFloat(cost) || 0;

      if (roofAreaValue <= 0) {
        alert("Surface de toiture invalide");
        setLoading(false);
        return;
      }

      // Calculations
      const panelsPerM2 = roofType === "inclined" ? 0.34 : 0.3;
      let panels = Math.floor(roofAreaValue * panelsPerM2);
      if (panels < 1) panels = 1;

      const PANEL_POWER_W = 720;
      const PANEL_ANNUAL_PRODUCTION_KWH = 1150;
      const COST_PER_WATT_DA = 60;

      const systemPowerW = panels * PANEL_POWER_W;
      const systemPowerKw = systemPowerW / 1000;
      const systemPowerMw = systemPowerKw / 1000;

      const annualProductionKwh = panels * PANEL_ANNUAL_PRODUCTION_KWH;
      const totalCostDa = systemPowerW * COST_PER_WATT_DA;

      const effectiveRate = costValue > 0 && consumptionValue > 0 
        ? costValue / consumptionValue 
        : 4.179;
      const offsetKwh = Math.min(annualProductionKwh, consumptionValue);
      const annualSavingsDa = offsetKwh * effectiveRate;

      let roiDisplay = "N/A";
      if (annualSavingsDa > 0) {
        const roiYears = totalCostDa / annualSavingsDa;
        if (roiYears < 1) {
          roiDisplay = `${Math.round(roiYears * 12)} mois`;
        } else {
          const years = Math.floor(roiYears);
          const months = Math.round((roiYears - years) * 12);
          roiDisplay = months === 0 
            ? `${years} an${years > 1 ? 's' : ''}` 
            : `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
        }
      } else if (annualSavingsDa === 0) {
        roiDisplay = "Non rentable";
      }

      const monthlyGenerationKwh = MONTHLY_SOLAR_DISTRIBUTION.map(pct => 
        Math.round(annualProductionKwh * pct)
      );
      const monthlyGenerationMwh = monthlyGenerationKwh.map(kwh => kwh / 1000);

      setSimulationData({
        panels,
        capacity: systemPowerMw >= 1 
          ? `${systemPowerMw.toFixed(1)} MW` 
          : `${systemPowerKw.toFixed(1)} kW`,
        cost: totalCostDa.toLocaleString('fr-DZ'),
        roi: roiDisplay,
        annualSavings: `${Math.round(annualSavingsDa).toLocaleString()} DA`,
        monthlyGenerationMwh,
        location: selectedLocation,
      });

      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-7xl">
      {/* Logo */}
      <div className="absolute top-6 left-8 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-[#FF8A00] to-[#FFB347] rounded-xl flex items-center justify-center shadow-lg">
            <Sun className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-2xl text-gray-900">SolaireAlgérie</span>
            <p className="text-xs text-gray-500 -mt-1">Énergie propre pour votre avenir</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF8A00] to-[#FFB347] bg-clip-text text-transparent">
            Simulation Solaire Personnalisée
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 1 && (
          <div className="flex flex-col lg:flex-row">
            {/* Left panel - Form */}
            <div className="lg:w-2/5 p-8 border-r">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Informations de base</h3>
                <p className="text-gray-600">Remplissez ces détails pour une simulation précise</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">1</span>
                    </div>
                    Nom et prénom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Laichi Chanez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 px-4"
                  />
                </div>

                <div>
                  <label htmlFor="roofArea" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">2</span>
                    </div>
                    Surface de toiture (m²) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="roofArea"
                      type="text"
                      placeholder="ex. 1000"
                      value={roofArea}
                      onChange={(e) => setRoofArea(e.target.value)}
                      className="w-full py-3 pl-12 pr-4"
                    />
                    <Home className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="roofType" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">3</span>
                    </div>
                    Type de toiture <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRoofType("flat")}
                      className={`p-4 rounded-lg border-2 transition-all ${roofType === "flat" ? "border-[#FF8A00] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="text-left">
                        <div className="h-10 mb-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded"></div>
                        <p className="font-medium">Toit plat</p>
                        <p className="text-xs text-gray-500">Plus d'espace</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoofType("inclined")}
                      className={`p-4 rounded-lg border-2 transition-all ${roofType === "inclined" ? "border-[#FF8A00] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="text-left">
                        <div className="h-10 mb-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded transform -skew-y-6"></div>
                        <p className="font-medium">Toit incliné</p>
                        <p className="text-xs text-gray-500">Meilleur angle</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="consumption" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">4</span>
                    </div>
                    Consommation (kWh/an) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="consumption"
                      type="text"
                      placeholder="ex. 15000"
                      value={consumption}
                      onChange={(e) => setConsumption(e.target.value)}
                      className="w-full py-3 pl-12 pr-4"
                    />
                    <Zap className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cost" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs">5</span>
                    </div>
                    Coût annuel (DA) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="cost"
                      type="text"
                      placeholder="ex. 200000"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-full py-3 pl-12 pr-4"
                    />
                    <TrendingUp className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={runSimulation}
                    className="w-full py-6 bg-gradient-to-r from-[#FF8A00] to-[#FFB347] hover:from-[#FF9A20] hover:to-[#FF8A00] text-white text-lg font-semibold shadow-lg hover:shadow-xl"
                    disabled={!selectedLocation || !name || !roofArea || !roofType || !consumption || !cost}
                  >
                    {!selectedLocation ? "Sélectionnez un emplacement" : "Lancer la simulation"}
                  </Button>
                </div>

                {selectedLocation && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                      Emplacement: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel - Map */}
            <div className="lg:w-3/5 h-[700px] relative">
              <div className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Sélectionnez votre emplacement</h4>
                    <p className="text-sm text-gray-600">
                      Cliquez sur la carte pour indiquer l&apos;emplacement de votre bâtiment.
                    </p>
                  </div>
                </div>
              </div>
              <MapComponent />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {loading ? (
              <div className="p-16 text-center">
                <div className="inline-flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF8A00]"></div>
                </div>
                <p className="text-xl font-semibold text-gray-800 mt-6">Calcul de votre simulation...</p>
                <p className="text-gray-500 mt-2">Analyse des données solaires pour l&apos;Algérie</p>
              </div>
            ) : (
              <div className="p-8">
                {/* Results Summary */}
              // In simulation-modal.tsx, find the results section and update:
<div className="grid grid-cols-3 gap-6 mb-8">
  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-2">
      {/* Nombre de panneaux icon */}
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <span className="text-sm text-gray-600">Nombre de panneaux</span>
    </div>
    <div className="text-3xl font-bold text-[#FF8A00] mb-1">{simulationData?.panels}</div>
    <p className="text-xs text-gray-500">Nécessaire pour couvrir votre consommation</p>
  </div>

  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-2">
      {/* Coût de l'installation icon */}
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm text-gray-600">Coût de l&apos;installation</span>
    </div>
    <div className="text-3xl font-bold text-[#FF8A00] mb-1">{simulationData?.cost} DA</div>
    <p className="text-xs text-gray-500">Investissement pour votre transition énergétique</p>
  </div>

  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
    <div className="flex items-center gap-3 mb-2">
      {/* Retour sur investissement icon */}
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
      <span className="text-sm text-gray-600">Retour sur investissement</span>
    </div>
    <div className="text-3xl font-bold text-[#FF8A00] mb-1">{simulationData?.roi}</div>
    <p className="text-xs text-gray-500">suivi de 20 ans d&apos;électricité gratuite</p>
  </div>
</div>

                {/* Chart and Info Section */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <SolarCharts monthlyGenerationMwh={simulationData?.monthlyGenerationMwh} />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-dashed border-orange-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-800 mb-3">Cette simulation est là pour vous donner une <span className="text-[#FF8A00]">estimation approximative</span> !</h4>
                      <p className="text-sm text-gray-700 mb-4">C&apos;est un bon point de départ, mais rien de précis à ce stade.</p>
                      <p className="text-sm text-gray-700 mb-4">Pour une simulation vraiment <span className="font-semibold">personnalisée</span> (et plus fiable), on passe à l&apos;étape suivante <span className="font-semibold">ensemble</span>.</p>
                      <p className="text-sm text-gray-700">On s&apos;occupe de tous 👋</p>
                      
                      <div className="mt-6 flex justify-center">
                        <svg className="h-32 w-32" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="35" fill="#FF8A00" opacity="0.1"/>
                          <path d="M50 20 L65 35 L60 35 L60 50 L70 50 L70 65 L55 65 L55 80 L45 80 L45 65 L30 65 L30 50 L40 50 L40 35 L35 35 Z" fill="#FF8A00"/>
                          <circle cx="50" cy="50" r="8" fill="#1F2937"/>
                          {[...Array(8)].map((_, i) => {
                            const angle = (i * 45 - 90) * Math.PI / 180;
                            const x1 = 50 + Math.cos(angle) * 25;
                            const y1 = 50 + Math.sin(angle) * 25;
                            const x2 = 50 + Math.cos(angle) * 32;
                            const y2 = 50 + Math.sin(angle) * 32;
                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFB347" strokeWidth="3" strokeLinecap="round"/>;
                          })}
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" /> Modifier
                  </Button>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="border-[#FF8A00] text-[#FF8A00] hover:bg-orange-50 px-6 py-3"
                      onClick={() => window.print()}
                    >
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Imprimer
                    </Button>
                    <Button 
                      onClick={handleReserveCall}
                      className="bg-gradient-to-r from-[#FF8A00] to-[#FFB347] hover:from-[#FF9A20] hover:to-[#FF8A00] text-white px-8 py-3 shadow-lg hover:shadow-xl"
                    >
                      Réserver Un Appel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}