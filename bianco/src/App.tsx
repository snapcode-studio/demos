/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Phone, ChefHat, Info, Check, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { 
  hours, rules, glossary, snacks, salads, 
  pizzaRosso, pizzaBianco, extras, pastas, drinks 
} from './data';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  const matchSearch = (name: string, desc: string = '') => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
  };

  const copyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('883933788');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Smooth scroll logic
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  // Dynamic meta tags (title) based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          let title = "Pizzeria Bianco | Autentyczna Włoska Pizza z Pieca";
          
          if (sectionId === "rzemioslo") title = "Nasze Rzemiosło | Pizzeria Bianco";
          else if (sectionId === "menu") title = "Menu | Pizzeria Bianco";
          else if (sectionId === "informacje") title = "Ważne Informacje | Pizzeria Bianco";
          else if (sectionId === "kontakt") title = "Kontakt | Pizzeria Bianco";
          
          document.title = title;
        }
      });
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach(s => observer.observe(s));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-tight text-white font-semibold">
            Bianco <span className="font-light italic text-[#C5A059]">Forno a legna</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase text-zinc-400">
            <a href="#rzemioslo" className="hover:text-[#C5A059] transition-colors">Rzemiosło</a>
            <a href="#menu" className="hover:text-[#C5A059] transition-colors">Menu</a>
            <a href="#informacje" className="hover:text-[#C5A059] transition-colors">Informacje</a>
            <a href="#kontakt" className="hover:text-[#C5A059] transition-colors">Kontakt</a>
          </div>
          <button 
            onClick={copyPhone} 
            className="hidden md:flex items-center gap-2 text-[#C5A059] hover:text-white transition-colors cursor-pointer"
            aria-label="Skopiuj numer telefonu"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Phone className="w-4 h-4" />}
            <span className="text-sm font-medium tracking-widest">
              {copied ? 'SKOPIOWANO' : '883 933 788'}
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 overflow-hidden border-b border-zinc-900/50">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000" 
            alt="Piec opalany drewnem" 
            className="w-full h-full object-cover opacity-30 grayscale-[30%]"
          />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#C5A059]"></div>
              <span className="uppercase tracking-[0.3em] text-[#C5A059] text-xs font-bold">Skierniewice</span>
              <div className="h-[1px] w-12 bg-[#C5A059]"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight mb-8 drop-shadow-lg">
              Sztuka Włoskiego <br />
              <span className="italic font-light text-zinc-300">Rzemiosła.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Autentyczna pizza z pieca opalanego drewnem bukowym. Najwyższa jakość składników, bezkompromisowy smak i atmosfera prawdziwej Italii.
            </p>
            <a href="#menu" className="inline-flex items-center justify-center border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-zinc-950 px-10 py-4 rounded-sm text-sm tracking-[0.2em] uppercase transition-all duration-300">
              Odkryj Menu
            </a>
          </motion.div>
        </div>
      </section>

      {/* Rzemiosło Section */}
      <section id="rzemioslo" className="py-24 md:py-32 px-6 border-b border-zinc-900/50 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1000" 
                alt="Piec opalany drewnem bukowym"
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(24,24,27,1)] pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                <span className="uppercase tracking-widest text-[#C5A059] text-xs font-bold">Inżynieria Smaku</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Serce naszego konceptu. <br />
                <span className="italic font-light text-zinc-400">Żywy ogień.</span>
              </h2>
              <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg">
                <p>
                  Prawdziwa pizza neapolitańska i klasyczna wymaga żywiołu. W przeciwieństwie do standardowych pieców elektrycznych, zdecydowaliśmy się na rozwiązanie najbardziej wymagające i bezkompromisowe — tradycyjny piec opalany żywym ogniem.
                </p>
                <p>
                  Wykorzystujemy wyłącznie sezonowane <strong>drewno bukowe</strong>. Jego powolne spalanie generuje potężną energię cieplną dochodzącą do 500 stopni Celsjusza. Krótki wypiek powoduje gwałtowne rozprężenie ciasta. Efekt? Wybitnie puszyste brzegi i ekstremalnie cienki, chrupiący środek, który zatrzymuje całą wilgoć składników.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          
          <div className="text-center mb-16">
            <ChefHat className="w-10 h-10 text-[#C5A059] mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Menu Pizzerii</h2>
            <p className="text-zinc-500 font-light tracking-wide uppercase text-sm mb-12">Tradycja na talerzu</p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {["Wszystkie", "Przekąski", "Sałatki", "Pizza", "Makarony", "Napoje"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-colors border ${
                      activeCategory === cat 
                        ? 'border-[#C5A059] bg-[#C5A059] text-zinc-950 font-semibold' 
                        : 'border-zinc-800 text-zinc-400 hover:border-[#C5A059] hover:text-[#C5A059]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64 shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Szukaj w menu..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-12 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
          {/* Przekąski */}
          {(activeCategory === "Wszystkie" || activeCategory === "Przekąski") && snacks.filter(i => matchSearch(i.name, i.desc)).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-24"
            >
              <h3 className="text-3xl font-serif text-[#C5A059] mb-10 border-b border-zinc-900 pb-4">Przekąski</h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {snacks.filter(i => matchSearch(i.name, i.desc)).map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                  className="group p-4 -mx-4 rounded-lg transition-colors cursor-default"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                    <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">{item.price} zł</span>
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Sałatki */}
          {(activeCategory === "Wszystkie" || activeCategory === "Sałatki") && salads.filter(i => matchSearch(i.name, i.desc)).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <div className="mb-10 border-b border-zinc-900 pb-4">
              <h3 className="text-3xl font-serif text-[#C5A059] mb-2">Sałatki</h3>
              <p className="text-zinc-500 text-sm italic">Do każdej sałatki podajemy chrupiące grzanki oraz masło ziołowe</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {salads.filter(i => matchSearch(i.name, i.desc)).map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                  className="group p-4 -mx-4 rounded-lg transition-colors cursor-default"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                    <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">{item.price} zł</span>
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Pizza Rosso */}
          {(activeCategory === "Wszystkie" || activeCategory === "Pizza") && pizzaRosso.filter(i => matchSearch(i.name, i.desc)).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-4 mb-10 gap-4">
              <div>
                <h3 className="text-3xl font-serif text-[#C5A059] mb-2">Pizza Rosso</h3>
                <p className="text-zinc-500 text-sm italic">Z sosem pomidorowym. Legenda: XX - baza (mozzarella + sos), X - baza do białej pizzy.</p>
              </div>
              <div className="flex gap-8 text-sm font-serif text-white">
                <span className="text-center">31 cm</span>
                <span className="text-center">41 cm</span>
              </div>
            </div>
            <div className="grid gap-y-8">
              {pizzaRosso.filter(i => matchSearch(i.name, i.desc)).map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 12, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 -mx-4 rounded-lg transition-colors cursor-default"
                >
                  <div className="flex-1 pr-8">
                    <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">
                      <span className="text-zinc-600 group-hover:text-[#C5A059]/50 mr-3 text-sm transition-colors">{item.id}.</span>{item.name}
                    </h4>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed mt-1">{item.desc}</p>
                  </div>
                  <div className="flex gap-8 font-serif text-white shrink-0 items-end md:items-center">
                    <span className="w-12 text-right group-hover:text-[#C5A059] transition-colors">{item.p1}</span>
                    <span className="w-12 text-right group-hover:text-[#C5A059] transition-colors">{item.p2}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Pizza Bianco */}
          {(activeCategory === "Wszystkie" || activeCategory === "Pizza") && pizzaBianco.filter(i => matchSearch(i.name, i.desc)).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-4 mb-10 gap-4">
              <div>
                <h3 className="text-3xl font-serif text-[#C5A059] mb-2">Pizza Bianco</h3>
                <p className="text-zinc-500 text-sm italic">Biała pizza (bez sosu pomidorowego).</p>
              </div>
              <div className="flex gap-8 text-sm font-serif text-white">
                <span className="text-center">31 cm</span>
                <span className="text-center">41 cm</span>
              </div>
            </div>
            <div className="grid gap-y-8">
              {pizzaBianco.filter(i => matchSearch(i.name, i.desc)).map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 12, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 -mx-4 rounded-lg transition-colors cursor-default"
                >
                  <div className="flex-1 pr-8">
                    <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">
                      <span className="text-zinc-600 group-hover:text-[#C5A059]/50 mr-3 text-sm transition-colors">{item.id}.</span>{item.name}
                    </h4>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed mt-1">{item.desc}</p>
                  </div>
                  <div className="flex gap-8 font-serif text-white shrink-0 items-end md:items-center">
                    <span className="w-12 text-right group-hover:text-[#C5A059] transition-colors">{item.p1}</span>
                    <span className="w-12 text-right group-hover:text-[#C5A059] transition-colors">{item.p2}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Calzone & Dodatki */}
          {(activeCategory === "Wszystkie" || activeCategory === "Pizza") && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-24 grid md:grid-cols-2 gap-16"
          >
            {matchSearch("Calzone Napolitana", "Mozzarella fior di latte") && (
            <div>
              <h3 className="text-2xl font-serif text-[#C5A059] mb-8 border-b border-zinc-900 pb-4">Włoski Pieróg</h3>
              <motion.div 
                whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                className="group p-4 -mx-4 rounded-lg transition-colors cursor-default"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">30. Calzone Napolitana</h4>
                  <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                  <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">44.00 zł</span>
                </div>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">Mozzarella fior di latte, 2 składniki do wyboru (wędlina, warzywo), na wierzchu sos, bazylia (31 cm).</p>
              </motion.div>
            </div>
            )}
            
            {extras.filter(i => matchSearch(i.name)).length > 0 && (
            <div>
              <div className="flex justify-between items-end border-b border-zinc-900 pb-4 mb-8">
                <h3 className="text-2xl font-serif text-[#C5A059]">Dodatki</h3>
                <div className="flex gap-6 text-xs font-serif text-zinc-500">
                  <span>31 cm</span>
                  <span>41 cm</span>
                </div>
              </div>
              <div className="space-y-2">
                {extras.filter(i => matchSearch(i.name)).map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                    className="flex justify-between items-center text-sm p-3 -mx-3 rounded-lg transition-colors group cursor-default"
                  >
                    <span className="text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                    <div className="flex gap-6 font-serif text-white group-hover:text-[#C5A059] transition-colors">
                      <span className="w-10 text-right">{item.p1}</span>
                      <span className="w-10 text-right">{item.p2}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            )}
          </motion.div>
          )}

          {/* Makarony */}
          {(activeCategory === "Wszystkie" || activeCategory === "Makarony") && pastas.filter(i => matchSearch(i.name, i.desc)).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <h3 className="text-3xl font-serif text-[#C5A059] mb-10 border-b border-zinc-900 pb-4">Makarony</h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {pastas.filter(i => matchSearch(i.name, i.desc)).map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                  className="group p-4 -mx-4 rounded-lg transition-colors cursor-default"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-medium text-white group-hover:text-[#C5A059] transition-colors">{item.name}</h4>
                    <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                    <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">{item.price} zł</span>
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )}

          {/* Napoje */}
          {(activeCategory === "Wszystkie" || activeCategory === "Napoje") && (drinks.hot.filter(i => matchSearch(i.name)).length > 0 || drinks.cold.filter(i => matchSearch(i.name)).length > 0) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-16"
          >
            {drinks.hot.filter(i => matchSearch(i.name)).length > 0 && (
            <div>
              <h3 className="text-2xl font-serif text-[#C5A059] mb-8 border-b border-zinc-900 pb-4">Napoje Gorące</h3>
              <div className="space-y-2">
                {drinks.hot.filter(i => matchSearch(i.name)).map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                    className="flex justify-between items-baseline group p-3 -mx-3 rounded-lg transition-colors cursor-default"
                  >
                    <span className="text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                    <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                    <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">{item.price} zł</span>
                  </motion.div>
                ))}
              </div>
            </div>
            )}
            
            {drinks.cold.filter(i => matchSearch(i.name)).length > 0 && (
            <div>
              <h3 className="text-2xl font-serif text-[#C5A059] mb-8 border-b border-zinc-900 pb-4">Napoje Zimne</h3>
              <div className="space-y-2">
                {drinks.cold.filter(i => matchSearch(i.name)).map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 8, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
                    className="flex justify-between items-baseline group p-3 -mx-3 rounded-lg transition-colors cursor-default"
                  >
                    <span className="text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                    <div className="flex-1 border-b border-dotted border-zinc-800 mx-4 relative top-[-6px] group-hover:border-[#C5A059]/30 transition-colors"></div>
                    <span className="text-white font-serif group-hover:text-[#C5A059] transition-colors">{item.price} zł</span>
                  </motion.div>
                ))}
              </div>
            </div>
            )}
          </motion.div>
          )}

          </AnimatePresence>
        </motion.div>
      </section>

      {/* Info & Glossary Section */}
      <section id="informacje" className="py-24 bg-zinc-900/50 border-y border-zinc-900">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16"
        >
          
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Info className="w-6 h-6 text-[#C5A059]" />
              <h3 className="text-2xl font-serif text-white">Ważne Informacje</h3>
            </div>
            <ul className="space-y-4">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0"></div>
                  <p className="text-zinc-400 font-light leading-relaxed">{rule}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-white mb-8 border-b border-zinc-800 pb-4">Słowniczek Składników</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {glossary.map((item, idx) => (
                <div key={idx}>
                  <span className="text-[#C5A059] font-medium block text-sm">{item.term}</span>
                  <span className="text-zinc-500 font-light text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      {/* Footer / Visit Us */}
      <footer id="kontakt" className="pt-24 pb-12 px-6 bg-zinc-950 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-20 relative z-10"
        >
          
          <div>
            <div className="font-serif text-3xl tracking-tight text-white font-semibold mb-6">
              Bianco <span className="font-light italic text-[#C5A059]">Forno a legna</span>
            </div>
            <p className="text-zinc-500 font-light leading-relaxed max-w-sm mb-8">
              Odkryj prawdziwy smak Włoch w sercu Skierniewic. Miejsce, gdzie rzemiosło spotyka się z doskonałą jakością.
            </p>
            <button 
              onClick={copyPhone}
              className="flex items-center gap-4 text-[#C5A059] hover:text-white transition-colors text-left group"
              aria-label="Skopiuj numer telefonu"
            >
              <div className="w-12 h-12 rounded-full border border-[#C5A059] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-zinc-950 transition-colors">
                {copied ? <Check className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-2xl font-serif tracking-wide block">{copied ? 'Skopiowano!' : '883 933 788'}</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  Kliknij, aby skopiować
                </span>
              </div>
            </button>
          </div>

          <div>
            <h4 className="text-xl font-serif text-white mb-8">Godziny Otwarcia</h4>
            <ul className="space-y-3 text-zinc-400 font-light">
              {hours.map((h, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-zinc-900/50 pb-2">
                  <span>{h.day}</span>
                  <span className={h.time === 'Zamknięte' ? 'text-zinc-600' : 'text-white font-serif'}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif text-white mb-8">Lokalizacja</h4>
            <div className="flex items-start gap-4 text-zinc-400 font-light mb-8">
              <MapPin className="w-6 h-6 text-[#C5A059] shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Pizzeria Bianco</p>
                <p>ul. Senatorska 5</p>
                <p>96-100 Skierniewice</p>
              </div>
            </div>
          </div>
          
        </motion.div>
        
        <div className="max-w-7xl mx-auto text-center border-t border-zinc-900 pt-8 text-zinc-600 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Pizzeria Bianco Forno a legna. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}

