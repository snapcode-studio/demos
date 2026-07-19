import React, { useState } from 'react';
import { Phone, Clock, MapPin, Star, Truck, Pizza, Heart, ArrowRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type MenuItem = {
  no?: string;
  name: string;
  desc: string;
  price33?: string;
  price45?: string;
  price55?: string;
  price?: string;
};

type MenuCategory = {
  title: string;
  type: 'pizza' | 'other';
  items: MenuItem[];
};

const pizzaCategories: MenuCategory[] = [
  {
    title: "Polska Klasyka Kina",
    type: "pizza",
    items: [
      { no: "1", name: "MIŚ - MARGHERITA", desc: "sos, ser, oregano", price33: "27", price45: "34", price55: "55" },
      { no: "2", name: "REJS - TRADYCYJNA", desc: "sos, ser, szynka, pieczarki", price33: "32", price45: "41", price55: "65" },
      { no: "3", name: "ZMIENNICY - SKIERNIEWICKA", desc: "sos, ser, szynka, pieczarki, cebula", price33: "34", price45: "43", price55: "70" },
      { no: "4", name: "BRUNET WIECZOROWĄ PORĄ - HAWAJSKA", desc: "sos, ser, szynka, ananas", price33: "32", price45: "41", price55: "65" },
      { no: "5", name: "NIE LUBIĘ PONIEDZIAŁKÓW - POLSKA", desc: "sos, ser, kiełbasa, ogórek konserwowy, cebula", price33: "34", price45: "43", price55: "70" },
      { no: "6", name: "ALTERNATYWY 4 - CHIŃSKA", desc: "sos, ser, wieprzowina 5 smaków, pieczarki, cebula", price33: "35", price45: "45", price55: "72" },
      { no: "7", name: "PSY - MIĘSNA", desc: "sos, ser, szynka, boczek, kiełbasa", price33: "36", price45: "46", price55: "74" },
      { no: "8", name: "POSZUKIWANY, POSZUKIWANA - SZYNKOWA", desc: "sos, ser, szynka", price33: "30", price45: "38", price55: "61" },
      { no: "9", name: "SEXMISJA", desc: "sos, ser, salami pepperoni, boczek, kabanos", price33: "36", price45: "46", price55: "74" },
      { no: "10", name: "DZIEŃ ŚWIRA", desc: "sos, ser, kabanos, szynka, ogórek konserwowy", price33: "35", price45: "45", price55: "72" },
    ]
  },
  {
    title: "Seriale - Kurczak",
    type: "pizza",
    items: [
      { no: "11", name: "CUDOWNE LATA - KURCZAKOWA", desc: "sos, ser, kurczak wędzony, majonez", price33: "33", price45: "42", price55: "67" },
      { no: "12", name: "PRZYJACIELE", desc: "sos, ser, kurczak wędzony, ananas, majonez", price33: "35", price45: "45", price55: "72" },
      { no: "13", name: "MODA NA SUKCES", desc: "sos, ser, kurczak wędzony, cebula, pieczarki", price33: "35", price45: "45", price55: "72" },
      { no: "14", name: "DYNASTIA", desc: "sos, ser, kurczak wędzony, szynka", price33: "34", price45: "43", price55: "70" },
      { no: "15", name: "DZIEŃ ZA DNIEM", desc: "sos, ser, kurczak wędzony, kukurydza, cebula czerwona", price33: "35", price45: "45", price55: "72" },
      { no: "16", name: "PRZYSTANEK ALASKA", desc: "sos, ser, kurczak wędzony, ser wędzony, papryka konserwowa, cebula czerwona", price33: "38", price45: "49", price55: "78" },
    ]
  },
  {
    title: "Musicale - Salami",
    type: "pizza",
    items: [
      { no: "17", name: "MOULIN ROUGE - SALAMI", desc: "sos, ser, salami", price33: "30", price45: "38", price55: "61" },
      { no: "18", name: "CHICAGO", desc: "sos, ser, salami, ananas", price33: "32", price45: "41", price55: "65" },
      { no: "19", name: "TAŃCZĄC W CIEMNOŚCIACH", desc: "sos, ser, salami, pieczarki", price33: "32", price45: "41", price55: "65" },
      { no: "20", name: "GRIS", desc: "sos, ser, salami, kabanos, papryka konserwowa", price33: "35", price45: "45", price55: "72" },
      { no: "21", name: "DIRTY DANCING - WĘGIERSKA", desc: "sos, ser, salami, papryka konserwowa, pieczarki", price33: "35", price45: "45", price55: "72" },
      { no: "22", name: "MAMMA MIA", desc: "sos, ser, salami, rukola, czosnek, pomidor suszony", price33: "40", price45: "51", price55: "82" },
    ]
  },
  {
    title: "Przygodowe & Gangsterskie",
    type: "pizza",
    items: [
      { no: "23", name: "PIRACI Z KARAIBÓW - MORSKA", desc: "sos, ser, krewetki, tuńczyk, surimi, oliwki czarne", price33: "40", price45: "51", price55: "82" },
      { no: "24", name: "KAPITAN NEMO", desc: "sos, ser, krewetki, surimi, papryka jalapeno", price33: "36", price45: "46", price55: "74" },
      { no: "25", name: "SZCZĘKI", desc: "sos, ser, krewetki, tuńczyk, kukurydza, majonez", price33: "39", price45: "50", price55: "80" },
      { no: "26", name: "CZŁOWIEK Z BLIZNĄ - IRLANDZKA", desc: "sos, ser, tuńczyk, szynka, pieczarki", price33: "36", price45: "46", price55: "74" },
      { no: "27", name: "DROGA DO ZATRACENIA", desc: "sos, ser, tuńczyk, kukurydza, cebula czerwona", price33: "35", price45: "45", price55: "72" },
      { no: "28", name: "RODZINA SOPRANO", desc: "sos, ser, tuńczyk, kapary, cebula czerwona", price33: "35", price45: "45", price55: "72" },
    ]
  },
  {
    title: "Karate / Kung-Fu (Ser Feta)",
    type: "pizza",
    items: [
      { no: "29", name: "WEJŚCIE SMOKA", desc: "sos, ser, ser feta, brokuły, migdały, czosnek, majonez", price33: "36", price45: "46", price55: "74" },
      { no: "30", name: "PRZYCZAJONY TYGRYS - 4 SERY", desc: "sos, ser mozzarella, ser feta, ser camembert, ser pleśniowy", price33: "37", price45: "47", price55: "76" },
      { no: "31", name: "KARATE KID", desc: "sos, ser, ser feta, rukola, szynka, pomidor suszony", price33: "40", price45: "51", price55: "82" },
    ]
  },
  {
    title: "Sensacja - Mięso",
    type: "pizza",
    items: [
      { no: "32", name: "PREDATOR - OSTRA", desc: "sos, ser, salami pepperoni, papryka jalapeno, oliwki czarne, przyprawa chili", price33: "37", price45: "47", price55: "76" },
      { no: "33", name: "RAMBO - MEKSYKAŃSKA", desc: "sos, ser, wieprzowina curry, papryka konserwowa, kukurydza, chili", price33: "37", price45: "47", price55: "76" },
      { no: "34", name: "CZŁOWIEK DEMOLKA", desc: "sos, ser, salami pepperoni, kabanos, cebula czerwona", price33: "35", price45: "45", price55: "72" },
      { no: "35", name: "KILLER", desc: "sos, ser, boczek, papryka jalapeno, czosnek, chilli", price33: "34", price45: "43", price55: "70" },
      { no: "36", name: "TAJEMNICE SAHARY - ARABSKA", desc: "sos, ser, pieczarki, cebula, kebab", price33: "35", price45: "45", price55: "72" },
      { no: "37", name: "ZABÓJCZA BROŃ", desc: "sos, ser, kebab, rukola, pomidor suszony", price33: "38", price45: "49", price55: "78" },
    ]
  },
  {
    title: "Deserowe & Wegetariańskie",
    type: "pizza",
    items: [
      { no: "38", name: "MASTERCHEF", desc: "sos, banan, biała czekolada, wiórki kokosowe", price33: "33", price45: "42", price55: "67" },
      { no: "39", name: "UGOTOWANI", desc: "sos, truskawki, biała czekolada, wiórki kokosowe", price33: "33", price45: "42", price55: "67" },
      { no: "40", name: "MROCZNE WIDMO", desc: "sos, ser, ser feta, rukola, pomidor suszony", price33: "37", price45: "47", price55: "76" },
      { no: "41", name: "ZEMSTA SITHÓW - PIECZARKOWA", desc: "sos, ser, pieczarki", price33: "29", price45: "36", price55: "59" },
      { no: "42", name: "NOWA NADZIEJA", desc: "sos, ser, pieczarki, pomidor, oliwki", price33: "33", price45: "42", price55: "67" },
      { no: "43", name: "IMPERIUM KONTRATAKUJE", desc: "sos, ser, pieczarki, pomidor, cebula", price33: "33", price45: "42", price55: "67" },
    ]
  },
  {
    title: "Nowości & Inne",
    type: "pizza",
    items: [
      { no: "44", name: "EXTRA MIĘSNA - FAMILIJNA", desc: "sos, ser, dodatkowe ciasto, szynka, boczek, kabanos, kiełbasa, kebab, salami...", price33: "54", price45: "70", price55: "-" },
      { no: "45", name: "PARMEŃSKA", desc: "sos, ser, szynka parmeńska, rukola, pomidor koktajlowy, tarty parmezan", price33: "36", price45: "46", price55: "74" },
      { no: "46", name: "CAMEMBERT", desc: "sos, ser, brokuły, camembert, kurczak wędzony, czosnek, oregano", price33: "34", price45: "43", price55: "70" },
      { no: "47", name: "CARBONARA", desc: "śmietana 30%, boczek, cebula, tarty parmezan", price33: "34", price45: "43", price55: "70" },
      { no: "48", name: "WIOSENNA - ŚNIADANIOWA", desc: "sos, ser, jajko, boczek, pomidor, szczypiorek", price33: "37", price45: "47", price55: "76" },
      { no: "49", name: "WŁASNA KOMPOZYCJA", desc: "PODSTAWA + SOS + SER + DOWOLNE SKŁADNIKI (minimum 3)", price33: "27", price45: "34", price55: "65" },
    ]
  }
];

const otherCategories: MenuCategory[] = [
  {
    title: "Przystawki",
    type: "other",
    items: [
      { name: "STRIPSY (5 szt.)", desc: "Chrupiące polędwiczki z kurczaka", price: "19,00" },
      { name: "STRIPSY (10 szt.)", desc: "Chrupiące polędwiczki z kurczaka", price: "28,00" },
      { name: "STRIPSY (15 szt.)", desc: "Chrupiące polędwiczki z kurczaka", price: "39,00" },
      { name: "ZESTAW STRIPSY", desc: "5 szt. stripsów + frytki", price: "25,00" },
      { name: "SKRZYDEŁKA (7 szt.)", desc: "Złociste skrzydełka z kurczaka", price: "19,00" },
      { name: "SKRZYDEŁKA (14 szt.)", desc: "Złociste skrzydełka z kurczaka", price: "28,00" },
      { name: "SKRZYDEŁKA (21 szt.)", desc: "Złociste skrzydełka z kurczaka", price: "36,00" },
      { name: "ZESTAW SKRZYDEŁKA", desc: "7 szt. skrzydełek + frytki", price: "25,00" },
    ]
  },
  {
    title: "Makarony & Sałatki",
    type: "other",
    items: [
      { name: "MAKARON CARBONARA", desc: "Boczek, śmietana, parmezan, czosnek (400g)", price: "25,00" },
      { name: "SZPINAKOWE TAGLIATELE", desc: "Szpinak, śmietana, ser (400g)", price: "25,00" },
      { name: "MAKARON Z BROKUŁAMI", desc: "Z kurczakiem i sosem śmietanowym (400g)", price: "27,00" },
      { name: "SAŁATKA Z TUŃCZYKIEM", desc: "Sałata lodowa, tuńczyk, jajko, cebula czerwona, kukurydza, majonez (350g)", price: "24,00" },
      { name: "SAŁATKA Z KURCZAKIEM", desc: "Sałata, pomidor, ogórek, sos czosnkowy, słonecznik, kebab, kukurydza (350g)", price: "26,00" },
      { name: "SAŁATKA GRECKA", desc: "Sałata, ser feta, oliwki, cebula, pomidor, ogórek, papryka, sos winegret (350g)", price: "23,00" },
    ]
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("537 861 768");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayPizzas = searchQuery.trim()
    ? pizzaCategories.flatMap(c => c.items).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    : pizzaCategories[activeCategory].items;

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans text-stone-900 selection:bg-red-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#F7F7F5]/90 backdrop-blur-md z-50 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2 rounded-xl">
                <Pizza className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-stone-900 leading-none">METRO</span>
                <span className="text-[9px] font-bold text-stone-400 tracking-[0.2em] uppercase mt-0.5">LUNCH BAR • PIZZA</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#menu" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest">Menu Pizzy</a>
              <a href="#inne" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest">Inne Dania</a>
              <a href="#kontakt" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest">Kontakt</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Zadzwoń i zamów</span>
                <span className="text-lg font-black text-stone-900 leading-none">537 861 768</span>
              </div>
              <button onClick={handleCopy} className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 hover:scale-105 active:scale-95">
                <Phone className="h-4 w-4" /> Zamów
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 md:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Bento Grid Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[220px]">
          
          {/* Main Hero Cell */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-1 md:col-span-4 lg:col-span-4 row-span-1 md:row-span-2 bg-stone-900 rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20 transition-opacity group-hover:opacity-40"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800 text-stone-300 font-bold text-[10px] uppercase tracking-[0.2em] border border-stone-700">
                  <MapPin className="h-3.5 w-3.5 text-red-500" /> Skierniewice
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Lunch Bar • Pizza • Drink Bar</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4 md:mb-6 tracking-tighter">
                Klasyka, <br/><span className="text-red-500">Kino i Smak.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-stone-400 mb-6 md:mb-8 leading-relaxed font-medium max-w-lg">
                Prawdziwy lunch bar i pizzeria z klimatem. Odkryj blisko 50 autorskich, filmowych kompozycji wypiekanych z pasją.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button onClick={handleCopy} className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95 w-full sm:w-auto">
                  <Phone className="h-5 w-5" /> Zadzwoń i zamów
                </button>
                <a href="#menu" className="bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  Zobacz menu
                </a>
              </div>
            </div>
          </motion.div>

          {/* Image Cell */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 rounded-[2rem] overflow-hidden relative shadow-sm border border-stone-200/60 group h-64 md:h-auto"
          >
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" 
              alt="Pizza METRO" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-black text-2xl leading-tight">Wypiekana <br/>z pasją.</h3>
            </div>
          </motion.div>

          {/* Reviews Cell */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-stone-900 rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-xl"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-black text-3xl">4.8</span>
            </div>
            <div>
              <p className="font-bold text-lg mb-1">Setki opinii</p>
              <p className="text-stone-400 text-sm font-medium">Nasza jakość i powtarzalność smaku zdobyła zaufanie mieszkańców.</p>
            </div>
          </motion.div>

          {/* Delivery Cell */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-[2rem] p-6 sm:p-8 border border-stone-200/60 flex flex-col justify-between shadow-sm group hover:border-red-200 transition-colors"
          >
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 mb-2">Błyskawiczna Dostawa</h3>
              <p className="text-stone-500 font-medium text-sm">Własna flota kurierska dowozi pizzę gorącą pod same drzwi. Omijamy korki.</p>
            </div>
          </motion.div>

          {/* Family Cell */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-[2rem] p-6 sm:p-8 border border-stone-200/60 flex flex-col justify-between shadow-sm group hover:border-red-200 transition-colors"
          >
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 mb-2">Dla Całej Rodziny</h3>
              <p className="text-stone-500 font-medium text-sm">Letni ogródek i przyjazna atmosfera dla najmłodszych. Idealnie na weekend.</p>
            </div>
          </motion.div>
        </div>

        {/* Menu Section (Bento Style) */}
        <motion.div 
          id="menu" 
          className="pt-20 scroll-mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-stone-900 tracking-tighter mb-2">Menu Pizzy</h2>
              <p className="text-stone-500 font-medium text-lg">Blisko 50 autorskich kompozycji wypiekanych z pasją.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Szukaj po nazwie lub składnikach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200/80 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/50 shadow-sm transition-all text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-stone-200/60 shadow-sm overflow-hidden">
            {/* Category Tabs */}
            <div className="flex overflow-x-auto p-4 gap-2 bg-stone-50/80 border-b border-stone-200/60 no-scrollbar items-center" style={{scrollbarWidth: 'none'}}>
              {pizzaCategories.map((category, idx) => {
                const isActive = activeCategory === idx && !searchQuery.trim();
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(idx);
                      setSearchQuery("");
                    }}
                    className={`relative whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-colors z-10 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMenuTab"
                        className="absolute inset-0 bg-red-600 rounded-full shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{category.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Menu Items Grid */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={searchQuery.trim() ? 'search' : activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8 max-h-[800px] overflow-y-auto" style={{scrollbarWidth: 'thin'}}
              >
                {displayPizzas.length > 0 ? displayPizzas.map((item, idx) => (
                  <div key={item.no || idx} className="group flex flex-col sm:flex-row justify-between items-start border-b border-stone-100 pb-6 sm:pb-8 hover:border-red-200 transition-colors gap-3 sm:gap-4">
                    <div className="pr-4 flex gap-3 sm:gap-4 w-full sm:w-auto">
                      {item.no && (
                        <span className="text-stone-300 font-black text-xl md:text-2xl group-hover:text-red-200 transition-colors w-6 sm:w-8 md:w-10 text-right shrink-0">{item.no}.</span>
                      )}
                      <div>
                        <h4 className="text-base md:text-lg font-black text-stone-900 mb-1 sm:mb-2 group-hover:text-red-600 transition-colors tracking-tight leading-tight">{item.name}</h4>
                        <p className="text-stone-500 font-medium text-xs md:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 md:gap-5 text-right shrink-0 bg-stone-50/50 p-2 md:p-3 rounded-2xl border border-stone-100/50 self-start">
                      <div className="flex flex-col items-center w-12 md:w-14">
                        <span className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">33cm</span>
                        <span className="text-sm md:text-base font-black text-stone-900 tabular-nums leading-none">{item.price33} <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase ml-0.5 small-caps">zł</span></span>
                      </div>
                      <div className="w-px h-6 sm:h-8 bg-stone-200/60"></div>
                      <div className="flex flex-col items-center w-12 md:w-14 opacity-80 sm:opacity-70 hover:opacity-100 transition-opacity">
                        <span className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">45cm</span>
                        <span className="text-sm md:text-base font-black text-stone-800 tabular-nums leading-none">{item.price45} <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase ml-0.5 small-caps">zł</span></span>
                      </div>
                      <div className="w-px h-6 sm:h-8 bg-stone-200/60"></div>
                      {item.price55 !== "-" ? (
                        <div className="flex flex-col items-center w-12 md:w-14 opacity-60 sm:opacity-50 hover:opacity-100 transition-opacity">
                          <span className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">55cm</span>
                          <span className="text-sm md:text-base font-black text-stone-800 tabular-nums leading-none">{item.price55} <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase ml-0.5 small-caps">zł</span></span>
                        </div>
                      ) : (
                        <div className="w-12 md:w-14 flex items-center justify-center text-stone-300 font-bold">-</div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="col-span-1 lg:col-span-2 py-20 text-center flex flex-col items-center justify-center">
                    <Pizza className="h-16 w-16 text-stone-200 mb-4" />
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Brak wyników</h3>
                    <p className="text-stone-500">Nie znaleźliśmy pizzy pasującej do "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Daily Specials / Drinks */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-900 rounded-[2rem] p-8 text-white flex items-center gap-6 border border-stone-800 shadow-lg group hover:border-red-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-1 text-white group-hover:text-red-400 transition-colors">Danie Dnia</h3>
                <p className="text-stone-400 text-sm font-medium leading-relaxed">Codziennie nowe pyszne danie. Zapytaj obsługę przy barze lub śledź nasz profil na FB: <span className="text-white font-bold">f/metroskierniewice</span></p>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-8 text-stone-900 flex items-center gap-6 border border-stone-200/60 shadow-sm group hover:border-red-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-1 text-stone-900 group-hover:text-red-600 transition-colors">Drink Bar & Napoje</h3>
                <p className="text-stone-500 text-sm font-medium leading-relaxed">Szeroki wybór napojów zimnych i gorących. W ofercie alkohole: zimne piwo, wódka, whisky oraz autorskie drinki.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Menu Section */}
        <motion.div 
          id="inne" 
          className="pt-20 scroll-mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-stone-900 tracking-tighter mb-2">Przystawki, Sałatki, Makarony</h2>
              <p className="text-stone-500 font-medium text-lg">Coś pysznego na mniejszy apetyt lub lekki lunch.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCategories.map((category, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] border border-stone-200/60 p-6 md:p-10 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-2xl font-black text-stone-900 mb-8 pb-4 border-b border-stone-100">{category.title}</h3>
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start group border-b border-stone-50 pb-4 last:border-0 last:pb-0 gap-3">
                      <div className="pr-2 sm:pr-4">
                        <h4 className="text-base md:text-lg font-black text-stone-900 mb-1 group-hover:text-red-600 transition-colors tracking-tight leading-tight">{item.name}</h4>
                        <p className="text-stone-500 font-medium text-xs md:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="text-right shrink-0 pt-1">
                        <span className="text-base md:text-lg font-black text-stone-900 whitespace-nowrap bg-stone-100 px-3 py-1 rounded-lg group-hover:bg-red-50 group-hover:text-red-700 transition-colors tabular-nums">{item.price} <span className="text-[10px] text-stone-500 font-bold uppercase ml-0.5 small-caps">zł</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Bento Box */}
        <motion.div 
          id="kontakt" 
          className="pt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
           <div className="bg-stone-900 rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20"></div>
             
             <div className="relative z-10 space-y-6 flex-1 text-center md:text-left w-full">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">
                 Zgłodniałeś? <br/>
                 <span className="text-stone-400">Jesteśmy gotowi.</span>
               </h2>
               <div className="flex flex-col xl:flex-row gap-4 justify-center md:justify-start">
                  <div className="bg-stone-800/50 backdrop-blur border border-stone-700 p-4 rounded-2xl flex items-center justify-center sm:justify-start gap-4">
                    <Phone className="h-6 w-6 text-red-500 shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Zamówienia na wynos</p>
                      <p className="text-xl sm:text-2xl font-black text-white">537 861 768</p>
                    </div>
                  </div>
                  <div className="bg-stone-800/50 backdrop-blur border border-stone-700 p-4 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start xl:items-center gap-4">
                    <Clock className="h-6 w-6 text-red-500 shrink-0 hidden sm:block" />
                    <div className="text-left text-xs sm:text-sm font-medium grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                      <span className="text-stone-400 font-bold">Pon – Czw:</span> <span className="text-white">11:00 – 20:00</span>
                      <span className="text-stone-400 font-bold">Piątek:</span> <span className="text-white">11:00 – 23:00</span>
                      <span className="text-stone-400 font-bold">Sobota:</span> <span className="text-white">12:00 – 23:00</span>
                      <span className="text-stone-400 font-bold">Niedziela:</span> <span className="text-white">12:00 – 22:00</span>
                    </div>
                  </div>
               </div>
             </div>
             
             <div className="relative z-10 shrink-0 flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto">
               <button onClick={handleCopy} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-full font-black text-lg sm:text-xl transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                 <Phone className="h-5 sm:h-6 w-5 sm:w-6" /> Zadzwoń teraz
               </button>
               <a href="https://maps.google.com/?q=METRO+Skierniewice,+Aleja+Niepodległości+19A,+Skierniewice" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 px-8 sm:px-10 py-4 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-105 active:scale-95">
                 <MapPin className="h-5 w-5 text-red-500" /> Jak dojechać
               </a>
             </div>
           </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="bg-[#F7F7F5] py-8 border-t border-stone-200/60 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Pizza className="h-5 w-5 text-stone-400" />
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter text-stone-400 leading-none">METRO</span>
              <span className="text-[7px] font-bold text-stone-400/50 tracking-[0.2em] uppercase mt-0.5">LUNCH BAR • PIZZA</span>
            </div>
          </div>
          <p className="text-stone-500 font-medium text-sm">
            © {new Date().getFullYear()} METRO Lunch Bar & Pizzeria. Aleja Niepodległości 19A, 96-100 Skierniewice.
          </p>
        </div>
      </footer>

      {/* Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border border-stone-700"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Skopiowano numer!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
