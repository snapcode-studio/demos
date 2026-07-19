import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Flame, Timer, MapPin, Clock, Phone, AlertCircle, Percent } from 'lucide-react';
import { MagneticButton } from './components/MagneticButton';
import { SpotlightCard } from './components/SpotlightCard';
import { menuCategories, pizzas, burgers, casseroles, drinks, promotions, zones } from './data/menu';

function App() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const copyPhoneNumber = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('722291818');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl italic tracking-widest text-textMuted mb-8"
            >
              PIWNICA
            </motion.div>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" 
            alt="Pizza" 
            className="w-full h-full object-cover object-center filter brightness-75 contrast-125"
          />
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-10 text-center flex flex-col items-center px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight font-sans mb-6"
          >
            Piwnica Pizza<br />
            <span className="text-gradient font-serif italic font-medium">w Łazach.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-textMuted max-w-2xl mb-12"
          >
            Szeroki wybór aż 28 rodzajów pizzy z rzemieślniczego ciasta, gorące burgery i zapiekanki z dowozem pod same drzwi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, type: 'spring' }}
            className="relative"
          >
            <MagneticButton className="group" onClick={copyPhoneNumber}>
              <Phone size={18} className="group-hover:animate-pulse" />
              <span>{copied ? 'Skopiowano numer!' : 'Zamów Teraz (722 291 818)'}</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Promotions & USP Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpotlightCard className="lg:col-span-2 bg-gradient-to-br from-surface to-[#ff3300]/10 border-primary/20" delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <Percent size={28} className="text-primary" />
              <h3 className="text-2xl font-serif font-bold text-white">Promocje Sezonowe</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {promotions.map(promo => (
                <div key={promo.day} className="bg-background/50 rounded-xl p-4 border border-white/5">
                  <div className="text-primary font-bold text-sm tracking-wider uppercase mb-1">{promo.day}</div>
                  <div className="font-semibold mb-2">{promo.title}</div>
                  <div className="text-xs text-textMuted leading-relaxed">{promo.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white">Ruch to zdrowie:</span>
                <p className="text-xs text-textMuted mt-1">Odbiór własny we wt/śr/czw = tańsza duża pizza w cenie małej!</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-white">Karta Smakosza:</span>
                <p className="text-xs text-textMuted mt-1">70 zł = 1 punkt. Zbieraj darmowe pizze!</p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard delay={0.2}>
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6">
              <Timer size={28} className="text-primary" />
            </div>
            <h3 className="text-2xl font-medium mb-3">Szybki Dowóz</h3>
            <p className="text-textMuted text-lg">Pyszne jedzenie gorące i zawsze na czas. Obsługujemy Łazy, Niegowonice i inne okoliczne miejscowości.</p>
          </SpotlightCard>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-20" id="menu">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold">Pełne <span className="text-gradient">Menu</span></h2>
          <p className="text-textMuted mt-4 max-w-xl mx-auto">Każda pizza zawiera: sos pomidorowy (ostry w wybranych pizzach), ser mozzarella i oregano.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {menuCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category ? 'text-white' : 'text-textMuted hover:text-white'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* PIZZE */}
            {activeCategory === 'Pizze' && (
              <motion.div key="pizze" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-end gap-12 px-4 mb-4 text-sm font-semibold text-textMuted uppercase tracking-wider">
                  <span className="w-16 text-center">ø 30cm</span>
                  <span className="w-16 text-center">ø 40cm</span>
                </div>
                <div className="space-y-4">
                  {pizzas.map((item) => (
                    <div key={item.id} className="group flex justify-between items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <span className="text-textMuted text-sm">{item.id}.</span>
                          <h4 className={`text-xl ${item.isPremium ? 'font-serif italic text-white' : 'font-medium group-hover:text-primary transition-colors'}`}>
                            {item.name}
                          </h4>
                          {item.isSpicy && <Flame size={14} className="text-primary" />}
                        </div>
                        <p className="text-textMuted text-sm leading-relaxed max-w-xl">{item.desc}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-8 font-medium text-lg pt-1">
                        <span className="w-12 text-right">{item.prices.small}</span>
                        <span className="w-12 text-right">{item.prices.large}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* HAMBURGERY */}
            {activeCategory === 'Hamburgery' && (
              <motion.div key="burgery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-end gap-12 px-4 mb-4 text-sm font-semibold text-textMuted uppercase tracking-wider">
                  <span className="w-20 text-center">12.5cm</span>
                  <span className="w-20 text-center">15.5cm</span>
                </div>
                <div className="space-y-4">
                  {burgers.map((item) => (
                    <div key={item.name} className="group flex justify-between items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                      <div className="flex-1">
                        <h4 className="text-xl font-medium mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                        <p className="text-textMuted text-sm leading-relaxed max-w-xl">{item.desc}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-8 font-medium text-lg pt-1">
                        <span className="w-16 text-right">{item.prices.small}</span>
                        <span className="w-16 text-right">{item.prices.large}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ZAPIEKANKI */}
            {activeCategory === 'Zapiekanki' && (
              <motion.div key="zapiekanki" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  {casseroles.map((item) => (
                    <div key={item.name} className="group flex justify-between items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xl font-medium group-hover:text-primary transition-colors">{item.name}</h4>
                          {item.isSpicy && <Flame size={14} className="text-primary" />}
                        </div>
                        <p className="text-textMuted text-sm leading-relaxed max-w-xl">{item.desc}</p>
                      </div>
                      <div className="flex-shrink-0 text-xl font-medium">{item.price}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* DODATKI */}
            {activeCategory === 'Dodatki & Napoje' && (
              <motion.div key="dodatki" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <div className="space-y-8">
                  {drinks.map((item) => (
                    <div key={item.name} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02]">
                      <div>
                        <h4 className="text-lg font-medium">{item.name}</h4>
                        <p className="text-textMuted text-sm">{item.desc}</p>
                      </div>
                      <div className="text-lg font-medium">{item.price}</div>
                    </div>
                  ))}
                  <div className="p-6 rounded-2xl border border-white/10 bg-surface">
                    <h4 className="text-xl font-serif mb-4">Ceny Składników Dodatkowych</h4>
                    <p className="text-textMuted text-sm mb-4">Szczegóły grup cenowych i dokładne rozpiski znajdziesz dzwoniąc do lokalu lub na ulotce. Opakowania są wliczone w cenę.</p>
                    <ul className="text-sm space-y-2 text-textMuted">
                      <li><strong className="text-white">Grupa I:</strong> pieczarki, kukurydza, ogórek, oliwki, pomidor...</li>
                      <li><strong className="text-white">Grupa II:</strong> szynka, salami, boczek, ser feta, góralski...</li>
                      <li><strong className="text-white">Grupa III:</strong> kurczak, tuńczyk.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* Delivery & Info Footer */}
      <footer className="border-t border-white/10 bg-surface relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Kontakt */}
            <div>
              <h3 className="text-3xl font-serif font-semibold mb-6">Zamów<br/><span className="text-gradient">Teraz</span></h3>
              <p className="text-textMuted mb-8">Zadzwoń do nas, a nasza załoga dowiezie Twoje zamówienie tak szybko, jak to możliwe.</p>
              <div className="space-y-4">
                <button onClick={copyPhoneNumber} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors w-full sm:w-auto font-medium cursor-pointer">
                  <Phone size={18} /> {copied ? 'Skopiowano!' : '722 291 818'}
                </button>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 w-full sm:w-auto">
                  <MapPin size={18} className="text-primary" />
                  <span className="font-medium text-sm">ul. Kościuszki 8, 42-450 Łazy</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-primary" />
                  <span className="font-medium">Godziny Pracy</span>
                </div>
                <div className="text-sm text-textMuted space-y-2">
                  <div className="flex justify-between"><span>Poniedziałek:</span> <span className="text-primary">Nieczynne</span></div>
                  <div className="flex justify-between"><span>Wtorek - Czwartek:</span> <span className="text-white">14:00 - 21:00</span></div>
                  <div className="flex justify-between"><span>Piątek - Sobota:</span> <span className="text-white">14:00 - 22:00</span></div>
                  <div className="flex justify-between"><span>Niedziela:</span> <span className="text-white">16:00 - 21:00</span></div>
                </div>
              </div>
            </div>

            {/* Tabela Dowozów */}
            <div className="bg-background/50 rounded-3xl p-8 border border-white/5 lg:col-span-1">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2"><MapPin className="text-primary" size={20} /> Tabela Dowozów</h3>
              <div className="space-y-4">
                {zones.map((zone, idx) => (
                  <div key={idx} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05]">
                    <div className="font-semibold text-white mb-2">{zone.name}</div>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {zone.limit.split('|').map((cond, i) => (
                        <div key={i} className="flex justify-between items-center text-textMuted border-t border-white/5 pt-1 first:border-0 first:pt-0">
                          <span className="text-primary">{cond.split('=')[0].trim()}</span>
                          <span className="font-medium text-white">{cond.split('=')[1]?.trim() || ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ważne Info */}
            <div className="bg-background/50 rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-2"><AlertCircle className="text-primary" size={20} /> Ważne Informacje</h3>
              <ul className="space-y-4 text-xs text-textMuted leading-relaxed">
                <li>• Zamówienia na dowóz przyjmujemy max. do 20 min przed zamknięciem (odbiór własny do 10 min).</li>
                <li>• Czas dostawy jest orientacyjny i zależy od obłożenia lokalu.</li>
                <li>• Przyjmujemy zamówienia cateringowe (powyżej 5 pizz) również poza standardowymi godzinami po wcześniejszym kontakcie.</li>
                <li>• Zastrzegamy sobie prawo do odmowy przyjęcia zamówienia m.in. w przypadku przekroczenia mocy przerobowych.</li>
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <a href="https://www.facebook.com/PiwnicaPizza/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-2 transition-colors">
                  Dołącz na Facebooku!
                </a>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-textMuted">
            <div className="font-serif italic tracking-widest text-white/50">PIWNICA PIZZA</div>
            <div>&copy; 2026. Wszelkie prawa zastrzeżone.</div>
            <div>Made by <a href="https://getsnap.space" className="text-primary hover:text-white transition-colors">Snap Code Studio</a></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
