import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { ShieldCheck, Lock, Cpu, Server, Key, FileCheck, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Compliance | TARV — Enterprise MEP Engineering Software" },
      {
        name: "description",
        content:
          "TARV Enterprise Security Architecture. 256-bit AES encryption, ISO 27001 data governance, SAML/SSO authentication, and ASHRAE code verification.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="eyebrow inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand" />
            ENTERPRISE-GRADE PROTECTION
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            Security & Compliance
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Architected to safeguard confidential building designs, government BIM models, and enterprise engineering workflows.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Lock,
              title: "End-to-End Encryption",
              body: "All BIM models, drawing uploads, and calculation outputs are encrypted in transit via TLS 1.3 and at rest using AES-256 with key rotation.",
            },
            {
              icon: Key,
              title: "SAML 2.0 & Enterprise SSO",
              body: "Integrate seamlessly with Okta, Azure AD / Entra ID, and Google Workspace with fine-grained Role-Based Access Control (RBAC).",
            },
            {
              icon: Server,
              title: "Isolated Tenant Data Rooms",
              body: "Project databases are logically separated per enterprise organization, preventing cross-tenant data leakage or model exposure.",
            },
            {
              icon: FileCheck,
              title: "ASHRAE & IPC Code Audits",
              body: "Every calculation output includes a cryptographic hash and mathematical equation audit trail for PE compliance verification.",
            },
          ].map((sec) => (
            <div key={sec.title} className="glass p-7 rounded-3xl border border-white/10 dark:border-white/10">
              <div className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand mb-4">
                <sec.icon size={22} />
              </div>
              <h3 className="text-xl font-bold mb-2">{sec.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Security FAQ */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-border">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Security Infrastructure FAQ</h2>
          <div className="space-y-6 text-sm md:text-base text-muted-foreground">
            <div>
              <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand" /> Where are TARV servers hosted?
              </h4>
              <p className="pl-6">TARV operates on ISO 27001 and SOC 2 Type II certified global cloud infrastructure (AWS & Cloudflare), offering regional data residency options in North America, Europe, Asia, and the Middle East.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand" /> Are our Revit models used to train AI models?
              </h4>
              <p className="pl-6">No. Under no circumstances are customer BIM models, DWGs, or engineering parameter files used to train public or shared machine learning models.</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
