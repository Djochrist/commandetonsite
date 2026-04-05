import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { MapSection } from "@/components/shared/MapSection";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { GraduationCap, BookOpen, Users, Trophy, Award, ChevronDown, Smartphone, ClipboardList, Check, Calculator, FlaskConical, Globe, Music, Dumbbell, Monitor, BookMarked, Pencil, Brain, Landmark, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

const NAVY = "#00509D";
const BLUE = "#00509D";
const GOLD = "#000000";

const WA = "https://wa.me/243819730124";
const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

function useCounter(target: number, duration = 1600, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return val;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, 1400, inView);
  return (
    <div ref={ref} className="text-center py-6">
      <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: BLUE }}>
        {count}{suffix}
      </div>
      <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

const cycles = [
  {
    id: "maternelle",
    label: "Maternelle",
    age: "3 - 5 ans",
    years: "2 ans",
    icon: BookOpen,
    desc: "L'eveil des tout-petits dans un cadre securisant, bienveillant et stimulant. Nos educatrices formees favorisent la socialisation et la decouverte du monde.",
    subjects: [
      "Eveil et Socialisation",
      "Langage et Expression orale",
      "Arts Plastiques et Dessin",
      "Jeux Educatifs et Logique",
      "Musique et Rythme",
      "Preparation a la Lecture",
      "Education Physique Adaptee",
      "Religion et Valeurs",
    ],
    color: "#00509D",
  },
  {
    id: "primaire",
    label: "Primaire",
    age: "6 - 12 ans",
    years: "6 ans",
    icon: Pencil,
    desc: "Construction des bases solides en lecture, ecriture et mathematiques. Un encadrement personnalise pour chaque eleve avec un suivi rigoureux des parents.",
    subjects: [
      "Francais - Lecture et Redaction",
      "Mathematiques",
      "Sciences de la Vie et de la Terre",
      "Histoire et Geographie",
      "Education Civique et Morale",
      "Religion Catholique",
      "Education Physique et Sportive",
      "Initiation a l'Informatique",
    ],
    color: BLUE,
  },
  {
    id: "secondaire",
    label: "Secondaire",
    age: "12 - 18 ans",
    years: "6 ans",
    icon: GraduationCap,
    desc: "Parcours complet vers le Baccalaureat avec 6 options disponibles. Preparation rigoureuse aux examens d'Etat et orientation vers l'universite.",
    subjects: [
      "Francais et Litterature",
      "Mathematiques",
      "Histoire et Geographie",
      "Education Civique",
      "Anglais / Kiswahili",
      "Education Physique",
      "Religion",
      "+ Matieres de l'Option choisie",
    ],
    color: NAVY,
  },
];

const options = [
  {
    code: "SB",
    title: "Sciences Bio-Chimiques",
    icon: FlaskConical,
    desc: "Option scientifique axee sur les sciences de la vie. Ideale pour medecine, pharmacie, agro.",
    matieres: ["Biologie", "Chimie Organique", "Physique", "Sciences Naturelles", "Mathematiques"],
    badge: "Populaire",
  },
  {
    code: "SM",
    title: "Sciences Math-Physique",
    icon: Calculator,
    desc: "Filiere des ingenieurs et mathematiciens. Porte ouverte sur toutes les ecoles techniques.",
    matieres: ["Mathematiques Avancees", "Physique", "Chimie", "Informatique", "Mecanique"],
    badge: "Selectif",
  },
  {
    code: "PG",
    title: "Pedagogie Generale",
    icon: BookMarked,
    desc: "Formation des futurs enseignants. Psychologie, didactique et stages pratiques en ecole.",
    matieres: ["Psychologie de l'Enfant", "Didactique", "Methodologie", "Stage Pedagogique", "Sociologie"],
    badge: null,
  },
  {
    code: "CG",
    title: "Commerciale et Gestion",
    icon: Landmark,
    desc: "Comptabilite, gestion d'entreprise et droit commercial. Vers les ecoles de commerce et la finance.",
    matieres: ["Comptabilite Generale", "Gestion d'Entreprise", "Droit Commercial", "Fiscalite", "Informatique"],
    badge: null,
  },
  {
    code: "TI",
    title: "Technique Informatique",
    icon: Monitor,
    desc: "Programmation, reseaux et systemes. La filiere du numerique et des technologies de demain.",
    matieres: ["Programmation", "Reseaux Informatiques", "Hardware et Maintenance", "Web Design", "Base de Donnees"],
    badge: "Nouveau",
  },
  {
    code: "LP",
    title: "Latin-Philosophie",
    icon: Brain,
    desc: "Culture classique, eloquence et pensee critique. Vers les facultes de droit, lettres et sciences humaines.",
    matieres: ["Latin", "Philosophie", "Grec Ancien", "Litterature Classique", "Rhetorique"],
    badge: null,
  },
];

const clubs = [
  { icon: FlaskConical, name: "Club de Sciences", desc: "Experiences, projets scientifiques et competition nationale." },
  { icon: Calculator,   name: "Club de Maths",    desc: "Olympiades de mathematiques et defis logiques hebdomadaires." },
  { icon: Globe,        name: "Club de Debat",    desc: "Eloquence, argumentation et culture generale en francais." },
  { icon: Music,        name: "Chorale Scolaire", desc: "Chants liturgiques, concerts et festivals culturels." },
  { icon: Dumbbell,     name: "Sports Collectifs",desc: "Football, basketball, volleyball et tournois interecoles." },
  { icon: Monitor,      name: "Club Informatique",desc: "Initiation au code, creation de sites et robotique educative." },
];

const keyDates = [
  { label: "Ouverture des inscriptions",  date: "1er Juillet 2026",     icon: Calendar },
  { label: "Cloture des inscriptions",    date: "31 Aout 2026",         icon: Clock },
  { label: "Rentree scolaire",            date: "8 Septembre 2026",     icon: GraduationCap },
  { label: "Examens de fin de trimestre", date: "Decembre 2026",        icon: BookOpen },
  { label: "Examens d'Etat (Nationale)",  date: "Juin - Juillet 2027",  icon: Trophy },
];

const testimonials = [
  { name: "Jean-Pierre Mukadi",  role: "Pere d'un eleve de Terminale", text: "Mon fils a termine premier de sa classe au baccalaureat. L'encadrement est exceptionnel. Les professeurs sont passionnes et disponibles a tout moment." },
  { name: "Sylvie Tshimanga",   role: "Mere d'une eleve en 4eme",     text: "L'atmosphere ici est uniquement axee sur la reussite. Les cours sont rigoureux, les activites parascolaires enrichissantes. Mes enfants adorent y aller." },
  { name: "Prof. Denis Kasongo", role: "Parent de 3 anciens eleves",   text: "Mes trois enfants ont tous etudie a l'Institut. Ils sont aujourd'hui diplomes de l'universite et employes. Cette ecole forge les leaders de demain." },
];

const faqs = [
  { q: "Quand sont ouvertes les inscriptions ?",         a: "Les inscriptions ouvrent le 1er juillet de chaque annee. Nous recommandons de reserver votre place tot car les classes se remplissent rapidement." },
  { q: "Comment choisir l'option du secondaire ?",       a: "Lors de la visite du campus, notre equipe pedagogique guide les parents et eleves selon les aptitudes, resultats et projets professionnels de l'enfant." },
  { q: "L'ecole propose-t-elle des transports ?",        a: "Oui, un service de transport securise couvre plusieurs quartiers de Lubumbashi. Contactez-nous pour connaitre le trace et les tarifs 2026." },
  { q: "Quel est le taux de reussite aux examens d'Etat ?", a: "Nous affichons 95% de reussite aux examens d'Etat ces 5 dernieres annees, bien au-dessus de la moyenne nationale. Nous sommes fiers de nos eleves." },
  { q: "Y a-t-il un suivi individualise ?",              a: "Chaque eleve beneficie d'un bilan trimestriel avec son enseignant referent. Les parents sont informes en temps reel de la progression de leur enfant." },
  { q: "Quels sont les frais scolaires ?",               a: "Les frais varient selon le cycle et l'option. Contactez-nous via WhatsApp pour recevoir la grille tarifaire complete et les modalites de paiement." },
];

/* ---------- ScrollTo ---------- */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ---------- Sous-navbar Ecole / Fil d'Ariane Academique ---------- */
function EcoleNav() {
  const [active, setActive] = React.useState<string | null>(null);
  const crumbs: [string, string][] = [["Cycles","cycles"],["Options","options"],["Clubs","clubs"],["Inscription","inscription"]];
  const handleClick = (id: string) => { setActive(id); scrollTo(id); };
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center justify-center h-11 gap-1"
      style={{ top: 64, background: "#fff", borderBottom: `2px solid ${NAVY}`, fontFamily: "Montserrat, sans-serif" }}>
      {crumbs.map(([label, id], i) => (
        <React.Fragment key={id}>
          {i > 0 && <svg className="w-3 h-3 flex-shrink-0" style={{ color: NAVY, opacity: 0.35 }} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>}
          <button onClick={() => handleClick(id)}
            className="text-xs font-semibold uppercase tracking-wider px-3 py-1 transition-all duration-200"
            style={{ color: active === id ? "#fff" : NAVY, background: active === id ? NAVY : "transparent", borderRadius: 2 }}>
            {label}
          </button>
        </React.Fragment>
      ))}
      <a href="https://wa.me/243819730124" target="_blank" rel="noopener noreferrer"
        className="absolute right-8 text-xs font-bold uppercase tracking-widest px-4 py-1.5 text-white transition-opacity duration-200 hover:opacity-80"
        style={{ background: NAVY }}>
        Inscrire mon enfant
      </a>
    </nav>
  );
}

export default function Ecole() {
  useSEO({
    title: "Institut et Ecole Lubumbashi | CommandeTonSite",
    description: "Site web pour votre ecole ou institut a Lubumbashi. Programmes, inscriptions et vie scolaire en ligne. Commandez via WhatsApp.",
    path: "/ecole",
    keywords: "ecole Lubumbashi, institut Congo, inscription scolaire RDC, site web ecole Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "School", "name": "Institut Kalimement au Congo", "description": "Institut d'excellence academique a Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/ecole", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });

  const [activeCycle, setActiveCycle] = useState("primaire");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const activeCycleData = cycles.find(c => c.id === activeCycle)!;

  return (
    <PageThemeProvider theme={themes.ecole}>
    <div className="min-h-[100dvh] flex flex-col bg-white text-[#1e293b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />
      <EcoleNav />

      <main className="flex-grow pt-16">

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80)' }}>
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${NAVY}d4 0%, ${NAVY}a8 55%, #00509D88 100%)` }} />
          </div>


          <div className="container mx-auto px-4 z-10 text-center relative">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-white w-full">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-[0.35em] px-5 py-2 rounded-full border border-white/40 bg-white/10 text-white">
                <GraduationCap className="w-4 h-4" />
                Excellence Academique · Lubumbashi, RDC
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-none tracking-tight md:whitespace-nowrap">
                Institut <span className="text-white">Kalimement</span> au Congo
              </h1>
              <div className="w-16 h-[3px] mb-6 mx-auto rounded-full bg-white/60" />
              <p className="text-lg md:text-xl mb-8 text-white/75 leading-relaxed max-w-xl mx-auto">
                Former les leaders de demain avec rigueur, valeurs et passion pedagogique depuis <span className="text-white font-bold">15 ans</span>.
              </p>

              <div className="flex items-center justify-center gap-2 mb-10">
                <span className="text-xl text-white">★★★★★</span>
                <span className="text-white/60 text-sm font-semibold">95% de reussite au Baccalaureat</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 font-black px-10 py-4 text-base transition-all hover:opacity-90 hover:-translate-y-0.5 bg-white"
                  style={{ color: NAVY }}>
                  {WA_SVG} Demander une brochure
                </a>
                <a href="#cycles"
                  className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/60 text-white font-bold hover:bg-white/10 transition-all text-base">
                  Decouvrir nos Programmes
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ANIMEES ── */}
        <section className="py-4 border-b" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCounter value={500} suffix="+" label="Eleves inscrits" />
              <StatCounter value={95}  suffix="%" label="Taux de reussite" />
              <StatCounter value={30}  suffix="+" label="Enseignants qualifies" />
              <StatCounter value={15}  suffix=""  label="Annees d'experience" />
            </div>
          </div>
        </section>

        {/* ── CYCLES SCOLAIRES ── */}
        <section id="cycles" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Parcours Educatif</p>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: NAVY }}>Nos Cycles Scolaires</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full" style={{ backgroundColor: GOLD }} />
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {cycles.map(c => (
                <button key={c.id} onClick={() => setActiveCycle(c.id)}
                  className="px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all"
                  style={activeCycle === c.id
                    ? { backgroundColor: NAVY, color: "white" }
                    : { backgroundColor: '#f1f5f9', color: '#64748b' }}>
                  {c.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeCycle}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${activeCycleData.color}18` }}>
                      <activeCycleData.icon className="w-7 h-7" style={{ color: activeCycleData.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black" style={{ color: NAVY }}>{activeCycleData.label}</h3>
                      <p className="text-sm font-semibold" style={{ color: GOLD }}>{activeCycleData.age} · {activeCycleData.years}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8">{activeCycleData.desc}</p>
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-bold px-8 py-3 text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: NAVY }}>
                    {WA_SVG} Inscrire mon enfant
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BLUE }}>Matieres enseignees</p>
                  <ul className="space-y-2">
                    {activeCycleData.subjects.map((s, i) => (
                      <motion.li key={s} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 p-3 border border-slate-100 bg-slate-50">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-sm" style={{ backgroundColor: `${BLUE}18` }}>
                          <Check className="w-3 h-3" style={{ color: BLUE }} />
                        </div>
                        <span className="text-slate-700 text-sm font-medium">{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── OPTIONS DU SECONDAIRE ── */}
        <section id="options" className="py-24" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Section Secondaire</p>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: NAVY }}>Nos 6 Options</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full mb-6" style={{ backgroundColor: GOLD }} />
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Chaque eleve choisit son option a partir de la 3eme secondaire. Notre equipe pedagogique vous aide a faire le bon choix.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {options.map((opt, i) => (
                <motion.div key={opt.code}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 p-7 relative overflow-hidden">
                  {opt.badge && (
                    <span className="absolute top-4 right-4 text-xs font-black px-2 py-1 uppercase tracking-wider text-white"
                      style={{ backgroundColor: NAVY }}>{opt.badge}</span>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${BLUE}12` }}>
                    <opt.icon className="w-6 h-6" style={{ color: BLUE }} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: NAVY }}>{opt.code}</div>
                  <h3 className="text-base font-black mb-3" style={{ color: NAVY }}>{opt.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-5">{opt.desc}</p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Matieres principales</p>
                    <ul className="space-y-1">
                      {opt.matieres.map(m => (
                        <li key={m} className="flex items-center gap-2 text-xs text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: NAVY }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ backgroundColor: BLUE }} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-black px-10 py-4 text-base text-white transition-all hover:opacity-90"
                style={{ backgroundColor: NAVY }}>
                {WA_SVG} Demander conseil sur l'option
              </a>
            </div>
          </div>
        </section>

        {/* ── CAMPUS ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1">
                <div className="relative overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop"
                    alt="Salle de classe Institut Kalimement" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: `${NAVY}dd` }}>
                    <p className="text-sm font-semibold text-white">"Un cadre propice a l'excellence academique"</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Notre Campus</p>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: NAVY }}>
                  Un Environnement<br />Propice a la Reussite
                </h2>
                <div className="w-12 h-[3px] mb-8 rounded-full" style={{ backgroundColor: GOLD }} />
                <p className="text-slate-600 mb-8 leading-relaxed">Nos salles de classe modernes, notre bibliotheque numerique et nos laboratoires equipes offrent les meilleures conditions d'apprentissage de Lubumbashi.</p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Salles de classe climatisees",
                    "Bibliotheque et ressources numeriques",
                    "Laboratoires de sciences equipes",
                    "Salle informatique avec 40 postes",
                    "Terrain de sport multi-disciplinaire",
                    "Cantine scolaire supervisee",
                    "Securite et gardiennage 24h/24",
                  ].map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-sm" style={{ backgroundColor: `${BLUE}18` }}>
                        <Check className="w-3 h-3" style={{ color: BLUE }} />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-black px-8 py-4 text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: NAVY }}>
                  {WA_SVG} Organiser une visite du campus
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ACTIVITES PARASCOLAIRES ── */}
        <section id="clubs" className="py-24 text-white" style={{ backgroundColor: NAVY }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/70">Vie Scolaire</p>
              <h2 className="text-4xl font-black mb-4">Clubs et Activites</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full mb-4 bg-white/50" />
              <p className="text-white/60 max-w-lg mx-auto text-sm">Au-dela des cours, nos clubs developpent les talents, la creativite et l'esprit d'equipe de chaque eleve.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {clubs.map((club, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/8 transition-all group">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full transition-transform group-hover:scale-110 bg-white/10 border border-white/25">
                    <club.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-base mb-1">{club.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{club.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALENDRIER SCOLAIRE ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Annee Scolaire 2026-2027</p>
              <h2 className="text-4xl font-black mb-4" style={{ color: NAVY }}>Calendrier des Dates Cles</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full" style={{ backgroundColor: GOLD }} />
            </div>
            <div className="space-y-4">
              {keyDates.map((d, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-5 border border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BLUE}12` }}>
                    <d.icon className="w-6 h-6" style={{ color: BLUE }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-sm" style={{ color: NAVY }}>{d.label}</div>
                  </div>
                  <div className="text-sm font-bold px-3 py-1 text-white" style={{ backgroundColor: NAVY }}>{d.date}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEMOIGNAGES ── */}
        <section className="py-24" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Temoignages</p>
              <h2 className="text-4xl font-black mb-4" style={{ color: NAVY }}>Ce que Disent les Parents</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full" style={{ backgroundColor: GOLD }} />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white border border-slate-200 p-8 hover:shadow-lg transition-all">
                  <div className="text-lg mb-4" style={{ color: NAVY }}>★★★★★</div>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm italic">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                    <div className="w-10 h-10 flex items-center justify-center text-xs font-black flex-shrink-0 text-white"
                      style={{ backgroundColor: NAVY }}>
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-black text-sm" style={{ color: NAVY }}>{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INSCRIPTION ── */}
        <section id="inscription" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Inscription</p>
              <h2 className="text-4xl font-black mb-4" style={{ color: NAVY }}>Comment Inscrire votre Enfant</h2>
              <div className="w-14 h-[3px] mx-auto rounded-full" style={{ backgroundColor: GOLD }} />
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {[
                { n: "01", Icon: Smartphone,    title: "Contactez-nous",           desc: "Envoyez un message WhatsApp ou appelez notre secretariat. Nous repondons sous 24h et repondons a toutes vos questions." },
                { n: "02", Icon: GraduationCap, title: "Visitez le Campus",        desc: "Decouvrez nos installations, rencontrez les enseignants et posez vos questions lors d'une visite guidee gratuite." },
                { n: "03", Icon: ClipboardList, title: "Confirmez l'Inscription",  desc: "Completez le dossier d'inscription et reservez la place de votre enfant pour la prochaine annee scolaire." },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-6 border-l-2" style={{ borderColor: `${BLUE}30` }}>
                  <div className="text-5xl font-black mb-4 leading-none" style={{ color: `${BLUE}18` }}>{step.n}</div>
                  <step.Icon className="w-7 h-7 mb-3" style={{ color: BLUE }} />
                  <h3 className="text-lg font-black mb-3" style={{ color: NAVY }}>{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
              <h2 className="text-4xl font-black" style={{ color: NAVY }}>Questions Frequentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors">
                  <button className="w-full flex items-center justify-between px-7 py-5 text-left font-bold text-sm text-slate-800 hover:text-blue-700 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: BLUE }} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-7 pb-6 text-slate-500 leading-relaxed text-sm border-t border-slate-100 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-24 text-white text-center" style={{ backgroundColor: NAVY }}>
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-white/15 border-2 border-white/40">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Inscriptions Ouvertes</h2>
              <div className="w-14 h-[3px] mx-auto mb-8 rounded-full bg-white/50" />
              <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
                Assurez l'avenir de votre enfant des aujourd'hui. Les places sont limitees et se remplissent vite chaque annee.
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-black px-12 py-5 text-lg transition-all hover:opacity-90 hover:-translate-y-0.5 bg-white"
                style={{ color: NAVY }}>
                {WA_SVG} Inscrire mon enfant maintenant
              </a>
              <p className="mt-6 text-xs text-white/40 uppercase tracking-widest">Places limitees · Premiere venue, premiere servie</p>
            </motion.div>
          </div>
        </section>

        <MapSection title="Notre Campus" subtitle="Un environnement securise et stimulant pour vos enfants." />
        <OrderWebsiteSection />
      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
