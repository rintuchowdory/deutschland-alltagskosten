/**
 * Comparison Page - Deutschland Alltagskosten 2026
 * Side-by-side comparison of two German regions
 * 
 * Design Philosophy: Neon Cyberpunk Dashboard
 * - Glowing neon buttons with cyan (#00D9FF) and pink (#FF006E) accents
 * - Dark background (#0A0E27) for maximum contrast
 * - Smooth animations and hover effects
 */

import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { regionalCosts, regions, categories, CategoryData } from "@/lib/costData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Comparison() {
  const [region1, setRegion1] = useState<string>("deutschland");
  const [region2, setRegion2] = useState<string>("berlin");
  const [selectedCategory, setSelectedCategory] = useState<string>("miete");

  const region1Data = regionalCosts[region1] || regionalCosts.deutschland;
  const region2Data = regionalCosts[region2] || regionalCosts.deutschland;

  const currentCategory = selectedCategory;
  const category1 = region1Data[currentCategory];
  const category2 = region2Data[currentCategory];

  // Calculate total costs for each region
  const totalCosts1 = useMemo(() => {
    return Object.values(region1Data).reduce((sum, cat: any) => {
      return sum + (cat.items?.[0]?.price || 0);
    }, 0);
  }, [region1Data]);

  const totalCosts2 = useMemo(() => {
    return Object.values(region2Data).reduce((sum, cat: any) => {
      return sum + (cat.items?.[0]?.price || 0);
    }, 0);
  }, [region2Data]);

  const difference = totalCosts1 - totalCosts2;
  const percentDifference = totalCosts2 > 0 ? Number(((difference / totalCosts2) * 100).toFixed(1)) : 0;

  // Chart data for category comparison
  const chartData = useMemo(() => {
    if (!category1 || !category2) return null;

    const labels = category1.items.map((_, i) => `Typ ${i + 1}`);
    const data1 = category1.items.map((item) => item.price);
    const data2 = category2.items.map((item) => item.price);

    return {
      labels,
      datasets: [
        {
          label: regions.find((r) => r.value === region1)?.label.split(" ")[0],
          data: data1,
          backgroundColor: "rgba(0, 217, 255, 0.7)",
          borderColor: "#00D9FF",
          borderWidth: 2,
        },
        {
          label: regions.find((r) => r.value === region2)?.label.split(" ")[0],
          data: data2,
          backgroundColor: "rgba(255, 0, 110, 0.7)",
          borderColor: "#FF006E",
          borderWidth: 2,
        },
      ],
    };
  }, [category1, category2, region1, region2]);

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

      {/* Header with Back Button */}
      <section className="relative pt-8 pb-4 px-4 md:px-8 border-b border-[#00D9FF]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded border border-[#00D9FF]/50 text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all"
            >
              ← Zurück
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-[#00D9FF]">
              🔄 Vergleichsmodus
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pt-12 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Region Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Region 1 Selector */}
            <div className="p-6 bg-gradient-to-r from-[#1a1f3a]/50 to-[#0f1428]/50 border border-[#00D9FF]/30 rounded-lg backdrop-blur-sm neon-glow">
              <label className="block text-sm font-semibold text-[#00D9FF] mb-4 uppercase tracking-wider">
                📍 Region 1 (Cyan):
              </label>
              <div className="space-y-2">
                {regions.map((region) => (
                  <button
                    key={region.value}
                    onClick={() => setRegion1(region.value)}
                    className={`w-full text-left px-4 py-3 rounded font-semibold transition-all duration-300 text-sm ${
                      region1 === region.value
                        ? "bg-[#00D9FF] text-[#0A0E27] border border-[#00D9FF] shadow-lg shadow-[#00D9FF]/50"
                        : "bg-transparent border border-[#00D9FF]/50 text-[#00D9FF] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Region 2 Selector */}
            <div className="p-6 bg-gradient-to-r from-[#1a1f3a]/50 to-[#0f1428]/50 border border-[#FF006E]/30 rounded-lg backdrop-blur-sm">
              <label className="block text-sm font-semibold text-[#FF006E] mb-4 uppercase tracking-wider">
                📍 Region 2 (Pink):
              </label>
              <div className="space-y-2">
                {regions.map((region) => (
                  <button
                    key={region.value}
                    onClick={() => setRegion2(region.value)}
                    className={`w-full text-left px-4 py-3 rounded font-semibold transition-all duration-300 text-sm ${
                      region2 === region.value
                        ? "bg-[#FF006E] text-white border border-[#FF006E] shadow-lg shadow-[#FF006E]/50"
                        : "bg-transparent border border-[#FF006E]/50 text-[#FF006E] hover:border-[#FF006E] hover:bg-[#FF006E]/10"
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Total Cost Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Region 1 Total */}
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#00D9FF]/30 rounded-lg neon-glow text-center">
              <p className="text-sm text-[#B0B8D4] mb-2 uppercase tracking-wider">
                {regions.find((r) => r.value === region1)?.label}
              </p>
              <p className="text-5xl font-bold text-[#00D9FF]">{totalCosts1}€</p>
              <p className="text-xs text-[#B0B8D4] mt-2">Durchschnitt/Monat</p>
            </div>

            {/* Difference */}
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#B500FF]/30 rounded-lg neon-glow flex flex-col items-center justify-center">
              <p className="text-sm text-[#B0B8D4] mb-4 uppercase tracking-wider">Unterschied</p>
              <p
                className={`text-4xl font-bold ${
                  difference > 0 ? "text-[#FF006E]" : "text-[#00D9FF]"
                }`}
              >
                {Math.abs(difference)}€
              </p>
              <p className="text-xs text-[#B0B8D4] mt-2">
                {difference > 0
                  ? `Region 1 ist ${Math.abs(percentDifference)}% teurer`
                  : `Region 2 ist ${Math.abs(percentDifference)}% teurer`}
              </p>
            </div>

            {/* Region 2 Total */}
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#FF006E]/30 rounded-lg neon-glow text-center">
              <p className="text-sm text-[#B0B8D4] mb-2 uppercase tracking-wider">
                {regions.find((r) => r.value === region2)?.label}
              </p>
              <p className="text-5xl font-bold text-[#FF006E]">{totalCosts2}€</p>
              <p className="text-xs text-[#B0B8D4] mt-2">Durchschnitt/Monat</p>
            </div>
          </div>

          {/* Category Selector */}
          <div className="mb-12 p-6 bg-gradient-to-r from-[#1a1f3a]/50 to-[#0f1428]/50 border border-[#B500FF]/30 rounded-lg backdrop-blur-sm">
            <label className="block text-sm font-semibold text-[#B500FF] mb-4 uppercase tracking-wider">
              📂 Kategorie auswählen:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-3 rounded font-semibold transition-all duration-300 text-sm flex items-center gap-2 justify-center ${
                    selectedCategory === cat.key
                      ? "bg-[#B500FF] text-white border border-[#B500FF] shadow-lg shadow-[#B500FF]/50"
                      : "bg-transparent border border-[#B500FF]/50 text-[#B500FF] hover:border-[#B500FF] hover:bg-[#B500FF]/10"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Comparison Chart */}
          {chartData && (
            <div className="mb-12 p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#B500FF]/30 rounded-lg neon-glow">
              <h3 className="text-2xl font-bold text-[#B500FF] mb-6">
                {category1?.label} – Detailvergleich
              </h3>
              <div className="h-96">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}

          {/* Detailed Comparison Table */}
          {category1 && category2 && (
            <div className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#00D9FF]/30 rounded-lg neon-glow overflow-x-auto">
              <h3 className="text-2xl font-bold text-[#00D9FF] mb-6">
                📋 Detaillierter Vergleich
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#00D9FF]/30">
                    <th className="text-left py-3 px-4 text-[#00D9FF] font-semibold">
                      Kategorie
                    </th>
                    <th className="text-left py-3 px-4 text-[#00D9FF] font-semibold">
                      {regions.find((r) => r.value === region1)?.label.split(" ")[0]}
                    </th>
                    <th className="text-left py-3 px-4 text-[#FF006E] font-semibold">
                      {regions.find((r) => r.value === region2)?.label.split(" ")[0]}
                    </th>
                    <th className="text-left py-3 px-4 text-[#B500FF] font-semibold">
                      Unterschied
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category1.items.map((item1, index) => {
                    const item2 = category2.items[index];
                    const diff = item1.price - (item2?.price || 0);
                    return (
                      <tr
                        key={index}
                        className="border-b border-[#00D9FF]/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-[#B0B8D4]">{item1.label}</td>
                        <td className="py-3 px-4 text-[#00D9FF] font-semibold">
                          {item1.price}€
                        </td>
                        <td className="py-3 px-4 text-[#FF006E] font-semibold">
                          {item2?.price || 0}€
                        </td>
                        <td
                          className={`py-3 px-4 font-semibold ${
                            diff > 0 ? "text-[#FF006E]" : "text-[#00D9FF]"
                          }`}
                        >
                          {diff > 0 ? "+" : ""}{diff.toFixed(0)}€
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Insights */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1428] border border-[#FF006E]/30 rounded-lg neon-glow">
            <h3 className="text-2xl font-bold text-[#FF006E] mb-6">💡 Insights</h3>
            <div className="space-y-4 text-[#B0B8D4]">
              <p>
                <span className="font-semibold text-[#00D9FF]">
                  {regions.find((r) => r.value === region1)?.label}
                </span>{" "}
                hat durchschnittlich{" "}
                <span className="font-semibold text-[#FF006E]">{Math.abs(difference)}€</span>{" "}
                {difference > 0 ? "höhere" : "niedrigere"} Lebenshaltungskosten pro Monat als{" "}
                <span className="font-semibold text-[#FF006E]">
                  {regions.find((r) => r.value === region2)?.label}
                </span>
                .
              </p>
              <p>
                Das entspricht einer Differenz von{" "}
                <span className="font-semibold text-[#B500FF]">{Math.abs(percentDifference)}%</span>
                .
              </p>
              <p>
                Über ein Jahr würde der Unterschied{" "}
                <span className="font-semibold text-[#00D9FF]">
                  {Math.abs(difference * 12)}€
                </span>{" "}
                betragen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
