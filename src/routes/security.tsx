import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { ShieldCheck, Lock, Cpu, Server, Key, FileCheck, CheckCircle2, Sparkles, ShieldAlert, Award } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

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
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <ShieldCheck size={14} />
              <span>ENTERPRISE SECURITY & COMPLIANCE ARCHITECTURE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Bank-Grade Security & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Data Governance.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Architected to safeguard confidential building designs, government BIM models, and enterprise engineering workflows with zero-compromise encryption.
            </p>
          </div>
        </Reveal>

        {/* 4 Security Pillars Grid */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Lock,
                title: "End-to-End AES-256 Encryption",
                body: "All BIM models, drawing uploads, and calculation outputs are encrypted in transit via TLS 1.3 and at rest using AES-256 with key rotation.",
                color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
              },
              {
                icon: Key,
                title: "SAML 2.0 & Enterprise SSO",
                body: "Integrate seamlessly with Okta, Azure AD / Entra ID, and Google Workspace with fine-grained Role-Based Access Control (RBAC).",
                color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
              },
              {
                icon: Server,
                title: "Isolated Tenant Workspaces",
                body: "Project databases are logically separated per enterprise organization, preventing cross-tenant data leakage or model exposure.",
                color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
              },
              {
                icon: FileCheck,
                title: "ASHRAE & IPC Cryptographic Audits",
                body: "Every calculation output includes a cryptographic hash and mathematical equation audit trail for PE compliance verification.",
                color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
              },
            ].map((sec) => (
              <div key={sec.title} className="p-7 rounded-3xl border border-border bg-card shadow-lg space-y-3 hover:border-cyan-500/40 transition-all">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold border ${sec.color}`}>
                  <sec.icon size={20} />
                </div>
                <h3 className="text-base font-extrabold text-foreground">{sec.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{sec.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Security Infrastructure FAQ */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-card shadow-2xl space-y-6 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

            <h2 className="text-2xl font-extrabold text-foreground">Security Infrastructure FAQ</h2>
            <div className="space-y-6 text-xs sm:text-sm text-muted-foreground">
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Where are TARV calculation servers hosted?
                </h4>
                <p className="pl-6 leading-relaxed">
                  TARV operates on ISO 27001 and SOC 2 Type II certified global cloud infrastructure (AWS & Cloudflare), offering regional data residency options in North America, Europe, Asia, and the Middle East (Dubai).
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> Are our Revit BIM models used to train public AI models?
                </h4>
                <p className="pl-6 leading-relaxed">
                  <strong className="text-foreground">Strictly No.</strong> Under no circumstances are customer BIM models, DWGs, or engineering parameter files used to train public or shared machine learning models. Your project intellectual property remains strictly private.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
