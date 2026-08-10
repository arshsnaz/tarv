import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";

const recs = [
  {
    delta: "−18%",
    title: "Reduce reheat energy",
    body: "Switch L4–L8 to dual-max VAV — saves 240 MWh/yr.",
  },
  {
    delta: "$58k",
    title: "Right-size chiller plant",
    body: "CH-02 oversized by 22% under updated occupancy.",
  },
  {
    delta: "+12%",
    title: "Improve IAQ",
    body: "Add DCV to conference zones to meet ASHRAE 62.1 with less OA.",
  },
];



export function AiEngineer() {
  return (
    <section id="ai" className="panel-gradient relative py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <Reveal>
          <div className="eyebrow">AI engineer</div>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Recommendations, not guesswork.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            TARV reads your model continuously and surfaces optimization, compliance, and cost moves
            — with the math to back them up.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 px-4 md:px-6 grid-cols-1 md:grid-cols-3">
        {recs.map((r, i) => (
          <Reveal key={r.title} delay={i * 110}>
            <div className="glass h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Sparkles size={16} />
                </div>
                <div className="font-display text-2xl font-bold tracking-tight text-brand">
                  {r.delta}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:gap-2"
              >
                Apply <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


