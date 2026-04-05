import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { MapSection } from "@/components/shared/MapSection";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

/* ══ Palette full-light ══ */
const L   = "#faf6ed";
const L2  = "#ffffff";
const L3  = "#f0e8d4";
const A   = "#d97706";
const AG  = "#fbbf24";
const DT  = "#1c1309";
const BL  = `rgba(217,119,6,0.13)`;
const BLA = `rgba(217,119,6,0.22)`;

const HERO_IMG = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=80";

const faqs = [
  { q: "Proposez-vous des commandes sur mesure ?", a: "Oui, nous créons des pièces uniques sur mesure. Prenez rendez-vous via WhatsApp pour une consultation avec notre styliste." },
  { q: "Livrez-vous vos commandes ?", a: "Nous livrons dans tout Lubumbashi et expédions dans toute la RDC sur demande. Contactez-nous pour les détails de livraison." },
  { q: "Puis-je retourner un article qui ne me convient pas ?", a: "Oui, les articles non personnalisés peuvent être retournés dans les 7 jours avec le ticket de caisse. Les pièces sur mesure ne sont pas reprises." },
  { q: "Quels événements habillez-vous ?", a: "Mariages, soirées de gala, cérémonies traditionnelles, réunions d'affaires... Nous habillons pour toutes les occasions importantes de votre vie." },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ══ Icône Mode animée ══ */
function FashionIcon({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div className={className} animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <svg viewBox="0 0 80 80" fill="none" style={{ width: size, height: size }}>
        {/* Anneau tournant en pointillés */}
        <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "40px 40px" }}>
          <circle cx="40" cy="40" r="37" stroke={A} strokeWidth="0.6" strokeDasharray="3 8" opacity="0.45" />
        </motion.g>
        {/* Anneau statique */}
        <circle cx="40" cy="40" r="30" stroke={A} strokeWidth="0.4" opacity="0.2" />
        {/* Silhouette robe — dessin progressif */}
        <motion.path
          d="M40 17 L31 29 L27 59 L40 57 L53 59 L49 29 Z"
          stroke={A} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"
          fill={`${A}08`}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }} />
        {/* Ligne d'épaules */}
        <motion.path
          d="M31 29 Q40 22 49 29"
          stroke={AG} strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }} />
        {/* Ligne taille */}
        <motion.line
          x1="28.5" y1="43" x2="51.5" y2="43"
          stroke={A} strokeWidth="0.8" strokeLinecap="round"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          style={{ transformOrigin: "40px 43px" }}
          transition={{ duration: 0.5, delay: 1.7 }} />
        {/* 4 points cardinaux */}
        {([[40, 3], [40, 77], [3, 40], [77, 40]] as [number, number][]).map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="2" fill={A}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.12, type: "spring", stiffness: 300 }} />
        ))}
        {/* Étincelles pulsantes aux épaules */}
        {([[31, 29], [49, 29]] as [number, number][]).map(([cx, cy], i) => (
          <motion.circle key={i + 10} cx={cx} cy={cy} r="2.2" fill={AG}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 + 2.4 }} />
        ))}
      </svg>
    </motion.div>
  );
}

/* ══ Crochets de coin 2050 ══ */
function Corners({ size = 12, color = A, inset = 8 }: { size?: number; color?: string; inset?: number }) {
  const s: React.CSSProperties = { position: "absolute", width: size, height: size };
  return (<>
    <span style={{ ...s, top: inset, left: inset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    <span style={{ ...s, top: inset, right: inset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    <span style={{ ...s, bottom: inset, left: inset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
    <span style={{ ...s, bottom: inset, right: inset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
  </>);
}

/* ══ Label de section ══ */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <div className="flex-1 h-px max-w-20" style={{ background: `linear-gradient(90deg, transparent, ${A}60)` }} />
      <span className="text-[9px] tracking-[0.55em] uppercase" style={{ color: A }}>{label}</span>
      <div className="flex-1 h-px max-w-20" style={{ background: `linear-gradient(90deg, ${A}60, transparent)` }} />
    </div>
  );
}

/* ══ Bouton WhatsApp ══ */
function WaBtn({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 font-semibold px-8 py-4 text-sm uppercase tracking-widest transition-opacity hover:opacity-80 relative overflow-hidden group"
      style={outline ? { border: `1px solid ${A}`, color: A } : { background: A, color: "#fff" }}>
      {!outline && (
        <motion.span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
          style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)" }} />
      )}
      <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ fill: outline ? A : "#fff" }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      {text}
    </a>
  );
}

/* ══ Compteur animé ══ */
function AnimCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let v = 0;
      const step = () => { v += Math.ceil(value / 50); if (v >= value) { setN(value); return; } setN(v); requestAnimationFrame(step); };
      requestAnimationFrame(step);
      obs.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ══ Sous-navbar ══ */
function ModeNav() {
  const [solid, setSolid] = React.useState(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links: [string, string][] = [["Collections", "collections"], ["Savoir-faire", "savoirfaire"], ["Tarifs", "tarifs"]];
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center justify-between px-8 h-10"
      style={{ top: 64, background: solid ? `${L}f8` : `${L}cc`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${BL}`, transition: "background 0.4s" }}>
      <div className="flex items-center gap-3">
        <FashionIcon size={22} />
        <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${DT}45` }}>Maison d'Habillement · Lubumbashi</span>
      </div>
      <div className="flex items-center gap-8">
        {links.map(([label, id], i) => (
          <React.Fragment key={id}>
            {i > 0 && <span style={{ color: `${A}40`, fontSize: 10 }}>·</span>}
            <button onClick={() => scrollTo(id)}
              className="text-[10px] tracking-[0.28em] uppercase transition-colors duration-200"
              style={{ color: `${DT}50` }}
              onMouseEnter={e => (e.currentTarget.style.color = A)}
              onMouseLeave={e => (e.currentTarget.style.color = `${DT}50`)}>
              {label}
            </button>
          </React.Fragment>
        ))}
      </div>
      <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
        className="text-[9px] tracking-[0.35em] uppercase px-4 py-1 border transition-all duration-200"
        style={{ borderColor: BLA, color: A }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${A}12`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
        Commander
      </a>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function MaisonHabillement() {
  useSEO({
    title: "Boutique Mode et Habillement | CommandeTonSite",
    description: "Site web pour votre boutique de mode à Lubumbashi. Collections, tarifs et contact en ligne.",
    path: "/maison-habillement",
    keywords: "boutique mode Lubumbashi, habillement Congo, vetements Lubumbashi, site web mode RDC",
    structuredData: { "@context": "https://schema.org", "@type": "ClothingStore", "name": "Maison d'Habillement Lubumbashi", "description": "Boutique de mode à Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/maison-habillement", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageThemeProvider theme={themes.mode}>
    <div className="min-h-[100dvh] flex flex-col" style={{ background: L }}>
      <Navbar />
      <ModeNav />

      <main className="flex-grow">

        {/* ══ 1. HERO ══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: 104, background: L }}>
          {/* Image mode en fond — douce */}
          <div className="absolute inset-0 pointer-events-none">
            <img src={HERO_IMG} alt="" aria-hidden="true"
              className="w-full h-full object-cover object-center"
              style={{ filter: "saturate(0.6) brightness(1.05)", opacity: 0.14 }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${L}55 0%, transparent 40%, ${L}88 100%)` }} />
          </div>

          {/* Grille subtile 2050 */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${A}08 1px, transparent 1px), linear-gradient(90deg, ${A}08 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} />

          <div className="relative z-10 container mx-auto px-4 text-center">
            {/* Icône animée */}
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}
              className="flex justify-center mb-8">
              <FashionIcon size={90} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
              className="flex items-center justify-center gap-5 mb-8">
              <div className="flex-1 h-px max-w-20" style={{ background: `linear-gradient(90deg, transparent, ${A}60)` }} />
              <span className="text-[9px] tracking-[0.55em] uppercase" style={{ color: A }}>Maison de Haute Couture · Lubumbashi</span>
              <div className="flex-1 h-px max-w-20" style={{ background: `linear-gradient(90deg, ${A}60, transparent)` }} />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[9rem] font-black leading-none tracking-tight" style={{ color: DT }}>
                L'Élégance
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[9rem] font-black leading-none tracking-tight mb-6" style={{ color: A }}>
                à Votre Portée
              </motion.h1>
            </div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.85 }}
              className="h-[1px] mx-auto mb-8 max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${A}, transparent)` }} />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.95 }}
              className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: `${DT}65` }}>
              Des pièces uniques, des matières nobles, une finition impeccable.<br />L'art de la mode au service de votre personnalité.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <WaBtn text="Explorer la Collection" />
              <button onClick={() => scrollTo("collections")}
                className="px-8 py-4 text-sm uppercase tracking-widest border transition-all duration-200"
                style={{ borderColor: BLA, color: `${DT}65` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = A; (e.currentTarget as HTMLElement).style.color = A; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BLA; (e.currentTarget as HTMLElement).style.color = `${DT}65`; }}>
                Voir nos Collections
              </button>
            </motion.div>

            {/* Étoiles 2050 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.07 }} style={{ color: AG }} className="text-lg">★</motion.span>
              ))}
              <span className="ml-3 text-xs tracking-widest uppercase" style={{ color: `${DT}35` }}>150 + clientes satisfaites</span>
            </motion.div>
          </div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <div className="w-px h-12 mx-auto" style={{ background: `linear-gradient(${A}70, transparent)` }} />
          </motion.div>
        </section>

        {/* ══ 2. STATS 2050 ══ */}
        <section className="py-14" style={{ background: L3, borderTop: `1px solid ${BL}`, borderBottom: `1px solid ${BL}` }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: BL }}>
              {[
                { val: 500, suf: "+", lbl: "Pièces créées", ref: "STA-01" },
                { val: 8, suf: " ans", lbl: "D'expertise", ref: "STA-02" },
                { val: 100, suf: "%", lbl: "Couture locale", ref: "STA-03" },
                { val: 0, suf: "", lbl: "Sur mesure", str: "∞", ref: "STA-04" },
              ].map((s, i) => (
                <div key={i} className="relative text-center py-10 px-6" style={{ background: L3 }}>
                  <Corners size={10} color={`${A}40`} inset={6} />
                  <div className="text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: `${A}60` }}>{s.ref}</div>
                  <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: A }}>
                    {s.str ?? <AnimCounter value={s.val} suffix={s.suf} />}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase" style={{ color: `${DT}45` }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. COLLECTIONS ══ */}
        <section id="collections" className="py-24" style={{ background: L2 }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionLabel label="Catalogue · 2026" />
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: DT }}>Lignes de Collection</h2>
              <div className="w-16 h-[1px] mx-auto" style={{ background: A }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                { name: "Collection Femme", tag: "ÉLÉGANCE INTEMPORELLE", code: "CF-26", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop" },
                { name: "Collection Homme", tag: "STYLE ET CARACTÈRE", code: "CH-26", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop" },
                { name: "Édition Africaine", tag: "TRADITION & MODERNITÉ", code: "EA-26", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop" },
                { name: "Sur Mesure", tag: "COUTURE PERSONNALISÉE", code: "SM-26", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop" },
                { name: "Collection Enfant", tag: "DOUCEUR ET COULEUR", code: "CE-26", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop" },
                { name: "Tenues de Soirée", tag: "GLAMOUR & PRESTIGE", code: "TS-26", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop" },
              ].map((col, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.09 }}
                  className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                  <Corners color={`${A}50`} size={14} inset={10} />
                  <img src={col.img} alt={col.name} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108" />
                  {/* Overlay gradient permanent subtil en bas */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,19,9,0.75) 0%, rgba(28,19,9,0.15) 45%, transparent 100%)" }} />
                  {/* Code collection en haut à gauche */}
                  <div className="absolute top-4 left-4 text-[8px] tracking-[0.4em] uppercase px-2 py-0.5"
                    style={{ background: `${DT}80`, color: AG, backdropFilter: "blur(8px)" }}>
                    {col.code}
                  </div>
                  {/* Info en bas toujours visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0">
                    <div className="text-[8px] tracking-[0.4em] mb-1.5" style={{ color: AG }}>{col.tag}</div>
                    <h3 className="text-lg font-black text-white mb-3">{col.name}</h3>
                    <motion.a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
                      className="text-[9px] tracking-widest uppercase px-4 py-2 inline-block border opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ borderColor: `${AG}60`, color: AG }}>
                      Voir la collection →
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. ATELIER 2050 ══ */}
        <section id="savoirfaire" className="py-24 relative overflow-hidden" style={{ background: L }}>
          {/* Image mode derrière — très légère */}
          <div className="absolute inset-0 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&auto=format&fit=crop" alt="" aria-hidden="true"
              className="w-full h-full object-cover object-center" style={{ opacity: 0.055, filter: "saturate(0)" }} />
          </div>
          <div className="relative z-10 container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                className="flex-1">
                <div className="relative aspect-[4/5] overflow-hidden" style={{ border: `1px solid ${BLA}` }}>
                  <Corners size={18} inset={12} />
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop" alt="Lookbook" loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                  <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: `${L2}f2`, borderTop: `1px solid ${BL}` }}>
                    <Corners size={10} color={`${A}40`} inset={5} />
                    <div className="text-[8px] tracking-[0.45em] uppercase mb-1" style={{ color: A }}>Nouvelle Collection</div>
                    <div className="text-xl font-black" style={{ color: DT }}>Printemps · Été 2026</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                className="flex-1">
                <SectionLabel label="Savoir-Faire" />
                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={{ color: DT }}>
                  L'Atelier<br />en Action
                </h2>
                <p className="text-lg mb-5 leading-relaxed" style={{ color: `${DT}65` }}>
                  Chaque pièce est pensée et conçue avec une attention particulière aux matières et aux finitions. Nous sélectionnons rigoureusement nos tissus importés et locaux pour vous garantir confort, durabilité et caractère.
                </p>
                <p className="text-lg mb-10 leading-relaxed" style={{ color: `${DT}65` }}>
                  Laissez nos stylistes vous guider vers la tenue qui sublimera votre silhouette pour chaque occasion de votre vie.
                </p>
                <div className="space-y-0 mb-10">
                  {[
                    { label: "MATIÈRES", val: "Tissus sélectionnés et importés" },
                    { label: "FINITION", val: "Coutures renforcées et durables" },
                    { label: "ESSAYAGE", val: "Rendez-vous en boutique inclus" },
                    { label: "AJUSTEMENT", val: "Retouches gratuites" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-5 py-4" style={{ borderBottom: `1px solid ${BL}` }}>
                      <div className="text-[8px] tracking-[0.4em] uppercase w-24 flex-shrink-0" style={{ color: A }}>{item.label}</div>
                      <div className="w-px h-4 flex-shrink-0" style={{ background: BLA }} />
                      <span className="text-sm" style={{ color: `${DT}75` }}>{item.val}</span>
                    </motion.div>
                  ))}
                </div>
                <WaBtn text="Prendre rendez-vous" outline />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 5. TARIFS 2050 ══ */}
        <section id="tarifs" className="py-24" style={{ background: L2 }}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <SectionLabel label="Tarification · 2026" />
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: DT }}>Occasions et Budgets</h2>
              <div className="w-16 h-[1px] mx-auto mb-4" style={{ background: A }} />
              <p className="max-w-xl mx-auto text-base" style={{ color: `${DT}50` }}>Chaque tenue est unique. Contactez-nous pour un devis précis.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { code: "TRF-01", occasion: "Quotidien & Bureau", range: "$25 – $80", items: ["Chemises et blouses", "Pantalons taillés", "Robes de bureau", "Ensembles coordonnés"], note: "Livraison 3–5 jours" },
                { code: "TRF-02", occasion: "Soirées & Galas", range: "$80 – $250", items: ["Robes de soirée longues", "Tenues de cocktail", "Costumes cérémonie", "Ensembles kabas africains"], note: "Essayage inclus" },
                { code: "TRF-03", occasion: "Mariages & Cérémonies", range: "$150 – $500+", items: ["Robe de mariée sur mesure", "Tenues des demoiselles", "Costumes du marié", "Tenues traditionnelles"], note: "Réservé 30 jours à l'avance" },
              ].map((tier, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="relative overflow-hidden" style={{ border: `1px solid ${BL}` }}>
                  <Corners size={14} inset={8} />
                  {/* Header */}
                  <div className="px-8 py-6 text-center relative" style={{ background: L3, borderBottom: `1px solid ${BL}` }}>
                    <div className="text-[8px] tracking-[0.5em] uppercase mb-1" style={{ color: `${A}70` }}>{tier.code}</div>
                    <div className="text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: `${DT}50` }}>{tier.occasion}</div>
                    <div className="text-4xl font-black" style={{ color: A }}>{tier.range}</div>
                  </div>
                  {/* Body */}
                  <div className="px-8 py-6" style={{ background: L2 }}>
                    <ul className="space-y-3 mb-6">
                      {tier.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm" style={{ color: `${DT}70` }}>
                          <span className="text-xs flex-shrink-0" style={{ color: A }}>—</span> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 text-[9px] tracking-[0.3em] uppercase font-semibold" style={{ borderTop: `1px solid ${BL}`, color: A }}>
                      {tier.note}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <WaBtn text="Demander un devis gratuit" />
            </div>
          </div>
        </section>

        {/* ══ 6. HORAIRES 2050 ══ */}
        <section className="py-16 relative" style={{ background: L, borderTop: `1px solid ${BL}`, borderBottom: `1px solid ${BL}` }}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Horaires */}
              <div className="relative p-8" style={{ border: `1px solid ${BL}` }}>
                <Corners size={14} inset={8} />
                <div className="text-[8px] tracking-[0.45em] uppercase mb-1" style={{ color: A }}>HOR-01</div>
                <h3 className="text-2xl font-black mb-1" style={{ color: DT }}>Horaires</h3>
                <div className="w-10 h-[1px] mb-6" style={{ background: A }} />
                {[
                  { j: "Lundi – Vendredi", h: "09:00 – 19:00" },
                  { j: "Samedi", h: "09:00 – 20:00" },
                  { j: "Dimanche", h: "Sur rendez-vous" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-3" style={{ borderBottom: `1px solid ${BL}` }}>
                    <span className="text-sm tracking-wide" style={{ color: `${DT}55` }}>{row.j}</span>
                    <span className="font-bold text-sm tracking-widest" style={{ color: A }}>{row.h}</span>
                  </div>
                ))}
                <p className="mt-4 text-[10px] tracking-wide" style={{ color: `${DT}30` }}>Essayages uniquement sur rendez-vous.</p>
              </div>
              {/* Livraison */}
              <div className="relative p-8" style={{ border: `1px solid ${BL}` }}>
                <Corners size={14} inset={8} />
                <div className="text-[8px] tracking-[0.45em] uppercase mb-1" style={{ color: A }}>LIV-01</div>
                <h3 className="text-2xl font-black mb-1" style={{ color: DT }}>Livraison</h3>
                <div className="w-10 h-[1px] mb-6" style={{ background: A }} />
                {[
                  { titre: "Lubumbashi", detail: "Livraison en 24 à 48h dans toute la ville — incluse." },
                  { titre: "Reste de la RDC", detail: "Expédition via transporteur agréé dans toutes les provinces." },
                  { titre: "Retouches offertes", detail: "Tout achat inclut une retouche gratuite si nécessaire." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-4" style={{ borderBottom: `1px solid ${BL}` }}>
                    <div className="text-[8px] tracking-[0.3em] uppercase w-20 flex-shrink-0 mt-0.5" style={{ color: `${A}70` }}>◆</div>
                    <div>
                      <div className="font-black text-sm mb-0.5" style={{ color: DT }}>{item.titre}</div>
                      <div className="text-sm leading-relaxed" style={{ color: `${DT}50` }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 7. PROCESS 2050 ══ */}
        <section className="py-24" style={{ background: L2 }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionLabel label="Processus · 3 Étapes" />
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: DT }}>Votre Expérience</h2>
              <div className="w-16 h-[1px] mx-auto" style={{ background: A }} />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  code: "E-01",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke={A} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M24 6c-3.5 0-6 2.5-6 6h12c0-3.5-2.5-6-6-6Z" />
                      <path d="M10 12h28l-3 26H13L10 12Z" />
                      <path d="M18 12v4M30 12v4" />
                    </svg>
                  ),
                  title: "Découvrez nos Collections",
                  desc: "Parcourez nos collections en ligne ou venez en boutique. Un styliste vous accueille et vous guide selon votre style et budget.",
                },
                {
                  code: "E-02",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke={A} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="14" cy="34" r="5" />
                      <circle cx="34" cy="34" r="5" />
                      <path d="M14 29 30 10M34 29 18 10" />
                      <circle cx="24" cy="10" r="3" />
                    </svg>
                  ),
                  title: "Essayez et Personnalisez",
                  desc: "Essayage en boutique ou création sur mesure. Chaque détail est ajusté pour que la pièce soit parfaitement à votre morphologie.",
                },
                {
                  code: "E-03",
                  icon: (
                    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke={A} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M24 8v4M24 36v4M8 24h4M36 24h4" />
                      <path d="M13.4 13.4l2.8 2.8M31.8 31.8l2.8 2.8M13.4 34.6l2.8-2.8M31.8 16.2l2.8-2.8" />
                      <circle cx="24" cy="24" r="7" />
                    </svg>
                  ),
                  title: "Repartez Sublimée",
                  desc: "Recevez votre pièce finale et portez-la avec confiance. Notre équipe assure les retouches si nécessaire.",
                },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="relative p-8" style={{ border: `1px solid ${BL}`, background: L }}>
                  <Corners size={14} inset={8} />
                  {/* Code étape */}
                  <div className="text-[8px] tracking-[0.45em] uppercase mb-5" style={{ color: `${A}60` }}>{step.code}</div>
                  <div className="mb-6 flex">{step.icon}</div>
                  <h3 className="text-lg font-black mb-3 leading-snug" style={{ color: DT }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${DT}55` }}>{step.desc}</p>
                  {/* Ligne de connexion (desktop) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-[1px] z-10" style={{ background: A }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. FAQ 2050 ══ */}
        <section className="py-24" style={{ background: L }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <SectionLabel label="Questions · FAQ" />
              <h2 className="text-5xl font-black tracking-tight" style={{ color: DT }}>Questions fréquentes</h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="relative" style={{
                  border: `1px solid ${openFaq === i ? A : BL}`,
                  background: openFaq === i ? `${A}05` : L2,
                  transition: "all 0.3s"
                }}>
                  {openFaq === i && <Corners size={10} color={`${A}60`} inset={6} />}
                  <button className="w-full flex items-center justify-between px-6 py-5 text-left"
                    style={{ color: DT }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-bold pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: A }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: `${DT}60`, borderTop: `1px solid ${BL}`, paddingTop: 16 }}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MapSection />
      </main>

      <Footer />
    </div>
    </PageThemeProvider>
  );
}
