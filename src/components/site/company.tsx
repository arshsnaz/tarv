import { useState } from "react";
import { Building2, Flag, Lock, ShieldCheck, Users, Workflow, Search, HelpCircle, ChevronDown, CheckCircle2, MapPin, Sparkles, ArrowUpRight, Award, Server } from "lucide-react";
import { Reveal } from "./reveal";

const facts = [
  { icon: Flag, label: "FOUNDED", value: "2026", desc: "Private beta launched" },
  { icon: Building2, label: "GLOBAL HQ", value: "Dubai, UAE", desc: "API World Tower, SZR" },
  { icon: Workflow, label: "CORE DOMAIN", value: "MEP Automation", desc: "HVAC, Elec, Plumbing, Fire" },
  { icon: Users, label: "ENGINEERING TEAM", value: "AI-Native & PE-Led", desc: "Built by consulting directors" },
];

const compliance = [
  {
    icon: ShieldCheck,
    title: "Global Standards Alignment",
    body: "Calculations follow ASHRAE, EN, IPC, and regional building references with a complete mathematical audit trail and formula proof on every output.",
    badge: "ASHRAE & IPC Certified",
  },
  {
    icon: Lock,
    title: "Bank-Grade Cloud Security",
    body: "ISO 27001 certified architecture, end-to-end 256-bit encryption, SAML/SSO enterprise authentication, and isolated tenant project rooms.",
    badge: "ISO 27001 / SOC 2",
  },
  {
    icon: Workflow,
    title: "Native BIM Stack Integration",
    body: "Bi-directional live sync with Autodesk Revit 2025, IFC 4, Autodesk Construction Cloud (BIM 360), and your firm's internal master spec libraries.",
    badge: "Revit 2025 Bi-Directional",
  },
];

const faqCategories = [
  { id: "All", label: "All Questions", count: 8 },
  { id: "Automation", label: "Automation Engines", count: 2 },
  { id: "Integrations", label: "BIM & Revit Sync", count: 2 },
  { id: "Security", label: "Enterprise Security", count: 2 },
  { id: "Compliance", label: "Code Compliance", count: 2 },
];

const faqs = [
  {
    category: "Automation",
    q: "What exactly does TARV automate across HVAC, Electrical & Plumbing?",
    a: "TARV automates building heat load & airflow sizing, duct & pipe hydraulic calculations, cable & voltage drop sizing, breaker selection, sanitary & storm drainage, and generates production-ready Revit schedules instantly with complete engineering equations.",
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
    <section id="company" className="py-24 md:py-36 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Top Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider">
              <Building2 size={14} className="text-indigo-500 shrink-0" />
              <span>GLOBAL ENGINEERING HEADQUARTERS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mt-4 leading-[1.1]">
              Built in Dubai. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Engineered for the world.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              TARV was founded in Dubai, UAE by MEP consulting directors who spent decades redrawing the same duct systems, cable feeders, and equipment schedules. We build the world's most trusted AI calculation engine — empowering engineering consultants to deliver compliant, high-performance projects 10x faster.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Semrush-Style Authority Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: Facts & Value Prop */}
          <Reveal className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <Award size={14} /> TARV ENGINEERING CREDENTIALS
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">Dubai Economy Licensed</span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                Our mission is to eliminate repetitive MEP drafting and manual spreadsheet sizing. Every calculation run on TARV is backed by deterministic building physics equations, certified engineering standard citations, and instant Revit RFA parameters.
              </p>

              {/* Fact Tiles */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-2xl p-4 border border-border bg-muted/20 hover:border-indigo-500/30 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold border border-indigo-500/20 shrink-0 mt-0.5">
                        <f.icon size={16} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-muted-foreground uppercase block">
                          {f.label}
                        </span>
                        <div className="text-sm font-extrabold text-foreground mt-0.5">{f.value}</div>
                        <span className="text-[10px] text-muted-foreground font-medium block mt-0.5">{f.desc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Security, Compliance & Google Map */}
          <div className="lg:col-span-6 space-y-4">
            {compliance.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="rounded-3xl p-5 sm:p-6 border border-border bg-card shadow-sm transition-all duration-200 hover:border-indigo-500/40 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shrink-0 mt-0.5">
                      <c.icon size={18} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-foreground">{c.title}</h3>
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          {c.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">{c.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Google Maps Location Embed Card */}
            <Reveal delay={300}>
              <div className="rounded-3xl p-5 border border-border bg-card shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <MapPin size={14} /> Official Head Office Location
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Dubai, UAE
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-foreground">
                  API World Tower 403, Sheikh Zayed Rd, Trade Centre 1, Dubai
                </div>
                <div className="overflow-hidden rounded-2xl border border-border shadow-inner mt-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1786619856604!6m8!1m7!1sw1r-YQ_mPUD2HDisvL7V1w!2m2!1d25.22561241959889!2d55.28367855174471!3f185.98!4f0!5f0.7820865974627469"
                    width="100%"
                    height="170"
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
    <section id="faq" className="py-24 md:py-36 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-wider">
              <HelpCircle size={14} className="text-sky-500 shrink-0" />
              <span>KNOWLEDGE BASE & VERIFIED FAQ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mt-4 leading-[1.1]">
              Questions engineers <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                ask first.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about TARV's calculation engines, code compliance, BIM integration, and enterprise security.
            </p>
          </div>
        </Reveal>

        {/* Controls: Search & Category Filters */}
        <Reveal delay={100} className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md mx-auto sm:mx-0 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search engineering questions, codes, Revit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-sky-600 text-white shadow-md scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <details className="group rounded-3xl border border-border bg-card p-5 sm:p-6 transition-all duration-200 hover:border-sky-500/40 hover:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm sm:text-base font-extrabold text-foreground">
                    <span className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                      {f.q}
                    </span>
                    <div className="grid size-7 place-items-center rounded-full bg-muted text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0">
                      <ChevronDown size={16} />
                    </div>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground pl-7 font-medium">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))
          ) : (
            <div className="text-center py-12 rounded-3xl border border-border bg-card">
              <p className="text-muted-foreground text-sm font-medium">No matching questions found for "{searchQuery}".</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
