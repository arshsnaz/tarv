import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Briefcase, ArrowUpRight, Zap, Code, ShieldCheck, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Join TARV — Engineering the Future of MEP AI" },
      {
        name: "description",
        content:
          "Explore open roles at TARV Engineering. Help us build the next generation of AI-powered MEP design automation software.",
      },
    ],
  }),
  component: CareersPage,
});

const jobs = [
  {
    title: "Senior MEP AI Physics Engineer",
    dept: "Engineering Solvers",
    location: "Solapur, India / Remote",
    type: "Full-Time",
    desc: "Develop computational fluid dynamics (CFD) and thermal load calculation algorithms integrated with AI solvers.",
  },
  {
    title: "Computational BIM & Revit Plugin Developer",
    dept: "BIM Integration",
    location: "Solapur, India / Remote",
    type: "Full-Time",
    desc: "Build high-performance C# / Python Revit add-ins and IFC 2-way live parameter sync engines.",
  },
  {
    title: "Lead Frontend Engineer (React / TanStack / WebGL)",
    dept: "Product Design",
    location: "Solapur, India / Remote",
    type: "Full-Time",
    desc: "Craft high-motion, ultra-responsive engineering dashboards and interactive 3D model inspectors.",
  },
  {
    title: "Enterprise Solutions Engineer (MEP Domain Specialist)",
    dept: "Customer Success",
    location: "Solapur, India / Dubai / Remote",
    type: "Full-Time",
    desc: "Partner with global engineering firms to integrate TARV into major commercial and industrial projects.",
  },
];

function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="eyebrow inline-flex items-center gap-2">
              <Briefcase size={16} className="text-brand" />
              JOIN OUR TEAM
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
              Shape the Future of MEP Automation.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              We are building the AI co-pilot for global building engineers. Join us in Solapur, India or remotely to solve hard engineering problems.
            </p>
          </div>
        </Reveal>

        {/* Job Listings Grid */}
        <div className="space-y-4 mb-20">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          {jobs.map((j, i) => (
            <Reveal key={j.title} delay={i * 80}>
              <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:border-brand/30">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-bold text-brand">{j.dept}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
                    <span className="text-xs font-mono text-muted-foreground">• {j.type}</span>
                  </div>
                  <h3 className="text-xl font-bold">{j.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{j.desc}</p>
                </div>
                <a
                  href="mailto:admin@tarv.ai"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-all shrink-0"
                >
                  Apply Now <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
