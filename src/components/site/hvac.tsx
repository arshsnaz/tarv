import { useState } from "react";
import { Check, Wind, Thermometer, ShieldCheck, RefreshCw, Cpu, Zap, Sliders, ChevronRight, Activity, FileSpreadsheet } from "lucide-react";
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

const scheduleRows = [
  { tag: "AHU-01", type: "Air Handling Unit", airflow: "12,000 CFM", staticP: "2.1 in.wg", level: "Roof", status: "Validated", active: true },
  { tag: "AHU-02", type: "Air Handling Unit", airflow: "8,400 CFM", staticP: "1.8 in.wg", level: "L14", status: "Optimized", active: true },
  { tag: "CH-01", type: "Magnetic Chiller", airflow: "300 Tons", staticP: "N/A", level: "Plant", status: "Auto-Sized", active: true },
  { tag: "VAV-201", type: "VAV Terminal", airflow: "1,200 CFM", staticP: "0.5 in.wg", level: "L02", status: "Auto-Routed", active: true },
  { tag: "FCU-308", type: "Fan Coil Unit", airflow: "650 CFM", staticP: "0.3 in.wg", level: "L03", status: "Validated", active: true },
];

export function Hvac() {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const [glazingModifier, setGlazingModifier] = useState(0); // slider adjustment
  const [isSimulating, setIsSimulating] = useState(false);

  const baseZone = zonePresets[selectedZoneIndex];

  // Dynamic calculations based on interactive glazing modifier
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
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-brand-soft/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Heading & Core Features */}
          <Reveal className="lg:col-span-5">
            <div className="eyebrow inline-flex items-center gap-2">
              <Wind size={15} className="text-brand animate-pulse" />
              SMART HVAC & BUILDING PHYSICS ENGINE
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

          {/* Right Column: Interactive Real-Time Simulator Dashboard */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="glass relative rounded-[2.5rem] p-6 md:p-8 border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
              
              {/* Simulator Header */}
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

              {/* Zone Selector Pills */}
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

              {/* Interactive Glass Metrics Grid */}
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

              {/* Interactive Glazing Slider */}
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

              {/* Total Cooling Load Highlight Card */}
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

              {/* AI Optimization Recommendation Banner */}
              <div className="mt-5 rounded-2xl bg-primary p-4 text-xs leading-relaxed text-primary-foreground flex items-start gap-3 shadow-lg">
                <Zap size={18} className="shrink-0 text-brand mt-0.5 animate-bounce" />
                <div>
                  <div className="font-bold text-sm">TARV AI Optimization Insight:</div>
                  <div className="mt-1 opacity-90">{baseZone.recommendation}</div>
                  <div className="mt-2 inline-flex items-center gap-1 font-extrabold text-brand bg-white/10 px-2.5 py-1 rounded-full text-[11px]">
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
  const [selectedTag, setSelectedTag] = useState("AHU-01");

  return (
    <section id="schedules" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Interactive Live Revit Schedule Inspector */}
          <Reveal className="lg:col-span-7">
            <div className="glass overflow-hidden rounded-[2.5rem] border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-surface/50">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet size={18} className="text-brand" />
                  <span className="text-sm font-bold text-foreground">Revit Live Equipment Schedule · Project Aurora</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-mono font-bold text-brand">
                  <RefreshCw size={12} className="animate-spin" /> Live Sync
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-surface-2/80">
                    <tr className="text-left tracking-wider text-muted-foreground uppercase font-bold">
                      {["Tag", "Equipment Type", "Airflow / Cap", "Static P.", "Level", "Sync Status"].map((h) => (
                        <th key={h} className="px-5 py-3.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {scheduleRows.map((r) => {
                      const isSelected = selectedTag === r.tag;
                      return (
                        <tr
                          key={r.tag}
                          onClick={() => setSelectedTag(r.tag)}
                          className={`cursor-pointer transition-colors duration-200 ${
                            isSelected ? "bg-brand/10 dark:bg-brand/15" : "hover:bg-accent/40"
                          }`}
                        >
                          <td className="px-5 py-4 font-mono font-bold text-foreground">{r.tag}</td>
                          <td className="px-5 py-4 text-muted-foreground font-medium">{r.type}</td>
                          <td className="px-5 py-4 font-mono font-bold text-brand">{r.airflow}</td>
                          <td className="px-5 py-4 font-mono text-muted-foreground">{r.staticP}</td>
                          <td className="px-5 py-4 text-muted-foreground">{r.level}</td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                              <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Active Inspector Footer */}
              <div className="border-t border-border/80 p-5 bg-zinc-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-brand" />
                  <span className="text-xs font-mono">Inspecting: <strong className="text-brand">{selectedTag}</strong></span>
                </div>
                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                  2-Way Revit Parameter Mapping Active <ChevronRight size={14} className="text-brand" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Heading & Features */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="eyebrow inline-flex items-center gap-2">
              <FileSpreadsheet size={15} className="text-brand" />
              AUTOMATED BIM SCHEDULE GENERATOR
            </div>
            <h2 className="text-balance mt-6 text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
              Equipment schedules, generated.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              From single-line duct diagrams to complete, code-verified equipment schedule takeoffs in seconds. Bi-directionally synced with Revit, BIM 360, and your master spec library.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3.5">
              {[
                { tag: "Auto-Tagging", desc: "Zero manual tag errors" },
                { tag: "Live Revit Sync", desc: "Bi-directional parameter push" },
                { tag: "Cost Rollup", desc: "Instant CapEx estimation" },
                { tag: "Spec-Aware", desc: "Factory catalog matching" },
              ].map((item) => (
                <div
                  key={item.tag}
                  className="glass-subtle rounded-2xl p-4 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand/30"
                >
                  <div className="text-sm font-bold text-foreground">{item.tag}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
