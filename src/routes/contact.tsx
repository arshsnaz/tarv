import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Building2 } from "lucide-react";
import { useState } from "react";
import { submitContactRequest } from "@/lib/contact-request";

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
        window.location.href = `mailto:tarv.official@gmail.com?subject=${subject}&body=${body}`;
      }
    } catch {
      const subject = encodeURIComponent(`Contact Inquiry: ${form.name} (${form.company || "Individual"})`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:tarv.official@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="py-28 md:py-36 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow inline-flex items-center gap-2">
            <MessageSquare size={16} className="text-brand" />
            GET IN TOUCH
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4">
            Contact TARV Engineering
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about calculation solvers, custom Revit integration, or enterprise licensing? Our engineering team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Details & Embedded Google Map Card */}
          <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-border space-y-8 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Building2 size={22} className="text-brand" /> Global Headquarters
              </h3>
              <p className="text-sm text-muted-foreground mt-1">API World Tower · Sheikh Zayed Rd, Dubai</p>
            </div>
            
            <div className="space-y-5 text-sm md:text-base">
              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Official Office Address</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">API World Tower 403, Sheikh Zayed Rd - Trade Center First - Dubai - United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Official Direct Email</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm">Primary Contact & Sales: <a href="mailto:admin@tarv.ai" className="text-brand font-mono font-bold">admin@tarv.ai</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Working Hours</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm">Monday – Friday: 10:00 AM – 7:00 PM GST</p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1786619856604!6m8!1m7!1sw1r-YQ_mPUD2HDisvL7V1w!2m2!1d25.22561241959889!2d55.28367855174471!3f185.98!4f0!5f0.7820865974627469"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="TARV Engineering Office Location Map"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-border shadow-xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold">Message Sent to admin@tarv.ai!</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Thank you, <span className="font-bold text-foreground">{form.name}</span>. Your inquiry has been transmitted directly to <span className="font-mono font-bold text-brand">admin@tarv.ai</span>. An engineer from our Dubai office will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold mb-4">Send Us a Direct Message</h3>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Eng. Rajesh Kumar"
                    className="w-full rounded-2xl border border-border bg-card p-3.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Work Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rajesh@mepfirm.com"
                    className="w-full rounded-2xl border border-border bg-card p-3.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Company / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Apex MEP Consultants"
                    className="w-full rounded-2xl border border-border bg-card p-3.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help your engineering team?"
                    className="w-full rounded-2xl border border-border bg-card p-3.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-all cursor-pointer"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
