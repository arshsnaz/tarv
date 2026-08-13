import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="eyebrow inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand" />
            ENTERPRISE DATA GOVERNANCE
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Effective Date: January 1, 2026 · TARV Engineering
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-12 border border-brand/20 bg-brand/5 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="grid size-10 place-items-center rounded-2xl bg-brand text-brand-foreground shrink-0 mt-1">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Zero AI Training on Private Models</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                TARV guarantees that your proprietary Revit models, CAD files, engineering calculations, and firm schedules are strictly isolated and <strong className="text-foreground">never used to train public or shared AI models</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p>
              When engineering firms use TARV, we collect information required to deliver high-precision MEP calculations and cloud BIM synchronization:
            </p>
            <ul className="mt-3 space-y-2 pl-5 list-disc">
              <li><strong>Account Credentials:</strong> Name, work email address, company name, PE license tier, and SSO authentication tokens.</li>
              <li><strong>BIM & Project Metadata:</strong> Revit model parameters, duct/pipe sizing constraints, spatial geometry metadata, and equipment schedule tags uploaded for calculation processing.</li>
              <li><strong>System Telemetry:</strong> Anonymized performance logs, calculation execution speeds, and error diagnostics to optimize solver latency.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">2. How We Protect Your Engineering Data</h2>
            <p>
              We implement industry-leading technical and organizational security controls designed for mission-critical engineering infrastructure:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="glass-subtle p-4 rounded-2xl border border-white/10">
                <CheckCircle2 size={18} className="text-brand mb-2" />
                <h4 className="font-bold text-foreground text-sm">256-Bit Encryption</h4>
                <p className="text-xs text-muted-foreground mt-1">Data encrypted at rest via AES-256 and in transit using TLS 1.3 protocol.</p>
              </div>
              <div className="glass-subtle p-4 rounded-2xl border border-white/10">
                <CheckCircle2 size={18} className="text-brand mb-2" />
                <h4 className="font-bold text-foreground text-sm">Isolated Tenant Environments</h4>
                <p className="text-xs text-muted-foreground mt-1">Each enterprise firm operates in a logically segregated database workspace.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">3. Data Sharing & Third Parties</h2>
            <p>
              TARV does not sell, rent, or monetize your engineering project data to any third party. Data is disclosed only under strict necessity:
            </p>
            <ul className="mt-3 space-y-2 pl-5 list-disc">
              <li>To compliant cloud infrastructure providers (e.g., AWS / Vercel / Cloudflare) bound by enterprise DPAs.</li>
              <li>To comply with binding legal obligations or court orders.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">4. Compliance & Contact</h2>
            <p>
              If you have any questions regarding TARV's data privacy practices or wish to submit a data deletion request under GDPR/CCPA, please contact our Data Protection Officer:
            </p>
            <div className="mt-4 p-5 glass rounded-2xl border border-border">
              <p className="font-bold text-foreground">TARV Engineering — Privacy Office</p>
              <p className="text-sm text-muted-foreground mt-1">Solapur, Maharashtra, India</p>
              <p className="text-sm text-brand mt-1 font-mono">privacy@tarv.ai</p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
