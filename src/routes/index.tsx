import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { Platform, TrustedBy } from "@/components/site/platform";
import { Hvac, Schedules } from "@/components/site/hvac";
import { AiEngineer } from "@/components/site/ai-engineer";
import { CalculatorSuite } from "@/components/site/calculator-suite";
import { Company, Faq } from "@/components/site/company";
import { Cta, SiteFooter } from "@/components/site/cta";

const title = "TARV — AI-Powered MEP Design Automation";
const description =
  "TARV automates mechanical, electrical, and plumbing design: HVAC sizing, airflow calculations, equipment schedules, and AI optimization. Built in Stockholm.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TARV",
          description,
          foundingDate: "2024",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Stockholm",
            addressCountry: "SE",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden overflow-clip max-w-[100vw]">
      <SiteNav />
      <main>
        <Hero />
        <TrustedBy />
        <Platform />
        <Hvac />
        <Schedules />
        <AiEngineer />
        <CalculatorSuite />
        <Company />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
