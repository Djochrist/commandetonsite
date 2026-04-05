import React, { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Video, Code2, Car, HeartPulse, ShoppingBag,
  UtensilsCrossed, ShoppingCart, GraduationCap, Scissors, Store,
  Sun, Moon,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider } from "@/context/PageTheme";
import { useSEO } from "@/hooks/useSEO";
import { useColorScheme } from "@/hooks/useColorScheme";

/* ─── Theme tokens ─── */
const light = {
  bg:      "#f8fafc",
  bg2:     "#f1f5f9",
  card:    "#ffffff",
  border:  "rgba(99,102,241,0.2)",
  text:    "#0f172a",
  muted:   "#64748b",
  accent:  "#6366f1",
  accentSolid: "#4f46e5",
  navBg:   "rgba(248,250,252,0.97)",
  footerBg:"#e2e8f0",
};

const dark = {
  bg:      "#060818",
  bg2:     "#0d1224",
  card:    "#0f172a",
  border:  "rgba(99,102,241,0.3)",
  text:    "#f1f5f9",
  muted:   "#94a3b8",
  accent:  "#818cf8",
  accentSolid: "#6366f1",
  navBg:   "rgba(6,8,24,0.97)",
  footerBg:"#0d1224",
};

/* ─── WhatsApp path ─── */
const WA = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const sectors = [
  { href: "/influenceur",             Icon: Video,           title: "Influenceur",    sub: "Portfolio, media kit et prise de contact sponsors",    num: "01" },
  { href: "/entreprise-informatique", Icon: Code2,           title: "Informatique",   sub: "Agence tech, startup et services digitaux",            num: "02" },
  { href: "/automobile",              Icon: Car,             title: "Automobile",     sub: "Concession, garage et vente de vehicules",             num: "03" },
  { href: "/hopital",                 Icon: HeartPulse,      title: "Sante",          sub: "Clinique, cabinet medical et services de sante",       num: "04" },
  { href: "/maison-habillement",      Icon: ShoppingBag,     title: "Mode",           sub: "Boutique, createur de mode et showroom",               num: "05" },
  { href: "/restaurant",              Icon: UtensilsCrossed, title: "Restaurant",     sub: "Menu en ligne, reservations et takeaway",              num: "06" },
  { href: "/supermarche",             Icon: ShoppingCart,    title: "Supermarche",    sub: "Grande surface, alimentation et promotions",           num: "07" },
  { href: "/ecole",                   Icon: GraduationCap,   title: "Ecole",          sub: "Etablissement scolaire, formations et inscriptions",   num: "08" },
  { href: "/salon-coiffure",          Icon: Scissors,        title: "Coiffure",       sub: "Salon de beaute, galerie et reservation en ligne",     num: "09" },
  { href: "/boutique-en-ligne",       Icon: Store,           title: "Boutique",       sub: "E-commerce, catalogue produits et commande WhatsApp",  num: "10" },
];

/* ─── Scramble hook ─── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
function useScramble(target: string, delay = 0, trigger = 0) {
  const [display, setDisplay] = useState(() =>
    Array.from({ length: target.length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
  useEffect(() => {
    const t0 = setTimeout(() => {
      let frame = 0;
      const total = target.length * 3;
      const id = setInterval(() => {
        setDisplay(
          target.split("").map((ch, i) => {
            if (i < Math.floor((frame / total) * target.length)) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        frame++;
        if (frame > total + 6) { setDisplay(target); clearInterval(id); }
      }, 38);
      return () => clearInterval(id);
    }, trigger === 0 ? delay : 0);
    return () => clearTimeout(t0);
  }, [target, trigger]);
  return display;
}

/* ─── Glitch word ─── */
function GlitchWord({ text, accent, delay = 0, hoverTrigger = 0 }: { text: string; accent: string; delay?: number; hoverTrigger?: number }) {
  const display = useScramble(text, delay, hoverTrigger);
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const loop = () => {
      const wait = 3000 + Math.random() * 6000;
      setTimeout(() => { setGlitching(true); setTimeout(() => setGlitching(false), 160); loop(); }, wait);
    };
    const t = setTimeout(loop, delay + 2200);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (hoverTrigger === 0) return;
    setGlitching(true);
    const t = setTimeout(() => setGlitching(false), 320);
    return () => clearTimeout(t);
  }, [hoverTrigger]);
  return (
    <span className="relative inline-block" style={{ fontFamily: "Space Grotesk, monospace" }}>
      {display}
      {glitching && (
        <>
          <span className="absolute inset-0 select-none" style={{ color: accent, clipPath: "inset(25% 0 55% 0)", transform: "translateX(-4px)", opacity: 0.7 }}>{display}</span>
          <span className="absolute inset-0 select-none" style={{ color: "#f43f5e", clipPath: "inset(65% 0 15% 0)", transform: "translateX(4px)", opacity: 0.4 }}>{display}</span>
        </>
      )}
    </span>
  );
}

/* ─── Grid background ─── */
function GridBg({ accent, isDark }: { accent: string; isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: isDark ? 0.09 : 0.06 }}>
        <defs>
          <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0L0 0 0 44" fill="none" stroke={accent} strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  );
}

/* ─── Scanlines ─── */
function Scanlines({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isDark ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.025)"} 2px, ${isDark ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.025)"} 4px)`,
      backgroundSize: "100% 4px",
    }} />
  );
}

/* ─── Floating particles ─── */
function Particles({ accent, isDark }: { accent: string; isDark: boolean }) {
  const count = 18;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 6 + Math.random() * 12,
    delay: Math.random() * 8,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: accent, opacity: isDark ? 0.35 : 0.2 }}
          animate={{ y: [-12, 12, -12], opacity: [0.1, isDark ? 0.45 : 0.25, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Mouse spotlight ─── */
function Spotlight({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current?.parentElement;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, background: `radial-gradient(circle 320px at ${pos.x}% ${pos.y}%, ${accent}09 0%, transparent 70%)` }}
    />
  );
}

/* ─── Corner brackets ─── */
function Corners({ accent }: { accent: string }) {
  const style = (t: string, r: string, b: string, l: string) => ({
    borderTop: t ? `1px solid ${accent}40` : "none",
    borderRight: r ? `1px solid ${accent}40` : "none",
    borderBottom: b ? `1px solid ${accent}40` : "none",
    borderLeft: l ? `1px solid ${accent}40` : "none",
  });
  return <>
    <div className="absolute top-20 left-6 w-10 h-10 pointer-events-none" style={style("1","0","0","1")} />
    <div className="absolute top-20 right-6 w-10 h-10 pointer-events-none" style={style("1","1","0","0")} />
    <div className="absolute bottom-20 left-6 w-10 h-10 pointer-events-none" style={style("0","0","1","1")} />
    <div className="absolute bottom-20 right-6 w-10 h-10 pointer-events-none" style={style("0","1","1","0")} />
  </>;
}

/* ─── Blinking cursor ─── */
function Cursor({ accent }: { accent: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => { const id = setInterval(() => setOn(v => !v), 530); return () => clearInterval(id); }, []);
  return <span style={{ color: accent, opacity: on ? 1 : 0 }}>_</span>;
}

/* ─── Tilt card ─── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(6px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; };
  return (
    <div ref={ref} className="h-full" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform 0.22s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame++;
      setVal(Math.round((frame / total) * target));
      if (frame >= total) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [started, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Sticky WhatsApp button ─── */
function StickyWhatsApp() {
  return (
    <a
      href="https://wa.me/243819730124"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ background: "#111111" }}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" style={{ fill: "#ffffff", flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* ─── Main component ─── */
export default function Home() {
  const { isDark, toggle } = useColorScheme();
  const [hoverTrigger, setHoverTrigger] = useState(0);
  const T = isDark ? dark : light;

  useSEO({
    title: "CommandeTonSite | Sites Web Pro a Lubumbashi, RDC",
    description: "Sites web pro a Lubumbashi pour chaque secteur. Commandez le votre via WhatsApp.",
    path: "/",
    keywords: "site web Lubumbashi, creation site web Congo, developpeur web RDC",
    structuredData: { "@context": "https://schema.org", "@type": "Organization", name: "CommandeTonSite", url: "https://commandetonsite.vercel.app", address: { "@type": "PostalAddress", addressLocality: "Lubumbashi", addressCountry: "CD" } },
  });

  const homeTheme = {
    accent: T.accent,
    navBg: T.navBg,
    navIsDark: isDark,
    footerBg: T.footerBg,
    footerIsDark: isDark,
  };

  return (
    <PageThemeProvider theme={homeTheme}>
      <div className="min-h-[100dvh] flex flex-col transition-colors duration-500"
        style={{ background: T.bg, color: T.text, fontFamily: "Space Grotesk, DM Mono, monospace" }}>

        <Navbar appendRight={
          <button onClick={toggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
            style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.08)", color: isDark ? "#818cf8" : "#6366f1" }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        } />
        <StickyWhatsApp />

        <main className="flex-grow">

          {/* ════════ HERO ════════ */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
            style={{ background: T.bg }}>
            <GridBg accent={T.accent} isDark={isDark} />
            <Scanlines isDark={isDark} />
            <Particles accent={T.accent} isDark={isDark} />
            <Spotlight accent={T.accent} />
            <Corners accent={T.accent} />

            {/* Main title */}
            <div className="relative z-10 text-center px-4">
              <h1 className="font-black leading-[0.92] mb-3 select-none cursor-pointer"
                style={{ fontSize: "clamp(3.8rem, 13vw, 9.5rem)", letterSpacing: "-0.04em", fontFamily: "Space Grotesk, sans-serif" }}
                onMouseEnter={() => setHoverTrigger(t => t + 1)}>
                <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 80 }}>
                  <GlitchWord text="COMMANDE" accent={T.accent} delay={600} hoverTrigger={hoverTrigger} />
                </motion.span>
                <motion.span className="block" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75, type: "spring", stiffness: 80 }}
                  style={{ color: T.accent }}>
                  <GlitchWord text="TON SITE" accent={T.accent} delay={900} hoverTrigger={hoverTrigger} />
                </motion.span>
              </h1>

              {/* Subtitle */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }}
                className="mb-10 flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-[60px]" style={{ background: `${T.accent}35` }} />
                <span className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: T.muted, fontFamily: "DM Mono, monospace" }}>
                  10 demos · 10 secteurs<Cursor accent={T.accent} />
                </span>
                <div className="h-px flex-1 max-w-[60px]" style={{ background: `${T.accent}35` }} />
              </motion.div>

              {/* Description */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.7 }}
                className="text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed" style={{ color: T.muted }}>
                Explorez les demos par secteur. Commandez votre version personnalisee via WhatsApp.
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 1.85 }}
                className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a href="#demos" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 text-sm"
                  style={{ background: T.accentSolid, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "DM Mono, monospace" }}>
                  Voir les 10 demos
                  <motion.svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                    <path d="m6 9 6 6 6-6"/>
                  </motion.svg>
                </motion.a>
                <motion.a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-4 text-sm border"
                  style={{ color: T.text, borderColor: T.border, background: T.card, letterSpacing: "0.05em", fontFamily: "DM Mono, monospace" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: "#25d366", flexShrink: 0 }}><path d={WA}/></svg>
                  WhatsApp
                </motion.a>
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.4 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-10"
              onClick={() => document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" })}>
              <span className="text-[9px] uppercase tracking-[0.35em] font-bold" style={{ color: T.muted, fontFamily: "DM Mono, monospace" }}>SCROLL</span>
              <motion.svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <path d="m6 9 6 6 6-6"/>
              </motion.svg>
            </motion.div>
          </section>

          {/* ════════ STATS ════════ */}
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ background: T.bg2, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="grid grid-cols-3">
                {[
                  { n: 10, suffix: "", label: "Demos disponibles" },
                  { n: 24, suffix: "h", label: "Delai de reponse" },
                  { n: 100, suffix: "%", label: "Personnalisable" },
                ].map(({ n, suffix, label }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center py-8 text-center"
                    style={{ borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
                    <span className="text-3xl md:text-4xl font-black mb-0.5"
                      style={{ color: T.accent, fontFamily: "Space Grotesk, monospace" }}>
                      <Counter target={n} suffix={suffix} />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: T.muted, fontFamily: "DM Mono, monospace" }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════ DEMOS GRID ════════ */}
          <section id="demos" className="py-20" style={{ background: T.bg }}>
            <div className="container mx-auto px-4 max-w-5xl">

              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45 }}
                className="flex items-end justify-between mb-10 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2"
                    style={{ color: T.muted, fontFamily: "DM Mono, monospace" }}>// SECTEURS_DISPONIBLES</p>
                  <h2 className="text-2xl md:text-3xl font-black"
                    style={{ color: T.text, fontFamily: "Space Grotesk, sans-serif" }}>
                    Cliquez sur un secteur
                  </h2>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: T.muted, fontFamily: "DM Mono, monospace" }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.accent }} />
                  10 demos actifs
                </span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sectors.map(({ href, Icon, title, sub, num }, i) => (
                  <div key={href}>
                    <TiltCard>
                      <Link href={href} className="group block h-full">
                        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                          className="h-full border flex items-center gap-5 px-5 py-5 transition-all duration-200 relative overflow-hidden"
                          style={{ background: T.card, borderColor: T.border }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = `${T.accent}55`;
                            el.style.boxShadow = isDark
                              ? `0 0 28px ${T.accent}12, inset 0 0 20px ${T.accent}06`
                              : `0 4px 20px ${T.accent}15`;
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = T.border;
                            el.style.boxShadow = "none";
                          }}>

                          {/* Animated top border on hover */}
                          <div className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                            style={{ background: T.accent }} />

                          {/* Corner accent */}
                          <div className="absolute top-0 left-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ borderTop: `1.5px solid ${T.accent}`, borderLeft: `1.5px solid ${T.accent}` }} />
                          <div className="absolute bottom-0 right-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ borderBottom: `1.5px solid ${T.accent}`, borderRight: `1.5px solid ${T.accent}` }} />

                          {/* Number */}
                          <span className="absolute top-3 right-4 text-[10px] font-black tabular-nums"
                            style={{ color: `${T.accent}20`, fontFamily: "DM Mono, monospace", letterSpacing: "0.1em" }}>{num}</span>

                          {/* Icon box */}
                          <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 border transition-colors duration-200"
                            style={{ background: `${T.accent}08`, borderColor: `${T.accent}20` }}>
                            <Icon size={20} style={{ color: T.accent }} strokeWidth={1.5} />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm mb-0.5 transition-colors duration-200 group-hover:opacity-100"
                              style={{ color: T.text, fontFamily: "Space Grotesk, sans-serif" }}>{title}</p>
                            <p className="text-xs leading-relaxed truncate" style={{ color: T.muted }}>{sub}</p>
                          </div>

                          {/* Arrow */}
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={T.accent}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                            <path d="M5 12h14m-7-7 7 7-7 7"/>
                          </svg>
                        </motion.div>
                      </Link>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════ CTA ════════ */}
          <section className="py-24 relative overflow-hidden" style={{ background: T.bg2, borderTop: `1px solid ${T.border}` }}>
            <GridBg accent={T.accent} isDark={isDark} />
            <Particles accent={T.accent} isDark={isDark} />
            <div className="container mx-auto px-4 max-w-lg text-center relative z-10">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 border mb-6"
                  style={{ borderColor: `${T.accent}30`, background: `${T.accent}08` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.accent }} />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: T.accent, fontFamily: "DM Mono, monospace" }}>
                    INITIALISER UN PROJET
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-3"
                  style={{ color: T.text, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.03em" }}>
                  Commandez votre site.
                </h2>
                <motion.a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 font-black px-10 py-5 text-sm uppercase tracking-widest"
                  style={{ background: T.accentSolid, color: "#fff", fontFamily: "DM Mono, monospace", letterSpacing: "0.1em" }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "#fff", flexShrink: 0 }}><path d={WA}/></svg>
                  Commander via WhatsApp
                </motion.a>
              </motion.div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </PageThemeProvider>
  );
}
