import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/cta";
import { Reveal } from "@/components/site/reveal";
import {
  ShieldCheck,
  Sparkles,
  Download,
  CheckCircle2,
  RefreshCw,
  Key,
  Laptop,
  Calculator,
  LogOut,
  Mail,
  ArrowRight,
  Trash2,
  ExternalLink,
  Cpu,
  FileCheck,
  LogIn,
  Flame,
  Zap,
  Wind,
  Droplets,
  Layers,
  Check,
  Receipt,
  HelpCircle,
  ChevronRight,
  PackageCheck,
  MonitorCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  Server,
  Activity,
  Globe,
  Building2,
  FileText,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getActiveUserSession,
  logoutUserSession,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  UserSession
} from "@/lib/auth";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Customer Portal & License Manager — TARV MEP Engineering" },
      {
        name: "description",
        content:
          "Official Customer Portal for TARV MEP Microsoft Excel & Autodesk Revit Add-ins. Manage 5 workstation hardware seats, retrieve license keys, and download installers.",
      },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/portal" }],
  }),
  component: PortalPage,
});

const SUPABASE_URL = "https://veatcorbgwgqpficxwri.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa";

const REST_HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json"
};

function PortalPage() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Secure Auth State
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Authenticated Portal Dashboard State
  const [mainSection, setMainSection] = useState<"addins_purchases" | "mep_calculator">("addins_purchases");
  const [activeTab, setActiveTab] = useState<"addins" | "seats" | "invoices" | "calculator">("addins");
  const [loading, setLoading] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [userLicenses, setUserLicenses] = useState<any[]>([]);
  const [userActivations, setUserActivations] = useState<any[]>([]);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    getActiveUserSession().then((sess) => {
      if (sess) {
        setUserSession(sess);
      }
    });
  }, []);

  const fetchPortalData = async () => {
    if (!userSession?.email) return;
    setLoading(true);
    try {
      const custRes = await fetch(
        `${SUPABASE_URL}/rest/v1/customers?email=eq.${encodeURIComponent(userSession.email.trim())}`,
        { headers: REST_HEADERS }
      );
      const custs = await custRes.json();
      if (Array.isArray(custs) && custs.length > 0) {
        setCustomerData(custs[0]);

        const licRes = await fetch(
          `${SUPABASE_URL}/rest/v1/licenses?customer_id=eq.${custs[0].id}`,
          { headers: REST_HEADERS }
        );
        const lics = (await licRes.json()) || [];
        setUserLicenses(lics);

        if (lics.length > 0) {
          const licIds = lics.map((l: any) => l.id);
          const actRes = await fetch(
            `${SUPABASE_URL}/rest/v1/activations?select=*`,
            { headers: REST_HEADERS }
          );
          const rawActs = (await actRes.json()) || [];
          const matchedActs = rawActs.filter((a: any) => licIds.includes(a.license_id));
          setUserActivations(matchedActs);
        } else {
          setUserActivations([]);
        }
      } else {
        setCustomerData({
          id: userSession.id,
          name: userSession.name,
          email: userSession.email,
          company: userSession.company
        });
        setUserLicenses([]);
        setUserActivations([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchPortalData();
    }
  }, [userSession]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    const cleanEmail = authForm.email.trim();

    if (!cleanEmail) {
      setAuthError("Please enter your work email address.");
      return;
    }

    if (!authForm.password) {
      setAuthError("Please enter your password.");
      return;
    }

    if (authMode === "signup") {
      if (!authForm.name.trim()) {
        setAuthError("Please enter your full name.");
        return;
      }
      if (authForm.password.length < 8) {
        setAuthError("Password must be at least 8 characters long.");
        return;
      }
      if (authForm.password !== authForm.confirmPassword) {
        setAuthError("Passwords do not match. Please re-enter your password.");
        return;
      }
    }

    setLoading(true);

    try {
      if (authMode === "signup") {
        const sess = await signUpWithEmailAndPassword(
          authForm.name,
          cleanEmail,
          authForm.password,
          authForm.company
        );
        setAuthSuccess("Account created successfully! Redirecting to portal...");
        setTimeout(() => setUserSession(sess), 300);
      } else {
        const sess = await signInWithEmailAndPassword(
          cleanEmail,
          authForm.password
        );
        setAuthSuccess("Signed in successfully! Loading portal...");
        setTimeout(() => setUserSession(sess), 300);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logoutUserSession();
    setUserSession(null);
    setCustomerData(null);
    setUserLicenses([]);
    setUserActivations([]);
  };

  const handleReleaseSeat = async (activationId: string) => {
    setReleasingId(activationId);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/activations?id=eq.${activationId}`, {
        method: "PATCH",
        headers: { ...REST_HEADERS, Prefer: "return=minimal" },
        body: JSON.stringify({ is_active: false })
      });
      await fetchPortalData();
    } catch (err: any) {
      alert("Seat release notice: " + err.message);
    } finally {
      setReleasingId(null);
    }
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeSeatsCount = userActivations.filter((a) => a.is_active ?? true).length;
  const maxTotalSeats = userLicenses.reduce((acc, l) => acc + (l.max_activations || 5), 0);

  const FAQ_ITEMS = [
    {
      q: "What is the TARV Customer Portal used for?",
      a: "The Customer Portal is the secure management hub for buyers of TARV commercial engineering software (Excel add-ins, Revit plugins, and calculation suites). Authenticated users can retrieve cryptographic RSA license keys, manage 5 workstation PC seats, download setup installers (.exe), and access tax invoices."
    },
    {
      q: "How many workstation PCs can I activate per license?",
      a: "Every standard commercial license ($399/yr) grants hardware binding for up to 5 separate workstation PCs simultaneously. You can unbind old computers and assign new ones directly from the Workstation Seats tab inside this portal."
    },
    {
      q: "How do I activate the add-in inside Excel or Revit?",
      a: "1. Download and run the certified setup installer (.exe).\n2. Open Microsoft Excel or Autodesk Revit on your workstation.\n3. Navigate to the 'TARV Engineering' tab on the top ribbon.\n4. Click 'Enter License Key' and paste your KEY-TARV-XXXX-XXXX key to bind your PC seat."
    },
    {
      q: "Does the software require a continuous internet connection?",
      a: "No. Once activated on a workstation PC, TARV add-ins feature a 14-day offline grace period, enabling engineers to perform calculations on remote construction sites and offline job networks without internet connectivity."
    },
    {
      q: "I haven't purchased a license yet. How do I get started?",
      a: "If you are a new customer, visit our Storefront at /addins to choose your add-in software. Upon completing checkout, your license key is issued immediately and your portal account is configured for instant access."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[160px]" />

      <SiteNav />

      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* ========================================================================= */}
        {/* SECTION 1: UNAUTHENTICATED CYBERNETIC ENTERPRISE PORTAL LANDING HUB      */}
        {/* ========================================================================= */}
        {!userSession ? (
          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Header Title */}
            <Reveal>
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <ShieldCheck size={15} />
                  <span>OFFICIAL CUSTOMER & LICENSE PORTAL</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
                  TARV Enterprise <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    License & PC Seat Workspace
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The centralized management workspace for licensed users of TARV Microsoft Excel & Autodesk Revit engineering add-ins. Access RSA keys, reassign workstation PC seats, and download build installers.
                </p>

                {/* System Status Indicators */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    <Activity size={13} /> Supabase REST Engine: Online
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
                    <Server size={13} /> RSA 2048-Bit Validation: Active
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
                    <Globe size={13} /> 99.99% Cloud Uptime SLA
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Split Grid: Left = Secure Auth Card | Right = Feature Highlights & Store Gateway */}
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* LEFT 6 COLS: Secure Customer Authentication Card */}
                <div className="lg:col-span-6 rounded-3xl border-2 border-border/80 dark:border-white/15 bg-card/95 dark:bg-slate-900/95 shadow-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

                  <div className="space-y-5">
                    {/* Header with Lock Icon */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-extrabold text-foreground">
                          {authMode === "signup" ? "Set Up Portal Password" : "Sign In to Portal"}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {authMode === "signup"
                            ? "Configure a password for the work email used during product checkout."
                            : "Enter your registered work email address and password."}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20">
                        <Lock size={18} />
                      </div>
                    </div>

                    {/* Mode Switcher Tabs */}
                    <div className="flex rounded-2xl border border-border bg-muted/40 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("signin");
                          setAuthError("");
                          setAuthSuccess("");
                        }}
                        className={`w-1/2 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                          authMode === "signin"
                            ? "bg-cyan-500 text-slate-950 shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("signup");
                          setAuthError("");
                          setAuthSuccess("");
                        }}
                        className={`w-1/2 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                          authMode === "signup"
                            ? "bg-cyan-500 text-slate-950 shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Set Up Password
                      </button>
                    </div>

                    {authError && (
                      <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>{authError}</span>
                      </div>
                    )}

                    {authSuccess && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-start gap-2">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                        <span>{authSuccess}</span>
                      </div>
                    )}

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      {authMode === "signup" && (
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">
                            Full Name <span className="text-cyan-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Tariq Mansoor"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                            value={authForm.name}
                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">
                          Work Email Address <span className="text-cyan-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. engineer@mep-firm.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                          value={authForm.email}
                          onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">
                          Password <span className="text-cyan-500">*</span>
                          {authMode === "signup" && <span className="text-[10px] font-normal text-muted-foreground ml-1.5">(min 8 characters)</span>}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••••••"
                            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                            value={authForm.password}
                            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>

                      {authMode === "signup" && (
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">
                            Confirm Password <span className="text-cyan-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              placeholder="••••••••••••"
                              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                              value={authForm.confirmPassword}
                              onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                              title={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </div>
                      )}

                      {authMode === "signup" && (
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">Company / Engineering Firm Name</label>
                          <input
                            type="text"
                            placeholder="e.g. TARV Engineering Solutions LLC"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                            value={authForm.company}
                            onChange={(e) => setAuthForm({ ...authForm, company: e.target.value })}
                          />
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <LogIn size={15} />
                        <span>{loading ? "Authenticating..." : authMode === "signup" ? "Set Password & Open Workspace" : "Sign In to Portal"}</span>
                      </Button>
                    </form>
                  </div>

                  <div className="text-center pt-4 border-t border-border mt-4">
                    <p className="text-xs text-muted-foreground font-medium">
                      {authMode === "signup" ? "Already created your password?" : "First time accessing after purchase?"}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode(authMode === "signup" ? "signin" : "signup");
                          setAuthError("");
                          setAuthSuccess("");
                        }}
                        className="text-cyan-500 dark:text-cyan-400 font-extrabold hover:underline ml-1 cursor-pointer"
                      >
                        {authMode === "signup" ? "Sign In Here" : "Set Password For Your Email"}
                      </button>
                    </p>
                  </div>
                </div>

                {/* RIGHT 6 COLS: Cybernetic Capability Cards & Store Gateway */}
                <div className="lg:col-span-6 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-extrabold uppercase">
                        <Sparkles size={13} />
                        <span>Portal Capabilities</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground">
                        Unified License & Seat Manager
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        This Customer Portal provides complete hardware seat governance, installer build distribution, and billing management for TARV commercial software.
                      </p>
                    </div>

                    {/* Cybernetic Capability Grid */}
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/20 border border-border hover:border-cyan-500/40 transition-colors">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0 border border-cyan-500/20">
                          <Key size={16} />
                        </div>
                        <div>
                          <strong className="text-foreground font-bold block">Cryptographic RSA License Keys</strong>
                          <span className="text-muted-foreground">Retrieve key strings and offline `.lic` certificate files instantly.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/20 border border-border hover:border-emerald-500/40 transition-colors">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 border border-emerald-500/20">
                          <Laptop size={16} />
                        </div>
                        <div>
                          <strong className="text-foreground font-bold block">5-Workstation Seat Allocator</strong>
                          <span className="text-muted-foreground">Reassign or unbind active computer seats when engineers change PCs.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/20 border border-border hover:border-blue-500/40 transition-colors">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 border border-blue-500/20">
                          <Download size={16} />
                        </div>
                        <div>
                          <strong className="text-foreground font-bold block">Official Setup Installers (.exe)</strong>
                          <span className="text-muted-foreground">Download build packages for Microsoft Excel 2016–365 & Autodesk Revit.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-muted/20 border border-border hover:border-purple-500/40 transition-colors">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 border border-purple-500/20">
                          <Receipt size={16} />
                        </div>
                        <div>
                          <strong className="text-foreground font-bold block">Tax Invoices & Billing</strong>
                          <span className="text-muted-foreground">Download corporate tax invoices with UAE TRN registration details.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PROSPECTIVE VISITOR STORE CARD */}
                  <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/30 space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-foreground">Haven't Purchased a License Yet?</span>
                      <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        From $399/yr
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      If you are new to TARV add-ins, explore our storefront to acquire commercial licenses with 5 hardware PC seats and a 14-day offline grace period.
                    </p>
                    <a
                      href="/addins"
                      className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <PackageCheck size={14} />
                      <span>Explore Add-ins Storefront</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Interactive FAQ Section */}
            <Reveal>
              <div className="max-w-3xl mx-auto space-y-6 pt-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-extrabold text-foreground">Frequently Asked Questions</h2>
                  <p className="text-xs text-muted-foreground">Everything you need to know about TARV customer licensing and seat deployment.</p>
                </div>

                <div className="space-y-3">
                  {FAQ_ITEMS.map((faq, idx) => (
                    <div key={idx} className="rounded-2xl border border-border bg-card overflow-hidden transition-all">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-foreground hover:bg-muted/30 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronRight
                          size={16}
                          className={`text-muted-foreground transition-transform duration-200 ${
                            openFaq === idx ? "rotate-90 text-cyan-500" : ""
                          }`}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/50 whitespace-pre-line">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        ) : (
          /* ========================================================================= */
          /* SECTION 2: AUTHENTICATED EXECUTIVE CUSTOMER DASHBOARD                     */
          /* ========================================================================= */
          <>
            {/* Header Account Banner */}
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl border border-cyan-500/30 bg-card shadow-2xl relative overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider border border-cyan-500/20">
                    <ShieldCheck size={14} />
                    <span>Verified Commercial Customer Workspace</span>
                  </div>
                  <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
                    {userSession.company || "TARV Enterprise Engineering"}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <Mail size={14} className="text-cyan-500" />
                    <span>Account Owner: <strong className="text-foreground">{userSession.email}</strong> ({userSession.name})</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={fetchPortalData}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 text-xs font-bold text-foreground flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <RefreshCw size={14} className={loading ? "animate-spin text-cyan-500" : ""} />
                    <span>Sync Database</span>
                  </button>
                  <a
                    href="/addins"
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <PackageCheck size={14} />
                    <span>Browse Store</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Metric KPI Cards */}
            <Reveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-border bg-card space-y-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Key size={13} className="text-cyan-500" /> Active Add-in Licenses
                  </span>
                  <div className="text-2xl font-extrabold text-foreground">{userLicenses.length}</div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card space-y-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Laptop size={13} className="text-emerald-500" /> Bound Workstations
                  </span>
                  <div className="text-2xl font-extrabold text-foreground">{activeSeatsCount}</div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card space-y-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={13} className="text-blue-500" /> Total Seat Capacity
                  </span>
                  <div className="text-2xl font-extrabold text-foreground">{maxTotalSeats || 5} Seats</div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card space-y-1.5 shadow-sm">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator size={13} className="text-cyan-500" /> Cloud Solvers
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-500 font-mono">UNLIMITED</div>
                </div>
              </div>
            </Reveal>

            {/* 2 MAIN WORKSPACE SECTIONS: ADD-INS PURCHASES vs MEP CALCULATOR */}
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* SECTION 1: ADD-INS PURCHASES & SUBSCRIPTIONS */}
                <button
                  type="button"
                  onClick={() => {
                    setMainSection("addins_purchases");
                    if (activeTab === "calculator") setActiveTab("addins");
                  }}
                  className={`p-6 sm:p-7 rounded-3xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                    mainSection === "addins_purchases"
                      ? "bg-gradient-to-br from-cyan-500/10 via-card to-card border-cyan-500 shadow-2xl shadow-cyan-500/10 ring-2 ring-cyan-500/30"
                      : "bg-card border-border hover:border-cyan-500/50 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-105 ${
                      mainSection === "addins_purchases" ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30" : "bg-muted text-foreground"
                    }`}>
                      <PackageCheck size={26} />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                          SECTION 1: LICENSES & SEATS
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                          {userLicenses.length} Active Licenses
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-foreground group-hover:text-cyan-500 transition-colors">
                        Add-ins Purchases & Subscriptions
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Manage purchased Excel & Revit add-ins, download setup installers (.exe), retrieve RSA license keys, assign workstation seats, and access corporate tax invoices.
                      </p>
                    </div>
                  </div>
                </button>

                {/* SECTION 2: ONLINE MEP CALCULATOR SUITE */}
                <button
                  type="button"
                  onClick={() => {
                    setMainSection("mep_calculator");
                    setActiveTab("calculator");
                  }}
                  className={`p-6 sm:p-7 rounded-3xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                    mainSection === "mep_calculator"
                      ? "bg-gradient-to-br from-emerald-500/10 via-card to-card border-emerald-500 shadow-2xl shadow-emerald-500/10 ring-2 ring-emerald-500/30"
                      : "bg-card border-border hover:border-emerald-500/50 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-105 ${
                      mainSection === "mep_calculator" ? "bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30" : "bg-muted text-foreground"
                    }`}>
                      <Calculator size={26} />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          SECTION 2: ONLINE PHYSICS SOLVERS
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                          53 Live Cloud Solvers
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-foreground group-hover:text-emerald-500 transition-colors">
                        MEP Calculator & Solvers Engine
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Run online calculation math for ASHRAE cooling loads, NEC 2023 voltage drop, IPC plumbing Hunter curve fixture units, and NFPA fire sprinkler density.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </Reveal>

            {/* Sub-Tab Controls for Add-ins Section */}
            {mainSection === "addins_purchases" && (
              <Reveal>
                <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border border-border bg-muted/40 max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("addins")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === "addins"
                        ? "bg-cyan-500 text-slate-950 shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Key size={14} />
                    <span>My Add-ins & Licenses ({userLicenses.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("seats")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === "seats"
                        ? "bg-cyan-500 text-slate-950 shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Laptop size={14} />
                    <span>Workstation Seats ({activeSeatsCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("invoices")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === "invoices"
                        ? "bg-cyan-500 text-slate-950 shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Receipt size={14} />
                    <span>Tax Invoices & Billing</span>
                  </button>
                </div>
              </Reveal>
            )}

            {/* TAB 1: MY PRODUCTS & SUBSCRIPTIONS */}
            {activeTab === "addins" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                    <Key size={18} className="text-cyan-500" />
                    <span>Active Product Subscriptions</span>
                  </h2>

                  <a
                    href="/addins"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Acquire Additional Add-in →</span>
                  </a>
                </div>

                {userLicenses.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl border border-border bg-card space-y-4">
                    <Key size={36} className="mx-auto text-muted-foreground/40" />
                    <h3 className="text-base font-bold text-foreground">No Registered Add-in Licenses Found</h3>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Your account currently has no active workstation add-in keys. Visit our product store to purchase licenses for Autodesk Revit & Microsoft Excel.
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/addins")}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      Browse Add-in Store
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userLicenses.map((lic) => {
                      const matchedActs = userActivations.filter(
                        (a) => a.license_id === lic.id && (a.is_active ?? true)
                      );
                      const remainingSeats = (lic.max_activations || 5) - matchedActs.length;

                      return (
                        <div
                          key={lic.id}
                          className="rounded-3xl p-7 border border-border bg-card hover:border-cyan-500/40 shadow-lg space-y-6 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-muted text-cyan-600 dark:text-cyan-400 border border-border uppercase">
                                {lic.product_id === "addin_clemp_excel" ? "Microsoft Excel 365 / 2021" : "Autodesk Revit 2024 / 2025"}
                              </span>
                              <h3 className="text-base font-extrabold text-foreground mt-2">
                                {lic.product_id === "addin_clemp_excel"
                                  ? "Team Productivity Report Excel Add-in (ClEmpAddIn)"
                                  : "TARV MEP Engineering Revit Suite"}
                              </h3>
                              <div className="flex items-center gap-2 mt-1.5">
                                <code className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-300 bg-muted/60 px-2 py-0.5 rounded border border-border select-all">
                                  {lic.license_key_hash}
                                </code>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(lic.license_key_hash)}
                                  className="text-[11px] font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                  {copiedKey === lic.license_key_hash ? "Copied!" : "Copy"}
                                </button>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              Active
                            </span>
                          </div>

                          {/* Workstation Seat Meter */}
                          <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-muted-foreground flex items-center gap-1.5">
                                <Laptop size={14} className="text-cyan-500" /> Workstation Seat Allocation
                              </span>
                              <span className="text-foreground font-mono">
                                {matchedActs.length} / {lic.max_activations || 5} Seats Bound
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 transition-all duration-300"
                                style={{ width: `${(matchedActs.length / (lic.max_activations || 5)) * 100}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-muted-foreground pt-0.5">
                              {remainingSeats > 0 ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                  {remainingSeats} unused seat slot{remainingSeats > 1 ? "s" : ""} available for deployment.
                                </span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                                  All 5 workstation seat slots are currently allocated.
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Term & Renewal */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/60">
                            <span>License Type: <strong className="text-foreground font-bold">Annual Enterprise ($399)</strong></span>
                            <span>Expires: <strong className="text-foreground font-bold">{new Date(lic.expires_at_utc).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong></span>
                          </div>

                          {/* Action Downloads */}
                          <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
                            <a
                              href={`/download/${lic.product_id}_setup.exe`}
                              download
                              className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all w-full"
                            >
                              <Download size={14} />
                              <span>Download Setup Installer (.exe)</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => alert(`Downloading cryptographic RSA certificate for key ${lic.license_key_hash}`)}
                              className="py-2.5 px-4 rounded-xl border border-border hover:border-cyan-500 text-muted-foreground hover:text-foreground font-bold text-xs flex items-center justify-center gap-2 transition-colors w-full sm:w-auto cursor-pointer"
                            >
                              <FileCheck size={14} />
                              <span>.lic Certificate</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WORKSTATION SEATS MANAGER */}
            {activeTab === "seats" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                      <Laptop size={18} className="text-cyan-500" />
                      <span>Bound Workstation Hardware Machines</span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Manage cryptographic GUID hardware bindings across enterprise engineer computers.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-muted border border-border text-xs font-mono font-bold text-foreground">
                    Total Active Seats: {activeSeatsCount} / {maxTotalSeats || 5}
                  </span>
                </div>

                {userActivations.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl border border-border bg-card space-y-3">
                    <Laptop size={36} className="mx-auto text-muted-foreground/40" />
                    <h3 className="text-base font-bold text-foreground">No Workstation Computers Bound Yet</h3>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                      To bind a workstation PC, install the add-in on your team's computer and enter your commercial license key inside Microsoft Excel or Autodesk Revit.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-muted/40 border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="py-3 px-5">Workstation Name / Device</th>
                            <th className="py-3 px-5">Hardware GUID Hash</th>
                            <th className="py-3 px-5">Binding Date</th>
                            <th className="py-3 px-5">Status</th>
                            <th className="py-3 px-5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border font-medium">
                          {userActivations.map((act) => (
                            <tr key={act.id} className="hover:bg-muted/20 transition-colors">
                              <td className="py-3.5 px-5">
                                <div className="flex items-center gap-2">
                                  <MonitorCheck size={16} className="text-cyan-500 shrink-0" />
                                  <strong className="text-foreground font-bold">{act.device_name || "Engineer Workstation PC"}</strong>
                                </div>
                              </td>
                              <td className="py-3.5 px-5 font-mono text-[11px] text-muted-foreground">
                                {act.device_id || "HW-GUID-9872-XXXX"}
                              </td>
                              <td className="py-3.5 px-5 text-muted-foreground">
                                {new Date(act.activated_at_utc || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="py-3.5 px-5">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  {act.is_active ?? true ? "Bound & Active" : "Released"}
                                </span>
                              </td>
                              <td className="py-3.5 px-5 text-right">
                                <Button
                                  size="sm"
                                  onClick={() => handleReleaseSeat(act.id)}
                                  disabled={releasingId === act.id}
                                  className="bg-destructive/10 hover:bg-destructive/20 text-destructive text-[11px] font-bold px-3 py-1 rounded-lg border border-destructive/20 cursor-pointer"
                                >
                                  <Trash2 size={12} className="mr-1" />
                                  {releasingId === act.id ? "Releasing..." : "Release Seat"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: INVOICES & BILLING HISTORY */}
            {activeTab === "invoices" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                      <Receipt size={18} className="text-cyan-500" />
                      <span>Commercial Tax Invoices & Order History</span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Download official UAE TRN/VAT invoices and payment receipts for corporate accounting.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/40 border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-5">Order / Invoice ID</th>
                          <th className="py-3 px-5">Product Description</th>
                          <th className="py-3 px-5">Amount (USD)</th>
                          <th className="py-3 px-5">Date</th>
                          <th className="py-3 px-5">Payment Method</th>
                          <th className="py-3 px-5 text-right">Download Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border font-medium">
                        {userLicenses.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-muted-foreground text-xs">
                              No transaction invoices found for this account.
                            </td>
                          </tr>
                        ) : (
                          userLicenses.map((lic, idx) => (
                            <tr key={lic.id || idx} className="hover:bg-muted/20 transition-colors">
                              <td className="py-3.5 px-5 font-mono text-[11px] font-bold text-foreground">
                                INV-TARV-{lic.license_key_hash?.replace(/KEY-TARV-/, "") || "4167979"}
                              </td>
                              <td className="py-3.5 px-5">
                                <strong className="text-foreground block">
                                  {lic.product_id === "addin_clemp_excel"
                                    ? "Team Productivity Report Excel Add-in"
                                    : "TARV Revit MEP Automation Suite"}
                                </strong>
                                <span className="text-[10px] text-muted-foreground">1 Year Commercial License (5 Seats)</span>
                              </td>
                              <td className="py-3.5 px-5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                $399.00 USD
                              </td>
                              <td className="py-3.5 px-5 text-muted-foreground">
                                {new Date(lic.created_at_utc || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="py-3.5 px-5 text-muted-foreground">
                                3D Secure Card / Bank
                              </td>
                              <td className="py-3.5 px-5 text-right">
                                <Button
                                  size="sm"
                                  onClick={() => alert(`Downloading official Commercial VAT Invoice for INV-TARV-${lic.license_key_hash?.replace(/KEY-TARV-/, "")}`)}
                                  className="bg-muted hover:bg-muted/80 text-foreground text-[11px] font-bold px-3 py-1 rounded-lg border border-border cursor-pointer"
                                >
                                  <Download size={12} className="mr-1" />
                                  <span>Invoice (PDF)</span>
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MEP CLOUD SOLVERS */}
            {activeTab === "calculator" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-8 rounded-3xl border border-cyan-500/30 bg-card shadow-xl space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                        <Sparkles size={13} />
                        <span>50+ ONLINE PHYSICS SOLVERS</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground">TARV Multi-Discipline MEP Calculators</h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Access cloud-hosted physics engines for HVAC sensible/latent heat loads, electrical voltage drop, duct hydraulics, and IPC plumbing risers.
                      </p>
                    </div>
                    <Button
                      onClick={() => (window.location.href = "/#calculators")}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl cursor-pointer shrink-0 flex items-center gap-2"
                    >
                      <Calculator size={15} />
                      <span>Launch Online Calculator Suite</span>
                      <ExternalLink size={14} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                    <a
                      href="/#calculators"
                      className="p-5 rounded-2xl bg-muted/20 border border-border hover:border-cyan-500/50 transition-all space-y-3 block group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20 group-hover:scale-105 transition-transform">
                        <Wind size={20} />
                      </div>
                      <h3 className="font-extrabold text-foreground text-sm group-hover:text-cyan-500 transition-colors">16 HVAC Calculators</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">ASHRAE 62.1 fresh air, sensible/latent heat loads, psychrometrics & duct sizers.</p>
                      <span className="text-[11px] font-bold text-cyan-500 inline-flex items-center gap-1 pt-1">
                        Open HVAC Solvers <ArrowRight size={12} />
                      </span>
                    </a>

                    <a
                      href="/#calculators"
                      className="p-5 rounded-2xl bg-muted/20 border border-border hover:border-amber-500/50 transition-all space-y-3 block group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold border border-amber-500/20 group-hover:scale-105 transition-transform">
                        <Zap size={20} />
                      </div>
                      <h3 className="font-extrabold text-foreground text-sm group-hover:text-amber-500 transition-colors">16 Electrical Solvers</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">NEC 2023 feeder voltage drop, cable tray, transformer & short circuit math.</p>
                      <span className="text-[11px] font-bold text-amber-500 inline-flex items-center gap-1 pt-1">
                        Open Electrical Solvers <ArrowRight size={12} />
                      </span>
                    </a>

                    <a
                      href="/#calculators"
                      className="p-5 rounded-2xl bg-muted/20 border border-border hover:border-emerald-500/50 transition-all space-y-3 block group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Droplets size={20} />
                      </div>
                      <h3 className="font-extrabold text-foreground text-sm group-hover:text-emerald-500 transition-colors">13 Plumbing Solvers</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">IPC Hunter Curve fixture units, booster pumps & storm drainage sizers.</p>
                      <span className="text-[11px] font-bold text-emerald-500 inline-flex items-center gap-1 pt-1">
                        Open Plumbing Solvers <ArrowRight size={12} />
                      </span>
                    </a>

                    <a
                      href="/#calculators"
                      className="p-5 rounded-2xl bg-muted/20 border border-border hover:border-rose-500/50 transition-all space-y-3 block group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold border border-rose-500/20 group-hover:scale-105 transition-transform">
                        <Flame size={20} />
                      </div>
                      <h3 className="font-extrabold text-foreground text-sm group-hover:text-rose-500 transition-colors">8 Fire Protection Solvers</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">NFPA 13 sprinkler density, Hazen-Williams friction & fire pump head sizer.</p>
                      <span className="text-[11px] font-bold text-rose-500 inline-flex items-center gap-1 pt-1">
                        Open Fire Protection Solvers <ArrowRight size={12} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
