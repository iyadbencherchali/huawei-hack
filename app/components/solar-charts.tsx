"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

// Months in French
const MONTHS_FULL = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

interface SolarChartsProps {
  monthlyGenerationMwh?: number[]; // 12 months of data in MWh for year 0
}

// ✅ Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="text-xs font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-semibold" style={{ color: entry.fill }}>
            Production: {entry.value.toFixed(1)} MWh
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SolarCharts({ monthlyGenerationMwh }: SolarChartsProps) {
  const [yearOffset, setYearOffset] = useState(0); // 0 = current year, 1 = next year, etc.
  const currentMonth = new Date().getMonth(); // 0-11
  const currentYear = new Date().getFullYear();

  // Generate chart data starting from current month
  const chartData = useMemo(() => {
    // Default data if none provided
    const defaultMonthly = monthlyGenerationMwh || [
      1.5, 1.8, 2.2, 2.5, 2.8, 3.2,
      3.5, 3.2, 2.5, 2.0, 1.5, 1.2
    ];

    const data = [];

    // Generate 12 months starting from current month
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const monthName = MONTHS_FULL[monthIndex];

      // Base value for this month (year 1) already correctly distributed 
      const baseValue = defaultMonthly[monthIndex];

      // Apply yearly degradation (0.5% per year)
      const degradationFactor = Math.pow(0.995, yearOffset);

      // Calculate value for current year
      const currentValue = baseValue * degradationFactor;

      data.push({
        name: monthName,
        value: currentValue,
        monthIndex: monthIndex,
        // Store original value for comparison
        originalValue: baseValue
      });
    }

    return data;
  }, [monthlyGenerationMwh, currentMonth, yearOffset]);

  const displayYear = currentYear + yearOffset;

  const handlePrevYear = () => {
    if (yearOffset > 0) {
      setYearOffset(yearOffset - 1);
    }
  };

  const handleNextYear = () => {
    if (yearOffset < 25) { // Max 25 years into future
      setYearOffset(yearOffset + 1);
    }
  };

  // Calculate totals for display
  const totalCurrentYear = useMemo(() => {
    return chartData.reduce((sum, month) => sum + month.value, 0);
  }, [chartData]);

  const totalOriginal = useMemo(() => {
    return chartData.reduce((sum, month) => sum + month.originalValue, 0);
  }, [chartData]);

  // Calculate degradation percentage
  const degradationPercent = useMemo(() => {
    if (yearOffset === 0) return 0;
    const percent = ((totalOriginal - totalCurrentYear) / totalOriginal * 100);
    return percent > 0 ? percent.toFixed(1) : "0.0";
  }, [totalCurrentYear, totalOriginal, yearOffset]);

  // Find max value for Y-axis domain
  const maxValue = useMemo(() => {
    const values = chartData.map(item => item.value);
    const max = Math.max(...values);
    return Math.ceil(max * 1.2); // Add 20% padding
  }, [chartData]);

  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Génération électrique</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">
              {yearOffset === 0 ? "Année 1" : `Année ${yearOffset + 1}`} • Total: {totalCurrentYear.toFixed(1)} MWh
            </span>
            {yearOffset > 0 && (
              <span className="text-xs text-red-500">
                (↓ {degradationPercent}%)
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">
            {displayYear}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={handlePrevYear}
              disabled={yearOffset === 0}
              className={`p-1 rounded hover:bg-gray-100 transition-colors ${yearOffset === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
                }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextYear}
              disabled={yearOffset >= 25}
              className={`p-1 rounded hover:bg-gray-100 transition-colors ${yearOffset >= 25 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
                }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            barCategoryGap="15%"
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FFEDCC" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, maxValue]}
              tickFormatter={(value) => `${value.toFixed(0)}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="value"
              name="Production"
              fill="url(#colorGradient)"
              radius={[10, 10, 0, 0]}
              barSize={40}
              animationDuration={500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}