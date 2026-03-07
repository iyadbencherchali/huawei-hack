"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Menu, Loader2, Search, MapPin, Check, Bolt, ArrowRight } from "lucide-react";
import { ResultsModal } from "@/components/results-modal";
import dynamic from "next/dynamic";

// Dummy icons for the new layout if they don't exist in lucide
const IconBolt = Bolt;
const IconArrowRight = ArrowRight;

// 🇩🇿 Realistic Algeria Solar Constants
const SOLAR_CONFIG = {
  PANEL_POWER_W: 550,
  PANEL_AREA_M2: 2.2,           // ~2.2 m² per 550W panel
  USABLE_ROOF_RATIO: 0.60,     // Only 60% of roof is usable
  SYSTEM_EFFICIENCY: 0.80,     // Inverter + wiring + dust losses
  MIN_SYSTEM_KW: 3.0,          // Minimum realistic residential install
  COST_PER_KW_DA: 220_000,     // 220,000 DA per kW (realistic Algerian price)
  DEFAULT_ELEC_RATE: 8.5,      // Sonelgaz average DA/kWh
  CO2_FACTOR: 0.5,             // kg CO2 per kWh (Algeria grid mix)
  // Solar irradiance by zone (kWh per kWp per year)
  IRRADIANCE: {
    north: 1700,    // Alger, Oran, Constantine, Annaba
    hauts: 1900,    // Djelfa, M'sila, Batna, Sétif
    south: 2100,    // Ghardaia, Biskra, Ouargla, Béchar
    sahara: 2300,   // Adrar, Tamanrasset, Illizi
  } as Record<string, number>,
};

const validateSolarInputs = (formData: any) => {
  const roofSurface = parseFloat(formData.roofSurface);
  const annualConsumption = parseFloat(formData.electricityConsumption);
  const annualCost = parseFloat(formData.annualElectricityCost);
  const isValid = !isNaN(roofSurface) && roofSurface > 0 &&
    !isNaN(annualConsumption) && annualConsumption > 0;
  return { roofSurface, annualConsumption, annualCost: isNaN(annualCost) ? 0 : annualCost, isValid };
};

export interface GeocodingResult {
  lat: number;
  lng: number;
  address: string;
  city: string;
}

const geocodingService = {
  searchAddress: async (query: string): Promise<GeocodingResult[]> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=dz`);
      const data = await response.json();
      return data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
        city: item.address?.city || item.address?.town || item.display_name.split(',')[0]
      }));
    } catch (error) {
      console.error("Geocoding error:", error);
      return [];
    }
  }
};

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse"></div>
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
}

interface FormData {
  name: string;
  roofSurface: string;
  roofType: string | undefined;
  electricityConsumption: string;
  annualElectricityCost: string;
}

interface SimulationData {
  panels: number;
  cost: string;
  roi: string;
  capacity: string;
  annualSavings: string;
  monthlyGenerationMwh: number[];
  yearlyComparison: {
    consumptionKwh: number[];
    productionKwh: number[];
  };
  location: Location | null;
  co2SavingsKg: number;
  // New realistic metrics
  systemSizeKw: number;
  annualProductionKwh: number;
  energyCoverage: number;
  confidenceScore: number;
  annualConsumptionKwh: number;
  // Advanced dashboard
  solarScore: number;           // 0–100
  solarScoreLabel: string;
  roiYearsRaw: number;
  totalCostDa: number;
  annualSavingsDa: number;
  solarZone: string;
  irradiance: number;
  roofSurface: number;
}

// 🇩🇿 Monthly solar production distribution for Algeria
const MONTHLY_SOLAR_DISTRIBUTION = [
  0.055, 0.065, 0.085, 0.095, 0.115, 0.125,
  0.120, 0.110, 0.090, 0.070, 0.045, 0.025
];

// Determine solar zone from latitude
const getSolarZone = (lat: number | undefined): string => {
  if (!lat) return 'north';
  if (lat >= 32) return 'north';      // Coastal / Tell Atlas
  if (lat >= 30) return 'hauts';      // Hauts Plateaux
  if (lat >= 27) return 'south';      // Northern Sahara
  return 'sahara';                    // Deep Sahara
};

const calculateSolarSystem = (formData: FormData, location: Location | null) => {
  const { roofSurface, annualConsumption, annualCost, isValid } = validateSolarInputs(formData);
  if (!isValid) {
    return {
      panels: 0, cost: "0", roi: "N/A", capacity: "0 kWh/an",
      annualSavings: "0 DA", annualProductionKwh: 0,
      monthlyGenerationKwh: [] as number[],
      yearlyComparison: { consumption: [], production: [] },
      co2SavingsKg: 0, systemSizeKw: 0, energyCoverage: 0,
      confidenceScore: 0, annualConsumptionKwh: 0,
    };
  }

  const C = SOLAR_CONFIG;

  // 1. Determine solar irradiance from location
  const zone = getSolarZone(location?.lat);
  const irradiance = C.IRRADIANCE[zone] || C.IRRADIANCE.north;

  // 2. Calculate roof capacity (max panels that physically fit)
  const usableRoofM2 = roofSurface * C.USABLE_ROOF_RATIO;
  const maxPanelsOnRoof = Math.floor(usableRoofM2 / C.PANEL_AREA_M2);
  const maxRoofKw = (maxPanelsOnRoof * C.PANEL_POWER_W) / 1000;

  // 3. Size system based on DEMAND (not roof area)
  //    How many kW do we need to cover consumption?
  const requiredKw = annualConsumption / (irradiance * C.SYSTEM_EFFICIENCY);

  // 4. Apply smart constraints:
  //    - Minimum 3 kW (realistic residential floor)
  //    - Cap at roof capacity
  let systemSizeKw = Math.max(requiredKw, C.MIN_SYSTEM_KW);
  systemSizeKw = Math.min(systemSizeKw, maxRoofKw);

  // Edge case: if roof can't even fit min system, use what fits
  if (maxRoofKw < C.MIN_SYSTEM_KW) {
    systemSizeKw = maxRoofKw;
  }
  if (systemSizeKw <= 0) systemSizeKw = C.MIN_SYSTEM_KW;

  // 5. Calculate panels from system size
  let panels = Math.ceil((systemSizeKw * 1000) / C.PANEL_POWER_W);
  if (panels < 1) panels = 1;
  // Recalculate exact system size from panel count
  systemSizeKw = (panels * C.PANEL_POWER_W) / 1000;

  // 6. Annual production
  const annualProductionKwh = Math.round(systemSizeKw * irradiance * C.SYSTEM_EFFICIENCY);

  // 7. Cost
  const totalCostDa = Math.round(systemSizeKw * C.COST_PER_KW_DA);

  // 8. Savings
  const effectiveRate = (annualCost > 0 && annualConsumption > 0)
    ? annualCost / annualConsumption
    : C.DEFAULT_ELEC_RATE;
  const offsetKwh = Math.min(annualProductionKwh, annualConsumption);
  const annualSavingsDa = offsetKwh * effectiveRate;

  // 9. Energy coverage
  const energyCoverage = annualConsumption > 0
    ? Math.round((annualProductionKwh / annualConsumption) * 100)
    : 0;

  // 10. CO2
  const co2SavingsKg = Math.round(annualProductionKwh * C.CO2_FACTOR);

  // 11. ROI
  let roiYears = Infinity;
  if (annualSavingsDa > 0) {
    roiYears = totalCostDa / annualSavingsDa;
  }
  let roiFormatted = "N/A";
  if (isFinite(roiYears) && roiYears > 0) {
    if (roiYears < 1) {
      roiFormatted = `${Math.round(roiYears * 12)} mois`;
    } else {
      const years = Math.floor(roiYears);
      const months = Math.round((roiYears - years) * 12);
      roiFormatted = months === 0
        ? `${years} an${years > 1 ? 's' : ''}`
        : `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
    }
  } else if (annualSavingsDa === 0) {
    roiFormatted = "Non rentable";
  }

  // 12. Format capacity — use kWh for small systems, MWh for large
  const capacityFormatted = annualProductionKwh >= 10000
    ? `${(annualProductionKwh / 1000).toFixed(1)} MWh/an`
    : `${annualProductionKwh.toLocaleString()} kWh/an`;

  // 13. Monthly distribution
  const monthlyGenerationKwh = MONTHLY_SOLAR_DISTRIBUTION.map(pct =>
    Math.round(annualProductionKwh * pct)
  );

  // 14. Confidence score (based on data quality)
  let confidence = 75;
  if (location?.lat) confidence += 5;        // Have GPS
  if (annualCost > 0) confidence += 4;       // Have real cost data
  if (formData.roofType) confidence += 4;    // Know roof type
  if (roofSurface > 20 && roofSurface < 500) confidence += 4; // Reasonable roof
  confidence = Math.min(confidence, 92);

  // 15. Solar Potential Score (weighted)
  let solarScore = 0;
  // Irradiance factor (40%): 1500=50, 1700=70, 2000=90, 2300=100
  const irradianceScore = Math.min(100, Math.round((irradiance / 2300) * 100));
  solarScore += irradianceScore * 0.40;
  // Roof size factor (25%): 10m²=20, 50m²=60, 100m²=85, 200m²=100
  const roofScore = Math.min(100, Math.round((roofSurface / 200) * 100));
  solarScore += roofScore * 0.25;
  // Roof type factor (15%): flat=80, inclined=95
  const roofTypeScore = formData.roofType === 'inclined' ? 95 : 80;
  solarScore += roofTypeScore * 0.15;
  // Consumption match factor (20%): how well system matches need
  const matchRatio = annualConsumption > 0 ? Math.min(annualProductionKwh / annualConsumption, 1.5) : 0;
  const matchScore = Math.min(100, Math.round((matchRatio / 1.5) * 100));
  solarScore += matchScore * 0.20;
  solarScore = Math.round(solarScore);

  const solarScoreLabel = solarScore >= 85 ? 'Excellent' : solarScore >= 70 ? 'Très bon' : solarScore >= 55 ? 'Bon' : solarScore >= 40 ? 'Moyen' : 'Faible';

  return {
    panels,
    cost: totalCostDa.toLocaleString('fr-DZ'),
    roi: roiFormatted,
    capacity: capacityFormatted,
    annualSavings: `${Math.round(annualSavingsDa).toLocaleString()} DA`,
    annualProductionKwh,
    monthlyGenerationKwh,
    yearlyComparison: {
      consumption: [],
      production: monthlyGenerationKwh
    },
    co2SavingsKg,
    systemSizeKw,
    energyCoverage,
    confidenceScore: confidence,
    annualConsumptionKwh: annualConsumption,
    solarScore,
    solarScoreLabel,
    roiYearsRaw: isFinite(roiYears) ? roiYears : 99,
    totalCostDa,
    annualSavingsDa: Math.round(annualSavingsDa),
    solarZone: zone,
    irradiance,
    roofSurface,
  };
};

export default function SimulationPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simulationLoading, setSimulationLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [infoBoxVisible, setInfoBoxVisible] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    roofSurface: "",
    roofType: undefined,
    electricityConsumption: "",
    annualElectricityCost: ""
  });

  const handleMapClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.address || "");
    setShowSearchResults(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await geocodingService.searchAddress(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchResultSelect = (result: GeocodingResult) => {
    const location: Location = {
      lat: result.lat,
      lng: result.lng,
      address: result.address,
      city: result.city
    };
    setSelectedLocation(location);
    setSearchQuery(result.address);
    setShowSearchResults(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const runSimulation = () => {
    if (!selectedLocation) {
      return;
    }

    setSimulationLoading(true);
    setTimeout(() => {
      const calc = calculateSolarSystem(formData, selectedLocation);

      if (calc.panels === 0) {
        setSimulationLoading(false);
        return;
      }

      const monthlyGenerationMwh = calc.monthlyGenerationKwh.map(kwh => kwh / 1000);

      const annualConsumption = parseFloat(formData.electricityConsumption) || 0;
      const baseMonth = annualConsumption / 12;
      const monthlyConsumptionKwh = [
        baseMonth * 0.9, baseMonth * 0.95, baseMonth * 0.9, baseMonth * 1.0,
        baseMonth * 1.1, baseMonth * 1.3, baseMonth * 1.35, baseMonth * 1.3,
        baseMonth * 1.1, baseMonth * 1.0, baseMonth * 0.95, baseMonth * 0.85
      ].map(v => Math.round(v));

      setSimulationData({
        panels: calc.panels,
        cost: calc.cost,
        roi: calc.roi,
        capacity: calc.capacity,
        annualSavings: calc.annualSavings,
        monthlyGenerationMwh,
        yearlyComparison: {
          consumptionKwh: monthlyConsumptionKwh,
          productionKwh: calc.monthlyGenerationKwh
        },
        location: selectedLocation,
        co2SavingsKg: calc.co2SavingsKg,
        systemSizeKw: calc.systemSizeKw,
        annualProductionKwh: calc.annualProductionKwh,
        energyCoverage: calc.energyCoverage,
        confidenceScore: calc.confidenceScore,
        annualConsumptionKwh: calc.annualConsumptionKwh,
        solarScore: calc.solarScore,
        solarScoreLabel: calc.solarScoreLabel,
        roiYearsRaw: calc.roiYearsRaw,
        totalCostDa: calc.totalCostDa,
        annualSavingsDa: calc.annualSavingsDa,
        solarZone: calc.solarZone,
        irradiance: calc.irradiance,
        roofSurface: calc.roofSurface,
      });
      setResultModalOpen(true);
      setSimulationLoading(false);
    }, 1200);
  };

  const isFormValid = selectedLocation && formData.roofSurface &&
    formData.roofType && formData.electricityConsumption;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sim-page font-sans">
      {/* Premium Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#050035] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-black tracking-tight text-[#050035]">Pulse.dz</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-bold text-gray-500 hover:text-[#050035] transition-colors">Accueil</Link>
          <Link href="/simulation/methodology" className="px-5 py-2.5 bg-[#050035] text-white rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition-all">Documentation</Link>
        </div>
      </nav>

      <div className="sim-container">
        {/* Header Section */}
        <header className="sim-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-orange-100">
            <IconBolt size={12} /> Intelligence Solaire 2.0
          </div>
          <h1 className="t-display text-5xl md:text-7xl mb-6 text-[#050035]">
            Configurez Votre <span className="text-gradient">Futur.</span>
          </h1>
          <p className="t-subheading max-w-2xl mx-auto opacity-70 leading-relaxed font-medium">
            Analysez instantanément le potentiel photovoltaïque de votre propriété. Notre algorithme croise vos données de consommation avec l&apos;ensoleillement satellite local.
          </p>
        </header>

        <div className="sim-grid mt-12">
          {/* CONFIGURATION COLUMN */}
          <div className="space-y-6">
            <div className="sim-card sim-glass relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="t-display text-2xl mb-8 flex items-center gap-3 text-[#050035]">
                Paramètres du Projet
              </h2>

              <div className="space-y-6">
                {/* Location Input */}
                <div className="sim-input-group" ref={searchRef}>
                  <label className="sim-label">Adresse de l&apos;installation</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      className="sim-input pl-12"
                      placeholder="Ex: Bab Ezzouar, Alger"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSearchResults(searchResults.length > 0)}
                    />
                    {searchLoading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />}
                  </div>

                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto p-2">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-orange-50 cursor-pointer rounded-xl transition-colors flex items-start gap-4"
                          onClick={() => handleSearchResultSelect(result)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-4 w-4 text-orange-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-[#050035] truncate">{result.city}</div>
                            <div className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">{result.address}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedLocation && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-900 animate-in fade-in slide-in-from-top-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-500/20">
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider font-black opacity-50">Localisation Confirmée</div>
                        <div className="text-xs font-bold truncate">{selectedLocation.city || selectedLocation.address}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="sim-input-group">
                    <label className="sim-label">Surface (m²)</label>
                    <input
                      type="number"
                      className="sim-input"
                      placeholder="Ex: 120"
                      value={formData.roofSurface}
                      onChange={(e) => handleInputChange('roofSurface', e.target.value)}
                    />
                  </div>
                  <div className="sim-input-group">
                    <label className="sim-label">Type de Toit</label>
                    <Select value={formData.roofType} onValueChange={(value) => handleInputChange('roofType', value)}>
                      <SelectTrigger className="w-full sim-input bg-gray-50 border-gray-200 h-auto py-[13.5px]">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="flat">Toit Plat</SelectItem>
                        <SelectItem value="inclined">Toit Incliné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="sim-input-group">
                    <label className="sim-label">Conso. (kWh/an)</label>
                    <input
                      type="number"
                      className="sim-input"
                      placeholder="Ex: 4500"
                      value={formData.electricityConsumption}
                      onChange={(e) => handleInputChange('electricityConsumption', e.target.value)}
                    />
                  </div>
                  <div className="sim-input-group">
                    <label className="sim-label">Budget (DA/an)</label>
                    <input
                      type="number"
                      className="sim-input"
                      placeholder="Ex: 85000"
                      value={formData.annualElectricityCost}
                      onChange={(e) => handleInputChange('annualElectricityCost', e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full btn-primary py-8 text-lg font-black shadow-2xl shadow-orange-500/30 group relative overflow-hidden mt-4"
                  onClick={runSimulation}
                  disabled={!isFormValid || simulationLoading}
                  style={{ borderRadius: '20px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {simulationLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" /> Analyse...
                      </>
                    ) : (
                      <>
                        Calculer mon Potentiel <IconArrowRight size={22} />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>

            <div className="p-8 bg-[#050035] rounded-3xl text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
               <div className="relative z-10 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur flex items-center justify-center text-orange-400 flex-shrink-0 border border-white/10">
                    <IconBolt size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-orange-400 mb-2">Moteur de Calcul V2</h4>
                    <p className="text-xs opacity-60 leading-relaxed font-medium">Calcul basé sur l&apos;irradiance globale horizontale (GHI) et les indices de performance PR (Performance Ratio) standardisés pour le climat maghrébin.</p>
                  </div>
               </div>
            </div>
          </div>

          {/* MAP COLUMN */}
          <div className="order-first lg:order-last">
            <div className="sim-card relative overflow-hidden p-0 h-[500px] lg:h-[750px] border-0 shadow-2xl rounded-[32px]">
              <LeafletMap
                onSelectLocation={handleMapClick}
                selectedLocation={selectedLocation}
                className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              

              <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
                 <div className="px-5 py-3.5 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl flex items-center gap-4">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-black text-[#050035] uppercase tracking-[0.2em]">Satellite Active • 2026 Data</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-24 pb-12 text-center opacity-30 hover:opacity-100 transition-all duration-700 cursor-default">
           <p className="text-[10px] font-black text-[#050035] uppercase tracking-[0.3em] mb-4">
             Pulse.dz Infrastructure Solaire • Algérie
           </p>
           <div className="w-12 h-0.5 bg-orange-500 mx-auto mb-4 opacity-50"></div>
           <p className="text-[10px] text-gray-500 max-w-lg mx-auto leading-relaxed">Les résultats sont des estimations informatiques basées sur l&apos;historique météorologique. Une expertise sur site est nécessaire avant toute installation.</p>
        </footer>
      </div>

      <ResultsModal
        open={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        simulationData={simulationData}
        loading={loading}
      />
    </div>
  );
}
