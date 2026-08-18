import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";
import { ARTICLES, Article } from "@/lib/resources-data";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Calculator,
  User,
  Sparkles,
  Layers,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/resources/$slug")({
  head: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    const title = article ? `${article.title} — TARV Engineering Hub` : "Article — TARV Resources";
    const desc = article ? article.summary : "TARV MEP Engineering Technical Article";
    const canonical = `https://tarvofficial.vercel.app/resources/${params.slug}`;
    const ogImage = article ? article.image : "https://tarvofficial.vercel.app/og-image.jpg";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: article?.tags.join(", ") || "MEP engineering, ASHRAE, NEC, IPC" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: canonical },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ArticleDetailPage,
});

function formatLatexFormula(raw: string): string {
  let str = raw;
  str = str.replace(/\\text\{([^}]+)\}/g, "$1");
  str = str.replace(/\\times/g, " × ");
  str = str.replace(/\\sqrt\{([^}]+)\}/g, "√($1)");
  str = str.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)");
  str = str.replace(/\\sum/g, "Σ");
  str = str.replace(/\\Delta/g, "Δ");
  str = str.replace(/\\rho/g, "ρ");
  str = str.replace(/\\le/g, "≤");
  str = str.replace(/\\ge/g, "≥");
  str = str.replace(/\\pi/g, "π");
  str = str.replace(/\\circ/g, "°");
  str = str.replace(/_\{([^}]+)\}/g, "_$1");
  str = str.replace(/\^2/g, "²");
  str = str.replace(/\^3/g, "³");
  str = str.replace(/\\/g, "");
  return str.replace(/\s+/g, " ").trim();
}

function formatInlineText(text: string): string {
  let formatted = text.replace(/\$\$(.*?)\$\$/g, (_, m) => formatLatexFormula(m));
  formatted = formatted.replace(/\$(.*?)\$/g, (_, m) => `<span class="font-mono text-brand font-semibold px-1 rounded bg-brand/10 border border-brand/20">${formatLatexFormula(m)}</span>`);
  return formatted.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>");
}

function ArticleDetailPage() {
  const { slug } = useParams({ from: "/resources/$slug" });
  const article = ARTICLES.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SiteNav />
        <main className="flex-1 flex items-center justify-center py-32 px-4 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-4xl font-extrabold">Article Not Found</h1>
            <p className="text-muted-foreground text-sm">
              The engineering article you are looking for has moved or does not exist.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground"
            >
              <ArrowLeft size={14} />
              <span>Back to Resources Hub</span>
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-28 pb-24 px-4 md:px-6 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Resources</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 pb-10 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand/20 border border-brand/30 text-brand px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
              <Clock size={13} />
              {article.readTime}
            </span>
            <span className="text-xs text-muted-foreground font-medium">•</span>
            <span className="text-xs text-muted-foreground font-medium">{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {article.summary}
          </p>

          {/* Author Row & Share Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-brand/20 text-brand grid place-items-center font-extrabold text-sm border border-brand/30">
                {article.author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-extrabold text-foreground">{article.author.name}</div>
                <div className="text-xs text-muted-foreground">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-bold text-foreground hover:bg-card backdrop-blur-md transition-colors"
              >
                <Share2 size={14} />
                <span>{copied ? "Link Copied!" : "Share Article"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="my-10 relative overflow-hidden rounded-3xl aspect-[21/9] bg-zinc-900 border border-white/10 shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
            }}
            className="size-full object-cover"
          />
        </div>

        {/* Article Body + Sticky Sidebar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Content Column */}
          <div className="lg:col-span-8 space-y-8 text-foreground/90 text-base leading-relaxed font-sans">
            {/* Render formatted markdown-like article paragraphs */}
            {article.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-4 pb-2 border-b border-border/50">
                    {trimmed.replace("# ", "")}
                  </h1>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-6 pb-2">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-lg font-bold tracking-tight text-foreground pt-4">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              // Formula Callout Card
              if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
                const formula = formatLatexFormula(trimmed.replace(/\$\$/g, ""));
                return (
                  <div key={idx} className="my-6 rounded-2xl border border-brand/40 bg-card/95 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-brand mb-3 flex items-center justify-center gap-2">
                      <Calculator size={14} />
                      <span>FORMULA EQUATION REFERENCE</span>
                    </div>
                    <div className="font-mono text-lg sm:text-2xl font-black text-foreground overflow-x-auto py-3 px-4 rounded-xl bg-background/50 border border-border/60 tracking-wider">
                      {formula}
                    </div>
                  </div>
                );
              }

              // Bullet List Item
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n- ").map((item) => item.replace(/^- /, ""));
                return (
                  <ul key={idx} className="space-y-2.5 my-4 pl-4 border-l-2 border-brand/40">
                    {items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                        <CheckCircle2 size={16} className="text-brand shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: formatInlineText(it) }} />
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatInlineText(trimmed),
                  }}
                />
              );
            })}

            {/* Inline Calculator Converter Callout */}
            <div className="my-10 glass rounded-3xl p-6 sm:p-8 border border-brand/40 bg-brand/5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-brand text-brand-foreground shrink-0 shadow-lg">
                  <Calculator size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">
                    Try the Live TARV {article.category} Calculator
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Calculate your engineering project thermal loads, cable drop runs, and plumbing sizing in 0.01 seconds mapped directly to official code rules.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/access"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
                    >
                      <span>Open Free Online Calculator</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Conversion Card Widget */}
            <div className="glass rounded-3xl p-6 border border-border bg-card/80 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-500">
                <Sparkles size={13} />
                <span>100% Verified Standards</span>
              </div>
              <h3 className="text-lg font-bold">Calculate in TARV Free</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Run ASHRAE 62.1 cooling loads, NEC voltage drops, and IPC plumbing fixture unit calculations with instant 2-way Revit BIM sync.
              </p>
              <Link
                to="/access"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground text-background dark:bg-white dark:text-black py-3 text-xs font-extrabold shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Request Private Beta Access</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Article Tags */}
            <div className="glass rounded-3xl p-6 border border-border/60 bg-card/50">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Article Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/40">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-24 border-t border-border/60 pt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Related Engineering Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <div key={rel.slug} className="glass rounded-3xl p-6 border border-border/60 bg-card/60 flex flex-col justify-between hover:border-brand/40 transition-all">
                  <div>
                    <span className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
                      {rel.category}
                    </span>
                    <h3 className="text-base font-bold mt-3 line-clamp-2 hover:text-brand transition-colors">
                      <Link to={`/resources/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    to={`/resources/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand mt-6 hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
