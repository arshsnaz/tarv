import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Workflow, Mail, Building2, MapPin, Globe, Users, Laptop, Lock, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { submitAccessRequest } from "@/lib/access-request";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "Get Access — Official Online MEP Calculator & AI MEP Design Tools | TARV" },
      {
        name: "description",
        content:
          "Request private beta access to TARV — the #1 online MEP calculator & design software. Automate HVAC heat load calculations, electrical voltage drop, duct sizing, and BIM schedules.",
      },
      {
        name: "keywords",
        content:
          "MEP calculator, MEP calculator online, MEP engineering calculator, MEP tools online, MEP design tools, MEP calculation software, online engineering calculator MEP, HVAC electrical plumbing calculator",
      },
      { property: "og:title", content: "Get Access — Official Online MEP Calculator & AI MEP Design Tools | TARV" },
      { property: "og:description", content: "Request private access to TARV AI MEP Calculation Software & Design Automation Suite." },
      { property: "og:url", content: "https://tarvofficial.vercel.app/access" },
      { property: "og:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Request Access — TARV AI MEP Calculation Software" },
      { name: "twitter:description", content: "Official Online MEP Calculator & Engineering Suite for HVAC, Electrical & Plumbing Design." },
      { name: "twitter:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/access" }],
  }),
  component: AccessPage,
});

const countries = [
  "United Arab Emirates", "United States", "United Kingdom", "Germany", "Sweden",
  "Norway", "Denmark", "Finland", "Netherlands", "Saudi Arabia", "Qatar", "India", "Other",
];

const companySizes = ["1–10 Engineers", "11–50 Engineers", "51–200 Engineers", "201–500 Engineers", "500+ Enterprise"];

const systems = [
  "Mechanical (HVAC & Airflow)",
  "Electrical & Power Distribution",
  "Plumbing & Hydraulics",
  "Full MEP Multi-Discipline Suite",
];

const highlights = [
  {
    title: "Automated Physics Sizing Engines",
    desc: "Instant cooling load, static pressure, and voltage drop sizing built on real ASHRAE 62.1/90.1 & NEC 2023 equations.",
    icon: Zap,
  },
  {
    title: "Live 2-Way Revit BIM Parameter Sync",
    desc: "Calculated airflow, pipe sizing, and breaker duties push back to Revit element parameters in < 2 seconds.",
    icon: Workflow,
  },
  {
    title: "5-Workstation PC Hardware Binding",
    desc: "Deploy commercial licenses across up to 5 engineer PCs simultaneously with 14-day offline field grace.",
    icon: Laptop,
  },
  {
    title: "Bank-Grade Isolated Tenant Security",
    desc: "Your engineering project files stay encrypted in isolated tenant workspaces with enterprise AES-256 standards.",
    icon: ShieldCheck,
  },
];

function AccessPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    companySize: "",
    system: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitAccessRequest({ data: form });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="flex-1 pt-32 pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left 6 Cols: Premium Value Proposition & Trust */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles size={14} className="animate-pulse" />
                <span>OFFICIAL ENTERPRISE PRIVATE BETA ACCESS</span>
              </div>

              <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                Accelerate your <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  MEP Workflows by 10x
                </span>
              </h1>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
                Get early access to TARV's AI-native engineering suite. Built for engineering consultants, contractors, and BIM managers who demand physics-grade accuracy with instant 2-way BIM parameter sync.
              </p>
            </Reveal>

            {/* Feature Highlights Grid */}
            <Reveal delay={100}>
              <div className="space-y-4 border-t border-border pt-8">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.title} className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/20 border border-border hover:border-cyan-500/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 shrink-0 flex items-center justify-center font-bold">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-foreground text-sm">{h.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Trust Metrics Bar */}
            <Reveal delay={150}>
              <div className="p-6 rounded-3xl border border-border bg-card shadow-lg flex items-center justify-between gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-foreground font-mono">50,000+</div>
                  <div className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mt-0.5">Calculations Run</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-500 font-mono">99.4%</div>
                  <div className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mt-0.5">ASHRAE Accuracy</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-500 font-mono">&lt; 2 sec</div>
                  <div className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mt-0.5">Revit BIM Sync</div>
                </div>
              </div>
            </Reveal>

            {/* Direct Contact Card */}
            <Reveal delay={200}>
              <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-md">
                <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Building2 size={14} className="text-cyan-500 shrink-0" /> Need Immediate Onboarding or Direct Sales?
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                  <a href="mailto:admin@tarv.ai" className="flex items-center gap-2 font-mono text-cyan-500 font-extrabold hover:underline">
                    <Mail size={14} /> admin@tarv.ai
                  </a>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <MapPin size={13} className="text-cyan-500 shrink-0" /> API World Tower 403, Dubai, UAE
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right 6 Cols: Premium High-End Glass Request Form */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-border/80 dark:border-white/15 bg-card/95 dark:bg-slate-900/95 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />
              
              <div className="relative z-10">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 size={36} />
                    </div>
                    <h2 className="text-2xl font-black text-foreground">Access Request Received!</h2>
                    <p className="max-w-md text-xs text-muted-foreground leading-relaxed">
                      Thank you, <span className="font-bold text-foreground">{form.name}</span>. Our enterprise onboarding engineering team is reviewing your application for <span className="font-bold text-foreground">{form.company || "your firm"}</span>.
                    </p>
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border w-full text-xs text-muted-foreground space-y-1 text-left">
                      <div className="font-bold text-foreground">What happens next?</div>
                      <div>You will receive your private beta license key and Revit plugin download link via email within 24 hours.</div>
                    </div>
                    <a
                      href="mailto:admin@tarv.ai"
                      className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:underline"
                    >
                      <Mail size={14} /> Contact Direct Onboarding (<span className="font-mono">admin@tarv.ai</span>)
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-border pb-4 mb-2">
                      <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Apply for Enterprise Beta</h3>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Fill in your firm details to receive instant access credentials.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-bold text-foreground">Full Name <span className="text-cyan-500">*</span></Label>
                        <Input
                          id="name"
                          required
                          placeholder="e.g. Sarah Al-Maktoum"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold text-foreground">Work Email <span className="text-cyan-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="sarah@consultant.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs font-bold text-foreground">Firm / Company Name <span className="text-cyan-500">*</span></Label>
                        <Input
                          id="company"
                          required
                          placeholder="e.g. ARUP / AECOM / Consultancy"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="country" className="text-xs font-bold text-foreground">Country / Region <span className="text-cyan-500">*</span></Label>
                        <Select value={form.country} onValueChange={(val) => update("country", val)}>
                          <SelectTrigger id="country" className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c} className="text-xs">
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="companySize" className="text-xs font-bold text-foreground">Team Size</Label>
                        <Select value={form.companySize} onValueChange={(val) => update("companySize", val)}>
                          <SelectTrigger id="companySize" className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl">
                            <SelectValue placeholder="Number of Engineers" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="system" className="text-xs font-bold text-foreground">Primary Discipline</Label>
                        <Select value={form.system} onValueChange={(val) => update("system", val)}>
                          <SelectTrigger id="system" className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl">
                            <SelectValue placeholder="Select Discipline" />
                          </SelectTrigger>
                          <SelectContent>
                            {systems.map((sys) => (
                              <SelectItem key={sys} value={sys} className="text-xs">
                                {sys}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-bold text-foreground">Primary Design Challenges / Software Requirements</Label>
                      <Textarea
                        id="message"
                        rows={3}
                        placeholder="Tell us about your Revit BIM workflow or calculation challenges..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className="bg-muted/30 border-border focus:border-cyan-500 text-foreground text-xs rounded-xl"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-destructive font-semibold">{errorMsg}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Access Request</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}