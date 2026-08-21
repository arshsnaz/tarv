import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Briefcase, ArrowUpRight, Zap, Code, ShieldCheck, MapPin, Sparkles, Building2, Globe, Heart, DollarSign } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Join TARV — Engineering the Future of MEP AI" },
      {
        name: "description",
        content:
          "Explore open engineering & BIM software roles at TARV Engineering. Help us build the next generation of AI-powered MEP design automation software in Dubai or remotely.",
      },
    ],
  }),
  component: CareersPage,
});

const jobs = [
  {
    title: "Senior MEP AI Physics Engineer",
    dept: "Engineering Solvers",
    location: "Dubai, UAE / Remote",
    type: "Full-Time",
    desc: "Develop computational fluid dynamics (CFD) and thermal load calculation algorithms integrated with AI solvers.",
  },
  {
    title: "Computational BIM & Revit Plugin Developer",
    dept: "BIM Integration",
    location: "Dubai, UAE / Remote",
    type: "Full-Time",
    desc: "Build high-performance C# / Python Revit add-ins and IFC 2-way live parameter sync engines.",
  },
  {
    title: "Lead Frontend Engineer (React / TanStack / WebGL)",
    dept: "Product Design",
    location: "Dubai, UAE / Remote",
    type: "Full-Time",
    desc: "Craft high-motion, ultra-responsive engineering dashboards and interactive 3D model inspectors.",
  },
  {
    title: "Enterprise Solutions Engineer (MEP Domain Specialist)",
    dept: "Customer Success",
    location: "Dubai, UAE / Remote",
    type: "Full-Time",
    desc: "Partner with global engineering firms to integrate TARV into major commercial and industrial projects.",
  },
];

const PERKS = [
  { icon: Globe, title: "Dubai HQ & Remote", desc: "Work from our API World Tower office in Dubai or anywhere globally." },
  { icon: Zap, title: "High-Impact Engineering", desc: "Solve real physics math and BIM synchronization challenges for major firms." },
  { icon: DollarSign, title: "Competitive Package", desc: "Top-tier salary, annual bonus, and generous equity options." },
  { icon: Heart, title: "Health & Wellness", desc: "Full medical coverage, visa sponsorship, and continuous learning budgets." },
];

function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-6xl mx-auto space-y-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Briefcase size={14} />
              <span>CAREERS AT TARV ENGINEERING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Shape the Future of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                MEP Automation & BIM Software.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We are building the AI co-pilot for global building engineers. Join us in Dubai, UAE or remotely to solve hard physics & BIM engineering problems.
            </p>
          </div>
        </Reveal>

        {/* Culture & Perks Grid */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-xs">{p.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Job Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Briefcase size={18} className="text-cyan-500" />
              <span>Open Engineering Positions ({jobs.length})</span>
            </h2>
          </div>

          <div className="space-y-4">
            {jobs.map((j, i) => (
              <Reveal key={j.title} delay={i * 80}>
                <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-cyan-500/50 transition-all">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase">
                        {j.dept}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                        <MapPin size={13} className="text-cyan-500" /> {j.location}
                      </span>
                      <span className="text-xs font-mono font-bold text-muted-foreground">• {j.type}</span>
                    </div>
                    <h3 className="text-lg font-black text-foreground">{j.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">{j.desc}</p>
                  </div>
                  <a
                    href={`mailto:admin@tarv.ai?subject=Application%20for%20${encodeURIComponent(j.title)}`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 text-xs font-extrabold shadow-sm transition-all shrink-0 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
