import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "./reveal";

export function Cta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="cta" className="px-4 md:px-6 py-28 md:py-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* Left Panel - Pitch & Form */}
        <Reveal>
          <div className="glass relative flex h-full min-h-[450px] md:min-h-[600px] flex-col justify-center overflow-hidden rounded-[2.5rem] bg-zinc-950/80 p-10 md:p-16 border border-white/5 dark:border-white/5 shadow-2xl transition-all hover:shadow-brand-soft/10">
            <div className="relative z-10">
              <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Engineer what's <br className="hidden md:block" /> next.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
                Ready to streamline your workflow? Request access today and experience the power of TARV firsthand.
              </p>
              <div className="mt-12">
                <a
                  href="/access"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)]"
                >
                  Request access <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            
            {/* Subtle background glow for left panel */}
            <div className="pointer-events-none absolute -bottom-32 -left-32 size-[400px] rounded-full bg-brand-soft/10 blur-[100px]" />
          </div>
        </Reveal>

        {/* Right Panel - Video */}
        <Reveal delay={150}>
          <div className="glass relative h-full min-h-[450px] md:min-h-[600px] overflow-hidden rounded-[2.5rem] border border-white/5 dark:border-white/5 shadow-2xl transition-all hover:shadow-brand-soft/10">
            <video 
              src="/ref4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover scale-[1.01]"
            />
            {/* Inner ring for premium feel */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10" />
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
      { label: "Contact", href: "mailto:hello@tarv.se" },
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
              <MapPin size={14} /> Dubai, United Arab Emirates
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
        © {new Date().getFullYear()} TARV Engineering AB · Founded in Dubai, United Arab Emirates · All rights reserved
      </div>
    </footer>
  );
}
