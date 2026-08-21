import { ArrowRight, Mail, MapPin, ShieldCheck, Cpu, Zap, Linkedin, Github, Youtube, Instagram, Lock, Server, CheckCircle2 } from "lucide-react";
import { Reveal } from "./reveal";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

const liveStats = [
  { label: "Calculations Run", value: "50,000+" },
  { label: "ASHRAE Accuracy", value: "99.4%" },
  { label: "BIM Sync Speed", value: "< 2 sec" },
];

const securityBadges = [
  "SOC 2 Type II",
  "ISO 27001 Architecture",
  "TLS 1.3 / AES-256",
  "Dedicated Tenant Rooms",
];

export function Cta() {
  return (
    <section id="cta" className="px-4 md:px-6 py-24 md:py-36 relative overflow-hidden bg-background">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Left Panel - Pitch, Trust Ticker & CTA */}
        <Reveal>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-card p-6 sm:p-10 md:p-12 border border-border shadow-2xl transition-all duration-300 hover:border-blue-500/40">
            <div className="relative z-10 space-y-4">
              {/* Trust Badge Ribbon */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                <ShieldCheck size={14} />
                <span>Enterprise SLA & Bank-Grade Security</span>
              </div>

              {/* Bold Pitch */}
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Engineer <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  what's next.
                </span>
              </h2>

              <p className="max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                Automate your MEP calculation workflows today with AI accuracy. Join top engineering firms delivering projects 10x faster with 100% ASHRAE & IPC code compliance.
              </p>

              {/* Security Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {securityBadges.map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border text-[11px] font-mono font-bold text-muted-foreground">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Live Stats Ticker */}
            <div className="relative z-10 mt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/access"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs sm:text-sm font-extrabold text-primary-foreground shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <span>Get Started Now</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-foreground transition-all duration-200 hover:bg-muted"
                >
                  <span>Book Enterprise Demo</span>
                </Link>
              </div>

              {/* Real-time Stats Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-border pt-5">
                {liveStats.map((st) => (
                  <div key={st.label}>
                    <div className="text-base sm:text-xl font-mono font-extrabold text-foreground">{st.value}</div>
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Aesthetic Watermark */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-5 text-foreground">
              <Cpu size={280} />
            </div>
          </div>
        </Reveal>

        {/* Right Panel - Moving Video Showcase with Dedicated HUD Status Footer */}
        <Reveal delay={150}>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-3 sm:p-5 border border-border bg-card shadow-2xl transition-all duration-300 hover:border-blue-500/40 space-y-3 sm:space-y-4">
            
            {/* 3D Video Container */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-slate-800 shadow-2xl flex items-center justify-center">
              <video 
                src="/ref4.mp4"
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

              {/* Dark Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/85 px-3 py-1.5 text-[10px] sm:text-xs font-mono font-bold text-white backdrop-blur-md shadow-xl">
                  <Zap size={13} className="text-blue-400 animate-pulse" />
                  <span>Real-Time BIM Automation Engine</span>
                </div>
              </div>
            </div>

            {/* Integrated Below-Video Info Card */}
            <div className="rounded-2xl border border-border bg-muted/40 p-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold border border-blue-500/20 shrink-0">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-foreground">Instant BIM Parameter Sync</h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-tight font-medium">
                    Calculated parameters push back to Revit families in under 2 seconds.
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
      { label: "Pricing & Plans", to: "/pricing" },
      { label: "Resources & Guides", to: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/pricing" },
      { label: "Resources Hub", to: "/resources" },
      { label: "Knowledge Base & FAQ", to: "/#faq" },
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
    <footer className="border-t border-border px-4 md:px-6 py-16 bg-card/60 relative overflow-hidden font-sans">
      {/* Footer Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[140px]" />

      <div className="mx-auto grid max-w-6xl gap-10 grid-cols-1 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/favicon.png"
              alt="TARV logo"
              className="size-7 rounded-md object-contain dark:invert"
            />
            <span className="font-display text-xl font-black tracking-tight text-foreground">TARV</span>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground font-medium">
            The global AI-powered platform automating mechanical, electrical, and plumbing engineering workflows.
          </p>

          {/* Live Engine Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Solvers Operational (99.99%)</span>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground font-medium pt-1">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-cyan-500 shrink-0 mt-0.5" /> API World Tower 403, Sheikh Zayed Rd, Dubai, UAE
            </div>
            <a href="mailto:admin@tarv.ai" className="flex items-center gap-2 transition-colors hover:text-cyan-500 font-mono text-xs">
              <Mail size={14} className="text-cyan-500 shrink-0" /> admin@tarv.ai
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-2.5 pt-1">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-xl bg-muted/40 border border-border text-muted-foreground transition-all duration-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 hover:scale-105 shadow-sm"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links Columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-mono font-extrabold tracking-widest text-foreground uppercase">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={(e) => handleLinkClick(e, link.to)}
                    className="text-muted-foreground transition-colors hover:text-cyan-500 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row font-medium">
        <div>&copy; {new Date().getFullYear()} TARV Technologies FZ-LLC. All rights reserved.</div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link to="/privacy" className="hover:text-cyan-500">Privacy Policy</Link>
          <span className="text-border">•</span>
          <Link to="/terms" className="hover:text-cyan-500">Terms of Service</Link>
          <span className="text-border">•</span>
          <Link to="/security" className="hover:text-cyan-500">Security Overview</Link>
          <span className="text-border">•</span>
          <Link to="/dpa" className="hover:text-cyan-500">DPA</Link>
        </div>
      </div>
    </footer>
  );
}
