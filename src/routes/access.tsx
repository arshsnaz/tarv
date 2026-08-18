import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Workflow, Mail, Building2, MapPin } from "lucide-react";
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
    title: "Automated Physics Calculations",
    desc: "Instant cooling load, static pressure, and voltage drop sizing built on real ASHRAE 62.1/90.1 & NEC formulas.",
    icon: Zap,
  },
  {
    title: "Live 2-Way Revit Parameter Sync",
    desc: "Calculated airflow, pipe sizing, and breaker duties push back to Revit element parameters in < 2 seconds.",
    icon: Workflow,
  },
  {
    title: "Bank-Grade Security & Isolated Tenants",
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 py-28 md:py-36 px-4 md:px-6 relative overflow-hidden">
        {/* Subtle ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 dark:bg-brand/15 blur-[160px]" />

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Premium Value Proposition & Trust */}
          <div className="space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 dark:bg-brand/20 px-4 py-1.5 text-xs font-black text-brand dark:text-cyan-300 backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse" />
                <span>EXCLUSIVE ENTERPRISE PRIVATE BETA</span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Accelerate your <br className="hidden sm:inline" />
                <span className="text-brand">MEP workflows by 10x.</span>
              </h1>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground font-medium">
                Get early access to TARV's AI-native engineering suite. Built for engineering consultants, contractors, and BIM managers who demand physics-grade accuracy with instant 2-way BIM parameter sync.
              </p>
            </Reveal>

            {/* Feature Highlights Grid */}
            <Reveal delay={100}>
              <div className="space-y-5 border-t border-border/80 dark:border-white/10 pt-8">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.title} className="flex items-start gap-4">
                      <div className="grid size-10 place-items-center rounded-xl bg-brand/10 dark:bg-brand/20 border border-brand/20 text-brand dark:text-cyan-300 shrink-0 mt-0.5 shadow-sm">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-foreground text-base">{h.title}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Trust Metrics Bar */}
            <Reveal delay={150}>
              <div className="glass p-6 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-slate-900/80 flex items-center justify-between gap-4 text-center shadow-lg">
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-foreground font-display">50,000+</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Calculations Run</div>
                </div>
                <div className="h-8 w-px bg-border/80 dark:bg-white/10" />
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-brand font-display">99.4%</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">ASHRAE Accuracy</div>
                </div>
                <div className="h-8 w-px bg-border/80 dark:bg-white/10" />
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-emerald-500 font-display">&lt; 2 sec</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Revit BIM Sync</div>
                </div>
              </div>
            </Reveal>

            {/* Direct Contact Card */}
            <Reveal delay={200}>
              <div className="p-6 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-slate-900/80 space-y-3 shadow-md">
                <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Building2 size={14} className="text-brand shrink-0" /> Need Immediate Onboarding or Direct Sales?
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-sm">
                  <a href="mailto:admin@tarv.ai" className="flex items-center gap-2 font-mono text-brand font-extrabold hover:underline">
                    <Mail size={15} /> admin@tarv.ai
                  </a>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <MapPin size={13} className="text-brand shrink-0" /> API World Tower 403, Dubai, UAE
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Premium High-End Glass Request Form */}
          <Reveal delay={100}>
            <div className="glass shadow-2xl rounded-[2.5rem] p-6 sm:p-10 border-2 border-border/80 dark:border-white/15 relative overflow-hidden bg-card/95 dark:bg-slate-900/95 backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />
              
              <div className="relative z-10">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
                      <CheckCircle2 size={36} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Access Request Received!</h2>
                    <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                      Thank you, <span className="font-bold text-foreground">{form.name}</span>. Our enterprise onboarding engineering team is reviewing your application for <span className="font-bold text-foreground">{form.company || "your firm"}</span>.
                    </p>
                    <div className="p-4 rounded-xl bg-card border border-border w-full text-xs text-muted-foreground space-y-1">
                      <div className="font-bold text-foreground">What happens next?</div>
                      <div>You will receive your private beta license key and Revit plugin download link via email within 24 hours.</div>
                    </div>
                    <a
                      href="mailto:admin@tarv.ai"
                      className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline"
                    >
                      <Mail size={14} /> Contact Direct Onboarding (<span className="font-mono">admin@tarv.ai</span>)
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-border/80 dark:border-white/10 pb-4 mb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Apply for Enterprise Beta</h3>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">Fill in your firm details to receive instant access credentials.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-extrabold text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          placeholder="e.g. Sarah Al-Maktoum"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 focus:border-brand text-foreground placeholder:text-muted-foreground/70 dark:placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-extrabold text-foreground">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="sarah@consultant.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 focus:border-brand text-foreground placeholder:text-muted-foreground/70 dark:placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-xs font-extrabold text-foreground">Company / Firm Name *</Label>
                      <Input
                        id="company"
                        required
                        placeholder="e.g. Apex Engineering Consultants"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 focus:border-brand text-foreground placeholder:text-muted-foreground/70 dark:placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-extrabold text-foreground">Country</Label>
                        <Select value={form.country} onValueChange={(v) => update("country", v)}>
                          <SelectTrigger className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 text-foreground"><SelectValue placeholder="Country" /></SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-extrabold text-foreground">Team Size</Label>
                        <Select value={form.companySize} onValueChange={(v) => update("companySize", v)}>
                          <SelectTrigger className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 text-foreground"><SelectValue placeholder="Size" /></SelectTrigger>
                          <SelectContent>
                            {companySizes.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-extrabold text-foreground">Primary Focus</Label>
                        <Select value={form.system} onValueChange={(v) => update("system", v)}>
                          <SelectTrigger className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 text-foreground"><SelectValue placeholder="Focus" /></SelectTrigger>
                          <SelectContent>
                            {systems.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-extrabold text-foreground">Workflow Details (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your active BIM projects, Revit workflow bottlenecks, or specific calculations you wish to automate..."
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className="bg-background/90 dark:bg-slate-950/80 border-border/80 dark:border-white/15 focus:border-brand text-foreground placeholder:text-muted-foreground/70 dark:placeholder:text-slate-400 resize-none text-xs"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">{errorMsg}</p>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full rounded-full py-4 text-sm font-black bg-brand text-brand-foreground shadow-xl shadow-brand/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer" 
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Registering Application...
                        </>
                      ) : (
                        <>
                          <span>Submit Access Request</span> <ArrowRight size={18} />
                        </>
                      )}
                    </Button>

                    <div className="text-center pt-2">
                      <p className="text-[11px] text-muted-foreground font-medium">
                        🔒 Enterprise SLA & AES-256 Tenant Data Isolation. Zero spam.
                      </p>
                    </div>
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