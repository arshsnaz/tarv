import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "./reveal";

export function Cta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="cta" className="px-6 py-28 md:py-32">
      <Reveal>
        <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-10 text-center md:p-20">
          <div className="halo pointer-events-none absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-7xl">
              Engineer what&apos;s next.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join the firms shaping tomorrow&apos;s built environment. Request access to TARV today.
            </p>
            <form
              className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@firm.com"
                aria-label="Work email"
                className="w-full rounded-full border border-border bg-card px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-ring sm:flex-1"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
              >
                Get access <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              {sent
                ? "Thanks — we'll be in touch shortly."
                : "Private beta · Onboarding select firms now"}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const footerCols = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "#platform" },
      { label: "Smart HVAC", href: "#hvac" },
      { label: "Schedules", href: "#schedules" },
      { label: "AI engineer", href: "#ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#company" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "#cta" },
      { label: "Contact", href: "mailto:hello@tarv.se" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#company" },
      { label: "DPA", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="TARV logo"
              className="size-7 rounded-md object-contain dark:invert"
            />
            <span className="font-display text-lg font-bold tracking-tight">TARV</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The AI-powered platform automating mechanical, electrical, and plumbing design
            workflows.
          </p>
          <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Dubai, United Arab Emirates
            </div>
            <a href="mailto:contact@tarv.ai" className="flex items-center gap-2 hover:text-foreground">
              <Mail size={14} /> contact@tarv.ai
            </a>
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="text-xs tracking-wider text-muted-foreground uppercase">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted-foreground transition hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} TARV Engineering AB · Founded in Dubai, United Arab Emirates · All rights reserved
      </div>
    </footer>
  );
}