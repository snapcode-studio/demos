"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dumbbell, ShieldAlert, Award, Grid, ArrowRight, Zap, Target, Check, Mail } from "lucide-react";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

export default function SilosFitness() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedCatalog, setCopiedCatalog] = useState(false);

  const handleCopyQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const textToCopy = `WYŚLIJ NA ADRES: biuro@pro-met.com.pl

Zapytanie o ofertę fitness - Hantle PRO-MET

Dzień dobry,
Proszę o przygotowanie wyceny na zestaw hantli.

Moje dane kontaktowe:
[Wpisz tutaj swoje imię / nazwę firmy i telefon]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleCopyCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const textToCopy = `WYŚLIJ NA ADRES: biuro@pro-met.com.pl

Zapytanie o katalog hantli PRO-MET

Dzień dobry,
Proszę o przesłanie aktualnego katalogu i cennika hantli stałych ogumowanych.

Moje dane kontaktowe:
[Wpisz tutaj swoje imię / nazwę firmy i telefon]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCatalog(true);
    setTimeout(() => setCopiedCatalog(false), 3000);
  };
  
  // Parallax / Zoom simulation for the knurling section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const dumbbellRange = Array.from({ length: 14 }, (_, i) => (i + 1) * 5); // 5, 10, 15, ..., 70 kg

  return (
    <PageTransition>
      <div className="bg-zinc-950 text-white min-h-screen grid-bg-dark flex flex-col">
        
        {/* Dark Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-36 border-b border-zinc-900 bg-radial from-zinc-900 to-zinc-950">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest mb-6"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Klasa Kalibracji Professional</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">TRWAŁOŚĆ I JAKOŚĆ</span>
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white mt-2 leading-[0.85] select-none uppercase">
                STAL<span className="text-brand-orange">OWE</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-base md:text-lg text-zinc-400 max-w-2xl font-mono leading-relaxed"
            >
              Hantle stałe PRO-MET to sprzęt nastawiony na maksymalną trwałość. Każdy hantel jest obrabiany na tokarce z litej stali węglowej. Oferujemy precyzyjne wyważenie i wysoką jakość wykonania.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4 justify-center"
            >
              <button
                onClick={handleCopyQuote}
                className={`px-6 py-3.5 rounded-sm font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                  copiedQuote ? "bg-brand-orange text-zinc-950 hover:bg-orange-500 shadow-brand-orange/20" : "bg-brand-orange text-zinc-950 hover:bg-orange-500 hover:scale-[1.02] shadow-brand-orange/15"
                }`}
              >
                {copiedQuote ? <Check className="w-4 h-4 text-zinc-950" /> : null}
                <span>{copiedQuote ? "SZABLON SKOPIOWANY!" : "ZAPYTAJ O WYCENĘ ZESTAWU"}</span>
              </button>
              <a
                href="#specyfikacja"
                className="px-6 py-3.5 rounded-sm bg-zinc-900 text-white border border-zinc-800 font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all"
              >
                Dowiedz się więcej
              </a>
            </motion.div>
          </div>
        </section>

        {/* Analiza Porównawcza: PRO-MET vs Import */}
        <section className="py-20 max-w-7xl mx-auto px-6 border-b border-zinc-900 w-full" id="specyfikacja">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Dlaczego obróbka stali ma znaczenie?
            </h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-lg mx-auto">
              Zderzenie norm produkcyjnych: tanie odlewy importowane kontra precyzyjna obróbka skrawaniem CNC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Market standard */}
            <div className="bg-zinc-950 rounded-sm p-6 md:p-8 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase font-bold">
                  <ShieldAlert className="w-4 h-4 text-zinc-600" />
                  <span>Standard rynkowy (Import)</span>
                </div>
                <h3 className="font-display text-xl font-black text-white mt-3 uppercase">Hantle z odlewów żeliwnych</h3>
                <p className="text-sm text-zinc-500 mt-2 font-mono leading-relaxed">
                  Tani sprzęt fitness powstaje z form odlewniczych o niskiej powtarzalności. Odchyłki wagowe sięgają często 3-5%. W przypadku hantli 50 kg oznacza to różnicę do 1.5 kg między prawą a lewą stroną. 
                </p>
                <div className="mt-6 space-y-2 text-xs text-zinc-500 font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="font-bold">Tolerancja:</span>
                    <span className="text-orange-500 font-bold">Wysoka (odlewy nieregularne)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="font-bold">Materiał:</span>
                    <span>Kruche żeliwo, porowate w środku</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold">Skutek:</span>
                    <span className="text-orange-500 font-bold">Asymetria obciążeń, ryzyko kontuzji stawów</span>
                  </div>
                </div>
              </div>
                Brak kontroli jakości odlewu
            </div>

            {/* PRO-MET standard */}
            <div className="bg-zinc-900 rounded-sm p-6 md:p-8 border border-brand-orange/30 flex flex-col justify-between shadow-xl shadow-brand-orange/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase font-bold">
                  <Award className="w-4 h-4" />
                  <span>Standard PRO-MET Premium</span>
                </div>
                <h3 className="font-display text-xl font-black text-white mt-3 uppercase">Stal toczona i kalibrowana</h3>
                <p className="text-sm text-zinc-400 mt-2 font-mono leading-relaxed">
                  Każdy obciążnik wycinany jest z walcowanej stali węglowej na tokarkach CNC. Waga jest precyzyjnie kontrolowana. Następnie elementy są wulkanizowane grubą, odporną na uderzenia gumą bez toksycznych zapachów.
                </p>
                <div className="mt-6 space-y-2 text-xs text-zinc-400 font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="font-bold">Tolerancja:</span>
                    <span className="text-brand-orange font-bold">Wysoka precyzja i wyważenie</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="font-bold">Materiał:</span>
                    <span>Lita stal węglowa + wulkanizowana guma amortyzująca</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold">Skutek:</span>
                    <span className="text-brand-orange font-bold">Idealna symetria biomechaniczna, wieczna trwałość</span>
                  </div>
                </div>
              </div>
                Wieloletnia żywotność sprzętu
            </div>
          </div>
        </section>

        {/* Scroll Parallax - 3D/Macro Radełkowania Gryfu */}
        <section 
          ref={scrollRef} 
          className="py-24 bg-black border-b border-zinc-900 overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div style={{ y: textY }} className="space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange font-mono">Precyzja Chwytu</span>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight uppercase">
                Radełkowanie Gryfu bez Poślizgu
              </h2>
              <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                Moletowanie (radełkowanie) części chwytnej gryfu wykonujemy według autorskiego wzorca krzyżowego o głębokości dostosowanej do dynamicznych wyciskań. Zapewnia to maksymalne tarcie w spoconej dłoni bez nadmiernego kaleczenia skóry rąk.
              </p>
              <p className="text-zinc-500 text-xs italic font-mono">
                Zdjęcie po prawej przedstawia surowe makro struktury radełkowania wykonanego bezpośrednio na naszej frezarce i tokarce Haas bez retuszu graficznego. Zaufanie budowane na faktach.
              </p>
            </motion.div>

            {/* Parallax inspection box */}
            <div className="relative aspect-square rounded-md bg-zinc-900/60 border border-zinc-800 overflow-hidden flex items-center justify-center">
              <motion.div 
                style={{ scale, opacity }} 
                className="w-full h-full relative flex items-center justify-center p-8"
              >
                {/* Simulated knurled surface pattern */}
                <div className="absolute inset-0 bg-zinc-950 opacity-40" />
                <div className="w-5/6 h-5/6 border border-zinc-700/60 rounded relative overflow-hidden bg-zinc-900 flex items-center justify-center shadow-2xl">
                  {/* Crosshatch SVG texture */}
                  <svg width="100%" height="100%" className="opacity-20 text-white absolute inset-0">
                    <pattern id="knurled" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 0,10 L 20,10 M 10,0 L 10,20 M 0,0 L 20,20 M 0,20 L 20,0" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#knurled)" />
                  </svg>
                  <div className="relative text-center p-6 bg-zinc-950/80 rounded-sm border border-zinc-800/80 backdrop-blur max-w-[200px]">
                    <Zap className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">POWIĘKSZENIE MAKRO</span>
                    <span className="text-white text-xs font-bold mt-1 block">Radełkowanie 1.2 mm</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Przedziały wagowe i stojaki */}
        <section className="py-20 max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Text description */}
            <div className="space-y-4 lg:col-span-1">
              <h2 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-white uppercase">
                Dostępne Wagomiary i Akcesoria
              </h2>
              <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                Produkujemy hantle stałe w skoku co 2.5 kg lub 5 kg, od 5 kg aż do 70 kg. Do zestawu oferujemy wygłuszone, trzyrzędowe stojaki stalowe pokryte lakierem proszkowym.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCopyCatalog}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-wider hover:text-orange-500 group"
                >
                  <span>{copiedCatalog ? "Skopiowano e-mail do schowka!" : "Pobierz katalog i cennik"}</span>
                  {copiedCatalog ? <Check className="w-4 h-4 text-brand-orange" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>

            {/* Weights grid */}
            <div className="lg:col-span-2 bg-zinc-900/40 rounded-md p-6 md:p-8 border border-zinc-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-1.5">
                <Grid className="w-4 h-4" />
                <span>Dostępne wersje wagowe (skalowane co 5 kg)</span>
              </h3>
              
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {dumbbellRange.map((w) => (
                  <div 
                    key={w} 
                    className="p-3 bg-zinc-950 border border-zinc-800 rounded-sm text-center hover:border-brand-orange/50 transition-colors group cursor-default shadow-sm"
                  >
                    <div className="font-mono text-lg font-black text-white group-hover:text-brand-orange transition-colors">{w}</div>
                    <div className="text-[9px] text-zinc-500 font-bold font-mono">KG</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-sm bg-zinc-950/60 border border-zinc-850 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-200">Indywidualna modyfikacja:</span> Na życzenie grawerujemy logo klubu lub numerację na stali przed wulkanizacją. Zapytaj o szczegóły w dziale B2B.
              </div>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
}
