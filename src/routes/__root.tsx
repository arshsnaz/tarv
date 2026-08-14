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
  const ogImageUrl = `${siteUrl}og-image.jpg`;

  const structuredSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "TARV MEP Engineering AI Software",
      operatingSystem: "Web-based, Windows, macOS",
      applicationCategory: "EngineeringSoftware",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "USD",
      },
      description:
        "TARV is the premier AI-powered online MEP calculator and design automation software. Performs HVAC heat load calculations, electrical voltage drop sizing, duct static pressure solving, plumbing sizing, and Revit BIM parameter sync.",
      url: siteUrl,
      image: ogImageUrl,
      author: {
        "@type": "Organization",
        name: "TARV Engineering",
        url: siteUrl,
        logo: `${siteUrl}favicon.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "API World Tower 403, Sheikh Zayed Rd - Trade Center First",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "TARV MEP Engineering Software",
      url: siteUrl,
      description: "Free Online MEP Engineering Calculator, Design Automation Software & HVAC Electrical Plumbing Tools.",
    },
  ];

  return (
    <html lang="en" className="dark">
      <head>
        <title>TARV — #1 AI MEP Calculator Online & MEP Engineering Software</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Free Online MEP Calculator & Engineering Software. Automate HVAC heat load sizing, electrical voltage drop, duct static pressure, plumbing formulas, and Revit BIM schedules with AI precision."
        />
        <meta
          name="keywords"
          content="MEP calculator, MEP calculator online, free MEP calculator, MEP engineering calculator, MEP tools online, MEP design tools, MEP formulas, MEP calculation software, online engineering calculator MEP, HVAC electrical plumbing calculator, ASHRAE heat load solver, Revit BIM parameter sync"
        />
        <meta name="author" content="TARV Engineering" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#090d16" />

        {/* OpenGraph / Social Sharing */}
        <meta property="og:site_name" content="TARV Engineering" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TARV — #1 AI MEP Calculator Online & MEP Engineering Software" />
        <meta property="og:description" content="Free Online MEP Engineering Calculator & AI Design Tools. Calculate HVAC heat loads, electrical voltage drop, airflow CFM, and plumbing risers instantly." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TARV — #1 AI MEP Calculator Online & MEP Engineering Software" />
        <meta name="twitter:description" content="Physics-based online MEP calculator & design automation software for HVAC, electrical, and plumbing engineering." />
        <meta name="twitter:image" content={ogImageUrl} />

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchemas) }}
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
