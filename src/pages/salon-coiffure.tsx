import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider } from "@/context/PageTheme";
import { MapSection } from "@/components/shared/MapSection";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Scissors, Check, Smartphone, Sparkles, Clock, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useColorScheme } from "@/hooks/useColorScheme";

const WA = "https://wa.me/243819730124";

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ═══════════════════════════════════════
   LOGO SALON
═══════════════════════════════════════ */
function SalonLogo({ size = 38, accent = "#c084fc", pink = "#ec4899" }: { size?: number; accent?: string; pink?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      {/* Outer diamond */}
      <path d="M24 2 L46 24 L24 46 L2 24 Z" stroke={accent} strokeWidth="1.2" fill="none" />
      {/* Inner diamond */}
      <path d="M24 10 L38 24 L24 38 L10 24 Z" stroke={accent} strokeWidth="0.8" fill={`${accent}18`} />
      {/* Center star */}
      <path d="M24 18 L25.6 22.5 L30.5 22.5 L26.5 25.4 L28 30 L24 27.2 L20 30 L21.5 25.4 L17.5 22.5 L22.4 22.5 Z" fill={pink} />
      {/* Cardinal dots */}
      <circle cx="24" cy="2"  r="2" fill={accent} />
      <circle cx="46" cy="24" r="2" fill={accent} />
      <circle cx="24" cy="46" r="2" fill={accent} />
      <circle cx="2"  cy="24" r="2" fill={accent} />
      {/* Tiny corner accents */}
      <circle cx="35" cy="13" r="1.2" fill={pink} opacity="0.7" />
      <circle cx="13" cy="35" r="1.2" fill={pink} opacity="0.7" />
    </svg>
  );
}

/* floating sparkle positions — deterministic */
const SPARKLES = [
  { left:  7, delay: 0.0, dur: 7.2, size: 3, opacity: 0.55 },
  { left: 14, delay: 1.8, dur: 9.0, size: 2, opacity: 0.40 },
  { left: 22, delay: 0.4, dur: 6.5, size: 4, opacity: 0.60 },
  { left: 30, delay: 3.1, dur: 8.0, size: 2, opacity: 0.35 },
  { left: 38, delay: 1.0, dur: 7.8, size: 3, opacity: 0.50 },
  { left: 46, delay: 2.4, dur: 9.5, size: 2, opacity: 0.45 },
  { left: 54, delay: 0.7, dur: 6.8, size: 4, opacity: 0.55 },
  { left: 61, delay: 1.5, dur: 8.3, size: 2, opacity: 0.40 },
  { left: 68, delay: 3.6, dur: 7.0, size: 3, opacity: 0.60 },
  { left: 75, delay: 0.9, dur: 9.2, size: 2, opacity: 0.35 },
  { left: 83, delay: 2.0, dur: 6.3, size: 4, opacity: 0.50 },
  { left: 91, delay: 1.3, dur: 8.7, size: 3, opacity: 0.45 },
  { left: 97, delay: 4.0, dur: 7.5, size: 2, opacity: 0.55 },
];

interface SalonFAQProps {
  accent: string; textPrimary: string; textMuted: string; cardBg: string; borderClr: string;
}
function SalonFAQ({ accent, textPrimary, textMuted, cardBg, borderClr }: SalonFAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="overflow-hidden" style={{ backgroundColor: cardBg, border: `1px solid ${borderClr}` }}>
          <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpen(open === i ? null : i)}>
            <span className="font-semibold text-base" style={{ color: textPrimary }}>{faq.q}</span>
            <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform ${open === i ? "rotate-180" : ""}`} style={{ color: accent }} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-6 pb-5 leading-relaxed" style={{ color: textMuted }}>{faq.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const testimonials = [
  { name: "Diane Ngalula",    role: "Avocate",          text: "Ma coupe a ete tellement bien executee que je recois des compliments partout ou je vais depuis. Un travail artistique, precis et soigne. Je reviens chaque mois sans faute." },
  { name: "Henriette Kasongo", role: "Femme d'affaires", text: "Le lissage bresilien a transforme mes cheveux. Fini les frisottis, mes cheveux sont soyeux et brillants depuis 4 mois. Un resultat professionnel qui dure. Incroyable." },
  { name: "Carine Mwiko",     role: "Styliste de mode",  text: "En tant que professionnelle de l'image, je ne confie mes cheveux qu'a des experts. Ce salon est la reference absolue a Lubumbashi. Produits haut de gamme, technique irreprochable." },
];

const faqs = [
  { q: "Faut-il prendre rendez-vous ?", a: "Oui, la reservation est obligatoire via WhatsApp pour garantir la qualite et eviter l'attente. Nous confirmons votre creneau en moins de 30 minutes." },
  { q: "Combien de temps dure un lissage bresilien ?", a: "Un lissage bresilien a la keratine tient entre 3 et 4 mois selon la nature de vos cheveux et votre routine de soin. Nous vous conseillons les produits adaptes pour prolonger le resultat." },
  { q: "Utilisez-vous des produits sans ammoniaque ?", a: "Oui, toutes nos colorations sont sans ammoniaque. Nous utilisons uniquement des marques professionnelles reconnues : L'Oreal Professionnel, Kerastase et Wella Professionals." },
  { q: "Proposez-vous des coiffures pour evenements ?", a: "Absolument. Mariages, soirees de gala, babteme, anniversaire : nous creeons la coiffure parfaite pour votre occasion speciale. Reservation recommandee 7 jours a l'avance." },
  { q: "Acceptez-vous les enfants ?", a: "Oui, nous proposons des coupes enfants pour les garcons et les filles a partir de 5 ans. Ambiance douce et bienveillante pour les plus jeunes." },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ─── Sous-navbar ─── */
function SalonNav() {
  const links: [string, string][] = [["Tarifs","tarifs"],["Realisations","realisations"],["Expertise","expertise"],["Marques","marques"],["Horaires","horaires"]];
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center h-12 px-6"
      style={{ top: 64, background: "rgba(88,28,135,0.85)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(192,132,252,0.25)", fontFamily: "Josefin Sans, sans-serif" }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0 mr-8">
        <SalonLogo size={24} accent="#c084fc" pink="#ec4899" />
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Beauté & Style</span>
      </div>
      {/* Links */}
      <div className="flex items-center gap-6">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-200 pb-0.5"
            style={{ color: "rgba(255,255,255,0.6)", borderBottom: "1px solid transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c084fc"; (e.currentTarget as HTMLElement).style.borderBottomColor = "#c084fc"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent"; }}>
            {label}
          </button>
        ))}
      </div>
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="ml-auto text-xs font-bold uppercase tracking-widest px-4 py-1.5 transition-all duration-200"
        style={{ background: "#c084fc", color: "#fff" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#9333ea"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#c084fc"; }}>
        Reserver
      </a>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function SalonCoiffure() {
  const { isDark, toggle } = useColorScheme();

  const ACCENT = isDark ? "#c084fc" : "#9333ea";
  const PINK   = isDark ? "#ec4899" : "#db2777";
  const pageBg      = isDark ? "#0a0a0a" : "#fdf8ff";
  const sectionAlt  = isDark ? "#111111" : "#f5edff";
  const cardBg      = isDark ? "#000000" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#1a0a2e";
  const textSub     = isDark ? "#d1d5db" : "#4b5563";
  const textMuted   = isDark ? "#6b7280" : "#9ca3af";
  const borderClr   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const ThemeToggle = (
    <button onClick={toggle} aria-label="Changer le theme"
      className="flex items-center justify-center w-9 h-9 rounded-full border transition-colors"
      style={{ borderColor: borderClr, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", color: ACCENT }}>
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  useSEO({
    title: "Salon de Coiffure Lubumbashi | CommandeTonSite",
    description: "Site web pour votre salon de coiffure a Lubumbashi. Prestations, tarifs et reservation en ligne. Attirez plus de clientes. Commandez via WhatsApp.",
    path: "/salon-coiffure",
    keywords: "salon coiffure Lubumbashi, salon beaute Congo, coiffeur Lubumbashi, site web salon beaute RDC",
    structuredData: { "@context": "https://schema.org", "@type": "HairSalon", "name": "Salon Beaute et Style Lubumbashi", "description": "Salon de coiffure et beaute premium a Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/salon-coiffure", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });

  return (
    <PageThemeProvider theme={{
      accent: ACCENT,
      navBg: isDark ? "#0a0a0a" : "#fdf8ff",
      navIsDark: isDark,
      footerBg: isDark ? "#000000" : "#f0e6ff",
      footerIsDark: isDark,
    }}>
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300" style={{ backgroundColor: pageBg, color: textPrimary, fontFamily: "Josefin Sans, sans-serif" }}>
      <Navbar appendRight={ThemeToggle} />
      <SalonNav />

      <main className="flex-grow pt-16">

        {/* ══ HERO ══ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">

          {/* Background photo */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560066984-138daaa7ed34?w=1600&auto=format&fit=crop&q=85)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.92) 0%, rgba(10,10,10,0.88) 60%, rgba(157,23,77,0.80) 100%)" }} />
          </div>

          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "linear-gradient(rgba(192,132,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* Floating sparkle particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {SPARKLES.map((s, i) => (
              <motion.div key={i}
                className="absolute rounded-full"
                style={{ width: s.size, height: s.size, left: `${s.left}%`, bottom: "-10px", background: i % 3 === 0 ? "#ec4899" : "#c084fc" }}
                animate={{ y: [0, -700], opacity: [0, s.opacity, 0] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Shimmer sweep */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(105deg, transparent 30%, rgba(192,132,252,0.08) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Content */}
          <div className="container mx-auto px-4 z-10 text-center">
            <div className="max-w-3xl mx-auto">

              {/* Animated logo */}
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
                className="flex justify-center mb-8">
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,0.7))" }}>
                  <SalonLogo size={80} accent="#c084fc" pink="#ec4899" />
                </motion.div>
              </motion.div>

              {/* Headline stagger */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
                className="text-xs uppercase tracking-[0.4em] mb-6 font-semibold" style={{ color: "#c084fc" }}>
                Salon de Beaute Premium · Lubumbashi
              </motion.p>

              <div className="overflow-hidden mb-4">
                <motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-8xl font-bold tracking-tight uppercase leading-none text-white">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: "#c084fc" }}>Beaute</motion.span>
                  {" "}&amp;{" "}
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>Style</motion.span>
                </motion.h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
                className="text-xl md:text-2xl mb-4 font-light max-w-xl mx-auto leading-relaxed text-gray-300">
                L'art de vous sublimer. Revelez votre beaute naturelle grace a l'expertise de nos coiffeurs dans une ambiance glamour et intimiste.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                className="text-xl mb-10" style={{ color: "#ec4899" }}>
                ★★★★★ <span className="text-gray-500 text-sm ml-2">200+ clientes satisfaites</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
                <WhatsAppButton text="Reserver votre moment" className="px-10 py-5 text-xl font-bold border-none uppercase tracking-wider text-white" style={{ backgroundColor: "#c084fc" }} />
              </motion.div>

            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${pageBg})` }} />
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="py-24" style={{ backgroundColor: pageBg }}>
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: PINK }}>Nos prestations</p>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest" style={{ color: textPrimary }}>Tarifs et Prestations</h2>
              <div className="w-20 h-[2px] mt-4" style={{ backgroundColor: ACCENT }} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {[
                { name: "Coupe Creation Homme",     price: "$15", desc: "Shampoing, coupe, coiffage et soin barbe" },
                { name: "Coupe et Brushing Femme",  price: "$25", desc: "Shampoing traitant, coupe sur mesure et brushing" },
                { name: "Soin Capillaire Profond",  price: "$30", desc: "Rituel reparateur a la keratine pure" },
                { name: "Coloration Subtile",       price: "$45", desc: "Couleur eclatante sans ammoniaque" },
                { name: "Balayage et Ombre Hair",   price: "$65", desc: "Effet soleil naturel et fondu parfait" },
                { name: "Tresses Africaines",       price: "$40", desc: "Creations artistiques et protectrices" },
                { name: "Lissage Bresilien",        price: "$80", desc: "Soin lissant a la keratine, tenue 3 a 4 mois" },
                { name: "Chignon Evenement",        price: "$35", desc: "Coiffure d'exception pour mariages et soirees" },
              ].map((service, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-7 flex items-center gap-6 transition-all duration-300 group"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderClr}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACCENT; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${ACCENT}25`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = borderClr; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <div className="w-1 h-12 flex-shrink-0 transition-all duration-300 group-hover:h-14" style={{ backgroundColor: ACCENT }} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold" style={{ color: textPrimary }}>{service.name}</h3>
                    <p className="text-sm mt-1" style={{ color: textMuted }}>{service.desc}</p>
                  </div>
                  <span className="text-2xl font-bold flex-shrink-0" style={{ color: PINK }}>{service.price}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <WhatsAppButton text="Prendre rendez-vous" className="border-none font-bold px-10 py-4 text-lg uppercase tracking-wider text-white" style={{ backgroundColor: PINK }} />
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="expertise" className="py-24" style={{ backgroundColor: sectionAlt }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full grid grid-cols-2 gap-3">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative aspect-[3/4] overflow-hidden mt-10 group">
                  <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&auto=format&fit=crop&q=85" alt="Coupe longue salon de coiffure Lubumbashi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${ACCENT}99, transparent)` }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-bold text-white uppercase tracking-widest">Coupes Longues</div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative aspect-[3/4] overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=85" alt="Creation coiffure femme salon Lubumbashi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${PINK}99, transparent)` }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-bold text-white uppercase tracking-widest">Creations</div>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Notre savoir-faire</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase leading-tight" style={{ color: textPrimary }}>
                  L'Expertise<br /><span style={{ color: ACCENT }}>A Votre Service</span>
                </h2>
                <p className="text-xl mb-8 font-light leading-relaxed" style={{ color: textSub }}>
                  Nous utilisons uniquement des produits de qualite professionnelle pour garantir la sante de vos cheveux. Notre equipe se forme continuellement aux nouvelles techniques.
                </p>
                <div className="space-y-5 mb-10">
                  {["Produits Haut de Gamme uniquement", "Hygiene et materiel sterile", "Conseils personnalises inclus", "Ambiance detente et intimiste"].map((tag, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4">
                      <Check className="w-5 h-5 flex-shrink-0" style={{ color: PINK }} />
                      <span className="text-lg tracking-wider" style={{ color: textPrimary }}>{tag}</span>
                    </motion.div>
                  ))}
                </div>
                <WhatsAppButton text="Contacter le salon" className="border-none font-bold px-8 py-4 text-lg uppercase tracking-wider text-white" style={{ backgroundColor: ACCENT }} />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery strip */}
        <section className="py-0 overflow-hidden">
          <div className="grid grid-cols-4 h-56 md:h-72">
            {[
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=85",
              "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&auto=format&fit=crop&q=85",
              "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=500&auto=format&fit=crop&q=85",
              "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=85",
            ].map((url, i) => (
              <div key={i} className="overflow-hidden relative group">
                <img src={url} alt={`Realisation coiffure salon Lubumbashi ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? ACCENT : PINK}88)` }} />
              </div>
            ))}
          </div>
        </section>

        {/* Réalisations */}
        <section id="realisations" className="py-24" style={{ backgroundColor: cardBg }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: PINK }}>Notre portfolio</p>
              <h2 className="text-4xl font-bold uppercase tracking-widest" style={{ color: textPrimary }}>Nos Realisations</h2>
              <div className="w-16 h-[2px] mt-4" style={{ backgroundColor: PINK }} />
              <p className="mt-4 text-sm uppercase tracking-widest" style={{ color: textMuted }}>Chaque photo est une cliente reelle de notre salon</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { url: "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Tresses Africaines", tag: "$40" },
                { url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Coloration & Balayage", tag: "$65" },
                { url: "https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Lissage Bresilien", tag: "$80" },
                { url: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Brushing Glamour", tag: "$25" },
                { url: "https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Ombre Hair", tag: "$65" },
                { url: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", label: "Chignon Evenement", tag: "$35" },
              ].map((real, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                  <img src={real.url} alt={real.label} className="w-full h-full object-cover transition-transform duration-700" loading="eager"
                    style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(to top, ${i % 2 === 0 ? ACCENT : PINK}dd 0%, transparent 55%)` }} />
                  {/* Label always visible at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
                    <div className="text-white text-sm font-bold uppercase tracking-widest">{real.label}</div>
                    <div className="text-xs mt-1 font-semibold" style={{ color: i % 2 === 0 ? "#c084fc" : "#f9a8d4" }}>A partir de {real.tag}</div>
                  </div>
                  {/* Top-right badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 text-xs font-bold uppercase text-white"
                    style={{ backgroundColor: i % 2 === 0 ? ACCENT : PINK }}>
                    Voir tarif
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <WhatsAppButton text="Reserver cette prestation" className="border-none font-bold px-10 py-4 text-lg uppercase tracking-wider text-white" style={{ backgroundColor: ACCENT }} />
            </div>
          </div>
        </section>

        {/* Marques */}
        <section id="marques" className="py-20" style={{ backgroundColor: sectionAlt }}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: PINK }}>Notre standard qualite</p>
              <h2 className="text-3xl font-bold uppercase tracking-widest" style={{ color: textPrimary }}>Produits Professionnels</h2>
              <div className="w-16 h-[2px] mt-4" style={{ backgroundColor: ACCENT }} />
              <p className="mt-4 max-w-xl" style={{ color: textMuted }}>Nous refusons tout produit de bazar. Seules des marques certifiees et reconnues mondialement protegent la sante de vos cheveux.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { nom: "L'Oreal Professionnel", spec: "Colorations sans ammoniaque" },
                { nom: "Kerastase",             spec: "Soins reparateurs premium" },
                { nom: "Wella Professionals",   spec: "Balayages et teintures" },
                { nom: "Schwarzkopf Pro",       spec: "Decoloration et techniques" },
                { nom: "Redken",                spec: "Soins keratinisants" },
                { nom: "Olaplex",               spec: "Traitement reparateur N°3" },
                { nom: "Moroccanoil",           spec: "Serum brillance et frizz" },
                { nom: "GHD",                   spec: "Lisseurs et appareils coiffants" },
              ].map((brand, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-5 text-center transition-all duration-300"
                  style={{ backgroundColor: cardBg, border: `1px solid ${borderClr}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}80`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${ACCENT}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = borderClr; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <div className="font-bold text-sm mb-2 uppercase tracking-wide" style={{ color: ACCENT }}>{brand.nom}</div>
                  <div className="text-xs leading-relaxed" style={{ color: textMuted }}>{brand.spec}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Horaires */}
        <section id="horaires" className="py-20" style={{ backgroundColor: pageBg }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Quand nous trouver</p>
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-8" style={{ color: textPrimary }}>Horaires du Salon</h2>
                <div className="space-y-3">
                  {[
                    { j: "Lundi - Mercredi", h: "9h00 - 19h00" },
                    { j: "Jeudi - Vendredi", h: "9h00 - 20h00" },
                    { j: "Samedi",           h: "8h00 - 20h30" },
                    { j: "Dimanche",         h: "10h00 - 16h00 (sur RDV)" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${borderClr}` }}>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4" style={{ color: ACCENT }} />
                        <span className="text-sm" style={{ color: textSub }}>{row.j}</span>
                      </div>
                      <span className="font-bold text-sm" style={{ color: PINK }}>{row.h}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-6" style={{ color: textMuted }}>Reservation obligatoire via WhatsApp · Reponse sous 30 minutes</p>
              </div>
              <div className="flex-1 p-8" style={{ backgroundColor: sectionAlt, border: `1px solid ${borderClr}` }}>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-6" style={{ color: textPrimary }}>Pourquoi reserver ?</h3>
                <div className="space-y-5">
                  {[
                    { title: "Votre creneau garanti", desc: "Plus besoin d'attendre. Votre heure est reservee rien que pour vous." },
                    { title: "Temps de preparation",  desc: "Nous preparons les produits et le materiel adapte a votre type de cheveux." },
                    { title: "Accueil VIP",           desc: "Vous etes attendue par nom. L'experience commence avant meme votre arrivee." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${ACCENT}20`, border: `1px solid ${ACCENT}` }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1" style={{ color: textPrimary }}>{item.title}</div>
                        <div className="text-sm leading-relaxed" style={{ color: textMuted }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <WhatsAppButton text="Reserver maintenant" className="w-full border-none font-bold py-3 uppercase tracking-wider justify-center text-white" style={{ backgroundColor: ACCENT }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ backgroundColor: sectionAlt }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: PINK }}>Questions frequentes</p>
              <h2 className="text-3xl font-bold uppercase tracking-widest" style={{ color: textPrimary }}>Vos Questions</h2>
              <div className="w-16 h-[2px] mt-4" style={{ backgroundColor: ACCENT }} />
            </div>
            <SalonFAQ accent={ACCENT} textPrimary={textPrimary} textMuted={textMuted} cardBg={cardBg} borderClr={borderClr} />
          </div>
        </section>

        {/* CTA final */}
        <section className="relative py-28 overflow-hidden" style={{ backgroundColor: isDark ? "#0a0a0a" : "#1a0a2e" }}>
          {/* Animated glow orbs */}
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)", top: "50%", left: "20%", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)", top: "50%", right: "10%", transform: "translateY(-50%)" }}
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="flex justify-center mb-8">
              <SalonLogo size={64} accent="#c084fc" pink="#ec4899" />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-widest text-white">
              Votre beaute commence ici
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-xl mb-10 max-w-xl mx-auto font-light text-gray-400">
              Reservez votre rdv maintenant. Places limitees par semaine pour garantir la qualite de chaque prestation.
            </motion.p>
            <motion.a initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-black px-10 py-5 text-xl uppercase tracking-wider text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#c084fc", boxShadow: "0 0 30px rgba(192,132,252,0.4)" }}>
              {WA_SVG} Reserver mon creneau
            </motion.a>
            <p className="mt-6 text-sm" style={{ color: "#c084fc" }}>Reponse garantie sous 30 minutes</p>
          </div>
        </section>

        <MapSection title="Notre Salon" subtitle="Venez vous detendre dans notre espace beaute a Lubumbashi." />
        <OrderWebsiteSection />
      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
