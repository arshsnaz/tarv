import { useState } from "react";
import { ArrowRight, Check, Calculator, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Plus, ExternalLink, Sliders, Activity, Zap, Flame, Droplets, Wind } from "lucide-react";
import { Reveal } from "./reveal";
import { LiveCalculatorModal } from "./live-calculator-modal";

interface DisciplineCard {
  id: string;
  tag: string;
  title: string;
  desc: string;
  icon: any;
  accentColor: string;
  tagClass: string;
  badges: string[];
  calculators: string[];
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
  chartType: "line" | "bar" | "gauge";
  countText: string;
}

const solutionCards: DisciplineCard[] = [
  {
    id: "hvac",
    tag: "HVAC & THERMAL ENGINE",
    title: "Instant Building Heat Loads & Psychrometric Balancing",
    desc: "Calculate sensible, latent, and fresh air loads with finite heat balance algorithms. Automated duct friction loss & coil sizing.",
    icon: Wind,
    accentColor: "from-cyan-500 to-blue-600",
    tagClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    badges: ["ASHRAE 62.1", "ASHRAE 90.1", "SMACNA 2021", "NFPA 92"],
    calculators: [
      "Preliminary cooling load", "Heating load calculator", "Ventilation calculator", "Fresh air cooling load",
      "Duct sizer / ductulator", "Diffuser selector", "Condensate drain sizing", "Psychrometric calculator",
      "Refrigerant pipe sizing", "CHW pipe sizer", "CHW pump head calculator", "Lobby pressurisation",
      "Staircase pressurization", "Smoke extract fan sizing", "Basement smoke calculator", "HVAC design sanity check"
    ],
    metric1: { label: "Design Cooling Peak", value: "184.2 Tons" },
    metric2: { label: "ASHRAE 62.1 Airflow", value: "92,450 CFM" },
    chartType: "line",
    countText: "16 HVAC Calculators Available",
  },
  {
    id: "electrical",
    tag: "ELECTRICAL INFRASTRUCTURE",
    title: "Feeder Voltage Drops, Transformers & Short Circuits",
    desc: "Size low and medium voltage copper/aluminum cables, busbars, and transformers to NEC 2023 and IEC 60364 tables with real-time short circuit telemetry.",
    icon: Zap,
    accentColor: "from-amber-500 to-orange-600",
    tagClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badges: ["NEC 2023", "IEC 60364", "IEEE C57", "IS 732"],
    calculators: [
      "Cable sizing calculator", "Cable voltage drop", "Busbar sizing calculator", "Busbar voltage drop",
      "Transformer sizing", "Generator sizing (kVA)", "UPS sizing calculator", "Central battery sizing",
      "Circuit breaker sizing", "Short circuit calculator", "Cable tray sizing", "Capacitor bank sizing",
      "Lux level calculator", "Lighting power density (LPD)", "Electrical load summary", "DB schedule builder"
    ],
    metric1: { label: "Max Voltage Drop", value: "1.42% (Pass)" },
    metric2: { label: "Fault Level Rating", value: "50 kA / 1s" },
    chartType: "bar",
    countText: "16 Electrical Calculators Available",
  },
  {
    id: "fire",
    tag: "FIRE SUPPRESSION & HYDRAULICS",
    title: "NFPA 13 Sprinklers, Clean Agents & Fire Pump Duty",
    desc: "Calculate sprinkler hydraulic density, Hazen-Williams friction loss curves, FM-200 / Novec clean agent cylinder mass, and NFPA 20 fire pump pressure head.",
    icon: Flame,
    accentColor: "from-rose-500 to-red-600",
    tagClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    badges: ["NFPA 13", "NFPA 20", "NFPA 2001", "NFPA 14"],
    calculators: [
      "Sprinkler K-factor", "Sprinkler density & flow", "Hazen-Williams calculator", "FM-200 quantity calculator",
      "Fire water demand", "Fire pump duty (NFPA 20)", "Fire tank capacity", "Tank duration calculator"
    ],
    metric1: { label: "Sprinkler Flow Rate", value: "1,000 GPM" },
    metric2: { label: "Residual Pressure", value: "140 PSI" },
    chartType: "gauge",
    countText: "8 Fire Protection Calculators Available",
  },
  {
    id: "plumbing",
    tag: "PLUMBING & PUBLIC HEALTH",
    title: "IPC Water Demand, Booster Pumps & Storm Drainage",
    desc: "Full public health engineering suite covering Hunter Curve fixture units, domestic booster sets, sewer drainage slopes, and 100-year storm rainwater retention tanks.",
    icon: Droplets,
    accentColor: "from-emerald-500 to-teal-600",
    tagClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badges: ["IPC 2024", "UPC", "BS EN 806", "ASPE Data Book"],
    calculators: [
      "Water demand calculator", "Fixture unit calculator", "Loading unit calculator", "Water supply pipe sizer",
      "Drainage pipe sizing", "Discharge unit sizing", "Storm water sizing", "Booster pump sizing",
      "Sump pump sizing", "Sewage pump sizing", "Pressure vessel sizing", "Gas storage capacity",
      "Water tank sizing"
    ],
    metric1: { label: "Peak Fixture Units", value: "480 WSFU" },
    metric2: { label: "Booster Duty Head", value: "180 ft Dynamic" },
    chartType: "line",
    countText: "13 Plumbing Calculators Available",
  },
];

export function CalculatorSuite() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("hvac");
  const [expandedCard, setExpandedCard] = useState<string | null>("hvac");
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [activeCalcName, setActiveCalcName] = useState("Preliminary Cooling Load");

  const activeCard = solutionCards.find((c) => c.id === selectedDiscipline) || solutionCards[0];

  return (
    <section id="calculators" className="py-24 md:py-36 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Top Header Bar (Semrush Screenshot 4 Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <Reveal>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-black uppercase tracking-wider">
                <Calculator size={14} className="text-teal-500 shrink-0" />
                <span>SOLUTIONS (4 DISCIPLINES, 53+ ENGINES) — SIZED INSTANTLY. CODE REFERENCED.</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Every MEP calculator. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  One unified engine.
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Quick Discipline Switchers */}
          <div className="flex items-center gap-2">
            {solutionCards.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedDiscipline(c.id);
                  setExpandedCard(c.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  selectedDiscipline === c.id
                    ? "bg-foreground text-background shadow-md scale-105"
                    : "bg-muted/50 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {c.tag.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Semrush-Style Multi-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionCards.map((card) => {
            const isSelected = selectedDiscipline === card.id;

            return (
              <Reveal key={card.id}>
                <div
                  onClick={() => setSelectedDiscipline(card.id)}
                  className={`h-full rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-6 ${
                    isSelected
                      ? "border-teal-500/60 bg-card shadow-2xl ring-2 ring-teal-500/20 -translate-y-1"
                      : "border-border bg-card/60 hover:bg-card hover:border-teal-500/30 hover:shadow-lg"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${card.tagClass}`}>
                        {card.tag}
                      </span>
                      <div className={`grid size-7 place-items-center rounded-full border border-border bg-muted/40 transition-colors ${isSelected ? "bg-teal-500 text-slate-950 border-teal-500" : "text-muted-foreground"}`}>
                        <Plus size={14} />
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Embedded Miniature Engineering Chart / Telemetry Widget (Semrush Style) */}
                  <div className="rounded-2xl border border-border bg-slate-950 p-4 text-white space-y-3 shadow-inner">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                      <span>{card.metric1.label}</span>
                      <span className="text-teal-400">{card.metric1.value}</span>
                    </div>

                    {/* Chart Visualization Simulation */}
                    <div className="h-12 w-full bg-slate-900 rounded-lg p-2 flex items-end gap-1.5 overflow-hidden">
                      <div className="h-4 w-1/6 bg-teal-500/40 rounded-sm" />
                      <div className="h-7 w-1/6 bg-teal-500/60 rounded-sm" />
                      <div className="h-10 w-1/6 bg-teal-500 rounded-sm" />
                      <div className="h-8 w-1/6 bg-cyan-500 rounded-sm" />
                      <div className="h-11 w-1/6 bg-cyan-400 rounded-sm" />
                      <div className="h-9 w-1/6 bg-emerald-400 rounded-sm" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                      <span>{card.metric2.label}</span>
                      <span className="text-cyan-400">{card.metric2.value}</span>
                    </div>
                  </div>

                  {/* Badges Footer */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                    {card.badges.slice(0, 3).map((b) => (
                      <span key={b} className="rounded-md bg-muted px-2 py-0.5 text-[9px] font-mono font-bold text-muted-foreground">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Selected Discipline Full Interactive Calculator Drawer */}
        <Reveal delay={200} className="mt-12">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  ACTIVE SUITE MODULE
                </span>
                <h3 className="text-2xl font-extrabold text-foreground mt-1">
                  {activeCard.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
                  {activeCard.countText}
                </span>
              </div>
            </div>

            {/* Calculator Tiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {activeCard.calculators.map((calc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveCalcName(calc);
                    setIsLiveModalOpen(true);
                  }}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-border bg-muted/20 hover:bg-card hover:border-teal-500/40 hover:shadow-md transition-all duration-200 text-left cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-muted-foreground group-hover:text-foreground pr-3">
                    {calc}
                  </span>
                  <div className="size-6 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <ArrowRight size={12} className="group-hover:-rotate-45 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Live Interactive Solver Modal */}
        <LiveCalculatorModal
          isOpen={isLiveModalOpen}
          onClose={() => setIsLiveModalOpen(false)}
          calculatorName={activeCalcName}
          discipline={selectedDiscipline as any}
        />

        {/* Side-by-Side Comparison (Semrush Style) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-muted-foreground">Spreadsheets & Generic Tools</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground font-medium">
              <li className="flex items-start gap-3">
                <span className="opacity-40 font-mono font-bold">—</span> One calculator at a time with zero shared building physics model
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40 font-mono font-bold">—</span> Manual re-entry of calculations into drawings and schedules
              </li>
              <li className="flex items-start gap-3">
                <span className="opacity-40 font-mono font-bold">—</span> No automated standards audit trail or ASHRAE compliance proof
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-8 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-teal-400">TARV Unified Platform</h4>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                AI-Native Engine
              </span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 font-medium">
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-0.5 shrink-0 text-teal-400 font-bold" /> Every HVAC, electrical, fire and plumbing calculator in one shared model
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-0.5 shrink-0 text-teal-400 font-bold" /> Results flow straight into drawings, schedules, and live Revit models
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-0.5 shrink-0 text-teal-400 font-bold" /> Every output ships with its exact standard reference, math proof, and code citation
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
