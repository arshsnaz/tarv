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

const quotes = [
  {
    quote:
      "TARV cut our schedule production from days to minutes. It feels like an extra senior engineer on every project.",
    name: "Maya Chen",
    role: "Principal MEP Engineer, Arup",
  },
  {
    quote:
      "The AI catches sizing errors before they reach review. Our QA cycle is faster and our designs are tighter.",
    name: "Daniel Okafor",
    role: "Director of Engineering, AECOM",
  },
  {
    quote: "Finally a tool that feels designed — not assembled. Our team adopted it in a week.",
    name: "Sofia Lindqvist",
    role: "Associate, WSP",
  },
];

export function AiEngineer() {
  return (
    <section id="ai" className="panel-gradient relative py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
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

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 px-6 md:grid-cols-3">
        {recs.map((r, i) => (
          <Reveal key={r.title} delay={i * 110}>
            <div className="glass h-full rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
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
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium transition-all hover:gap-2"
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

export function Testimonials() {
  return (
    <section className="py-28 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <div className="eyebrow">Engineers</div>
          <h2 className="text-balance mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Loved by the people who build the world.
          </h2>
        </Reveal>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 110}>
            <figure className="glass-subtle flex h-full flex-col rounded-3xl p-7">
              <blockquote className="flex-1 text-lg leading-relaxed">“{q.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-brand-soft to-brand" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
