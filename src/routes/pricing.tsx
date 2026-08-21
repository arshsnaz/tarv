import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, Fragment } from "react";
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
  HelpCircle as QuestionIcon,
  Flame,
  Wind,
  Droplets,
  Cpu,
  BadgeCheck,
  TrendingUp,
  Percent,
  Clock,
  ChevronRight
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
      { name: "SAML SSO / Okta / Azure AD", pro: "—", team: "Optional", ent: "Included" },
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

  // Interactive ROI Savings Calculator State
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(65); // $65/hr average engineer rate
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12); // 12 hours spent on manual MEP math

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const curr = CURRENCIES[currency];

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * curr.rate);
    if (currency === "AED") {
      return `${converted} AED`;
    }
    return `${curr.symbol}${converted}`;
  };

  // ROI Calculations
  const hoursSavedPerWeek = Math.round(hoursPerWeek * 0.85 * teamSize);
  const monthlySavingsDollars = Math.round(hoursSavedPerWeek * 4.33 * hourlyRate);
  const annualSavingsDollars = Math.round(monthlySavingsDollars * 12);
  const estimatedCostMonthly = teamSize * (isAnnual ? 99 : 129);
  const netAnnualRoi = Math.max(0, annualSavingsDollars - estimatedCostMonthly * 12);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-7xl mx-auto space-y-20">
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles size={14} />
              <span>Transparent Enterprise Licensing</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Predictable Pricing for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Global MEP Engineering Teams.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Equip your engineers with the world's most accurate AI MEP calculation software. 
              Zero hidden fees, transparent seats, and guaranteed ASHRAE/NEC compliance.
            </p>
          </Reveal>

          {/* Currency Selector & Annual Billing Toggle */}
          <Reveal delay={200} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-card/80 p-1.5 shadow-md">
              <span className="px-3 text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Globe size={13} className="text-cyan-500" />
                Currency:
              </span>
              {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setCurrency(k)}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    currency === k
                      ? "bg-cyan-500 text-slate-950 shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Annual / Monthly Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                  isAnnual ? "bg-cyan-500" : "bg-muted"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-slate-950 shadow-md transition-transform duration-300 ${
                    isAnnual ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                  Annual Billing
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                  Save 20%
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pricing Cards Grid */}
        <Reveal delay={240}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                    plan.featured
                      ? "border-2 border-cyan-500 bg-card shadow-2xl scale-102"
                      : "border border-border bg-card shadow-lg hover:border-cyan-500/40"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Sparkles size={12} />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      {!plan.featured && (
                        <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20 uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-2xl font-black text-foreground mt-2">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{plan.desc}</p>
                    </div>

                    {/* Price Header */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-foreground font-mono">
                        {formatPrice(price)}
                      </span>
                      <span className="text-xs text-muted-foreground font-bold">/ engineer / month</span>
                    </div>

                    {/* Feature Checkmarks */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">
                        Included Features & Limits:
                      </span>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                          <CheckCircle2 size={15} className="text-cyan-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href={plan.btnLink}
                      className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                        plan.featured
                          ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                          : "bg-slate-950 hover:bg-slate-900 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950"
                      }`}
                    >
                      <span>{plan.btnText}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive ROI Engineering Calculator */}
        <Reveal delay={280}>
          <div className="rounded-3xl border border-cyan-500/30 bg-card p-8 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase">
                  <TrendingUp size={14} />
                  <span>Interactive Firm ROI Savings Calculator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Calculate Your Firm's Expected Annual Time & Dollar Savings
                </h2>
                <p className="text-xs text-muted-foreground max-w-xl">
                  Adjust your team parameters to calculate hours saved on manual calculations and net firm return on investment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center shrink-0">
                <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Estimated Net Annual ROI</span>
                <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                  +${netAnnualRoi.toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Slider Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-border">
              {/* Slider 1: Team Size */}
              <div className="space-y-3 p-5 rounded-2xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Engineering Team Size:</span>
                  <span className="text-foreground font-mono text-base">{teamSize} Engineers</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Hourly Rate */}
              <div className="space-y-3 p-5 rounded-2xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Avg Engineer Hourly Rate:</span>
                  <span className="text-foreground font-mono text-base">${hourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={150}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: Hours Spent */}
              <div className="space-y-3 p-5 rounded-2xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Manual Math Hours / Week:</span>
                  <span className="text-foreground font-mono text-base">{hoursPerWeek} hrs / week</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Results Counter Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Hours Saved / Week</span>
                <div className="text-xl font-extrabold text-foreground font-mono">{hoursSavedPerWeek} Hours</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Monthly Billable Savings</span>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">${monthlySavingsDollars.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Annual Productivity Value</span>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">${annualSavingsDollars.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Efficiency Gain</span>
                <div className="text-xl font-extrabold text-cyan-500 font-mono">85% Faster Sizing</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detailed Feature Comparison Matrix Section */}
        <Reveal delay={320}>
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Detailed Feature Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Compare capabilities, BIM connectivity, security governance, and code compliance standards across plans.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/60 border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-4 px-6 w-2/5 font-extrabold text-foreground">Feature / Capability</th>
                      <th className="py-4 px-6">Professional</th>
                      <th className="py-4 px-6 text-cyan-600 dark:text-cyan-400 font-black">Engineering Team</th>
                      <th className="py-4 px-6">Enterprise Firm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MATRIX.map((group, gIdx) => (
                      <Fragment key={gIdx}>
                        <tr className="bg-muted/40 border-t border-border">
                          <td colSpan={4} className="py-3 px-6 font-black text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-muted/60">
                            {group.category}
                          </td>
                        </tr>
                        {group.items.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                            <td className="py-3.5 px-6 font-semibold text-foreground">{row.name}</td>
                            <td className="py-3.5 px-6 text-muted-foreground">{row.pro}</td>
                            <td className="py-3.5 px-6 font-bold text-foreground">{row.team}</td>
                            <td className="py-3.5 px-6 text-cyan-600 dark:text-cyan-400 font-bold">{row.ent}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Enterprise FAQs */}
        <Reveal delay={360}>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold text-foreground">Frequently Asked Questions</h2>
              <p className="text-xs text-muted-foreground">Answers to common pricing, licensing, and billing questions.</p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-card overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-foreground hover:bg-muted/30 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      size={16}
                      className={`text-muted-foreground transition-transform duration-200 ${
                        openFaq === idx ? "rotate-90 text-cyan-500" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/50 whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
