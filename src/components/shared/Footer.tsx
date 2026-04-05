import React from "react";
import { Link } from "wouter";
import { usePageTheme } from "@/context/PageTheme";

function IconMonitor() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

/* Luminance relative d'une couleur hex */
function hexLuminance(hex: string): number {
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const lin = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  } catch { return 0; }
}

/* Renvoie l'accent si visible sur le fond donné, sinon un bleu clair de secours */
function safeAccent(accent: string, bgDark: boolean): string {
  const lum = hexLuminance(accent);
  if (bgDark) return lum > 0.06 ? accent : "#60a5fa";
  return lum < 0.7 ? accent : "#1d4ed8";
}

export function Footer() {
  const theme = usePageTheme();
  const bg = theme.footerBg;
  const dark = theme.footerIsDark !== false;
  const accent = safeAccent(theme.accent, dark);
  const border  = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";
  const textMain = dark ? "rgba(255,255,255,0.65)" : "#374151";
  const textMuted = dark ? "rgba(255,255,255,0.35)" : "#9ca3af";
  const headingColor = dark ? "#ffffff" : "#111827";

  return (
    <footer className="py-14" style={{ backgroundColor: bg, color: textMain, borderTop: `1px solid ${border}` }}>
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-home">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: accent }}>
                <IconMonitor />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', color: headingColor }}>
                <span style={{ color: accent }}>Commande</span>TonSite
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
              Votre partenaire pour la creation de sites web professionnels en Republique Democratique du Congo.
            </p>
          </div>

          {/* Secteurs */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: headingColor }}>Secteurs</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/entreprise-informatique", label: "Entreprise Informatique" },
                { href: "/hopital", label: "Hopital et Sante" },
                { href: "/ecole", label: "Ecoles et Instituts" },
                { href: "/restaurant", label: "Restaurants" },
                { href: "/automobile", label: "Automobile" },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: textMain }}
                    onMouseEnter={e => (e.currentTarget.style.color = headingColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = textMain)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plus */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: headingColor }}>Plus de Secteurs</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/influenceur", label: "Influenceurs et Agences" },
                { href: "/maison-habillement", label: "Maisons d'Habillement" },
                { href: "/supermarche", label: "Supermarches" },
                { href: "/salon-coiffure", label: "Salons de Beaute" },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: textMain }}
                    onMouseEnter={e => (e.currentTarget.style.color = headingColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = textMain)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: headingColor }}>Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/243819730124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  style={{ color: textMain }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
                    <IconWhatsApp />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: textMuted }}>WhatsApp</div>
                    <span className="font-medium text-sm" style={{ color: headingColor }}>Envoyer un message</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: textMain }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
                  <IconMapPin />
                </div>
                <span>Lubumbashi, RDC</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderTop: `1px solid ${border}`, color: textMuted }}>
          <p className="text-center sm:text-left">© {new Date().getFullYear()} CommandeTonSite. Tous droits reserves.</p>
          <span style={{ color: textMain }}>
            cree par <span className="font-semibold" style={{ color: accent }}>Djochrist K.</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
