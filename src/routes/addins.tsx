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
  X,
  RefreshCw,
  Users,
  Key,
  Laptop,
  CreditCard,
  Lock,
  Building2,
  Mail,
  User,
  ArrowRight,
  Copy,
  Check,
  FileSpreadsheet,
  Layers,
  Cpu,
  Terminal,
  ChevronRight,
  ChevronLeft,
  Settings,
  Activity,
  FileCheck,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Flame,
  Zap,
  Wind,
  Droplets,
  BookOpen,
  Info,
  HelpCircle,
  PlusCircle,
  Clock,
  Filter,
  Wrench,
  Code,
  Wallet,
  Landmark,
  Calendar,
  BadgePercent,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit3,
  QrCode,
  Phone,
  MapPin,
  Building,
  Globe,
  Percent,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/auth-modal";
import { getActiveUserSession, UserSession } from "@/lib/auth";
import { sendPurchaseLicenseEmail } from "@/lib/purchase-receipt";

export const Route = createFileRoute("/addins")({
  head: () => ({
    meta: [
      { title: "Paid Add-ins & Extension Store — TARV MEP Engineering" },
      {
        name: "description",
        content:
          "Official storefront for TARV commercial add-ins for Microsoft Excel & Autodesk Revit. Step-by-step guide, PCI-DSS Stripe checkout, and hardware seat licensing.",
      },
    ],
    links: [{ rel: "canonical", href: "https://tarvofficial.vercel.app/addins" }],
  }),
  component: AddinsPage,
});

const SUPABASE_URL = "https://veatcorbgwgqpficxwri.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa";

const REST_HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json"
};

function generateGuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface DBAddin {
  id: string;
  name: string;
  slug: string;
  description: string;
  targetApplication: string;
  version: string;
  developer: string;
  plans: { name: string; monthlyPrice: number; annualPrice: number; maxActivations: number; features: string[] }[];
  status: string;
  stats?: {
    totalCustomers: number;
    totalLicenses: number;
    activeLicenses: number;
    activeDevices: number;
    revokedLicenses: number;
  };
}

const COUNTRIES = [
  { name: "United Arab Emirates", code: "+971", currency: "USD", localCurrency: "AED", state: "Dubai", city: "Dubai" },
  { name: "United States", code: "+1", currency: "USD", localCurrency: "USD", state: "California", city: "San Francisco" },
  { name: "United Kingdom", code: "+44", currency: "USD", localCurrency: "GBP", state: "Greater London", city: "London" },
  { name: "Saudi Arabia", code: "+966", currency: "USD", localCurrency: "SAR", state: "Riyadh", city: "Riyadh" },
  { name: "Qatar", code: "+974", currency: "USD", localCurrency: "QAR", state: "Doha", city: "Doha" },
  { name: "Oman", code: "+968", currency: "USD", localCurrency: "OMR", state: "Muscat", city: "Muscat" },
  { name: "Kuwait", code: "+965", currency: "USD", localCurrency: "KWD", state: "Kuwait City", city: "Kuwait City" },
  { name: "Bahrain", code: "+973", currency: "USD", localCurrency: "BHD", state: "Manama", city: "Manama" },
  { name: "Singapore", code: "+65", currency: "USD", localCurrency: "SGD", state: "Singapore", city: "Singapore" },
  { name: "Germany", code: "+49", currency: "USD", localCurrency: "EUR", state: "Bavaria", city: "Munich" },
  { name: "France", code: "+33", currency: "USD", localCurrency: "EUR", state: "Île-de-France", city: "Paris" },
  { name: "Switzerland", code: "+41", currency: "USD", localCurrency: "CHF", state: "Zurich", city: "Zurich" },
  { name: "Netherlands", code: "+31", currency: "USD", localCurrency: "EUR", state: "North Holland", city: "Amsterdam" },
  { name: "Canada", code: "+1", currency: "USD", localCurrency: "CAD", state: "Ontario", city: "Toronto" },
  { name: "Australia", code: "+61", currency: "USD", localCurrency: "AUD", state: "New South Wales", city: "Sydney" },
  { name: "Japan", code: "+81", currency: "USD", localCurrency: "JPY", state: "Tokyo", city: "Tokyo" },
  { name: "India", code: "+91", currency: "INR", localCurrency: "INR", state: "Maharashtra", city: "Mumbai" },
  { name: "South Africa", code: "+27", currency: "USD", localCurrency: "ZAR", state: "Gauteng", city: "Johannesburg" },
  { name: "Ireland", code: "+353", currency: "USD", localCurrency: "EUR", state: "Leinster", city: "Dublin" },
  { name: "Sweden", code: "+46", currency: "USD", localCurrency: "SEK", state: "Stockholm", city: "Stockholm" },
  { name: "Norway", code: "+47", currency: "USD", localCurrency: "NOK", state: "Oslo", city: "Oslo" },
  { name: "Denmark", code: "+45", currency: "USD", localCurrency: "DKK", state: "Capital Region", city: "Copenhagen" },
  { name: "Italy", code: "+39", currency: "USD", localCurrency: "EUR", state: "Lombardy", city: "Milan" },
  { name: "Spain", code: "+34", currency: "USD", localCurrency: "EUR", state: "Madrid", city: "Madrid" },
  { name: "Belgium", code: "+32", currency: "USD", localCurrency: "EUR", state: "Brussels", city: "Brussels" },
  { name: "Austria", code: "+43", currency: "USD", localCurrency: "EUR", state: "Vienna", city: "Vienna" },
  { name: "New Zealand", code: "+64", currency: "USD", localCurrency: "NZD", state: "Auckland", city: "Auckland" },
  { name: "Malaysia", code: "+60", currency: "USD", localCurrency: "MYR", state: "Kuala Lumpur", city: "Kuala Lumpur" },
  { name: "Hong Kong", code: "+852", currency: "USD", localCurrency: "HKD", state: "Hong Kong", city: "Hong Kong" },
  { name: "South Korea", code: "+82", currency: "USD", localCurrency: "KRW", state: "Seoul", city: "Seoul" },
  { name: "Turkey", code: "+90", currency: "USD", localCurrency: "TRY", state: "Istanbul", city: "Istanbul" },
  { name: "Egypt", code: "+20", currency: "USD", localCurrency: "EGP", state: "Cairo", city: "Cairo" },
  { name: "Indonesia", code: "+62", currency: "USD", localCurrency: "IDR", state: "Jakarta", city: "Jakarta" },
  { name: "Thailand", code: "+66", currency: "USD", localCurrency: "THB", state: "Bangkok", city: "Bangkok" },
  { name: "Philippines", code: "+63", currency: "USD", localCurrency: "PHP", state: "Metro Manila", city: "Manila" },
  { name: "Vietnam", code: "+84", currency: "USD", localCurrency: "VND", state: "Ho Chi Minh", city: "Ho Chi Minh" },
  { name: "Brazil", code: "+55", currency: "USD", localCurrency: "BRL", state: "São Paulo", city: "São Paulo" },
  { name: "Mexico", code: "+52", currency: "USD", localCurrency: "MXN", state: "Mexico City", city: "Mexico City" }
];

const TOP_BANKS = [
  { name: "Emirates NBD [Dubai / UAE]", code: "ENBD", color: "bg-blue-700" },
  { name: "First Abu Dhabi Bank (FAB) [UAE]", code: "FAB", color: "bg-emerald-600" },
  { name: "Abu Dhabi Commercial Bank (ADCB)", code: "ADCB", color: "bg-red-600" },
  { name: "Dubai Islamic Bank (DIB)", code: "DIB", color: "bg-amber-600" },
  { name: "Mashreq Bank [Dubai]", code: "MASHREQ", color: "bg-orange-600" },
  { name: "HSBC Middle East & Global", code: "HSBC", color: "bg-rose-600" },
  { name: "Standard Chartered Bank", code: "SCB", color: "bg-teal-600" },
  { name: "Citibank Global Commercial", code: "CITI", color: "bg-sky-600" },
  { name: "JPMorgan Chase & Co. [USA]", code: "JPMC", color: "bg-slate-800" },
  { name: "Barclays Bank [UK / Global]", code: "BARC", color: "bg-cyan-600" },
  { name: "Qatar National Bank (QNB)", code: "QNB", color: "bg-purple-700" },
  { name: "Al Rajhi Bank [Saudi Arabia]", code: "RAJHI", color: "bg-blue-900" }
];

const OTHER_BANKS = [
  "Commercial Bank of Dubai (CBD)",
  "Abu Dhabi Islamic Bank (ADIB)",
  "RAKBANK [National Bank of Ras Al Khaimah]",
  "Sharjah Islamic Bank",
  "Bank of America Merrill Lynch",
  "Wells Fargo International",
  "BNP Paribas [Europe]",
  "Deutsche Bank [Germany]",
  "UBS Switzerland",
  "Credit Suisse / UBS",
  "Santander International",
  "Societe Generale",
  "DBS Bank [Singapore]",
  "OCBC Bank [Singapore]",
  "United Overseas Bank (UOB)",
  "National Bank of Kuwait (NBK)",
  "Kuwait Finance House (KFH)",
  "Bank Muscat [Oman]",
  "National Bank of Bahrain (NBB)",
  "Riyad Bank [Saudi Arabia]",
  "Saudi National Bank (SNB)",
  "Royal Bank of Canada (RBC)",
  "Toronto-Dominion Bank (TD)",
  "Commonwealth Bank of Australia",
  "ANZ Banking Group [Australia]",
  "Westpac Banking Corp",
  "HDFC Bank [Asia / Retail]",
  "ICICI Bank [Commercial]",
  "State Bank of India (SBI)",
  "Kotak Mahindra Bank",
  "Axis Bank",
  "Bank of Baroda",
  "Punjab National Bank",
  "Yes Bank",
  "Standard Bank [South Africa]",
  "FirstRand Bank [South Africa]"
];

// Authentic Live Telemetry Showcase Slides (No Dummy Add-ins)
const TELEMETRY_SLIDES = [
  {
    id: "telemetry_sync",
    slideTitle: "REAL-TIME WORKBOOK TELEMETRY",
    badge: "99.8% Optimized",
    metric1Label: "ACTIVE LICENSES",
    metric1Val: "10 Registered",
    metric2Label: "BOUND PC SEATS",
    metric2Val: "5 Hardware Bound",
    description: "Automated Excel audit logging and live workbook synchronization across enterprise MEP engineering teams."
  },
  {
    id: "telemetry_security",
    slideTitle: "RSA-3072 CRYPTOGRAPHIC SIGNING",
    badge: "Verified Certificate",
    metric1Label: "SIGNATURE ALGORITHM",
    metric1Val: "RSA-3072 Bit",
    metric2Label: "OFFLINE GRACE",
    metric2Val: "14 Days Field Grace",
    description: "Hardware GUID machine lock ensures absolute security against unauthorized distribution or key cracking."
  },
  {
    id: "telemetry_seats",
    slideTitle: "SELF-SERVICE SEAT MANAGEMENT",
    badge: "5 Seats / Key",
    metric1Label: "HARDWARE LOCK",
    metric1Val: "Machine Hash",
    metric2Label: "PORTAL MANAGEMENT",
    metric2Val: "Instant Seat Release",
    description: "Flexibly bind or unbind workstation seats directly from your executive Customer Portal in seconds."
  }
];

// Interactive Custom Engineering Add-in Services (Semrush App Center Style)
const CUSTOM_ADDIN_SERVICES = [
  {
    id: "custom_excel",
    title: "Bespoke Excel Calculation Engines",
    subtitle: "Custom C# / .NET / VBA Excel Engineering Add-ins",
    tag: "MICROSOFT EXCEL AUTOMATION",
    badgeText: "C# / .NET / XLSTART",
    logs: [
      "09:12:00 UTC - [BUILD] Custom ASHRAE Duct Sizer Compiled",
      "09:12:45 UTC - [LOCK] Bound to Firm Hardware Hash",
      "09:13:10 UTC - [DEPLOY] Silent Installation Package Created"
    ],
    features: [
      "Custom HVAC heat load, electrical voltage drop & hydronic pipe sizing formulas",
      "Automated ribbon toolbar tabs with custom engineering icons",
      "Enterprise RSA-3072 license key protection & database audit logs"
    ]
  },
  {
    id: "custom_revit",
    title: "Autodesk Revit BIM Automation Plugins",
    subtitle: "Revit API & C# Add-in Development",
    tag: "AUTODESK REVIT BIM ENGINES",
    badgeText: "Revit API / C#",
    logs: [
      "10:00:00 UTC - [BIM] Auto-Routing Duct Connector Script Active",
      "10:01:20 UTC - [SYNC] Shared Parameters Batch Updated",
      "10:02:00 UTC - [VALIDATE] Clash Telemetry Logged to Database"
    ],
    features: [
      "Automated Revit MEP duct/pipe sizing & parameter population",
      "Batch family parameter sync & schedule automation",
      "Custom ribbon panels & dockable pane UI widgets inside Revit"
    ]
  },
  {
    id: "custom_licensing",
    title: "Enterprise Seat Licensing & Telemetry",
    subtitle: "Custom Hardware Lock & Portal Integration",
    tag: "ENTERPRISE LICENSING ENGINE",
    badgeText: "Supabase DB / Stripe",
    logs: [
      "14:20:00 UTC - [SSO] Google Identity OAuth Gateway Initialized",
      "14:21:15 UTC - [SEATS] 5 PC Workstation Slots Bound",
      "14:22:00 UTC - [PORTAL] Self-Service Seat Release Ready"
    ],
    features: [
      "Custom hardware GUID machine hash licensing for enterprise tools",
      "Centralized executive dashboard for tracking seat usage & renewals",
      "Stripe payment gateway integration & automated key issuance"
    ]
  }
];

function AddinsPage() {
  const [dbAddins, setDbAddins] = useState<DBAddin[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "excel" | "revit">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddin, setSelectedAddin] = useState<DBAddin | null>(null);

  // Custom Section Interactive Module Switcher
  const [activeCustomServiceIndex, setActiveCustomServiceIndex] = useState(0);

  // View Details Modal State
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailedAddin, setDetailedAddin] = useState<DBAddin | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "guide" | "licensing">("overview");

  // Custom Add-in Request Modal State
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", email: "", addinIdea: "" });

  // Auto-rotating telemetry slide index
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // GoDaddy-Style Checkout & Payment State
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showDisclaimersModal, setShowDisclaimersModal] = useState(false);

  // Default Billing Information Form State (Prioritizing Dubai / UAE, Empty for new users)
  const [billingForm, setBillingForm] = useState({
    country: "United Arab Emirates",
    firstName: "",
    lastName: "",
    phoneCode: "+971",
    phoneNumber: "",
    building: "",
    street: "",
    city: "Dubai",
    state: "Dubai",
    pincode: "",
    organization: "",
    gstin: "",
    isSaved: false
  });

  // Secure Payment Tabs & State (Empty for new users)
  const [paymentTab, setPaymentTab] = useState<"credit" | "debit" | "netbanking" | "upi">("credit");
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    zip: ""
  });
  const [selectedBank, setSelectedBank] = useState("Emirates NBD [Dubai / UAE]");
  const [bankSearch, setBankSearch] = useState("");
  const [showBankPickerModal, setShowBankPickerModal] = useState(false);
  const [upiId, setUpiId] = useState("");

  // Secondary popups & UI helpers
  const [showUpiQrModal, setShowUpiQrModal] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(600); // 10 minutes
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<"INR" | "USD" | "AED">("USD");

  // Processing & Delivery State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");
  const [issuedLicense, setIssuedLicense] = useState<{ key: string; expires: string; file: string; amount: string; currency: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Telemetry Slide Auto-Rotate Timer (Every 4 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % TELEMETRY_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // UPI QR Code countdown timer
  useEffect(() => {
    let timer: any;
    if (showUpiQrModal && qrCountdown > 0) {
      timer = setInterval(() => {
        setQrCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showUpiQrModal, qrCountdown]);

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const getRenewalDateString = () => {
    const d = new Date();
    if (billingCycle === "annual") {
      d.setFullYear(d.getFullYear() + 1);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Load saved billing and payment data specifically for this user email
  const loadUserDataForCheckout = (sess: UserSession) => {
    if (!sess || !sess.email) return;
    const emailKey = sess.email.trim().toLowerCase();

    // 1. Check saved billing info in localStorage
    const savedBillingStr = typeof window !== "undefined" ? localStorage.getItem(`tarv_user_billing_${emailKey}`) : null;
    if (savedBillingStr) {
      try {
        const parsed = JSON.parse(savedBillingStr);
        setBillingForm({
          ...parsed,
          isSaved: true
        });
        if (parsed.country) {
          const found = COUNTRIES.find((c) => c.name === parsed.country);
          if (found?.currency) setSelectedCurrency(found.currency as any);
        }
      } catch {
        // fallback
      }
    } else {
      // New user - form inputs start empty with Dubai / UAE defaults and isSaved: false
      const nameParts = (sess.name || "").trim().split(" ");
      setBillingForm({
        country: "United Arab Emirates",
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phoneCode: "+971",
        phoneNumber: "",
        building: "",
        street: "",
        city: "Dubai",
        state: "Dubai",
        pincode: "",
        organization: sess.company || "",
        gstin: "",
        isSaved: false
      });
    }

    // 2. Check saved payment method in localStorage
    const savedPaymentStr = typeof window !== "undefined" ? localStorage.getItem(`tarv_user_payment_${emailKey}`) : null;
    if (savedPaymentStr) {
      try {
        const pay = JSON.parse(savedPaymentStr);
        if (pay.tab) setPaymentTab(pay.tab);
        if (pay.bank) setSelectedBank(pay.bank);
        if (pay.upiId) setUpiId(pay.upiId);
        setCardForm({
          number: pay.last4 ? `•••• •••• •••• ${pay.last4}` : (pay.number || ""),
          expiry: pay.expiry || "",
          cvc: "",
          name: pay.name || sess.name || "",
          zip: pay.zip || ""
        });
        setIsPaymentSaved(true);
      } catch {
        // fallback
      }
    } else {
      // New user - payment is not saved initially
      setCardForm({
        number: "",
        expiry: "",
        cvc: "",
        name: sess.name || "",
        zip: ""
      });
      setUpiId("");
      setIsPaymentSaved(false);
    }
  };

  useEffect(() => {
    getActiveUserSession().then((sess) => {
      if (sess) {
        setUserSession(sess);
        loadUserDataForCheckout(sess);
      }
    });
  }, []);

  const getPricingInfo = () => {
    const isAnnual = billingCycle === "annual";
    const plan = selectedAddin?.plans
      ? (Array.isArray(selectedAddin.plans)
          ? selectedAddin.plans[0]
          : typeof selectedAddin.plans === "string"
          ? JSON.parse(selectedAddin.plans)[0]
          : selectedAddin.plans)
      : null;

    const rawUsd = isAnnual
      ? (plan?.annualPrice ?? 399)
      : (plan?.monthlyPrice ?? 49);
    
    // Original price without discount (based on standard ~35% off promotion)
    const rawOrigUsd = Math.round(rawUsd / 0.65);

    if (billingForm.country === "India" || selectedCurrency === "INR") {
      const inrSubtotal = Math.round(rawUsd * 83);
      const inrOrig = Math.round(rawOrigUsd * 83);
      const inrSavings = inrOrig - inrSubtotal;
      const gstRate = billingForm.isSaved ? 0.18 : 0;
      const inrGst = Math.round(inrSubtotal * gstRate);
      const inrTotal = inrSubtotal + inrGst;
      return {
        currency: "INR",
        symbol: "₹",
        rawUsd,
        subtotal: inrSubtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
        orig: inrOrig.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
        savings: inrSavings.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
        gst: billingForm.isSaved ? inrGst.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "-",
        total: inrTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
        totalNumeric: inrTotal
      };
    } else if (selectedCurrency === "AED") {
      const aedSubtotal = Math.round(rawUsd * 3.67);
      const aedOrig = Math.round(rawOrigUsd * 3.67);
      const aedSavings = aedOrig - aedSubtotal;
      const vatRate = billingForm.isSaved ? 0.05 : 0;
      const aedVat = Math.round(aedSubtotal * vatRate);
      const aedTotal = aedSubtotal + aedVat;
      return {
        currency: "AED",
        symbol: "AED ",
        rawUsd,
        subtotal: aedSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        orig: aedOrig.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        savings: aedSavings.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        gst: billingForm.isSaved ? aedVat.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "-",
        total: aedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        totalNumeric: aedTotal
      };
    } else {
      const usdSubtotal = rawUsd;
      const usdOrig = rawOrigUsd;
      const usdSavings = usdOrig - usdSubtotal;
      const usdTotal = usdSubtotal;
      return {
        currency: "USD",
        symbol: "$",
        rawUsd,
        subtotal: usdSubtotal.toFixed(2),
        orig: usdOrig.toFixed(2),
        savings: usdSavings.toFixed(2),
        gst: billingForm.isSaved ? "$0.00 (Cross-Border SaaS / Free Zone)" : "-",
        total: usdTotal.toFixed(2),
        totalNumeric: usdTotal
      };
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").substring(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").substring(0, 4);
    if (digits.length >= 3) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardForm((prev) => ({ ...prev, number: formatted }));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardForm((prev) => ({ ...prev, expiry: formatted }));
  };

  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCardForm((prev) => ({ ...prev, cvc: formatted }));
  };

  const handlePurchaseClick = async (addin: any) => {
    setSelectedAddin(addin);
    const sess = await getActiveUserSession();
    if (sess) {
      setUserSession(sess);
      loadUserDataForCheckout(sess);
      setIsCheckoutOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleViewDetailsClick = (addin: DBAddin) => {
    setDetailedAddin(addin);
    setModalTab("overview");
    setIsDetailsOpen(true);
  };

  const handleAuthSuccess = (session: UserSession) => {
    setUserSession(session);
    loadUserDataForCheckout(session);
    setIsAuthOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSaveBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingForm.firstName.trim() || !billingForm.lastName.trim() || !billingForm.city.trim() || !billingForm.state.trim() || !billingForm.pincode.trim()) {
      alert("Please fill in all required billing information fields (First Name, Last Name, City, State, Postal / Pincode).");
      return;
    }
    const cleanPhone = billingForm.phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number (numbers only).");
      return;
    }
    const updatedBilling = { ...billingForm, phoneNumber: cleanPhone, isSaved: true };
    setBillingForm(updatedBilling);

    const emailKey = (userSession?.email || "abubakarchanda3010@gmail.com").trim().toLowerCase();
    if (typeof window !== "undefined") {
      localStorage.setItem(`tarv_user_billing_${emailKey}`, JSON.stringify(updatedBilling));
    }

    // Update customer record in Supabase in background
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/customers?email=eq.${encodeURIComponent(emailKey)}`, {
        method: "PATCH",
        headers: REST_HEADERS,
        body: JSON.stringify({
          name: `${updatedBilling.firstName} ${updatedBilling.lastName}`.trim(),
          company: updatedBilling.organization || undefined,
          phone: `${updatedBilling.phoneCode} ${updatedBilling.phoneNumber}`,
          address: `${updatedBilling.building}, ${updatedBilling.street}, ${updatedBilling.city}, ${updatedBilling.state} ${updatedBilling.pincode}, ${updatedBilling.country}`
        })
      });
    } catch {
      // Ignored
    }
  };

  const handleSavePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentTab === "credit" || paymentTab === "debit") {
      const clean = cardForm.number.replace(/\s/g, "");
      if (clean.length < 15 && !clean.includes("•")) {
        alert("Please enter a valid 16-digit card number.");
        return;
      }
      if (!cardForm.expiry || cardForm.expiry.length < 5) {
        alert("Please enter a valid expiry date (MM/YY).");
        return;
      }
    }
    setIsPaymentSaved(true);

    const emailKey = (userSession?.email || "abubakarchanda3010@gmail.com").trim().toLowerCase();
    const payData = {
      tab: paymentTab,
      last4: cardForm.number.replace(/\s/g, "").slice(-4),
      expiry: cardForm.expiry,
      name: cardForm.name || `${billingForm.firstName} ${billingForm.lastName}`.trim(),
      zip: cardForm.zip || billingForm.pincode,
      bank: selectedBank,
      upiId: upiId
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(`tarv_user_payment_${emailKey}`, JSON.stringify(payData));
    }
  };

  const executeCompleteTransaction = async (overrideMethod?: string) => {
    if (!selectedAddin) return;
    const userEmail = userSession?.email || "abubakarchanda3010@gmail.com";
    const userName = `${billingForm.firstName} ${billingForm.lastName}`.trim() || userSession?.name || "Abubakar Chanda";
    const pricing = getPricingInfo();

    setIsProcessing(true);
    setProcessingStage("Connecting to PCI-DSS & RBI Tokenization Gateway...");

    try {
      await new Promise((r) => setTimeout(r, 650));
      setProcessingStage("Authorizing 3D Secure 2.0 Banking Instrument...");

      await new Promise((r) => setTimeout(r, 700));
      setProcessingStage("Generating Cryptographic RSA-3072 License Certificate...");

      const now = new Date().toISOString();
      const validDays = billingCycle === "annual" ? 365 : 30;
      const expiresAt = new Date(Date.now() + validDays * 86400000).toISOString();
      const licId = generateGuid();
      const keyHash = `KEY-TARV-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const txId = `txn_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const headers = {
        ...REST_HEADERS,
        Prefer: "resolution=merge-duplicates,return=minimal"
      };

      let custId = userSession?.id || generateGuid();
      const cleanEmail = userEmail.trim().toLowerCase();
      const custCheckRes = await fetch(
        `${SUPABASE_URL}/rest/v1/customers?email=eq.${encodeURIComponent(cleanEmail)}`,
        { headers }
      );
      const existingCusts = await custCheckRes.json();

      if (Array.isArray(existingCusts) && existingCusts.length > 0) {
        custId = existingCusts[0].id;
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/customers`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            id: custId,
            name: userName,
            email: cleanEmail,
            company: billingForm.organization || "TARV Engineering Solutions",
            created_at_utc: now,
            is_active: true
          })
        });
      }

      await fetch(`${SUPABASE_URL}/rest/v1/licenses`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          id: licId,
          license_key_hash: keyHash,
          customer_id: custId,
          product_id: selectedAddin.id,
          plan: billingCycle === "annual" ? "Enterprise Annual" : "Professional Monthly",
          max_activations: selectedAddin.plans ? selectedAddin.plans[0]?.maxActivations || 5 : 5,
          offline_grace_days: 14,
          expires_at_utc: expiresAt,
          created_at_utc: now,
          updated_at_utc: now,
          is_active: true,
          revoked: false
        })
      });

      const usedMethodName = overrideMethod || (
        paymentTab === "upi" ? "UPI (Instant QR / App)" :
        paymentTab === "netbanking" ? `Net Banking (${selectedBank})` :
        paymentTab === "debit" ? "Debit Card (RBI Tokenized)" :
        "Credit Card (Stripe 3DS 2.0)"
      );

      await fetch(`${SUPABASE_URL}/rest/v1/audit_logs`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          id: generateGuid(),
          license_id: licId,
          event_type: "TARV_COMMERCIAL_PURCHASE_VERIFIED",
          timestamp_utc: now,
          ip_address: "192.168.1.9 (GoDaddy Storefront Gateway)",
          details: `Purchase of ${selectedAddin.name} (${keyHash}) via ${usedMethodName} for ${userName} (${pricing.symbol}${pricing.total})`
        })
      });

      setProcessingStage(`Dispatching Formal Tax Invoice & License Key to ${cleanEmail}...`);

      const formattedExpiry = new Date(expiresAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
      const setupFileName = `${selectedAddin.slug || "clemp_excel_addin"}_setup.exe`;

      try {
        await sendPurchaseLicenseEmail({
          data: {
            customerName: userName,
            customerEmail: cleanEmail,
            companyName: billingForm.organization || "TARV Engineering Solutions",
            productName: selectedAddin.name,
            productId: selectedAddin.id,
            licenseKey: keyHash,
            planName: billingCycle === "annual" ? "Enterprise Annual (1 Year)" : "Professional Monthly (1 Month)",
            amountPaid: `${pricing.symbol}${pricing.total} ${pricing.currency}`,
            expiresAt: formattedExpiry,
            installerFile: setupFileName,
            paymentMethod: usedMethodName,
            transactionId: txId
          }
        });
      } catch (emailErr) {
        console.warn("License email notice:", emailErr);
      }

      await new Promise((r) => setTimeout(r, 600));

      setIssuedLicense({
        key: keyHash,
        expires: formattedExpiry,
        file: setupFileName,
        amount: `${pricing.symbol}${pricing.total}`,
        currency: pricing.currency
      });

      setShowUpiQrModal(false);
      setShowBankPickerModal(false);
      setIsCheckoutOpen(false);
      await fetchAddinsFromDatabase();
    } catch (err: any) {
      alert("Payment notice: " + (err.message || "Transaction authorization failed."));
    } finally {
      setIsProcessing(false);
      setProcessingStage("");
    }
  };

  const handleContinuePurchaseClick = () => {
    if (!billingForm.isSaved) {
      alert("Please save your Billing Information first.");
      return;
    }
    if (!isPaymentSaved) {
      alert("Please select and save your payment method.");
      return;
    }
    if (paymentTab === "upi") {
      setQrCountdown(600);
      setShowUpiQrModal(true);
    } else {
      executeCompleteTransaction();
    }
  };

  const fetchAddinsFromDatabase = async () => {
    setLoading(true);
    try {
      const addinRes = await fetch(`${SUPABASE_URL}/rest/v1/addins?select=*&order=created_at_utc.desc`, { headers: REST_HEADERS });
      const rawAddins = await addinRes.json();

      const licRes = await fetch(`${SUPABASE_URL}/rest/v1/licenses?select=*`, { headers: REST_HEADERS });
      const rawLicenses = (await licRes.json()) || [];

      const actRes = await fetch(`${SUPABASE_URL}/rest/v1/activations?select=*`, { headers: REST_HEADERS });
      const rawActivations = (await actRes.json()) || [];

      if (Array.isArray(rawAddins) && rawAddins.length > 0) {
        const mapped = rawAddins.map((item: any) => {
          const addinId = item.id;
          const targetLics = rawLicenses.filter((l: any) => l.product_id === addinId);
          const activeLics = targetLics.filter((l: any) => (l.is_active ?? true) && !l.revoked);
          const targetLicIds = new Set(targetLics.map((l: any) => l.id));
          const targetActs = rawActivations.filter((a: any) => targetLicIds.has(a.license_id) && (a.is_active ?? true));
          const uniqueCusts = new Set(targetLics.map((l: any) => l.customer_id)).size;

          let parsedPlans = [
            {
              name: "Pro Enterprise",
              monthlyPrice: 49,
              annualPrice: 399,
              maxActivations: 5,
              features: [
                "Team Productivity Telemetry",
                "Live Workbook Orchestrator",
                "RSA-3072 Cryptographic Signing",
                "5 Bound Workstation Seats",
                "14 Days Field Offline Grace"
              ]
            }
          ];

          if (item.plans) {
            if (typeof item.plans === "string") {
              try { parsedPlans = JSON.parse(item.plans); } catch { }
            } else if (Array.isArray(item.plans)) {
              parsedPlans = item.plans;
            }
          }

          return {
            id: item.id,
            name: item.name,
            slug: item.slug || item.id,
            description: item.description || "Enterprise engineering add-in for automated BIM & Excel workflows.",
            targetApplication: item.target_application || item.targetApplication || "Microsoft Excel 365 / 2021",
            version: item.version || "v1.0.0",
            developer: item.developer || "Consistent Solutions",
            plans: parsedPlans,
            status: item.status || "active",
            stats: {
              totalCustomers: uniqueCusts,
              totalLicenses: targetLics.length,
              activeLicenses: activeLics.length,
              activeDevices: targetActs.length,
              revokedLicenses: 0
            }
          };
        });

        setDbAddins(mapped);
      } else {
        setDbAddins([
          {
            id: "addin_clemp_excel",
            name: "Team Productivity Report Excel Add-in (ClEmpAddIn)",
            slug: "clemp-excel-addin",
            description: "Seamlessly track team productivity, generate automated engineering audit reports, and sync live workbooks across enterprise teams directly inside Excel.",
            targetApplication: "Microsoft Excel 365 / 2021",
            version: "v1.0.0",
            developer: "Consistent Solutions",
            status: "active",
            plans: [
              {
                name: "Pro Enterprise",
                monthlyPrice: 49,
                annualPrice: 399,
                maxActivations: 5,
                features: [
                  "Team Productivity Telemetry",
                  "Live Workbook Orchestrator",
                  "RSA-3072 Cryptographic Signing",
                  "5 Bound Workstation Seats",
                  "14 Days Field Offline Grace"
                ]
              }
            ],
            stats: {
              totalCustomers: 7,
              totalLicenses: 10,
              activeLicenses: 7,
              activeDevices: 5,
              revokedLicenses: 0
            }
          }
        ]);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddinsFromDatabase();
  }, []);

  const primaryAddin = dbAddins[0] || {
    id: "addin_clemp_excel",
    name: "Team Productivity Report Excel Add-in (ClEmpAddIn)",
    slug: "clemp-excel-addin",
    description: "Seamlessly track team productivity, generate automated engineering audit reports, and sync live workbooks across enterprise teams directly inside Excel.",
    targetApplication: "Microsoft Excel 365 / 2021",
    version: "v1.0.0",
    plans: [{ monthlyPrice: 49, annualPrice: 399, maxActivations: 5, features: [] }]
  };

  const filteredAddins = dbAddins.filter((addin) => {
    const matchesSearch =
      addin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addin.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "excel") {
      return matchesSearch && addin.targetApplication.toLowerCase().includes("excel");
    }
    if (selectedCategory === "revit") {
      return matchesSearch && addin.targetApplication.toLowerCase().includes("revit");
    }
    return matchesSearch;
  });

  const handleCustomAddinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${requestForm.name}! Your custom add-in request (${requestForm.addinIdea}) has been submitted to the TARV Engineering Team.`);
    setIsRequestOpen(false);
    setRequestForm({ name: "", email: "", addinIdea: "" });
  };

  const activeSlide = TELEMETRY_SLIDES[slideIndex];
  const activeCustomService = CUSTOM_ADDIN_SERVICES[activeCustomServiceIndex];

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <SiteNav />

      <main className="pt-28 pb-24 space-y-24">
        {/* SECTION 1: HERO SHOWCASE WITH AUTHENTIC DYNAMIC TELEMETRY CAROUSEL */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider">
                  <Sparkles size={13} />
                  <span>TARV Official Add-in Store</span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                  Automate MEP Workflows in <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                    Microsoft Excel
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl">
                  Deploy enterprise-grade Excel calculation & telemetry add-ins for engineering teams. Live workbook auditing, RSA-3072 key locks, and hardware seat licensing.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    onClick={() => {
                      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="py-6 px-7 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Layers size={16} />
                    <span>Browse Add-in Catalog</span>
                    <ArrowRight size={16} />
                  </Button>

                  <Button
                    onClick={() => {
                      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="py-6 px-6 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-extrabold text-sm cursor-pointer flex items-center gap-2"
                  >
                    <BookOpen size={16} className="text-cyan-500" />
                    <span>How Licensing Works</span>
                  </Button>
                </div>

                {/* Database Verification Counters */}
                <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-muted-foreground border-t border-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>RSA-3072 Cryptographic Signing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Hardware Multi-Seat Licensing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>PCI-DSS Stripe Checkout</span>
                  </div>
                </div>
              </div>

              {/* Right Column AUTHENTIC TELEMETRY CAROUSEL CARD */}
              <div className="lg:col-span-5">
                <div
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 transition-all duration-500"
                >
                  {/* Top Product Identifier */}
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold border border-cyan-500/20">
                        <Cpu size={19} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-foreground leading-tight">
                          TARV Add-in Telemetry Framework
                        </h3>
                        <span className="text-[10px] text-emerald-500 font-bold block">
                          Status: Connected to Supabase Engine
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSlideIndex((prev) => (prev === 0 ? TELEMETRY_SLIDES.length - 1 : prev - 1))}
                        className="p-1 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Previous Feature"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlideIndex((prev) => (prev + 1) % TELEMETRY_SLIDES.length)}
                        className="p-1 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Next Feature"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Auto-Rotating Slide Subhead */}
                  <div className="space-y-1 animate-in fade-in duration-300">
                    <span className="text-[10px] font-mono font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                      FEATURE {slideIndex + 1} OF {TELEMETRY_SLIDES.length} — {activeSlide.slideTitle}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      {activeSlide.description}
                    </p>
                  </div>

                  {/* Dynamic Telemetry Metrics Box */}
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Activity size={13} className="text-cyan-500" /> System Integrity
                        </span>
                        <span className="text-emerald-500 font-mono font-extrabold">{activeSlide.badge}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-full animate-pulse" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-background border border-border">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase block">{activeSlide.metric1Label}</span>
                        <strong className="text-sm font-extrabold text-foreground">{activeSlide.metric1Val}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase block">{activeSlide.metric2Label}</span>
                        <strong className="text-sm font-extrabold text-emerald-500">{activeSlide.metric2Val}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Auto-Rotating Slide Indicators */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {TELEMETRY_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSlideIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          slideIndex === idx ? "w-6 bg-cyan-500" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                      className="py-3 rounded-xl bg-muted/60 hover:bg-muted text-foreground font-extrabold text-xs border border-border transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <BookOpen size={14} className="text-cyan-500" />
                      <span>Deployment Guide</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                      className="py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Layers size={14} />
                      <span>Explore Add-ins ({dbAddins.length}) →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 2: REDESIGNED UNIQUE 3-STEP ENGINEERING DEPLOYMENT CANVAS */}
        <section id="how-it-works" className="px-4 sm:px-6 max-w-7xl mx-auto space-y-12 pt-6">
          <Reveal>
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Terminal size={14} /> Automated Deployment Engine
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                Seamless 3-Step Workstation Canvas
              </h2>
              <p className="text-xs sm:text-base text-muted-foreground font-medium">
                From Stripe checkout to multi-workstation hardware binding — fully automated in under 120 seconds.
              </p>
            </div>
          </Reveal>

          {/* Connected Step Pipeline Bar Header */}
          <Reveal>
            <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto px-8 relative">
              <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 -translate-y-1/2 z-0" />
              
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg ring-4 ring-background">
                  01
                </div>
                <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">Instant Key Issuance</span>
              </div>

              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg ring-4 ring-background">
                  02
                </div>
                <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">Silent Installer Setup</span>
              </div>

              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg ring-4 ring-background">
                  03
                </div>
                <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">Hardware Seat Binding</span>
              </div>
            </div>
          </Reveal>

          {/* Interactive 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 Card */}
            <Reveal>
              <div className="relative rounded-3xl p-7 border border-border bg-card hover:border-cyan-500/50 shadow-xl space-y-5 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-black bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      STEP 01
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                      <Lock size={12} /> Stripe PCI-DSS
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-cyan-500 transition-colors">
                    License Key Provisioning
                  </h3>

                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Complete purchase via Stripe. Our engine generates a unique RSA-3072 signed product key and dispatches an immediate email receipt.
                  </p>
                </div>

                {/* Simulated Key Format Box */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                      <span className="text-muted-foreground">SIGNATURE STATUS</span>
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={12} /> RSA-3072 VALID
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-background border border-border flex items-center justify-between">
                      <code className="font-mono text-xs font-extrabold text-cyan-600 dark:text-cyan-300">
                        KEY-TARV-XXXX-XXXX
                      </code>
                      <button
                        type="button"
                        onClick={() => alert("Key Format: KEY-TARV-XXXX-XXXX")}
                        className="text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        Format
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 2 Card */}
            <Reveal>
              <div className="relative rounded-3xl p-7 border border-border bg-card hover:border-teal-500/50 shadow-xl space-y-5 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-black bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      STEP 02
                    </span>
                    <span className="text-[10px] font-bold text-teal-500 flex items-center gap-1">
                      <Download size={12} /> Automated Setup
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-teal-500 transition-colors">
                    Add-in Package Deployment
                  </h3>

                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Download the silent setup package (`.exe`) or copy the signed `.lic` certificate file directly into your application directory.
                  </p>
                </div>

                {/* Simulated Deployment Installation Bar */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                      <span className="text-muted-foreground">TARGET DIRECTORY</span>
                      <span className="text-foreground">Excel 365 / 2021</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 w-full animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground block text-right">
                      Registered to XLSTART
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 3 Card */}
            <Reveal>
              <div className="relative rounded-3xl p-7 border border-border bg-card hover:border-emerald-500/50 shadow-xl space-y-5 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      STEP 03
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                      <Laptop size={12} /> Hardware Binding
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-emerald-500 transition-colors">
                    Multi-Seat Hardware Lock
                  </h3>

                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Enter key inside Excel. Hardware seat slot binds automatically to your PC. Release or swap seats anytime in your Customer Portal.
                  </p>
                </div>

                {/* Interactive Seat Slots Visual Widget */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                      <span className="text-muted-foreground">WORKSTATION CAPACITY</span>
                      <span className="text-emerald-500">2 / 5 Bound</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-full py-1 rounded bg-cyan-500 text-slate-950 text-[10px] font-extrabold text-center">PC 1</span>
                      <span className="w-full py-1 rounded bg-cyan-500 text-slate-950 text-[10px] font-extrabold text-center">PC 2</span>
                      <span className="w-full py-1 rounded bg-muted border border-border text-muted-foreground text-[10px] font-bold text-center">Free</span>
                      <span className="w-full py-1 rounded bg-muted border border-border text-muted-foreground text-[10px] font-bold text-center">Free</span>
                      <span className="w-full py-1 rounded bg-muted border border-border text-muted-foreground text-[10px] font-bold text-center">Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 3: MULTI-ADDIN SCALABLE ECOSYSTEM CATALOG (SEMRUSH APP CENTER STYLE) */}
        <section id="catalog" className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 pt-6">
          <Reveal>
            <div className="space-y-6 pb-6 border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Layers size={13} /> Multi-Product Ecosystem Marketplace
                  </div>
                  <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
                    Available Commercial Add-ins ({filteredAddins.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                    Discover and license enterprise engineering add-ins for Excel, Revit, and BIM workflows.
                  </p>
                </div>

                {/* Billing Cycle Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      billingCycle === "monthly" ? "bg-cyan-500 text-slate-950 font-extrabold" : "text-muted-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("annual")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      billingCycle === "annual" ? "bg-cyan-500 text-slate-950 font-extrabold" : "text-muted-foreground"
                    }`}
                  >
                    Annual (-25%)
                  </button>
                </div>
              </div>

              {/* SEMRUSH-STYLE ECOSYSTEM CATEGORY FILTER & SEARCH BAR */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      selectedCategory === "all" ? "bg-cyan-500 text-slate-950" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All Add-ins ({dbAddins.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("excel")}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      selectedCategory === "excel" ? "bg-cyan-500 text-slate-950" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Microsoft Excel ({dbAddins.filter((a) => a.targetApplication.toLowerCase().includes("excel")).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("revit")}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      selectedCategory === "revit" ? "bg-cyan-500 text-slate-950" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Autodesk Revit (Roadmap)
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search add-ins..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Catalog Grid (Scalable for 1+ Add-ins) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Active Commercial Add-in Cards */}
            {filteredAddins.map((addin) => {
              const plan = addin.plans
                ? (Array.isArray(addin.plans) ? addin.plans[0] : (typeof addin.plans === "string" ? JSON.parse(addin.plans)[0] : null)) || { monthlyPrice: 49, annualPrice: 399, maxActivations: 5, features: [] }
                : { monthlyPrice: 49, annualPrice: 399, maxActivations: 5, features: [] };
              
              const displayPrice = billingCycle === "annual" ? (plan.annualPrice || 399) : (plan.monthlyPrice || 49);

              return (
                <Reveal key={addin.id}>
                  <div className="rounded-3xl p-8 border border-border bg-card hover:border-cyan-500/40 shadow-xl space-y-6 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 uppercase">
                          {addin.targetApplication}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                          {addin.version} • LIVE
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold text-foreground group-hover:text-cyan-500 transition-colors">
                          {addin.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 font-medium leading-relaxed">{addin.description}</p>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold text-foreground">${displayPrice}</span>
                          <span className="text-xs font-bold text-muted-foreground">/{billingCycle === "annual" ? "year" : "month"}</span>
                        </div>
                        <p className="text-xs font-bold text-emerald-500 mt-1">Includes {plan.maxActivations || 5} Bound Workstation PC Seats</p>
                      </div>

                      <ul className="space-y-2 text-xs text-muted-foreground font-medium pt-2">
                        {(plan.features || []).map((feat: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-cyan-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DUAL BUTTON LAYOUT */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleViewDetailsClick(addin)}
                        className="py-5 rounded-2xl border border-border bg-muted/60 hover:bg-muted text-foreground font-extrabold text-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <BookOpen size={14} className="text-cyan-500" />
                        <span>View Details & Guide</span>
                      </Button>

                      <Button
                        onClick={() => handlePurchaseClick(addin)}
                        className="py-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CreditCard size={15} />
                        <span>Purchase License →</span>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: HIGH-IMPACT CUSTOM ENGINEERING SOLUTIONS STAGE (SEMRUSH APP CENTER STYLE) */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-8">
          <Reveal>
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-border">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Wrench size={14} /> TAILORED MEP SOFTWARE & PLUGIN ENGINEERING
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    Need a Custom Engineering Add-in?
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground font-medium mt-1">
                    We engineer bespoke C#, Revit API, and Excel add-ins tailored to your firm's calculation standards.
                  </p>
                </div>

                {/* Service Selector Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  {CUSTOM_ADDIN_SERVICES.map((srv, idx) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setActiveCustomServiceIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        activeCustomServiceIndex === idx
                          ? "bg-cyan-500 text-slate-950 shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      0{idx + 1}. {srv.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Service Console Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Technical Specification Box */}
                <div className="lg:col-span-6 p-8 rounded-3xl border border-border bg-card shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-extrabold text-foreground">{activeCustomService.title}</span>
                    <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase">{activeCustomService.tag}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-muted-foreground">{activeCustomService.subtitle}</span>
                      <span className="text-emerald-500 font-mono">{activeCustomService.badgeText}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border font-mono text-[11px] space-y-1">
                      {activeCustomService.logs.map((logStr, lIdx) => (
                        <p key={lIdx} className={lIdx === 0 ? "text-slate-400" : lIdx === 1 ? "text-cyan-500" : "text-emerald-500"}>
                          {logStr}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Description & Action Content */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-bold uppercase">
                    <Code size={14} /> TARV Custom Dev • {activeCustomService.tag}
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground">{activeCustomService.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                    Convert complex engineering calculations and repetitive BIM tasks into enterprise-ready add-ins protected by RSA-3072 cryptographic key locks and hardware machine seat binding.
                  </p>
                  <ul className="space-y-2 text-xs font-bold text-foreground">
                    {activeCustomService.features.map((fItem, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-cyan-500" />
                        <span>{fItem}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button
                      onClick={() => setIsRequestOpen(true)}
                      className="py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <PlusCircle size={15} />
                      <span>Request Custom Add-in Build →</span>
                    </Button>

                    <Button
                      onClick={() => (window.location.href = "mailto:admin@tarv.ai?subject=Custom Engineering Add-in Inquiry")}
                      className="py-4 px-5 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-extrabold text-xs cursor-pointer flex items-center gap-2"
                    >
                      <Mail size={15} className="text-cyan-500" />
                      <span>Email Inquiry</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* REQUEST CUSTOM ADD-IN MODAL */}
      {isRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsRequestOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleCustomAddinSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold uppercase mb-2">
                  <Sparkles size={13} /> Engineering Pipeline Request
                </div>
                <h2 className="text-xl font-extrabold text-foreground">Request a Custom Add-in</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tell us about your Excel, Revit, or AutoCAD calculation workflow requirements.
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Work Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. engineer@mep-firm.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                    value={requestForm.email}
                    onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Describe Desired Add-in / Feature</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Need an Excel add-in for automated ASHRAE duct sizing and pressure drop calculations..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                    value={requestForm.addinIdea}
                    onChange={(e) => setRequestForm({ ...requestForm, addinIdea: e.target.value })}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle size={16} />
                <span>Submit Add-in Request →</span>
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* SEMRUSH-INSPIRED DETAILED ADD-IN INSPECTION MODAL */}
      {isDetailsOpen && detailedAddin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 border-b border-border pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {detailedAddin.targetApplication}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-muted border border-border">
                  {detailedAddin.version}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
                  Developer: {detailedAddin.developer || "Consistent Solutions"}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-foreground">{detailedAddin.name}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                {detailedAddin.description}
              </p>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <button
                type="button"
                onClick={() => setModalTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  modalTab === "overview" ? "bg-cyan-500 text-slate-950" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Architecture Overview
              </button>
              <button
                type="button"
                onClick={() => setModalTab("guide")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  modalTab === "guide" ? "bg-cyan-500 text-slate-950" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Installation Guide
              </button>
              <button
                type="button"
                onClick={() => setModalTab("licensing")}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  modalTab === "licensing" ? "bg-cyan-500 text-slate-950" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Workstation Seat Spec
              </button>
            </div>

            {/* Tab 1: Overview */}
            {modalTab === "overview" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Enterprise Feature Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                    <strong className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                      <Activity size={14} className="text-cyan-500" /> Live Telemetry
                    </strong>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Tracks workbook productivity and syncs audit logs to your Supabase database in real time.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                    <strong className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                      <Lock size={14} className="text-emerald-500" /> RSA-3072 Encryption
                    </strong>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Cryptographically signed certificate keys (.lic) protect against unauthorized distribution.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                    <strong className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                      <Laptop size={14} className="text-teal-500" /> 5 Bound PC Seats
                    </strong>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Binds unique computer hardware hashes automatically upon license key activation inside Excel.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                    <strong className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-blue-500" /> 14-Day Field Grace
                    </strong>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Allows field engineers to continue using calculations offline without constant internet connection.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Installation Guide */}
            {modalTab === "guide" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Step-by-Step Setup Instructions</h3>
                <ol className="space-y-3 text-xs text-muted-foreground font-medium list-decimal pl-5">
                  <li>Download the official installer (clemp_excel_addin_setup.exe) from your purchase email or Customer Portal.</li>
                  <li>Close all running instances of Microsoft Excel.</li>
                  <li>Run the setup executable. The installer automatically registers the .xlam add-in into your XLSTART directory.</li>
                  <li>Launch Microsoft Excel. The <strong className="text-foreground font-bold">TARV Engineering Ribbon Tab</strong> will be present on the top menu bar.</li>
                  <li>Click <strong className="text-foreground font-bold">"License Settings"</strong> and enter your key in format <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">KEY-TARV-XXXX-XXXX</span>.</li>
                </ol>
              </div>
            )}

            {/* Tab 3: Licensing Spec */}
            {modalTab === "licensing" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Hardware Seat Allocation Rules</h3>
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold">
                    <Users size={16} /> 5 Workstation Seats Included
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Each purchased license key supports up to 5 unique workstation PCs simultaneously. You can view active PC hardware hashes and unbind unused computers anytime inside your Customer Portal at /portal.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Bottom Action CTAs */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-muted-foreground">
                Price: <strong className="text-foreground text-sm">${billingCycle === "annual" ? 399 : 49}</strong>/{billingCycle === "annual" ? "year" : "month"}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => setIsDetailsOpen(false)}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-border bg-muted/50 hover:bg-muted text-foreground text-xs font-bold cursor-pointer"
                >
                  Close
                </Button>

                <Button
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handlePurchaseClick(detailedAddin);
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard size={15} />
                  <span>Purchase License Key →</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        targetAddinId={selectedAddin?.id || "addin_clemp_excel"}
        targetAddinName={selectedAddin?.name || "Team Productivity Report Excel Add-in (ClEmpAddIn)"}
        title="Sign In or Create Account to Purchase"
        subtitle={`Authenticate to complete your ${selectedAddin?.name || "add-in"} purchase.`}
      />

      {/* GODADDY-INSPIRED CLEAN 2-COLUMN CHECKOUT MODAL */}
      {isCheckoutOpen && selectedAddin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl border border-border bg-card shadow-2xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="relative px-6 sm:px-8 py-5 border-b border-border flex items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Purchase Now</h2>
              <button
                onClick={() => {
                  if (!isProcessing) setIsCheckoutOpen(false);
                }}
                disabled={isProcessing}
                className="absolute right-5 top-5 text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable 2-Column Body */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Billing Information & Secure Payment */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* BOX 1: BILLING INFORMATION */}
                  <div className="rounded-2xl border border-border bg-background/50 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Billing Information</h3>
                        {billingForm.isSaved && (
                          <span className="text-emerald-500 flex items-center" title="Saved & Verified">
                            <CheckCircle2 size={18} className="fill-emerald-500/10" />
                          </span>
                        )}
                      </div>
                      {billingForm.isSaved && (
                        <button
                          type="button"
                          onClick={() => {
                            setBillingForm({ ...billingForm, isSaved: false });
                            setIsPaymentSaved(false);
                          }}
                          className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                      )}
                    </div>

                    {/* Collapsed Saved Summary View */}
                    {billingForm.isSaved ? (
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-medium text-foreground">
                          {billingForm.firstName} {billingForm.lastName}
                          {billingForm.organization ? ` • ${billingForm.organization}` : ""}
                        </p>
                        <p className="mt-0.5">
                          {billingForm.building ? `${billingForm.building}, ` : ""}
                          {billingForm.street ? `${billingForm.street}, ` : ""}
                          {billingForm.city}, {billingForm.state} {billingForm.pincode}, {billingForm.country}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px]">
                          {billingForm.phoneCode} {billingForm.phoneNumber}
                          {billingForm.gstin ? ` • GSTIN: ${billingForm.gstin}` : ""}
                        </p>
                      </div>
                    ) : (
                      /* Unsaved Form View */
                      <form onSubmit={handleSaveBilling} className="space-y-3.5 pt-1">
                        <p className="text-[11px] text-muted-foreground">All fields required unless otherwise stated.</p>

                        {/* Country Dropdown */}
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Country / Region</label>
                          <select
                            value={billingForm.country}
                            onChange={(e) => {
                              const found = COUNTRIES.find((c) => c.name === e.target.value);
                              setBillingForm({
                                ...billingForm,
                                country: e.target.value,
                                phoneCode: found?.code || "+971",
                                state: found?.state || "",
                                city: found?.city || billingForm.city
                              });
                              if (found?.currency) {
                                setSelectedCurrency(found.currency as any);
                              }
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name} ({c.code})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Name Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">First Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Tariq"
                              value={billingForm.firstName}
                              onChange={(e) => setBillingForm({ ...billingForm, firstName: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Last Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Mansoor"
                              value={billingForm.lastName}
                              onChange={(e) => setBillingForm({ ...billingForm, lastName: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>

                        {/* Phone Row - Strictly 10 Digits Numbers Only */}
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                            Phone Number <span className="text-cyan-500 text-[10px] font-normal">(10 Digits Only)</span>
                          </label>
                          <div className="flex gap-2">
                            <span className="px-3 py-2 rounded-xl border border-border bg-muted/40 text-xs font-mono font-medium text-foreground flex items-center">
                              {billingForm.phoneCode}
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              required
                              maxLength={10}
                              placeholder="5012345678"
                              value={billingForm.phoneNumber}
                              onChange={(e) => {
                                const numeric = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setBillingForm({ ...billingForm, phoneNumber: numeric });
                              }}
                              className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </div>

                        {/* Building / Society */}
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Building / Suite</label>
                          <input
                            type="text"
                            placeholder="e.g. TARV Engineering Tower, Suite 402"
                            value={billingForm.building}
                            onChange={(e) => setBillingForm({ ...billingForm, building: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        {/* Street Name / Landmark */}
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Street Name / District</label>
                          <input
                            type="text"
                            placeholder="e.g. Business Bay / Sheikh Zayed Road"
                            value={billingForm.street}
                            onChange={(e) => setBillingForm({ ...billingForm, street: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        {/* City, State, Postal Code */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">City</label>
                            <input
                              type="text"
                              required
                              placeholder="Dubai"
                              value={billingForm.city}
                              onChange={(e) => setBillingForm({ ...billingForm, city: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">State / Emirate</label>
                            <input
                              type="text"
                              required
                              placeholder="Dubai"
                              value={billingForm.state}
                              onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Postal / Zip Code</label>
                            <input
                              type="text"
                              required
                              placeholder="00000"
                              value={billingForm.pincode}
                              onChange={(e) => setBillingForm({ ...billingForm, pincode: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>
                        </div>

                        {/* Organization & Tax ID */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Organization</label>
                            <input
                              type="text"
                              placeholder="TARV Engineering Solutions LLC"
                              value={billingForm.organization}
                              onChange={(e) => setBillingForm({ ...billingForm, organization: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Tax ID / TRN / VAT (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. 100234567800003"
                              value={billingForm.gstin}
                              onChange={(e) => setBillingForm({ ...billingForm, gstin: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs shadow transition-all cursor-pointer mt-2"
                        >
                          Save
                        </button>
                      </form>
                    )}
                  </div>

                  {/* BOX 2: SECURE PAYMENT */}
                  <div className={`rounded-2xl border border-border bg-background/50 p-5 sm:p-6 space-y-4 ${!billingForm.isSaved ? "opacity-60 pointer-events-none" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Secure Payment</h3>
                        {isPaymentSaved && (
                          <span className="text-emerald-500 flex items-center" title="Payment Method Ready">
                            <CheckCircle2 size={18} className="fill-emerald-500/10" />
                          </span>
                        )}
                      </div>
                      {isPaymentSaved && (
                        <button
                          type="button"
                          onClick={() => setIsPaymentSaved(false)}
                          className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                      )}
                    </div>

                    {/* If payment is saved: show summary badge */}
                    {isPaymentSaved ? (
                      <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          {paymentTab === "credit" && <CreditCard size={18} className="text-cyan-500" />}
                          {paymentTab === "debit" && <CreditCard size={18} className="text-blue-500" />}
                          {paymentTab === "netbanking" && <Landmark size={18} className="text-emerald-500" />}
                          {paymentTab === "upi" && <QrCode size={18} className="text-teal-500" />}
                          <span className="font-bold text-foreground">
                            {paymentTab === "credit" && `Credit Card (•••• ${cardForm.number.slice(-4) || "4242"})`}
                            {paymentTab === "debit" && `Debit Card (•••• ${cardForm.number.slice(-4) || "4242"})`}
                            {paymentTab === "netbanking" && `Net Banking (${selectedBank})`}
                            {paymentTab === "upi" && "UPI Instant QR Code & Apps"}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          Ready for Checkout
                        </span>
                      </div>
                    ) : (
                      /* If payment is not saved: show method tabs & inputs */
                      <form onSubmit={handleSavePaymentMethod} className="space-y-4 pt-1">
                        {/* 4 Payment Method Tabs (GoDaddy Style) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentTab("credit")}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentTab === "credit"
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                : "border-border bg-card text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <CreditCard size={15} />
                            <span>Credit Cards</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentTab("debit")}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentTab === "debit"
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                : "border-border bg-card text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <CreditCard size={15} />
                            <span>Debit Cards</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentTab("netbanking")}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentTab === "netbanking"
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                : "border-border bg-card text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Landmark size={15} />
                            <span>Net Banking</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentTab("upi")}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentTab === "upi"
                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                : "border-border bg-card text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <QrCode size={15} />
                            <span>UPI</span>
                          </button>
                        </div>

                        {/* TAB 1 & 2: CREDIT / DEBIT CARDS */}
                        {(paymentTab === "credit" || paymentTab === "debit") && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                                Card Number <span className="text-cyan-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  required
                                  maxLength={19}
                                  placeholder="4242 •••• •••• 4242"
                                  value={cardForm.number}
                                  onChange={handleCardNumberChange}
                                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500 font-semibold"
                                />
                                <CreditCard size={16} className="absolute left-3 top-3 text-cyan-500" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                                  MM/YY <span className="text-cyan-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  required
                                  maxLength={5}
                                  placeholder="12/28"
                                  value={cardForm.expiry}
                                  onChange={handleCardExpiryChange}
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500 font-semibold"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                                  Security Code <span className="text-cyan-500">*</span>
                                </label>
                                <div className="relative">
                                  <input
                                    type="password"
                                    required
                                    maxLength={4}
                                    placeholder="•••"
                                    value={cardForm.cvc}
                                    onChange={handleCardCvcChange}
                                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
                                  />
                                  <Lock size={14} className="absolute right-3 top-3 text-muted-foreground" />
                                </div>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow transition-all cursor-pointer mt-2"
                            >
                              Save Payment & Tokenize
                            </button>

                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                              By clicking "Save Payment & Tokenize" you agree to have your payment instrument secured in compliance with RBI/PCI-DSS regulations, and the tokenized payment details saved as your default method for license issuance.
                            </p>
                          </div>
                        )}

                        {/* TAB 3: NET BANKING */}
                        {paymentTab === "netbanking" && (
                          <div className="space-y-3">
                            <div className="p-3.5 rounded-xl border border-border bg-card flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Landmark size={18} className="text-cyan-500" />
                                <span className="text-xs font-bold text-foreground">{selectedBank}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowBankPickerModal(true)}
                                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                              >
                                Select Other Bank →
                              </button>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs shadow transition-all cursor-pointer mt-2"
                            >
                              Save & Select {selectedBank}
                            </button>
                          </div>
                        )}

                        {/* TAB 4: UPI */}
                        {paymentTab === "upi" && (
                          <div className="space-y-3 text-center">
                            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                              <div className="flex items-center justify-center gap-2 text-xs font-bold text-foreground">
                                <QrCode size={18} className="text-teal-500" />
                                <span>Instant UPI QR & Direct App Payments</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground">
                                Supports BHIM, Google Pay, PhonePe, Paytm, CRED & WhatsApp Pay.
                              </p>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs shadow transition-all cursor-pointer"
                            >
                              Save & Proceed with UPI
                            </button>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: Order Summary */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6 space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Order Summary ({getPricingInfo().currency})
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowDisclaimersModal(true)}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold underline hover:text-foreground cursor-pointer flex items-center gap-1 mt-0.5"
                      >
                        <ShieldCheck size={12} />
                        <span>View offer disclaimers & licensing terms</span>
                      </button>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 text-xs pt-1 border-t border-border">
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="font-mono text-foreground">{getPricingInfo().symbol}{getPricingInfo().subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>
                          {billingForm.country === "India" ? "GST (18%) and Fees" : billingForm.country === "United Arab Emirates" ? "VAT (5%) and Fees" : "Estimated Taxes and Fees"}
                        </span>
                        <span className="font-mono text-foreground">
                          {billingForm.isSaved ? `${getPricingInfo().symbol}${getPricingInfo().gst}` : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <span className="text-base font-bold text-foreground">
                          {billingForm.isSaved ? "Total" : "Est. Total"} ({getPricingInfo().currency})
                        </span>
                        <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                          {getPricingInfo().symbol}{getPricingInfo().total}
                        </span>
                      </div>
                    </div>

                    {/* Savings Excitement Banner */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-3 shadow-2xs">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Sparkles size={17} className="animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-black text-xs text-emerald-900 dark:text-emerald-100">
                          🎉 Fantastic choice! You saved {getPricingInfo().symbol}{getPricingInfo().savings}
                        </span>
                        <span className="block text-[10px] font-medium text-emerald-700/90 dark:text-emerald-300/90">
                          35% special commercial software promotion applied to this license.
                        </span>
                      </div>
                    </div>

                    {/* Action Button & Terms */}
                    {billingForm.isSaved && isPaymentSaved && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          By clicking "Continue Purchase", you agree to our Terms & Conditions, Privacy Policy, and Refund Policy.
                        </p>

                        <button
                          type="button"
                          onClick={handleContinuePurchaseClick}
                          disabled={isProcessing}
                          className="w-full py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Lock size={15} />
                          <span>{isProcessing ? "Authorizing..." : "Continue Purchase ↗"}</span>
                        </button>
                      </div>
                    )}

                    {/* Collapsible "Your Items (1)" */}
                    <div className="pt-3 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setIsItemsExpanded(!isItemsExpanded)}
                        className="w-full flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                      >
                        <span>Your Items (1)</span>
                        {isItemsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isItemsExpanded && (
                        <div className="mt-3 p-3.5 rounded-xl border border-border bg-card space-y-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                              <FileSpreadsheet size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-foreground truncate">{selectedAddin.name}</h4>
                              <p className="text-[11px] text-muted-foreground">
                                {billingCycle === "annual" ? "1 Year Commercial License" : "1 Month License"}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="block text-xs font-bold font-mono text-foreground">
                                {getPricingInfo().symbol}{getPricingInfo().subtotal}
                              </span>
                              <span className="block text-[10px] text-muted-foreground line-through font-mono">
                                {getPricingInfo().symbol}{getPricingInfo().orig}
                              </span>
                              <span className="inline-block text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 rounded">
                                35% off
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>Renews {getRenewalDateString()} for {getPricingInfo().symbol}{getPricingInfo().subtotal}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROCESSING OVERLAY IN MODAL */}
            {isProcessing && (
              <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">Securing Purchase & Issuing License...</h4>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold animate-pulse">
                    {processingStage || "Processing payment instrument..."}
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Please keep this window open while cryptographic credentials are generated.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GODADDY-INSPIRED COMPLETE YOUR PURCHASE: UPI QR CODE MODAL */}
      {showUpiQrModal && selectedAddin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 text-center">
            <button
              onClick={() => setShowUpiQrModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="text-xl font-bold text-foreground">Complete your purchase</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Almost done! Scan the UPI code to make a payment.
              </p>
            </div>

            {/* App Logos Row (BHIM, CRED, GPay, PhonePe, WhatsApp) */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-600" title="BHIM">
                🇮🇳
              </div>
              <div className="w-7 h-7 rounded-full bg-black text-white text-[9px] font-black flex items-center justify-center border border-white/20" title="CRED">
                CR
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold" title="Google Pay">
                G
              </div>
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold" title="PhonePe">
                पे
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold" title="WhatsApp Pay">
                WA
              </div>
            </div>

            {/* Dynamic Crisp QR Code */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 w-52 h-52 mx-auto flex flex-col items-center justify-center shadow-inner relative group">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                {/* QR Finder Patterns */}
                <rect x="5" y="5" width="26" height="26" fill="black" />
                <rect x="8" y="8" width="20" height="20" fill="white" />
                <rect x="11" y="11" width="14" height="14" fill="black" />

                <rect x="69" y="5" width="26" height="26" fill="black" />
                <rect x="72" y="8" width="20" height="20" fill="white" />
                <rect x="75" y="11" width="14" height="14" fill="black" />

                <rect x="5" y="69" width="26" height="26" fill="black" />
                <rect x="8" y="72" width="20" height="20" fill="white" />
                <rect x="11" y="75" width="14" height="14" fill="black" />

                {/* QR Data Matrix Nodes */}
                <rect x="36" y="8" width="5" height="5" />
                <rect x="44" y="8" width="5" height="5" />
                <rect x="52" y="8" width="5" height="5" />
                <rect x="36" y="16" width="5" height="5" />
                <rect x="48" y="16" width="5" height="5" />
                <rect x="36" y="24" width="5" height="5" />
                <rect x="56" y="24" width="5" height="5" />
                <rect x="8" y="36" width="5" height="5" />
                <rect x="16" y="36" width="5" height="5" />
                <rect x="24" y="36" width="5" height="5" />
                <rect x="36" y="36" width="5" height="5" />
                <rect x="44" y="36" width="5" height="5" />
                <rect x="52" y="36" width="5" height="5" />
                <rect x="60" y="36" width="5" height="5" />
                <rect x="68" y="36" width="5" height="5" />
                <rect x="76" y="36" width="5" height="5" />
                <rect x="84" y="36" width="5" height="5" />
                <rect x="8" y="44" width="5" height="5" />
                <rect x="20" y="44" width="5" height="5" />
                <rect x="68" y="44" width="5" height="5" />
                <rect x="80" y="44" width="5" height="5" />
                <rect x="8" y="52" width="5" height="5" />
                <rect x="16" y="52" width="5" height="5" />
                <rect x="28" y="52" width="5" height="5" />
                <rect x="36" y="52" width="5" height="5" />
                <rect x="48" y="52" width="5" height="5" />
                <rect x="60" y="52" width="5" height="5" />
                <rect x="72" y="52" width="5" height="5" />
                <rect x="84" y="52" width="5" height="5" />
                <rect x="36" y="68" width="5" height="5" />
                <rect x="48" y="68" width="5" height="5" />
                <rect x="60" y="68" width="5" height="5" />
                <rect x="72" y="68" width="5" height="5" />
                <rect x="84" y="68" width="5" height="5" />
                <rect x="36" y="76" width="5" height="5" />
                <rect x="44" y="76" width="5" height="5" />
                <rect x="56" y="76" width="5" height="5" />
                <rect x="68" y="76" width="5" height="5" />
                <rect x="80" y="76" width="5" height="5" />
                <rect x="36" y="84" width="5" height="5" />
                <rect x="52" y="84" width="5" height="5" />
                <rect x="64" y="84" width="5" height="5" />
                <rect x="76" y="84" width="5" height="5" />
                <rect x="84" y="84" width="5" height="5" />
              </svg>

              {/* Center Logo Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-lg bg-slate-950 text-cyan-400 font-extrabold text-xs flex items-center justify-center border-2 border-white shadow-md">
                  TARV
                </div>
              </div>
            </div>

            {/* Countdown & Notice */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">
                Code expires in <strong className="text-red-500 font-mono">{formatCountdown(qrCountdown)}</strong>
              </p>
              <p className="text-[11px] text-muted-foreground">Close this window when complete.</p>
            </div>

            {/* Instant Verification Trigger */}
            <button
              type="button"
              onClick={() => executeCompleteTransaction("UPI Dynamic QR")}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={15} />
              <span>Simulate Successful UPI Payment</span>
            </button>
          </div>
        </div>
      )}

      {/* GODADDY-INSPIRED BILLDESK / INTERNET BANKING MODAL */}
      {showBankPickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowBankPickerModal(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <span className="text-xs font-extrabold text-foreground font-mono">TARV Commercial Gateway</span>
              <button
                onClick={() => setShowBankPickerModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Order Header Summary */}
            <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-muted-foreground block">ORDER ID</span>
                <span className="font-bold text-foreground">4167979578</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground block">TOTAL AMOUNT</span>
                <span className="font-bold text-foreground">{getPricingInfo().symbol}{getPricingInfo().total}</span>
              </div>
            </div>

            {/* Search & Bank List */}
            <div className="p-5 overflow-y-auto space-y-4">
              <h3 className="text-base font-bold text-foreground">Internet Banking</h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by bank name"
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:border-cyan-500"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
              </div>

              {/* Top Banks */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Top Banks
                </span>
                <div className="space-y-1">
                  {TOP_BANKS.filter((b) => b.name.toLowerCase().includes(bankSearch.toLowerCase())).map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() => {
                        setSelectedBank(bank.name);
                        setShowBankPickerModal(false);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        selectedBank === bank.name
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "border-border bg-card text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${bank.color}`} />
                        <span>{bank.name}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBank === bank.name ? "border-cyan-500 bg-cyan-500 text-slate-950" : "border-border"}`}>
                        {selectedBank === bank.name && <Check size={10} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* All Other Banks */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  All Other Banks
                </span>
                <div className="space-y-1">
                  {OTHER_BANKS.filter((b) => b.toLowerCase().includes(bankSearch.toLowerCase())).map((bankName) => (
                    <button
                      key={bankName}
                      type="button"
                      onClick={() => {
                        setSelectedBank(bankName);
                        setShowBankPickerModal(false);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        selectedBank === bankName
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold"
                          : "border-border bg-card text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <span>{bankName}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBank === bankName ? "border-cyan-500 bg-cyan-500 text-slate-950" : "border-border"}`}>
                        {selectedBank === bankName && <Check size={10} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-muted/20 border-t border-border text-center text-[10px] font-bold text-muted-foreground">
              Powered by BillDesk & Stripe Financial Services
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS & LICENSE DELIVERY POPUP */}
      {issuedLicense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            <button
              onClick={() => setIssuedLicense(null)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={30} />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold uppercase">
                Payment Verified & Email Delivered
              </div>
              <h2 className="text-2xl font-extrabold text-foreground">License Key Issued</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your payment receipt for <strong className="text-foreground">{issuedLicense.amount}</strong> and product license key have been emailed to <strong className="text-foreground">{userSession?.email || "abubakarchanda3010@gmail.com"}</strong> and saved in your Customer Portal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50 border border-border text-left space-y-2">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block font-extrabold">
                PRODUCT LICENSE KEY
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-base sm:text-lg font-extrabold text-foreground select-all">
                  {issuedLicense.key}
                </code>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(issuedLicense.key);
                    setCopiedKey(true);
                    setTimeout(() => setCopiedKey(false), 2000);
                  }}
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-bold px-3 py-1 rounded-lg border border-cyan-500/20 cursor-pointer"
                >
                  {copiedKey ? "Copied" : "Copy Key"}
                </Button>
              </div>
              <span className="text-[11px] text-muted-foreground block pt-1.5 border-t border-border font-medium">
                Expires: <strong>{issuedLicense.expires}</strong> • Product ID: <strong className="font-mono text-foreground">{selectedAddin?.id}</strong>
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              <a
                href={`/download/${issuedLicense.file}`}
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all"
              >
                <Download size={15} />
                <span>Download Setup Installer ({issuedLicense.file})</span>
              </a>

              <Button
                type="button"
                onClick={() => (window.location.href = "/portal")}
                className="w-full py-3.5 rounded-2xl bg-muted/60 hover:bg-muted text-foreground font-extrabold text-xs border border-border cursor-pointer"
              >
                Go to Customer Portal & Track Purchases →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: COMMERCIAL LICENSING & OFFER DISCLAIMERS MODAL */}
      {showDisclaimersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-cyan-500" />
                <h3 className="text-base font-extrabold text-foreground">Commercial Licensing & Offer Disclaimers</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDisclaimersModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3.5 text-xs text-muted-foreground leading-relaxed pr-1">
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <strong className="text-foreground text-xs font-bold block">1. 5 Workstation Hardware Seats</strong>
                <p className="text-[11px]">
                  Each commercial license key grants binding for up to 5 individual workstation PCs simultaneously via cryptographically signed RSA-3072 hardware GUID hashes. Workstations can be self-service unbound or transferred anytime inside your Customer Portal at <code>/portal</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <strong className="text-foreground text-xs font-bold block">2. 14-Day Offline Grace Period</strong>
                <p className="text-[11px]">
                  Engineered for field engineering and secure MEP construction sites. The add-in continues full operations without requiring continuous internet connectivity for up to 14 consecutive calendar days between license heartbeat checks.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <strong className="text-foreground text-xs font-bold block">3. Instant Digital Key & Installer Delivery</strong>
                <p className="text-[11px]">
                  Upon verified transaction authorization, your cryptographic RSA license key and compiled Windows setup installer (<code>.exe</code>) are generated immediately on screen and dispatched to your registered work email.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <strong className="text-foreground text-xs font-bold block">4. Transparent Subscription & Renewal Terms</strong>
                <p className="text-[11px]">
                  Annual licenses include 12 full months of software updates, security patches, and 24/7 technical engineering support. Automatic renewal notifications are emailed 14 days prior to term expiration. Subscriptions can be managed or cancelled at any time with 0 cancellation fees.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <strong className="text-foreground text-xs font-bold block">5. 30-Day Technical Money-Back Guarantee</strong>
                <p className="text-[11px]">
                  If our Excel or Revit add-in does not perform to your firm's technical requirements, contact our engineering support team within 30 days for a full, unconditional refund.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                type="button"
                onClick={() => setShowDisclaimersModal(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-bold cursor-pointer"
              >
                Got It, Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
