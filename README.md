# 🇩🇪 Deutschland Alltagskosten 2026

Ein interaktives Budget-Dashboard zur Visualisierung der durchschnittlichen Lebenshaltungskosten in Deutschland. Mit Neon-Cyberpunk-Design, regionalen Variationen und intelligenten Budgetberechnungen.

## 🎯 Features

### Version 1: Neon-Buttons mit Kostenkarten
- 5 Kategorien: Miete, Strom, Internet, Auto, Lebensmittel
- Leuchtende Neon-Buttons mit Glow-Effekten
- Detaillierte Kostenkarten mit Durchschnittswerten
- Smooth Animationen und Hover-Effekte

### Version 2: Bundesland-Selector
- 5 Bundesländer: Deutschland (Durchschnitt), Berlin, NRW, Bayern, Hamburg
- Dynamische Wertanpassung basierend auf Region
- Visuelle Rückmeldung für ausgewählte Region
- Regionale Kostenunterschiede (z.B. Mieten in Berlin vs. Hamburg)

### Version 3: Einkommensrechner
- Monatliches Einkommen eingeben
- Kostenauswahl durch Klick
- Live-Budgetberechnung:
  - Verfügbares Budget
  - Sparquote (in Prozent)
  - Gesamtkosten-Übersicht

### Version 4: Chart.js Visualisierungen
- **Pie Chart**: Kostenverteilung nach Kategorie
- **Bar Chart**: Budget-Übersicht (Kosten vs. verfügbares Budget)
- Neon-Styling mit Cyan, Pink und Purple
- Responsive Charts für alle Geräte
- Live-Updates bei Änderungen

## 🎨 Design-Philosophie

**Neon Cyberpunk Dashboard** – eine futuristische, energiegeladene Oberfläche mit:

- **Farben**: Neon Cyan (#00D9FF), Hot Pink (#FF006E), Purple (#B500FF) auf tiefem Charcoal (#0A0E27)
- **Typografie**: Space Mono (Headlines) + Inter (Body)
- **Effekte**: Glowing Borders, Hover-Pulse-Animationen, Glasmorphism
- **Layout**: Asymmetrische Grid mit schwebenden Karten
- **Animationen**: Smooth Transitions, Scale-Effekte, Glow-Pulse

## 🚀 Schnellstart

### Installation

```bash
cd deutschland-alltagskosten
pnpm install
```

### Development

```bash
pnpm dev
```

Die App läuft dann auf `http://localhost:3000`

### Build

```bash
pnpm build
```

## 📊 Datensätze

### Kategorien
- **Miete**: 1-Zimmer, 2-Zimmer, Familienwohnung
- **Strom**: 1-Person, 2-Person, Familie
- **Internet**: Standard, Standard+Telefon, Premium
- **Auto**: Versicherung, Benzin, Wartung
- **Lebensmittel**: 1-Person, 2-Person, Familie

### Regionen
- Deutschland (Durchschnitt)
- Berlin
- Nordrhein-Westfalen (NRW)
- Bayern
- Hamburg

### Kosten-Beispiele (Deutschland Durchschnitt)

| Kategorie | Typ | Preis/Monat |
|-----------|-----|------------|
| Miete | 1-Zimmer | 850€ |
| Miete | 2-Zimmer | 1.100€ |
| Miete | Familie (3+) | 1.500€ |
| Strom | 1-Person | 25€ |
| Strom | 2-Person | 60€ |
| Strom | Familie | 120€ |
| Internet | Standard | 30€ |
| Internet | Standard+Telefon | 40€ |
| Internet | Premium | 60€ |
| Auto | Versicherung | 80€ |
| Auto | Benzin | 120€ |
| Auto | Wartung | 50€ |
| Lebensmittel | 1-Person | 200€ |
| Lebensmittel | 2-Person | 350€ |
| Lebensmittel | Familie | 600€ |

## 🏗️ Projekt-Struktur

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Main dashboard
│   │   └── NotFound.tsx      # 404 page
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   └── costData.ts       # Cost data & regional variations
│   ├── App.tsx               # Router & layout
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles & neon theme
├── public/
│   └── favicon.ico
└── index.html
```

## 🎯 Verwendete Technologien

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI Components
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper für Chart.js
- **Wouter** - Client-side routing
- **Vite** - Build tool

## 🎨 Neon-Theme

Das Projekt verwendet ein durchgängiges Neon-Cyberpunk-Theme:

### CSS Variables
```css
--neon-cyan: #00D9FF
--neon-pink: #FF006E
--neon-purple: #B500FF
--bg-dark: #0A0E27
--text-primary: #FFFFFF
--text-secondary: #B0B8D4
```

### Komponenten
- `.neon-button` - Leuchtende Buttons mit Glow-Effekt
- `.neon-glow` - Glow-Border für Karten
- `.glow-pulse` - Pulsierender Glow-Effekt
- `@keyframes glow-pulse` - Glow-Animation

## 📱 Responsive Design

- **Mobile** (< 640px): Single-column layout, optimierte Touch-Targets
- **Tablet** (640px - 1024px): 2-column grid
- **Desktop** (> 1024px): 3+ column grid mit Sidebar

## ♿ Accessibility

- Keyboard navigation support
- Focus rings für alle interaktiven Elemente
- `prefers-reduced-motion` respektiert
- Semantic HTML
- ARIA labels wo nötig

## 🔮 Zukünftige Erweiterungen

- [ ] Datenbank-Integration für benutzerdefinierte Budgets
- [ ] Benutzer-Authentifizierung
- [ ] Historische Datentrends (2020-2026)
- [ ] Export zu PDF/CSV
- [ ] Mehrsprachigkeit (EN, FR, ES)
- [ ] Mobile App (React Native)
- [ ] API-Integration für Live-Daten

## 📄 Lizenz

MIT License - Frei verwendbar für private und kommerzielle Projekte

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen!

---

**Gebaut mit ❤️ und Neon-Glitch-Effekten** ✨
