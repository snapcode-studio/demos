"use client";

import React, { useState, useRef } from "react";
import { 
  Phone, Mail, MapPin, CheckCircle, 
  Settings, Cpu, Ruler, ShieldAlert, ArrowRight, CornerDownRight, Check
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface MachineSpec {
  name: string;
  xyz: string;
  tolerance: string;
  purpose: string;
}

export default function KontaktCnc() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("biuro@pro-met.com.pl");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("+48 530 322 975");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const machines: MachineSpec[] = [
    {
      name: "Tokarki CNC",
      xyz: "Szeroki zakres obróbczy",
      tolerance: "Wysoka precyzja",
      purpose: "Produkcja sworzni, gwintów, pasowań precyzyjnych i hantli.",
    },
    {
      name: "Frezarki CNC",
      xyz: "Szeroki zakres obróbczy",
      tolerance: "Wysoka precyzja",
      purpose: "Frezowanie płaszczyzn, rowków wpustowych, detali o złożonej geometrii.",
    },
    {
      name: "Tokarki Konwencjonalne",
      xyz: "Obróbka zgrubna i wielkogabarytowa",
      tolerance: "Standardowa",
      purpose: "Obróbka wałów, zawiasów toczonych z kulką.",
    },
    {
      name: "Szlifierki do Wałków i Płaszczyzn",
      xyz: "Dokładne szlifowanie",
      tolerance: "Wysoka precyzja",
      purpose: "Szlifowanie sworzni do maszyn rolniczych, ciągników i koparek.",
    },
  ];



  return (
    <PageTransition>
      {/* Title block */}
      <section className="py-12 md:py-16 bg-[#09090B] border-b border-zinc-800 grid-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange font-mono">
            Park Maszynowy & Informacje
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-white mt-2 uppercase">
            Technologia Obróbki i Kontakt
          </h1>
          <p className="text-zinc-400 mt-3 text-base max-w-2xl font-mono leading-relaxed">
            Centralne repozytorium kompetencji PRO-MET. Prezentujemy specyfikację techniczną naszych obrabiarek oraz bezpośrednie dane kontaktowe dla inwestorów.
          </p>
        </div>
      </section>

      {/* O Firmie */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-12 space-y-4">
            <h2 className="font-display text-2xl font-black text-white tracking-tighter uppercase">
              O firmie
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-none" />
            <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-4xl">
              Zajmujemy się produkcją detali ze stali węglowej oraz metali kolorowych metodą obróbki skrawaniem. Toczeniem, wierceniem, frezowaniem, szlifowaniem. Produkujemy kotwy do murłat, zawiasy toczone z kulką, sworznie do maszyn rolniczych, ciągników i koparek oraz hantle.
            </p>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-4xl">
              Wykonujemy też detale na indywidualne zamówienia według wzoru lub rysunku klienta.
              Dzięki wieloletniemu doświadczeniu możemy zagwarantować usługi najwyższej jakości.
            </p>
          </div>
        </div>
      </section>

      {/* Park Maszynowy - Bento Grid Table */}
      <section className="py-12 bg-[#09090B] border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
              Specyfikacja Parku Maszynowego CNC
            </h2>
            <p className="text-zinc-500 font-mono text-sm mt-2">
              Statyczne zestawienie wydajności obróbczej obrabiarek dla zaopatrzeniowców i konstruktorów.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {machines.map((machine, i) => (
              <div 
                key={i} 
                className="bg-zinc-950 rounded-sm p-6 border border-zinc-800 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <h3 className="font-display font-black text-lg text-white uppercase">{machine.name}</h3>
                    <Cpu className="w-5 h-5 text-brand-orange shrink-0" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Zakres Roboczy</span>
                      </div>
                      <div className="text-sm font-bold text-zinc-300 mt-1 font-mono">{machine.xyz}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Tolerancja</span>
                      </div>
                      <div className="text-sm font-bold text-brand-orange mt-1 font-mono">{machine.tolerance}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 rounded-sm p-3 border border-zinc-800 text-xs text-zinc-400 font-mono">
                  <span className="font-bold text-zinc-300">ZASTOSOWANIE:</span> {machine.purpose}
                </div>
              </div>
            ))}
          </div>

          {/* Makrofotografie bez retuszu */}
          <div className="mt-12 bg-zinc-900 rounded-sm p-6 border border-zinc-800 shadow-sm">
            <h3 className="font-display font-black uppercase text-white mb-2">Pomiary Detali / Makro</h3>
            <p className="text-xs text-zinc-500 mb-6 font-mono">
              Widoczna idealna gładkość i zgodność z chropowatością Ra bezpośrednio po zjeździe z maszyny.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="aspect-[4/3] rounded-sm bg-zinc-950 relative overflow-hidden group border border-zinc-800 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-90" />
                <div className="relative text-center p-4">
                  <div className="font-mono text-[10px] text-brand-orange tracking-widest uppercase font-bold">TOCZENIE PRECYZYJNE</div>
                  <div className="text-white text-xs font-bold mt-1">Stal C45 - Ra 1.6</div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-sm bg-zinc-950 relative overflow-hidden group border border-zinc-800 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-90" />
                <div className="relative text-center p-4">
                  <div className="font-mono text-[10px] text-brand-orange tracking-widest uppercase font-bold">FREZOWANIE PLANARNE</div>
                  <div className="text-white text-xs font-bold mt-1">Aluminium PA6 - Ra 0.8</div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-sm bg-zinc-950 relative overflow-hidden group border border-zinc-800 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-90" />
                <div className="relative text-center p-4">
                  <div className="font-mono text-[10px] text-brand-orange tracking-widest uppercase font-bold">SZLIFOWANIE WAŁKÓW</div>
                  <div className="text-white text-xs font-bold mt-1">Sworzeń 40H - Ra 0.4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt - Click-to-Call & Dane & Mapa */}
      <section className="py-16 max-w-7xl mx-auto px-6 bg-[#09090B]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Dane adresowe i telefon */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-10">
            <div className="text-center">
              <h2 className="font-display text-3xl font-black text-white tracking-tighter uppercase">Połączenie Bezpośrednie</h2>
              <p className="text-sm font-mono text-zinc-500 mt-2">Szybka ścieżka do obsługi zleceń i wycen technicznych.</p>
            </div>

            {/* Click-to-call Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-5 p-6 rounded-sm border border-zinc-800 bg-zinc-950 hover:border-brand-orange/40 transition-colors group text-left w-full"
              >
                <div className="p-5 rounded-sm bg-zinc-900 text-brand-orange group-hover:bg-brand-orange group-hover:text-zinc-950 border border-zinc-800 group-hover:border-brand-orange transition-colors duration-300">
                  {copiedPhone ? <Check className="w-7 h-7" /> : <Phone className="w-7 h-7 fill-current" />}
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Telefon Kontaktowy</div>
                  <div className="text-xl font-black text-white tracking-tighter">530 322 975</div>
                  <div className="text-[11px] font-mono flex items-center gap-1.5 mt-1.5">
                    <span className={copiedPhone ? "text-brand-orange font-bold" : "text-zinc-400 font-semibold"}>
                      {copiedPhone ? "Skopiowano do schowka!" : "KOPIUJ NUMER"}
                    </span>
                    {!copiedPhone && <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />}
                  </div>
                </div>
              </button>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-5 p-6 rounded-sm border border-zinc-800 bg-zinc-950 hover:border-brand-orange/40 transition-colors group text-left w-full"
              >
                <div className="p-5 rounded-sm bg-zinc-900 text-brand-orange group-hover:bg-brand-orange group-hover:text-zinc-950 border border-zinc-800 group-hover:border-brand-orange transition-colors duration-300">
                  {copiedEmail ? <Check className="w-7 h-7" /> : <Mail className="w-7 h-7" />}
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Adres e-mail</div>
                  <div className="text-xl font-black text-white tracking-tighter break-all">biuro@pro-met.com.pl</div>
                  <div className="text-[11px] font-mono flex items-center gap-1.5 mt-1.5">
                    <span className={copiedEmail ? "text-brand-orange font-bold" : "text-zinc-400 font-semibold"}>
                      {copiedEmail ? "Skopiowano do schowka!" : "KOPIUJ E-MAIL"}
                    </span>
                    {!copiedEmail && <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />}
                  </div>
                </div>
              </button>
            </div>

            <div className="flex items-start gap-5 p-6 md:p-8 rounded-sm border border-zinc-800 bg-zinc-900/50">
              <div className="p-5 rounded-sm bg-zinc-950 text-zinc-400 border border-zinc-800 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Adres rejestrowy i produkcja</div>
                <div className="text-base font-black text-white mt-1 uppercase">Nowe Zalesie 14</div>
                <div className="text-sm font-mono text-zinc-400 mt-1">05-332 Siennica, woj. mazowieckie</div>
                <div className="text-[10px] text-zinc-500 mt-3 font-mono border-t border-zinc-800 pt-2">
                  <span className="font-bold text-zinc-400">SERVICE_AREA:</span> Siennica, Mińsk Maz., Warszawa Wschód
                </div>
              </div>
            </div>

            {/* Lekka, zoptymalizowana mapa */}
            <div className="rounded-sm overflow-hidden border border-zinc-800 bg-zinc-950 p-5 md:p-6 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between mb-3 text-xs text-zinc-500 font-bold uppercase tracking-wider">
                <span>Współrzędne (Nowe Zalesie 14, 05-332 Siennica)</span>
                <a 
                  href="https://maps.google.com/?q=Nowe+Zalesie+14,+05-332+Siennica" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-orange-500 transition-colors font-mono"
                >
                  [OTWÓRZ MAPĘ]
                </a>
              </div>
              <iframe
                title="Mapa dojazdu PRO-MET"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.966956799015!2d21.616481177028126!3d52.091333368297746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x471eedce0e5509ab%3A0xe5102ff94a737fa5!2sNowe%20Zalesie%2014%2C%2005-332%20Siennica!5e0!3m2!1spl!2spl!4v1717326000000!5m2!1spl!2spl"
                className="w-full h-[220px] rounded-sm border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
