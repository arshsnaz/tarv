import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";

const recs = [
 {
 delta: "−18%",
 title: "Reduce reheat energy",
 body: "Switch L4–L8 to dual-max VAV — saves 240 MWh/yr.",
 },
 {
 delta: "$58k",
 title: "Right-size chiller plant",
 body: "CH-02 oversized by 22% under updated occupancy.",
 },
 {
 delta: "+12%",
 title: "Improve IAQ",
 body: "Add DCV to conference zones to meet ASHRAE 62.1 with less OA.",
 },
];



export function AiEngineer() {
 return (
 <section id="ai" className="panel-gradient relative py-32 overflow-hidden">
 {/* Massive Background Glow */}
 <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-brand-soft/20 blur-[120px]" />

 <div className="mx-auto max-w-7xl px-6">
 {/* Header Section */}
 <div className="mx-auto max-w-3xl text-center">
 <Reveal>
 <div className="eyebrow inline-flex items-center gap-2">
 <Sparkles size={16} className="text-brand" />
 TARV AI ENGINE
 </div>
 <h2 className="text-balance mt-6 text-5xl font-bold tracking-tight md:text-7xl">
 Recommendations, <br className="hidden md:block" /> not guesswork.
 </h2>
 <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
 TARV reads your model continuously and surfaces optimization, compliance, and cost moves
 — with the math to back them up.
 </p>
 </Reveal>
 </div>

 {/* Massive Video Showcase */}
 <Reveal delay={150} className="relative mt-20 z-10">
 <div className="glass shadow-glass mx-auto max-w-6xl -[2rem] p-3 md:p-4 transition-all duration-700 hover:shadow-brand-soft/20">
 <div className="relative overflow-hidden -[1.5rem] bg-zinc-950 border border-white/10 dark:border-white/5 shadow-2xl">
 <video 
 src="/ref3.mp4"
 autoPlay
 loop
 muted
 playsInline
 className="w-full object-cover scale-[1.01]"
 />
 {/* Internal overlay gradient for depth */}
 <div className="pointer-events-none absolute inset-0 -[1.5rem] ring-1 ring-inset ring-white/10" />
 </div>
 </div>
 </Reveal>

 {/* Overlapping Feature Cards */}
 <div className="relative z-20 mx-auto mt-16 md:-mt-16 grid max-w-6xl gap-6 grid-cols-1 md:grid-cols-3 px-2 md:px-8">
 {recs.map((r, i) => (
 <Reveal key={r.title} delay={200 + (i * 100)}>
 <div className="glass h-full p-8 bg-background/80 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/10 dark:border-white/5">
 <div className="mb-6 flex items-center justify-between">
 <div className="grid size-12 place-items-center bg-primary text-primary-foreground shadow-lg shadow-primary/25">
 <Sparkles size={18} />
 </div>
 <div className="font-display text-3xl font-bold tracking-tight text-brand">
 {r.delta}
 </div>
 </div>
 <h3 className="mb-3 text-xl font-bold tracking-tight">{r.title}</h3>
 <p className="text-base leading-relaxed text-muted-foreground">{r.body}</p>
 <button
 type="button"
 className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:text-foreground"
 >
 Apply recommendation <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
 </button>
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </section>
 );
}


