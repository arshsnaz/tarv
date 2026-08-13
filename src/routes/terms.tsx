import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { FileText, ShieldAlert, Award, Scale } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="eyebrow inline-flex items-center gap-2">
            <Scale size={16} className="text-brand" />
            LEGAL AGREEMENT & SAAS TERMS
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            Terms of Service
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Effective Date: January 1, 2026 · TARV Engineering
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the TARV platform, web applications, API solvers, or Revit plugins, your engineering firm agrees to be bound by these Terms of Service. TARV provides AI-powered mechanical, electrical, and plumbing (MEP) design automation software.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">2. Engineering Responsibility & PE Review</h2>
            <div className="glass p-6 rounded-3xl border border-brand/20 bg-brand/5 mb-4">
              <div className="flex items-start gap-3">
                <ShieldAlert size={20} className="text-brand shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Licensed Professional Engineer Responsibility:</strong> TARV's AI engine acts as an advanced calculation co-pilot. All automated load calculations, equipment sizing, and single-line diagrams must be reviewed, verified, and signed off by a licensed Professional Engineer (PE / CEng) prior to construction execution.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">3. Service Level Agreement (SLA) & Uptime</h2>
            <p>
              TARV guarantees a <strong>99.9% uptime</strong> for enterprise tier subscribers. Calculation solver latency SLAs are backed by automatic service credits if solver availability falls below guaranteed thresholds.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">4. Intellectual Property & BIM Assets</h2>
            <p>
              Your firm retains 100% ownership of all uploaded BIM models, customized shared parameter files, title block templates, and final generated output schedules. TARV retains ownership of its underlying physics solver algorithms, AI models, and user interface.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, with jurisdiction in Dubai, UAE.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
