import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import {
  ShoppingCart, Truck, Shield, RotateCcw, Phone, Tag, ChevronDown, Star,
  Shirt, Smartphone, Home, Gem, Dumbbell, ShoppingBasket, ArrowRight,
  Sofa, Coffee, Footprints,
} from "lucide-react";

const WHATSAPP = "https://wa.me/243819730124";

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const categories = [
  { name: "Mode & Vetements", count: 148, Icon: Shirt },
  { name: "Electronique",     count: 92,  Icon: Smartphone },
  { name: "Maison & Deco",    count: 74,  Icon: Home },
  { name: "Beaute & Soin",    count: 63,  Icon: Gem },
  { name: "Sport & Loisirs",  count: 41,  Icon: Dumbbell },
  { name: "Alimentation",     count: 55,  Icon: ShoppingBasket },
];

const products = [
  { name: "Sac a main cuir premium",      price: "$85",  old: "$120", badge: "Promo",   stars: 4.9, reviews: 38, Icon: Gem,        color: "#fce7f3", iconColor: "#db2777" },
  { name: "Smartphone Android 128Go",     price: "$220", old: null,   badge: "Nouveau", stars: 4.7, reviews: 22, Icon: Smartphone,  color: "#dbeafe", iconColor: "#1d4ed8" },
  { name: "Ensemble salon 3 places",      price: "$390", old: "$450", badge: "Promo",   stars: 4.8, reviews: 15, Icon: Sofa,        color: "#fef9c3", iconColor: "#a16207" },
  { name: "Creme hydratante SPF 50",      price: "$28",  old: null,   badge: null,      stars: 4.6, reviews: 51, Icon: Gem,         color: "#f0fdf4", iconColor: "#16a34a" },
  { name: "Basket running Pro Runner X2", price: "$65",  old: "$90",  badge: "Promo",   stars: 4.9, reviews: 44, Icon: Footprints,  color: "#ede9fe", iconColor: "#7c3aed" },
  { name: "Cafetiere automatique",        price: "$72",  old: null,   badge: "Nouveau", stars: 4.7, reviews: 19, Icon: Coffee,      color: "#fff7ed", iconColor: "#c2410c" },
];

const trust = [
  { Icon: Truck,     label: "Livraison rapide",  desc: "Lubumbashi et environs" },
  { Icon: Shield,    label: "Paiement securise",  desc: "Mobile Money & Cash" },
  { Icon: RotateCcw, label: "Retour facile",      desc: "7 jours sans question" },
  { Icon: Phone,     label: "Support 24h/7j",     desc: "WhatsApp & Appel" },
];

const faqs = [
  { q: "Comment passer commande ?", a: "Choisissez vos articles sur le site, puis contactez-nous via WhatsApp en mentionnant la reference du produit. Nous confirmons la disponibilite et organisons la livraison." },
  { q: "Quels sont les modes de paiement acceptes ?", a: "Nous acceptons l'argent liquide, Mobile Money (M-Pesa, Airtel Money) et le virement bancaire. Le paiement se fait a la livraison pour les commandes locales." },
  { q: "Livrez-vous en dehors de Lubumbashi ?", a: "Oui, nous livrons dans tout le Katanga et vers Kinshasa via transporteurs agreees. Les delais varient de 2 a 7 jours selon la destination." },
  { q: "Les produits sont-ils garantis ?", a: "Tous nos produits electroniques sont garantis 6 mois minimum. Pour les autres categories, nous offrons un retour ou echange sous 7 jours si le produit est defectueux." },
  { q: "Peut-on commander en gros pour une entreprise ?", a: "Absolument. Contactez-nous sur WhatsApp pour les commandes en gros ; nous proposons des tarifs preferentiels et une facturation adaptee aux entreprises." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11} className={i <= Math.round(n) ? "fill-black text-black" : "text-gray-200 fill-gray-100"} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <span className="pr-4 text-sm">{q}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-black transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">{a}</div>}
    </div>
  );
}

/* ---------- ScrollTo ---------- */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ---------- Sous-navbar Boutique / Onglets Noir E-commerce ---------- */
function BoutiqueNav() {
  const [active, setActive] = React.useState<string | null>(null);
  const tabs: [string, string][] = [["Produits","produits"],["Nouveautes","nouveautes"],["FAQ","faq"]];
  const handleClick = (id: string) => { setActive(id); scrollTo(id); };
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center justify-between px-8 h-11"
      style={{ top: 64, background: "#111111", fontFamily: "DM Sans, sans-serif" }}>
      <div className="flex items-center h-full gap-0">
        {tabs.map(([label, id]) => (
          <button key={id} onClick={() => handleClick(id)}
            className="h-full px-5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 border-b-2"
            style={{ color: active === id ? "#fff" : "rgba(255,255,255,0.45)", borderBottomColor: active === id ? "#fff" : "transparent" }}
            onMouseEnter={e => { if (active !== id) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { if (active !== id) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}>
            {label}
          </button>
        ))}
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="text-xs font-black uppercase tracking-widest px-5 py-1.5 transition-colors duration-200 hover:bg-gray-800"
        style={{ background: "#fff", color: "#111" }}>
        Commander un site
      </a>
    </nav>
  );
}

export default function BoutiqueEnLigne() {
  useSEO({
    title: "Boutique en Ligne | Demo E-commerce | CommandeTonSite",
    description: "Demo boutique en ligne pour Lubumbashi : catalogue produits, categories, livraison rapide, commande WhatsApp. Commandez votre boutique.",
    path: "/boutique-en-ligne",
    keywords: "boutique en ligne Lubumbashi, e-commerce Congo, shop online RDC, vente en ligne Lubumbashi",
    structuredData: { "@context": "https://schema.org", "@type": "OnlineStore", "name": "Boutique en Ligne Lubumbashi", "description": "Boutique e-commerce a Lubumbashi, RDC — catalogue produits et commande WhatsApp", "url": "https://commandetonsite.vercel.app/boutique-en-ligne", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });

  return (
    <PageThemeProvider theme={themes.boutique}>
    <div className="min-h-[100dvh] flex flex-col bg-white text-gray-900" style={{ fontFamily: "DM Sans, sans-serif" }}>
      <Navbar />
      <BoutiqueNav />

      <main className="flex-grow pt-16">

        {/* Hero */}
        <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">

              <motion.div className="flex-1" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
                <div className="inline-flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-black text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Demo e-commerce · Lubumbashi
                </div>
                <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5 text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Votre boutique en ligne,<br />
                  <span className="text-black underline decoration-4 underline-offset-4">ouverte 24h/24.</span>
                </h1>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
                  Presentez vos produits, gerez les commandes et encaissez via WhatsApp. Simple, rapide, professionnel.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 font-bold px-7 py-4 bg-black text-white transition-all hover:bg-gray-800">
                    {WA_SVG}
                    Commander ma boutique
                  </a>
                  <a href="#produits"
                    className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-black transition-colors">
                    Voir les produits
                    <ChevronDown size={16} />
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex-1 w-full max-w-md"
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
                <div className="grid grid-cols-2 gap-3">
                  {products.slice(0, 4).map((p, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                      className="bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full h-24 mb-3 flex items-center justify-center relative overflow-hidden rounded"
                        style={{ background: p.color }}>
                        <p.Icon size={32} style={{ color: p.iconColor }} />
                        {p.badge && (
                          <span className="absolute top-1.5 left-1.5 text-white text-[10px] font-bold px-1.5 py-0.5 bg-black">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">{p.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm text-black">{p.price}</span>
                        {p.old && <span className="text-xs text-gray-400 line-through">{p.old}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="bg-gray-50 py-10 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {trust.map(({ Icon, label, desc }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }} className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-black">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="nouveautes" className="bg-white py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Parcourir</p>
              <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Nos categories</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center p-4 border border-gray-200 hover:border-black hover:shadow-sm transition-all">
                    <div className="w-12 h-12 flex items-center justify-center mb-2 bg-gray-100 group-hover:bg-black transition-colors">
                      <cat.Icon size={22} className="text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{cat.name}</p>
                    <p className="text-[10px] text-gray-400">{cat.count} articles</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="produits" className="bg-gray-50 py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Catalogue</p>
                <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Produits vedettes</h2>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-black hover:underline transition-colors">
                Voir tout
                <ArrowRight size={14} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.07 }}>
                  <div className="group bg-white border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-44 flex items-center justify-center overflow-hidden"
                      style={{ background: p.color }}>
                      <p.Icon size={52} style={{ color: p.iconColor, opacity: 0.85 }} />
                      {p.badge && (
                        <span className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 bg-black">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm text-gray-900 mb-1.5 leading-snug">{p.name}</p>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Stars n={p.stars} />
                        <span className="text-[11px] text-gray-400">({p.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-black">{p.price}</span>
                          {p.old && <span className="text-xs text-gray-400 line-through">{p.old}</span>}
                        </div>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 bg-black hover:bg-gray-800 transition-colors">
                          Commander
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo banner */}
        <section className="py-14 bg-black">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white/30 flex items-center justify-center flex-shrink-0">
                  <Tag size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-white text-xl leading-tight">-20% sur la premiere commande</p>
                  <p className="text-gray-400 text-sm">Code promo a demander sur WhatsApp</p>
                </div>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black font-black px-7 py-3.5 transition-all hover:bg-gray-100 whitespace-nowrap">
                {WA_SVG}
                Obtenir le code promo
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Questions frequentes</p>
              <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Tout ce que vous devez savoir</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Pret a vendre en ligne ?</p>
            <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Ouvrez votre boutique ce mois-ci.
            </h2>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-black text-white px-10 py-5 text-lg bg-black hover:bg-gray-800 transition-colors">
              {WA_SVG}
              Commander ma boutique en ligne
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
