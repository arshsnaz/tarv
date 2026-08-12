import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, ArrowRight } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { href: "#top", label: "Home" },
  { href: "#platform", label: "Platform" },
  { href: "#hvac", label: "HVAC" },
  { href: "#schedules", label: "Schedules" },
  { href: "#ai", label: "AI" },
  { href: "#company", label: "Company" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const logoSrc = `${import.meta.env.BASE_URL}favicon.png`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToHash(e: React.MouseEvent, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    if (pathname === "/") {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate({ to: "/", hash: id === "top" ? "" : id });
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full items-center gap-6 rounded-full border border-border/40 bg-background/40 px-4 py-2.5 shadow-sm backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          scrolled ? "max-w-4xl" : "max-w-5xl"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => goToHash(e, "#top")}
          className="flex min-w-0 shrink-0 items-center gap-2"
        >
          <img
            src={logoSrc}
            alt="TARV logo"
            className="size-7 shrink-0 rounded-md bg-foreground/5 object-contain p-0.5 dark:invert"
          />
          <span className="font-display text-lg font-bold tracking-tight">TARV</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <button
                key={l.href}
                type="button"
                onClick={() => navigate({ to: l.href })}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goToHash(e, l.href)}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => {
              navigate({ to: "/access" });
              setOpen(false);
            }}
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get access <ArrowRight size={14} />
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute inset-x-4 top-20 rounded-3xl p-4 md:hidden border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
          <nav className="flex flex-col">
            {links.map((l) =>
              l.href.startsWith("/") ? (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    navigate({ to: l.href });
                    setOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {l.label}
                </button>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    goToHash(e, l.href);
                    setOpen(false);
                  }}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {l.label}
                </a>
              )
            )}
            <button
              type="button"
              onClick={() => {
                navigate({ to: "/access" });
                setOpen(false);
              }}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Get access <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}