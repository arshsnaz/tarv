import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";
import {
  Check,
  Zap,
  ShieldCheck,
  Users,
  Building2,
  HelpCircle,
  Calculator,
  Workflow,
  ArrowRight,
  Sparkles,
  Globe,
  DollarSign,
  Euro,
  Coins,
  ChevronDown,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Licensing Plans — TARV AI MEP Calculator & Software" },
      {
        name: "description",
        content:
          "Predictable, enterprise pricing for TARV MEP Calculator & Design Automation Suite. Flexible plans for individual consultants, engineering firms, and global enterprise teams with USD, EUR, AED, and GBP support.",
      },
      {
        name: "keywords",
        content:
          "MEP calculator pricing, MEP engineering software cost, HVAC calculator licensing, Revit BIM sync pricing, Dubai MEP software subscription, ASHRAE load calculation plans",
      },
      { property: "og:title", content: "Pricing & Licensing Plans — TARV AI MEP Calculator" },
      { property: "og:description", content: "Commercial plans & ROI savings calculator for TARV MEP Engineering Suite." },
      { property: "og:url", content: "https://tarvofficial.vercel.app/pricing" },
      { property: "og:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing Plans — TARV AI MEP Software" },
      { name: "twitter:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/pricing" }],
  }),
  component: PricingPage,
});

type CurrencyKey = "USD" | "EUR" | "AED" | "GBP";

const CURRENCIES: Record<CurrencyKey, { symbol: string; label: string; rate: number }> = {
  USD: { symbol: "$", label: "USD ($)", rate: 1 },
  EUR: { symbol: "€", label: "EUR (€)", rate: 0.92 },
  AED: { symbol: "AED ", label: "AED (AED)", rate: 3.67 },
  GBP: { symbol: "£", label: "GBP (£)", rate: 0.79 },
};

const PLANS = [
  {
    id: "pro",
    name: "Professional Engineer",
    badge: "Individual Specialist",
    desc: "Perfect for independent consultants & specialist engineers needing standard-verified calculations.",
    monthlyPrice: 49,
    annualPrice: 39,
    btnText: "Start 14-Day Free Trial",
    btnLink: "/access",
    featured: false,
    features: [
      "Access to all 50+ MEP Calculators (HVAC, Electrical, Plumbing, Fire)",
      "ASHRAE 62.1 & 90.1, NEC 2023, IPC Code Solver Engines",
      "Single-Engineer Workspace Seat",
      "Export Official Engineering PDF & Excel Summaries",
      "Standard Email Support (< 24hr response)",
      "Cloud Project Storage (50 Projects)",
    ],
  },
  {
    id: "team",
    name: "Engineering Team",
    badge: "MOST POPULAR",
    desc: "Built for MEP consulting firms & design offices requiring team collaboration & BIM Revit 2-Way Sync.",
    monthlyPrice: 129,
    annualPrice: 99,
    btnText: "Get Team Workspace Access",
    btnLink: "/access",
    featured: true,
    features: [
      "Everything in Professional, plus:",
      "Revit 2-Way BIM Parameter & Schedule Sync",
      "Multi-Seat Workspace & Collaborative Project Sharing",
      "Automated DB Schedule & Single-Line Diagram Builder",
      "Custom Firm Logo on PDF & CAD Calculation Reports",
      "Priority Solver Queue (< 0.01 sec calculation speed)",
      "Unlimited Cloud Project Storage",
      "Dedicated Onboarding & Live Training Session",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Firm",
    badge: "Global Enterprise",
    desc: "For global engineering consultancies requiring custom code standards, isolated tenants & SLAs.",
    monthlyPrice: 399,
    annualPrice: 319,
    btnText: "Talk to Enterprise Sales",
    btnLink: "/contact",
    featured: false,
    features: [
      "Everything in Engineering Team, plus:",
      "Custom Regional Code Rules (GCC, US, EU, Asia-Pacific)",
      "Unlimited Team Members & Global Floating Licenses",
      "Isolated Dedicated Single-Tenant Cloud Infrastructure",
      "SOC 2 Type II, ISO 27001 Security & SAML SSO / Okta",
      "Custom API & ERP Integration Connectors",
      "Dedicated Enterprise Account Engineer",
      "99.99% Uptime Guarantee & 1-Hour SLA",
    ],
  },
];

const MATRIX = [
  {
    category: "MEP Calculation Suites",
    items: [
      { name: "HVAC Load & Duct Sizing (ASHRAE 62.1/90.1)", pro: "Full", team: "Full", ent: "Full + Custom" },
      { name: "Electrical Cable, Busbar & Short Circuit (NEC/IEC)", pro: "Full", team: "Full", ent: "Full + Custom" },
      { name: "Plumbing Fixture Unit & Drainage (IPC/UPC)", pro: "Full", team: "Full", ent: "Full + Custom" },
      { name: "Fire Fighting & Hydraulic Sizer (NFPA 13/20)", pro: "Full", team: "Full", ent: "Full + Custom" },
    ],
  },
  {
    category: "BIM & Automation Workflow",
    items: [
      { name: "PDF & Excel Calculation Exports", pro: "Standard", team: "Branded with Firm Logo", ent: "Custom Templates" },
      { name: "Revit 2-Way BIM Parameter Sync Plugin", pro: "—", team: "Included", ent: "Included + API" },
      { name: "Automated DB & Panel Schedule Builder", pro: "Basic", team: "Advanced", ent: "Custom ERP Sync" },
      { name: "Multi-User Live Collaboration", pro: "—", team: "Up to 25 Seats", ent: "Unlimited Seats" },
    ],
  },
  {
    category: "Security & Enterprise Governance",
    items: [
      { name: "Data Security Standards", pro: "TLS 1.3 / AES-256", team: "TLS 1.3 / AES-256", ent: "Dedicated Isolated Tenant" },
      { name: "SAML SSO / Okta / Azure AD", pro: "—", proNote: "", team: "Optional", ent: "Included" },
      { name: "Guaranteed SLA Uptime", pro: "99.5%", team: "99.9%", ent: "99.99% Guaranteed SLA" },
      { name: "Technical Support Tier", pro: "Email (< 24hr)", team: "Priority Phone & Chat (< 4hr)", ent: "1-on-1 Dedicated Account Mgr" },
    ],
  },
];

const FAQS = [
  {
    q: "Can I try TARV MEP Calculator before purchasing?",
    a: "Yes! We offer a 14-day free trial on all plans with full access to all 50+ MEP calculators, ASHRAE/NEC solvers, and export features with zero risk.",
  },
  {
    q: "What payment methods and currencies do you support?",
    a: "We support major global credit cards (Visa, Mastercard, AMEX), wire transfers, and corporate purchase orders (PO). You can pay in USD ($), EUR (€), AED (AED), or GBP (£).",
  },
  {
    q: "How does the Revit 2-Way BIM Sync work?",
    a: "Our lightweight Revit Add-in links your 3D BIM model parameter data directly with TARV online cloud calculators. Sizing changes run in TARV are pushed back into Revit parameters in < 2 seconds.",
  },
  {
    q: "Can we add more team members to our workspace later?",
    a: "Absolutely. You can add or adjust team seats anytime from your firm admin workspace dashboard with prorated billing.",
  },
  {
    q: "Do you offer custom regional building code rules (e.g. GCC/DEWA, EU, US)?",
    a: "Yes. Our Enterprise plan allows engineering consultancies to embed custom firm calculation standards and regional code authority parameters (e.g., DEWA, DCL, Saudi SBC, CIBSE, ASHRAE).",
  },
];

function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<CurrencyKey>("USD");

  // Interactive ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(65); // $65/hr average engineer billing rate
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12); // 12 hours spent on manual MEP math per week

  const curr = CURRENCIES[currency];

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * curr.rate);
    if (currency === "AED") {
      return `${converted} AED`;
    }
    return `${curr.symbol}${converted}`;
  };

  // ROI Math Calculation
  // TARV reduces calculation time by ~85%
  const hoursSavedPerWeek = Math.round(hoursPerWeek * 0.85 * teamSize);
  const monthlySavingsDollars = Math.round(hoursSavedPerWeek * 4.33 * hourlyRate);
  const annualSavingsDollars = Math.round(monthlySavingsDollars * 12);
  const estimatedCostMonthly = teamSize * (isAnnual ? 99 : 129);
  const netAnnualRoi = Math.max(0, annualSavingsDollars - estimatedCostMonthly * 12);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="pt-28 pb-24 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto pt-6 pb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand backdrop-blur-md">
              <Sparkles size={14} />
              <span>Transparent Enterprise Licensing</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-balance mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Predictable Pricing for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-blue-500">
                Global MEP Engineering Teams.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Equip your engineers with the world's most accurate AI MEP calculation software. 
              Zero hidden fees, transparent seats, and guaranteed ASHRAE/NEC compliance.
            </p>
          </Reveal>

          {/* Currency Switcher & Billing Interval Toggle */}
          <Reveal delay={200} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Currency Selector */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 p-1 backdrop-blur-md">
              <span className="px-3 text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Globe size={13} />
                Currency:
              </span>
              {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setCurrency(k)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    currency === k
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Billing Toggle (Monthly / Annual) */}
            <div className="flex items-center gap-3 rounded-full border border-border bg-card/60 p-1.5 backdrop-blur-md">
              <button
                onClick={() => setIsAnnual(false)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  !isAnnual
                    ? "bg-foreground text-background dark:bg-white dark:text-black shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  isAnnual
                    ? "bg-foreground text-background dark:bg-white dark:text-black shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Annual Billing</span>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-500">
                  SAVE 20%
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8 items-stretch">
          {PLANS.map((plan, index) => {
            const rawPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const priceDisplay = formatPrice(rawPrice);

            return (
              <Reveal key={plan.id} delay={100 + index * 100} className="flex">
                <div
                  className={`glass relative flex w-full flex-col justify-between rounded-[2.25rem] p-7 sm:p-9 transition-all duration-500 border ${
                    plan.featured
                      ? "border-brand/50 bg-card/95 shadow-2xl shadow-brand/15 ring-2 ring-brand/30 hover:-translate-y-2"
                      : "border-border/60 bg-card/60 hover:-translate-y-1 hover:border-foreground/20"
                  }`}
                >
                  {/* Card Header & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                        plan.featured
                          ? "bg-brand text-brand-foreground shadow-lg shadow-brand/25"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        {plan.badge}
                      </span>
                      {isAnnual && (
                        <span className="text-[11px] font-semibold text-emerald-500">
                          2 Months Free Included
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[44px]">
                      {plan.desc}
                    </p>

                    {/* Price Tag */}
                    <div className="mt-6 border-y border-border/60 py-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                          {priceDisplay}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          / user / month
                        </span>
                      </div>
                      <div className="mt-1.5 text-xs text-muted-foreground font-medium">
                        {isAnnual ? "Billed annually" : "Billed monthly"} — Cancel anytime
                      </div>
                    </div>

                    {/* Feature List */}
                    <div className="mt-6 space-y-3.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Included Features:
                      </div>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                          <div className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                            plan.featured ? "bg-brand text-brand-foreground" : "bg-emerald-500/15 text-emerald-500"
                          }`}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className={i === 0 && plan.id !== "pro" ? "font-semibold text-foreground" : "text-muted-foreground"}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA Action */}
                  <div className="mt-10 pt-4">
                    <Link
                      to={plan.btnLink}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-extrabold transition-all duration-300 ${
                        plan.featured
                          ? "bg-primary text-primary-foreground shadow-xl hover:opacity-90 hover:scale-[1.02]"
                          : "bg-foreground text-background dark:bg-white dark:text-black hover:opacity-90"
                      }`}
                    >
                      <span>{plan.btnText}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Interactive ROI Savings Calculator Component */}
        <Reveal delay={250} className="mt-24">
          <div className="glass shadow-glass rounded-[2.5rem] p-6 sm:p-10 border border-brand/20 bg-card/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Sliders & Form */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-extrabold text-emerald-500 mb-3">
                    <Calculator size={14} />
                    <span>Firm Savings & ROI Calculator</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Calculate Your Team's Time & Financial Return
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Estimate how much billable engineering time and project revenue TARV saves your consulting firm.
                  </p>
                </div>

                {/* Slider 1: Team Size */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span>Number of MEP Engineers on Team:</span>
                    <span className="font-mono text-base font-extrabold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-xl">
                      {teamSize} Engineers
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Slider 2: Average Billing Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span>Average Billing Rate ($ / hour):</span>
                    <span className="font-mono text-base font-extrabold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-xl">
                      ${hourlyRate} / hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Slider 3: Manual Sizing Hours / Week */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span>Hours Spent Manual Sizing / Engineer / Week:</span>
                    <span className="font-mono text-base font-extrabold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-xl">
                      {hoursPerWeek} hrs / week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="25"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Right Column: ROI Output Box */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-zinc-950 p-6 sm:p-8 border border-white/10 text-white shadow-2xl flex flex-col justify-between space-y-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Estimated Firm Productivity Return
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-zinc-400">Billable Hours Saved / Month</div>
                      <div className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-400">
                        {Math.round(hoursSavedPerWeek * 4.33)} hrs / mo
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="text-xs text-zinc-400">Estimated Annual Revenue Gain</div>
                      <div className="font-display text-3xl sm:text-5xl font-black text-white">
                        ${annualSavingsDollars.toLocaleString()} <span className="text-xs font-medium text-zinc-400">/ yr</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-zinc-300">
                      <span>Estimated Net ROI:</span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">
                        +{Math.round((annualSavingsDollars / Math.max(1, estimatedCostMonthly * 12)) * 100)}% ROI
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/access"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-zinc-950 transition hover:bg-emerald-400 shadow-xl"
                  >
                    <span>Claim Your Team's Productivity ROI</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detailed Side-by-Side Feature Matrix */}
        <Reveal delay={300} className="mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Detailed Feature Comparison Matrix
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              Compare capabilities, BIM connectivity, security governance, and code compliance standards across plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-card/60 backdrop-blur-xl shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border/80 bg-muted/40">
                  <th className="p-5 font-bold text-foreground w-2/5">Capabilities & Standards</th>
                  <th className="p-5 font-bold text-foreground text-center">Professional</th>
                  <th className="p-5 font-bold text-brand text-center bg-brand/5">Engineering Team</th>
                  <th className="p-5 font-bold text-foreground text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {MATRIX.map((cat, ci) => (
                  <>
                    <tr key={`cat-${ci}`} className="bg-muted/20">
                      <td colSpan={4} className="px-5 py-3 font-extrabold text-xs uppercase tracking-wider text-muted-foreground">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((row, ri) => (
                      <tr key={`row-${ri}`} className="hover:bg-accent/30 transition-colors">
                        <td className="p-5 font-medium text-foreground">{row.name}</td>
                        <td className="p-5 text-center text-muted-foreground">{row.pro}</td>
                        <td className="p-5 text-center font-bold text-brand bg-brand/5">{row.team}</td>
                        <td className="p-5 text-center text-foreground font-semibold">{row.ent}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Global Compliance & Trust Badges Section */}
        <Reveal delay={350} className="mt-28 text-center">
          <div className="eyebrow">GLOBAL CODE INTEGRITY</div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Compliant with Every Global Building Authority
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            Whether your firm designs high-rises in Dubai, commercial complexes in London, or industrial plants in Texas, TARV calculation engines are built to strict international codes.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {["ASHRAE 62.1 & 90.1 (US)", "NEC 2023 / NFPA (US)", "IPC & UPC Plumbing Code", "IEC 60364 (Europe)", "DEWA & DCL (Dubai, UAE)", "Saudi Building Code (SBC)", "CIBSE Guides (UK)", "AS/NZS 3000 (Australia)"].map((code) => (
              <div key={code} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-4 py-2.5 text-xs font-bold text-foreground shadow-sm">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{code}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Frequently Asked Questions */}
        <Reveal delay={400} className="mt-28 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Frequently Asked Licensing Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about TARV pricing, enterprise procurement, and team billing.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 border border-border bg-card/50">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2.5">
                  <QuestionIcon size={18} className="text-brand shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
