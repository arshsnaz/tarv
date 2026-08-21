import { Reveal } from "./reveal";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Workflow } from "lucide-react";

const firms = ["AECOM", "ARUP", "WSP", "JACOBS", "STANTEC", "MOTT MACDONALD"];

export function TrustedBy() {
  return (
    <section className="border-y border-border py-16 md:py-20 overflow-hidden bg-card/40">
      <div className="mx-auto max-w-full text-center relative">
        <p className="mb-10 text-xs tracking-[0.2em] text-muted-foreground uppercase px-6 font-extrabold flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-cyan-500" />
          <span>Trusted by engineers at world-class consulting firms</span>
        </p>
        <div className="relative flex overflow-hidden max-w-7xl mx-auto mask-marquee">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          
          <div className="flex shrink-0 animate-marquee items-center opacity-70">
            {/* Duplicated list for seamless looping */}
            {[...firms, ...firms, ...firms, ...firms].map((f, i) => (
              <span key={`${f}-${i}`} className="font-display text-xl font-black tracking-wider mx-8 md:mx-12 whitespace-nowrap text-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Platform() {
  return (
    <section id="platform" className="relative py-28 md:py-36 flex items-center overflow-hidden bg-background font-sans">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left 6 Cols - High Impact Content */}
          <Reveal className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Cpu size={14} />
              <span>ENGINEER-FIRST WORKFLOW PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Built for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                MEP Engineers.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
              Whether you're designing electrical, HVAC, plumbing, or fire protection systems, our platform is built for MEP engineers. AI-powered, deeply technical, incredibly fast, and effortless to use.
            </p>

            {/* Platform Capability Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  <Zap size={15} />
                </div>
                <div>
                  <strong className="text-foreground text-xs font-extrabold block">Instant Physics Sizing</strong>
                  <span className="text-[10px] text-muted-foreground">0.01s calculation latency</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Workflow size={15} />
                </div>
                <div>
                  <strong className="text-foreground text-xs font-extrabold block">2-Way Revit Sync</strong>
                  <span className="text-[10px] text-muted-foreground">Parameter & schedule push</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/access"
                className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request access</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          {/* Right 6 Cols - Media Frame with Glowing Ambient Borders */}
          <Reveal delay={150} className="lg:col-span-6 relative mx-auto w-full max-w-[600px] lg:mx-0 lg:max-w-none">
            {/* Ambient glow behind video */}
            <div className="absolute inset-0 -z-10 bg-cyan-500/20 blur-[100px]" />
            
            <div className="rounded-3xl p-3 border-2 border-cyan-500/30 bg-card shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/60">
              <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center">
                <video 
                  src="/ref2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controlsList="nodownload no-remote-playback noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-auto object-contain block rounded-2xl select-none pointer-events-none"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
