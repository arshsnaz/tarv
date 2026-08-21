import { useState } from "react";
import { ArrowUpRight, Sparkles, Zap, Activity, CheckCircle, Sliders, ShieldCheck, FileCheck, CheckCircle2, ChevronRight, TrendingUp } from "lucide-react";
import { Reveal } from "./reveal";

type RecommendationCategory = "hvac" | "electrical" | "plumbing";

interface Recommendation {
  id: string;
  delta: string;
  title: string;
  body: string;
  mathProof: string;
  standard: string;
  savings: string;
  confidence: number;
  capexDelta: string;
}

const recommendationsData: Record<RecommendationCategory, { label: string; icon: any; recs: Recommendation[] }> = {
  hvac: {
    label: "HVAC & Airflow",
    icon: Zap,
    recs: [
      {
        id: "hvac-1",
        delta: "−18%",
        title: "Reduce Reheat Energy via Dual-Max VAV",
        body: "Switch L4–L8 to dual-max VAV logic — saves 240 MWh/yr without compromising thermal comfort.",
        mathProof: "Q = 1.08 × CFM × ΔT (ASHRAE 90.1-2022 Section 6.5.2)",
        standard: "ASHRAE 90.1",
        savings: "240 MWh/yr",
        confidence: 99.4,
        capexDelta: "$42,000",
      },
      {
        id: "hvac-2",
        delta: "$58k",
        title: "Right-Size Central Chiller Plant",
        body: "CH-02 is oversized by 22% under updated occupancy diversity schedules. Right-size to 300 Tons.",
        mathProof: "Peak Load = Σ(Sensible + Latent) × Diversity Factor 0.85 (AHRI 550/590)",
        standard: "AHRI 550/590",
        savings: "$58,000 CapEx",
        confidence: 98.8,
        capexDelta: "$58,000",
      },
      {
        id: "hvac-3",
        delta: "+12%",
        title: "Deploy Demand Controlled Ventilation (DCV)",
        body: "Implement CO2-based DCV in high-occupancy conference zones to dynamically trim fresh air load.",
        mathProof: "Vbz = Rp × Pz + Ra × Az (ASHRAE 62.1-2022 Table 6-1)",
        standard: "ASHRAE 62.1",
        savings: "15% Fan Power",
        confidence: 99.1,
        capexDelta: "$18,500",
      },
    ],
  },
  electrical: {
    label: "Electrical & Power",
    icon: Activity,
    recs: [
      {
        id: "elec-1",
        delta: "−24%",
        title: "Optimize Feeder Copper Conductor Size",
        body: "Resize Sub-Feeder SF-04 based on actual continuous calculated load vs nameplate connected load.",
        mathProof: "VD = (2 × K × I × L) / CM ≤ 3% Max Permissible Drop (NEC 210.19)",
        standard: "NEC 2023",
        savings: "1,200 kg Copper",
        confidence: 99.7,
        capexDelta: "$34,000",
      },
      {
        id: "elec-2",
        delta: "$82k",
        title: "Cast-Resin Transformer Sizing Correction",
        body: "TR-01 loaded at 42% peak. Downsize from 1500 kVA to 1000 kVA to reduce standing core losses.",
        mathProof: "P_loss = P_core + (Load_ratio)^2 × P_copper (IEEE C57.12)",
        standard: "IEEE C57.12",
        savings: "$82,000 Equipment",
        confidence: 98.5,
        capexDelta: "$82,000",
      },
      {
        id: "elec-3",
        delta: "99.2%",
        title: "Automated Power Factor Correction Bank",
        body: "Add 400 kVAR 8-step capacitor bank at Main LT Panel to eliminate utility low-PF penalty.",
        mathProof: "kVAR = kW × (tan θ1 - tan θ2) @ Target 0.98 PF (IS 7752)",
        standard: "IS 7752",
        savings: "$14,500/yr Bill",
        confidence: 99.6,
        capexDelta: "$16,500",
      },
    ],
  },
  plumbing: {
    label: "Plumbing & Hydraulics",
    icon: Sliders,
    recs: [
      {
        id: "plumb-1",
        delta: "−30%",
        title: "Hydro-Pneumatic Booster Pump Right-Sizing",
        body: "Dual VFD booster pumps right-sized to actual peak fixture unit simultaneous loading curve.",
        mathProof: "Q = Hunter Curve Fixture Units -> GPM Conversion (IPC Table E103.3)",
        standard: "IPC 2024",
        savings: "30% Pump Power",
        confidence: 99.2,
        capexDelta: "$22,400",
      },
      {
        id: "plumb-2",
        delta: "$45k",
        title: "Domestic Cold Water Riser Pipe Tuning",
        body: "Reduce main riser diameter from 4\" to 3\" while keeping hydraulic velocity under 2.4 m/s.",
        mathProof: "v = Q / A < 8 ft/s (Copper Development Association limits)",
        standard: "ASPE Book",
        savings: "$45,000 Piping",
        confidence: 99.5,
        capexDelta: "$45,000",
      },
      {
        id: "plumb-3",
        delta: "+18%",
        title: "Rainwater Harvesting Yield & Slope Tuning",
        body: "Optimize storm drainage pipe slope and retention tank capacity for peak 100-yr rainfall intensity.",
        mathProof: "Q = C × I × A (Rational Method Storm Sizing - NBC 2016)",
        standard: "NBC 2016",
        savings: "1.8M L/yr Recycled",
        confidence: 98.9,
        capexDelta: "$28,000",
      },
    ],
  },
};

export function AiEngineer() {
  const [activeCategory, setActiveCategory] = useState<RecommendationCategory>("hvac");
  const [appliedRecs, setAppliedRecs] = useState<Record<string, boolean>>({ "hvac-1": true });
  const [expandedMath, setExpandedMath] = useState<string | null>(null);

  const currentCategory = recommendationsData[activeCategory];

  const toggleApply = (id: string) => {
    setAppliedRecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const appliedCount = Object.values(appliedRecs).filter(Boolean).length;
  const projectHealthScore = Math.min(100, 88 + appliedCount * 3);

  return (
    <section id="ai" className="relative py-24 md:py-36 overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-wider">
              <Sparkles size={14} className="text-purple-500 animate-pulse shrink-0" />
              <span>TARV AI RECOMMENDATION SOLVER</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mt-4 leading-[1.1]">
              Recommendations, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                not guesswork.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              TARV continuously audits your BIM models and calculations, surfacing instant optimization, code compliance, and cost savings — backed by rigorous engineering equations.
            </p>
          </Reveal>

          {/* Dynamic Category Switcher */}
          <Reveal delay={100} className="mt-8">
            <div className="mx-auto flex max-w-full overflow-x-auto hide-scrollbar gap-2 rounded-2xl border border-border bg-card/80 p-2 shadow-lg justify-start sm:justify-center w-fit">
              {(Object.keys(recommendationsData) as RecommendationCategory[]).map((catKey) => {
                const cat = recommendationsData[catKey];
                const Icon = cat.icon;
                const isActive = activeCategory === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setActiveCategory(catKey)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-purple-600 text-white shadow-md scale-105"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={15} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* 3D Video Showcase with Dedicated Below-Video HUD Status Bar */}
        <Reveal delay={150} className="relative mt-12 sm:mt-16 z-10">
          <div className="relative mx-auto max-w-6xl rounded-3xl p-3 sm:p-5 transition-all duration-500 border border-border bg-card shadow-2xl space-y-3 sm:space-y-4">
            
            {/* 3D Model Video Display Container */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-slate-800 shadow-2xl flex items-center justify-center">
              <video 
                src="/ref3.mp4"
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload no-remote-playback noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-auto object-contain block select-none pointer-events-none"
              />

              {/* Top Status Badges */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 z-20">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/85 px-3 py-1.5 text-[10px] sm:text-xs font-mono font-bold text-white backdrop-blur-md shadow-xl">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  AI Audit Active
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-mono font-bold text-white/90 backdrop-blur-md">
                  <FileCheck size={14} className="text-purple-400" />
                  ASHRAE & IPC Auto-Verified
                </div>
              </div>
            </div>

            {/* Dedicated HUD Live Solver Bar with Live Project Health Score */}
            <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:px-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold border border-purple-500/20 shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground block">
                    LIVE SOLVER ACCURACY & EFFICIENCY
                  </span>
                  <div className="text-sm sm:text-base font-extrabold text-foreground flex items-center gap-2">
                    99.4% Mathematical Precision
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      Score: {projectHealthScore}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border pt-2.5 md:pt-0">
                <span className="text-muted-foreground font-semibold">3 Optimization Moves Found</span>
                <div className="h-3.5 w-px bg-border hidden sm:block" />
                <span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Instant BIM Sync Active
                </span>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Dynamic Interactive Recommendation Cards */}
        <div className="relative z-20 mx-auto mt-12 grid max-w-6xl gap-6 grid-cols-1 md:grid-cols-3">
          {currentCategory.recs.map((r, i) => {
            const isApplied = appliedRecs[r.id];
            const isMathOpen = expandedMath === r.id;

            return (
              <Reveal key={r.id} delay={200 + i * 100}>
                <div className={`h-full rounded-3xl p-6 sm:p-7 bg-card transition-all duration-300 hover:shadow-2xl border ${
                  isApplied ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-border hover:border-purple-500/40"
                }`}>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 font-mono font-extrabold text-sm">
                      {r.delta}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-muted border border-border px-2.5 py-0.5 text-[10px] font-mono font-bold text-muted-foreground">
                        {r.standard}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        {r.confidence}% Match
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-extrabold tracking-tight text-foreground">{r.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">{r.body}</p>

                  {/* Savings Pill */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-500">
                      <CheckCircle size={13} />
                      Savings: {r.savings}
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-muted border border-border px-3 py-1 text-xs font-mono font-bold text-foreground">
                      CapEx: {r.capexDelta}
                    </div>
                  </div>

                  {/* Expandable Math Proof */}
                  {isMathOpen && (
                    <div className="mt-4 rounded-xl bg-slate-950 p-3.5 border border-slate-800 text-xs font-mono text-emerald-400 leading-relaxed">
                      <span className="text-slate-400 block mb-1 font-mono text-[10px] uppercase font-bold tracking-wider">Formula & Citation:</span>
                      {r.mathProof}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedMath(isMathOpen ? null : r.id)}
                      className="text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {isMathOpen ? "Hide Formula" : "View Formula"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleApply(r.id)}
                      className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                        isApplied
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                          : "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                      }`}
                    >
                      {isApplied ? "Applied to BIM ✓" : "Apply Recommendation"}
                      {!isApplied && <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Semrush-Style Live Engineering Optimization Benchmark Leaderboard */}
        <Reveal delay={300} className="mt-12 max-w-6xl mx-auto">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <TrendingUp size={14} /> LIVE MEP CODE COMPLIANCE INDEX
                </span>
                <h3 className="text-xl font-extrabold text-foreground">Continuous Engineering Model Telemetry</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold text-emerald-500">
                100% Code Verified
              </div>
            </div>

            <div className="overflow-x-auto hide-scrollbar">
              <table className="w-full text-xs min-w-[580px]">
                <thead>
                  <tr className="border-b border-border text-left font-mono font-bold text-muted-foreground uppercase text-[10px]">
                    <th className="pb-3">Calculation Discipline</th>
                    <th className="pb-3">Standard Reference</th>
                    <th className="pb-3">Mathematical Method</th>
                    <th className="pb-3">Confidence</th>
                    <th className="pb-3 text-right">Execution Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { discipline: "HVAC Zone Sizing", standard: "ASHRAE 90.1 & 62.1", method: "Finite Heat Balance (RTS)", confidence: "99.8%", speed: "0.02s" },
                    { discipline: "Duct Static Sizing", standard: "SMACNA / Equal Friction", method: "Colebrook-White Friction Loss", confidence: "99.9%", speed: "0.01s" },
                    { discipline: "Electrical Feeder Drop", standard: "NEC 2023 & IEC 60364", method: "Ohmic Resistance & Reactance", confidence: "99.7%", speed: "0.01s" },
                    { discipline: "Hydraulic Pump Head", standard: "IPC 2024 / ASPE", method: "Hazen-Williams Head Loss", confidence: "99.6%", speed: "0.03s" },
                  ].map((row) => (
                    <tr key={row.discipline} className="hover:bg-muted/40">
                      <td className="py-3 font-extrabold text-foreground">{row.discipline}</td>
                      <td className="py-3 font-mono font-bold text-purple-600 dark:text-purple-400">{row.standard}</td>
                      <td className="py-3 text-muted-foreground font-medium">{row.method}</td>
                      <td className="py-3">
                        <span className="font-mono font-bold text-emerald-500">{row.confidence}</span>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-foreground">{row.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
