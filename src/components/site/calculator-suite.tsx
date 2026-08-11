import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./reveal";

const calculatorData = [
 {
 id: "hvac",
 label: "HVAC",
 dotColor: "bg-blue-500",
 activeClass: "border-blue-500 bg-blue-500/10 text-blue-500",
 tag: "HVAC CALCULATOR",
 tagColor: "text-blue-500 bg-blue-500/10",
 badges: ["ASHRAE 62.1", "ASHRAE 90.1", "SMACNA", "NFPA 92"],
 title: "Load, airflow & duct sizing calculators.",
 desc: "Preliminary and detailed cooling load, ventilation, ductulator, pressurization and smoke control — every HVAC design calculator in one place.",
 calculators: [
 "Preliminary cooling load", "Heating load calculator", "Ventilation calculator", "Fresh air cooling load",
 "Duct sizer / ductulator", "Diffuser selector", "Condensate drain sizing", "Psychrometric calculator",
 "Refrigerant pipe sizing", "CHW pipe sizer", "CHW pump head calculator", "Lobby pressurisation",
 "Staircase pressurization", "Smoke extract fan sizing", "Basement smoke calculator", "HVAC design sanity check"
 ],
 countText: "16 HVAC calculators - updated for the current ASHRAE handbook cycle",
 btnText: "Open HVAC calculators"
 },
 {
 id: "electrical",
 label: "Electrical",
 dotColor: "bg-yellow-500",
 activeClass: "border-yellow-500 bg-yellow-500/10 text-yellow-500",
 tag: "ELECTRICAL CALCULATOR",
 tagColor: "text-yellow-500 bg-yellow-500/10",
 badges: ["NEC", "IEC 60364", "IS 732"],
 title: "Electrical load & sizing calculators.",
 desc: "Cable, busbar, transformer, generator and short-circuit calculations built to NEC and IEC reference tables — plus a DB schedule builder for full load summaries.",
 calculators: [
 "Cable sizing calculator", "Cable voltage drop", "Busbar sizing calculator", "Busbar voltage drop",
 "Transformer sizing", "Generator sizing (kVA)", "UPS sizing calculator", "Central battery sizing",
 "Circuit breaker sizing", "Short circuit calculator", "Cable tray sizing", "Capacitor bank sizing",
 "Lux level calculator", "Lighting power density (LPD)", "Electrical load summary", "DB schedule builder"
 ],
 countText: "16 electrical calculators - NEC & IEC reference tables built in",
 btnText: "Open electrical calculators"
 },
 {
 id: "fire",
 label: "Fire Fighting",
 dotColor: "bg-red-500",
 activeClass: "border-red-500 bg-red-500/10 text-red-500",
 tag: "FIRE PROTECTION CALCULATOR",
 tagColor: "text-red-500 bg-red-500/10",
 badges: ["NFPA 13", "NFPA 20", "NFPA 2001"],
 title: "Fire fighting & hydraulic calculators.",
 desc: "Sprinkler K-factor and density, Hazen-Williams friction loss, clean-agent quantity, and fire pump and tank sizing — mapped to NFPA hydraulic design.",
 calculators: [
 "Sprinkler K-factor", "Sprinkler density & flow", "Hazen-Williams calculator", "FM-200 quantity calculator",
 "Fire water demand", "Fire pump duty (NFPA 20)", "Fire tank capacity", "Tank duration calculator"
 ],
 countText: "8 fire fighting calculators - NFPA hydraulic reference built in",
 btnText: "Open fire fighting calculators"
 },
 {
 id: "plumbing",
 label: "Plumbing",
 dotColor: "bg-emerald-500",
 activeClass: "border-emerald-500 bg-emerald-500/10 text-emerald-500",
 tag: "PLUMBING CALCULATOR",
 tagColor: "text-emerald-500 bg-emerald-500/10",
 badges: ["IPC", "UPC", "EN 806"],
 title: "Plumbing & drainage sizing calculators.",
 desc: "Water demand, fixture and loading units, storm and sanitary drainage, and pump sizing — the full plumbing design calculator set, referenced to IPC fixture tables.",
 calculators: [
 "Water demand calculator", "Fixture unit calculator", "Loading unit calculator", "Water supply pipe sizer",
 "Drainage pipe sizing", "Discharge unit sizing", "Storm water sizing", "Booster pump sizing",
 "Sump pump sizing", "Sewage pump sizing", "Pressure vessel sizing", "Gas storage capacity",
 "Water tank sizing"
 ],
 countText: "13 plumbing calculators - IPC fixture & loading tables built in",
 btnText: "Open plumbing calculators"
 }
];

export function CalculatorSuite() {
 const [activeTab, setActiveTab] = useState(calculatorData[0]?.id || "hvac");
 const data = calculatorData.find((d) => d.id === activeTab)!;

 return (
 <section className="py-28 md:py-32">
 <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
 <Reveal>
 <div className="eyebrow">The calculator suite</div>
 <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
 Every MEP calculator. One free platform.
 </h2>
 <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
 TARV is a free online MEP calculator suite covering HVAC, electrical, fire fighting and plumbing — the same sizing and load calculations engineers run by hand, now instant, standards-referenced, and connected to your drawings.
 </p>
 </Reveal>
 </div>

 <Reveal delay={100} className="mx-auto mt-12 max-w-6xl px-4 md:px-6">
 {/* Tabs */}
 <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
 {calculatorData.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex shrink-0 snap-center items-center gap-2 border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
 activeTab === tab.id
 ? "border-foreground bg-foreground text-background dark:border-white dark:bg-white dark:text-black shadow-xl"
 : "border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-foreground/20 hover:text-foreground"
 }`}
 >
 <span className={`size-2.5 ${tab.dotColor} shadow-[0_0_10px_currentColor]`} />
 {tab.label}
 </button>
 ))}
 </div>

 {/* Calculator Window */}
 <div className="glass shadow-glass p-6 md:p-10 transition-all duration-500">
 <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
 <div className="max-w-2xl text-left">
 <div className={`inline-flex px-2 py-1 text-xs font-bold tracking-wider uppercase mb-6 ${data.tagColor}`}>
 {data.tag}
 </div>
 <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{data.title}</h3>
 <p className="text-muted-foreground leading-relaxed">{data.desc}</p>
 </div>
 <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
 {data.badges.map((badge) => (
 <span key={badge} className=" border border-border bg-card/50 px-2.5 py-1 text-xs font-mono text-muted-foreground">
 {badge}
 </span>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 border-t border-border/50 pt-10">
 {data.calculators.map((calc, i) => (
 <button
 key={i}
 className="group relative flex items-center justify-between border border-border/50 bg-card/30 p-4 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-card/80 hover:shadow-xl"
 >
 <span className="text-left text-muted-foreground group-hover:text-foreground transition-colors font-semibold pr-4">{calc}</span>
 <div className="flex size-8 shrink-0 items-center justify-center border border-border/50 bg-background/50 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]">
 <ArrowRight size={14} className="text-muted-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:text-zinc-950" />
 </div>
 </button>
 ))}
 </div>

 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border pt-6">
 <div className="text-xs text-muted-foreground uppercase tracking-wider">{data.countText}</div>
 <button className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background hover:shadow-xl">
 {data.btnText} <ArrowRight size={14} />
 </button>
 </div>
 </div>

 {/* Comparison Section */}
 <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
 <div className=" border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
 <h4 className="font-semibold mb-6 text-muted-foreground text-left">Spreadsheets & generic MEP calculator tools</h4>
 <ul className="space-y-4 text-sm text-muted-foreground text-left">
 <li className="flex items-start gap-3">
 <span className="opacity-50">—</span> One calculator at a time, no shared model
 </li>
 <li className="flex items-start gap-3">
 <span className="opacity-50">—</span> Manual re-entry into drawings and schedules
 </li>
 <li className="flex items-start gap-3">
 <span className="opacity-50">—</span> No standards audit trail
 </li>
 </ul>
 </div>

 <div className=" bg-foreground text-background dark:bg-zinc-900 dark:text-zinc-100 p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-2xl text-left">
 <h4 className="font-bold mb-6 font-display tracking-tight">TARV</h4>
 <ul className="space-y-4 text-sm font-medium">
 <li className="flex items-start gap-3">
 <Check size={16} className="mt-0.5 shrink-0" /> Every HVAC, electrical, fire and plumbing calculator, one model
 </li>
 <li className="flex items-start gap-3">
 <Check size={16} className="mt-0.5 shrink-0" /> Results flow straight into drawings, schedules and Revit
 </li>
 <li className="flex items-start gap-3">
 <Check size={16} className="mt-0.5 shrink-0" /> Every output ships with its standard reference and math
 </li>
 </ul>
 </div>
 </div>
 </Reveal>
 </section>
 );
}
