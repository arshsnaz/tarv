import { ArrowRight, Mail, MapPin, ShieldCheck, Cpu, Zap, Linkedin, Github, Youtube, Instagram } from "lucide-react";
import { Reveal } from "./reveal";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

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
          <div className="glass relative flex h-full min-h-[500px] md:min-h-[620px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card/85 p-8 md:p-14 border border-border shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
            <div className="relative z-10">
              {/* Trust Badge Ribbon */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand backdrop-blur-md">
                <ShieldCheck size={15} />
                <span>Enterprise SLA & Bank-Grade Security</span>
              </div>

              {/* Bold Pitch */}
              <h2 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-card-foreground leading-[1.1]">
                Engineer <br className="hidden sm:inline" />
                <span className="text-foreground font-black">what's next.</span>
              </h2>

              <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
                Automate your MEP calculation workflows today with AI accuracy. Join engineering teams delivering projects 10x faster with 100% ASHRAE & IPC code compliance.
              </p>
            </div>

            {/* Bottom Actions & Live Stats Ticker */}
            <div className="relative z-10 mt-10 space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/access"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-extrabold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-primary/30"
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all duration-300 hover:bg-accent hover:border-foreground/20"
                >
                  <span>Book Enterprise Demo</span>
                </Link>
              </div>

              {/* Real-time Stats Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-border pt-6">
                {liveStats.map((st) => (
                  <div key={st.label}>
                    <div className="text-lg md:text-xl font-extrabold text-foreground">{st.value}</div>
                    <div className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Aesthetic Watermark */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-5 text-foreground">
              <Cpu size={320} />
            </div>
          </div>
        </Reveal>

        {/* Right Panel - Moving Video Showcase Card */}
        <Reveal delay={150}>
          <div className="glass relative flex h-full min-h-[500px] md:min-h-[620px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card/85 p-4 md:p-6 border border-border shadow-2xl transition-all duration-500 hover:shadow-brand-soft/20">
            
            {/* Top Video Frame Box */}
            <div className="relative flex-1 min-h-[300px] overflow-hidden rounded-[2rem] bg-zinc-950 border border-white/10 dark:border-white/5 shadow-2xl flex items-center justify-center group">
              <video 
                src="/ref4.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md shadow-xl">
                  <Zap size={14} className="text-brand animate-pulse shrink-0" />
                  <span>Real-Time BIM Automation Engine</span>
                </div>
              </div>

              {/* Inner ring for luxury depth */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
            </div>

            {/* Bottom Status Card Box */}
            <div className="mt-4 rounded-2xl border border-white/15 bg-zinc-950/90 p-5 backdrop-blur-xl text-white">
              <div className="flex items-center gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/20 text-brand shrink-0">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Instant BIM Parameter Sync</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Calculated parameters push back to Revit families in 2 seconds.
                  </p>
                </div>
              </div>
            </div>

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
      { label: "Overview", to: "/#platform" },
      { label: "Smart HVAC", to: "/#hvac" },
      { label: "Schedules", to: "/#schedules" },
      { label: "AI Solver", to: "/#ai" },
      { label: "Calculators", to: "/#calculators" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Knowledge Base & FAQ", to: "/#company" },
      { label: "Careers", to: "/careers" },
      { label: "Contact Us", to: "/contact" },
      { label: "Request Access", to: "/access" },
    ],
  },
  {
    title: "Legal & Security",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Security & Compliance", to: "/security" },
      { label: "Data Addendum (DPA)", to: "/dpa" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com", icon: (props: any) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ) },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export function SiteFooter() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function handleLinkClick(e: React.MouseEvent, targetTo: string) {
    if (targetTo.includes("#")) {
      e.preventDefault();
      const [path, hash] = targetTo.split("#");
      const targetPath = path || "/";
      
      if (pathname === targetPath || (pathname === "/" && targetPath === "/")) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate({ to: targetPath as any, hash });
      }
    }
  }

  return (
    <footer className="border-t border-border px-4 md:px-6 py-16 bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 grid-cols-1 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="TARV logo"
              className="size-7 rounded-md object-contain dark:invert"
            />
            <span className="font-display text-xl font-bold tracking-tight">TARV</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The global AI-powered platform automating mechanical, electrical, and plumbing engineering workflows.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin size={15} className="text-brand shrink-0 mt-0.5" /> API World Tower 403, Sheikh Zayed Rd, Dubai, UAE
            </div>
            <a href="mailto:admin@tarv.ai" className="flex items-center gap-2 transition-colors hover:text-foreground font-mono text-xs">
              <Mail size={15} className="text-brand shrink-0" /> admin@tarv.ai
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full bg-surface border border-white/10 text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 shadow-sm"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Dynamic Navigation Columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold tracking-widest text-foreground uppercase">
              {col.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={(e) => handleLinkClick(e, l.to)}
                    className="text-muted-foreground transition-colors hover:text-brand font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} TARV Engineering · Headquartered in Dubai, UAE · All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <Link to="/security" className="hover:text-foreground">Security</Link>
          <Link to="/dpa" className="hover:text-foreground">DPA</Link>
        </div>
      </div>
    </footer>
  );
}
