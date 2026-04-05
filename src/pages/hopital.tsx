import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { HeartPulse, Stethoscope, Baby, Activity, Clock, Calendar, ShieldCheck, ChevronDown, MapPin, Phone, Pill, Smartphone } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

const WHATSAPP = "https://wa.me/243819730124";
const MBLUE = "#0284c7";
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
const WA_SVG = <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current"><path d={WA_PATH} /></svg>;

/* ══ Animated ECG — dessin continu ══ */
function HeartbeatLine({ color = "white", width = 320, className = "" }: { color?: string; width?: number; className?: string }) {
  const pts = "0,25 30,25 48,25 58,4 67,46 76,25 95,25 110,25 120,2 130,48 140,25 160,25 320,25";
  return (
    <svg viewBox="0 0 320 50" className={className} style={{ width, height: 42 }} fill="none">
      <motion.polyline points={pts} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0.4, 1, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", times: [0, 0.6, 0.8, 1] }} />
    </svg>
  );
}

/* ══ HUD corner brackets — coins de cadrage futuristes ══ */
function HudBrackets({ color = "#0284c7", size = 14, thick = 1.5 }: { color?: string; size?: number; thick?: number }) {
  const s = size;
  const t = thick;
  return (
    <>
      {/* top-left */}
      <svg className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <path d={`M0 ${s} L0 0 L${s} 0`} fill="none" stroke={color} strokeWidth={t} />
      </svg>
      {/* top-right */}
      <svg className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <path d={`M0 0 L${s} 0 L${s} ${s}`} fill="none" stroke={color} strokeWidth={t} />
      </svg>
      {/* bottom-left */}
      <svg className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <path d={`M0 0 L0 ${s} L${s} ${s}`} fill="none" stroke={color} strokeWidth={t} />
      </svg>
      {/* bottom-right */}
      <svg className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <path d={`M${s} 0 L${s} ${s} L0 ${s}`} fill="none" stroke={color} strokeWidth={t} />
      </svg>
    </>
  );
}

/* ══ Animated counter ══ */
function CountUp({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step); else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══ Radar Pulse — cercles concentriques pulsants ══ */
function RadarPulse({ size = 80, color = MBLUE }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="absolute pointer-events-none">
      {[32, 24, 14].map((r, i) => (
        <motion.circle key={i} cx="40" cy="40" r={r} stroke={color} strokeWidth="0.7" fill="none"
          animate={{ opacity: [0.5, 0.1, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} />
      ))}
      <circle cx="40" cy="40" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

/* ══ Data stream divider ══ */
function DataDivider({ dark = false }: { dark?: boolean }) {
  const base = dark ? "rgba(255,255,255," : "rgba(0,0,0,";
  return (
    <div className="flex items-center gap-3 my-6 select-none">
      <div className="flex-1 h-px" style={{ background: `${base}0.08)` }} />
      <div className="flex gap-1.5">
        {[1, 0.5, 0.25].map((op, i) => (
          <motion.div key={i} className="w-1 h-1 rounded-full"
            style={{ background: dark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})` }}
            animate={{ opacity: [op, op * 0.3, op] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
      <div className="flex-1 h-px" style={{ background: `${base}0.08)` }} />
    </div>
  );
}

const testimonials = [
  { name: "Patrick Lubaba", role: "Patient opere", text: "Apres une intervention chirurgicale urgente, je ne peux que remercier toute l'equipe medicale. Professionnalisme, rapidite et bienveillance. Cette clinique sauve des vies." },
  { name: "Marie-Claire Wa", role: "Mere de famille", text: "Mes enfants sont suivis ici depuis leur naissance. Les pediatres sont attentionnes, les locaux impeccables et les rendez-vous toujours ponctuels. Une reference a Lubumbashi." },
  { name: "Dr. Miriam Kabila", role: "Medecin generaliste", text: "En tant que medecin, je recommande la Clinique Sante Plus a mes propres patients. Les equipements sont modernes et l'equipe est d'une competence irreprochable." },
];

const faqs = [
  { q: "Prenez-vous les urgences la nuit ?", a: "Oui, notre service des urgences fonctionne 24h/24 et 7j/7 avec une equipe medicale toujours disponible dans tous nos sites." },
  { q: "Puis-je prendre rendez-vous via WhatsApp ?", a: "Absolument. Envoyez simplement un message sur notre WhatsApp et notre secretariat vous confirme votre rendez-vous dans la demi-heure." },
  { q: "Proposez-vous des consultations a domicile ?", a: "Oui, pour certains patients et sur prescription, nos medecins se deplacent a domicile sur Lubumbashi et ses environs." },
  { q: "Vos pharmacies sont-elles ouvertes le weekend ?", a: "Oui, nos pharmacies sont ouvertes du lundi au samedi de 07h a 20h, et le dimanche de 08h a 15h. Le site Golf dispose d'une pharmacie de nuit." },
  { q: "Y a-t-il un parking a la clinique ?", a: "Oui, un parking securise et gratuit est disponible pour tous nos patients et visiteurs sur chacun de nos sites." },
];

const addresses = [
  { name: "Site Kapenda",  desc: "Siege principal · Medecine generale, Chirurgie, Maternite",               hours: "Lun-Sam 07h-20h",  pharmacie: true  },
  { name: "Site Golf",    desc: "Specialites · Cardiologie, Neurologie, Imagerie IRM/Scanner",             hours: "Lun-Ven 08h-18h",  pharmacie: true  },
  { name: "Site Kassapa", desc: "Pediatrie et Maternite · Bloc operatoire dedie enfants",                  hours: "Lun-Sam 08h-18h",  pharmacie: false },
  { name: "Site Bel Air", desc: "Consultations generales et soins ambulatoires",                           hours: "Lun-Ven 08h-17h",  pharmacie: false },
  { name: "Site Allilac", desc: "Urgences 24h/7j · Reanimation · Soins intensifs",                        hours: "24h/24 et 7j/7",   pharmacie: true  },
  { name: "Site Sandoa",  desc: "Antenne regionale · Consultations generales et maternite de proximite",   hours: "Lun-Sam 08h-17h",  pharmacie: false },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 132, behavior: "smooth" });
};

/* ══ Sous-navbar ══ */
function HopitalNav() {
  const [active, setActive] = React.useState("");
  const [blink, setBlink] = React.useState(true);
  useEffect(() => { const t = setInterval(() => setBlink(b => !b), 900); return () => clearInterval(t); }, []);
  const links: [string, string][] = [["Specialites","specialites"],["Urgences","urgences"],["Pharmacie","pharmacie"],["Equipement","equipement"]];
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center px-8 h-13 bg-white"
      style={{ top: 64, borderBottom: `2px solid ${MBLUE}`, fontFamily: "Lato, sans-serif" }}>
      {/* Logo HUD */}
      <div className="flex items-center gap-2.5 mr-10">
        <div className="relative">
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
            <rect x="8" y="2" width="4" height="16" rx="1" fill={MBLUE} />
            <rect x="2" y="8" width="16" height="4" rx="1" fill={MBLUE} />
          </svg>
          {/* Pulsing dot */}
          <motion.div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
            style={{ background: MBLUE }}
            animate={{ opacity: blink ? 1 : 0.2 }}
            transition={{ duration: 0.15 }} />
        </div>
        <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#111" }}>Hopital</span>
        <span className="text-[10px] font-mono tracking-wider opacity-40" style={{ color: "#111" }}>SYS.ACTIF</span>
      </div>

      <div className="flex items-stretch h-full gap-1">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => { scrollTo(id); setActive(id); }}
            className="px-5 text-sm font-bold uppercase tracking-wider border-b-2 -mb-[2px] transition-all duration-200"
            style={{ borderBottomColor: active === id ? MBLUE : "transparent", color: active === id ? MBLUE : "#666" }}
            onMouseEnter={e => { if (active !== id) { e.currentTarget.style.borderBottomColor = MBLUE + "55"; e.currentTarget.style.color = MBLUE; } }}
            onMouseLeave={e => { if (active !== id) { e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.color = "#666"; } }}>
            {label}
          </button>
        ))}
      </div>

      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="ml-auto text-sm font-bold text-white px-5 py-2 uppercase tracking-wider transition-colors duration-200"
        style={{ background: MBLUE }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#0369a1"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = MBLUE}>
        Prendre RDV
      </a>
    </nav>
  );
}

/* ══ MAIN ══ */
export default function Hopital() {
  useSEO({
    title: "Clinique et Hopital Lubumbashi | CommandeTonSite",
    description: "Site web medical pour votre clinique a Lubumbashi. Medecins, services et horaires de consultation en ligne.",
    path: "/hopital",
    keywords: "clinique Lubumbashi, hopital Congo, medecin Lubumbashi, site web medical RDC",
    structuredData: { "@context": "https://schema.org", "@type": "MedicalClinic", name: "Clinique Sante Plus Lubumbashi", url: "https://commandetonsite.vercel.app/hopital" },
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageThemeProvider theme={themes.hopital}>
    <style>{`
      @keyframes scan-down {
        0%   { transform: translateY(-100%); opacity: 0; }
        10%  { opacity: 0.6; }
        90%  { opacity: 0.6; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
      .scan-down { animation: scan-down 5s ease-in-out infinite; }

      @keyframes hud-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.15; } }
      .hud-blink { animation: hud-blink 1.4s ease-in-out infinite; }

      @keyframes data-flow {
        0%   { background-position: 0 0; }
        100% { background-position: 0 60px; }
      }
      .grid-bg {
        background-image:
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 40px 40px;
        animation: data-flow 8s linear infinite;
      }
      .grid-bg-light {
        background-image:
          linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
        background-size: 40px 40px;
      }
      @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 0 0 transparent; } 50% { box-shadow: 0 0 18px 2px rgba(2,132,199,0.28); } }
      .glow-pulse { animation: glow-pulse 2.5s ease-in-out infinite; }
    `}</style>

    <div className="min-h-[100dvh] flex flex-col bg-white text-[#111]" style={{ fontFamily: "Lato, sans-serif" }}>
      <Navbar />
      <HopitalNav />
      <main className="flex-grow">

        {/* ══════ HERO — HUD futuriste ══════ */}
        <section className="relative min-h-[90vh] flex items-center pt-16 bg-[#111] text-white overflow-hidden">

          {/* Grid background animé */}
          <div className="absolute inset-0 grid-bg pointer-events-none z-0" />

          {/* Scan line sweeping down */}
          <div className="scan-down absolute inset-x-0 top-0 h-32 pointer-events-none z-0"
            style={{ background: `linear-gradient(to bottom, transparent, ${MBLUE}18, transparent)` }} />

          {/* Photo latérale */}
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden z-0">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop" alt="Medecins"
              className="w-full h-full object-cover opacity-20" />
            {/* Overlay HUD sur la photo */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, #111 0%, transparent 35%)" }} />
            {/* Lignes horizontales HUD */}
            {[15, 35, 55, 75, 90].map((top, i) => (
              <motion.div key={i} className="absolute left-0 right-0 h-px"
                style={{ top: `${top}%`, background: "rgba(2,132,199,0.12)" }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }} />
            ))}
          </div>

          {/* Corner brackets — top-left hero */}
          <svg className="absolute top-6 left-6 z-10 opacity-40" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M0 24 L0 0 L24 0" stroke={MBLUE} strokeWidth="2" />
          </svg>
          <svg className="absolute top-6 right-6 z-10 opacity-40" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M0 0 L24 0 L24 24" stroke={MBLUE} strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-6 left-6 z-10 opacity-40" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M0 0 L0 24 L24 24" stroke={MBLUE} strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-6 right-6 z-10 opacity-40" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M24 0 L24 24 L0 24" stroke={MBLUE} strokeWidth="2" />
          </svg>

          <div className="container mx-auto px-4 z-10 relative py-20">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="max-w-2xl">

              {/* HUD label */}
              <div className="flex items-center gap-3 mb-8">
                <motion.div className="w-2 h-2 rounded-full" style={{ background: MBLUE }}
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>
                  Hopital Transcendance de Dieu
                </span>
                <div className="flex-1 h-px" style={{ background: `${MBLUE}30` }} />
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Votre <span className="underline decoration-white/30 underline-offset-4">Sante</span>,<br />Notre Engagement
              </h1>

              {/* ECG animé */}
              <div className="mb-6">
                <HeartbeatLine color="white" width={280} />
              </div>

              <p className="text-xl text-white/65 mb-10 leading-relaxed max-w-xl">
                Des soins d'excellence pour vous et toute votre famille. Une equipe medicale devouee, 6 sites a Lubumbashi et Sandoa, des equipements de derniere generation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-[#111] font-black px-8 py-4 text-lg hover:bg-white/90 transition-colors">
                  {WA_SVG} Prendre rendez-vous
                </a>
                <a href="#urgences" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all"
                  onClick={e => { e.preventDefault(); scrollTo("urgences"); }}>
                  <Activity className="w-5 h-5" /> Urgences 24h/7j
                </a>
              </div>

              {/* Stats HUD */}
              <div className="flex gap-8">
                {[
                  { val: 15000, suf: "+", lbl: "Patients soignes" },
                  { val: 45, suf: "+", lbl: "Medecins specialistes" },
                  { val: 6, suf: "", lbl: "Sites actifs" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white font-mono">
                      <CountUp target={s.val} suffix={s.suf} />
                    </div>
                    <div className="text-[10px] text-white/45 font-semibold uppercase tracking-wider">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* ══════ STATS BAR ══════ */}
        <section className="py-10 bg-white border-y border-gray-100 grid-bg-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: 20, suf: "+", lbl: "Annees d'experience" },
                { val: 8, suf: "", lbl: "Salles d'operation" },
                { val: null, raw: "24h/7j", lbl: "Service urgences" },
                { val: 6, suf: "", lbl: "Sites actifs" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="text-3xl md:text-4xl font-black mb-1 text-[#111] font-mono">
                    {s.val !== null ? <CountUp target={s.val!} suffix={s.suf ?? ""} /> : s.raw}
                  </div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{s.lbl}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ POLES D'EXCELLENCE ══════ */}
        <section id="specialites" className="py-24 bg-[#f8f8f8] grid-bg-light">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: `${MBLUE}50` }} />
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>MODULE.SPECIALITES</span>
                <div className="h-px w-12" style={{ background: `${MBLUE}50` }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111] mb-4">Poles d'Excellence</h2>
              <p className="text-lg text-gray-500">Une prise en charge globale par des specialistes reconnus en RDC.</p>
            </div>
            <DataDivider />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                { icon: Stethoscope, title: "Medecine Generale", desc: "Consultations preventives et curatives, bilans de sante complets pour toute la famille." },
                { icon: Baby,        title: "Pediatrie",         desc: "Suivi du developpement de l'enfant, vaccinations et prise en charge des urgences pediatriques." },
                { icon: HeartPulse, title: "Cardiologie",        desc: "Depistage, diagnostic et traitement des maladies cardiovasculaires avec materiel de pointe." },
                { icon: Activity,   title: "Chirurgie",          desc: "Bloc operatoire moderne, chirurgie ambulatoire et suivi post-operatoire rigoureux." },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 group relative overflow-hidden shadow-sm">
                  <HudBrackets color={MBLUE} size={16} thick={1.5} />
                  {/* Glow line on top */}
                  <motion.div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(to right, transparent, ${MBLUE}, transparent)` }} />
                  <div className="w-14 h-14 bg-[#111] flex items-center justify-center mb-6 group-hover:bg-black transition-colors glow-pulse">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111] mb-3">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ TOUTES LES SPECIALITES ══════ */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-[#111] mb-2">Toutes nos Specialites</h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-px flex-1 max-w-[120px]" style={{ background: `${MBLUE}40` }} />
                <span className="text-[10px] font-mono text-gray-400 tracking-widest">12 DISCIPLINES</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Ophtalmologie", "Orthophedie", "Gynecologie-Obstetrique", "Neurologie", "Oncologie", "Dermatologie", "Urologie", "ORL · Oto-rhino", "Radiologie", "Laboratoire 24h", "Kinesitherapie", "Psychologie"].map((spec, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 py-4 border-b border-gray-100 group cursor-default">
                  <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 group-hover:bg-[#0284c7]"
                    style={{ background: "#111" }} />
                  <span className="text-sm font-semibold text-[#111] group-hover:translate-x-1 transition-transform duration-200">{spec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ NOS 6 SITES ══════ */}
        <section className="py-24 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          {/* Radar en arrière-plan */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
            <RadarPulse size={280} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <motion.div className="w-2 h-2 rounded-full" style={{ background: MBLUE }}
                  animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>6 NŒUDS ACTIFS</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-3">Nos 6 Sites</h2>
              <p className="text-white/45">Proche de vous, partout dans la ville.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {addresses.map((addr, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="border border-white/10 p-8 hover:border-white/25 transition-all duration-300 group relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(2,132,199,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
                  <HudBrackets color={MBLUE} size={16} thick={1} />
                  {/* Site index */}
                  <div className="absolute top-3 right-4 text-xs font-mono opacity-20 text-white">
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: MBLUE }} />
                      <h3 className="text-lg font-black text-white">{addr.name}</h3>
                    </div>
                    {addr.pharmacie && (
                      <span className="flex items-center gap-1 text-xs bg-white text-[#111] font-bold px-2 py-1">
                        <Pill className="w-3 h-3" /> Pharmacie
                      </span>
                    )}
                  </div>
                  <p className="text-white/55 text-sm mb-4 leading-relaxed">{addr.desc}</p>
                  <div className="space-y-2 pt-4 border-t border-white/08">
                    <div className="flex items-center gap-2 text-white/45 text-sm font-mono">
                      <Clock className="w-4 h-4" style={{ color: MBLUE }} /> {addr.hours}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#111] font-black px-10 py-4 text-lg hover:bg-white/90 transition-colors">
                {WA_SVG} Prendre rendez-vous dans votre site
              </a>
            </div>
          </div>
        </section>


        {/* ══════ PHARMACIES ══════ */}
        <section id="pharmacie" className="py-20 bg-[#f8f8f8] grid-bg-light">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <Pill className="w-8 h-8 text-[#111]" />
                  <h2 className="text-4xl font-black text-[#111]">Nos Pharmacies</h2>
                </div>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                  Chaque site dispose de sa propre pharmacie integree. Medicaments de marque et generiques, materiel medical et parapharmacie disponibles sur place.
                </p>
                <div className="space-y-3 mb-8">
                  {["Medicaments sur ordonnance et sans ordonnance", "Produits de soins et parapharmacie", "Materiel medical : tensions, glucometres, etc.", "Pharmacie de nuit disponible au site Golf et Allilac", "Livraison de medicaments a domicile sur demande"].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 group">
                      <div className="w-5 h-5 bg-[#111] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0284c7] transition-colors duration-300 relative overflow-hidden">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <rect x="3.5" y="0" width="3" height="10" rx="0.5" fill="white" />
                          <rect x="0" y="3.5" width="10" height="3" rx="0.5" fill="white" />
                        </svg>
                      </div>
                      <span className="text-[#111] font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop" alt="Pharmacie"
                    className="w-full shadow-2xl" loading="lazy" />
                  {/* HUD overlay sur l'image */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-60">
                      <path d="M0 18 L0 0 L18 0" stroke={MBLUE} strokeWidth="2" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-60">
                      <path d="M0 0 L18 0 L18 18" stroke={MBLUE} strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-60">
                      <path d="M0 0 L0 18 L18 18" stroke={MBLUE} strokeWidth="2" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-60">
                      <path d="M18 0 L18 18 L0 18" stroke={MBLUE} strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ══════ EQUIPEMENT ══════ */}
        <section id="equipement" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 relative">
                <img src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&auto=format&fit=crop" alt="Equipement medical"
                  className="w-full shadow-2xl" loading="lazy" />
                <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-50"><path d="M0 18 L0 0 L18 0" stroke={MBLUE} strokeWidth="2" /></svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-50"><path d="M0 0 L18 0 L18 18" stroke={MBLUE} strokeWidth="2" /></svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-50"><path d="M0 0 L0 18 L18 18" stroke={MBLUE} strokeWidth="2" /></svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-50"><path d="M18 0 L18 18 L0 18" stroke={MBLUE} strokeWidth="2" /></svg>
                </div>
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10" style={{ background: `${MBLUE}50` }} />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>TECH.MEDICALE</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#111] mb-6 leading-tight">
                  Technologie medicale<br />de derniere generation
                </h2>
                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                  Nous investissons continuellement pour garantir des diagnostics precis et des traitements efficaces. IRM, laboratoire 24h/7j, pharmacie interne : tout sur place.
                </p>
                <div className="space-y-4 mb-10">
                  {["Imagerie medicale (IRM, Scanner, Echographie)", "Laboratoire d'analyses ouvert 24h/7j", "Blocs operatoires equipes de derniere generation", "Chambres individuelles climatisees avec Wi-Fi", "Ambulances medicalisees disponibles 24h/7j"].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 group">
                      <ShieldCheck className="w-5 h-5 flex-shrink-0 transition-colors duration-200 group-hover:text-[#0284c7]" style={{ color: "#111" }} />
                      <span className="text-[#111] font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#111] hover:bg-black text-white font-black px-8 py-4 transition-all glow-pulse">
                  {WA_SVG} Consulter un specialiste
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ══════ TEMOIGNAGES ══════ */}
        <section className="py-24 bg-[#f8f8f8] grid-bg-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: `${MBLUE}40` }} />
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>RETOURS.PATIENTS</span>
                <div className="h-px w-12" style={{ background: `${MBLUE}40` }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111] mb-4">Ce que disent nos patients</h2>
              <div className="w-20 h-1 bg-[#111] mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="bg-white p-8 border border-gray-100 shadow-sm group relative overflow-hidden">
                  <HudBrackets color={MBLUE} size={14} thick={1.5} />
                  <div className="text-gray-400 text-xl mb-5 tracking-wider">★★★★★</div>
                  <p className="text-gray-500 mb-6 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-[#111] flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-[#111]">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ PROCESS ══════ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#111] mb-4">Consulter en 3 etapes</h2>
              <p className="text-lg text-gray-500">Rapide, simple et sans stress.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-0 max-w-4xl mx-auto relative">
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px"
                style={{ background: `linear-gradient(to right, transparent, ${MBLUE}40, ${MBLUE}40, transparent)` }} />
              {[
                { n: "01", Icon: Smartphone,  title: "Contactez-nous",       desc: "Envoyez un message WhatsApp ou appelez le site le plus proche. Notre secretariat vous repond en moins de 30 minutes." },
                { n: "02", Icon: Stethoscope, title: "Consultez le specialiste", desc: "Rencontrez notre medecin dedie dans un cadre calme et bienveillant. Diagnostic precis, ecoute attentive." },
                { n: "03", Icon: Pill,        title: "Recevez vos soins",     desc: "Traitement, analyses, ordonnance et pharmacie : tout est gere sur place pour votre confort." },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="text-center px-8 pb-8 group relative">
                  <div className="w-20 h-20 bg-[#111] text-white flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-black transition-colors glow-pulse">
                    <step.Icon className="w-8 h-8" />
                  </div>
                  <div className="text-xs font-mono text-gray-400 tracking-widest mb-3">ETAPE {step.n}</div>
                  <h3 className="text-2xl font-black text-[#111] mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ HORAIRES & CTA ══════ */}
        <section id="urgences" className="py-20 bg-[#111] text-white relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8" style={{ color: MBLUE }} />
                  <h3 className="text-3xl font-black">Horaires de Consultation</h3>
                </div>
                <ul className="space-y-3 text-lg">
                  {[["Lun - Ven", "08:00 — 18:00"], ["Samedi", "08:00 — 13:00"], ["Urgences (Allilac & Kapenda)", "24h/24 · 7j/7"]].map(([day, hrs], i) => (
                    <li key={i} className="flex justify-between border-b border-white/10 pb-3">
                      <span className={i === 2 ? "text-white font-bold flex items-center gap-2" : "text-white/55 font-medium"}>
                        {i === 2 && <motion.div className="w-2 h-2 rounded-full" style={{ background: MBLUE }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />}
                        {day}
                      </span>
                      <span className={`font-mono ${i === 2 ? "text-white font-bold" : "text-white/75 font-semibold"}`}>{hrs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 bg-white text-[#111] p-10 text-center shadow-2xl relative overflow-hidden">
                {/* HUD corner brackets on the card */}
                <svg className="absolute top-3 left-3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 16 L0 0 L16 0" stroke={MBLUE} strokeWidth="1.5" /></svg>
                <svg className="absolute top-3 right-3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0 L16 0 L16 16" stroke={MBLUE} strokeWidth="1.5" /></svg>
                <svg className="absolute bottom-3 left-3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 0 L0 16 L16 16" stroke={MBLUE} strokeWidth="1.5" /></svg>
                <svg className="absolute bottom-3 right-3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 0 L16 16 L0 16" stroke={MBLUE} strokeWidth="1.5" /></svg>
                <Calendar className="w-14 h-14 text-[#111] mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-3">Prenez rendez-vous maintenant</h3>
                <p className="text-gray-500 mb-8 text-sm">Reponse garantie sous 30 minutes. Nos secretaires sont disponibles tous les jours.</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#111] hover:bg-black text-white font-black px-8 py-4 transition-colors">
                  {WA_SVG} Ecrire sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ══════ FAQ ══════ */}
        <section className="py-24 bg-[#f8f8f8] grid-bg-light">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: `${MBLUE}40` }} />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: MBLUE }}>FAQ.BASE</span>
                <div className="h-px w-10" style={{ background: `${MBLUE}40` }} />
              </div>
              <h2 className="text-4xl font-black text-[#111] mb-4">Questions Frequentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-100 overflow-hidden shadow-sm relative group">
                  <motion.div className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: MBLUE }} />
                  <button className="w-full flex items-center justify-between px-8 py-6 text-left font-bold text-lg text-[#111]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#111] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-8 pb-6 text-gray-500 leading-relaxed text-sm font-mono">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════ FINAL CTA ══════ */}
        <section className="py-20 bg-[#111] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          {/* Scan line */}
          <div className="scan-down absolute inset-x-0 top-0 h-20 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${MBLUE}15, transparent)` }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-4 flex justify-center">
              <HeartbeatLine color="white" width={200} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 mt-4">Votre sante ne peut pas attendre</h2>
            <p className="text-xl text-white/45 mb-10 max-w-2xl mx-auto">
              Ne reportez pas votre consultation. Notre equipe est prete a vous recevoir dans l'un de nos 6 sites aujourd'hui.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#111] font-black px-10 py-5 text-xl hover:bg-white/90 transition-colors">
              {WA_SVG} Je prends rendez-vous maintenant
            </a>
            <p className="mt-6 text-sm text-white/35 font-mono">
              REPONSE &lt; 30 MIN · URGENCES 24H/7J · 6 SITES ACTIFS
            </p>
          </div>
        </section>

        <OrderWebsiteSection />
      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
