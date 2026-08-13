import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { FileCheck, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow inline-flex items-center gap-2">
            <FileCheck size={16} className="text-brand" />
            GDPR & DATA COMPLIANCE
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            Data Processing Addendum
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            This Data Processing Addendum ("DPA") forms part of the Master SaaS Agreement between TARV Engineering and enterprise subscribers.
          </p>
        </div>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">1. Scope & Definitions</h2>
            <p>This DPA applies to the processing of personal data and confidential BIM project parameters in connection with TARV's AI-powered MEP automation services.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">2. Processing Instructions</h2>
            <p>TARV processes customer data solely in accordance with documented instructions from the customer, including calculation execution, schedule population, and model export.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">3. Sub-Processors</h2>
            <p>TARV maintains an up-to-date list of authorized sub-processors (cloud hosting, email notification, and payment gateways) subject to strict data protection obligations.</p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
