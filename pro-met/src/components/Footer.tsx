"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Shield, Clock, Info } from "lucide-react";

interface FooterProps {
  mode?: "light" | "dark" | "auto";
}

export default function Footer({ mode = "auto" }: FooterProps) {
  const pathname = usePathname();
  const isDarkTheme = true;
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

  return (
    <footer className="border-t transition-colors duration-300 bg-industrial-zinc border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand & Mission */}
          <div>
            <div className="flex flex-col mb-4 group whitespace-nowrap">
              <span className="font-display text-xl font-black tracking-tighter text-white transition-colors duration-300">
                PRO-MET
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] -mt-1 font-mono font-bold text-brand-orange">
                obróbka skrawaniem cnc
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Precyzyjna obróbka metali CNC i produkcja gotowych rozwiązań dla budownictwa, branży maszynowej oraz fitness.
            </p>
          </div>

          {/* Business Entities */}
          <div className="space-y-6">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Informacje o firmie
            </h3>
            <div className="text-sm">
              <p className="text-zinc-400 font-mono leading-relaxed mt-2 text-xs">
                Wieloletnie doświadczenie w obróbce ubytkowej metali. Gwarantujemy detale najwyższej jakości wykonane na podstawie dokumentacji klienta lub według wzoru.
              </p>
            </div>
          </div>

          {/* Contact and Location */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Szybki Kontakt
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-3 text-sm transition-colors text-left hover:text-white group w-full"
              >
                <div className="p-2 rounded-sm bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-zinc-950 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono">
                  {copiedPhone ? <span className="text-brand-orange font-bold">Skopiowano do schowka!</span> : "+48 530 322 975 (KOPIUJ)"}
                </span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-sm transition-colors text-left hover:text-white group w-full"
              >
                <div className="p-2 rounded-sm bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-zinc-950 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all font-mono">
                  {copiedEmail ? <span className="text-brand-orange font-bold">Skopiowano do schowka!</span> : "biuro@pro-met.com.pl (KOPIUJ)"}
                </span>
              </button>

              <div className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded-sm bg-zinc-900 text-zinc-500 shrink-0 border border-zinc-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold uppercase tracking-wider text-xs">
                    Nowe Zalesie 14
                  </p>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">05-332 Siennica</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-zinc-900 text-[10px] sm:text-xs flex gap-3 opacity-80 text-zinc-500">
          <div className="mt-0.5"><Info className="w-4 h-4" /></div>
          <p>
            * Zdjęcia zamieszczone na stronie mają charakter poglądowy i służą zilustrowaniu rodzaju oraz wysokiej jakości 
            świadczonych przez nas usług i produktów. Jako rzetelny, lokalny zakład produkcyjny (Nowe Zalesie 14, 05-332 Siennica), 
            skupiamy się w 100% na najwyższej precyzji obróbki i terminowości, przedkładając realne rezultaty ponad profesjonalne sesje zdjęciowe.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-zinc-500">
          <p>© {new Date().getFullYear()} PRO-MET. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Strona Główna</Link>
            <Link href="/kontakt-cnc" className="hover:underline">O firmie & Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
