import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { FileCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/dpa")({
  head: () => ({
    meta: [
      { title: "Data Processing Addendum (DPA) | TARV Engineering" },
      {
        name: "description",
        content:
          "TARV Data Processing Addendum (DPA). Review GDPR Standard Contractual Clauses, data processor commitments, and sub-processor terms.",
      },
    ],
  }),
  component: DpaPage,
});

function DpaPage() {
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
              <FileCheck size={14} />
              <span>GDPR & ENTERPRISE COMPLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              Data Processing Addendum
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono">
              Forms part of the Master SaaS Agreement between TARV Engineering and enterprise subscribers.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-8 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">1. Scope & Definitions</h2>
              <p>
                This Data Processing Addendum ("DPA") applies to the processing of personal data and confidential BIM project parameters in connection with TARV's AI-powered MEP automation services.
              </p>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">2. Processing Instructions</h2>
              <p>
                TARV processes customer data solely in accordance with documented instructions from the customer, including calculation execution, schedule population, and model export.
              </p>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">3. Authorized Sub-Processors</h2>
              <p>
                TARV maintains an up-to-date list of authorized sub-processors (AWS, Cloudflare, Supabase, Stripe, and Resend) subject to strict data protection obligations under GDPR Article 28.
              </p>
              <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                <p className="font-extrabold text-foreground text-xs">Sub-Processor Compliance Inquiries</p>
                <p className="text-[11px] text-muted-foreground">Contact our Data Governance Team: <a href="mailto:admin@tarv.ai" className="text-cyan-500 font-mono font-bold">admin@tarv.ai</a></p>
              </div>
            </section>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
