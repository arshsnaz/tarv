import { Building2, Flag, Lock, ShieldCheck, Users, Workflow } from "lucide-react";
import { Reveal } from "./reveal";

const facts = [
 { icon: Flag, label: "Founded", value: "2024" },
 { icon: Building2, label: "Headquarters", value: "Stockholm, Sweden" },
 { icon: Workflow, label: "Focus", value: "MEP design automation" },
 { icon: Users, label: "Model", value: "Engineer-led, AI-native" },
];

const compliance = [
 {
 icon: ShieldCheck,
 title: "Standards-aligned",
 body: "Calculations follow ASHRAE, EN, and Boverket references with a full audit trail on every output.",
 },
 {
 icon: Lock,
 title: "Enterprise security",
 body: "EU data residency, encryption in transit and at rest, SSO/SAML, and role-based project access.",
 },
 {
 icon: Workflow,
 title: "Fits your stack",
 body: "Two-way sync with Revit, IFC, BIM 360, and your internal spec and cost libraries.",
 },
];

const faqs = [
 {
 q: "What exactly does TARV automate?",
 a: "Load and airflow calculations, duct and pipe sizing, electrical distribution takeoffs, equipment selection, and the schedules and documentation that come out of them.",
 },
 {
 q: "Does it replace my engineering judgment?",
 a: "No. Every recommendation ships with the underlying math, assumptions, and standard reference so a licensed engineer can review, adjust, and sign off.",
 },
 {
 q: "How does TARV fit into our current workflow?",
 a: "It plugs into your BIM environment. Import your model, work in TARV, and push validated schedules and sizing back into Revit or IFC.",
 },
 {
 q: "Where is our project data stored?",
 a: "In the EU. Project data is isolated per organisation and never used to train shared models without written consent.",
 },
];

export function Company() {
 return (
 <section id="company" className="py-28 md:py-32">
 <div className="mx-auto max-w-6xl px-4 md:px-6">
 <div className="grid items-start gap-14 grid-cols-1 md:grid-cols-2">
 <Reveal>
 <div className="eyebrow">Company</div>
 <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-5xl">
 Built in Stockholm, for engineers everywhere.
 </h2>
 <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
 TARV was founded in Stockholm, Sweden in 2024 by engineers who spent their careers
 redrawing the same ducts, risers, and schedules. We build the AI-powered platform that
 automates mechanical, electrical, and plumbing design workflows — so teams spend their
 hours on the decisions that matter.
 </p>
 <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2">
 {facts.map((f) => (
 <div key={f.label} className="glass-subtle p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
 <f.icon size={16} className="text-brand" />
 <div className="mt-3 text-[10px] tracking-wider text-muted-foreground uppercase">
 {f.label}
 </div>
 <div className="text-sm font-semibold">{f.value}</div>
 </div>
 ))}
 </div>
 </Reveal>

 <div className="grid gap-4">
 {compliance.map((c, i) => (
 <Reveal key={c.title} delay={i * 110}>
 <div className="glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
 <div className="grid size-10 place-items-center bg-primary text-primary-foreground">
 <c.icon size={16} />
 </div>
 <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
 </div>
 </Reveal>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}

export function Faq() {
 return (
 <section id="faq" className="panel-gradient py-28 md:py-32">
 <div className="mx-auto max-w-3xl px-4 md:px-6">
 <Reveal>
 <div className="text-center">
 <div className="eyebrow">FAQ</div>
 <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-5xl">
 Questions engineers ask first.
 </h2>
 </div>
 </Reveal>
 <div className="mt-12 space-y-3">
 {faqs.map((f, i) => (
 <Reveal key={f.q} delay={i * 80}>
 <details className="glass-subtle group px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
 <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
 {f.q}
 <span className="text-muted-foreground transition-transform group-open:rotate-45">
 +
 </span>
 </summary>
 <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
 </details>
 </Reveal>
 ))}
 </div>
 </div>
 </section>
 );
}
