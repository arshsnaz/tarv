import { useState } from "react";
import { X, ShieldCheck, Mail, ArrowRight, CheckCircle2, User, Lock, Building2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  UserSession
} from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: UserSession) => void;
  targetAddinId?: string;
  targetAddinName?: string;
  title?: string;
  subtitle?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  targetAddinId = "addin_clemp_excel",
  targetAddinName = "Team Productivity Report Excel Add-in (ClEmpAddIn)",
  title = "Sign In or Create Account to Purchase",
  subtitle = "Enter your work email and password to authenticate, complete your add-in purchase, and bind workstation seats."
}: AuthModalProps) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanEmail = formData.email.trim();

    if (!cleanEmail) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }

    if (!formData.password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    if (mode === "signup") {
      if (!formData.name.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (formData.password.length < 8) {
        setErrorMsg("Password must be at least 8 characters long.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match. Please re-enter your password.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const session = await signUpWithEmailAndPassword(
          formData.name,
          cleanEmail,
          formData.password,
          formData.company,
          targetAddinId,
          targetAddinName
        );
        setSuccessMsg("Account created successfully! Redirecting...");
        setTimeout(() => {
          onSuccess(session);
        }, 400);
      } else {
        const session = await signInWithEmailAndPassword(
          cleanEmail,
          formData.password
        );
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => {
          onSuccess(session);
        }, 400);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck size={13} />
            <span>TARV SSO Identity Gateway</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            {mode === "signup" ? "Create Account to Purchase" : "Sign In to Your Account"}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">{subtitle}</p>
        </div>

        {/* Tabs: Sign Up / Sign In */}
        <div className="flex rounded-2xl border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
            }}
            className={`w-1/2 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Account (New)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMsg("");
            }}
            className={`w-1/2 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In (Existing)
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-start gap-2">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email + Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Full Name <span className="text-cyan-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <User size={15} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">
              Work Email Address <span className="text-cyan-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. engineer@mep-firm.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail size={15} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">
              Password <span className="text-cyan-500">*</span>
              {mode === "signup" && <span className="text-[10px] font-normal text-muted-foreground ml-1.5">(min 8 characters)</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock size={15} className="absolute left-3 top-3 text-muted-foreground" />
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

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Confirm Password <span className="text-cyan-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Lock size={15} className="absolute left-3 top-3 text-muted-foreground" />
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

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Company / MEP Engineering Firm</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Horizon MEP Engineering Ltd"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <Building2 size={15} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2 mt-3"
          >
            <span>{loading ? "Authenticating..." : mode === "signup" ? "Create Account & Proceed" : "Sign In & Proceed"}</span>
            <ArrowRight size={14} />
          </Button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center pt-2 border-t border-border/80">
          <p className="text-xs text-muted-foreground font-medium">
            {mode === "signup" ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signup" ? "signin" : "signup");
                setErrorMsg("");
              }}
              className="text-cyan-500 dark:text-cyan-400 font-extrabold hover:underline ml-1 cursor-pointer"
            >
              {mode === "signup" ? "Sign In Here" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
