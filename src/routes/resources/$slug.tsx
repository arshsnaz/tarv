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
  ChevronRight,
  HelpCircle,
  FileSpreadsheet,
  Download,
  List,
  Copy,
  Check,
  ArrowUp,
  Tag,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

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
  if (!raw) return "";

  const lines = raw.split("\n").map((line) => {
    let l = line.trim();
    if (!l) return "";
    l = l.replace(/[\t\\]+t?ext\s*\{([^}]+)\}/gi, "$1");
    l = l.replace(/[\t\\]+t?imes/gi, " × ");
    l = l.replace(/\\times/gi, " × ");
    l = l.replace(/\\cdot/gi, " · ");
    l = l.replace(/\\sqrt\{([^}]+)\}/gi, "√($1)");
    l = l.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/gi, "($1 / $2)");
    l = l.replace(/\\binom\{([^}]+)\}\{([^}]+)\}/gi, "C($1, $2)");
    l = l.replace(/\\sum/gi, "Σ");
    l = l.replace(/\\Delta/gi, "Δ");
    l = l.replace(/\\rho/gi, "ρ");
    l = l.replace(/\\le\b/gi, "≤");
    l = l.replace(/\\ge\b/gi, "≥");
    l = l.replace(/\\pi\b/gi, "π");
    l = l.replace(/\^?\\circ/gi, "°");
    l = l.replace(/_\{([^}]+)\}/gi, "_$1");
    l = l.replace(/\^2/gi, "²");
    l = l.replace(/\^3/gi, "³");
    l = l.replace(/\\/gi, "");
    return l;
  }).filter(Boolean);

  return lines.join("<br />");
}

function formatInlineText(text: string): string {
  if (!text) return "";
  let formatted = text;

  // Convert $$...$$ display formulas to clean formula reference card with Copy Button
  formatted = formatted.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => {
    const formulaHtml = formatLatexFormula(m);
    const plainTextFormula = formulaHtml.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim().replace(/"/g, "&quot;");

    return `<div class="my-6 rounded-2xl border border-brand/40 bg-card/95 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
      <div class="flex items-center justify-between gap-2 mb-3">
        <div class="text-[11px] font-extrabold uppercase tracking-widest text-brand flex items-center gap-2">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          <span>FORMULA EQUATION REFERENCE</span>
        </div>
        <button
          onclick="navigator.clipboard.writeText(this.getAttribute('data-formula')); this.innerHTML='<svg class=\\'w-3 h-3 text-emerald-500 inline mr-1\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><path d=\\'M20 6L9 17l-5-5\\'/></svg><span>Copied!</span>'; setTimeout(() => { this.innerHTML='<svg class=\\'w-3 h-3 inline mr-1\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'9\\' y=\\'9\\' width=\\'13\\' height=\\'13\\' rx=\\'2\\'/><path d=\\'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\\'/></svg><span>Copy Formula</span>'; }, 2000)"
          data-formula="${plainTextFormula}"
          class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[11px] font-bold text-muted-foreground hover:border-brand/50 hover:text-brand transition-colors backdrop-blur-md shrink-0 cursor-pointer"
        >
          <svg class="w-3 h-3 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy Formula</span>
        </button>
      </div>
      <div class="font-mono text-lg sm:text-2xl font-black text-foreground overflow-x-auto py-3 px-4 rounded-xl bg-background/50 border border-border/60 tracking-wider">
        ${formulaHtml}
      </div>
    </div>`;
  });

  // Protect currency dollar signs (e.g. $28,400, $100, $0) from being parsed as math
  formatted = formatted.replace(/\$(\d[\d,\.]*\b)/g, "___CURRENCY___$1");

  // Convert $...$ inline math to clean styled text
  formatted = formatted.replace(/\$([^\$]+?)\$/g, (_, m) => {
    if (/[a-zA-Z\\_\^=±×·√°≤≥]/.test(m)) {
      return `<span class="font-mono text-brand font-semibold">${formatLatexFormula(m)}</span>`;
    }
    return `$${m}$`;
  });

  // Restore currency dollar signs
  formatted = formatted.replace(/___CURRENCY___/g, "$");

  // Add automated SEO internal cross-linking mesh
  formatted = formatted
    .replace(/\bASHRAE 62\.1-2022\b/g, `<a href="/resources/ashrae-cooling-load-calculation-guide" class="text-brand font-semibold hover:underline border-b border-brand/40">ASHRAE 62.1-2022</a>`)
    .replace(/\bASHRAE Standard 62\.1\b/g, `<a href="/resources/ashrae-cooling-load-calculation-guide" class="text-brand font-semibold hover:underline border-b border-brand/40">ASHRAE Standard 62.1</a>`)
    .replace(/\bNEC 2023\b/g, `<a href="/resources/nec-2023-voltage-drop-cable-sizing" class="text-brand font-semibold hover:underline border-b border-brand/40">NEC 2023</a>`)
    .replace(/\bIPC 2024\b/g, `<a href="/resources/ipc-2024-fixture-units-water-demand-sizing" class="text-brand font-semibold hover:underline border-b border-brand/40">IPC 2024</a>`)
    .replace(/\bSMACNA\b/g, `<a href="/resources/duct-static-pressure-loss-smacna-ashrae" class="text-brand font-semibold hover:underline border-b border-brand/40">SMACNA</a>`)
    .replace(/\bNFPA 13\b/g, `<a href="/resources/nfpa-13-fire-protection-sprinkler-k-factor" class="text-brand font-semibold hover:underline border-b border-brand/40">NFPA 13</a>`)
    .replace(/\bDEWA\b/g, `<a href="/resources/dubai-dewa-dcl-mep-calculation-compliance-guide" class="text-brand font-semibold hover:underline border-b border-brand/40">DEWA</a>`)
    .replace(/\bDCL Al Sa'fat\b/g, `<a href="/resources/dubai-dewa-dcl-mep-calculation-compliance-guide" class="text-brand font-semibold hover:underline border-b border-brand/40">DCL Al Sa'fat</a>`)
    .replace(/\bRevit Parameter Syncing\b/g, `<a href="/resources/revit-parameter-syncing-5-pitfalls-automation" class="text-brand font-semibold hover:underline border-b border-brand/40">Revit Parameter Syncing</a>`);

  // Convert **bold**
  return formatted.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>");
}

function parseContentBlocks(content: string): { type: "code" | "markdown"; raw: string; lang?: string }[] {
  if (!content) return [];
  const blocks: { type: "code" | "markdown"; raw: string; lang?: string }[] = [];
  const codeBlockParts = content.split(/```/g);

  for (let i = 0; i < codeBlockParts.length; i++) {
    if (i % 2 === 1) {
      // Code block content
      const firstLineEnd = codeBlockParts[i].indexOf("\n");
      let lang = "";
      let code = codeBlockParts[i];
      if (firstLineEnd !== -1) {
        lang = codeBlockParts[i].substring(0, firstLineEnd).trim();
        code = codeBlockParts[i].substring(firstLineEnd + 1);
      }
      blocks.push({ type: "code", raw: code.trim(), lang });
    } else {
      // Regular markdown text parts - split by double newlines \n\n
      const paragraphs = codeBlockParts[i].split("\n\n");
      for (const p of paragraphs) {
        const trimmed = p.trim();
        if (trimmed) {
          blocks.push({ type: "markdown", raw: trimmed });
        }
      }
    }
  }

  return blocks;
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const cleaned = text.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleaned);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[11px] font-bold text-muted-foreground hover:border-brand/50 hover:text-brand transition-colors backdrop-blur-md shrink-0"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}

function ArticleDetailPage() {
  const { slug } = useParams({ from: "/resources/$slug" });
  const article = ARTICLES.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const currentIndex = useMemo(() => {
    if (!article) return -1;
    return ARTICLES.findIndex((a) => a.slug === article.slug);
  }, [article]);

  const prevArticle = useMemo(() => {
    if (currentIndex <= 0) return ARTICLES[ARTICLES.length - 1];
    return ARTICLES[currentIndex - 1];
  }, [currentIndex]);

  const nextArticle = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= ARTICLES.length - 1) return ARTICLES[0];
    return ARTICLES[currentIndex + 1];
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract Table of Contents headings (## or ###)
  const tocHeadings = useMemo(() => {
    if (!article) return [];
    const lines = article.content.split("\n");
    return lines
      .filter((l) => l.startsWith("## ") || l.startsWith("### "))
      .map((l) => {
        const text = l.replace(/^###?\s+/, "").trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const level = l.startsWith("### ") ? 3 : 2;
        return { text, id, level };
      });
  }, [article]);

  const parsedBlocks = useMemo(() => {
    if (!article) return [];
    return parseContentBlocks(article.content);
  }, [article]);

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

  // Construct Google Rich JSON-LD Schemas (TechArticle + BreadcrumbList + FAQPage)
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.summary,
    "image": article.image,
    "datePublished": "2026-08-14T08:00:00+00:00",
    "dateModified": "2026-08-18T12:00:00+00:00",
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
      "worksFor": {
        "@type": "Organization",
        "name": "TARV Engineering"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "TARV Engineering Software",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tarvofficial.vercel.app/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tarvofficial.vercel.app/resources/${article.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tarvofficial.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resources",
        "item": "https://tarvofficial.vercel.app/resources"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.category,
        "item": `https://tarvofficial.vercel.app/resources?category=${encodeURIComponent(article.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": article.title,
        "item": `https://tarvofficial.vercel.app/resources/${article.slug}`
      }
    ]
  };

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-cyan-400 to-blue-500 z-50 transition-all duration-150 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Inject Google Rich Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <SiteNav />

      <main className="flex-1 pt-28 pb-24 px-4 md:px-6 max-w-6xl mx-auto w-full">
        {/* SEO Breadcrumbs Bar */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/resources" className="hover:text-foreground transition-colors">Resources</Link>
          <ChevronRight size={12} />
          <span className="text-brand font-semibold">{article.category}</span>
          <ChevronRight size={12} />
          <span className="text-foreground line-clamp-1 max-w-[200px] sm:max-w-none">{article.title}</span>
        </nav>

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

          {/* Author Row & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full overflow-hidden border border-brand/40 bg-brand/20 shrink-0 shadow-lg">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="size-full grid place-items-center font-extrabold text-sm text-brand">
                    {article.author.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-extrabold text-foreground">{article.author.name}</div>
                <div className="text-xs text-muted-foreground">{article.author.role}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/30 px-4 py-2 text-xs font-bold text-brand hover:bg-brand/20 transition-colors"
              >
                <FileSpreadsheet size={14} />
                <span>Get Calculation Workbook</span>
              </button>

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
        <div className="my-6 sm:my-10 relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 border border-white/10 shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80";
            }}
            className="size-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-12 glass rounded-3xl p-6 sm:p-8 border border-brand/30 bg-brand/5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand mb-4">
              <Sparkles size={16} />
              <span>KEY ENGINEERING TAKEAWAYS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.keyTakeaways.map((takeaway, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground leading-relaxed">
                  <CheckCircle2 size={16} className="text-brand shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Body + Sticky Sidebar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Content Column */}
          <div className="lg:col-span-8 space-y-8 text-foreground/90 text-base leading-relaxed font-sans">
            {/* Render formatted markdown-like article paragraphs */}
            {parsedBlocks.map((blockItem, idx) => {
              if (blockItem.type === "code") {
                return (
                  <div key={idx} className="my-6 rounded-2xl border border-border/80 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-x-auto font-mono text-xs sm:text-sm text-emerald-400 relative group">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60">
                        {blockItem.lang || "CODE SNIPPET"}
                      </span>
                      <CopyButton text={blockItem.raw} label="Copy Code" />
                    </div>
                    <pre className="whitespace-pre overflow-x-auto leading-relaxed">
                      <code>{blockItem.raw}</code>
                    </pre>
                  </div>
                );
              }

              const trimmed = blockItem.raw.trim();
              if (!trimmed) return null;

              if (trimmed === "---") {
                return <hr key={idx} className="my-8 border-border/50" />;
              }

              if (trimmed.startsWith("# ") || trimmed.startsWith("## ") || trimmed.startsWith("### ") || trimmed.startsWith("#### ")) {
                const lines = trimmed.split("\n");
                const headingText = lines[0].replace(/^#+\s*/, "");
                const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const level = lines[0].startsWith("#### ") ? 4 : lines[0].startsWith("### ") ? 3 : lines[0].startsWith("## ") ? 2 : 1;
                const restText = lines.slice(1).join("\n").trim();

                const bulletLines = restText ? restText.split("\n").filter((l) => l.trim().startsWith("- ")) : [];

                return (
                  <div key={idx} className="space-y-3">
                    {level === 1 && (
                      <h1
                        id={id}
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-4 pb-2 border-b border-border/50 scroll-mt-28"
                        dangerouslySetInnerHTML={{ __html: formatInlineText(headingText) }}
                      />
                    )}
                    {level === 2 && (
                      <h2
                        id={id}
                        className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-6 pb-2 scroll-mt-28"
                        dangerouslySetInnerHTML={{ __html: formatInlineText(headingText) }}
                      />
                    )}
                    {level === 3 && (
                      <h3
                        id={id}
                        className="text-lg font-bold tracking-tight text-foreground pt-4 scroll-mt-28"
                        dangerouslySetInnerHTML={{ __html: formatInlineText(headingText) }}
                      />
                    )}
                    {level === 4 && (
                      <h4
                        className="text-base font-bold tracking-tight text-brand pt-3"
                        dangerouslySetInnerHTML={{ __html: formatInlineText(headingText) }}
                      />
                    )}

                    {restText && (
                      bulletLines.length > 0 ? (
                        <ul className="space-y-2.5 pl-4 border-l-2 border-brand/40 my-3">
                          {bulletLines.map((line, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                              <CheckCircle2 size={16} className="text-brand shrink-0 mt-1" />
                              <span dangerouslySetInnerHTML={{ __html: formatInlineText(line.trim().replace(/^- /, "")) }} />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div
                          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatInlineText(restText) }}
                        />
                      )
                    )}
                  </div>
                );
              }

              // Markdown Tables
              if (trimmed.includes("|") && trimmed.includes("\n")) {
                const lines = trimmed.split("\n").filter((l) => l.trim().startsWith("|"));
                if (lines.length >= 2) {
                  const headers = lines[0].split("|").filter((c) => c.trim().length > 0).map((c) => c.trim());
                  const dataRows = lines.slice(lines[1].includes("---") ? 2 : 1);
                  return (
                    <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-border/80 bg-card/80 p-1 shadow-lg">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-border/60 bg-muted/50">
                            {headers.map((h, i) => (
                              <th key={i} className="p-3.5 font-extrabold text-foreground uppercase tracking-wider text-[11px] text-brand">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {dataRows.map((row, rIdx) => {
                            const cells = row.split("|").filter((c) => c.trim().length > 0).map((c) => c.trim());
                            return (
                              <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3.5 text-muted-foreground font-medium" dangerouslySetInnerHTML={{ __html: formatInlineText(cell) }} />
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              // Formula Callout Card (standalone block)
              if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
                const formula = formatLatexFormula(trimmed.replace(/\$\$/g, ""));
                return (
                  <div key={idx} className="my-6 rounded-2xl border border-brand/40 bg-card/95 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-brand flex items-center gap-2">
                        <Calculator size={14} />
                        <span>FORMULA EQUATION REFERENCE</span>
                      </div>
                      <CopyButton text={formula} label="Copy Formula" />
                    </div>
                    <div
                      className="font-mono text-lg sm:text-2xl font-black text-foreground overflow-x-auto py-3 px-4 rounded-xl bg-background/50 border border-border/60 tracking-wider"
                      dangerouslySetInnerHTML={{ __html: formula }}
                    />
                  </div>
                );
              }

              // Bullet List Item (standalone or mixed)
              if (trimmed.startsWith("- ") || trimmed.includes("\n- ")) {
                const nonBulletHeading = trimmed.split("\n").find((l) => !l.trim().startsWith("- ") && l.trim().length > 0);
                const bulletLines = trimmed.split("\n").filter((l) => l.trim().startsWith("- "));
                return (
                  <div key={idx} className="my-4 space-y-3">
                    {nonBulletHeading && (
                      <div
                        className="font-bold text-foreground text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: formatInlineText(nonBulletHeading) }}
                      />
                    )}
                    <ul className="space-y-2.5 pl-4 border-l-2 border-brand/40">
                      {bulletLines.map((line, i) => {
                        const itemText = line.trim().replace(/^- /, "");
                        return (
                          <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-muted-foreground">
                            <CheckCircle2 size={16} className="text-brand shrink-0 mt-1" />
                            <span dangerouslySetInnerHTML={{ __html: formatInlineText(itemText) }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }

              // Numbered List Item
              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed.split(/\n(?=\d+\.\s)/).map((item) => item.replace(/^\d+\.\s*/, ""));
                return (
                  <ol key={idx} className="space-y-3 my-4 pl-2">
                    {items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold font-mono">
                          {i + 1}
                        </span>
                        <span className="pt-0.5" dangerouslySetInnerHTML={{ __html: formatInlineText(it) }} />
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <div
                  key={idx}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatInlineText(trimmed),
                  }}
                />
              );
            })}

            {/* FAQ Accordion Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="my-14 border-t border-border/60 pt-10">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand mb-6">
                  <HelpCircle size={16} />
                  <span>FREQUENTLY ASKED ENGINEERING QUESTIONS</span>
                </div>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="glass rounded-2xl p-5 border border-border/60 bg-card/60">
                      <h4 className="text-base font-bold text-foreground mb-2 flex items-start gap-2">
                        <span className="text-brand font-mono font-bold">Q{i + 1}.</span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author / CEO Spotlight Card */}
            <div className="my-10 glass rounded-3xl p-6 sm:p-8 border border-brand/30 bg-card/90 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="size-24 sm:size-28 rounded-2xl object-cover border-2 border-brand/40 shadow-md"
                  />
                  <a
                    href="https://www.linkedin.com/in/salil-kulkarni-76421919b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2] text-white text-[11px] font-extrabold shadow-md hover:bg-[#004182] transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-[10px] font-extrabold uppercase tracking-widest text-brand">
                    <User size={12} />
                    <span>AUTHOR & CEO SPOTLIGHT</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">{article.author.name}</h3>
                  <div className="text-xs font-extrabold text-brand">{article.author.role} | R&D Manager, Consistent Engineering Consultants</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Salil Kulkarni holds a B.S. in Mechanical Engineering from <strong>Purdue University</strong> and serves as the R&D Manager at Consistent Engineering Consultants in Dubai, UAE. Combining mechanical design physics, robotics, and Python AI, Salil founded TARV to pioneer 2-way BIM parameter automation.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">Purdue Mechanical Engineering</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">Consistent Engineering Consultants</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">Dubai, UAE</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-10 glass rounded-3xl p-5 sm:p-8 border border-brand/40 bg-brand/5 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                <div className="grid size-12 sm:size-14 place-items-center rounded-2xl bg-brand text-brand-foreground shrink-0 shadow-lg">
                  <Calculator className="size-6 sm:size-7" />
                </div>
                <div className="space-y-3 w-full">
                  <h4 className="text-base sm:text-xl font-extrabold text-foreground">
                    Try the Live TARV {article.category} Calculator
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    Calculate your engineering project thermal loads, cable drop runs, and plumbing sizing in 0.01 seconds mapped directly to official code rules.
                  </p>
                  <div className="pt-2 flex justify-center sm:justify-start">
                    <Link
                      to="/access"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-extrabold text-primary-foreground shadow-md hover:opacity-90 transition-all w-full sm:w-auto"
                    >
                      <span>Open Free Online Calculator</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents Widget */}
            {tocHeadings.length > 0 && (
              <div className="glass rounded-3xl p-6 border border-border/80 bg-card/80 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  <List size={14} className="text-brand" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-2 text-xs font-medium">
                  {tocHeadings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block text-muted-foreground hover:text-brand transition-colors line-clamp-1 ${
                        h.level === 3 ? "pl-3 text-[11px]" : "font-semibold"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Conversion Widget */}
            <div className="glass rounded-3xl p-6 border border-brand/30 bg-gradient-to-b from-card to-brand/10 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-500">
                <Sparkles size={13} />
                <span>100% Verified Code Math</span>
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
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                <Tag size={14} className="text-brand" />
                <span>Article Search Tags</span>
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

        {/* Next & Previous Article Navigation */}
        <div className="mt-16 border-t border-border/80 dark:border-white/10 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevArticle && (
              <Link
                to={`/resources/${prevArticle.slug}`}
                className="glass group rounded-3xl p-6 border border-border/80 dark:border-white/10 bg-card/80 dark:bg-slate-900/80 hover:border-brand/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-black text-brand uppercase tracking-wider mb-3">
                  <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>PREVIOUS ARTICLE</span>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                  {prevArticle.title}
                </div>
                <div className="text-xs text-muted-foreground mt-3 font-semibold">
                  {prevArticle.category} • {prevArticle.readTime}
                </div>
              </Link>
            )}

            {nextArticle && (
              <Link
                to={`/resources/${nextArticle.slug}`}
                className="glass group rounded-3xl p-6 border border-border/80 dark:border-white/10 bg-card/80 dark:bg-slate-900/80 hover:border-brand/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-right sm:text-right cursor-pointer"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-black text-brand uppercase tracking-wider mb-3">
                  <span>NEXT ARTICLE</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                  {nextArticle.title}
                </div>
                <div className="text-xs text-muted-foreground mt-3 font-semibold">
                  {nextArticle.category} • {nextArticle.readTime}
                </div>
              </Link>
            )}
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

      {/* Lead Capture Workbook Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass max-w-md w-full rounded-3xl p-6 border border-brand/40 bg-card/95 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-bold text-brand">
                <FileSpreadsheet size={14} />
                <span>EXCEL / PDF CALCULATION SHEET</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-bold">Download Free Calculation Workbook</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get official engineering calculation spreadsheets pre-loaded with ASHRAE, NEC, and IPC formulas used by TARV engineers.
            </p>

            <Link
              to="/access"
              onClick={() => setShowModal(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-xs font-extrabold text-primary-foreground shadow-lg hover:opacity-90"
            >
              <Download size={14} />
              <span>Get Free Instant Access</span>
            </Link>
          </div>
        </div>
      )}

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
