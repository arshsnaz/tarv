import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, ArrowRight, LogOut, User } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";
import { getActiveUserSession, logoutUserSession, UserSession } from "@/lib/auth";

const links = [
  { href: "#top", label: "Home" },
  { href: "#platform", label: "Platform" },
  { href: "/addins", label: "Add-ins" },
  { href: "/portal", label: "Portal" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
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

  useEffect(() => {
    getActiveUserSession().then((sess) => {
      setUserSession(sess);
    });
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUserSession();
    setUserSession(null);
    if (pathname === "/portal") {
      window.location.reload();
    }
  };

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
        className={`flex w-full items-center gap-4 sm:gap-6 rounded-full border-2 border-border/80 dark:border-white/20 bg-card/90 dark:bg-slate-900/90 px-5 py-2.5 shadow-lg shadow-black/5 dark:shadow-black/60 backdrop-blur-2xl transition-all duration-500 ${
          scrolled ? "max-w-5xl" : "max-w-6xl"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => goToHash(e, "#top")}
          className="flex min-w-0 shrink-0 items-center gap-2 group"
        >
          <img
            src={logoSrc}
            alt="TARV logo"
            className="size-7 shrink-0 rounded-md bg-foreground/5 object-contain p-0.5 dark:invert group-hover:scale-105 transition-transform"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">TARV</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:gap-8 text-sm font-bold text-muted-foreground dark:text-slate-200 md:flex">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <button
                key={l.href}
                type="button"
                onClick={() => navigate({ to: l.href })}
                className="whitespace-nowrap transition-colors hover:text-brand dark:hover:text-cyan-300 cursor-pointer"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goToHash(e, l.href)}
                className="whitespace-nowrap transition-colors hover:text-brand dark:hover:text-cyan-300"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid size-9 place-items-center rounded-full border border-border/80 dark:border-white/20 bg-muted/40 dark:bg-white/10 text-foreground dark:text-slate-200 transition-colors hover:bg-brand/20 hover:text-brand dark:hover:bg-white/20 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {userSession ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/portal" })}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                <User size={13} />
                <span className="max-w-[100px] truncate">{userSession.name}</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3.5 py-1.5 text-xs font-extrabold transition-all cursor-pointer"
                title="Sign Out / Logout"
              >
                <LogOut size={13} />
                <span className="hidden xs:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                navigate({ to: "/access" });
                setOpen(false);
              }}
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-md hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <span>Get access</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border/80 dark:border-white/20 text-foreground dark:text-slate-200 md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute inset-x-4 top-20 rounded-3xl p-5 md:hidden border-2 border-border/80 dark:border-white/20 bg-card/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-2xl">
          <nav className="flex flex-col space-y-1">
            {links.map((l) =>
              l.href.startsWith("/") ? (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    navigate({ to: l.href });
                    setOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-left text-base font-bold text-foreground dark:text-slate-200 transition-colors hover:bg-brand/10 hover:text-brand"
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
                  className="block rounded-xl px-4 py-3 text-base font-bold text-foreground dark:text-slate-200 transition-colors hover:bg-brand/10 hover:text-brand"
                >
                  {l.label}
                </a>
              )
            )}

            {userSession ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-3 text-base font-black shadow-lg"
              >
                <LogOut size={16} />
                <span>Sign Out ({userSession.name})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigate({ to: "/access" });
                  setOpen(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand text-brand-foreground px-4 py-3 text-base font-black shadow-lg hover:scale-105 transition-all"
              >
                <span>Get access</span>
                <ArrowRight size={16} />
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}