import { useState } from "react";
import { ArrowUpRight, Sparkles, Zap, Activity, CheckCircle, Sliders, ShieldCheck, FileCheck } from "lucide-react";
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
}

const recommendationsData: Record<RecommendationCategory, { label: string; icon: any; recs: Recommendation[] }> = {
  hvac: {
    label: "HVAC & Airflow",
    icon: Zap,
    recs: [
      {
        id: "hvac-1",
        delta: "−18%",
        title: "Reduce reheat energy",
        body: "Switch L4–L8 to dual-max VAV logic — saves 240 MWh/yr without compromising thermal comfort.",
        mathProof: "Q = 1.08 × CFM × ΔT (ASHRAE 90.1-2022 Section 6.5.2)",
        standard: "ASHRAE 90.1",
        savings: "240 MWh/yr",
      },
      {
        id: "hvac-2",
        delta: "$58k",
        title: "Right-size chiller plant",
        body: "CH-02 is oversized by 22% under updated occupancy diversity schedules.",
        mathProof: "Peak Load = Σ(Sensible + Latent) × Diversity Factor 0.85",
        standard: "AHRI 550/590",
        savings: "$58,000 CapEx",
      },
      {
        id: "hvac-3",
        delta: "+12%",
        title: "Improve IAQ & Ventilation",
        body: "Implement Demand Controlled Ventilation (DCV) in conference zones to reduce fresh air load.",
        mathProof: "Vbz = Rp × Pz + Ra × Az (ASHRAE 62.1 Ventilation Rate Procedure)",
        standard: "ASHRAE 62.1",
        savings: "15% Fan Power",
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
        title: "Optimize feeder copper size",
        body: "Resize Sub-Feeder SF-04 based on actual continuous load vs connected load.",
        mathProof: "VD = (2 × K × I × L) / CM (NEC 210.19 3% Max Drop)",
        standard: "NEC 2023",
        savings: "1,200 kg Copper",
      },
      {
        id: "elec-2",
        delta: "$82k",
        title: "Transformer sizing correction",
        body: "TR-01 loaded at 42% peak. Downsize from 1500 kVA to 1000 kVA to reduce standing core losses.",
        mathProof: "P_loss = P_core + (Load_ratio)^2 × P_copper",
        standard: "IEEE C57.12",
        savings: "$82,000 Equipment",
      },
      {
        id: "elec-3",
        delta: "99.2%",
        title: "Power factor correction",
        body: "Add automated capacitor bank at Main LT Panel to eliminate utility low-PF penalty.",
        mathProof: "kVAR = kW × (tan θ1 - tan θ2) @ Target 0.98 PF",
        standard: "IS 7752",
        savings: "$14,500/yr Bill",
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
        title: "Hydro-pneumatic pump sizing",
        body: "Dual VFD booster pumps right-sized to peak fixture unit loading curve.",
        mathProof: "Q = Hunter Curve Fixture Units -> GPM Conversion (IPC Table E103.3)",
        standard: "IPC 2024",
        savings: "30% Pump Power",
      },
      {
        id: "plumb-2",
        delta: "$45k",
        title: "Riser pipe diameter tuning",
        body: "Reduce main domestic cold water riser from 4\" to 3\" while keeping velocity under 2.4 m/s.",
        mathProof: "v = Q / A < 8 ft/s (Copper Development Association limits)",
        standard: "ASPE Data Book",
        savings: "$45,000 Piping",
      },
      {
        id: "plumb-3",
        delta: "+18%",
        title: "Rainwater harvesting yield",
        body: "Optimize storm drainage pipe slope and retention tank capacity for peak 100-yr rainfall.",
        mathProof: "Q = C × I × A (Rational Method Storm Water Sizing)",
        standard: "NBC India 2016",
        savings: "1.8M L/yr Recycled",
      },
    ],
  },
};

export function AiEngineer() {
  const [activeCategory, setActiveCategory] = useState<RecommendationCategory>("hvac");
  const [appliedRecs, setAppliedRecs] = useState<Record<string, boolean>>({});
  const [expandedMath, setExpandedMath] = useState<string | null>(null);

  const currentCategory = recommendationsData[activeCategory];

  const toggleApply = (id: string) => {
    setAppliedRecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="ai" className="panel-gradient relative py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold text-brand uppercase tracking-wider max-w-full text-center">
              <Sparkles size={14} className="text-brand animate-pulse shrink-0" />
              <span>TARV AI RECOMMENDATION SOLVER</span>
            </div>
            <h2 className="text-balance mt-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Recommendations, <br className="hidden md:block" /> not guesswork.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              TARV continuously audits your BIM models and calculations, surfacing instant optimization, code compliance, and cost savings — backed by rigorous engineering equations.
            </p>
          </Reveal>

          {/* Dynamic Category Switcher */}
          <Reveal delay={100} className="mt-10">
            <div className="mx-auto flex max-w-full overflow-x-auto hide-scrollbar gap-2 sm:gap-3 rounded-2xl sm:rounded-full border border-border/80 bg-card/80 p-1.5 sm:p-2 backdrop-blur-xl shadow-xl justify-start sm:justify-center -mx-2 px-2 sm:mx-0 sm:px-0">
              {(Object.keys(recommendationsData) as RecommendationCategory[]).map((catKey) => {
                const cat = recommendationsData[catKey];
                const Icon = cat.icon;
                const isActive = activeCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setActiveCategory(catKey)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl sm:rounded-full px-3.5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-100 sm:scale-105"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* 3D Video Showcase with Dedicated Below-Video HUD Status Bar */}
        <Reveal delay={150} className="relative mt-12 sm:mt-16 z-10">
          <div className="glass shadow-glass mx-auto max-w-6xl rounded-[1.75rem] sm:rounded-[2.5rem] p-3 sm:p-5 transition-all duration-700 hover:shadow-brand-soft/20 border border-white/10 dark:border-white/10 space-y-3 sm:space-y-4">
            
            {/* 3D Model Video Display Container */}
            <div className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] bg-zinc-950 border border-white/10 dark:border-white/5 shadow-2xl flex items-center justify-center">
              <video 
                src="/ref3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain block"
              />

              {/* Non-Intrusive Floating Top Status Badges */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 z-20">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/85 px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md shadow-xl">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  AI Audit Active
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                  <FileCheck size={14} className="text-brand" />
                  ASHRAE & IPC Auto-Verified
                </div>
              </div>

              {/* Subtle inner depth ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] sm:rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </div>

            {/* Dedicated HUD Live Solver Bar (Sits cleanly below video with ZERO overlap!) */}
            <div className="rounded-[1.25rem] sm:rounded-[1.5rem] border border-border bg-card/90 p-3.5 sm:px-6 sm:py-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="grid size-9 sm:size-11 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <Activity size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Live Solver Accuracy
                  </div>
                  <div className="text-sm sm:text-lg font-extrabold text-foreground">
                    99.4% Mathematical Precision
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border/60 pt-2.5 md:pt-0">
                <span className="text-muted-foreground font-medium">3 Optimization Moves Found</span>
                <div className="h-3.5 w-px bg-border hidden sm:block" />
                <span className="font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Instant BIM Sync Active
                </span>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Dynamic Interactive Recommendation Cards */}
        <div className="relative z-20 mx-auto mt-12 grid max-w-6xl gap-6 grid-cols-1 md:grid-cols-3 px-2 md:px-4">
          {currentCategory.recs.map((r, i) => {
            const isApplied = appliedRecs[r.id];
            const isMathOpen = expandedMath === r.id;

            return (
              <Reveal key={r.id} delay={200 + i * 100}>
                <div className={`glass h-full rounded-3xl p-7 bg-background/85 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border ${
                  isApplied ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-white/10 dark:border-white/5"
                }`}>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <Sparkles size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-[11px] font-bold text-brand">
                        {r.standard}
                      </span>
                      <div className="font-display text-3xl font-extrabold tracking-tight text-brand">
                        {r.delta}
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-tight">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>

                  {/* Savings Pill */}
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-500">
                    <CheckCircle size={13} />
                    Est. Savings: {r.savings}
                  </div>

                  {/* Expandable Math Proof */}
                  {isMathOpen && (
                    <div className="mt-4 rounded-xl bg-zinc-950 p-3.5 border border-white/10 text-xs font-mono text-emerald-400 leading-relaxed">
                      <span className="text-zinc-500 block mb-1 font-sans text-[10px] uppercase font-bold tracking-wider">Formula & Reference:</span>
                      {r.mathProof}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedMath(isMathOpen ? null : r.id)}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted"
                    >
                      {isMathOpen ? "Hide Math" : "View Math"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleApply(r.id)}
                      className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                        isApplied
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {isApplied ? "Applied ✓" : "Apply Recommendation"}
                      {!isApplied && <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
