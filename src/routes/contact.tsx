import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Building2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | TARV — Enterprise Support & Sales" },
      {
        name: "description",
        content:
          "Get in touch with TARV Engineering at Consistent Engineering Consultants, Solapur, India. Contact enterprise sales, technical support, or schedule a custom BIM demo.",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Details & Embedded Google Map Card */}
          <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-border space-y-8 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Building2 size={22} className="text-brand" /> Global Headquarters
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Consistent Engineering Consultants · Solapur, India</p>
            </div>
            
            <div className="space-y-5 text-sm md:text-base">
              <div className="flex items-start gap-4">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Official Office Address</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm">Consistent Engineering Consultants, Solapur, Maharashtra, India</p>
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
                  <h4 className="font-bold text-foreground">Support Hours & SLA</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
                  <p className="text-xs text-brand font-bold mt-1">⚡ Enterprise SLA: &lt; 2 Hour Response Guarantee</p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3802.312134341196!2d75.90163027517065!3d17.635369583294732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db0023a159d1%3A0x7fb08ec2d0959558!2sConsistent%20Engineering%20Consultants!5e0!3m2!1sen!2sin!4v1786618973982!5m2!1sen!2sin"
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
