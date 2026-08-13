import { useState } from "react";
import { Building2, Flag, Lock, ShieldCheck, Users, Workflow, Search, HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import { Reveal } from "./reveal";

const facts = [
  { icon: Flag, label: "Funded", value: "2026" },
  { icon: Building2, label: "Headquarters", value: "Solapur, India" },
  { icon: Workflow, label: "Focus", value: "MEP design automation" },
  { icon: Users, label: "Model", value: "Engineer-led, AI-native" },
];

const compliance = [
  {
    icon: ShieldCheck,
    title: "Standards-aligned",
    body: "Calculations follow ASHRAE, EN, IPC, and Boverket references with a full mathematical audit trail on every output.",
  },
  {
    icon: Lock,
    title: "Enterprise security",
    body: "ISO 27001 compliant infrastructure, end-to-end 256-bit encryption, SSO/SAML, and isolated project data rooms.",
  },
  {
    icon: Workflow,
    title: "Fits your stack",
    body: "Two-way live sync with Revit, IFC, BIM 360, Navisworks, and your firm's internal spec and cost libraries.",
  },
];

const faqCategories = ["All", "Automation", "Integrations", "Security", "Compliance"];

const faqs = [
  {
    category: "Automation",
    q: "What exactly does TARV automate across HVAC, Electrical & Plumbing?",
    a: "TARV automates heat load & airflow sizing, duct & pipe hydraulic calculations, cable & voltage drop sizing, breaker selection, sanitary & storm drainage, and generates production-ready Revit schedules instantly.",
  },
  {
    category: "Compliance",
    q: "Does it replace my engineering judgment or PE sign-offs?",
    a: "No. TARV acts as an AI co-pilot. Every single calculation is delivered with the full mathematical formula, step-by-step logic, and exact code references (ASHRAE, IPC, NEC) so PE engineers can review, tweak, and sign off with complete confidence.",
  },
  {
    category: "Integrations",
    q: "How does TARV integrate with our existing Revit & BIM workflows?",
    a: "TARV connects directly to your Revit, AutoCAD, or IFC files via our lightweight plugin or web uploader. You can extract model data, run automated sizing, and write updated parameters back to your Revit families in seconds.",
  },
  {
    category: "Security",
    q: "Where is our project data stored and is it kept confidential?",
    a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Project models are strictly isolated per enterprise organization and are never used to train public or shared AI models.",
  },
  {
    category: "Compliance",
    q: "How does TARV stay updated with regional building codes?",
    a: "Our engineering rules engine is continuously updated with the latest ASHRAE 62.1 & 90.1, SMACNA, IPC, NFPA, and regional European/Indian standards. You can also define custom firm-specific engineering standards.",
  },
  {
    category: "Automation",
    q: "Can TARV handle custom equipment schedules and family templates?",
    a: "Yes! You can map TARV's output directly to your firm's custom shared parameters, title blocks, and schedule formatting templates to maintain total brand and standard consistency.",
  },
  {
    category: "Integrations",
    q: "What file formats does TARV support for input and export?",
    a: "TARV natively imports Revit (.rvt), IFC 2x3/4, DWG, PDF drawings, and Excel CSVs. Exports include populated Revit models, IFC files, Excel schedules, and formatted PDF design reports.",
  },
  {
    category: "Security",
    q: "What is the onboarding time for an engineering firm?",
    a: "Engineering teams are typically up and running within 30 minutes. Our intuitve cloud interface requires zero heavy local installation, and onboarding includes sample projects and dedicated technical support.",
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
              Built in Solapur, for engineers everywhere.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              TARV was founded in Solapur, India by engineers who spent their careers
              redrawing the same ducts, risers, and schedules. We build the AI-powered platform that
              automates mechanical, electrical, and plumbing design workflows — so teams spend their
              hours on the decisions that matter.
            </p>
            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="glass-subtle rounded-2xl p-5 border border-white/10 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-brand/10 text-brand">
                      <f.icon size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        {f.label}
                      </div>
                      <div className="text-base font-bold text-foreground mt-0.5">{f.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4">
            {compliance.map((c, i) => (
              <Reveal key={c.title} delay={i * 110}>
                <div className="glass rounded-3xl p-7 border border-white/10 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/20">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                      <c.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Google Maps Location Embed Card */}
            <Reveal delay={350}>
              <div className="glass rounded-3xl p-4 border border-border transition-all duration-300 hover:shadow-xl">
                <div className="px-3 pt-2 pb-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-brand flex items-center gap-1.5">
                    <Building2 size={14} /> Official Head Office Location
                  </div>
                  <div className="text-sm font-bold text-foreground mt-0.5">
                    Consistent Engineering Consultants · Dubai, UAE
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1786619856604!6m8!1m7!1sw1r-YQ_mPUD2HDisvL7V1w!2m2!1d25.22561241959889!2d55.28367855174471!3f185.98!4f0!5f0.7820865974627469"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Consistent Engineering Consultants Map"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="panel-gradient relative py-28 md:py-36 overflow-hidden">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/10 blur-[140px]" />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal>
          <div className="text-center">
            <div className="eyebrow inline-flex items-center gap-2">
              <HelpCircle size={15} className="text-brand" />
              KNOWLEDGE BASE & FAQ
            </div>
            <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Questions engineers ask first.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about TARV's calculation engines, code compliance, BIM integration, and enterprise security.
            </p>
          </div>
        </Reveal>

        {/* Controls: Search & Category Filters */}
        <Reveal delay={100} className="mt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search engineering questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-card shadow-sm py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="glass-subtle group rounded-2xl border border-white/10 dark:border-white/5 p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base md:text-lg font-bold text-foreground">
                    <span className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-brand shrink-0" />
                      {f.q}
                    </span>
                    <div className="grid size-8 place-items-center rounded-full bg-accent/50 text-muted-foreground transition-transform duration-300 group-open:rotate-180 shrink-0">
                      <ChevronDown size={18} />
                    </div>
                  </summary>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground pl-7">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))
          ) : (
            <div className="text-center py-12 glass rounded-2xl">
              <p className="text-muted-foreground text-sm">No matching questions found for "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
