import { useState } from "react";
import { Check, Wind, Thermometer, ShieldCheck, RefreshCw, Cpu, Zap, Sliders, ChevronRight, Activity, FileSpreadsheet, Layers, DollarSign, Search, CheckCircle2, ArrowRight, ArrowUpRight, Gauge, BarChart3, Plus } from "lucide-react";
import { Reveal } from "./reveal";

interface ZonePreset {
  name: string;
  type: string;
  area: number; // sq ft
  occupancy: number; // people
  glazing: number; // %
  sensible: number; // BTU/h
  latent: number; // BTU/h
  outdoor: number; // CFM
  totalTons: number;
  ahuCfm: number;
  recommendation: string;
  savings: string;
  sensiblePct: number;
  latentPct: number;
  solarPct: number;
}

const zonePresets: ZonePreset[] = [
  {
    name: "Zone A · High-Rise Office Tower",
    type: "Commercial Office",
    area: 45000,
    occupancy: 220,
    glazing: 45,
    sensible: 412880,
    latent: 78300,
    outdoor: 92450,
    totalTons: 184.2,
    ahuCfm: 16500,
    recommendation: "Downsize AHU-02 by 15% using Dual-Max VAV reset. Reduces fan power & saves $42k CapEx.",
    savings: "$42,000 CAPEX & 6% Annual kWh",
    sensiblePct: 62,
    latentPct: 15,
    solarPct: 23,
  },
  {
    name: "Zone B · Data Center & Server Hall",
    type: "Mission Critical",
    area: 12000,
    occupancy: 15,
    glazing: 0,
    sensible: 840000,
    latent: 12000,
    outdoor: 18000,
    totalTons: 284.0,
    ahuCfm: 32000,
    recommendation: "Switch to In-Row CRAH with containment doors. Eliminates hot-aisle recirculation.",
    savings: "24% PUE Efficiency Boost",
    sensiblePct: 92,
    latentPct: 3,
    solarPct: 5,
  },
  {
    name: "Zone C · Surgical Hospital Operating Rooms",
    type: "Healthcare / Cleanroom",
    area: 18000,
    occupancy: 60,
    glazing: 10,
    sensible: 290000,
    latent: 110000,
    outdoor: 145000,
    totalTons: 142.5,
    ahuCfm: 24000,
    recommendation: "Optimize HEPA filter static pressure using low-friction plenum. Saves fan motor horsepower.",
    savings: "$18,500/yr Operating Costs",
    sensiblePct: 48,
    latentPct: 32,
    solarPct: 20,
  },
  {
    name: "Zone D · 5-Star Luxury Hotel Suites",
    type: "Hospitality & Resort",
    area: 32000,
    occupancy: 160,
    glazing: 35,
    sensible: 340000,
    latent: 95000,
    outdoor: 68000,
    totalTons: 128.6,
    ahuCfm: 14200,
    recommendation: "Deploy acoustic attenuators on FCU discharge and integrate keycard setbacks to trim peak load.",
    savings: "$26,000/yr Energy Savings",
    sensiblePct: 55,
    latentPct: 22,
    solarPct: 23,
  },
];

type ScheduleDiscipline = "hvac" | "electrical" | "plumbing" | "fire";

interface EquipmentRow {
  tag: string;
  type: string;
  capacity: string;
  dutyPoint: string;
  level: string;
  status: string;
  catalog: string;
  family: string;
  capex: string;
  codeStandard: string;
}

const scheduleData: Record<ScheduleDiscipline, { label: string; tag: string; rows: EquipmentRow[] }> = {
  hvac: {
    label: "Mechanical HVAC",
    tag: "HVAC SIZING",
    rows: [
      { tag: "AHU-01", type: "Air Handling Unit", capacity: "12,000 CFM", dutyPoint: "2.1 in.wg", level: "Roof", status: "Validated", catalog: "Trane Performance AHU-45", family: "TARV_AHU_Custom.rfa", capex: "$42,500", codeStandard: "ASHRAE 62.1" },
      { tag: "AHU-02", type: "Air Handling Unit", capacity: "8,400 CFM", dutyPoint: "1.8 in.wg", level: "L14", status: "Optimized", catalog: "Carrier 39M Custom", family: "TARV_AHU_Custom.rfa", capex: "$31,200", codeStandard: "ASHRAE 90.1" },
      { tag: "CH-01", type: "Magnetic Chiller", capacity: "300 Tons", dutyPoint: "0.54 kW/Ton", level: "Plant", status: "Auto-Sized", catalog: "Daikin Pathfinder 300T", family: "TARV_Chiller_Mag.rfa", capex: "$145,000", codeStandard: "AHRI 550/590" },
      { tag: "VAV-201", type: "VAV Terminal Box", capacity: "1,200 CFM", dutyPoint: "0.5 in.wg", level: "L02", status: "Auto-Routed", catalog: "Titus DTQS Dual Max", family: "TARV_VAV_Terminal.rfa", capex: "$1,850", codeStandard: "SMACNA 2021" },
      { tag: "FCU-308", type: "Fan Coil Unit", capacity: "650 CFM", dutyPoint: "0.3 in.wg", level: "L03", status: "Validated", catalog: "McQuay ThinLine FCU", family: "TARV_FCU_Slim.rfa", capex: "$2,400", codeStandard: "ASHRAE 90.1" },
    ],
  },
  electrical: {
    label: "Electrical Power",
    tag: "ELECTRICAL SIZING",
    rows: [
      { tag: "MDB-01", type: "Main Distribution Board", capacity: "2500 Amps", dutyPoint: "415V, 50kA 1s", level: "Basement", status: "Auto-Sized", catalog: "Schneider Okken 2500A", family: "TARV_MDB_Panel.rfa", capex: "$38,000", codeStandard: "IEC 61439" },
      { tag: "TR-01", type: "Cast Resin Transformer", capacity: "1500 kVA", dutyPoint: "11kV / 415V", level: "Substation", status: "Optimized", catalog: "ABB EcoDry 1500kVA", family: "TARV_Transformer.rfa", capex: "$64,000", codeStandard: "IEEE C57.12" },
      { tag: "GEN-01", type: "Standby Diesel Gen", capacity: "1000 kVA", dutyPoint: "Prime 800kW", level: "Yard", status: "Validated", catalog: "Cummins C1000D5", family: "TARV_Genset_Sound.rfa", capex: "$110,000", codeStandard: "NFPA 110" },
      { tag: "PFC-01", type: "Capacitor Bank", capacity: "400 kVAR", dutyPoint: "Auto 8-Step", level: "Basement", status: "Auto-Routed", catalog: "Siemens VarSet 400", family: "TARV_PFC_Panel.rfa", capex: "$16,500", codeStandard: "IS 7752" },
    ],
  },
  plumbing: {
    label: "Plumbing & Drainage",
    tag: "PLUMBING HYDRAULICS",
    rows: [
      { tag: "PUMP-01", type: "Hydro Booster Set", capacity: "120 GPM", dutyPoint: "180 ft Head", level: "Pump Rm", status: "Validated", catalog: "Grundfos Hydro MPC-E", family: "TARV_Booster_Set.rfa", capex: "$22,400", codeStandard: "IPC 2024" },
      { tag: "SUMP-02", type: "Submersible Sump", capacity: "80 GPM", dutyPoint: "45 ft Head", level: "Pit B2", status: "Optimized", catalog: "Flygt Concertor N", family: "TARV_Sump_Pump.rfa", capex: "$8,900", codeStandard: "ASPE Book" },
      { tag: "TANK-01", type: "Domestic Water Tank", capacity: "50,000 Gal", dutyPoint: "GRP Sectional", level: "Roof", status: "Auto-Sized", catalog: "Pipeco GRP Panel", family: "TARV_Water_Tank.rfa", capex: "$45,000", codeStandard: "BS EN 13280" },
      { tag: "WTR-01", type: "Central Solar Heater", capacity: "3,000 LPD", dutyPoint: "80% Solar Fraction", level: "Roof", status: "Validated", catalog: "Racold Commercial Solar", family: "TARV_Solar_Heater.rfa", capex: "$18,200", codeStandard: "ASHRAE 93" },
    ],
  },
  fire: {
    label: "Fire Suppression",
    tag: "FIRE PROTECTION",
    rows: [
      { tag: "FP-01", type: "Electric Fire Pump", capacity: "1000 GPM", dutyPoint: "140 PSI Head", level: "Pump Rm", status: "Auto-Sized", catalog: "Armstrong 4600 Series", family: "TARV_Fire_Pump.rfa", capex: "$52,000", codeStandard: "NFPA 20" },
      { tag: "JOCKEY-01", type: "Pressure Jockey Pump", capacity: "15 GPM", dutyPoint: "150 PSI Head", level: "Pump Rm", status: "Validated", catalog: "Grundfos CR-15", family: "TARV_Jockey_Pump.rfa", capex: "$6,200", codeStandard: "NFPA 20" },
      { tag: "FM200-01", type: "Clean Agent Cylinder", capacity: "450 kg", dutyPoint: "42 Bar Nitrogen", level: "Server Rm", status: "Optimized", catalog: "Kidde ECS FM-200", family: "TARV_FM200_Cyl.rfa", capex: "$34,000", codeStandard: "NFPA 2001" },
    ],
  },
};

export function Hvac() {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const [glazingModifier, setGlazingModifier] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<"thermal" | "airflow" | "psychrometric">("thermal");

  const baseZone = zonePresets[selectedZoneIndex];

  const calculatedSensible = Math.round(baseZone.sensible * (1 + glazingModifier * 0.005));
  const calculatedOutdoor = Math.round(baseZone.outdoor * (1 + glazingModifier * 0.002));
  const calculatedTotalTons = (
    (calculatedSensible + baseZone.latent + calculatedOutdoor * 1.08) /
    12000
  ).toFixed(1);
  const calculatedAhuCfm = Math.round(baseZone.ahuCfm * (1 + glazingModifier * 0.004));

  const handleZoneChange = (index: number) => {
    setIsSimulating(true);
    setSelectedZoneIndex(index);
    setTimeout(() => setIsSimulating(false), 250);
  };

  return (
    <section id="hvac" className="relative py-24 md:py-36 overflow-hidden bg-background">
      {/* Background Lighting Orbs */}
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Text & Value Proposition */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider">
              <Wind size={14} className="text-cyan-500 animate-pulse shrink-0" />
              <span>SMART HVAC & BUILDING PHYSICS ENGINE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Calculations that <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                think ahead.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
              Real-time heat load, airflow, and duct static pressure calculations powered by physics-based solver engines — continuously validated by AI against ASHRAE & IPC codes.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                { title: "ASHRAE 62.1 & 90.1 Load Sizing", desc: "Instant sensible, latent, and outdoor fresh air load balancing." },
                { title: "Automatic Duct Routing & Static Pressure", desc: "Equal friction & static regain method calculations in 2 seconds." },
                { title: "Psychrometric & Airflow Simulation", desc: "Interactive coil performance curves and VAV airflow resets." },
              ].map((p) => (
                <li key={p.title} className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-cyan-500/30 transition-all shadow-sm">
                  <div className="grid size-6 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mt-0.5 font-bold">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right Column: Interactive Physics Engine Simulator Stage */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 sm:p-8 border border-border bg-card shadow-2xl space-y-6 transition-all duration-300 hover:border-cyan-500/40">
              
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20 shadow-sm">
                    <Cpu size={20} className={isSimulating ? "animate-spin text-cyan-400" : ""} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                      PHYSICS ENGINE SIMULATOR
                    </span>
                    <h3 className="text-sm font-extrabold text-foreground">Interactive Zone Heat Load Solver</h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  CONVERGED · 0.02 sec
                </div>
              </div>

              {/* Zone Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {zonePresets.map((z, idx) => (
                  <button
                    key={z.name}
                    type="button"
                    onClick={() => handleZoneChange(idx)}
                    className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                      selectedZoneIndex === idx
                        ? "bg-cyan-500 text-slate-950 shadow-md scale-105"
                        : "bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {z.type}
                  </button>
                ))}
              </div>

              {/* View Switcher Tabs (Semrush Style) */}
              <div className="flex items-center gap-2 border-b border-border/80 pb-2">
                {[
                  { key: "thermal", label: "Thermal Loads", icon: Thermometer },
                  { key: "airflow", label: "Airflow Sizing", icon: Wind },
                  { key: "psychrometric", label: "Psychrometric Balance", icon: Gauge },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveMetricTab(t.key as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMetricTab === t.key
                        ? "bg-muted text-foreground border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <t.icon size={13} className={activeMetricTab === t.key ? "text-cyan-500" : ""} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content */}
              {activeMetricTab === "thermal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl p-4 border border-border bg-muted/30 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                        SENSIBLE HEAT GAIN
                      </span>
                      <div className="text-2xl font-mono font-extrabold text-foreground">
                        {calculatedSensible.toLocaleString()} <span className="text-xs font-sans font-bold text-muted-foreground">BTU/h</span>
                      </div>
                    </div>

                    <div className="rounded-2xl p-4 border border-border bg-muted/30 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                        OUTDOOR AIR LOAD
                      </span>
                      <div className="text-2xl font-mono font-extrabold text-foreground">
                        {calculatedOutdoor.toLocaleString()} <span className="text-xs font-sans font-bold text-muted-foreground">CFM</span>
                      </div>
                    </div>
                  </div>

                  {/* Load Heat Breakdown Progress Meter */}
                  <div className="rounded-2xl p-4 border border-border bg-muted/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Heat Gain Distribution Profile:</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">100% Sized</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex">
                      <div style={{ width: `${baseZone.sensiblePct}%` }} className="bg-cyan-500 h-full" title="Sensible Load" />
                      <div style={{ width: `${baseZone.latentPct}%` }} className="bg-blue-500 h-full" title="Latent Load" />
                      <div style={{ width: `${baseZone.solarPct}%` }} className="bg-amber-500 h-full" title="Solar Radiation" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-cyan-500" /> Sensible ({baseZone.sensiblePct}%)</span>
                      <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500" /> Latent ({baseZone.latentPct}%)</span>
                      <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-500" /> Solar Glazing ({baseZone.solarPct}%)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMetricTab === "airflow" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl p-4 border border-border bg-muted/30 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                      SUPPLY AIRFLOW (AHU)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-foreground">
                      {calculatedAhuCfm.toLocaleString()} <span className="text-xs font-sans font-bold text-muted-foreground">CFM</span>
                    </div>
                  </div>
                  <div className="rounded-2xl p-4 border border-border bg-muted/30 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                      MIN. FRESH AIR (ASHRAE 62.1)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-cyan-600 dark:text-cyan-400">
                      {Math.round(baseZone.occupancy * 20 + baseZone.area * 0.06).toLocaleString()} <span className="text-xs font-sans font-bold text-muted-foreground">CFM</span>
                    </div>
                  </div>
                </div>
              )}

              {activeMetricTab === "psychrometric" && (
                <div className="rounded-2xl p-4 border border-border bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-muted-foreground">Apparatus Dew Point (ADP):</span>
                    <span className="text-foreground">52.4 °F (11.3 °C)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-muted-foreground">Coil Bypass Factor (BF):</span>
                    <span className="text-foreground">0.12 (88% Contact Efficiency)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-muted-foreground">Grand Sensible Heat Factor (GSHF):</span>
                    <span className="text-cyan-600 dark:text-cyan-400">0.82 (ASHRAE Optimized)</span>
                  </div>
                </div>
              )}

              {/* Glazing Adjustment Slider Box */}
              <div className="rounded-2xl p-4.5 border border-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Thermometer size={14} className="text-cyan-500" /> Glass Glazing Ratio Adjustment:
                  </span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">
                    {baseZone.glazing + glazingModifier}%
                  </span>
                </div>

                <input
                  type="range"
                  min="-15"
                  max="25"
                  value={glazingModifier}
                  onChange={(e) => setGlazingModifier(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-muted rounded-lg"
                />

                <div className="flex justify-between text-[10px] font-mono font-bold text-muted-foreground">
                  <span>Standard Shading (−15%)</span>
                  <span>Baseline</span>
                  <span>High Solar Gain (+25%)</span>
                </div>
              </div>

              {/* Output Calculation Highlight Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-slate-950 p-6 border border-slate-800 text-white shadow-xl">
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block">
                    TOTAL CALCULATED COOLING LOAD
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-extrabold text-cyan-400 mt-1">
                    {calculatedTotalTons} <span className="text-lg font-sans text-white font-bold">Tons</span>
                  </div>
                </div>

                <div className="sm:text-right space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    <ShieldCheck size={14} /> ASHRAE 90.1 Compliant
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block font-medium">
                    Safety Factor: +10% Built-In
                  </span>
                </div>
              </div>

              {/* AI Optimization Insight Callout Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-5 text-white shadow-xl border border-blue-400/30 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Zap size={18} className="text-amber-300 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-cyan-200 block">
                    TARV AI Optimization Insight:
                  </span>
                  <p className="text-xs text-white/95 leading-relaxed font-medium">
                    {baseZone.recommendation}
                  </p>
                  <div className="inline-flex items-center gap-1.5 font-mono font-bold text-xs text-cyan-300 bg-slate-950/70 border border-cyan-400/30 px-3 py-1.5 rounded-full shadow-sm">
                    Impact: {baseZone.savings}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export function Schedules() {
  const [activeDiscipline, setActiveDiscipline] = useState<ScheduleDiscipline>("hvac");
  const [selectedTag, setSelectedTag] = useState("AHU-01");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const currentDiscipline = scheduleData[activeDiscipline];

  const filteredRows = currentDiscipline.rows.filter(
    (r) =>
      r.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.catalog.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedItem =
    currentDiscipline.rows.find((r) => r.tag === selectedTag) || currentDiscipline.rows[0];

  const triggerRevitSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section id="schedules" className="py-24 md:py-36 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Section Header (Semrush Solutions Style) */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
              <FileSpreadsheet size={14} className="text-blue-500 shrink-0" />
              <span>SOLUTIONS (4 DISCIPLINES) — SIZED INSTANTLY. CODE VERIFIED. BIM CONNECTED.</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mt-4 leading-[1.1]">
              Schedules that sync with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-500 bg-clip-text text-transparent">
                your live model.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              From single-line diagrams to complete, code-verified equipment schedules in seconds. Bi-directionally synced with Revit 2025, BIM 360, and your master spec library.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: Interactive Multi-Discipline Live Revit Table */}
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-300 hover:border-blue-500/40">
              
              {/* Discipline Switcher & Search Bar */}
              <div className="p-4 sm:p-5 bg-muted/20 border-b border-border space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Discipline Switcher Pills */}
                  <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory items-center gap-1.5 pb-1 sm:pb-0 w-full sm:w-auto">
                    {(Object.keys(scheduleData) as ScheduleDiscipline[]).map((dKey) => {
                      const disc = scheduleData[dKey];
                      const isActive = activeDiscipline === dKey;
                      return (
                        <button
                          key={dKey}
                          onClick={() => {
                            setActiveDiscipline(dKey);
                            setSelectedTag(scheduleData[dKey].rows[0].tag);
                          }}
                          className={`shrink-0 snap-center rounded-xl px-4 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md scale-105"
                              : "bg-muted/60 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {disc.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={triggerRevitSync}
                    disabled={isSyncing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/30 px-4 py-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer shrink-0"
                  >
                    <RefreshCw size={13} className={isSyncing ? "animate-spin text-blue-500" : ""} />
                    {isSyncing ? "Syncing Revit..." : syncSuccess ? "14 Parameters Pushed ✓" : "Push to Revit"}
                  </button>
                </div>

                {/* Filter Input */}
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search equipment tag, type, capacity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-xs min-w-[540px] sm:min-w-full">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr className="text-left tracking-wider text-muted-foreground uppercase font-mono font-bold text-[10px]">
                      {["Tag", "Equipment Type", "Capacity / Rating", "Duty Point", "Level", "Sync Status"].map((h) => (
                        <th key={h} className="px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRows.length > 0 ? (
                      filteredRows.map((r) => {
                        const isSelected = selectedItem.tag === r.tag;
                        return (
                          <tr
                            key={r.tag}
                            onClick={() => setSelectedTag(r.tag)}
                            className={`cursor-pointer transition-colors duration-150 ${
                              isSelected ? "bg-blue-500/10 border-l-4 border-l-blue-600" : "hover:bg-muted/40"
                            }`}
                          >
                            <td className="px-4 py-3 font-mono font-extrabold text-foreground">{r.tag}</td>
                            <td className="px-4 py-3 text-muted-foreground font-medium">{r.type}</td>
                            <td className="px-4 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">{r.capacity}</td>
                            <td className="px-4 py-3 font-mono text-muted-foreground">{r.dutyPoint}</td>
                            <td className="px-4 py-3 text-muted-foreground font-medium">{r.level}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-500 border border-emerald-500/20">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground font-medium">
                          No equipment matching "{searchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Active Inspector Footer */}
              <div className="border-t border-border p-4 bg-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-blue-400 animate-pulse" />
                  <span className="text-xs font-mono">Active Tag: <strong className="text-blue-400 font-bold">{selectedItem.tag}</strong></span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium flex items-center gap-1 font-mono">
                  2-Way Revit Parameter Mapping Active <ChevronRight size={14} className="text-blue-400" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Live Interactive Equipment Spec & Parameter Card */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative rounded-3xl p-6 sm:p-7 border border-border bg-card shadow-2xl space-y-6 transition-all duration-300 hover:border-blue-500/40">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md">
                    {selectedItem.tag.substring(0, 3)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                      {selectedItem.type}
                    </span>
                    <h3 className="text-xl font-extrabold text-foreground mt-0.5">{selectedItem.tag}</h3>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-500">
                  {selectedItem.status}
                </span>
              </div>

              {/* Live Spec Parameters */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3.5 border border-border text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <Layers size={14} className="text-blue-500" /> BIM Family Template:
                  </span>
                  <span className="font-mono font-bold text-foreground">{selectedItem.family}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3.5 border border-border text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <Cpu size={14} className="text-blue-500" /> Manufacturer Spec Match:
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{selectedItem.catalog}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3.5 border border-border text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <DollarSign size={14} className="text-emerald-500" /> Estimated CapEx Unit Cost:
                  </span>
                  <span className="font-mono font-extrabold text-emerald-500 text-sm">{selectedItem.capex}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3.5 border border-border text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <ShieldCheck size={14} className="text-cyan-500" /> Engineering Reference Code:
                  </span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{selectedItem.codeStandard}</span>
                </div>
              </div>

              {/* Features Pill Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { title: "Auto-Tagging", desc: "Zero manual tag errors", icon: CheckCircle2 },
                  { title: "Live Revit Sync", desc: "< 1.2s parameter push", icon: RefreshCw },
                  { title: "Cost Rollup", desc: "Instant CapEx calculation", icon: DollarSign },
                  { title: "Spec-Aware", desc: "100k+ catalog families", icon: Layers },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl p-3.5 border border-border bg-muted/20 transition-all duration-200 hover:border-blue-500/30"
                  >
                    <item.icon size={16} className="text-blue-500 mb-1.5" />
                    <div className="text-xs font-bold text-foreground">{item.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={triggerRevitSync}
                disabled={isSyncing}
                className="w-full group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 py-3.5 text-sm font-extrabold text-white shadow-xl transition-all duration-300 hover:bg-blue-700 cursor-pointer"
              >
                {isSyncing ? "Pushing Parameters..." : "Sync All Parameters to Revit Model"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
