import React from "react";
import { usePageTheme } from "@/context/PageTheme";

function IconMonitor({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
    </svg>
  );
}

/* Calcule la luminance relative d'une couleur hex pour déterminer si elle est lisible sur fond sombre */
function hexLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/* Renvoie l'accent tel quel s'il est assez visible sur fond sombre, sinon un bleu vif */
function visibleAccent(accent: string): string {
  try {
    const lum = hexLuminance(accent);
    /* Sur fond #0f172a (luminance ≈ 0.01), l'accent doit être assez lumineux (> 0.08) */
    return lum > 0.08 ? accent : "#60a5fa";
  } catch {
    return "#60a5fa";
  }
}

export function OrderWebsiteSection() {
  const theme = usePageTheme();
  const accent = visibleAccent(theme.accent);

  return (
    <section className="py-24 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-white/10 p-12 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <IconMonitor color={accent} />
              <span className="font-semibold uppercase tracking-widest text-sm" style={{ color: accent }}>
                CommandeTonSite
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Commandez votre<br />site web aujourd'hui
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Vous voulez un site professionnel comme celui-ci ? Nous creeons des sites pour tous les secteurs en RDC. Devis gratuit, reponse sous 24h.
            </p>
          </div>
          <div className="flex-shrink-0 text-center">
            <a
              href="https://wa.me/243819730124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-bold px-10 py-5 text-lg transition-opacity hover:opacity-88"
              style={{ backgroundColor: accent }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Commander maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
