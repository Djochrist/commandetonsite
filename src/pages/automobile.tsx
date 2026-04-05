import React, { useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider } from "@/context/PageTheme";
import { Car, Wrench, Shield, CreditCard, RefreshCw, Layers, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useColorScheme } from "@/hooks/useColorScheme";
import Lenis from "lenis";

/* ─── Accent : bleu cobalt premium (remplace le rouge) ─── */
const ACCENT   = "#2563eb";
const ACCENT_H = "#1d4ed8";
const ACCENT_L = "#60a5fa";

const WA = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

/* ─── Logo SVG premium (diamant + lettres) ─── */
function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="0" y="0" width="40" height="40" fill={ACCENT} />
      <path d="M20 6 L34 20 L20 34 L6 20 Z" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M14 20 L20 13 L26 20 L20 27 Z" fill="white" />
      <line x1="0" y1="20" x2="6" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <line x1="34" y1="20" x2="40" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
}

/* ─── Counter hook ─── */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step); else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

function StatItem({ val, lbl, delay }: { val: string; lbl: string; delay: number }) {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const match = val.match(/^(\d+)(.*)$/);
  const numPart = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : val;
  const count = useCountUp(numPart ?? 0, 1600, inView);
  const display = numPart !== null ? `${count}${suffix}` : val;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }} className="text-center text-white">
      <div className="text-3xl font-bold tabular-nums" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{display}</div>
      <motion.div className="mx-auto my-1.5 h-px" style={{ background: "rgba(255,255,255,0.5)", width: 0 }}
        animate={inView ? { width: "48px" } : {}} transition={{ duration: 1.4, delay: delay + 0.2, ease: "easeOut" }} />
      <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>{lbl}</div>
    </motion.div>
  );
}

/* ─── Theme toggle ─── */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
      className="flex items-center justify-center w-9 h-9 transition-all"
      style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.80)" }}>
      {isDark
        ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
    </button>
  );
}

/* ─── Navbar automobile ─── */
function AutoNavbar({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true }); h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* ── Couleurs adaptatives selon le thème ── */
  const inHero = !scrolled;
  /* Dans le hero la photo est toujours sombre → texte blanc. */
  /* Hors hero (scrolled), on adapte au thème. */
  const navTextColor  = inHero || isDark ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.80)";
  const navTextHover  = inHero || isDark ? "#ffffff" : "#0f172a";
  const navBgScrolled = isDark
    ? "rgba(5,8,20,0.96)"
    : "rgba(248,248,246,0.96)";
  const toggleBg = inHero || isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)";
  const toggleColor = inHero || isDark ? "rgba(255,255,255,0.80)" : "rgba(15,23,42,0.75)";

  return (
    <nav className="fixed left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500"
      style={{
        top: "64px",
        background: scrolled ? navBgScrolled : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled && !isDark ? "1px solid rgba(0,0,0,0.08)" : "none",
      }}>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <LogoMark size={32} />
        <div className="flex flex-col leading-none">
          <span className="font-bold text-sm tracking-[0.12em] uppercase select-none transition-colors duration-300"
            style={{ color: navTextColor === "rgba(255,255,255,0.85)" ? "#fff" : "#0f172a" }}>
            AutoPremium
          </span>
          <span className="text-[10px] tracking-[0.35em] uppercase select-none" style={{ color: ACCENT_L }}>Congo</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {[["Modeles","vehicules"],["Services","services"],["Tarifs","tarifs"],["Galerie","galerie"]].map(([label, id]) => (
          <button key={label} onClick={() => {
              const el = document.getElementById(id);
              if (!el) return;
              window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
            }}
            className="text-sm tracking-wide transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0"
            style={{ color: navTextColor }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = navTextHover}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = navTextColor}>
            {label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Theme toggle adapté */}
        <button onClick={onToggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
          className="flex items-center justify-center w-9 h-9 transition-all duration-300"
          style={{ background: toggleBg, color: toggleColor }}>
          {isDark
            ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
        </button>

        <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
          className="hidden sm:block text-sm font-bold text-white uppercase tracking-wider px-5 py-2.5 transition-all duration-200"
          style={{ background: ACCENT }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = ACCENT_H}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ACCENT}>
          Contact
        </a>
      </div>
    </nav>
  );
}

/* ─── FadeSection ─── */
function FadeSection({ children, className, style, id }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.12], ["48px", "0px"]);
  return (
    <motion.section ref={ref} id={id} className={className}
      style={{ position: "relative", opacity, y, scrollMarginTop: id ? "128px" : undefined, ...style }}>
      {children}
    </motion.section>
  );
}

/* ─── Smooth scroll ─── */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.45, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let rafId: number;
    const loop = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
}

/* ─── Data ─── */
const VEHICLES = [
  { img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80", name: "Serie M Performance", price: "$ 65 000+", specs: "V6 · 340cv · 0-100 en 5.1s" },
  { img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80", name: "Classe Premium G", price: "$ 82 000+", specs: "V8 · 450cv · 4MATIC integral" },
  { img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80", name: "SUV Tout-Terrain G-Pro", price: "$ 54 000+", specs: "V6 · 280cv · AWD · 7 places" },
  { img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80", name: "Pickup Force-X", price: "$ 48 000+", specs: "V6 Diesel · 200cv · 4x4 Lock" },
];

const BRANDS = ["Toyota", "Mercedes-Benz", "BMW", "Land Rover", "Mitsubishi", "Nissan", "Ford", "Hyundai", "Porsche", "Audi", "Volvo", "Kia"];

const SERVICES = [
  { icon: Car,        title: "Vente vehicules neufs",          desc: "Avec garantie constructeur complete" },
  { icon: Shield,     title: "Occasion certifiee",             desc: "100 points de controle systematiques" },
  { icon: Wrench,     title: "Atelier mecanique de pointe",    desc: "Techniciens certifies constructeurs" },
  { icon: Layers,     title: "Carrosserie et peinture",        desc: "Service premium · Cabine de peinture" },
  { icon: CreditCard, title: "Financement sur mesure",         desc: "Jusqu'a 60 mois · Taux preferentiel" },
  { icon: RefreshCw,  title: "Reprise de votre vehicule",      desc: "Estimation gratuite · Offre immediate" },
];

const TARIFS = [
  { service: "Vidange + Filtre a huile",      prix: "$25 — $45",      detail: "Huile synthetique ou minerale selon constructeur" },
  { service: "Plaquettes de frein",           prix: "$40 — $80",      detail: "Plaquettes + verification disques incluse" },
  { service: "Diagnostic electronique OBD",   prix: "$15 — $30",      detail: "Lecture des codes defauts, rapport complet" },
  { service: "Remplacement batterie",         prix: "$60 — $150",     detail: "Batterie neuve + test alternateur offert" },
  { service: "Revision complete 30 000 km",   prix: "$120 — $200",    detail: "Filtres, bougies, liquides, courroie verifiee" },
  { service: "Climatisation (recharge gaz)",  prix: "$35 — $70",      detail: "Recharge R134a + verification compresseur" },
  { service: "Carrosserie et peinture",       prix: "Sur devis",      detail: "Retouche, reparation choc, peinture complete" },
  { service: "Pneus + equilibrage",           prix: "$10 — $20/pneu", detail: "Pose + equilibrage + controle pression TPMS" },
];

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=700&auto=format&fit=crop&q=80", name: "Berline Sport Elite" },
  { img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&auto=format&fit=crop&q=80", name: "Coupe Grand Luxe" },
  { img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=700&auto=format&fit=crop&q=80", name: "Cabriolet Prestige" },
  { img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80", name: "SUV Tout-Terrain V8" },
  { img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=700&auto=format&fit=crop&q=80", name: "Roadster Electrique" },
  { img: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=700&auto=format&fit=crop&q=80", name: "Crossover 4x4 Pro" },
];

/* ════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════ */
export default function Automobile() {
  const { isDark, toggle } = useColorScheme();
  useSmoothScroll();

  useSEO({
    title: "Garage Automobile Lubumbashi | CommandeTonSite",
    description: "Demo site web pour garage et concession automobile a Lubumbashi. Catalogue vehicules, services atelier, prise de rendez-vous et devis en ligne via WhatsApp.",
    path: "/automobile",
    keywords: "garage automobile Lubumbashi, concession voiture Congo, mecanicien Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "AutoDealer", name: "AutoPremium Congo", url: "https://commandetonsite.vercel.app/automobile" },
  });

  const { scrollY } = useScroll();
  const heroTextY  = useTransform(scrollY, [0, 700], ["0%", "22%"]);
  const heroTextOp = useTransform(scrollY, [0, 580], [1, 0]);
  const heroBgY    = useTransform(scrollY, [0, 700], ["0%", "18%"]);
  const heroScale  = useTransform(scrollY, [0, 700], [1.05, 1.12]);

  const pageBg    = isDark ? "#050810" : "#f8f8f6";
  const sectionA  = isDark ? "#090c18" : "#ffffff";
  const sectionB  = isDark ? "#0d1120" : "#f0f0ee";
  const text      = isDark ? "#f1f5f9" : "#0f172a";
  const textSub   = isDark ? "#64748b" : "#909090";
  const border    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
  const borderLt  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
  const navBg     = isDark ? "rgba(5,8,16,0.97)" : "rgba(248,248,246,0.97)";

  const autoTheme = { accent: ACCENT, navBg, navIsDark: isDark, footerBg: "#020510", footerIsDark: true };

  return (
    <PageThemeProvider theme={autoTheme}>
    <style>{`
      @keyframes auto-marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      .auto-marquee { animation: auto-marquee 32s linear infinite; display: flex; width: max-content; }
      .auto-marquee:hover { animation-play-state: paused; }

      @keyframes hero-drive {
        0%   { transform: scale(1.05) translateX(0); }
        50%  { transform: scale(1.08) translateX(-1.5%); }
        100% { transform: scale(1.05) translateX(0); }
      }
      .hero-drive { animation: hero-drive 18s ease-in-out infinite; }

      @keyframes speed-line {
        0%   { opacity: 0; transform: translateX(-100%); }
        20%  { opacity: 0.6; }
        100% { opacity: 0; transform: translateX(200%); }
      }
      .speed-line { animation: speed-line 2.4s ease-in-out infinite; }
    `}</style>

    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300"
      style={{ background: pageBg, color: text, fontFamily: "Rajdhani, sans-serif" }}>
      <Navbar />
      <AutoNavbar isDark={isDark} onToggle={toggle} />

      <main className="flex-grow">

        {/* ══════ HERO — Voiture en mouvement, style Tesla ══════ */}
        <div className="relative h-screen overflow-hidden">

          {/* Image avec animation de conduite (Ken Burns + dérive latérale) */}
          <motion.div style={{ y: heroBgY, scale: heroScale }} className="absolute inset-[-8%] z-0">
            <div className="hero-drive absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&auto=format&fit=crop&q=90)" }} />
            {/* Overlay minimal Tesla-style */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 30%, rgba(5,8,16,0.55) 78%, rgba(5,8,16,0.85) 100%)" }} />
          </motion.div>

          {/* Lignes de vitesse (effet cinétique) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[15, 35, 55, 72, 88].map((top, i) => (
              <div key={i} className="speed-line absolute h-px bg-white/20"
                style={{ top: `${top}%`, left: 0, right: 0, animationDelay: `${i * 0.45}s`, animationDuration: `${2.2 + i * 0.3}s` }} />
            ))}
          </div>

          {/* Texte centré */}
          <motion.div style={{ y: heroTextY, opacity: heroTextOp }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
              className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: `${ACCENT_L}80` }} />
              <span className="text-white/70 text-[0.65rem] tracking-[0.35em] uppercase font-medium select-none">
                Lubumbashi, RDC · Etabli depuis 2014
              </span>
              <div className="h-px w-10" style={{ background: `${ACCENT_L}80` }} />
            </motion.div>

            {/* Brand name — Tesla-like typography */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <h1 className="text-white font-light leading-[0.88]"
                style={{ fontSize: "clamp(3.2rem, 11vw, 8.5rem)", letterSpacing: "-0.03em", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
                Auto<span className="font-black">Premium</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <h2 className="font-bold leading-none mt-2"
                style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)", letterSpacing: "-0.02em", color: ACCENT_L, textShadow: `0 0 60px ${ACCENT}55` }}>
                Congo
              </h2>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.9 }}
              className="text-white/65 text-sm tracking-[0.18em] uppercase mt-6 select-none">
              L'excellence automobile a Lubumbashi
            </motion.p>
          </motion.div>

          {/* CTAs flottants en bas — exactement comme Tesla */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7 }}
            className="absolute bottom-20 left-0 right-0 flex flex-col sm:flex-row gap-3 justify-center items-center z-10 px-6">
            <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
              className="w-72 py-4 text-center font-semibold tracking-widest uppercase text-sm transition-colors duration-200"
              style={{ background: ACCENT, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = ACCENT_H}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ACCENT}>
              Commander votre vehicule
            </a>
            <button onClick={() => {
                const el = document.getElementById("vehicules");
                if (!el) return;
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
              }}
              className="w-72 py-4 text-center text-white font-semibold tracking-widest uppercase text-sm transition-colors duration-200 cursor-pointer border-0"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"}>
              Voir les modeles
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-35 select-none">
            <div className="w-px h-8 bg-white" />
            <ChevronDown className="w-4 h-4 text-white" />
          </motion.div>
        </div>


        {/* ══════ STATS ══════ */}
        <FadeSection className="py-10" style={{ background: ACCENT }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[["500+","Vehicules vendus"],["10","Annees d'experience"],["100%","Certifies"],["7j/7","Service client"]].map(([val, lbl], i) => (
                <StatItem key={i} val={val} lbl={lbl} delay={i * 0.12} />
              ))}
            </div>
          </div>
        </FadeSection>


        {/* ══════ BRAND MARQUEE ══════ */}
        <FadeSection className="py-5 overflow-hidden" style={{ background: sectionA, borderBottom: `1px solid ${border}` }}>
          <div className="auto-marquee gap-14">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i}
                className="text-2xl font-bold uppercase tracking-widest cursor-default transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: text, opacity: 0.14 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.color = ACCENT_L; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.14"; e.currentTarget.style.color = text; }}>
                {b}<span style={{ color: ACCENT, margin: "0 1.75rem" }}>·</span>
              </span>
            ))}
          </div>
        </FadeSection>


        {/* ══════ VEHICULES ══════ */}
        <FadeSection id="vehicules" className="py-24" style={{ background: sectionA }}>
          <div className="container mx-auto px-6 md:px-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: ACCENT }}>Notre selection exclusive</p>
                <h2 className="text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: "Bebas Neue, sans-serif", color: text }}>
                  Vehicules d'Exception
                </h2>
              </div>
              <p className="text-sm" style={{ color: textSub }}>Stock disponible · Commande sur demande</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {VEHICLES.map((car, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "16/9", background: sectionB }}>
                  <img src={car.img} alt={car.name} loading="lazy"
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.20) 45%, transparent 70%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="mb-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-mono tracking-wider px-3 py-1.5" style={{ background: ACCENT, color: "#fff" }}>{car.specs}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-3xl font-bold uppercase text-white leading-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{car.name}</h3>
                        <p className="font-bold text-xl mt-0.5" style={{ color: ACCENT_L }}>{car.price}</p>
                      </div>
                      <div className="translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider px-5 py-2.5 text-white"
                          style={{ background: ACCENT }}>
                          Demander
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: ACCENT }} />
                  <div className="absolute top-4 right-4 text-xs font-mono opacity-0 group-hover:opacity-40 transition-opacity duration-400 text-white tracking-widest">
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeSection>


        {/* ══════ SERVICES ══════ */}
        <FadeSection id="services" className="py-24" style={{ background: sectionB }}>
          <div className="container mx-auto px-6 md:px-14 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-4" style={{ color: ACCENT }}>Ce que nous offrons</p>
                <h2 className="text-5xl font-bold mb-12 leading-none" style={{ fontFamily: "Bebas Neue, sans-serif", color: text }}>
                  Nos Services
                </h2>
                <div>
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-5 py-5 border-b group cursor-default transition-colors"
                        style={{ borderColor: borderLt }}
                        onMouseEnter={e => (e.currentTarget.style.borderBottomColor = ACCENT + "50")}
                        onMouseLeave={e => (e.currentTarget.style.borderBottomColor = borderLt)}>
                        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${ACCENT}12` }}>
                          <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                        </div>
                        <div>
                          <p className="font-bold text-base mb-0.5 uppercase tracking-wide" style={{ color: text }}>{s.title}</p>
                          <p className="text-sm" style={{ color: textSub }}>{s.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="md:sticky md:top-24">
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80"
                    alt="Atelier automobile" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ background: ACCENT }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white font-bold text-2xl uppercase mb-1" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                      L'Exigence a chaque etape
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>Pieces d'origine uniquement · Garantie SAV</p>
                  </div>
                </div>
                <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center gap-3 font-bold py-4 uppercase tracking-widest text-sm transition-opacity hover:opacity-85"
                  style={{ background: ACCENT, color: "#fff" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-white"><path d={WA} /></svg>
                  Prendre rendez-vous atelier
                </a>
              </div>
            </div>
          </div>
        </FadeSection>


        {/* ══════ TARIFS ══════ */}
        <FadeSection id="tarifs" className="py-24" style={{ background: sectionA }}>
          <div className="container mx-auto px-6 md:px-14 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: ACCENT }}>Entretien et reparation</p>
                <h2 className="text-5xl font-bold leading-none" style={{ fontFamily: "Bebas Neue, sans-serif", color: text }}>
                  Tarifs de l'Atelier
                </h2>
              </div>
              <p className="text-sm max-w-xs text-right hidden md:block" style={{ color: textSub }}>
                Devis gratuit et precis apres diagnostic de votre vehicule.
              </p>
            </div>
            <div style={{ borderTop: `1px solid ${border}` }}>
              {TARIFS.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="relative grid grid-cols-[1fr_auto] items-center py-5 px-4 group transition-colors"
                  style={{ borderBottom: `1px solid ${border}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${ACCENT}06`)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: ACCENT }} />
                  <div className="pl-3">
                    <h3 className="font-bold uppercase text-sm tracking-wider mb-0.5" style={{ color: text }}>{t.service}</h3>
                    <p className="text-xs" style={{ color: textSub }}>{t.detail}</p>
                  </div>
                  <div className="pl-8 text-right">
                    <span className="font-bold text-xl tabular-nums" style={{ fontFamily: "Bebas Neue, sans-serif", color: ACCENT }}>{t.prix}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-sm" style={{ color: textSub }}>Tarifs indicatifs. Prix definitif apres diagnostic gratuit sur site.</p>
              <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-3 font-bold px-8 py-4 text-sm uppercase tracking-widest text-white hover:opacity-88 transition-opacity"
                style={{ background: ACCENT }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-white"><path d={WA} /></svg>
                Devis gratuit
              </a>
            </div>
          </div>
        </FadeSection>


        {/* ══════ GALERIE ══════ */}
        <FadeSection id="galerie" className="py-24" style={{ background: sectionB }}>
          <div className="container mx-auto px-6 md:px-14">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: ACCENT }}>Galerie exclusive</p>
              <h2 className="text-5xl font-bold leading-none" style={{ fontFamily: "Bebas Neue, sans-serif", color: text }}>
                Nos vehicules en images
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {GALLERY.map((car, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
                  <img src={car.img} alt={car.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-lg font-bold uppercase text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{car.name}</span>
                    <div className="w-6 h-0.5 mt-1 group-hover:w-12 transition-all duration-400" style={{ background: ACCENT }} />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-bold px-10 py-4 text-sm uppercase tracking-widest transition-all"
                style={{ border: `1px solid ${ACCENT}`, color: ACCENT }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = ACCENT; el.style.color = "#fff"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = ACCENT; }}>
                Voir toute la flotte
              </a>
            </div>
          </div>
        </FadeSection>


        {/* ══════ ETAPES ══════ */}
        <FadeSection className="py-24" style={{ background: sectionA }}>
          <div className="container mx-auto px-6 md:px-14">
            <div className="mb-16">
              <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: ACCENT }}>Comment acquerir votre vehicule</p>
              <h2 className="text-5xl font-bold leading-none" style={{ fontFamily: "Bebas Neue, sans-serif", color: text }}>
                3 etapes vers votre vehicule
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto relative">
              <div className="hidden md:block absolute top-11 left-[18%] right-[18%] h-px"
                style={{ background: `linear-gradient(to right, transparent, ${ACCENT}50, ${ACCENT}50, transparent)` }} />
              {[
                { n: "01", title: "Choisissez votre modele", desc: "Parcourez notre stock ou decrivez le vehicule ideal. Notre conseiller trouve la perle rare pour vous." },
                { n: "02", title: "Essai et Finalisation", desc: "Testez le vehicule. On finalise le financement, les documents et les garanties. Tout est transparent." },
                { n: "03", title: "Cles en main", desc: "Livraison a domicile disponible. Suivi SAV personnalise pendant toute la duree de votre possession." },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.18 }}
                  className="flex flex-col items-center text-center px-8 pb-8">
                  <div className="w-[88px] h-[88px] flex items-center justify-center mb-8 relative z-10"
                    style={{ background: i === 1 ? ACCENT : "transparent", border: `2px solid ${i === 1 ? ACCENT : border}` }}>
                    <span className="text-[2.6rem] font-bold leading-none"
                      style={{ fontFamily: "Bebas Neue, sans-serif", color: i === 1 ? "#fff" : text }}>
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: text }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textSub }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeSection>


        {/* ══════ CTA FINAL ══════ */}
        <section className="relative py-32 overflow-hidden flex items-center justify-center"
          style={{ background: "#020510" }}>
          <div className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&auto=format&fit=crop&q=80)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ACCENT}12 0%, transparent 60%)` }} />
          <div className="relative z-10 text-center px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: ACCENT_L }}>Commander votre site</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-none" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Un site comme celui-ci<br/>pour votre garage ?
              </h2>
              <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-bold px-12 py-5 text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-88"
                style={{ background: ACCENT }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-white"><path d={WA} /></svg>
                Commander via WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
