"use client";

import React, { useState } from "react";
import { 
  FileText, Mail, ShieldCheck, HelpCircle, 
  ArrowRight, Download, Sliders, Layers, Check 
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface AnchorSpec {
  size: string;
  lengths: string;
  weightPer100mm: number;
  tensionLoad: number; // in kN
  steelGrade: string;
  zincType: string;
}

interface HingeSpec {
  size: string;
  length: string;
  weight: number; // kg
  ballBearing: string;
  purpose: string;
}

export default function SilosBudowlany() {
  const [activeTab, setActiveTab] = useState<"anchors" | "hinges">("anchors");

  // Configurator state
  const [selectedProduct, setSelectedProduct] = useState<"anchor" | "hinge">("anchor");
  const [diameter, setDiameter] = useState("M16");
  const [length, setLength] = useState(400);
  const [quantity, setQuantity] = useState(500);
  const [zinc, setZinc] = useState("ocynk");
  const [copied, setCopied] = useState(false);

  const anchorSpecs: AnchorSpec[] = [
    { size: "M12", lengths: "200 - 400 mm", weightPer100mm: 0.09, tensionLoad: 24.4, steelGrade: "S235JR", zincType: "Galwaniczny / Ogniowy" },
    { size: "M14", lengths: "250 - 450 mm", weightPer100mm: 0.12, tensionLoad: 33.5, steelGrade: "S235JR", zincType: "Galwaniczny / Ogniowy" },
    { size: "M16", lengths: "250 - 600 mm", weightPer100mm: 0.16, tensionLoad: 45.7, steelGrade: "S235JR", zincType: "Galwaniczny / Ogniowy" },
    { size: "M20", lengths: "300 - 800 mm", weightPer100mm: 0.25, tensionLoad: 71.4, steelGrade: "S235JR", zincType: "Galwaniczny / Ogniowy" },
    { size: "M24", lengths: "400 - 1000 mm", weightPer100mm: 0.36, tensionLoad: 104.0, steelGrade: "S235JR", zincType: "Galwaniczny / Ogniowy" },
  ];

  const hingeSpecs: HingeSpec[] = [
    { size: "Ø 16 mm", length: "60 - 80 mm", weight: 0.12, ballBearing: "Nie", purpose: "Lekkie bramki, furtki ogrodzeniowe" },
    { size: "Ø 20 mm", length: "80 - 100 mm", weight: 0.24, ballBearing: "Nie", purpose: "Drzwi garażowe, średnie bramy skrzydłowe" },
    { size: "Ø 30 mm", length: "100 - 120 mm", weight: 0.65, ballBearing: "Tak (Kulka łożyskowa)", purpose: "Ciężkie bramy skrzydłowe posesyjne" },
    { size: "Ø 40 mm", length: "120 - 160 mm", weight: 1.55, ballBearing: "Tak (Kulka łożyskowa)", purpose: "Bramy wjazdowe magazynów, wrota" },
    { size: "Ø 50 mm", length: "150 - 200 mm", weight: 3.10, ballBearing: "Tak (Kulka łożyskowa)", purpose: "Ekstremalnie ciężkie wrota przemysłowe" },
  ];

  // Dynamic calculations for configurator
  const getCalculatedWeight = () => {
    if (selectedProduct === "anchor") {
      const spec = anchorSpecs.find(s => s.size === diameter) || anchorSpecs[2];
      return ((spec.weightPer100mm * length) / 100 * quantity).toFixed(1);
    } else {
      const cleanSize = diameter.replace("Ø ", "").replace(" mm", "");
      const spec = hingeSpecs.find(s => s.size.includes(cleanSize)) || hingeSpecs[2];
      return (spec.weight * quantity).toFixed(1);
    }
  };

  const handleCopyQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const productText = selectedProduct === "anchor" ? "Kotwy do murłat" : "Zawiasy toczone";
    const specsText = selectedProduct === "anchor"
      ? `Średnica: ${diameter}, Długość: ${length} mm, Wykończenie: ${zinc === "ocynk" ? "Ocynk ogniowy/galwaniczny" : "Surowa stal"}`
      : `Średnica: ${diameter}, Łożyskowanie kulkowe: ${diameter === "Ø 30" || diameter === "Ø 40" || diameter === "Ø 50" ? "Tak" : "Nie"}`;

    const textToCopy = `WYŚLIJ NA ADRES: biuro@pro-met.com.pl

Zapytanie o wycenę hurtową - ${productText}

Dzień dobry,
Chciałbym zapytać o wycenę hurtową dla następującego asortymentu:
- Produkt: ${productText}
- Parametry: ${specsText}
- Nakład/Ilość: ${quantity} sztuk
- Szacowana masa łączna: ~${getCalculatedWeight()} kg

Proszę o przygotowanie oferty cenowej.
Moje dane kontaktowe: 
[Wpisz tutaj swoje imię / nazwę firmy i telefon]`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <PageTransition>
      {/* Title block */}
      <section className="py-12 md:py-16 bg-[#09090B] border-b border-zinc-800 grid-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange font-mono">
            Silos Budowlany
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-white mt-2 uppercase">
            Kotwy do Murłat & Zawiasy Toczone
          </h1>
          <p className="text-zinc-400 mt-3 text-base max-w-2xl font-mono leading-relaxed">
            Normatywne wyroby stalowe z certyfikowanej stali S235JR dla budownictwa kubaturowego i deweloperów. Bezpośrednia dystrybucja hurtowa i detaliczna.
          </p>
        </div>
      </section>

      {/* Uwiarygodnienie i Certyfikaty */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-12 bg-zinc-900 text-white rounded-sm p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-zinc-800">
            <div className="absolute inset-0 grid-bg-dark opacity-10" />
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange font-mono">PRO-MET</span>
              <h3 className="font-display text-xl font-black tracking-tighter text-white mt-2 uppercase">Dostawy Paletowe & Logistyka</h3>
              <p className="text-xs text-zinc-400 mt-3 font-mono leading-relaxed">
                Zamówienia seryjne oraz hurtowe dostarczamy transportem własnym lub ubezpieczonymi przesyłkami paletowymi na terenie całego kraju. 
              </p>
              <ul className="text-xs text-zinc-400 font-mono space-y-2 mt-4 list-disc pl-4">
                <li>Odbiorcami są zarówno duże składy budowlane, deweloperzy jak i indywidualni odbiorcy.</li>
                <li>Zabezpieczenie przed korozją w transporcie</li>
                <li>Możliwość cynkowania (również ocynkowane)</li>
              </ul>
            </div>
            <div className="relative z-10 text-xs text-zinc-500 font-mono mt-6 pt-4 border-t border-zinc-800 font-bold uppercase">
              Dystrybucja: PRO-MET
            </div>
          </div>
        </div>
      </section>

      {/* Tabele techniczne - Bento Grid Style */}
      <section className="py-12 bg-[#09090B] border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">Katalog Techniczny i Nośności</h2>
              <p className="text-zinc-500 font-mono text-xs mt-2">Interaktywna specyfikacja wymiarowa wyrobów stalowych.</p>
            </div>
            <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-sm border border-zinc-800 shrink-0">
              <button
                onClick={() => setActiveTab("anchors")}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "anchors"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Kotwy do Murłat
              </button>
              <button
                onClick={() => setActiveTab("hinges")}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "hinges"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Zawiasy Toczone
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800 shadow-sm">
            {activeTab === "anchors" ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-brand-orange text-[10px] font-bold uppercase tracking-wider font-mono">
                      <th className="px-6 py-4">Rozmiar Gwintu</th>
                      <th className="px-6 py-4">Zakres Długości (L)</th>
                      <th className="px-6 py-4">Masa (kg / 100mm)</th>
                      <th className="px-6 py-4">Zalecana nośność (kN)</th>
                      <th className="px-6 py-4">Gatunek Stali</th>
                      <th className="px-6 py-4">Zabezpieczenie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-sm text-zinc-400">
                    {anchorSpecs.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-white font-mono">{spec.size}</td>
                        <td className="px-6 py-4 font-mono text-zinc-300">{spec.lengths}</td>
                        <td className="px-6 py-4 font-mono text-zinc-500">{spec.weightPer100mm} kg</td>
                        <td className="px-6 py-4 font-mono text-brand-orange font-bold">{spec.tensionLoad} kN <span className="text-zinc-600">(~{Math.round(spec.tensionLoad * 101.97)} kg)</span></td>
                        <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-sm bg-zinc-800 font-bold font-mono text-xs text-white border border-zinc-700">{spec.steelGrade}</span></td>
                        <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{spec.zincType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800 text-brand-orange text-[10px] font-bold uppercase tracking-wider font-mono">
                      <th className="px-6 py-4">Średnica Zawiasu</th>
                      <th className="px-6 py-4">Długości (H)</th>
                      <th className="px-6 py-4">Waga jednostkowa</th>
                      <th className="px-6 py-4">Łożyskowanie (Kulka)</th>
                      <th className="px-6 py-4">Rekomendowane Przeznaczenie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-sm text-zinc-400">
                    {hingeSpecs.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-white font-mono">{spec.size}</td>
                        <td className="px-6 py-4 font-mono text-zinc-300">{spec.length}</td>
                        <td className="px-6 py-4 font-mono text-zinc-500">{spec.weight} kg</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-sm text-xs font-bold border ${
                            spec.ballBearing === "Tak (Kulka łożyskowa)" 
                              ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20" 
                              : "bg-zinc-900 text-zinc-500 border-zinc-800"
                          }`}>
                            {spec.ballBearing}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{spec.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Konfigurator hurtowy - mailto client-side generation */}
      <section className="py-16 max-w-7xl mx-auto px-6 bg-[#09090B]">
        <div className="bg-zinc-950 text-white rounded-sm p-6 md:p-10 border border-zinc-800 shadow-2xl relative overflow-hidden hover:border-brand-orange/30 transition-colors duration-500">
          <div className="absolute inset-0 grid-bg-dark opacity-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Col - Configurator form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange font-mono">Błyskawiczne Zapytanie B2B</span>
                <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter mt-2 text-white">
                  Konfigurator Wyceny Hurtowej
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-2">
                  Skonfiguruj parametry wyrobów stalowych, a system automatycznie przygotuje treść wiadomości e-mail do wyceny hurtowej.
                </p>
              </div>

              {/* Selector */}
              <div className="flex gap-4 w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct("anchor");
                    setDiameter("M16");
                    setLength(400);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedProduct === "anchor" ? "bg-brand-orange text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Kotwy do murłat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct("hinge");
                    setDiameter("Ø 30");
                    setLength(120);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedProduct === "hinge" ? "bg-brand-orange text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Zawiasy toczone
                </button>
              </div>

              {/* Sliders and fields */}
              <div className="space-y-5">
                {/* Diameter */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Średnica Gwintu / Zawiasu
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct === "anchor" ? ["M12", "M14", "M16", "M20", "M24"] : ["Ø 16", "Ø 20", "Ø 30", "Ø 40", "Ø 50"]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiameter(d)}
                        className={`px-3.5 py-2 rounded-sm text-xs font-mono font-bold transition-all ${
                          diameter === d
                            ? "bg-white text-zinc-950"
                            : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length Slider (Anchors only) */}
                {selectedProduct === "anchor" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                        Długość Kotwy (L)
                      </label>
                      <span className="text-sm font-mono font-bold text-white">{length} mm</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={1000}
                      step={50}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full accent-brand-orange bg-zinc-900"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-1">
                      <span>200 mm</span>
                      <span>600 mm</span>
                      <span>1000 mm</span>
                    </div>
                  </div>
                )}

                {/* Quantity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                      Szacowany Nakład (Ilość)
                    </label>
                    <span className="text-sm font-mono font-bold text-white">{quantity} szt.</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full accent-brand-orange bg-zinc-900"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-1">
                    <span>100 szt.</span>
                    <span>1500 szt.</span>
                    <span>3000 szt.</span>
                  </div>
                </div>

                {/* Finishing (Anchors only) */}
                {selectedProduct === "anchor" && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Wykończenie Powierzchni
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="zinc"
                          checked={zinc === "ocynk"}
                          onChange={() => setZinc("ocynk")}
                          className="accent-brand-orange"
                        />
                        <span className="text-zinc-300">Ocynk (Ogniowy / Galwaniczny)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="zinc"
                          checked={zinc === "raw"}
                          onChange={() => setZinc("raw")}
                          className="accent-brand-orange"
                        />
                        <span className="text-zinc-300">Stal czarna (surowa)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col - Output preview & CTA */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-md p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">PODSUMOWANIE PROTOTYPU</div>
                
                <div className="mt-4 space-y-3.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Wybrany produkt:</span>
                    <span className="font-bold text-white">{selectedProduct === "anchor" ? "Kotwy do murłat" : "Zawiasy toczone"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Wymiary:</span>
                    <span className="font-mono font-bold text-white">
                      {diameter} {selectedProduct === "anchor" ? `x ${length} mm` : ""}
                    </span>
                  </div>
                  {selectedProduct === "anchor" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Zabezpieczenie:</span>
                      <span className="text-white">{zinc === "ocynk" ? "Ocynkowane" : "Brak (stal czarna)"}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Wolumen:</span>
                    <span className="font-mono font-bold text-white">{quantity} sztuk</span>
                  </div>
                  <hr className="border-zinc-800" />
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-zinc-500 font-semibold uppercase">Szacowana masa partii:</span>
                    <span className="text-lg font-mono font-bold text-brand-orange">~ {getCalculatedWeight()} kg</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyQuote}
                className={`w-full py-4 rounded-sm text-zinc-950 text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all shadow-lg ${
                  copied ? "bg-brand-orange hover:bg-orange-500 shadow-brand-orange/20" : "bg-brand-orange hover:bg-orange-500 hover:scale-[1.02] shadow-brand-orange/15"
                }`}
              >
                {copied ? <Check className="w-5 h-5 text-zinc-950" /> : <Mail className="w-5 h-5" />}
                <span>{copied ? "SZABLON SKOPIOWANY DO SCHOWKA!" : "KOPIUJ SZABLON WYCENY"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
