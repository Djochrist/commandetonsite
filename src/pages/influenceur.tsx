import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useColorScheme } from "@/hooks/useColorScheme";

/* ---------- Animated counter ---------- */
function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return val;
}

/* ---------- Floating notification ---------- */
function FloatingNotif({ icon, label, value, delay, x, y, bg, border, text }: {
  icon: React.ReactNode; label: string; value: string; delay: number; x: string; y: string;
  bg: string; border: string; text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ delay, duration: 0.5, y: { repeat: Infinity, duration: 3 + delay, ease: "easeInOut" } }}
      className="hidden sm:flex absolute items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-sm"
      style={{ left: x, top: y, zIndex: 10, background: bg, border: `1px solid ${border}` }}>
      {icon}
      <div>
        <div className="font-bold text-sm leading-none" style={{ color: text }}>{value}</div>
        <div className="text-[10px] mt-0.5" style={{ color: text, opacity: 0.5 }}>{label}</div>
      </div>
    </motion.div>
  );
}

/* ---------- Platform icons (inline SVG) ---------- */
const IconInstagram = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IconYoutube = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IconTiktok = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
  </svg>
);
const IconHeart = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const IconShare = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const IconPlay = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
);
const IconChevronDown = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
);
const IconArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);

/* ---------- Horizontal ticker ---------- */
function Ticker({ items, bg, border, textColor, accent }: { items: string[]; bg: string; border: string; textColor: string; accent: string }) {
  return (
    <div className="overflow-hidden py-6 border-y" style={{ background: bg, borderColor: border }}>
      <motion.div className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-semibold uppercase tracking-widest flex items-center gap-3" style={{ color: textColor, opacity: 0.4 }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accent }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Theme toggle ---------- */
function ThemeToggle({ isDark, onToggle, accent }: { isDark: boolean; onToggle: () => void; accent: string }) {
  return (
    <button onClick={onToggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
      style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(236,72,153,0.1)", color: accent }}>
      {isDark
        ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
    </button>
  );
}

/* ---------- Data ---------- */
const services = [
  { icon: <IconInstagram className="w-8 h-8" />, color: "#e1306c", title: "Posts Sponsorises", desc: "Campagnes ciblees sur Instagram et TikTok avec un reach maximal et un reporting detaille." },
  { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>, color: "#820263", title: "Coaching Digital", desc: "Strategie de contenu personnalisee et accompagnement hebdomadaire pour accelerer votre croissance." },
  { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/></svg>, color: "#820263", title: "Collab Marques", desc: "Mise en relation avec des marques locales et internationales pour des partenariats rentables." },
  { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>, color: "#820263", title: "Contenu UGC", desc: "Creation de contenu authentique et viral adapte aux algorithmes des plateformes sociales actuelles." },
];
const portfolioPhotos = [
  { src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80", alt: "Createur de contenu", likes: "12.4K" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=80", alt: "Session photo studio", likes: "8.9K" },
  { src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80", alt: "Contenu social media", likes: "21.1K" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80", alt: "Equipe createurs", likes: "6.3K" },
  { src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80", alt: "Shooting lifestyle", likes: "15.7K" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80", alt: "Portrait influenceur", likes: "9.2K" },
];
const testimonials = [
  { name: "Sandra Ngandu", role: "Influenceuse beaute, 85K abonnes", text: "En 6 mois, mon compte est passe de 2 000 a 85 000 abonnes. Le coaching strategique de Digital Star a completement transforme ma façon de creer du contenu." },
  { name: "Koffi Mensah", role: "Brand Manager, L'Oreal Congo", text: "Notre collaboration avec Digital Star a genere un ROI 10 fois superieur a nos attentes. Partenariat serieux, execution impeccable. Je recommande sans hesiter." },
  { name: "Mike Enterprises", role: "CEO, Mike Enterprises", text: "La meilleure decision marketing que j'aie prise pour mon entreprise. Notre visibilite a triple et nos ventes ont double en l'espace de 3 mois seulement." },
];
const brands = ["L'Oreal Congo", "MTN RDC", "Airtel", "Samsung", "Nike Africa", "Heineken", "Rawbank", "Vodacom", "Bralima", "Unilever"];
const faqs = [
  { q: "Combien de temps faut-il pour voir une croissance ?", a: "En moyenne, nos clients constatent une hausse significative de leur audience dans les 6 a 8 semaines. Les resultats varient selon la niche et la regularite de publication." },
  { q: "Dois-je avoir deja une communaute pour rejoindre l'agence ?", a: "Non. Nous accompagnons aussi bien les debutants que les createurs deja etablis. Ce qui compte, c'est votre potentiel et votre passion pour votre niche." },
  { q: "Quelles plateformes gerez-vous ?", a: "Instagram, TikTok, YouTube et X (Twitter). Nous elaborons une strategie multi-plateforme coherente pour maximiser votre visibilite." },
  { q: "Comment se negocient les partenariats avec les marques ?", a: "Notre equipe de compte gere toute la negociation a votre place. Vous definissez vos tarifs planchers, nous trouvons des marques alignees avec votre image." },
];
const facebookPosts = [
  { img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&auto=format&fit=crop&q=80", text: "Nouvelle collection printemps disponible ! Contactez-nous pour commander." },
  { img: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=200&auto=format&fit=crop&q=80", text: "Merci a nos 300 000 abonnes ! Ensemble on va encore plus loin." },
];

/* ---------- Digital Icon ---------- */
function DigitalIcon({ accent }: { accent: string }) {
  const nodes: [number, number][] = [
    [32, 12], [47, 21], [47, 43], [32, 52], [17, 43], [17, 21],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      className="mb-8"
    >
      <svg width="220" height="220" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer dashed orbit ring */}
        <circle cx="32" cy="32" r="30" stroke={accent} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />

        {/* Hexagon frame — breathes */}
        <motion.polygon
          points="32,12 47,21 47,43 32,52 17,43 17,21"
          stroke={accent} strokeWidth="1.5" fill="none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spoke lines center → each node — cascade fade */}
        {nodes.map(([x, y], i) => (
          <motion.line key={i}
            x1="32" y1="32" x2={x} y2={y}
            stroke={accent} strokeWidth="0.7"
            animate={{ opacity: [0.08, 0.45, 0.08] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.34, ease: "easeInOut" }}
          />
        ))}

        {/* Corner nodes — cascading wave pulse */}
        {nodes.map(([x, y], i) => (
          <motion.circle key={i}
            cx={x} cy={y} r="2.5" fill={accent}
            animate={{ opacity: [0.12, 1, 0.12] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.34, ease: "easeInOut" }}
          />
        ))}

        {/* Inner dashed ring */}
        <circle cx="32" cy="32" r="11" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.3" strokeDasharray="3.5 2.5" />

        {/* Scan beam: translate a static line via wrapper <g> */}
        <motion.g
          animate={{ y: [-10, 11, -10] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="19" y1="32" x2="45" y2="32" stroke={accent} strokeWidth="1" opacity="0.55" />
        </motion.g>

        {/* Center core — pulses opacity only */}
        <motion.circle
          cx="32" cy="32" r="4.5" fill={accent}
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer glow ring — fades in/out */}
        <motion.circle
          cx="32" cy="32" r="8" stroke={accent} strokeWidth="0.8" fill="none"
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}

/* ---------- ScrollTo helper ---------- */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
};

/* ---------- Sous-navbar Social / Gradient Pill ---------- */
function InfluenceurNav() {
  const [solid, setSolid] = React.useState(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links: [string, string][] = [["Plateformes","plateformes"],["Services","services"],["Portfolio","portfolio"],["Collab","collab"]];
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center justify-between px-8 h-14"
      style={{ top: 64, background: solid ? "rgba(26,0,42,0.97)" : "rgba(26,0,42,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(130,2,99,0.35)", transition: "background 0.35s" }}>
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#e1306c" }} />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Digital Star</span>
      </div>
      <div className="flex items-center gap-2">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(130,2,99,0.55)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(225,48,108,0.6)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}>
            {label}
          </button>
        ))}
      </div>
      <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
        className="text-xs font-bold text-white px-4 py-2 uppercase tracking-wider transition-opacity duration-200 hover:opacity-80"
        style={{ background: "#820263" }}>
        Travailler ensemble
      </a>
    </nav>
  );
}

/* ---------- Page ---------- */
export default function Influenceur() {
  useSEO({
    title: "Portfolio Influenceur Lubumbashi | CommandeTonSite",
    description: "Portfolio en ligne pour influenceurs a Lubumbashi. Contenus, reseaux sociaux et collaborations mis en valeur. Commandez votre site via WhatsApp.",
    path: "/influenceur",
    keywords: "influenceur Lubumbashi, portfolio influenceur Congo, site web influenceur RDC, createur contenu Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "Person", "name": "Influenceur Lubumbashi", "description": "Createur de contenu et influenceur base a Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/influenceur" },
  });

  const { isDark, toggle } = useColorScheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"]);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCounter(100, 1600, statsVisible);
  const c2 = useCounter(50, 1400, statsVisible);
  const c3 = useCounter(300, 2000, statsVisible);
  const c4 = useCounter(5, 1200, statsVisible);

  /* ── Color tokens ── */
  const ACCENT = "#820263";
  const bg      = isDark ? "#0d0d1a" : "#fdf4ff";
  const bg2     = isDark ? "#111122" : "#f5eaff";
  const bg3     = isDark ? "#0a0a18" : "#ede0fa";
  const cardBg  = isDark ? "#111122" : "#ffffff";
  const notifBg = isDark ? "#111122" : "#ffffff";
  const text    = isDark ? "#ffffff" : "#0f172a";
  const textSub = isDark ? "rgba(255,255,255,0.45)" : "#6b7280";
  const textFnt = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
  const border  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const borderF = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  const platforms = [
    { icon: <IconInstagram className="w-7 h-7" />, name: "Instagram", color: "#e1306c", value: "100K+", label: "Abonnes geres",  bg: isDark ? "#1a0010" : "#fff0f5" },
    { icon: <IconYoutube className="w-7 h-7" />,   name: "YouTube",   color: "#ff0000", value: "5M+",   label: "Vues cumulees", bg: isDark ? "#1a0000" : "#fff0f0" },
    { icon: <IconTiktok className="w-7 h-7" />,    name: "TikTok",    color: isDark ? "#ffffff" : "#000000", value: "2M+", label: "Impressions", bg: isDark ? "#0d0d1a" : "#f5f0ff" },
    { icon: <span className="text-2xl font-black" style={{ color: ACCENT }}>X</span>, name: "Twitter/X", color: ACCENT, value: "30K+", label: "Mentions", bg: isDark ? "#120010" : "#fff0fa" },
  ];

  const homeTheme = { ...themes.influenceur, navBg: isDark ? "rgba(13,13,26,0.97)" : "rgba(253,244,255,0.97)", navIsDark: isDark };

  return (
    <PageThemeProvider theme={homeTheme}>
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300"
      style={{ background: bg, color: text, fontFamily: "Poppins, sans-serif" }}>
      <Navbar appendRight={<ThemeToggle isDark={isDark} onToggle={toggle} accent={ACCENT} />} />
      <InfluenceurNav />

      <main className="flex-grow pt-16">

        {/* ── HERO ── */}
        <section className="min-h-[92vh] flex items-center overflow-hidden relative" style={{ background: bg }}>
          <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ opacity: isDark ? 0.14 : 0.08, background: isDark ? "rgba(130,2,99,0.28)" : "rgba(130,2,99,0.15)" }} />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full" style={{ opacity: isDark ? 0.12 : 0.06, background: isDark ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.1)" }} />
          </motion.div>

          <div className="container mx-auto px-4 py-20 relative">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <DigitalIcon accent={ACCENT} />
                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight" style={{ color: text }}>
                  <span style={{ color: ACCENT }}>Digital Star</span><br />Agency
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
                  className="text-xl mb-10 max-w-xl leading-relaxed font-light" style={{ color: textSub }}>
                  Management d'influenceurs, creation de contenu et collaborations de marque en RDC. Propulsez votre audience vers de nouveaux sommets.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4">
                  <WhatsAppButton text="Devenir Partenaire"
                    className="px-8 py-4 text-lg border-none font-bold rounded-none"
                    style={{ background: ACCENT, color: "#fff" }} />
                  <a href="#portfolio" className="px-8 py-4 border font-semibold flex items-center gap-2 transition-colors"
                    style={{ borderColor: border, color: text }}
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    Voir nos creations <IconArrowRight />
                  </a>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t flex flex-wrap gap-x-8 gap-y-4 sm:gap-10" style={{ borderColor: borderF }}>
                  {[["100K+", "Abonnes geres"], ["50+", "Marques partenaires"], ["300%", "Croissance moyenne"]].map(([val, lbl], i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold" style={{ color: ACCENT }}>{val}</div>
                      <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: textSub }}>{lbl}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
                className="flex-1 relative max-w-md mx-auto w-full">
                <div className="aspect-[4/5] overflow-hidden border relative" style={{ borderColor: border }}>
                  <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80" alt="Influenceur createur de contenu Lubumbashi" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: isDark ? "rgba(13,13,26,0.2)" : "transparent" }} />
                </div>
                <FloatingNotif icon={<IconHeart className="w-5 h-5" style={{ color: ACCENT }} />} label="Likes" value="12.4K" delay={0.8} x="-12%" y="72%" bg={notifBg} border={border} text={text} />
                <FloatingNotif icon={<IconYoutube className="w-5 h-5 text-red-500" />} label="Vues cumulees" value="5M+" delay={1.1} x="68%" y="-4%" bg={notifBg} border={border} text={text} />
                <FloatingNotif icon={<IconInstagram className="w-5 h-5" style={{ color: ACCENT }} />} label="Abonnes actifs" value="100K+" delay={1.4} x="55%" y="82%" bg={notifBg} border={border} text={text} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <Ticker items={brands} bg={bg3} border={borderF} textColor={text} accent={ACCENT} />

        {/* ── PLATFORMS ── */}
        <section id="plateformes" className="py-20" style={{ background: bg }}>
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Notre presence</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>Toutes les plateformes. Un seul manager.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="p-6 border text-center transition-colors"
                  style={{ backgroundColor: p.bg, borderColor: border }}>
                  <div className="flex justify-center mb-3" style={{ color: p.color }}>{p.icon}</div>
                  <div className="text-2xl font-bold mb-1" style={{ color: text }}>{p.value}</div>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: textSub }}>{p.label}</div>
                  <div className="text-sm font-semibold" style={{ color: p.color }}>{p.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOS CHAINES ── */}
        <section className="py-24" style={{ background: bg2 }}>
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Nos chaines et pages</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>Ce que vous pourriez avoir</h2>
              <p className="mt-3 text-sm" style={{ color: textSub }}>Simulation de profils geres par Digital Star Agency</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

              {/* Instagram */}
              <div className="border overflow-hidden rounded-sm" style={{ background: cardBg, borderColor: border }}>
                <div className="h-24 w-full relative" style={{ background: isDark ? "rgba(131,59,180,0.12)" : "#fde4fb" }}>
                  <div className="absolute bottom-0 left-6 translate-y-1/2 w-16 h-16 rounded-full border-4 overflow-hidden" style={{ borderColor: cardBg }}>
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80" alt="Photo de profil beauty_kalimement" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="pt-10 px-6 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-base flex items-center gap-1.5" style={{ color: text }}>
                        @beauty_kalimement
                        <svg className="w-4 h-4" style={{ color: "#833ab4" }} viewBox="0 0 24 24" fill="currentColor"><path d="m8.603 3.799 1.602-1.799 2.795 2.117L15.397 2l1.603 1.799-2.486 2.483L17 9l-2 .5-3-2.5L9 9.5 7 9l1.486-2.718L6 4z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4.938L6.28 10.347l1.415-1.415 3.308 3.308 6.364-6.364 1.414 1.415-7.778 7.777z"/></svg>
                      </div>
                      <div className="text-xs" style={{ color: textSub }}>Beauty by Sandra</div>
                    </div>
                    <button className="px-4 py-1.5 text-white text-xs font-bold rounded-sm" style={{ background: "#833ab4" }}>Suivre</button>
                  </div>
                  <div className="flex gap-6 text-center mb-4">
                    {[["1 248", "Publications"], ["245K", "Abonnes"], ["312", "Abonnements"]].map(([v, l], i) => (
                      <div key={i}><div className="font-bold text-sm" style={{ color: text }}>{v}</div><div className="text-[10px]" style={{ color: textSub }}>{l}</div></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
                    {["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=200&auto=format&fit=crop&q=80"].map((src, i) => (
                      <div key={i} className="aspect-square overflow-hidden"><img src={src} alt={`Publication Instagram beaute ${i + 1}`} className="w-full h-full object-cover" loading="lazy" /></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* YouTube */}
              <div className="border overflow-hidden rounded-sm" style={{ background: cardBg, borderColor: border }}>
                <div className="h-24 w-full relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=600&auto=format&fit=crop&q=80" alt="Banniere chaine YouTube influenceur Lubumbashi" className="w-full h-full object-cover opacity-60" loading="lazy" />
                  <div className="absolute bottom-0 left-6 translate-y-1/2 w-16 h-16 rounded-full border-4 bg-red-700 flex items-center justify-center" style={{ borderColor: cardBg }}>
                    <IconPlay className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="pt-10 px-6 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-base flex items-center gap-1.5" style={{ color: text }}>
                        Digital Star RDC
                        <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="m8.603 3.799 1.602-1.799 2.795 2.117L15.397 2l1.603 1.799-2.486 2.483L17 9l-2 .5-3-2.5L9 9.5 7 9l1.486-2.718L6 4z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4.938L6.28 10.347l1.415-1.415 3.308 3.308 6.364-6.364 1.414 1.415-7.778 7.777z"/></svg>
                      </div>
                      <div className="text-xs" style={{ color: textSub }}>1,2M abonnes · 847 videos</div>
                    </div>
                    <button className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-sm">S'abonner</button>
                  </div>
                  <div className="flex gap-6 text-center mb-4">
                    {[["1.2M", "Abonnes"], ["5M+", "Vues/mois"], ["847", "Videos"]].map(([v, l], i) => (
                      <div key={i}><div className="font-bold text-sm" style={{ color: text }}>{v}</div><div className="text-[10px]" style={{ color: textSub }}>{l}</div></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[{ src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&auto=format&fit=crop&q=80", title: "Strategie TikTok 2026", views: "284K vues" }, { src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&auto=format&fit=crop&q=80", title: "Comment monetiser son compte", views: "512K vues" }].map((v, i) => (
                      <div key={i} className="relative group cursor-pointer">
                        <div className="aspect-video overflow-hidden"><img src={v.src} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" /></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"><IconPlay className="w-5 h-5 text-white" /></div>
                        </div>
                        <div className="mt-1.5">
                          <div className="text-xs font-semibold leading-tight line-clamp-1" style={{ color: text }}>{v.title}</div>
                          <div className="text-[10px]" style={{ color: textSub }}>{v.views}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TikTok */}
              <div className="border overflow-hidden rounded-sm" style={{ background: cardBg, borderColor: border }}>
                <div className="h-24 w-full relative overflow-hidden" style={{ background: isDark ? "rgba(5,5,6,0.9)" : "#fbeefe" }}>
                  <div className="absolute inset-0 flex items-center justify-end pr-6 opacity-10">
                    <svg viewBox="0 0 24 24" className="w-20 h-20 fill-white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07Z"/></svg>
                  </div>
                  <div className="absolute bottom-0 left-6 translate-y-1/2 w-16 h-16 rounded-full border-4 overflow-hidden" style={{ borderColor: cardBg }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Photo de profil transcendance_business" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="pt-10 px-6 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-base flex items-center gap-1.5" style={{ color: text }}>
                        @transcendance_business
                        <svg className="w-4 h-4" style={{ color: ACCENT }} viewBox="0 0 24 24" fill="currentColor"><path d="m8.603 3.799 1.602-1.799 2.795 2.117L15.397 2l1.603 1.799-2.486 2.483L17 9l-2 .5-3-2.5L9 9.5 7 9l1.486-2.718L6 4z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4.938L6.28 10.347l1.415-1.415 3.308 3.308 6.364-6.364 1.414 1.415-7.778 7.777z"/></svg>
                      </div>
                      <div className="text-xs" style={{ color: textSub }}>Business · Motivation · Lifestyle</div>
                    </div>
                    <button className="px-4 py-1.5 border text-xs font-bold rounded-sm" style={{ background: isDark ? "#010101" : "#f3f4f6", borderColor: border, color: text }}>Suivre</button>
                  </div>
                  <div className="flex gap-6 text-center mb-4">
                    {[["890K", "Abonnes"], ["2.1M", "J'aime"], ["364", "Videos"]].map(([v, l], i) => (
                      <div key={i}><div className="font-bold text-sm" style={{ color: text }}>{v}</div><div className="text-[10px]" style={{ color: textSub }}>{l}</div></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
                    {["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&auto=format&fit=crop&q=80","https://images.unsplash.com/photo-1569038786784-5adcb4421b8f?w=200&auto=format&fit=crop&q=80"].map((src, i) => (
                      <div key={i} className="aspect-[9/16] overflow-hidden relative group cursor-pointer">
                        <img src={src} alt={`Video TikTok business motivation ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute inset-0 bg-black/20 flex items-end p-1.5">
                          <div className="flex items-center gap-1 text-white text-[10px] font-bold"><IconPlay className="w-3 h-3" />{["124K", "98K", "212K"][i]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="border overflow-hidden rounded-sm" style={{ background: cardBg, borderColor: border }}>
                <div className="h-24 w-full relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80" alt="Couverture page Facebook influenceur Lubumbashi" className="w-full h-full object-cover opacity-50" loading="lazy" />
                  <div className="absolute bottom-0 left-6 translate-y-1/2 w-16 h-16 rounded-lg border-4 overflow-hidden" style={{ borderColor: cardBg }}>
                    <div className="w-full h-full bg-[#1877f2] flex items-center justify-center text-white font-black text-2xl">M</div>
                  </div>
                </div>
                <div className="pt-10 px-6 pb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-base" style={{ color: text }}>Mike Enterprises RDC</div>
                      <div className="text-xs" style={{ color: textSub }}>Page entreprise</div>
                    </div>
                    <button className="px-4 py-1.5 bg-[#1877f2] text-white text-xs font-bold rounded-sm flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                      J'aime la page
                    </button>
                  </div>
                  <div className="flex gap-6 mb-4">
                    {[["345K", "J'aime"], ["362K", "Abonnes"], ["8.4K", "Posts"]].map(([v, l], i) => (
                      <div key={i} className="text-center"><div className="font-bold text-sm" style={{ color: text }}>{v}</div><div className="text-[10px]" style={{ color: textSub }}>{l}</div></div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[{ img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&auto=format&fit=crop&q=80", text: "Nouvelle collection printemps disponible ! Contactez-nous pour commander." }, { img: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=200&auto=format&fit=crop&q=80", text: "Merci a nos 300 000 abonnes ! Ensemble on va encore plus loin." }].map((post, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-sm" style={{ background: bg3 }}>
                        <img src={post.img} alt={`Publication Facebook ${i + 1}`} className="w-16 h-12 object-cover flex-shrink-0" loading="lazy" />
                        <p className="text-xs leading-relaxed" style={{ color: textSub }}>{post.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── YOUTUBE VIDEOS ── */}
        <section className="py-24" style={{ background: bg3 }}>
          <div className="container mx-auto px-4">
            <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-red-500 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                  <IconYoutube className="w-4 h-4" /> YouTube
                </p>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>Nos videos les plus vues</h2>
              </div>
              <p className="text-sm max-w-xs" style={{ color: textSub }}>Contenu educatif, inspirant et viral produit pour nos createurs chaque semaine.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&auto=format&fit=crop&q=80", title: "Comment obtenir 100K abonnes en 90 jours", channel: "Digital Star RDC", views: "1.2M vues", duration: "18:34", badge: "Tendance" },
                { src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80", title: "La strategie TikTok qui m'a rapporte 5 millions de vues", channel: "Koffi Business", views: "845K vues", duration: "12:07", badge: "" },
                { src: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=600&auto=format&fit=crop&q=80", title: "Monetisation Instagram : guide complet 2026", channel: "Beauty RDC", views: "512K vues", duration: "24:18", badge: "" },
                { src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80", title: "Negocier un contrat de marque : mes 7 regles", channel: "Digital Star RDC", views: "320K vues", duration: "15:44", badge: "Nouveau" },
                { src: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&auto=format&fit=crop&q=80", title: "Collab marque reussie : avant et apres", channel: "Mike Enterprises", views: "280K vues", duration: "9:52", badge: "" },
                { src: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80", title: "L'algorithme YouTube explique en 10 minutes", channel: "Digital Star RDC", views: "198K vues", duration: "10:01", badge: "" },
              ].map((video, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden mb-3">
                    <img src={video.src} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                        <IconPlay className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 font-mono">{video.duration}</div>
                    {video.badge && <div className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider" style={{ background: ACCENT }}>{video.badge}</div>}
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-700 rounded-full flex-shrink-0 flex items-center justify-center">
                      <IconPlay className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold leading-snug mb-1 line-clamp-2 transition-colors group-hover:opacity-80" style={{ color: text }}>{video.title}</h4>
                      <div className="text-xs" style={{ color: textSub }}>{video.channel}</div>
                      <div className="text-xs mt-0.5" style={{ color: textSub, opacity: 0.6 }}>{video.views}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24" style={{ background: bg2 }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Ce que nous faisons</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Nos Services Exclusifs</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: border }}>
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-8 transition-colors group" style={{ background: cardBg }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? "#15152a" : "#f5d3f0")}
                  onMouseLeave={e => (e.currentTarget.style.background = cardBg)}>
                  <div className="mb-6 transition-transform group-hover:scale-110 duration-300" style={{ color: s.color }}>{s.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: text }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textSub }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section id="portfolio" className="py-24" style={{ background: bg }}>
          <div className="container mx-auto px-4">
            <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Portfolio</p>
                <h2 className="text-4xl font-bold" style={{ color: text }}>Nos creations en action</h2>
              </div>
              <p className="text-sm max-w-xs" style={{ color: textSub }}>Chaque post est pense, produit et publie par notre equipe pour maximiser l'engagement.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {portfolioPhotos.map((photo, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden group aspect-square">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 transition-colors duration-300 flex items-center justify-center group-hover:bg-black/60">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white font-bold text-sm">
                      <IconHeart className="w-5 h-5" style={{ color: ACCENT }} />
                      {photo.likes}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                      <IconShare className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE STATS ── */}
        <section ref={statsRef} className="py-20" style={{ background: ACCENT }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[{ val: c1, suffix: "K+", label: "Abonnes geres" }, { val: c2, suffix: "+", label: "Marques partenaires" }, { val: c3, suffix: "%", label: "Croissance moyenne" }, { val: c4, suffix: "M+", label: "Vues cumulees" }].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <div className="text-5xl md:text-6xl font-black mb-2">{stat.val}{stat.suffix}</div>
                  <div className="text-white/70 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROCHE ── */}
        <section id="collab" className="py-24" style={{ background: bg3 }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=80" alt="Social Media Strategy" className="w-full border" style={{ borderColor: border }} loading="lazy" />
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-sm border p-4 flex items-center gap-4" style={{ background: isDark ? "rgba(17,17,34,0.9)" : "rgba(255,255,255,0.9)", borderColor: border }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ACCENT + "30" }}>
                      <IconPlay className="w-5 h-5" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: text }}>Votre strategie en 15 min</div>
                      <div className="text-xs" style={{ color: textSub }}>Session de consultation gratuite</div>
                    </div>
                    <WhatsAppButton text="Reserver"
                      className="ml-auto border-none px-4 py-2 text-xs font-bold rounded-none flex-shrink-0"
                      style={{ background: ACCENT, color: "#fff" }} />
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8b5cf6" }}>Notre approche</p>
                <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: text }}>Transformez votre passion en business rentable</h2>
                <p className="mb-8 leading-relaxed text-lg" style={{ color: textSub }}>
                  Notre equipe de managers travaille main dans la main avec vous pour negocier les meilleurs contrats, planifier votre contenu et proteger votre image de marque.
                </p>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: <IconInstagram className="w-5 h-5" />, txt: "Strategie de contenu sur mesure par plateforme" },
                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>, txt: "Negociation de deals avec les marques" },
                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>, txt: "Reporting mensuel de performance detaille" },
                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>, txt: "Protection de votre image et de vos droits" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm" style={{ color: textSub }}>
                      <div className="flex-shrink-0" style={{ color: ACCENT }}>{item.icon}</div>
                      {item.txt}
                    </div>
                  ))}
                </div>
                <WhatsAppButton text="Rejoindre l'agence"
                  className="border-none font-bold px-8 py-4 rounded-none"
                  style={{ background: ACCENT, color: "#fff" }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24" style={{ background: bg2 }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Ils nous font confiance</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Resultats reels, temoignages reels</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="p-8 border relative overflow-hidden transition-colors"
                  style={{ background: cardBg, borderColor: border }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + "50")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ background: "rgba(130,2,99,0.08)" }} />
                  <div className="flex gap-0.5 mb-5" style={{ color: ACCENT }}>
                    {Array(5).fill(0).map((_, j) => <IconHeart key={j} className="w-3.5 h-3.5" />)}
                  </div>
                  <p className="mb-6 leading-relaxed italic text-sm" style={{ color: textSub }}>"{t.text}"</p>
                  <div className="pt-4 border-t" style={{ borderColor: borderF }}>
                    <div className="font-bold" style={{ color: text }}>{t.name}</div>
                    <div className="text-xs mt-1" style={{ color: textSub }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-24" style={{ background: bg }}>
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Comment ca marche</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>3 etapes pour exploser votre audience</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { n: "01", title: "Audit et Strategie", desc: "On analyse votre profil, votre niche et votre concurrence. On definit ensemble une strategie de croissance claire et chiffree.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80" },
                { n: "02", title: "Creation et Publication", desc: "Notre equipe produit et publie du contenu optimise pour les algorithmes. Vous vous concentrez sur ce que vous aimez faire.", img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&auto=format&fit=crop&q=80" },
                { n: "03", title: "Croissance et Monetisation", desc: "Votre audience grandit, les marques vous contactent. On negocie les deals et vous touchez des revenus concrets.", img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&auto=format&fit=crop&q=80" },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="aspect-video overflow-hidden mb-6 border" style={{ borderColor: border }}>
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="text-5xl font-black mb-3" style={{ color: textFnt }}>{step.n}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: ACCENT }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: textSub }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24" style={{ background: bg2 }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Questions frequentes</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: text }}>Tout ce que vous voulez savoir</h2>
            </div>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <div key={i} className="border overflow-hidden" style={{ background: cardBg, borderColor: border }}>
                  <button className="w-full flex items-center justify-between px-7 py-5 text-left font-bold text-base transition-colors"
                    style={{ color: text }}
                    onMouseEnter={e => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="pr-4">{faq.q}</span>
                    <IconChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} style={{ color: ACCENT } as React.CSSProperties} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-7 pb-6 pt-4 leading-relaxed text-sm border-t" style={{ color: textSub, borderColor: borderF }}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: bg }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ opacity: isDark ? 0.14 : 0.08, background: isDark ? "rgba(130,2,99,0.18)" : "rgba(130,2,99,0.08)" }} />
          </div>
          <div className="container mx-auto px-4 text-center relative">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-4 leading-tight" style={{ color: text }}>
              Pret a devenir<br /><span style={{ color: ACCENT }}>une star digitale ?</span>
            </motion.h2>
            <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: textSub }}>Contactez-nous aujourd'hui. Les premieres places de coaching sont limitees.</p>
            <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-black px-12 py-5 text-xl transition-colors"
              style={{ background: ACCENT, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#820263")}
              onMouseLeave={e => (e.currentTarget.style.background = ACCENT)}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Je rejoins Digital Star Agency
            </a>
          </div>
        </section>

        <OrderWebsiteSection />
      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
