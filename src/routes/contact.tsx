import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | TARV — Enterprise Support & Sales" },
      {
        name: "description",
        content:
          "Get in touch with TARV Engineering. Contact enterprise sales, technical support, or schedule a custom BIM demo. Headquartered in Solapur, India.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 space-y-8">
            <h3 className="text-2xl font-bold">Global Headquarters</h3>
            
            <div className="space-y-6 text-sm md:text-base">
              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Office Address</h4>
                  <p className="text-muted-foreground mt-0.5">Solapur, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Official Direct Email</h4>
                  <p className="text-muted-foreground mt-0.5">Primary Contact & Sales: <a href="mailto:admin@tarv.ai" className="text-brand font-mono">admin@tarv.ai</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Support Hours & SLA</h4>
                  <p className="text-muted-foreground mt-0.5">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
                  <p className="text-xs text-brand font-semibold mt-1">⚡ Enterprise SLA: &lt; 2 Hour Response Guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold">Message Received!</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Thank you for contacting TARV Engineering. An engineer from our Solapur office will get back to you shortly.
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
                    className="w-full rounded-2xl border border-white/10 bg-background/80 p-3.5 text-sm outline-none focus:border-brand"
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
                    className="w-full rounded-2xl border border-white/10 bg-background/80 p-3.5 text-sm outline-none focus:border-brand"
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
                    className="w-full rounded-2xl border border-white/10 bg-background/80 p-3.5 text-sm outline-none focus:border-brand"
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
                    className="w-full rounded-2xl border border-white/10 bg-background/80 p-3.5 text-sm outline-none focus:border-brand resize-none"
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
