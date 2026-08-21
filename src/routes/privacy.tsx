import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Sparkles, Building2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | TARV — MEP Engineering Software" },
      {
        name: "description",
        content:
          "TARV's Privacy Policy. Learn how we protect enterprise BIM models, project data, and personal information with AES-256 encryption and ISO 27001 standards.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <ShieldCheck size={14} />
              <span>ENTERPRISE DATA GOVERNANCE & PRIVACY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono">
              Effective Date: January 1, 2026 · TARV Engineering (Dubai, UAE)
            </p>
          </div>
        </Reveal>

        {/* Highlight Banner */}
        <Reveal>
          <div className="rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-card shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0 flex items-center justify-center font-bold mt-1">
                <Lock size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-foreground">Zero AI Training on Private Models</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  TARV guarantees that your proprietary Revit models, CAD files, engineering calculations, and firm schedules are strictly isolated and <strong className="text-foreground">never used to train public or shared AI models</strong>.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content Body */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-8 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">1. Information We Collect</h2>
              <p>
                When engineering firms use TARV, we collect information required to deliver high-precision MEP calculations and cloud BIM synchronization:
              </p>
              <ul className="space-y-2 pl-5 list-disc text-muted-foreground">
                <li><strong className="text-foreground">Account Credentials:</strong> Name, work email address, company name, PE license tier, and SSO authentication tokens.</li>
                <li><strong className="text-foreground">BIM & Project Metadata:</strong> Revit model parameters, duct/pipe sizing constraints, spatial geometry metadata, and equipment schedule tags uploaded for calculation processing.</li>
                <li><strong className="text-foreground">System Telemetry:</strong> Anonymized performance logs, calculation execution speeds, and error diagnostics to optimize solver latency.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">2. How We Protect Your Engineering Data</h2>
              <p>
                We implement industry-leading technical and organizational security controls designed for mission-critical engineering infrastructure:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <CheckCircle2 size={18} className="text-cyan-500 mb-1" />
                  <h4 className="font-extrabold text-foreground text-xs">256-Bit AES Encryption</h4>
                  <p className="text-[11px] text-muted-foreground">Data encrypted at rest via AES-256 and in transit using TLS 1.3 protocol.</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <CheckCircle2 size={18} className="text-cyan-500 mb-1" />
                  <h4 className="font-extrabold text-foreground text-xs">Isolated Tenant Environments</h4>
                  <p className="text-[11px] text-muted-foreground">Each enterprise firm operates in a logically segregated database workspace.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">3. Data Sharing & Third Parties</h2>
              <p>
                TARV does not sell, rent, or monetize your engineering project data to any third party. Data is disclosed only under strict necessity:
              </p>
              <ul className="space-y-2 pl-5 list-disc text-muted-foreground">
                <li>To compliant cloud infrastructure providers (AWS / Cloudflare / Vercel) bound by enterprise DPAs.</li>
                <li>To comply with binding legal obligations or court orders.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">4. Compliance & Contact</h2>
              <p>
                If you have any questions regarding TARV's data privacy practices or wish to submit a data deletion request under GDPR/CCPA, please contact our Privacy Officer:
              </p>
              <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-1">
                <p className="font-extrabold text-foreground">TARV Engineering — Privacy Office</p>
                <p className="text-xs text-muted-foreground">API World Tower 403, Sheikh Zayed Rd, Dubai, UAE</p>
                <p className="text-xs text-cyan-500 font-mono font-bold pt-1">admin@tarv.ai</p>
              </div>
            </section>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
