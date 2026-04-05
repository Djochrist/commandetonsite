import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { usePageTheme } from "@/context/PageTheme";

interface NavbarProps {
  appendRight?: React.ReactNode;
}

export function Navbar({ appendRight }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const theme = usePageTheme();

  const isDark = theme.navIsDark;
  const accent = theme.accent;

  const navText  = isDark ? "rgba(255,255,255,0.80)" : "#374151";
  const navHover = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const activeBg = accent + "22";
  const border   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/influenceur", label: "Influenceur" },
    { href: "/entreprise-informatique", label: "Informatique" },
    { href: "/automobile", label: "Automobile" },
    { href: "/hopital", label: "Hopital" },
    { href: "/maison-habillement", label: "Mode" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/supermarche", label: "Supermarche" },
    { href: "/ecole", label: "Ecole" },
    { href: "/salon-coiffure", label: "Coiffure" },
    { href: "/boutique-en-ligne", label: "Boutique" },
  ];

  const desktopMain = links.slice(0, 6);
  const desktopMore = links.slice(6);
  const isActive = (href: string) => location === href;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-300"
      style={{ background: theme.navBg, borderColor: border }}
    >
      <div className="container mx-auto px-4 h-16 grid items-center" style={{ gridTemplateColumns: "auto 1fr auto" }}>

        {/* ── Logo (left) ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" data-testid="link-home">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: accent }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block" style={{ fontFamily: 'Space Grotesk, sans-serif', color: navText }}>
            <span style={{ color: accent }}>Commande</span>TonSite
          </span>
        </Link>

        {/* ── Desktop nav (center) ── */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5">
          {desktopMain.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap"
              style={{
                color: isActive(link.href) ? accent : navText,
                background: isActive(link.href) ? activeBg : "transparent",
              }}
              onMouseEnter={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.background = navHover; }}
              onMouseLeave={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative group">
            <button
              className="px-3.5 py-2 text-sm font-semibold rounded-md flex items-center gap-1 transition-colors"
              style={{ color: navText }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = navHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              Plus...
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
              style={{ background: theme.navBg, borderColor: border }}
            >
              <div className="p-2 flex flex-col gap-0.5">
                {desktopMore.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
                    style={{
                      color: isActive(link.href) ? accent : navText,
                      background: isActive(link.href) ? activeBg : "transparent",
                    }}
                    onMouseEnter={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.background = navHover; }}
                    onMouseLeave={e => { if (!isActive(link.href)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile spacer (so grid columns still work) */}
        <div className="lg:hidden" />

        {/* ── Right: optional slot + Contact + hamburger ── */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          {appendRight}
          <a
            href="https://wa.me/243819730124"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-bold rounded-lg transition-colors text-white whitespace-nowrap"
            style={{ backgroundColor: isDark ? accent : "#111111" }}
            data-testid="link-nav-contact"
          >
            Contact
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: navText }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            data-testid="button-mobile-menu"
          >
            {isOpen ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed left-0 right-0 border-b z-[200]"
          style={{
            top: "64px",
            background: theme.navBg,
            borderColor: border,
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-0.5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-base font-semibold rounded-xl transition-colors"
                style={{
                  color: isActive(link.href) ? accent : navText,
                  background: isActive(link.href) ? activeBg : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/243819730124"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mx-0 px-4 py-3 text-center font-bold rounded-xl text-white text-base"
              style={{ backgroundColor: isDark ? accent : "#111111" }}
              onClick={() => setIsOpen(false)}
            >
              Contactez-nous
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
