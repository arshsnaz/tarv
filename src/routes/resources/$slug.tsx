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
} from "lucide-react";
import { useState, useMemo } from "react";

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

  // Convert $$...$$ display formulas to clean formula reference card
  formatted = formatted.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => {
    const formula = formatLatexFormula(m);
    return `<div class="my-6 rounded-2xl border border-brand/40 bg-card/95 p-6 sm:p-8 shadow-2xl text-center font-mono text-lg sm:text-2xl font-black text-foreground overflow-x-auto tracking-wider"><div class="text-[11px] font-extrabold uppercase tracking-widest text-brand mb-3 flex items-center justify-center gap-1.5">FORMULA EQUATION REFERENCE</div>${formula}</div>`;
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

function ArticleDetailPage() {
  const { slug } = useParams({ from: "/resources/$slug" });
  const article = ARTICLES.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
                  <div key={idx} className="my-6 rounded-2xl border border-border/80 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-x-auto font-mono text-xs sm:text-sm text-emerald-400">
                    {blockItem.lang && (
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 mb-2 border-b border-white/10 pb-2">
                        {blockItem.lang}
                      </div>
                    )}
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
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="size-24 sm:size-28 rounded-2xl object-cover border-2 border-brand/40 shadow-md shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-[10px] font-extrabold uppercase tracking-widest text-brand">
                    <User size={12} />
                    <span>AUTHOR & CEO SPOTLIGHT</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">{article.author.name}</h3>
                  <div className="text-xs font-extrabold text-brand">{article.author.role}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Salil Kulkarni is the CEO & Founder of TARV, building the world's most advanced AI-powered MEP calculation software and 2-way Revit BIM synchronization suite. Salil writes in-depth masterclass engineering handbooks covering ASHRAE, NEC, IPC, NFPA, and GCC authority compliance.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">ASHRAE Member</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">BIM Automation Lead</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-muted text-[10px] font-bold text-foreground">Dubai, UAE</span>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Article Search Tags
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

      <SiteFooter />
    </div>
  );
}
