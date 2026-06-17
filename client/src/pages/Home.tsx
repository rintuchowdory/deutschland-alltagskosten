/**
 * Home Page - Deutschland Alltagskosten 2026
 * Version 4: Chart.js visualizations with cost distribution and savings analysis
 * 
 * Design Philosophy: Neon Cyberpunk Dashboard
 * - Glowing neon buttons with cyan (#00D9FF) and pink (#FF006E) accents
 * - Dark background (#0A0E27) for maximum contrast
 * - Smooth animations and hover effects
 * - Space Mono typography for headlines, Inter for body
 */

import { useState, useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { regionalCosts, regions, categories, CategoryData, CostItem } from "@/lib/costData";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface SelectedCosts {
  [key: string]: number;
}

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string>("deutschland");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [income, setIncome] = useState<number>(3000);
  const [selectedCosts, setSelectedCosts] = useState<SelectedCosts>({});

  const handleCategoryClick = (categoryKey: string) => {
    setIsAnimating(true);
    setSelectedCategory(categoryKey);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedCategory(null);
  };

  const toggleCostSelection = (categoryKey: string, costIndex: number) => {
    const key = `${categoryKey}-${costIndex}`;
    setSelectedCosts((prev) => {
      const updated = { ...prev };
      if (updated[key]) {
        delete updated[key];
      } else {
        const cost =
          currentRegionData[categoryKey]?.items[costIndex]?.price || 0;
        updated[key] = cost;
      }
      return updated;
    });
  };

  const currentRegionData = regionalCosts[selectedRegion] || regionalCosts.deutschland;
  const currentCategory = selectedCategory ? currentRegionData[selectedCategory] : null;

  const totalCosts = useMemo(() => {
    return Object.values(selectedCosts).reduce((sum, cost) => sum + cost, 0);
  }, [selectedCosts]);

  const remainingBudget = income - totalCosts;
  const savingsRate = income > 0 ? ((remainingBudget / income) * 100).toFixed(1) : 0;

  // Chart Data - Cost Distribution
  const costDistributionData = useMemo(() => {
    const labels = Object.keys(selectedCosts);
    const data = Object.values(selectedCosts);
    return {
      labels: labels.length > 0 ? labels : ["Keine Kosten"],
      datasets: [
        {
          label: "Kostenverteilung (€)",
          data: data.length > 0 ? data : [0],
          backgroundColor: [
            "#FF006E",
            "#00D9FF",
            "#B500FF",
            "#FF006E",
            "#00D9FF",
          ],
          borderColor: "#0A0E27",
          borderWidth: 2,
        },
      ],
    };
  }, [selectedCosts]);

  // Chart Data - Budget Breakdown
  const budgetBreakdownData = useMemo(() => {
    return {
      labels: ["Kosten", "Verfügbares Budget"],
      datasets: [
        {
          label: "€",
          data: [totalCosts, Math.max(0, remainingBudget)],
          backgroundColor: ["#FF006E", "#00D9FF"],
          borderColor: "#0A0E27",
          borderWidth: 2,
        },
      ],
    };
  }, [totalCosts, remainingBudget]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "#B0B8D4",
          font: { family: "'Inter', sans-serif", size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(10, 14, 39, 0.9)",
        titleColor: "#00D9FF",
        bodyColor: "#FFFFFF",
        borderColor: "#00D9FF",
        borderWidth: 1,
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        ticks: { color: "#B0B8D4" },
        grid: { color: "rgba(0, 217, 255, 0.1)" },
      },
      x: {
        ticks: { color: "#B0B8D4" },
        grid: { color: "rgba(0, 217, 255, 0.1)" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white overflow-hidden">
      {/* Background gradient accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00D9FF] to-transparent opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#B500FF] to-transparent opacity-5 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663768119681/JkPeNEiZYzA8ezoFeWUgrF/logo-deutschland-alltagskosten-6awfx2X2jm4xKcrsuqvvdZ.webp"
              alt="Deutschland Alltagskosten Logo"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Deutschland
              </h1>
              <h2 className="text-2xl md:text-3xl text-[#00D9FF]">Alltagskosten 2026</h2>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#B0B8D4] mb-8 max-w-2xl">
            Dein interaktives Budget-Dashboard. Visualisiere deine Ausgaben und Sparquote.
          </p>

          {/* Region Selector */}
          <div className="mb-12 p-6 bg-gradient-to-r from-[#1a1f3a]/50 to-[#0f1428]/50 border border-[#00D9FF]/30 rounded-lg backdrop-blur-sm neon-glow">
            <label className="block text-sm font-semibold text-[#00D9FF] mb-4 uppercase tracking-wider">
              📍 Bundesland auswählen:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {regions.map((region) => (
                <button
                  key={region.value}
                  onClick={() => handleRegionChange(region.value)}
                  className={`px-4 py-3 rounded font-semibold transition-all duration-300 text-sm ${
                    selectedRegion === region.value
                      ? "bg-[#00D9FF] text-[#0A0E27] border border-[#00D9FF] shadow-lg shadow-[#00D9FF]/50"
                      : "bg-transparent border border-[#00D9FF]/50 text-[#00D9FF] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Income Input Section */}
          <div className="mb-12 p-6 bg-gradient-to-r from-[#1a1f3a]/50 to-[#0f1428]/50 border border-[#FF006E]/30 rounded-lg backdrop-blur-sm">
            <label className="block text-sm font-semibold text-[#FF006E] mb-4 uppercase tracking-wider">
              💰 Monatliches Einkommen:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-[#FF006E]/50 rounded text-white font-semibold text-xl focus:outline-none focus:border-[#FF006E] focus:ring-2 focus:ring-[#FF006E]/30 transition-all"
              />
              <span className="text-2xl font-bold text-[#FF006E]">€</span>
            </div>
          </div>

          {/* Category Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`neon-button group relative overflow-hidden transition-all duration-300 ${
                  selectedCategory === cat.key
                    ? "ring-2 ring-[#FF006E] scale-105"
                    : ""
                }`}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] via-[#B500FF] to-[#FF006E] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                {/* Button content */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="font-semibold text-sm md:text-base">{cat.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Cost Selection Card */}
            <div className="lg:col-span-2">
              {currentCategory && (
                <div
                  className={`relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#00D9FF] rounded-lg p-8 md:p-12 neon-glow transition-all duration-500 ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                  style={{
                    backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663768119681/JkPeNEiZYzA8ezoFeWUgrF/card-background-costs-FqyJ4rhdERTRgL8rZfUTfB.webp')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-black/60 rounded-lg"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-5xl">{currentCategory.icon}</span>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#00D9FF]">
                          {currentCategory.label}
                        </h3>
                        <p className="text-[#B0B8D4] text-sm md:text-base">
                          Klick zum Auswählen
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-[#00D9FF] via-[#B500FF] to-transparent mb-8"></div>

                    {/* Cost Items - Selectable */}
                    <div className="space-y-4">
                      {currentCategory.items.map((item: CostItem, index: number) => {
                        const key = `${selectedCategory}-${index}`;
                        const isSelected = selectedCosts[key] !== undefined;
                        return (
                          <button
                            key={index}
                            onClick={() => toggleCostSelection(selectedCategory!, index)}
                            className={`w-full text-left flex items-center justify-between p-4 rounded border transition-all duration-200 group cursor-pointer ${
                              isSelected
                                ? "bg-[#FF006E]/20 border-[#FF006E] ring-2 ring-[#FF006E]/30"
                                : "bg-white/5 backdrop-blur-sm border-[#00D9FF]/30 hover:border-[#00D9FF]/60 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-white text-sm md:text-base">
                                {item.label}
                              </p>
                              <p className="text-[#B0B8D4] text-xs md:text-sm">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p
                                className={`text-2xl md:text-3xl font-bold transition-colors duration-200 ${
                                  isSelected ? "text-[#FF006E]" : "text-[#00D9FF] group-hover:text-[#FF006E]"
                                }`}
                              >
                                {item.price}€
                              </p>
                              <p className="text-[#B0B8D4] text-xs">
                                {isSelected ? "✓ Gewählt" : "pro Monat"}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {!currentCategory && (
                <div className="text-center py-16">
                  <p className="text-xl text-[#B0B8D4] mb-4">
                    Wähle eine Kategorie oben aus, um die Kosten zu sehen.
                  </p>
                  <div className="inline-block text-6xl animate-bounce">👆</div>
                </div>
              )}
            </div>

            {/* Budget Calculator Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#FF006E] rounded-lg neon-glow">
                <h3 className="text-2xl font-bold text-[#FF006E] mb-6 flex items-center gap-2">
                  📊 Dein Budget
                </h3>

                {/* Income Display */}
                <div className="mb-6 pb-6 border-b border-[#FF006E]/30">
                  <p className="text-sm text-[#B0B8D4] mb-2">Einkommen:</p>
                  <p className="text-3xl font-bold text-[#00D9FF]">{income}€</p>
                </div>

                {/* Total Costs */}
                <div className="mb-6 pb-6 border-b border-[#FF006E]/30">
                  <p className="text-sm text-[#B0B8D4] mb-2">Gesamtkosten:</p>
                  <p className="text-3xl font-bold text-[#FF006E]">-{totalCosts}€</p>
                </div>

                {/* Remaining Budget */}
                <div className="mb-6 pb-6 border-b border-[#FF006E]/30">
                  <p className="text-sm text-[#B0B8D4] mb-2">Verfügbares Budget:</p>
                  <p
                    className={`text-4xl font-bold ${
                      remainingBudget >= 0 ? "text-[#00D9FF]" : "text-[#FF006E]"
                    }`}
                  >
                    {remainingBudget}€
                  </p>
                </div>

                {/* Savings Rate */}
                <div className="p-4 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded">
                  <p className="text-sm text-[#B0B8D4] mb-2">Sparquote:</p>
                  <p className="text-2xl font-bold text-[#00D9FF]">{savingsRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cost Distribution Chart */}
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#00D9FF]/30 rounded-lg neon-glow">
              <h3 className="text-2xl font-bold text-[#00D9FF] mb-6">📊 Kostenverteilung</h3>
              <div className="h-80">
                <Pie data={costDistributionData} options={chartOptions} />
              </div>
            </div>

            {/* Budget Breakdown Chart */}
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#FF006E]/30 rounded-lg neon-glow">
              <h3 className="text-2xl font-bold text-[#FF006E] mb-6">💰 Budget-Übersicht</h3>
              <div className="h-80">
                <Bar data={budgetBreakdownData} options={barChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
