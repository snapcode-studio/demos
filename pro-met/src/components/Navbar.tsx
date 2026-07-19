"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Cpu, Hammer, Dumbbell, Anchor, Info, Mail, Check } from "lucide-react";

interface NavbarProps {
  mode?: "light" | "dark" | "auto";
}

export default function Navbar({ mode = "auto" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const pathname = usePathname();

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

  // In Industrial mode, the entire site is dark
  const isDarkTheme = true;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "O firmie & Park Maszyn", href: "/kontakt-cnc", icon: Cpu },
    { name: "Silos Budowlany", href: "/silos-budowlany", icon: Hammer },
    { name: "Fitness Premium", href: "/silos-fitness", icon: Dumbbell },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-800 bg-zinc-950 ${scrolled ? "py-3 shadow-md" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group whitespace-nowrap">
          <span className="font-display text-xl md:text-2xl font-black tracking-tighter text-white transition-colors duration-300">
            PRO-MET
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] -mt-1 font-mono font-bold text-zinc-400 group-hover:text-brand-orange transition-colors duration-300">
            obróbka skrawaniem cnc
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-200 border border-transparent ${
                  isActive
                    ? "bg-zinc-900 text-brand-orange border-brand-orange/30 shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}

          {/* Quick Contact Buttons */}
          <div className="flex items-center gap-1.5 ml-1 pl-3 border-l border-zinc-800 transition-colors duration-300">
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.02] w-24 bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
              title="Kopiuj adres e-mail do schowka"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Mail className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{copiedEmail ? "Skopiowano" : "E-mail"}</span>
            </button>
            <button
              onClick={handleCopyPhone}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black uppercase tracking-wider bg-brand-orange text-zinc-950 hover:bg-orange-500 transition-all duration-200 shadow-md shadow-brand-orange/20 hover:scale-[1.02] whitespace-nowrap min-w-[130px]"
              title="Kopiuj numer telefonu do schowka"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5 fill-current" />}
              <span>{copiedPhone ? "Skopiowano" : "530 322 975"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleCopyEmail}
            className="p-2 rounded bg-zinc-900 text-white"
            aria-label="Kopiuj e-mail"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4" />}
          </button>
          <button
            onClick={handleCopyPhone}
            className="p-2 rounded bg-zinc-900 text-white"
            aria-label="Kopiuj numer"
          >
            {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Phone className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded transition-colors duration-200 text-white hover:bg-white/10"
            aria-label="Przełącz menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 py-6 px-6 shadow-2xl transition-all duration-300 border-t bg-zinc-950/95 border-zinc-900 text-white backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm text-base font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? "bg-zinc-900 text-brand-orange border border-zinc-800"
                      : "text-zinc-400 hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <hr className="border-zinc-800" />
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-sm font-bold uppercase tracking-wider text-center transition-all bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4" />}
                <span>{copiedEmail ? "Skopiowano E-mail!" : "Kopiuj E-mail"}</span>
              </button>
              <button
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-brand-orange text-zinc-950 font-black uppercase tracking-wider text-center hover:bg-orange-500 transition-all shadow-md shadow-brand-orange/20"
              >
                {copiedPhone ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4 fill-current" />}
                <span>{copiedPhone ? "Skopiowano!" : "Kopiuj: 530 322 975"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
