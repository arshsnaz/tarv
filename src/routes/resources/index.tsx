import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";
import { ARTICLES, Article } from "@/lib/resources-data";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Tag,
  CheckCircle2,
  FileText,
  User,
} from "lucide-react";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources & Engineering Knowledge Hub — TARV MEP Calculator" },
      {
        name: "description",
        content:
          "Explore deep-dive technical articles, ASHRAE/NEC standards guides, Revit BIM automation case studies, and engineering calculation formulas from TARV AI Engineering.",
      },
      {
        name: "keywords",
        content:
          "MEP resources, ASHRAE 62.1 cooling load guide, NEC 2023 voltage drop formula, IPC plumbing fixture units, Revit BIM automation tutorial, DEWA DCL code rules",
      },
      { property: "og:title", content: "Engineering Knowledge Hub — TARV MEP Calculator" },
      { property: "og:description", content: "Technical guides, formulas & Revit BIM sync case studies for MEP engineers." },
      { property: "og:url", content: "https://tarvofficial.vercel.app/resources" },
      { property: "og:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Resources & Knowledge Hub — TARV MEP Engineering" },
      { name: "twitter:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/resources" }],
  }),
  component: ResourcesPage,
});

const CATEGORIES = [
  "All Topics",
  "HVAC",
  "Electrical",
  "Plumbing",
  "Fire Fighting",
  "Revit Sync",
  "Case Studies",
] as const;

function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All Topics" || article.category === selectedCategory;

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteNav />

      <main className="flex-1 pt-28 pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto pt-6 pb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand backdrop-blur-md">
              <BookOpen size={14} />
              <span>TARV ENGINEERING KNOWLEDGE HUB</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-balance mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              Engineering Formulas, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-blue-500">
                Standards & Revit Automation.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Deeply technical guides, ASHRAE / NEC / IPC reference equations, and real-world case studies for mechanical, electrical, plumbing, and BIM engineers.
            </p>
          </Reveal>

          {/* Real-time Search Bar */}
          <Reveal delay={200} className="mt-10 max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by keyword (e.g. ASHRAE, NEC 2023, Voltage Drop, Fixture Units)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-border/80 bg-card/80 py-4 pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 backdrop-blur-xl shadow-lg transition-all"
              />
            </div>
          </Reveal>

          {/* Topic Pills */}
          <Reveal delay={240} className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-foreground text-background dark:bg-white dark:text-black shadow-lg scale-105"
                    : "border border-border/60 bg-card/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Featured Article Spotlight (shown if no active search filter) */}
        {!search && selectedCategory === "All Topics" && featuredArticle && (
          <Reveal delay={280} className="mb-16">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-brand/30 bg-card/80 shadow-2xl transition-all duration-500 hover:border-brand/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand text-brand-foreground px-3.5 py-1 text-xs font-black uppercase tracking-wider">
                      FEATURED GUIDE
                    </span>
                    <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={13} />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight group-hover:text-brand transition-colors leading-tight">
                    <Link to={`/resources/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-full bg-brand/20 text-brand grid place-items-center font-bold text-xs">
                        {featuredArticle.author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{featuredArticle.author.name}</div>
                        <div className="text-[11px] text-muted-foreground">{featuredArticle.author.role}</div>
                      </div>
                    </div>

                    <Link
                      to={`/resources/${featuredArticle.slug}`}
                      className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-105 shadow-md"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-900 border border-white/10">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
                    }}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Article Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedCategory === "All Topics" ? "All Engineering Articles" : `${selectedCategory} Guides`}
            </h2>
            <span className="text-xs font-semibold text-muted-foreground font-mono">
              Showing {filteredArticles.length} results
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl border border-border">
              <FileText size={40} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-bold">No matching articles found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for a different keyword like "ASHRAE", "NEC", "Voltage Drop", or "Revit".
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All Topics");
                }}
                className="mt-6 rounded-full border border-border bg-card px-5 py-2 text-xs font-bold text-foreground"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <Reveal key={article.slug} delay={100 + (idx % 3) * 80}>
                  <div className="glass group flex flex-col justify-between rounded-3xl p-6 border border-border/60 bg-card/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl h-full">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-5 bg-zinc-900 border border-white/5">
                        <img
                          src={article.image}
                          alt={article.title}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
                          }}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-background/80 backdrop-blur-md border border-border px-3 py-1 text-[10px] font-bold text-foreground uppercase tracking-wider">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-semibold mb-3">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight line-clamp-2 group-hover:text-brand transition-colors mb-3">
                        <Link to={`/resources/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {article.summary}
                      </p>
                    </div>

                    {/* Footer / Tags & Action */}
                    <div className="border-t border-border/50 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.tags.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/resources/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-foreground group-hover:text-brand transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* High Converting Bottom CTA Banner */}
        <Reveal delay={350} className="mt-28">
          <div className="glass rounded-[2.5rem] p-8 sm:p-12 border border-brand/30 bg-gradient-to-r from-card via-card to-brand/10 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/20 border border-brand/30 px-3.5 py-1 text-xs font-bold text-brand">
                <Sparkles size={14} />
                <span>MEP CALCULATION AUTOMATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Stop Calculating by Hand. Run Physics Loads Instantly in TARV.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Join thousands of MEP consultants, BIM leads, and contractors saving 300+ engineering hours per project with 100% ASHRAE & NEC compliance.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/access"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-extrabold text-primary-foreground shadow-xl transition-transform hover:scale-105"
                >
                  <span>Start 14-Day Free Pro Trial</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-bold text-foreground backdrop-blur-md hover:bg-card"
                >
                  <span>View Commercial Plans</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}
