import { ArrowRight, Mail, MapPin, ShieldCheck, Cpu, Zap, Lock, CheckCircle } from "lucide-react";
import { Reveal } from "./reveal";

const trustBadges = [
  "ISO 27001 Certified",
  "ASHRAE & IPC Aligned",
  "256-bit Encryption",
  "Revit & IFC Native",
];

const liveStats = [
  { label: "Calculations Run", value: "50,000+" },
  { label: "ASHRAE Accuracy", value: "99.4%" },
  { label: "BIM Sync Speed", value: "< 2 sec" },
];

export function Cta() {
  return (
    <section id="cta" className="px-4 md:px-6 py-28 md:py-36 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/15 blur-[150px]" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Left Panel - Pitch, Trust Ticker & CTA */}
        <Reveal>
          <div className="glass relative flex h-full min-h-[500px] md:min-h-[620px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-zinc-950/85 p-8 md:p-14 border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
            <div className="relative z-10">
              {/* Trust Badge Ribbon */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand backdrop-blur-md">
                <ShieldCheck size={15} />
                ENTERPRISE-GRADE MEP PLATFORM
              </div>

              <h2 className="text-balance mt-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
                Engineer what's <br className="hidden md:block" /> next.
              </h2>

              <p className="mt-6 max-w-lg text-base md:text-lg text-zinc-400 leading-relaxed">
                Ready to streamline your MEP workflow? Join leading engineering teams automating HVAC, electrical, and plumbing calculations with total audit confidence.
              </p>

              {/* Action Button */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="/access"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
                >
                  Request access <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
                </a>
              </div>
            </div>

            {/* Live Trust Metrics Footer Inside Panel */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-3">
              {liveStats.map((st) => (
                <div key={st.label}>
                  <div className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">{st.value}</div>
                  <div className="text-[11px] font-medium text-zinc-400 mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Subtle background glow for left panel */}
            <div className="pointer-events-none absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-soft/20 blur-[120px]" />
          </div>
        </Reveal>

        {/* Right Panel - Moving Full-Bleed Video with Overlay */}
        <Reveal delay={150}>
          <div className="glass relative h-full min-h-[500px] md:min-h-[620px] overflow-hidden rounded-[2.5rem] border border-white/10 dark:border-white/10 shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20 group">
            {/* Background Looping Video */}
            <video 
              src="/ref4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

            {/* Floating Top Badge */}
            <div className="absolute top-6 left-6 z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md shadow-xl">
                <Zap size={14} className="text-brand animate-pulse" />
                Real-Time BIM Automation Engine
              </div>
            </div>

            {/* Floating Bottom Card on Video */}
            <div className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl border border-white/15 bg-zinc-950/85 p-6 backdrop-blur-xl text-white">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/20 text-brand">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant BIM Parameter Sync</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Calculated parameters push back to Revit families in 2 seconds.</p>
                </div>
              </div>
            </div>

            {/* Inner ring for luxury feel */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/15" />
          </div>
        </Reveal>

      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "#platform" },
      { label: "Smart HVAC", href: "#hvac" },
      { label: "Schedules", href: "#schedules" },
      { label: "AI engineer", href: "#ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#company" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "#cta" },
      { label: "Contact", href: "mailto:contact@tarv.ai" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#company" },
      { label: "DPA", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter (X)", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 md:px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 grid-cols-2 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="TARV logo"
              className="size-7 rounded-md object-contain dark:invert"
            />
            <span className="font-display text-lg font-bold tracking-tight">TARV</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The AI-powered platform automating mechanical, electrical, and plumbing design
            workflows.
          </p>
          <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Solapur, India
            </div>
            <a href="mailto:contact@tarv.ai" className="flex items-center gap-2 transition-all duration-300 hover:text-foreground">
              <Mail size={14} /> contact@tarv.ai
            </a>
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="text-xs tracking-wider text-muted-foreground uppercase">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted-foreground transition-all duration-300 hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} TARV Engineering · Headquartered in Solapur, India · All rights reserved
      </div>
    </footer>
  );
}
