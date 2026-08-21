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
  Download,
  Flame,
  Zap,
  Wind,
  Droplets,
  ShieldCheck,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const FREE_DOWNLOADS = [
  {
    title: "ASHRAE 62.1 Ventilation & Cooling Sizing Cheatsheet",
    desc: "Quick reference table for outdoor airflow rates, occupancy density, and CFM formulas.",
    file: "/downloads/ashrae_62_1_cheatsheet.pdf",
    icon: Flame,
    color: "text-cyan-500 bg-cyan-500/10"
  },
  {
    title: "NEC 2023 Feeder Voltage Drop & Cable Sizing Guide",
    desc: "3-phase & single-phase voltage drop equations, impedance tables, and ambient derating factors.",
    file: "/downloads/nec_2023_voltage_drop_guide.pdf",
    icon: Zap,
    color: "text-amber-500 bg-amber-500/10"
  },
  {
    title: "IPC Hunter Curve Fixture Unit GPM Hydraulic Matrix",
    desc: "Convert WSFU & DFU counts directly to peak GPM water demand and pipe diameter sizing.",
    file: "/downloads/ipc_hunter_curve_matrix.pdf",
    icon: Droplets,
    color: "text-blue-500 bg-blue-500/10"
  }
];

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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">
      <SiteNav />

      <main className="flex-1 pt-32 pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <BookOpen size={14} />
              <span>TARV ENGINEERING KNOWLEDGE HUB</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Engineering Formulas, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Codes & BIM Automation Guides
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Deep technical articles, ASHRAE / NEC / IPC reference equations, and Autodesk Revit BIM automation tutorials authored by senior MEP engineering leaders.
            </p>
          </Reveal>

          {/* Real-time Search Input */}
          <Reveal delay={200} className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 size-5 text-cyan-500 shrink-0" />
              <input
                type="text"
                placeholder="Search by topic (e.g. ASHRAE 62.1, NEC 2023, Voltage Drop, Fixture Units)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none shadow-xl transition-all"
              />
            </div>
          </Reveal>

          {/* Topic Pills */}
          <Reveal delay={240} className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950 shadow-md"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-cyan-500/40"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-black ${
                      isSelected
                        ? "bg-slate-950/20 text-slate-950"
                        : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </Reveal>
        </div>

        {/* Featured Article Spotlight Card (shown when not searching) */}
        {!search && selectedCategory === "All Topics" && featuredArticle && (
          <Reveal delay={280}>
            <Link
              to={`/resources/${featuredArticle.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-cyan-500/30 bg-card shadow-2xl transition-all duration-500 hover:border-cyan-500/60 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-cyan-500 text-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      FEATURED GUIDE
                    </span>
                    <span className="rounded-md border border-border bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-cyan-500" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground group-hover:text-cyan-500 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-xl overflow-hidden border border-cyan-500/40 bg-cyan-500/10 shrink-0 grid place-items-center font-bold text-xs text-cyan-500">
                        {featuredArticle.author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{featuredArticle.author.name}</div>
                        <div className="text-[10px] text-muted-foreground">{featuredArticle.author.role}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 text-slate-950 px-4 py-2 text-xs font-extrabold shadow-sm group-hover:bg-cyan-400 transition-all">
                      <span>Read Full Guide</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted border border-border">
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

        {/* Free Engineering Cheatsheet PDF Downloads Card */}
        <Reveal delay={300}>
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase">
                  <Download size={13} />
                  <span>Free Technical Reference Cheatsheets</span>
                </div>
                <h2 className="text-xl font-extrabold text-foreground">Download Official MEP Sizing Formula PDFs</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FREE_DOWNLOADS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl border border-border bg-muted/20 space-y-4 hover:border-cyan-500/40 transition-all">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${item.color}`}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-foreground text-xs leading-snug">{item.title}</h3>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-600 dark:text-cyan-400 hover:underline pt-1"
                    >
                      <Download size={13} />
                      <span>Download PDF Cheatsheet</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Article Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <FileText size={18} className="text-cyan-500" />
              <span>Technical Guides & Case Studies ({filteredArticles.length})</span>
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-border bg-card space-y-3">
              <BookOpen size={36} className="mx-auto text-muted-foreground/40" />
              <h3 className="text-base font-bold text-foreground">No Guides Match Your Search Query</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Try searching for broader keywords such as "ASHRAE", "Voltage Drop", "Revit", or "Hunter Curve".
              </p>
              <Button onClick={() => setSearch("")} className="bg-cyan-500 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl">
                Clear Search Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Reveal key={article.slug}>
                  <Link
                    to={`/resources/${article.slug}`}
                    className="group flex flex-col justify-between h-full rounded-3xl border border-border bg-card p-6 hover:border-cyan-500/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="space-y-4">
                      {/* Image Thumbnail */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-muted border border-border">
                        <img
                          src={article.image}
                          alt={article.title}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-slate-950/80 text-white border border-white/20 backdrop-blur-md">
                          {article.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                          <Clock size={12} className="text-cyan-500" />
                          <span>{article.readTime}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>

                        <h3 className="text-base font-extrabold text-foreground group-hover:text-cyan-500 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    {/* Author & CTA Footer */}
                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground text-[11px]">{article.author.name}</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Read</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-cyan-500 text-slate-950 shadow-2xl hover:bg-cyan-400 transition-all duration-300 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <SiteFooter />
    </div>
  );
}
