import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Coffee, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/layout/PageTransition';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <PageTransition>
      <Helmet>
        <title>Między Nami Cafe | Kawiarnia w Łazach – Wyjątkowa Kawa i Desery</title>
      </Helmet>
      <div className="bg-surface min-h-screen">
        
        {/* Elite Immersive Hero */}
        <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              src="/images/gallery/kawa.webp" 
              alt="Cafe Między Nami Wnętrze" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image isn't loaded yet
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />
          </div>
          
          <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-center h-full pt-32 sm:pt-40">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 rounded-full glass-panel-dark text-white/90 text-[9px] md:text-[11px] font-body tracking-[0.2em] uppercase mb-6 md:mb-8">
                <Coffee size={14} className="text-secondary hidden sm:block" /> 
                <span>Kawa • Wypieki • Relaks w Łazach</span>
              </div>
              
              <h1 className="font-headings text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] 2xl:text-[9rem] font-bold text-surface mb-6 md:mb-8 leading-[1.05] md:leading-[0.95] tracking-tighter">
                Czasami po prostu <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300 italic">
                  musisz zwolnić.
                </span>
              </h1>
              
              <p className="font-body text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-surface/80 mb-10 md:mb-12 max-w-sm sm:max-w-2xl 2xl:max-w-3xl font-light leading-relaxed">
                Ucieknij od zgiełku. Tuż obok Parku Wodnego w Łazach stworzyliśmy przestrzeń, w której liczy się tylko smak rzemieślniczej kawy i chwila dla Ciebie.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <NavLink 
                  to="/galeria"
                  className="group relative inline-flex items-center justify-center gap-3 bg-secondary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-body font-bold text-xs md:text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:shadow-[0_0_60px_rgba(217,119,6,0.5)] hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Zobacz Galerię <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </NavLink>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Asymmetrical "O Nas" (About) Section */}
        <section className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 max-w-[1920px] mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            <motion.div 
              style={{ y: yParallax }}
              className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[800px] 2xl:h-[1000px] w-full rounded-[30px] md:rounded-[40px] overflow-hidden"
            >
              <img 
                src="/images/gallery/lemoniada.webp" 
                alt="Perfect Drink" 
                className="w-full h-full object-cover scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-primary/10" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 glass-panel px-6 py-5 md:px-8 md:py-6 rounded-2xl md:rounded-3xl max-w-[250px] md:max-w-xs">
                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="md:w-4 md:h-4" fill="currentColor" />)}
                  </div>
                </div>
                <p className="font-headings font-bold text-primary text-lg md:text-xl leading-tight">
                  "Najlepsza kawiarnia w mieście, idealna po basenie."
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-5 relative z-10 lg:-ml-10 xl:-ml-20">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-8 sm:p-10 md:p-16 2xl:p-20 rounded-[30px] md:rounded-[40px]"
              >
                <h2 className="font-headings text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-primary mb-6 md:mb-8 leading-tight">
                  Pomiędzy mną, <br /> a Tobą.
                </h2>
                <div className="space-y-4 md:space-y-6 font-body text-base md:text-lg 2xl:text-xl text-primary/70 leading-relaxed font-light">
                  <p>
                    <strong>Między Nami</strong> to nie jest kolejna sieciówka. To lokalna kawiarnia stworzona z myślą o społeczności Łaz i gościach pobliskiego Parku Wodnego.
                  </p>
                  <p>
                    Wierzymy w proste przyjemności: perfekcyjnie wyekstrahowane espresso, kawałek domowego ciasta, na które przepis przechodzi z pokolenia na pokolenie, i uśmiech, który wita Cię od progu.
                  </p>
                  <p>
                    Zatrzymaj się u nas. Zdejmij zegarek. Odpocznij.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
