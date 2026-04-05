import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

const WHATSAPP = "https://wa.me/243819730124";
const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const testimonials = [
  { name: "Amani Kasongo", role: "Client régulier depuis 5 ans", text: "Un repas ici, c'est un voyage au Congo dans l'assiette. La cuisine du chef est authentique, généreuse et pleine de saveurs que l'on ne trouve nulle part ailleurs à Lubumbashi." },
  { name: "Jean-Baptiste Nkosi", role: "Homme d'affaires", text: "Je reçois mes clients importants uniquement ici. Cadre élégant, service impeccable et cuisine qui impressionne à chaque fois. Un vrai bijou de la gastronomie congolaise." },
  { name: "Fatou Mbeki", role: "En famille", text: "Nous y fêtons tous nos anniversaires depuis 4 ans. Le personnel est adorable, les enfants sont bien accueillis et les portions sont généreuses. Une adresse que j'adore." },
];

const faqs = [
  { q: "Faut-il réserver à l'avance ?", a: "Pour les groupes de 6 personnes et plus, une réservation est recommandée. Pour les tables individuelles, appelez-nous le jour même via WhatsApp." },
  { q: "Livrez-vous à domicile ?", a: "Oui, nous livrons dans un rayon de 15 km autour de chaque restaurant. Passez commande via WhatsApp et recevez vos plats en moins d'une heure." },
  { q: "Proposez-vous des plats végétariens ?", a: "Oui, nous avons une sélection de plats végétariens savoureux inspirés de la cuisine congolaise traditionnelle." },
];

const addresses = [
  { name: "Saveurs du Congo · Centre", zone: "Avenue Lumumba, Centre-ville", hours: "Mar–Dim : 11h–23h", note: "Terrasse & Salle privée" },
  { name: "Saveurs du Congo · Golf", zone: "Quartier Golf, Résidence Les Collines", hours: "Tous les jours : 10h–22h", note: "Vue panoramique" },
  { name: "Saveurs du Congo · Kampemba", zone: "Avenue Sendwe, Quartier Kampemba", hours: "Lun–Sam : 11h–21h30", note: "Livraison 24 km" },
];

const menu = [
  { cat: "Entrées", items: [["Salade d'avocat au makayabu fumé", "$12"], ["Brochettes de chèvre épicées sauce citron", "$15"], ["Beignets de crevettes royales grillées", "$14"], ["Soupe de moambe traditionnelle", "$10"], ["Tartare de capitaine aux herbes locales", "$18"], ["Plantains frits sauce piment rouge", "$8"]] },
  { cat: "Plats Principaux", items: [["Poulet Mayo Traditionnel sauce oignons", "$28"], ["Liboke de Poisson Capitaine au four", "$35"], ["Pondu au Poisson Fumé et aubergines", "$24"], ["Côte de bœuf grillée sauce moambe", "$42"], ["Chikwanga farcis aux légumes verts", "$20"], ["Crevettes géantes flambéées", "$38"], ["Tilapia entier braisé aux épices du Katanga", "$30"]] },
  { cat: "Viandes & Grillades", items: [["Brochettes mixtes bœuf-chèvre", "$26"], ["Côte d'agneau grillée aux herbes", "$36"], ["Entrecôte de bœuf local 250g", "$32"], ["Poulet fermier entier rôti", "$30"], ["Foie de veau sauce moutarde", "$22"]] },
  { cat: "Desserts", items: [["Coupe exotique mangue-passion", "$10"], ["Moelleux chocolat noir fondant", "$12"], ["Beignets soufflés au miel local", "$9"], ["Glace artisanale safou-vanille", "$8"], ["Ananas rôtis caramélisés", "$10"]] },
  { cat: "Boissons", items: [["Jus de bissap frais", "$5"], ["Jus de fruit de la passion maison", "$5"], ["Eau minérale petite / grande", "$2 / $4"], ["Sodas et limonades", "$3"], ["Eau de coco naturelle", "$6"]] },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ─── SVG Icons ─── */
const IconChefHat = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M14 28 Q10 26 10 20 A8 8 0 0 1 24 14 A8 8 0 0 1 38 20 Q38 26 34 28" />
    <rect x="14" y="28" width="20" height="10" rx="1" />
    <line x1="14" y1="35" x2="34" y2="35" />
    <line x1="20" y1="28" x2="20" y2="38" />
    <line x1="28" y1="28" x2="28" y2="38" />
  </svg>
);
const IconQuote = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M8 30 Q8 20 18 20 Q14 26 14 30 Q14 34 18 34 Q22 34 22 30 Q22 24 16 18" />
    <path d="M26 30 Q26 20 36 20 Q32 26 32 30 Q32 34 36 34 Q40 34 40 30 Q40 24 34 18" />
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M24 4 A12 12 0 0 1 36 16 C36 26 24 40 24 40 C24 40 12 26 12 16 A12 12 0 0 1 24 4Z" />
    <circle cx="24" cy="16" r="4" />
  </svg>
);
const IconUtensils = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <line x1="18" y1="4" x2="18" y2="16" />
    <line x1="24" y1="4" x2="24" y2="16" />
    <line x1="30" y1="4" x2="30" y2="16" />
    <path d="M18 16 Q24 22 24 26 L24 44" />
    <path d="M30 4 L30 26 Q30 32 24 26" />
  </svg>
);

/* ─── Sous-navbar ─── */
function RestaurantNav() {
  const links: [string, string][] = [
    ["Menu", "menu"], ["Galerie", "galerie"], ["Avis", "temoignages"],
    ["Le Chef", "chef"], ["Adresses", "adresses"], ["Livraison", "livraison"], ["FAQ", "faq"],
  ];
  return (
    <nav className="fixed left-0 right-0 z-40 flex items-center h-11 overflow-x-auto"
      style={{ top: 64, background: "rgba(28,10,0,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(202,138,4,0.2)", fontFamily: "Italiana, serif", scrollbarWidth: "none" }}>
      <div className="flex items-center gap-3 px-5 mx-auto flex-shrink-0">
        {links.map(([label, id], i) => (
          <React.Fragment key={id}>
            {i > 0 && <span style={{ color: "rgba(202,138,4,0.35)", fontSize: "9px", flexShrink: 0 }}>&#9679;</span>}
            <button onClick={() => scrollTo(id)}
              className="text-xs tracking-wide transition-colors duration-200 whitespace-nowrap flex-shrink-0"
              style={{ color: "rgba(255,247,237,0.55)", fontFamily: "Italiana, serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ca8a04")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,247,237,0.55)")}>
              {label}
            </button>
          </React.Fragment>
        ))}
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="ml-auto mr-5 flex-shrink-0 text-xs font-bold uppercase tracking-widest transition-colors duration-200 whitespace-nowrap"
        style={{ color: "#ca8a04" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#ca8a04"}>
        Réserver
      </a>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Restaurant() {
  useSEO({
    title: "Restaurant Lubumbashi | CommandeTonSite",
    description: "Site web pour votre restaurant à Lubumbashi. Menu en ligne, réservation et horaires d'ouverture. Attirez plus de clients. Commandez via WhatsApp.",
    path: "/restaurant",
    keywords: "restaurant Lubumbashi, menu en ligne Congo, reservation restaurant RDC, site web restaurant Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "Restaurant", "name": "Restaurant Saveurs du Congo", "description": "Restaurant gastronomique à Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/restaurant", "servesCuisine": "Africaine, Congolaise", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <PageThemeProvider theme={themes.restaurant}>
    <div className="min-h-[100dvh] flex flex-col bg-[#fff7ed] text-[#1c0a00]" style={{ fontFamily: "Italiana, serif" }}>
      <Navbar />
      <RestaurantNav />
      <main className="flex-grow">

        {/* ══ 1. HERO ══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&fit=crop&q=80)" }}>
            <div className="absolute inset-0 bg-[#1c0a00]/80" />
          </div>
          <div className="container mx-auto px-4 z-10 text-center text-white pt-16">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="max-w-5xl mx-auto">
              <div className="text-[#fbbf24] font-bold tracking-[0.3em] uppercase mb-8 text-xs">
                Restaurant Gastronomique · 3 adresses à Lubumbashi
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl mb-6 text-white drop-shadow-lg" style={{ fontFamily: "Abril Fatface, serif" }}>
                Saveurs du Congo
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-[#fff7ed]/90 max-w-3xl mx-auto leading-relaxed">
                Une expérience culinaire authentique au cœur de Lubumbashi. Cuisine traditionnelle revisitée par notre Chef, dans un cadre d'exception.
              </p>
              <div className="text-[#fbbf24] text-xl mb-12">★★★★★ <span className="text-white/70 text-base ml-2">200+ avis clients · 3 restaurants</span></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white px-10 py-5 text-lg font-bold rounded-full transition-colors">
                  {WA_SVG} Réserver une table
                </a>
                <button onClick={() => scrollTo("menu")}
                  className="px-10 py-5 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all text-lg">
                  Voir le Menu
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ 2. MENU ══ */}
        <section id="menu" className="py-24 bg-[#fff7ed]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-[#1c0a00] mb-4" style={{ fontFamily: "Abril Fatface, serif" }}>Notre Menu</h2>
              <div className="w-24 h-1 bg-[#ea580c] mx-auto rounded-full mb-8" />
              <div className="flex flex-wrap justify-center gap-3">
                {menu.map((cat, i) => (
                  <button key={i} onClick={() => setActiveMenu(i)}
                    className={`px-6 py-2.5 font-bold text-sm rounded-full border-2 transition-all ${activeMenu === i ? "bg-[#ea580c] border-[#ea580c] text-white" : "border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c]/10"}`}
                    style={{ fontFamily: "Abril Fatface, serif" }}>
                    {cat.cat}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeMenu} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-orange-100">
                <h3 className="text-2xl font-bold text-[#1c0a00] mb-8 text-center" style={{ fontFamily: "Abril Fatface, serif" }}>{menu[activeMenu].cat}</h3>
                <div className="space-y-5">
                  {menu[activeMenu].items.map(([name, price], j) => (
                    <div key={j} className="flex justify-between items-baseline border-b border-dashed border-[#1c0a00]/10 pb-4">
                      <span className="font-bold text-[#1c0a00] text-base">{name}</span>
                      <span className="font-bold text-[#ca8a04] text-xl flex-shrink-0 ml-4" style={{ fontFamily: "Abril Fatface, serif" }}>{price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full px-8 py-3 font-bold transition-colors">
                    {WA_SVG} Commander ce plat
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="text-center mt-8 text-[#1c0a00]/50 text-sm">
              Tous nos plats sont préparés à la commande avec des ingrédients frais et locaux. Allergies ? Contactez-nous.
            </div>
          </div>
        </section>

        {/* ══ 3. GALERIE ══ */}
        <section id="galerie" className="py-16 bg-[#1c0a00]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-[#ca8a04] mb-12" style={{ fontFamily: "Abril Fatface, serif" }}>Notre Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
                "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
              ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="aspect-square rounded-xl overflow-hidden">
                  <img src={`${img}&auto=format&fit=crop&q=80`} alt={`Plat cuisine restaurant Lubumbashi ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 4. TÉMOIGNAGES ══ */}
        <section id="temoignages" className="py-24 bg-[#fff7ed]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c0a00] mb-4" style={{ fontFamily: "Abril Fatface, serif" }}>Ce que disent nos clients</h2>
              <div className="w-24 h-1 bg-[#ea580c] mx-auto rounded-full mb-4" />
              <div className="flex justify-center gap-1 text-[#fbbf24] text-2xl">{"★★★★★"}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100 relative flex flex-col">
                  <div className="text-[#ea580c]/25 mb-4"><IconQuote /></div>
                  <p className="text-[#1c0a00]/75 leading-relaxed flex-grow mb-6 text-base italic">"{t.text}"</p>
                  <div className="border-t border-orange-100 pt-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ea580c]/10 flex items-center justify-center text-[#ea580c] font-black text-lg" style={{ fontFamily: "Abril Fatface, serif" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-[#1c0a00] text-sm">{t.name}</div>
                      <div className="text-[#1c0a00]/45 text-xs">{t.role}</div>
                    </div>
                    <div className="ml-auto text-[#fbbf24] text-sm">★★★★★</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. LE CHEF ══ */}
        <section id="chef" className="py-20 bg-[#1c0a00] text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="flex-shrink-0 relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#ea580c]/40 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&auto=format&fit=crop&q=80" alt="Chef Emmanuel" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#ea580c] text-white rounded-xl px-4 py-2 text-center shadow-lg">
                  <div className="text-2xl font-black" style={{ fontFamily: "Abril Fatface, serif" }}>15</div>
                  <div className="text-xs uppercase tracking-widest opacity-90">ans</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-[#ea580c]"><IconChefHat /></div>
                  <span className="text-xs text-[#ea580c] font-bold uppercase tracking-widest">Chef Exécutif</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "Abril Fatface, serif" }}>Chef Emmanuel</h2>
                <p className="text-[#ca8a04] text-base font-semibold mb-5">Maître de la Gastronomie Congolaise</p>
                <p className="text-[#fff7ed]/70 leading-relaxed text-lg mb-6">
                  Formé entre Paris et Kinshasa, le Chef Emmanuel sublime les recettes du Katanga avec 15 ans d'expérience. Chaque assiette est un hommage à la cuisine congolaise — généreuse, authentique, inoubliable.
                </p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold px-7 py-3.5 rounded-full transition-colors">
                  {WA_SVG} Réserver votre table
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 6. ADRESSES ══ */}
        <section id="adresses" className="py-24 bg-[#fff7ed]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1c0a00] mb-4" style={{ fontFamily: "Abril Fatface, serif" }}>Nos 3 Restaurants</h2>
              <div className="w-20 h-1 bg-[#ea580c] mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {addresses.map((addr, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100">
                  <div className="text-[#ea580c] mb-4"><IconMapPin /></div>
                  <h3 className="text-xl font-bold text-[#1c0a00] mb-2" style={{ fontFamily: "Abril Fatface, serif" }}>{addr.name}</h3>
                  <p className="text-sm text-[#1c0a00]/60 mb-4 font-semibold">{addr.zone}</p>
                  <div className="space-y-2 text-sm text-[#1c0a00]/60 border-t border-orange-50 pt-4">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="10" cy="10" r="8" />
                        <polyline points="10,5 10,10 13,13" />
                      </svg>
                      {addr.hours}
                    </div>
                    <div className="text-[#ea580c] font-semibold mt-2">{addr.note}</div>
                  </div>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 justify-center bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold rounded-full px-6 py-3 text-sm transition-colors">
                    {WA_SVG} Réserver ici
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 7. LIVRAISON ══ */}
        <section id="livraison" className="py-20 bg-[#1c0a00] text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: "Abril Fatface, serif" }}>Commandez depuis chez vous</h2>
                <p className="text-[#fff7ed]/70 text-lg mb-7 leading-relaxed">
                  Envoyez votre commande sur WhatsApp en quelques secondes. Notre cuisine prépare vos plats avec la même qualité qu'en salle et notre livreur vous rejoint en moins d'une heure.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Livraison dans un rayon de 15 km", "Paiement à la livraison ou par mobile money", "Commande minimum : 15$", "Livraison 7j/7 de 11h à 22h"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8 L6 11 L13 4" />
                      </svg>
                      <span className="text-[#fff7ed]/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black px-10 py-5 text-xl transition-colors rounded-full">
                  {WA_SVG} Passer ma commande
                </a>
              </div>
              <div className="flex-1">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80" alt="Livraison" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ 8. FAQ ══ */}
        <section id="faq" className="py-20 bg-[#fff7ed]">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-[#1c0a00]" style={{ fontFamily: "Abril Fatface, serif" }}>Questions Fréquentes</h2>
              <div className="w-16 h-1 bg-[#ea580c] mx-auto rounded-full" />
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm" style={{ borderColor: openFaq === i ? "rgba(234,88,12,0.4)" : undefined }}>
                  <button className="w-full flex items-center justify-between px-7 py-5 text-left font-bold text-base text-[#1c0a00]" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 text-[#ea580c] transition-transform flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-7 pb-5 text-[#1c0a00]/65 leading-relaxed border-t border-orange-100 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 9. CTA FINAL ══ */}
        <section className="py-20 bg-[#1c0a00] text-center">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex justify-center text-[#ea580c]"><IconUtensils /></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "Abril Fatface, serif" }}>Une table vous attend ce soir</h2>
            <p className="text-xl text-[#fff7ed]/50 mb-10 max-w-2xl mx-auto">
              3 adresses à Lubumbashi, livraison disponible. Réservez maintenant et vivez un moment gastronomique inoubliable.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black px-10 py-5 text-xl transition-colors rounded-full">
              {WA_SVG} Réserver ma table maintenant
            </a>
            <p className="mt-6 text-sm text-[#fff7ed]/30">Livraison disponible dans un rayon de 15 km depuis chaque restaurant</p>
          </div>
        </section>

        <OrderWebsiteSection />
      </main>
      <Footer />
    </div>
    </PageThemeProvider>
  );
}
