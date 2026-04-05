import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageThemeProvider, themes } from "@/context/PageTheme";
import { OrderWebsiteSection } from "@/components/shared/OrderWebsiteSection";
import { ShoppingCart, Apple, Milk, Fish, Beef, Coffee, Droplets, Clock, ArrowRight, MapPin, Phone, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

const WHATSAPP = "https://wa.me/243819730124";

/* ---------- ScrollTo ---------- */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
};

/* ---------- Sous-navbar Supermarche / Tags verts ---------- */
const GREEN = "#16a34a";
const DARKGREEN = "#052e16";
function SupermarcheNav() {
  const links: [string, string][] = [["Promos","promos"],["Rayons","rayons"],["Magasins","magasins"],["Livraison","livraison"]];
  return (
    <nav className="hidden md:flex fixed left-0 right-0 z-40 items-center justify-between px-8 h-11"
      style={{ top: 64, background: GREEN, fontFamily: "Nunito, sans-serif" }}>
      <div className="flex items-center gap-2.5">
        <span className="text-white font-black text-xs uppercase tracking-widest px-2.5 py-1" style={{ background: DARKGREEN }}>FreshMart</span>
      </div>
      <div className="flex items-center gap-2">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.25)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = DARKGREEN; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}>
            {label}
          </button>
        ))}
      </div>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="text-xs font-black uppercase tracking-wider px-4 py-1.5 transition-colors duration-200 hover:bg-[#f0fdf4]"
        style={{ background: "#fff", color: DARKGREEN }}>
        Commander
      </a>
    </nav>
  );
}
const WA_SVG = <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;

const testimonials = [
  { name: "Christine Kabamba", role: "Mere de 3 enfants", text: "Je commande par WhatsApp chaque semaine depuis 2 ans. Les produits sont toujours frais, la livraison rapide et le personnel tres souriant. Mon supermarche de confiance." },
  { name: "Joseph Wa", role: "Entrepreneur", text: "La livraison est ultra rapide et les prix sont corrects. Jamais eu de probleme avec la qualite des produits. Je recommande vivement a tous les habitants de Lubumbashi." },
  { name: "Grace Mbuyi", role: "Blogueuse culinaire", text: "Seul endroit ou je trouve des produits importes de qualite a Lubumbashi. Le rayon frais est irreprochable. Un vrai supermarche comme dans les grandes capitales." },
];

const promos = [
  { title: "Fruits de Saison", desc: "-30% sur tous les agrumes", tag: "Jusqu'a dimanche", tagColor: "bg-[#f97316]", detail: "Oranges, citrons, mandarines, pamplemousses", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=80" },
  { title: "Rayon Frais", desc: "2 achetes = 1 offert", tag: "Aujourd'hui seulement", tagColor: "bg-[#16a34a]", detail: "Yaourts, fromages, laitages et charcuteries", img: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&auto=format&fit=crop&q=80" },
  { title: "Produits Menagers", desc: "Gros formats a prix mini", tag: "Stock limite", tagColor: "bg-[#f97316]", detail: "Lessives, produits nettoyants, papiers", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80" },
  { title: "Epicerie Seche", desc: "-20% sur les cereales", tag: "Cette semaine", tagColor: "bg-[#16a34a]", detail: "Riz, haricots, farine, pates et conserves", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80" },
  { title: "Boissons", desc: "Pack de 6 a prix reduit", tag: "Weekend uniquement", tagColor: "bg-[#f97316]", detail: "Sodas, jus de fruits, eaux minerales", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop&q=80" },
  { title: "Viandes et Poissons", desc: "Frais du jour -15%", tag: "Tous les matins", tagColor: "bg-[#16a34a]", detail: "Boeuf, poulet, tilapia, capitaine frais", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80" },
];

const addresses = [
  { name: "Marche Frais Express · Centre", zone: "Avenue du Commerce, Centre-ville", hours: "Lun-Sam : 07h-21h | Dim : 08h-18h" },
  { name: "Marche Frais Express · Kampemba", zone: "Quartier Kampemba, Av. Sendwe", hours: "Lun-Sam : 07h-20h | Dim : 08h-15h" },
  { name: "Marche Frais Express · Kenya", zone: "Quartier Kenya, Route Kasomeno", hours: "Lun-Sam : 07h-20h | Dim : 08h-15h" },
  { name: "Marche Frais Express · Golf", zone: "Residence Golf, Bld des Mines", hours: "7j/7 : 08h-22h" },
];

export default function Supermarche() {
  useSEO({
    title: "Supermarche Lubumbashi | CommandeTonSite",
    description: "Site web pour votre supermarche a Lubumbashi. Catalogue produits, promotions et horaires en ligne. Gagnez en visibilite. Commandez via WhatsApp.",
    path: "/supermarche",
    keywords: "supermarche Lubumbashi, epicerie Congo, courses Lubumbashi, site web supermarche RDC",
    structuredData: { "@context": "https://schema.org", "@type": "GroceryStore", "name": "Supermarche FreshMarket Lubumbashi", "description": "Supermarche de proximite a Lubumbashi, RDC", "url": "https://commandetonsite.vercel.app/supermarche", "address": { "@type": "PostalAddress", "addressLocality": "Lubumbashi", "addressCountry": "CD" } },
  });
  return (
    <PageThemeProvider theme={themes.supermarche}>
    <div className="min-h-[100dvh] flex flex-col bg-[#f0fdf4] text-[#052e16]" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <Navbar />
      <SupermarcheNav />
      <main className="flex-grow pt-16">

        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&auto=format&fit=crop&q=80)' }}>
            <div className="absolute inset-0 bg-[#052e16]/80" />
          </div>
          <div className="container mx-auto px-4 z-10 text-center text-white">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl mx-auto">
              <p className="text-[#4ade80] font-bold uppercase tracking-widest text-xs mb-6">Supermarche · 4 adresses a Lubumbashi</p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                Marche Frais<br />Express
              </h1>
              <p className="text-2xl mb-4 font-semibold text-green-100">
                Tout ce dont vous avez besoin, livre avec le sourire.
              </p>
              <div className="text-[#4ade80] text-lg mb-10">★★★★★ <span className="text-white/60 text-sm ml-2">500+ clients fideles</span></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#f97316] hover:bg-[#ea580c] text-white px-10 py-5 text-xl font-black border-none transition-colors">
                  {WA_SVG} Faire mes courses
                </a>
                <a href="#rayons" className="px-10 py-5 border border-white/30 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                  Nos rayons <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-8 bg-[#16a34a]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[["5 000+", "Produits disponibles"], ["1h", "Livraison express"], ["4", "Magasins en ville"], ["100%", "Produits frais"]].map(([val, lbl], i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white mb-1">{val}</div>
                  <div className="text-sm text-green-200 font-semibold uppercase tracking-wide">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section id="promos" className="py-24 bg-[#052e16]">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-3">
                <Tag className="w-5 h-5 text-[#4ade80]" />
                <p className="text-[#4ade80] text-xs uppercase tracking-widest font-bold">Offres de la semaine</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Promotions Immanquables</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {promos.map((promo, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="relative overflow-hidden aspect-square">
                  <img src={promo.img} alt={promo.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/65 flex flex-col justify-between p-8">
                    <div className={`${promo.tagColor} text-white font-black px-4 py-1.5 self-start text-sm uppercase tracking-wide`}>
                      {promo.tag}
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider text-white/70 mb-1">{promo.title}</div>
                      <h3 className="text-2xl font-black text-white mb-1">{promo.desc}</h3>
                      <p className="text-white/50 text-xs mb-4">{promo.detail}</p>
                      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-green-700 text-white font-black px-6 py-2.5 text-sm transition-colors">
                        {WA_SVG} En profiter
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rayons */}
        <section id="rayons" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#052e16] mb-4">Nos Rayons</h2>
              <div className="w-16 h-2 bg-[#16a34a] mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Apple, title: "Epicerie", bg: "bg-[#fef2f2]", color: "text-[#052e16]" },
                { icon: Apple, title: "Fruits et Leg.", bg: "bg-[#f0fdf4]", color: "text-[#16a34a]" },
                { icon: Beef, title: "Viandes", bg: "bg-[#fff1f2]", color: "text-[#052e16]" },
                { icon: Milk, title: "Laitiers", bg: "bg-[#fefce8]", color: "text-[#16a34a]" },
                { icon: Coffee, title: "Boissons", bg: "bg-[#eff6ff]", color: "text-[#052e16]" },
                { icon: Droplets, title: "Menager", bg: "bg-[#f5f3ff]", color: "text-[#16a34a]" },
              ].map((cat, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className={`${cat.bg} p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow`}>
                  <cat.icon className={`w-10 h-10 mb-3 ${cat.color}`} />
                  <span className="font-black text-[#052e16] text-sm">{cat.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos 4 adresses */}
        <section id="magasins" className="py-24 bg-[#f0fdf4]">
          <div className="container mx-auto px-4">
            <div className="mb-14">
              <p className="text-[#16a34a] text-xs uppercase tracking-widest mb-3 font-bold">Toujours pres de vous</p>
              <h2 className="text-4xl font-black text-[#052e16]">Nos 4 Magasins a Lubumbashi</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {addresses.map((addr, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 border-l-4 border-[#16a34a] shadow-sm">
                  <h3 className="text-lg font-black text-[#052e16] mb-2">{addr.name}</h3>
                  <div className="space-y-2 text-sm text-[#052e16]/60">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#16a34a]" />{addr.zone}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#16a34a]" />{addr.hours}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Livraison + Horaires */}
        <section id="livraison" className="py-24 bg-[#052e16] text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <h2 className="text-4xl font-black mb-6">Faites vos courses depuis votre canape</h2>
                <p className="text-green-200 text-lg mb-8 leading-relaxed">
                  Envoyez votre liste de courses par WhatsApp. Notre equipe prepare votre commande avec soin et vous la livre dans l'heure. Paiement a la livraison disponible.
                </p>
                <div className="space-y-4 mb-10">
                  {["Livraison en 1 heure dans Lubumbashi", "Paiement a la livraison accepte", "Commande minimum : 10$", "Zones couvertes : tous les quartiers", "Emballage soigne, produits proteges"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ShoppingCart className="w-4 h-4 text-[#4ade80] flex-shrink-0" />
                      <span className="text-green-100">{item}</span>
                    </div>
                  ))}
                </div>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black px-8 py-4 text-lg transition-colors">
                  {WA_SVG} Passer ma commande
                </a>
              </div>
              <div className="flex-1 bg-white text-[#052e16] p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#f97316]" /> Horaires d'ouverture
                </h3>
                <div className="space-y-4 font-bold text-lg">
                  {[["Lundi - Samedi", "07:00 - 21:00"], ["Dimanche", "08:00 - 18:00"], ["Jours feries", "08:00 - 14:00"]].map(([day, hrs], i) => (
                    <div key={i} className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-gray-500 font-semibold">{day}</span>
                      <span className="text-[#052e16]">{hrs}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-400">* Le magasin Golf est ouvert jusqu'a 22h tous les jours</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors / Marques */}
        <section className="py-16 bg-white border-t border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-[#052e16]/40 uppercase tracking-[0.25em] font-bold mb-10">Marques disponibles en magasin</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {[
                { name: "Nestlé",      style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.6rem",  letterSpacing: "-0.01em" } },
                { name: "Unilever",    style: { fontFamily: "Arial, sans-serif",                       fontWeight: 900, fontSize: "1.3rem",  letterSpacing: "0.05em"  } },
                { name: "Coca‑Cola",   style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.5rem",  letterSpacing: "0.02em"  } },
                { name: "Maggi",       style: { fontFamily: "Impact, sans-serif",                      fontWeight: 900, fontSize: "1.8rem",  letterSpacing: "0.08em"  } },
                { name: "Colgate",     style: { fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",fontWeight: 800, fontSize: "1.35rem", letterSpacing: "0.04em"  } },
                { name: "Omo",         style: { fontFamily: "Arial Black, sans-serif",                 fontWeight: 900, fontSize: "2rem",    letterSpacing: "-0.02em" } },
                { name: "Nido",        style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.6rem",  letterSpacing: "0.01em"  } },
                { name: "Lipton",      style: { fontFamily: "Times New Roman, serif",                  fontWeight: 700, fontSize: "1.4rem",  letterSpacing: "0.03em"  } },
                { name: "Pringles",    style: { fontFamily: "Arial, sans-serif",                       fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.06em"  } },
                { name: "Palmolive",   style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.3rem",  letterSpacing: "0.02em"  } },
                { name: "Fanta",       style: { fontFamily: "Arial Black, sans-serif",                 fontWeight: 900, fontSize: "1.5rem",  letterSpacing: "0.01em"  } },
                { name: "Sprite",      style: { fontFamily: "Arial, sans-serif",                       fontWeight: 800, fontSize: "1.4rem",  letterSpacing: "0.04em"  } },
                { name: "Danone",      style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.4rem",  letterSpacing: "0.01em"  } },
                { name: "P&G",         style: { fontFamily: "Times New Roman, serif",                  fontWeight: 700, fontSize: "1.5rem",  letterSpacing: "0.08em"  } },
                { name: "Heinz",       style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.5rem",  letterSpacing: "0.01em"  } },
                { name: "Kellogg's",   style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.35rem", letterSpacing: "0.01em"  } },
                { name: "Lay's",       style: { fontFamily: "Impact, sans-serif",                      fontWeight: 900, fontSize: "1.7rem",  letterSpacing: "0.04em"  } },
                { name: "Ariel",       style: { fontFamily: "Arial Black, sans-serif",                 fontWeight: 900, fontSize: "1.5rem",  letterSpacing: "0.02em"  } },
                { name: "Knorr",       style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.45rem", letterSpacing: "0.03em"  } },
                { name: "Dettol",      style: { fontFamily: "Arial, sans-serif",                       fontWeight: 800, fontSize: "1.3rem",  letterSpacing: "0.05em"  } },
                { name: "Milo",        style: { fontFamily: "Impact, sans-serif",                      fontWeight: 900, fontSize: "1.8rem",  letterSpacing: "0.03em"  } },
                { name: "Gillette",    style: { fontFamily: "Arial, sans-serif",                       fontWeight: 800, fontSize: "1.3rem",  letterSpacing: "0.04em"  } },
                { name: "Dove",        style: { fontFamily: "Georgia, serif",                          fontWeight: 700, fontSize: "1.55rem", letterSpacing: "0.02em"  } },
                { name: "Sunsilk",     style: { fontFamily: "Arial, sans-serif",                       fontWeight: 700, fontSize: "1.3rem",  letterSpacing: "0.03em"  } },
                { name: "Pepsi",       style: { fontFamily: "Arial Black, sans-serif",                 fontWeight: 900, fontSize: "1.5rem",  letterSpacing: "0.01em"  } },
              ].map(({ name, style }) => (
                <motion.div key={name}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="text-[#052e16]/25 hover:text-[#052e16]/60 transition-colors duration-300 cursor-default select-none"
                  style={style}>
                  {name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#052e16]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Vos courses en 1 heure chrono</h2>
            <p className="text-xl text-green-300 mb-10 max-w-xl mx-auto font-semibold">Commandez maintenant et recevez vos produits frais directement a votre porte.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black px-10 py-5 text-xl transition-colors">
              {WA_SVG} Commander mes courses maintenant
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
