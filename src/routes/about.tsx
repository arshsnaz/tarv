import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Building2, Flag, Users, Workflow, Award, ShieldCheck, ArrowRight, User, Sparkles, MapPin, GraduationCap, Cpu, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — TARV AI MEP Engineering & Calculation Software" },
      {
        name: "description",
        content:
          "Learn about TARV Engineering — founded in Dubai, UAE to build the world's most advanced online MEP calculator, HVAC load solver, and MEP design automation software.",
      },
      {
        name: "keywords",
        content:
          "MEP engineering calculator, MEP design tools, MEP formulas, MEP calculation software, online engineering calculator MEP, Dubai MEP engineering",
      },
      { property: "og:title", content: "About Us — TARV AI MEP Engineering & Calculation Software" },
      { property: "og:description", content: "Discover how TARV is revolutionizing MEP engineering design tools and automated calculation software." },
      { property: "og:url", content: "https://tarvofficial.vercel.app/about" },
      { property: "og:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — TARV AI MEP Engineering Software" },
      { name: "twitter:description", content: "AI-Powered Online MEP Calculator & Building Systems Automation Software." },
      { name: "twitter:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Engineering Precision First",
    body: "Every calculation is backed by explicit mathematical formulas, ASHRAE 62.1/90.1 references, and IPC code logic. Zero black-box guesswork.",
    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
  },
  {
    icon: Workflow,
    title: "Seamless 2-Way BIM Flow",
    body: "We build tools that integrate directly with Revit, AutoCAD, and IFC standards — so engineers never waste time on manual takeoffs.",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    icon: Award,
    title: "Global Enterprise Trust",
    body: "Delivering world-class security, 99.9% solver uptime, and isolated tenant environments for engineering teams worldwide.",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Building2 size={14} />
              <span>ABOUT TARV AI ENGINEERING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Building the Future of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                MEP Engineering Automation.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Headquartered in Dubai, UAE, TARV is dedicated to revolutionizing mechanical, electrical, and plumbing engineering workflows with physics-based AI automation.
            </p>
          </div>
        </Reveal>

        {/* Founding Story */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-card shadow-2xl space-y-4 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

              <span className="text-[10px] font-extrabold text-cyan-500 uppercase tracking-widest block">OUR MISSION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Why We Founded TARV</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                MEP engineers spend up to 60% of their billable hours manually sizing ducts, recalculating voltage drops, checking pipe friction losses, and typing equipment tags into schedules.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We founded TARV to change that forever. By combining AI continuous model auditing with rigorous physics equations, we empower engineering teams to deliver projects 10x faster with 100% code compliance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Headquarters", val: "Dubai, UAE", icon: MapPin, color: "text-cyan-500" },
                { label: "Founded", val: "2026", icon: Flag, color: "text-amber-500" },
                { label: "Calculations Run", val: "50,000+", icon: Workflow, color: "text-emerald-500" },
                { label: "Code Accuracy", val: "99.4%", icon: ShieldCheck, color: "text-blue-500" },
              ].map((st) => (
                <div key={st.label} className="p-5 rounded-2xl border border-border bg-card shadow-md space-y-1">
                  <st.icon size={20} className={`${st.color} mb-1`} />
                  <div className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-wider">{st.label}</div>
                  <div className="text-lg font-black text-foreground font-mono">{st.val}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* CEO & Leadership Section */}
        <Reveal>
          <div className="p-8 sm:p-12 rounded-3xl border-2 border-cyan-500/30 bg-card shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                  <img
                    src="/salil-kulkarni.jpg"
                    alt="Salil Kulkarni - CEO & Founder, TARV"
                    className="relative rounded-2xl w-52 h-52 sm:w-60 sm:h-60 object-cover border-2 border-cyan-500/50 shadow-2xl"
                  />
                </div>
                <a
                  href="https://www.linkedin.com/in/salil-kulkarni-76421919b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-xs font-extrabold shadow-md hover:bg-[#004182] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>

              <div className="lg:col-span-8 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  <User size={14} />
                  <span>FOUNDER & LEADERSHIP</span>
                </div>
                <h2 className="text-3xl font-black text-foreground">Salil Kulkarni</h2>
                <div className="text-cyan-600 dark:text-cyan-400 font-extrabold text-sm sm:text-base">
                  CEO & Founder, TARV | R&D Manager, Consistent Engineering Consultants
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Salil Kulkarni holds a <strong className="text-foreground">B.S. in Mechanical Engineering from Purdue University</strong> (ASME, Autonomous Robotics Club) and serves as the <strong className="text-foreground">R&D Manager at Consistent Engineering Consultants</strong> in Dubai, UAE.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Combining a rich background in mechanical engineering design, robotics, and Python AI/Data Science, Salil founded TARV to pioneer physics-driven MEP software automation. Under his leadership, TARV bridges the gap between ASHRAE/NEC engineering physics and 2-way 3D Revit BIM model synchronization.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-xl bg-muted border border-border text-[11px] font-bold text-foreground">Purdue Mechanical Engineering</span>
                  <span className="px-3 py-1 rounded-xl bg-muted border border-border text-[11px] font-bold text-foreground">R&D Manager @ Consistent Engineering</span>
                  <span className="px-3 py-1 rounded-xl bg-muted border border-border text-[11px] font-bold text-foreground">Python AI & Data Science</span>
                  <span className="px-3 py-1 rounded-xl bg-muted border border-border text-[11px] font-bold text-foreground">Revit BIM Automation</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Engineering Values */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-foreground text-center">Our Core Engineering Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-7 rounded-3xl border border-border bg-card shadow-lg space-y-3 hover:border-cyan-500/40 transition-all">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold border ${v.color}`}>
                  <v.icon size={20} />
                </div>
                <h3 className="text-base font-extrabold text-foreground">{v.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <Reveal>
          <div className="p-8 sm:p-12 rounded-3xl text-center border border-cyan-500/30 bg-card shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Ready to Transform Your MEP Workflow?</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Request access today and join engineering firms automating HVAC, electrical, and plumbing workflows globally.
            </p>
            <div className="pt-2">
              <a
                href="/access"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 text-xs font-extrabold shadow-md transition-all cursor-pointer"
              >
                <span>Request Access</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
