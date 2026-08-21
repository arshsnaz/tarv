import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Building2, Sparkles, Phone, Globe, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContactRequest } from "@/lib/contact-request";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — TARV MEP Calculator & Enterprise Engineering Support" },
      {
        name: "description",
        content:
          "Contact TARV Engineering at API World Tower 403, Sheikh Zayed Rd, Dubai, UAE. Talk with our MEP calculation software team, request enterprise BIM integration, or get technical support.",
      },
      {
        name: "keywords",
        content:
          "MEP engineering calculator support, MEP tools online contact, MEP design tools sales, online engineering calculator MEP Dubai, HVAC electrical plumbing calculator",
      },
      { property: "og:title", content: "Contact Us — TARV MEP Calculator & Enterprise Support" },
      { property: "og:description", content: "Get in touch with TARV Engineering in Dubai, UAE. Contact enterprise sales & technical support." },
      { property: "og:url", content: "https://tarvofficial.vercel.app/contact" },
      { property: "og:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us — TARV MEP Calculator & Enterprise Support" },
      { name: "twitter:description", content: "Contact TARV Engineering in Dubai for MEP calculation software & AI design automation." },
      { name: "twitter:image", content: "https://tarvofficial.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactRequest({ data: form });
      if (res?.fallbackMailto) {
        const subject = encodeURIComponent(`Contact Inquiry: ${form.name} (${form.company || "Individual"})`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:admin@tarv.ai?subject=${subject}&body=${body}`;
      }
    } catch {
      const subject = encodeURIComponent(`Contact Inquiry: ${form.name} (${form.company || "Individual"})`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:admin@tarv.ai?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-6xl mx-auto space-y-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <MessageSquare size={14} />
              <span>DIRECT CONTACT & ENTERPRISE SUPPORT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Contact <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                TARV Engineering.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have questions about calculation solvers, custom Revit integration, or enterprise licensing? Our engineering team in Dubai is here to assist.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 Cols: Contact Details & Embedded Map */}
          <Reveal className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl border border-cyan-500/30 bg-card shadow-2xl space-y-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

              <div>
                <span className="text-[10px] font-extrabold text-cyan-500 uppercase tracking-widest block">DUBAI HEADQUARTERS</span>
                <h3 className="text-2xl font-black text-foreground flex items-center gap-2 mt-0.5">
                  <Building2 size={22} className="text-cyan-500" /> API World Tower
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Sheikh Zayed Rd · Trade Center First · Dubai, UAE</p>
              </div>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-muted/20 border border-border">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0 flex items-center justify-center font-bold border border-cyan-500/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground">Official Office Address</h4>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed">API World Tower 403, Sheikh Zayed Rd - Trade Center First - Dubai - United Arab Emirates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-muted/20 border border-border">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 flex items-center justify-center font-bold border border-emerald-500/20">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground">Official Direct Email</h4>
                    <p className="text-muted-foreground mt-0.5">
                      Primary Contact: <a href="mailto:admin@tarv.ai" className="text-cyan-500 font-mono font-bold hover:underline">admin@tarv.ai</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-muted/20 border border-border">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 flex items-center justify-center font-bold border border-amber-500/20">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-foreground">Working Hours</h4>
                    <p className="text-muted-foreground mt-0.5">Monday – Friday: 10:00 AM – 7:00 PM GST (Dubai Time)</p>
                  </div>
                </div>
              </div>

              {/* Interactive Embedded Google Map */}
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1786619856604!6m8!1m7!1sw1r-YQ_mPUD2HDisvL7V1w!2m2!1d25.22561241959889!2d55.28367855174471!3f185.98!4f0!5f0.7820865974627469"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="TARV Engineering Office Location Map"
                />
              </div>
            </div>
          </Reveal>

          {/* Right 6 Cols: High-End Contact Form */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl border-2 border-border/80 dark:border-white/15 bg-card/95 dark:bg-slate-900/95 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">Message Sent to admin@tarv.ai!</h3>
                  <p className="text-muted-foreground text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-foreground">{form.name}</span>. Your inquiry has been transmitted directly to <span className="font-mono font-bold text-cyan-500">admin@tarv.ai</span>. An engineer from our Dubai office will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-border pb-3 mb-2">
                    <h3 className="text-xl font-black text-foreground">Send Us a Direct Message</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">We respond to all engineering queries within 12 hours.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-foreground">Full Name <span className="text-cyan-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Eng. Sarah Al-Maktoum"
                      className="w-full rounded-xl border border-border bg-muted/30 p-3 text-xs outline-none focus:border-cyan-500 text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-foreground">Work Email <span className="text-cyan-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@mepfirm.com"
                      className="w-full rounded-xl border border-border bg-muted/30 p-3 text-xs outline-none focus:border-cyan-500 text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-foreground">Firm / Company Name <span className="text-cyan-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Apex MEP Consultants"
                      className="w-full rounded-xl border border-border bg-muted/30 p-3 text-xs outline-none focus:border-cyan-500 text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-foreground">Message <span className="text-cyan-500">*</span></label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can our engineering team assist your firm?"
                      className="w-full rounded-xl border border-border bg-muted/30 p-3 text-xs outline-none focus:border-cyan-500 text-foreground resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Direct Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
