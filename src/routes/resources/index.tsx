import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
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
  ArrowUp,
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Topics": ARTICLES.length };
    ARTICLES.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  }, []);

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
              <Search className="absolute left-4 size-5 text-brand shrink-0" />
              <input
                type="text"
                placeholder="Search articles by keyword (e.g. ASHRAE, NEC 2023, Voltage Drop, Fixture Units)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-2 border-brand/30 bg-card/90 dark:bg-slate-900/90 py-4 pl-12 pr-4 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 dark:placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20 backdrop-blur-2xl shadow-xl transition-all"
              />
            </div>
          </Reveal>

          {/* Topic Pills */}
          <Reveal delay={240} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-full px-4.5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isSelected
                      ? "bg-brand text-brand-foreground shadow-lg shadow-brand/25 scale-105 border border-brand"
                      : "border border-border/80 dark:border-white/20 bg-card/80 dark:bg-slate-900/80 text-foreground/90 dark:text-slate-200 hover:border-brand/50 hover:bg-card dark:hover:bg-slate-800 backdrop-blur-md"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-black font-mono ${
                      isSelected
                        ? "bg-black/20 text-white"
                        : "bg-brand/10 dark:bg-brand/20 text-brand dark:text-cyan-300 border border-brand/20"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </Reveal>
        </div>

        {/* Featured Article Spotlight (shown if no active search filter) */}
        {!search && selectedCategory === "All Topics" && featuredArticle && (
          <Reveal delay={280} className="mb-16">
            <Link
              to={`/resources/${featuredArticle.slug}`}
              className="group relative block overflow-hidden rounded-[2.5rem] border border-brand/30 bg-card/80 dark:bg-slate-900/80 shadow-2xl transition-all duration-500 hover:border-brand/60 hover:shadow-brand/20 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand text-brand-foreground px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-sm">
                      FEATURED GUIDE
                    </span>
                    <span className="rounded-full border border-border/80 dark:border-white/10 bg-card/90 dark:bg-slate-800/90 px-3 py-1 text-xs font-bold text-foreground/80">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-brand" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-brand transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-10 rounded-full overflow-hidden border border-brand/40 bg-brand/20 shrink-0 shadow-md">
                        {featuredArticle.author.avatar ? (
                          <img
                            src={featuredArticle.author.avatar}
                            alt={featuredArticle.author.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="size-full grid place-items-center font-bold text-xs text-brand">
                            {featuredArticle.author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{featuredArticle.author.name}</div>
                        <div className="text-[11px] text-muted-foreground">{featuredArticle.author.role}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-brand text-brand-foreground px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-md group-hover:scale-105 transition-all duration-300">
                      <span>Read Full Guide</span>
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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
            </Link>
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
                  <Link
                    to={`/resources/${article.slug}`}
                    className="glass group flex flex-col justify-between rounded-3xl p-6 border border-border/80 dark:border-white/10 bg-card/80 dark:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-2xl h-full block cursor-pointer"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-5 bg-zinc-900 border border-white/10">
                        <img
                          src={article.image}
                          alt={article.title}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
                          }}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-background/90 dark:bg-slate-900/90 backdrop-blur-md border border-border/80 dark:border-white/20 px-3 py-1 text-[10px] font-black text-foreground uppercase tracking-wider shadow-md">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-semibold mb-3">
                        <Clock size={12} className="text-brand" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-lg font-extrabold tracking-tight line-clamp-2 text-foreground group-hover:text-brand transition-colors mb-3">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {article.summary}
                      </p>
                    </div>

                    {/* Footer / Tags & Action Button */}
                    <div className="border-t border-border/60 dark:border-white/10 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {article.tags.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-md bg-muted/60 dark:bg-white/5 border border-border/40 dark:border-white/10 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand text-brand-foreground px-4.5 py-2 text-xs font-black shadow-md group-hover:scale-105 transition-all duration-300">
                          <span>Read Full Guide</span>
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
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

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 grid size-11 sm:size-12 place-items-center rounded-full bg-brand text-brand-foreground border border-brand/50 shadow-2xl shadow-brand/40 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}

      <SiteFooter />
    </div>
  );
}
