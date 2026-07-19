"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Hammer, Dumbbell, Anchor, ArrowRight, Shield, Award, Settings, Phone, Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("+48 530 322 975");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
  };

  const services = [
    {
      title: "Park Maszynowy & CNC",
      description: "Precyzyjna obróbka skrawaniem stali, mosiądzu i aluminium. Indywidualna produkcja z rysunków CAD.",
      href: "/kontakt-cnc",
      icon: Cpu,
      image: "/images/hero_cnc.png",
      color: "from-zinc-800 to-zinc-900 hover:border-brand-orange/50",
      textColor: "text-brand-orange",
      size: "md:col-span-2 md:row-span-2",
      badge: "Usługi CNC & Kontakt",
    },
    {
      title: "Premium Fitness",
      description: "Hantle stałe ogumowane z litej stali węglowej. Radełkowane gryfy i rekordowa tolerancja wagowa 50g.",
      href: "/silos-fitness",
      icon: Dumbbell,
      image: "/images/rubber_dumbbell.png",
      color: "from-zinc-900 to-black hover:border-brand-orange/50",
      textColor: "text-brand-orange",
      size: "md:col-span-1 md:row-span-2",
      badge: "Sprzęt Siłowy",
      isDark: true,
    },
    {
      title: "Silos Budowlany",
      description: "Certyfikowane kotwy murłatowe ze stali S235JR i zawiasy toczone z kulką. Sprawdź nośności i poproś o wycenę.",
      href: "/silos-budowlany",
      icon: Hammer,
      image: "/images/bolts_construction.png",
      color: "from-zinc-800/50 to-zinc-900/50 hover:border-brand-orange/50",
      textColor: "text-brand-orange",
      size: "md:col-span-1 md:row-span-1",
      badge: "Dla Budownictwa",
    },

  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden grid-bg-dark bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest mb-6"
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Precyzja Bez Kompromisów</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white max-w-4xl leading-[1.05] uppercase"
          >
            Precyzja mierzona w <span className="text-brand-orange">setnych milimetra</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl font-mono leading-relaxed"
          >
            PRO-MET to rzetelny, lokalny zakład obróbki skrawaniem z Nowego Zalesia 14 (05-332 Siennica). 
            Skupiamy się na fachowej pracy, a nie wirtualnym marketingu – dlatego nasze atestowane komponenty budowlane, 
            sprzęt fitness i detale CNC bronią się wyłącznie najwyższą jakością wykonania.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt-cnc"
              className="px-8 py-4 rounded-sm bg-brand-orange text-zinc-950 font-black uppercase tracking-wider hover:bg-orange-500 transition-all duration-200 shadow-lg shadow-brand-orange/20 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Zapytaj o wycenę</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={handleCopyPhone}
              className="px-8 py-4 rounded-sm bg-zinc-900 text-white border border-zinc-800 font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all duration-200 flex items-center gap-2 hover:scale-[1.02]"
            >
              {copiedPhone ? <Check className="w-5 h-5 text-brand-orange" /> : <Phone className="w-5 h-5 text-zinc-400" />}
              <span>{copiedPhone ? "Skopiowano do schowka!" : "Kopiuj: 530 322 975"}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 w-full">
          {/* Main heading */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1] uppercase">
              Precyzja <span className="text-brand-orange">Stali.</span><br />
              Solidność <span className="text-zinc-500">Wykonania.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-mono max-w-2xl mx-auto">
              Specjalizujemy się w obróbce skrawaniem, dostarczając bezkompromisową jakość
              dla przemysłu, budownictwa i branży fitness.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
            Wydajność w 100% statyczna (SSG)
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-fr"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${service.size}`}
              >
                <Link
                  href={service.href}
                  className={`block h-full min-h-[320px] p-8 md:p-10 rounded-sm border transition-all duration-500 group overflow-hidden relative bg-gradient-to-br ${service.color} ${
                    service.isDark 
                      ? "border-zinc-800 hover:border-brand-orange/40" 
                      : "border-zinc-800 hover:border-brand-orange/40 bg-zinc-950"
                  }`}
                >
                  {service.image && (
                    <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-luminosity pointer-events-none">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill 
                        className="object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-sm ${
                        service.isDark ? "bg-white/10" : "bg-zinc-900 border border-zinc-800"
                      }`}>
                        <service.icon className={`w-8 h-8 ${service.textColor}`} />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm border ${
                        service.isDark 
                          ? "bg-white/10 text-white border-white/20" 
                          : "bg-zinc-900 text-zinc-400 border-zinc-800"
                      }`}>
                        {service.badge}
                      </span>
                    </div>

                    <div className="flex-1 mt-4">
                      <h3 className={`font-display text-2xl font-black uppercase tracking-wider mb-3 ${
                        service.isDark ? "text-white" : "text-white"
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm font-mono leading-relaxed mb-6 ${
                        service.isDark ? "text-zinc-400" : "text-zinc-400"
                      }`}>
                        {service.description}
                      </p>
                      
                      <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        service.isDark ? "text-brand-orange group-hover:text-orange-400" : "text-brand-orange group-hover:text-orange-400"
                      }`}>
                        <span>Zobacz szczegóły</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>


    </PageTransition>
  );
}
