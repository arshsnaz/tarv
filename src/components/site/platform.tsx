import { Reveal } from "./reveal";

const firms = ["AECOM", "ARUP", "WSP", "JACOBS", "STANTEC", "MOTT MACDONALD"];

const metrics = [
  { label: "Total airflow", value: "48,200", unit: "CFM", delta: "+4.2% vs baseline", up: true },
  { label: "Cooling load", value: "612", unit: "tons", delta: "−6.1% vs baseline", up: false },
  { label: "Annual energy", value: "1.4M", unit: "kWh", delta: "−18% vs baseline", up: false },
];

const bars = [40, 51, 74, 54, 54, 32, 10, 21, 15, 43, 49, 57, 64, 63];

export function TrustedBy() {
  return (
    <section className="border-y border-border py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-10 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by engineers at world-class firms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {firms.map((f) => (
            <span key={f} className="font-display text-xl font-bold tracking-wider">
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Platform() {
  return (
    <section id="platform" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <div className="eyebrow">The platform</div>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            One canvas for every MEP decision.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Drafting, sizing, scheduling, and optimization — unified in a single interactive
            workspace.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="mx-auto mt-16 max-w-6xl px-6">
        <div className="glass shadow-glass rounded-3xl p-2">
          <div className="panel-gradient rounded-[20px] p-5 md:p-10">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {["System design", "Airflow", "Schedules", "AI insights"].map((t, i) => (
                <span
                  key={t}
                  className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs tracking-wider text-muted-foreground uppercase">
                    {m.label}
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-bold tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-sm text-muted-foreground">{m.unit}</span>
                  </div>
                  <div
                    className={`mt-1 font-mono text-xs ${m.up ? "text-brand" : "text-success"}`}
                  >
                    {m.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-6">
              <div className="shimmer-bg pointer-events-none absolute inset-0 opacity-40" />
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium">Floor analysis · Tower A</div>
                <div className="font-mono text-xs text-muted-foreground">live</div>
              </div>
              <div className="flex h-32 items-end gap-1.5">
                {bars.map((h, i) => (
                  <Reveal key={i} delay={i * 45} className="flex-1">
                    <div
                      className="rounded-md bg-gradient-to-t from-brand-soft to-brand"
                      style={{ height: `${h * 1.28}px` }}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
