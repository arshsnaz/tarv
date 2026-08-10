import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { submitAccessRequest } from "@/lib/access-request";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";

export const Route = createFileRoute("/access")({
  component: AccessPage,
});

const countries = [
  "Sweden", "United States", "United Kingdom", "Germany", "Norway",
  "Denmark", "Finland", "Netherlands", "UAE", "India", "Other",
];

const companySizes = ["1–10", "11–50", "51–200", "201–500", "500+"];

const systems = [
  "Mechanical (HVAC)",
  "Electrical",
  "Plumbing",
  "Full MEP Suite",
];

const highlights = [
  "Automated MEP calculations built on real engineering formulas",
  "Native Revit sync — no export/import roundtrips",
  "Coordinated 3D models and drawings generated automatically",
  "Built for firms who need speed without losing precision",
];

function AccessPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    companySize: "",
    system: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitAccessRequest({ data: form });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <SiteNav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-12">
          {/* Left: value prop */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Private beta
            </span>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Request access to TARV.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              The MEP design platform built for firms that need engineering-grade
              accuracy, not just automation for its own sake.
            </p>
            <ul className="mt-10 space-y-4">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-foreground" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-10">
            <div className="halo pointer-events-none absolute -top-24 right-0 size-[400px] rounded-full blur-3xl" />
            <div className="relative">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={40} className="text-foreground" />
                  <h2 className="mt-4 text-xl font-semibold">Request received</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks, {form.name.split(" ")[0] || "there"} — our team will review your request
                    and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@firm.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      required
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Country</Label>
                      <Select value={form.country} onValueChange={(v) => update("country", v)}>
                        <SelectTrigger><SelectValue placeholder="Choose a country" /></SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Company size</Label>
                      <Select value={form.companySize} onValueChange={(v) => update("companySize", v)}>
                        <SelectTrigger><SelectValue placeholder="Choose size" /></SelectTrigger>
                        <SelectContent>
                          {companySizes.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>System</Label>
                      <Select value={form.system} onValueChange={(v) => update("system", v)}>
                        <SelectTrigger><SelectValue placeholder="Select system" /></SelectTrigger>
                        <SelectContent>
                          {systems.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your team and what you're looking to automate..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-destructive">{errorMsg}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit request <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}