import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Building2, Flag, Users, Workflow, Award, ShieldCheck, ArrowRight } from "lucide-react";
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
  },
  {
    icon: Workflow,
    title: "Seamless BIM Flow",
    body: "We build tools that integrate directly with Revit, AutoCAD, and IFC standards — so engineers never waste time on manual takeoffs.",
  },
  {
    icon: Award,
    title: "Global Enterprise Trust",
    body: "Delivering world-class security, 99.9% solver uptime, and isolated tenant environments for engineering teams worldwide.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="eyebrow inline-flex items-center gap-2">
              <Building2 size={16} className="text-brand" />
              ABOUT TARV ENGINEERING
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
              Building the Future of MEP Engineering.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Headquartered in Dubai, UAE, TARV is dedicated to revolutionizing mechanical, electrical, and plumbing engineering workflows with physics-based AI automation.
            </p>
          </div>
        </Reveal>

        {/* Founding Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <Reveal>
            <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 dark:border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                MEP engineers spend up to 60% of their billable hours manually sizing ducts, recalculating voltage drops, checking pipe friction losses, and typing equipment tags into schedules.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mt-4">
                We founded TARV to change that forever. By combining AI continuous model auditing with rigorous physics equations, we empower engineering teams to deliver projects 10x faster with 100% code compliance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Headquarters", val: "Dubai, UAE", icon: Building2 },
                { label: "Funded", val: "2026", icon: Flag },
                { label: "Calculations Run", val: "50,000+", icon: Workflow },
                { label: "Code Accuracy", val: "99.4%", icon: ShieldCheck },
              ].map((st) => (
                <div key={st.label} className="glass-subtle p-5 rounded-2xl border border-white/10">
                  <st.icon size={18} className="text-brand mb-2" />
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{st.label}</div>
                  <div className="text-lg font-extrabold mt-0.5">{st.val}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-12">Our Engineering Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass p-7 rounded-3xl border border-white/10">
                <div className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand mb-4">
                  <v.icon size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] text-center border border-brand/20 bg-brand/5">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Transform Your MEP Workflow?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base">
            Request access today and join engineering firms automating HVAC, electrical, and plumbing workflows globally.
          </p>
          <a
            href="/access"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-all"
          >
            Request Access <ArrowRight size={18} />
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
