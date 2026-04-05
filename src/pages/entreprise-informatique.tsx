import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { Monitor, Smartphone, ShieldCheck, Cloud, Code, Database, ChevronRight, ChevronDown, Terminal, Wifi, Cpu, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useColorScheme } from "@/hooks/useColorScheme";

function useTypingEffect(words: string[], speed = 75, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  React.useEffect(() => {
    const current = words[wordIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIndex < current.length) { t = setTimeout(() => setCharIndex(c => c + 1), speed); }
      else { t = setTimeout(() => setDeleting(true), pause); }
    } else {
      if (charIndex > 0) { t = setTimeout(() => setCharIndex(c => c - 1), speed / 2); }
      else { setDeleting(false); setWordIndex(i => (i + 1) % words.length); }
    }
    setText(current.slice(0, charIndex));
    return () => clearTimeout(t);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);
  return text;
}

const WHATSAPP = "https://wa.me/243819730124";
const WA_SVG = (col: string) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ fill: col }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const testimonials = [
  { name: "Robert Kanda", role: "Directeur, Hotel Grand Palace", text: "Notre site e-commerce a ete livre en 5 jours, fonctionnel et tres professionnel. Les reservations en ligne ont augmente de 70% le premier mois. Equipe irreprochable." },
  { name: "Patricia Mwamba", role: "Fondatrice, ONG Lumiere", text: "Application mobile livree en 3 semaines, intuitive et stable. TechSolutions a ecoute chaque detail de nos besoins. Un vrai partenariat technologique." },
  { name: "Clement Diallo", role: "Entrepreneur, Diallo Group", text: "Le support apres-livraison est exceptionnel. Ils sont disponibles, repondent vite et resolvent les problemes immediatement. Je leur confie tous mes projets." },
];

const faqs = [
  { q: "Combien de temps pour livrer un site web ?", a: "Un site vitrine est livre en 5 a 7 jours ouvrables. Une application sur mesure prend de 3 a 8 semaines selon la complexite. Nous vous donnons un calendrier precis des le depart." },
  { q: "Proposez-vous la maintenance apres livraison ?", a: "Oui, nous offrons des contrats de maintenance mensuelle incluant les mises a jour, la securite, les sauvegardes et le support technique prioritaire." },
  { q: "Puis-je modifier mon site apres livraison ?", a: "Absolument. Nous livrons avec une interface d'administration simple. Pour les modifications techniques, notre equipe reste disponible a tout moment." },
  { q: "Travaillez-vous avec des clients hors de Lubumbashi ?", a: "Oui, nous travaillons avec des clients dans toute la RDC et en Afrique. Toute la coordination se fait a distance via WhatsApp et visioconference." },
];

/* ── Tech Circuit Icon ── */
function CircuitPacket({ startX, startY, dx, dy, delay, accent }: { startX: number; startY: number; dx: number; dy: number; delay: number; accent: string }) {
  return (
    <motion.g
      animate={{ x: [0, dx, dx], y: [0, dy, dy], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay, repeatDelay: 0.5 }}
    >
      <circle cx={startX} cy={startY} r="2" fill={accent} />
    </motion.g>
  );
}

function TechCircuitIcon({ accent }: { accent: string }) {
  const corners = [
    "M3,11 L3,3 L11,3",
    "M53,3 L61,3 L61,11",
    "M3,53 L3,61 L11,61",
    "M53,61 L61,61 L61,53",
  ];
  const delays = [0, 0.75, 1.5, 2.25];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      className="mb-8"
    >
      <svg width="220" height="220" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* PCB corner brackets */}
        {corners.map((d, i) => (
          <motion.path key={i} d={d} stroke={accent} strokeWidth="1.5" strokeLinecap="square" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: delays[i], ease: "easeInOut" }}
          />
        ))}

        {/* Outer dashed boundary */}
        <rect x="3" y="3" width="58" height="58" stroke={accent} strokeWidth="0.25" fill="none" opacity="0.18" strokeDasharray="2 4" />

        {/* Grid lines — horizontal */}
        {[8, 32, 56].map((y, i) => (
          <motion.line key={`h${i}`} x1="8" y1={y} x2="56" y2={y}
            stroke={accent} strokeWidth="0.4"
            animate={{ opacity: [0.12, 0.4, 0.12] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
          />
        ))}

        {/* Grid lines — vertical */}
        {[8, 32, 56].map((x, i) => (
          <motion.line key={`v${i}`} x1={x} y1="8" x2={x} y2="56"
            stroke={accent} strokeWidth="0.4"
            animate={{ opacity: [0.12, 0.4, 0.12] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.9 + 0.45, ease: "easeInOut" }}
          />
        ))}

        {/* Grid nodes 3x3 */}
        {([8, 32, 56] as number[]).flatMap((cx, i) =>
          ([8, 32, 56] as number[]).map((cy, j) => {
            const isCenter = i === 1 && j === 1;
            const isEdge = (i === 1 || j === 1) && !isCenter;
            const r = isCenter ? 4.5 : isEdge ? 2.2 : 1.6;
            return (
              <motion.circle key={`n${i}${j}`} cx={cx} cy={cy} r={r}
                fill={isCenter ? accent : "none"} stroke={accent}
                strokeWidth={isCenter ? 0 : 0.6}
                animate={{ opacity: isCenter ? [1, 0.55, 1] : [0.25, 0.85, 0.25] }}
                transition={{ duration: isCenter ? 1.4 : 2.8, repeat: Infinity, delay: (i * 3 + j) * 0.2, ease: "easeInOut" }}
              />
            );
          })
        )}

        {/* CPU inner square */}
        <motion.rect x="27" y="27" width="10" height="10" stroke={accent} strokeWidth="0.6" fill="none"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* CPU pins — horizontal */}
        {[29, 32, 35].map((x, i) => (
          <motion.line key={`ph${i}`} x1={x} y1="22" x2={x} y2="27"
            stroke={accent} strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
        {[29, 32, 35].map((x, i) => (
          <motion.line key={`pb${i}`} x1={x} y1="37" x2={x} y2="42"
            stroke={accent} strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 + 0.4, ease: "easeInOut" }}
          />
        ))}
        {/* CPU pins — vertical */}
        {[29, 32, 35].map((y, i) => (
          <motion.line key={`pl${i}`} x1="22" y1={y} x2="27" y2={y}
            stroke={accent} strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 + 0.6, ease: "easeInOut" }}
          />
        ))}
        {[29, 32, 35].map((y, i) => (
          <motion.line key={`pr${i}`} x1="37" y1={y} x2="42" y2={y}
            stroke={accent} strokeWidth="0.5"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 + 0.8, ease: "easeInOut" }}
          />
        ))}

        {/* CPU glow ring */}
        <motion.circle cx="32" cy="32" r="11" stroke={accent} strokeWidth="0.5" fill="none"
          animate={{ opacity: [0, 0.55, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Data packets traveling the grid */}
        <CircuitPacket startX={8}  startY={32} dx={48}  dy={0}  delay={0}   accent={accent} />
        <CircuitPacket startX={56} startY={32} dx={-48} dy={0}  delay={1.0} accent={accent} />
        <CircuitPacket startX={32} startY={8}  dx={0}   dy={48} delay={0.5} accent={accent} />
        <CircuitPacket startX={8}  startY={8}  dx={48}  dy={0}  delay={1.4} accent={accent} />
        <CircuitPacket startX={56} startY={8}  dx={0}   dy={48} delay={0.25} accent={accent} />
        <CircuitPacket startX={8}  startY={56} dx={0}   dy={-48} delay={1.8} accent={accent} />
      </svg>
    </motion.div>
  );
}

/* ── Theme toggle ── */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label={isDark ? "Mode clair" : "Mode sombre"}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
      style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,48,73,0.1)", color: isDark ? "#7ab3c8" : "#003049" }}>
      {isDark
        ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
    </button>
  );
}

/* ---------- ScrollTo ---------- */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
};

/* ---------- Sous-navbar Terminal / Code ---------- */
function InfoNavbar({ isDark, ACCENT }: { isDark: boolean; ACCENT: string }) {
  const links: [string, string][] = [["// services","services"],["// stack","stack"],["// equipe","equipe"],["// projets","projets"]];
  const bg = isDark ? "rgba(5,8,14,0.97)" : "rgba(238,244,255,0.97)";
  const txtMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,30,80,0.5)";
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center gap-8 px-8 h-13"
      style={{ top: 64, background: bg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${ACCENT}28`, fontFamily: "JetBrains Mono, Fira Code, 'Courier New', monospace" }}>
      <span className="text-xs font-bold" style={{ color: ACCENT }}>~/projet$</span>
      <div className="flex items-center gap-6 flex-1">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="text-xs font-medium transition-colors duration-200"
            style={{ color: txtMuted }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = txtMuted)}>
            {label}
          </button>
        ))}
      </div>
      <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
        className="text-xs font-bold px-4 py-1.5 transition-colors duration-200"
        style={{ border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: "inherit" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACCENT; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = ACCENT; }}>
        ./devis.sh
      </a>
    </nav>
  );
}

export default function EntrepriseInformatique() {
  useSEO({
    title: "Site Entreprise Informatique | CommandeTonSite",
    description: "Site web pour votre entreprise informatique a Lubumbashi. Services, equipe et realisations en ligne. Commandez via WhatsApp.",
    path: "/entreprise-informatique",
    keywords: "entreprise informatique Lubumbashi, developpeur web Congo, solution informatique RDC, site web tech Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "ProfessionalService", "name": "Tech Solutions Lubumbashi", "description": "Entreprise de services informatiques a Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/entreprise-informatique", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });

  const { isDark, toggle } = useColorScheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const typed = useTypingEffect(["Sites Web Modernes", "Applications Mobiles", "Solutions Cloud", "Logiciels Sur Mesure", "Securite Informatique"]);

  /* ── Color tokens ── */
  const ACCENT = isDark ? "#5ab4d4" : "#003049";
  const bg      = isDark ? "#0a0a0f" : "#f5f7ff";
  const bg2     = isDark ? "#0f0f1a" : "#edf0ff";
  const cardBg  = isDark ? "#0f0f1a" : "#ffffff";
  const text    = isDark ? "#ffffff" : "#0f172a";
  const textSub = isDark ? "rgba(255,255,255,0.5)" : "#6b7280";
  const textFnt = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const border  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const borderF = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  const homeTheme = { ...themes.informatique, accent: ACCENT, navBg: isDark ? "rgba(10,10,15,0.97)" : "rgba(245,247,255,0.97)", navIsDark: isDark };

  return (
    <PageThemeProvider theme={homeTheme}>
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300"
      style={{ background: bg, color: text, fontFamily: "Space Grotesk, sans-serif" }}>
      <Navbar appendRight={<ThemeToggle isDark={isDark} onToggle={toggle} />} />
      <InfoNavbar isDark={isDark} ACCENT={ACCENT} />
      <main className="flex-grow pt-16">

        {/* Hero */}
        <section className="min-h-[90vh] flex items-center border-b relative overflow-hidden"
          style={{ background: bg, borderColor: borderF }}>
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ opacity: isDark ? 0.05 : 0.04 }}>
            {["function buildApp() {", "  const stack = ['React', 'Node', 'Postgres'];", "  return deploy(stack);", "}", "class ApiServer {", "  constructor(port) {", "    this.port = port;", "  }", "  async start() {", "    await listen(this.port);", "  }", "}"].map((line, i) => (
              <div key={i} className="font-mono text-xs whitespace-nowrap absolute" style={{ color: ACCENT, top: `${6 + i * 7}%`, left: `${52 + (i % 3) * 8}%` }}>{line}</div>
            ))}
          </div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl">

              <TechCircuitIcon accent={ACCENT} />

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: text }}>
                Nous construisons
              </motion.h1>
              <div className="text-4xl md:text-6xl font-bold mb-10 h-16 flex items-center">
                <span style={{ color: ACCENT }}>{typed}</span>
                <span className="animate-pulse ml-1" style={{ color: ACCENT }}>|</span>
              </div>
              <div className="border p-6 mb-10 font-mono text-sm max-w-xl" style={{ background: bg2, borderColor: border }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "80" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "50" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "25" }} />
                  <span className="ml-2 text-xs" style={{ color: textSub }}>terminal · TechSolutions</span>
                </div>
                <div style={{ color: ACCENT }}>$ ./start_your_project.sh</div>
                <div className="mt-1" style={{ color: textSub }}>Initializing project scope...</div>
                <div style={{ color: textSub }}>Connecting to TechSolutions team...</div>
                <div className="mt-1" style={{ color: text }}>✓ Ready. Devis gratuit sous 24h.</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold px-8 py-4 text-lg transition-colors"
                  style={{ background: ACCENT, color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? "#4a97bb" : "#001f30")}
                  onMouseLeave={e => (e.currentTarget.style.background = ACCENT)}>
                  {WA_SVG("white")} Demarrer un projet
                </a>
                <a href="#services" className="px-8 py-4 border font-semibold flex items-center gap-2 transition-colors"
                  style={{ borderColor: border, color: text }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  Nos expertises <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-14 pt-8 border-t grid grid-cols-3 gap-8" style={{ borderColor: borderF }}>
                {[["200+", "Projets livres"], ["5 ans", "D'experience"], ["99.9%", "Uptime garanti"]].map(([val, lbl], i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold" style={{ color: ACCENT }}>{val}</div>
                    <div className="text-xs font-mono mt-1" style={{ color: textSub }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 border-t border-b" style={{ background: bg, borderColor: borderF }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// nos_expertises</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Ce que nous construisons</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: border }}>
              {[
                { icon: Monitor, title: "Sites Web", code: "01", desc: "Design moderne, SEO optimise, performance maximale pour tous les navigateurs et tous les appareils." },
                { icon: Smartphone, title: "Applications", code: "02", desc: "iOS, Android et PWA sur mesure. Interfaces fluides et experiences natives de haute qualite." },
                { icon: ShieldCheck, title: "Cybersecurite", code: "03", desc: "Audits de securite, tests de penetration et protection proactive de vos systemes et donnees." },
                { icon: Cloud, title: "Cloud", code: "04", desc: "Architecture, migration et hebergement scalable. Disponibilite 99.9% garantie en permanence." },
                { icon: Database, title: "Data et IA", code: "05", desc: "Analyse de donnees, tableaux de bord intelligents et solutions d'intelligence artificielle." },
                { icon: Code, title: "Dev Sur Mesure", code: "06", desc: "Logiciels metiers, ERP, CRM et outils internes adaptes precisement a vos processus." },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-8 transition-colors group"
                  style={{ background: cardBg }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? "#0f0f1a" : "#f0f4ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = cardBg)}>
                  <div className="flex items-start justify-between mb-6">
                    <s.icon className="w-8 h-8" style={{ color: ACCENT }} />
                    <span className="font-mono text-3xl" style={{ color: textFnt }}>{s.code}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 font-mono" style={{ color: text }}>{"<" + s.title + " />"}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textSub }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section id="stack" className="py-20 border-y" style={{ background: bg2, borderColor: borderF }}>
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// technologies</p>
              <h2 className="text-3xl font-bold" style={{ color: text }}>Notre stack technique</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { icon: Globe, name: "React / Next.js" },
                { icon: Terminal, name: "Node.js / Express" },
                { icon: Database, name: "PostgreSQL / MongoDB" },
                { icon: Cloud, name: "AWS / GCP" },
                { icon: Smartphone, name: "React Native" },
                { icon: Cpu, name: "Python / Django" },
              ].map((tech, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="border p-6 flex flex-col items-center text-center group transition-colors"
                  style={{ background: cardBg, borderColor: border }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + "80")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                  <tech.icon className="w-8 h-8 mb-3" style={{ color: ACCENT }} />
                  <span className="text-xs font-mono" style={{ color: textSub }}>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="equipe" className="py-24" style={{ background: bg }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
              <div className="flex-1 space-y-8">
                <p className="text-xs uppercase tracking-widest font-mono" style={{ color: ACCENT }}>// notre_approche</p>
                <h2 className="text-4xl font-bold leading-tight" style={{ color: text }}>L'equipe derriere le code</h2>
                <p className="leading-relaxed text-lg" style={{ color: textSub }}>
                  Nous ne sommes pas juste des prestataires. Nous sommes de veritables partenaires pour votre croissance technologique. Chaque projet est traite avec rigueur, methodologie et passion.
                </p>
                <div className="space-y-3">
                  {["Devis precis et sans surprise dans les 24h", "Livraison dans les delais convenus", "Code propre, documente et maintenable", "Formation incluse a la livraison", "Support technique post-livraison"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 font-mono text-sm">
                      <span style={{ color: ACCENT }}>✓</span>
                      <span style={{ color: textSub }}>{item}</span>
                    </div>
                  ))}
                </div>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold px-8 py-4 transition-colors"
                  style={{ background: ACCENT, color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? "#4a97bb" : "#001f30")}
                  onMouseLeave={e => (e.currentTarget.style.background = ACCENT)}>
                  {WA_SVG("white")} Discuter de votre projet
                </a>
              </div>
              <div className="flex-1">
                <div className="border overflow-hidden" style={{ background: bg2, borderColor: border }}>
                  <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: isDark ? "#111118" : "#dce4ff", borderColor: border }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "70" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "45" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: ACCENT + "25" }} />
                    <span className="ml-2 text-xs font-mono" style={{ color: textSub }}>project.config.ts</span>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-2">
                    <div><span style={{ color: ACCENT }}>const</span> <span style={{ color: text }}>project</span> <span style={{ color: textSub }}>= {"{"}</span></div>
                    <div className="ml-4"><span style={{ color: textSub }}>name:</span> <span style={{ color: ACCENT }}>"VotreSolution"</span><span style={{ color: textSub }}>,</span></div>
                    <div className="ml-4"><span style={{ color: textSub }}>livraison:</span> <span style={{ color: ACCENT }}>"dans les delais"</span><span style={{ color: textSub }}>,</span></div>
                    <div className="ml-4"><span style={{ color: textSub }}>qualite:</span> <span style={{ color: ACCENT }}>"irreprochable"</span><span style={{ color: textSub }}>,</span></div>
                    <div className="ml-4"><span style={{ color: textSub }}>support:</span> <span style={{ color: ACCENT }}>"24/7"</span><span style={{ color: textSub }}>,</span></div>
                    <div className="ml-4"><span style={{ color: textSub }}>devis:</span> <span style={{ color: ACCENT }}>"gratuit sous 24h"</span></div>
                    <div><span style={{ color: textSub }}>{"}"}</span></div>
                    <div className="mt-4" style={{ color: textSub }}>{"// git commit -m \"Excellence delivered\""}</div>
                    <div className="mt-1" style={{ color: ACCENT }}>$ ./deploy.sh <span className="animate-pulse">_</span></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[{ icon: Wifi, label: "Connexion securisee", val: "SSL / HTTPS" }, { icon: Terminal, label: "Code versionne", val: "Git / CI/CD" }].map((item, i) => (
                    <div key={i} className="border p-4 flex items-center gap-3" style={{ background: bg2, borderColor: border }}>
                      <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} />
                      <div>
                        <div className="text-xs font-mono" style={{ color: textSub }}>{item.label}</div>
                        <div className="text-sm font-bold font-mono" style={{ color: text }}>{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Realisations */}
        <section className="py-24 border-y" style={{ background: bg2, borderColor: borderF }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// realisations</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Projets recents</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { type: "E-commerce", client: "Boutique Mode Lushi", desc: "Boutique en ligne avec paiement mobile money, gestion des stocks et tableau de bord admin.", tags: ["React", "Node.js", "Mobile Money"] },
                { type: "Application mobile", client: "ONG Lumiere Congo", desc: "Application de suivi beneficiaires iOS et Android avec synchronisation hors-ligne.", tags: ["React Native", "Firebase", "GPS"] },
                { type: "ERP interne", client: "Diallo Trading Group", desc: "Logiciel de gestion commerciale sur mesure : stock, facturation, rapports mensuels.", tags: ["Vue.js", "PostgreSQL", "API REST"] },
                { type: "Site institutionnel", client: "Clinique Sante Plus", desc: "Site avec prise de rendez-vous en ligne, fiche medecin et espace patient securise.", tags: ["Next.js", "CMS", "SSL"] },
                { type: "Tableau de bord", client: "Hotel Grand Palace", desc: "Dashboard analytique temps reel : reservations, revenus, taux d'occupation par periode.", tags: ["React", "Charts", "WebSocket"] },
                { type: "API & Backend", client: "Fintech Startup", desc: "API de paiement mobile money avec authentification biometrique et audit de securite.", tags: ["Node.js", "JWT", "Audit Sec."] },
              ].map((proj, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="border p-8 transition-colors"
                  style={{ background: cardBg, borderColor: border }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + "50")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                  <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: ACCENT }}>{proj.type}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: text }}>{proj.client}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: textSub }}>{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-mono px-2 py-1" style={{ background: ACCENT + "15", color: ACCENT, border: `1px solid ${ACCENT}30` }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="projets" className="py-24" style={{ background: bg }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// clients_satisfaits</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Ce que disent nos clients</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="p-8 border transition-colors"
                  style={{ background: cardBg, borderColor: border }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT + "50")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = border)}>
                  <div className="text-lg mb-5 tracking-wider" style={{ color: ACCENT }}>★★★★★</div>
                  <p className="mb-6 leading-relaxed" style={{ color: textSub }}>"{t.text}"</p>
                  <div className="pt-4 border-t" style={{ borderColor: borderF }}>
                    <div className="font-bold font-mono" style={{ color: text }}>{t.name}</div>
                    <div className="text-xs mt-1" style={{ color: textSub }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 border-y" style={{ background: bg2, borderColor: borderF }}>
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// workflow</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Votre projet en 3 etapes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { n: "01", title: "Analyse et Devis", desc: "On ecoute vos besoins, on analyse votre contexte et on vous remet un devis precis et sans surprise dans les 24 heures. Aucun engagement." },
                { n: "02", title: "Developpement Agile", desc: "On construit votre solution en sprints courts avec des livrables a chaque etape. Vous validez en temps reel. Pas de mauvaise surprise a la livraison." },
                { n: "03", title: "Livraison et Support", desc: "Mise en production, formation de votre equipe et support continu. Votre succes apres la livraison est notre engagement a long terme." },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="border-l-4 pl-8" style={{ borderLeftColor: ACCENT }}>
                  <div className="text-5xl font-black mb-4 font-mono" style={{ color: textFnt }}>{step.n}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: text }}>{step.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: textSub }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24" style={{ background: bg }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-14">
              <p className="text-xs uppercase tracking-widest font-mono mb-3" style={{ color: ACCENT }}>// faq</p>
              <h2 className="text-4xl font-bold" style={{ color: text }}>Questions frequentes</h2>
            </div>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <div key={i} className="border overflow-hidden" style={{ background: cardBg, borderColor: border }}>
                  <button className="w-full flex items-center justify-between px-8 py-6 text-left font-bold text-base transition-colors"
                    style={{ color: text }}
                    onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                    onMouseLeave={e => (e.currentTarget.style.color = text)}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-mono text-xs mr-4" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: ACCENT }} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-8 pb-6 leading-relaxed border-t pt-4" style={{ color: textSub, borderColor: borderF }}>{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t text-center" style={{ background: bg2, borderColor: borderF }}>
          <div className="container mx-auto px-4">
            <code className="text-sm font-mono block mb-6" style={{ color: ACCENT }}>$ ./request_quote.sh --free --delay=24h</code>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text }}>Votre prochain projet, c'est maintenant</h2>
            <p className="text-xl mb-10 max-w-xl mx-auto font-mono" style={{ color: textSub }}>Devis gratuit en 24 heures. Pas d'engagement. Juste une conversation.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-black px-10 py-5 text-xl transition-colors"
              style={{ background: ACCENT, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = isDark ? "#4a97bb" : "#001f30")}
              onMouseLeave={e => (e.currentTarget.style.background = ACCENT)}>
              {WA_SVG("white")} Demarrer mon projet
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
