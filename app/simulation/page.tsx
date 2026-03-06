"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Menu, Loader2, Search, MapPin, Check } from "lucide-react";
import { ResultsModal } from "@/components/results-modal";
import dynamic from "next/dynamic";

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
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col items-center lg:items-start py-6 transition-all duration-300">
        <div className="flex items-center px-0 lg:px-6 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="ml-3 hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Pulse.dz</span>
        </div>

        <nav className="flex-1 w-full flex flex-col gap-2 px-3">
          <Link href="/" className="flex items-center p-3 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group">
            <div className="relative">
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
              <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <span className="ml-3 hidden lg:block font-medium">Accueil</span>
          </Link>
          <div className="flex items-center p-3 bg-primary/10 text-primary rounded-xl transition-all font-semibold relative overflow-hidden group">
            <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="ml-3 hidden lg:block relative z-10">Simulation</span>
          </div>
          <Link href="/simulation/methodology" className="flex items-center p-3 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group">
            <div className="relative">
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform"></span>
              <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span className="ml-3 hidden lg:block font-medium">Documentation</span>
          </Link>
        </nav>

        {/* Methodology Info - visible on large screens */}
        <div className="hidden lg:block px-4 mt-auto">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">📐 Méthodologie</h4>
            <ul className="space-y-2.5 text-[11px] text-gray-500 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold mt-0.5">☀</span>
                <span><strong className="text-gray-700">Irradiance</strong> — Basée sur la zone géographique (1700–2300 kWh/kWp/an)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold mt-0.5">⚡</span>
                <span><strong className="text-gray-700">Dimensionnement</strong> — Système adapté à votre consommation (min 3 kW)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-0.5">💰</span>
                <span><strong className="text-gray-700">Coût</strong> — 220 000 DA/kW, tarif Sonelgaz 8.5 DA/kWh</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 font-bold mt-0.5">📊</span>
                <span><strong className="text-gray-700">Score</strong> — Pondéré: irradiance 40%, toit 25%, type 15%, conso 20%</span>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-[10px] text-gray-400">Source: Atlas Solaire Algérien (CDER) • Efficacité système: 80% • Dégradation: 0.5%/an</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Nouvelle Simulation</h1>
            <p className="text-sm text-gray-500 mt-0.5">Estimez votre production et vos économies solaires</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Algorithme Précis
            </div>
          </div>
        </header>

        {/* Dashboard Content Grid */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full">

            {/* Left Column: Form Setup */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Location Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Emplacement</h2>
                    <p className="text-xs text-gray-500">Où se trouve votre bâtiment ?</p>
                  </div>
                </div>

                <div className="relative" ref={searchRef}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Cherchez une adresse ou cliquez sur la carte..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowSearchResults(searchResults.length > 0)}
                  />
                  {searchLoading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />}

                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                          onClick={() => handleSearchResultSelect(result)}
                        >
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{result.city}</div>
                              <div className="text-xs text-gray-500 leading-tight mt-0.5">{result.address}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedLocation && (
                  <div className="mt-4 p-3 bg-green-50/50 border border-green-100 rounded-xl flex items-center gap-2 text-green-700 animate-in fade-in slide-in-from-top-2">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{selectedLocation.city || selectedLocation.address}</span>
                  </div>
                )}
              </div>

              {/* Home Data Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Données du Bâtiment</h2>
                    <p className="text-xs text-gray-500">Pour un calcul personnalisé</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Surface Toiture
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          placeholder="Ex: 120"
                          value={formData.roofSurface}
                          onChange={(e) => handleInputChange('roofSurface', e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">m²</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Type
                      </label>
                      <Select value={formData.roofType} onValueChange={(value) => handleInputChange('roofType', value)}>
                        <SelectTrigger className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all flex items-center justify-between font-medium">
                          <SelectValue placeholder="Choisir...">
                            {formData.roofType === 'flat' ? 'Toit plat' : formData.roofType === 'inclined' ? 'Toit incliné' : undefined}
                          </SelectValue>
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat">Toit plat</SelectItem>
                          <SelectItem value="inclined">Toit incliné</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Conso. Annuelle
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          placeholder="Ex: 1500"
                          value={formData.electricityConsumption}
                          onChange={(e) => handleInputChange('electricityConsumption', e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">kWh</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                        Coût Annuel
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          placeholder="Ex: 90000"
                          value={formData.annualElectricityCost}
                          onChange={(e) => handleInputChange('annualElectricityCost', e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">DA</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white rounded-xl py-6 text-base font-semibold shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] border-0"
                    onClick={runSimulation}
                    disabled={!isFormValid || simulationLoading}
                  >
                    {simulationLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" /> Analyse en cours...
                      </span>
                    ) : (
                      "Lancer la Simulation"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Map */}
            <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
              <div className="absolute top-4 left-4 z-10 flex gap-2 pointer-events-none">
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2 border border-gray-100 pointer-events-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Carte Interactive
                </div>
              </div>
              <LeafletMap
                onSelectLocation={handleMapClick}
                selectedLocation={selectedLocation}
                className="w-full h-full z-0"
              />
              {!selectedLocation && (
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center bg-gray-900/5 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-0">
                  <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-4 text-center border border-gray-100">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2 animate-bounce" />
                    <p className="font-semibold text-gray-800">Sélectionnez votre position</p>
                    <p className="text-xs text-gray-500 mt-1">Cliquez sur la carte pour définir l'emplacement</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <ResultsModal
        open={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        simulationData={simulationData}
        loading={loading}
      />
    </div>
  );
}