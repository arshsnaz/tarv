import { useState } from "react";
import { Check, Wind, Thermometer, ShieldCheck, RefreshCw, Cpu, Zap, Sliders, ChevronRight, Activity, FileSpreadsheet, Layers, DollarSign, Search, CheckCircle2, ArrowRight } from "lucide-react";
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
  recommendation: string;
  savings: string;
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
    recommendation: "Downsize AHU-02 by 15% using Dual-Max VAV reset. Reduces fan power & saves $42k CapEx.",
    savings: "$42,000 CAPEX & 6% Annual kWh",
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
    recommendation: "Switch to In-Row CRAH with containment doors. Eliminates hot-aisle recirculation.",
    savings: "24% PUE Efficiency Boost",
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
    recommendation: "Optimize HEPA filter static pressure using low-friction plenum. Saves fan motor horsepower.",
    savings: "$18,500/yr Operating Costs",
  },
];

type ScheduleDiscipline = "hvac" | "electrical" | "plumbing";

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
}

const scheduleData: Record<ScheduleDiscipline, { label: string; rows: EquipmentRow[] }> = {
  hvac: {
    label: "Mechanical HVAC",
    rows: [
      { tag: "AHU-01", type: "Air Handling Unit", capacity: "12,000 CFM", dutyPoint: "2.1 in.wg", level: "Roof", status: "Validated", catalog: "Trane Performance AHU-45", family: "TARV_AHU_Custom.rfa", capex: "$42,500" },
      { tag: "AHU-02", type: "Air Handling Unit", capacity: "8,400 CFM", dutyPoint: "1.8 in.wg", level: "L14", status: "Optimized", catalog: "Carrier 39M Custom", family: "TARV_AHU_Custom.rfa", capex: "$31,200" },
      { tag: "CH-01", type: "Magnetic Chiller", capacity: "300 Tons", dutyPoint: "0.54 kW/Ton", level: "Plant", status: "Auto-Sized", catalog: "Daikin Pathfinder 300T", family: "TARV_Chiller_Mag.rfa", capex: "$145,000" },
      { tag: "VAV-201", type: "VAV Terminal Box", capacity: "1,200 CFM", dutyPoint: "0.5 in.wg", level: "L02", status: "Auto-Routed", catalog: "Titus DTQS Dual Max", family: "TARV_VAV_Terminal.rfa", capex: "$1,850" },
      { tag: "FCU-308", type: "Fan Coil Unit", capacity: "650 CFM", dutyPoint: "0.3 in.wg", level: "L03", status: "Validated", catalog: "McQuay ThinLine FCU", family: "TARV_FCU_Slim.rfa", capex: "$2,400" },
    ],
  },
  electrical: {
    label: "Electrical Power",
    rows: [
      { tag: "MDB-01", type: "Main Distribution Board", capacity: "2500 Amps", dutyPoint: "415V, 50kA 1s", level: "Basement", status: "Auto-Sized", catalog: "Schneider Okken 2500A", family: "TARV_MDB_Panel.rfa", capex: "$38,000" },
      { tag: "TR-01", type: "Cast Resin Transformer", capacity: "1500 kVA", dutyPoint: "11kV / 415V", level: "Substation", status: "Optimized", catalog: "ABB EcoDry 1500kVA", family: "TARV_Transformer.rfa", capex: "$64,000" },
      { tag: "GEN-01", type: "Standby Diesel Gen", capacity: "1000 kVA", dutyPoint: "Prime 800kW", level: "Yard", status: "Validated", catalog: "Cummins C1000D5", family: "TARV_Genset_Sound.rfa", capex: "$110,000" },
      { tag: "PFC-01", type: "Capacitor Bank", capacity: "400 kVAR", dutyPoint: "Auto 8-Step", level: "Basement", status: "Auto-Routed", catalog: "Siemens VarSet 400", family: "TARV_PFC_Panel.rfa", capex: "$16,500" },
    ],
  },
  plumbing: {
    label: "Plumbing & Drainage",
    rows: [
      { tag: "PUMP-01", type: "Hydro Booster Set", capacity: "120 GPM", dutyPoint: "180 ft Head", level: "Pump Rm", status: "Validated", catalog: "Grundfos Hydro MPC-E", family: "TARV_Booster_Set.rfa", capex: "$22,400" },
      { tag: "SUMP-02", type: "Submersible Sump", capacity: "80 GPM", dutyPoint: "45 ft Head", level: "Pit B2", status: "Optimized", catalog: "Flygt Concertor N", family: "TARV_Sump_Pump.rfa", capex: "$8,900" },
      { tag: "TANK-01", type: "Domestic Water Tank", capacity: "50,000 Gal", dutyPoint: "GRP Sectional", level: "Roof", status: "Auto-Sized", catalog: "Pipeco GRP Panel", family: "TARV_Water_Tank.rfa", capex: "$45,000" },
      { tag: "WTR-01", type: "Central Solar Heater", capacity: "3,000 LPD", dutyPoint: "80% Solar Fraction", level: "Roof", status: "Validated", catalog: "Racold Commercial Solar", family: "TARV_Solar_Heater.rfa", capex: "$18,200" },
    ],
  },
};

export function Hvac() {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const [glazingModifier, setGlazingModifier] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const baseZone = zonePresets[selectedZoneIndex];

  const calculatedSensible = Math.round(baseZone.sensible * (1 + glazingModifier * 0.005));
  const calculatedOutdoor = Math.round(baseZone.outdoor * (1 + glazingModifier * 0.002));
  const calculatedTotalTons = (
    (calculatedSensible + baseZone.latent + calculatedOutdoor * 1.08) /
    12000
  ).toFixed(1);

  const handleZoneChange = (index: number) => {
    setIsSimulating(true);
    setSelectedZoneIndex(index);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <section id="hvac" className="panel-gradient relative py-28 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-brand-soft/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold text-brand uppercase tracking-wider max-w-full text-center">
              <Wind size={14} className="text-brand animate-pulse shrink-0" />
              <span>SMART HVAC & BUILDING PHYSICS ENGINE</span>
            </div>

            <h2 className="text-balance mt-6 text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
              Calculations that think ahead.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Real-time heat load, airflow, and duct static pressure calculations powered by physics-based solver engines — continuously validated by AI against ASHRAE & IPC codes.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { title: "ASHRAE 62.1 & 90.1 Load Sizing", desc: "Instant sensible, latent, and outdoor fresh air load balancing." },
                { title: "Automatic Duct Routing & Static Pressure", desc: "Equal friction & static regain method calculations in 2 seconds." },
                { title: "Psychrometric & Airflow Simulation", desc: "Interactive coil performance curves and VAV airflow resets." },
              ].map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-md mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{p.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="glass relative rounded-[2.5rem] p-6 md:p-8 border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Cpu size={20} className={isSimulating ? "animate-spin" : ""} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Physics Engine Simulator
                    </div>
                    <div className="text-sm font-extrabold text-foreground">Interactive Zone Heat Load Solver</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  CONVERGED · 0.02 sec
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {zonePresets.map((z, idx) => (
                  <button
                    key={z.name}
                    onClick={() => handleZoneChange(idx)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                      selectedZoneIndex === idx
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                        : "bg-surface/80 text-muted-foreground hover:bg-accent hover:text-foreground border border-white/5"
                    }`}
                  >
                    {z.type}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass-subtle rounded-2xl p-4 border border-white/5">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Sensible Heat Gain</div>
                  <div className="text-2xl font-mono font-extrabold text-foreground mt-1">
                    {calculatedSensible.toLocaleString()} <span className="text-xs font-sans text-muted-foreground font-normal">BTU/h</span>
                  </div>
                </div>

                <div className="glass-subtle rounded-2xl p-4 border border-white/5">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Outdoor Air Load</div>
                  <div className="text-2xl font-mono font-extrabold text-foreground mt-1">
                    {calculatedOutdoor.toLocaleString()} <span className="text-xs font-sans text-muted-foreground font-normal">CFM</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-surface/50 p-4 border border-white/5">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Thermometer size={14} className="text-brand" /> Glass Glazing Ratio Adjustment:
                  </span>
                  <span className="font-mono text-brand">{baseZone.glazing + glazingModifier}%</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="25"
                  value={glazingModifier}
                  onChange={(e) => setGlazingModifier(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                  <span>Standard Shading (−15%)</span>
                  <span>Baseline</span>
                  <span>High Solar Gain (+25%)</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-zinc-950 p-5 border border-white/10 text-white shadow-xl">
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Calculated Cooling Load</div>
                  <div className="text-3xl font-mono font-extrabold text-brand mt-0.5">
                    {calculatedTotalTons} <span className="text-lg font-sans text-white font-semibold">Tons</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                    <ShieldCheck size={14} /> ASHRAE 90.1 Compliant
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-mono">Safety Factor: +10% Built-In</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-r from-brand to-primary p-5 text-white shadow-xl border border-white/20 flex items-start gap-3">
                <Zap size={20} className="shrink-0 text-amber-300 mt-0.5 animate-pulse" />
                <div>
                  <div className="font-extrabold text-sm text-white flex items-center gap-1.5">TARV AI Optimization Insight:</div>
                  <div className="mt-1.5 text-xs text-white/95 leading-relaxed font-medium">{baseZone.recommendation}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 font-bold text-emerald-300 bg-black/40 border border-emerald-400/40 px-3 py-1.5 rounded-full text-xs shadow-sm">
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
    <section id="schedules" className="py-28 md:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold text-brand uppercase tracking-wider max-w-full text-center">
              <FileSpreadsheet size={14} className="text-brand shrink-0" />
              <span>AUTOMATED BIM SCHEDULE & TAKEOFF STUDIO</span>
            </div>
            <h2 className="text-balance mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
              Equipment schedules, generated.
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-muted-foreground leading-relaxed">
              From single-line diagrams to complete, code-verified equipment schedules in seconds. Bi-directionally synced with Revit 2025, BIM 360, and your master spec library.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: Interactive Multi-Discipline Live Revit Table */}
          <Reveal className="lg:col-span-7">
            <div className="glass overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
              
              {/* Discipline Switcher & Search Bar */}
              <div className="p-3.5 sm:p-5 bg-surface/60 border-b border-border/80 space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Discipline Switcher Pills - Horizontal Touch Scrollable */}
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
                          className={`shrink-0 snap-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                              : "bg-surface text-muted-foreground hover:bg-accent hover:text-foreground border border-white/5"
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-3.5 py-2 text-xs font-mono font-bold text-brand hover:bg-brand/20 transition-all cursor-pointer shrink-0"
                  >
                    <RefreshCw size={13} className={isSyncing ? "animate-spin text-brand" : ""} />
                    {isSyncing ? "Syncing Revit..." : syncSuccess ? "14 Parameters Pushed ✓" : "Push to Revit"}
                  </button>
                </div>

                {/* Filter Input */}
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search equipment tag, type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-white/10 bg-background/80 py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition-all focus:border-brand"
                  />
                </div>
              </div>

              {/* Mobile Table Swipe Hint */}
              <div className="flex sm:hidden items-center justify-between text-[10px] text-muted-foreground px-4 py-1.5 bg-surface-2/80 border-b border-border/40 font-mono">
                <span>EQUIPMENT SCHEDULE</span>
                <span className="text-brand font-bold">Scroll table right →</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-xs min-w-[540px] sm:min-w-full">
                  <thead className="bg-surface-2/80">
                    <tr className="text-left tracking-wider text-muted-foreground uppercase font-bold text-[10px] sm:text-xs">
                      {["Tag", "Equipment Type", "Capacity / Rating", "Duty Point", "Level", "Sync Status"].map((h) => (
                        <th key={h} className="px-3.5 sm:px-5 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredRows.length > 0 ? (
                      filteredRows.map((r) => {
                        const isSelected = selectedItem.tag === r.tag;
                        return (
                          <tr
                            key={r.tag}
                            onClick={() => setSelectedTag(r.tag)}
                            className={`cursor-pointer transition-colors duration-200 ${
                              isSelected ? "bg-brand/15 dark:bg-brand/20 border-l-4 border-l-brand" : "hover:bg-accent/40"
                            }`}
                          >
                            <td className="px-3.5 sm:px-5 py-3 font-mono font-extrabold text-foreground">{r.tag}</td>
                            <td className="px-3.5 sm:px-5 py-3 text-muted-foreground font-medium">{r.type}</td>
                            <td className="px-3.5 sm:px-5 py-3 font-mono font-bold text-brand">{r.capacity}</td>
                            <td className="px-3.5 sm:px-5 py-3 font-mono text-muted-foreground">{r.dutyPoint}</td>
                            <td className="px-3.5 sm:px-5 py-3 text-muted-foreground">{r.level}</td>
                            <td className="px-3.5 sm:px-5 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                          No equipment matching "{searchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Active Inspector Footer */}
              <div className="border-t border-border/80 p-3.5 sm:p-4 bg-zinc-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-brand animate-pulse" />
                  <span className="text-xs font-mono">Active Tag: <strong className="text-brand font-bold">{selectedItem.tag}</strong></span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 font-medium flex items-center gap-1">
                  2-Way Revit Parameter Mapping Active <ChevronRight size={14} className="text-brand" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Live Interactive Equipment Spec & Parameter Card */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="glass relative rounded-[2.5rem] p-7 border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20 space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-mono font-extrabold text-sm">
                    {selectedItem.tag.substring(0, 3)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand uppercase tracking-widest">
                      {selectedItem.type}
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mt-0.5">{selectedItem.tag}</h3>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-500">
                  {selectedItem.status}
                </span>
              </div>

              {/* Live Spec Parameters */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between rounded-xl bg-surface/50 p-3.5 border border-white/5 text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <Layers size={14} className="text-brand" /> BIM Family Template:
                  </span>
                  <span className="font-mono font-bold text-foreground">{selectedItem.family}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface/50 p-3.5 border border-white/5 text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <Cpu size={14} className="text-brand" /> Manufacturer Spec Match:
                  </span>
                  <span className="font-bold text-brand">{selectedItem.catalog}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface/50 p-3.5 border border-white/5 text-xs">
                  <span className="text-muted-foreground font-semibold flex items-center gap-2">
                    <DollarSign size={14} className="text-emerald-500" /> Estimated CapEx Unit Cost:
                  </span>
                  <span className="font-mono font-extrabold text-emerald-500 text-sm">{selectedItem.capex}</span>
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
                    className="glass-subtle rounded-2xl p-3.5 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30"
                  >
                    <item.icon size={16} className="text-brand mb-1.5" />
                    <div className="text-xs font-bold text-foreground">{item.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={triggerRevitSync}
                disabled={isSyncing}
                className="w-full group inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:opacity-90 cursor-pointer"
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
