import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../hooks/use-theme";
import { SparklerCursor } from "../components/site/sparkler-cursor";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "../styles.css";
import { reportLovableError } from "../lib/lovable-error-reporting";

const baseUrl = import.meta.env.BASE_URL;
const siteUrl = "https://tarvofficial.vercel.app/";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested page could not be located on TARV Engineering.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Unable to Load Engineering Component
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A temporary error occurred. Please try refreshing or return to the main dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 cursor-pointer"
          >
            Retry
          </button>
          <a
            href={baseUrl}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-surface"
          >
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TARV",
    operatingSystem: "Web-based, Windows, macOS",
    applicationCategory: "EngineeringSoftware",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    description:
      "TARV is the premier AI-powered platform for MEP (mechanical, electrical, plumbing) design automation, HVAC heat load calculations, equipment schedules, and Revit BIM 2-way parameter sync.",
    author: {
      "@type": "Organization",
      name: "TARV Engineering",
      address: {
        "@type": "PostalAddress",
        streetAddress: "API World Tower 403, Sheikh Zayed Rd",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <title>TARV — AI-Powered MEP Design Automation & HVAC Calculations</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="TARV is the #1 AI-powered platform for MEP (mechanical, electrical, plumbing) design automation. Real-time HVAC heat load sizing, automated BIM equipment schedules, and ASHRAE & IPC code compliance."
        />
        <meta
          name="keywords"
          content="MEP Engineering Software, AI HVAC Calculator, Revit BIM Parameter Sync, Electrical Voltage Drop Calculation, Duct Static Pressure Solver, Dubai UAE MEP, ASHRAE Load Calculation"
        />
        <meta name="author" content="TARV Engineering" />
        <meta property="og:site_name" content="TARV Engineering" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TARV — AI-Powered MEP Design Automation" />
        <meta property="og:description" content="Automate mechanical, electrical, and plumbing engineering calculations with 99.4% ASHRAE accuracy." />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TARV — AI-Powered MEP Engineering Software" />
        <meta name="twitter:description" content="Physics-based solver engine for HVAC load calculations, single-line diagrams, and BIM schedules." />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" type="image/png" href={`${baseUrl}favicon.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SparklerCursor />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
