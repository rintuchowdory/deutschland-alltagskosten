/**
 * Cost Data for Deutschland Alltagskosten
 * Average costs in Germany by category and region
 * Data based on 2026 estimates
 */

export interface CostItem {
  label: string;
  description: string;
  price: number;
}

export interface CategoryData {
  icon: string;
  label: string;
  description: string;
  items: CostItem[];
}

// Default costs (Germany average)
export const defaultCosts: { [key: string]: CategoryData } = {
  miete: {
    icon: "🏠",
    label: "Miete",
    description: "Durchschnittliche Wohnungsmieten",
    items: [
      { label: "1-Zimmer Wohnung", description: "Zentrum", price: 850 },
      { label: "2-Zimmer Wohnung", description: "Zentrum", price: 1100 },
      { label: "Familienwohnung (3+)", description: "Zentrum", price: 1500 },
    ],
  },
  strom: {
    icon: "⚡",
    label: "Strom",
    description: "Durchschnittliche Stromkosten pro Monat",
    items: [
      { label: "1-Person Haushalt", description: "ca. 50-80 kWh/Monat", price: 25 },
      { label: "2-Person Haushalt", description: "ca. 150-200 kWh/Monat", price: 60 },
      { label: "Familie (4+)", description: "ca. 300-400 kWh/Monat", price: 120 },
    ],
  },
  internet: {
    icon: "🌐",
    label: "Internet",
    description: "Durchschnittliche Internet- und Telefonkosten",
    items: [
      { label: "Internet (50 Mbps)", description: "Standard", price: 30 },
      { label: "Internet + Telefon", description: "Standard", price: 40 },
      { label: "Internet + TV + Telefon", description: "Premium", price: 60 },
    ],
  },
  auto: {
    icon: "🚗",
    label: "Auto",
    description: "Durchschnittliche Autokosten pro Monat",
    items: [
      { label: "Versicherung", description: "Durchschnitt", price: 80 },
      { label: "Benzin/Diesel", description: "ca. 1000 km/Monat", price: 120 },
      { label: "Wartung & Reparatur", description: "Durchschnitt", price: 50 },
    ],
  },
  lebensmittel: {
    icon: "🛒",
    label: "Lebensmittel",
    description: "Durchschnittliche Lebensmittelkosten pro Monat",
    items: [
      { label: "1-Person Haushalt", description: "Durchschnitt", price: 200 },
      { label: "2-Person Haushalt", description: "Durchschnitt", price: 350 },
      { label: "Familie (4+)", description: "Durchschnitt", price: 600 },
    ],
  },
};

// Regional variations
export const regionalCosts: { [key: string]: { [key: string]: CategoryData } } = {
  deutschland: defaultCosts,
  berlin: {
    miete: {
      ...defaultCosts.miete,
      items: [
        { label: "1-Zimmer Wohnung", description: "Zentrum", price: 750 },
        { label: "2-Zimmer Wohnung", description: "Zentrum", price: 950 },
        { label: "Familienwohnung (3+)", description: "Zentrum", price: 1300 },
      ],
    },
    strom: defaultCosts.strom,
    internet: defaultCosts.internet,
    auto: defaultCosts.auto,
    lebensmittel: defaultCosts.lebensmittel,
  },
  nrw: {
    miete: {
      ...defaultCosts.miete,
      items: [
        { label: "1-Zimmer Wohnung", description: "Zentrum", price: 700 },
        { label: "2-Zimmer Wohnung", description: "Zentrum", price: 950 },
        { label: "Familienwohnung (3+)", description: "Zentrum", price: 1250 },
      ],
    },
    strom: defaultCosts.strom,
    internet: defaultCosts.internet,
    auto: defaultCosts.auto,
    lebensmittel: defaultCosts.lebensmittel,
  },
  bayern: {
    miete: {
      ...defaultCosts.miete,
      items: [
        { label: "1-Zimmer Wohnung", description: "Zentrum", price: 900 },
        { label: "2-Zimmer Wohnung", description: "Zentrum", price: 1200 },
        { label: "Familienwohnung (3+)", description: "Zentrum", price: 1600 },
      ],
    },
    strom: defaultCosts.strom,
    internet: defaultCosts.internet,
    auto: defaultCosts.auto,
    lebensmittel: defaultCosts.lebensmittel,
  },
  hamburg: {
    miete: {
      ...defaultCosts.miete,
      items: [
        { label: "1-Zimmer Wohnung", description: "Zentrum", price: 950 },
        { label: "2-Zimmer Wohnung", description: "Zentrum", price: 1300 },
        { label: "Familienwohnung (3+)", description: "Zentrum", price: 1700 },
      ],
    },
    strom: defaultCosts.strom,
    internet: defaultCosts.internet,
    auto: defaultCosts.auto,
    lebensmittel: defaultCosts.lebensmittel,
  },
};

export const regions = [
  { value: "deutschland", label: "🇩🇪 Deutschland (Durchschnitt)" },
  { value: "berlin", label: "🏛️ Berlin" },
  { value: "nrw", label: "🏭 Nordrhein-Westfalen" },
  { value: "bayern", label: "🏔️ Bayern" },
  { value: "hamburg", label: "⛵ Hamburg" },
];

export const categories = [
  { key: "miete", label: "Miete", icon: "🏠" },
  { key: "strom", label: "Strom", icon: "⚡" },
  { key: "internet", label: "Internet", icon: "🌐" },
  { key: "auto", label: "Auto", icon: "🚗" },
  { key: "lebensmittel", label: "Lebensmittel", icon: "🛒" },
];
