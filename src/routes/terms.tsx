import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Scale, ShieldAlert, Award, FileText, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | TARV — MEP Engineering Software" },
      {
        name: "description",
        content:
          "TARV Terms of Service. Review SaaS agreement, engineering calculation audit responsibilities, SLA guarantees, and enterprise licensing terms.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
              <Scale size={14} />
              <span>LEGAL AGREEMENT & SAAS TERMS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-mono">
              Effective Date: January 1, 2026 · TARV Engineering (Dubai, UAE)
            </p>
          </div>
        </Reveal>

        {/* Content Body */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-8 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing or using the TARV platform, web applications, API solvers, or Revit plugins, your engineering firm agrees to be bound by these Terms of Service. TARV provides AI-powered mechanical, electrical, and plumbing (MEP) design automation software.
              </p>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">2. Engineering Responsibility & PE Review</h2>
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-500 font-extrabold text-xs uppercase tracking-wider">
                  <ShieldAlert size={16} />
                  <span>Licensed Professional Engineer Responsibility</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  TARV's AI engine acts as an advanced calculation co-pilot. All automated load calculations, equipment sizing, and single-line diagrams must be reviewed, verified, and signed off by a licensed Professional Engineer (PE / CEng) prior to construction execution.
                </p>
              </div>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">3. Service Level Agreement (SLA) & Uptime</h2>
              <p>
                TARV guarantees a <strong className="text-foreground">99.9% uptime SLA</strong> for enterprise tier subscribers. Calculation solver latency SLAs are backed by automatic service credits if solver availability falls below guaranteed thresholds.
              </p>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">4. Intellectual Property & BIM Assets</h2>
              <p>
                Your firm retains 100% ownership of all uploaded BIM models, customized shared parameter files, title block templates, and final generated output schedules. TARV retains ownership of its underlying physics solver algorithms, AI models, and user interface.
              </p>
            </section>

            <section className="space-y-3 border-t border-border pt-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">5. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, with primary jurisdiction in Dubai, UAE.
              </p>
            </section>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
