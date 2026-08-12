import { Check } from "lucide-react";
import { Reveal } from "./reveal";

const hvacPoints = [
  "ASHRAE-compliant load sizing",
  "Automatic duct routing & static pressure",
  "Psychrometric & airflow simulation",
];

const calcRows = [
  ["Sensible heat gain", "412,880 BTU/h"],
  ["Latent heat gain", "78,300 BTU/h"],
  ["Outdoor air load", "92,450 BTU/h"],
  ["Diversity factor", "0.86"],
];

const scheduleRows = [
  ["AHU-01", "Air Handling Unit", "12,000 CFM", "Roof", "Active"],
  ["AHU-02", "Air Handling Unit", "8,400 CFM", "L14", "Active"],
  ["CH-01", "Chiller", "300 tons", "Plant", "Sized"],
  ["VAV-201", "VAV Terminal", "1,200 CFM", "L02", "Drafted"],
  ["FCU-308", "Fan Coil Unit", "650 CFM", "L03", "Sized"],
];

export function Hvac() {
  return (
    <section id="hvac" className="panel-gradient py-28 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <Reveal>
          <div className="eyebrow">Smart HVAC</div>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Calculations that think ahead.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Real-time load, duct, and airflow calculations powered by physics-based models —
            validated by AI against thousands of certified projects.
          </p>
          <ul className="mt-8 space-y-3">
            {hvacPoints.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check size={12} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm font-semibold">Load calculation</div>
              <div className="font-mono text-xs text-success">converged</div>
            </div>
            <dl className="divide-y divide-border">
              {calcRows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-mono">{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between py-3 text-sm font-semibold">
                <dt>Total cooling load</dt>
                <dd className="font-mono">184.2 tons</dd>
              </div>
            </dl>
            <div className="mt-5 rounded-2xl bg-primary p-4 text-xs leading-relaxed text-primary-foreground">
              TARV suggests downsizing AHU-2 from 20% to 15% turn — saves $42k CAPEX and 6% annual
              energy.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Schedules() {
  return (
    <section id="schedules" className="py-28 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="text-sm font-semibold">Equipment schedule · Project Aurora</div>
              <div className="font-mono text-xs text-muted-foreground">v12</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-surface-2">
                  <tr className="text-left tracking-wider text-muted-foreground uppercase">
                    {["Tag", "Type", "Capacity", "Level", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((r) => (
                    <tr key={r[0]} className="border-t border-border">
                      <td className="px-4 py-3 font-mono font-semibold">{r[0]}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                      <td className="px-4 py-3 font-mono">{r[2]}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r[3]}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                          <span className="size-1.5 rounded-full bg-success" />
                          {r[4]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="eyebrow">Schedules</div>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Equipment schedules, generated.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            From single-line diagrams to full equipment schedules in seconds. Sync directly with
            Revit, BIM 360, and your spec library.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {["Auto-tag", "Live sync", "Cost rollup", "Spec aware"].map((t) => (
              <div
                key={t}
                className="glass-subtle rounded-xl px-4 py-3 text-sm font-medium"
              >
                {t}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
