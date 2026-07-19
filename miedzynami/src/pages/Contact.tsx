import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/layout/PageTransition';
import { MapPin, Phone, Mail, Clock, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Kontakt | Między Nami Cafe w Łazach</title>
      </Helmet>
      <div className="bg-surface min-h-screen pt-32 sm:pt-40 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1920px] mx-auto relative flex flex-col items-center justify-center">
        
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-full sm:w-1/2 lg:w-1/3 h-full bg-primary/5 rounded-none sm:rounded-l-[100px] -z-10" />

        <div className="w-full max-w-4xl">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 sm:mb-20"
          >
            <h1 className="font-headings text-5xl sm:text-6xl md:text-8xl 2xl:text-9xl font-bold text-primary mb-6 sm:mb-8 tracking-tighter leading-tight">
              Gdzie <span className="text-secondary italic">jesteśmy?</span>
            </h1>
            <p className="font-body text-primary/70 text-lg sm:text-xl 2xl:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              Zapraszamy do naszego lokalu w Łazach. Masz pytania? Chcesz zorganizować kameralne spotkanie? Skontaktuj się z nami.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-6 sm:p-10 md:p-16 2xl:p-24 rounded-[30px] sm:rounded-[40px] shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 font-body">
              
              <div className="flex items-start gap-5 sm:gap-8 group">
                <div className="text-secondary mt-1 group-hover:scale-110 transition-transform duration-500">
                  <MapPin size={32} className="sm:w-10 sm:h-10" />
                </div>
                <div>
                  <h4 className="font-headings text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary mb-2 sm:mb-3">Adres</h4>
                  <p className="text-primary/70 text-base sm:text-lg 2xl:text-xl font-light">ul. Topolowa 1, 42-450 Łazy</p>
                  <p className="text-secondary font-medium mt-1 sm:mt-2 text-xs sm:text-sm 2xl:text-base tracking-widest uppercase">Tuż obok Parku Wodnego</p>
                </div>
              </div>

              <div className="flex items-start gap-5 sm:gap-8 group">
                <div className="text-secondary mt-1 group-hover:scale-110 transition-transform duration-500">
                  <Clock size={32} className="sm:w-10 sm:h-10" />
                </div>
                <div>
                  <h4 className="font-headings text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary mb-2 sm:mb-3">Godziny otwarcia</h4>
                  <p className="text-primary/70 text-base sm:text-lg 2xl:text-xl font-light">Poniedziałek - Niedziela</p>
                  <p className="text-primary/50 text-xs sm:text-sm 2xl:text-base mt-1 sm:mt-2">Ze względu na zmienne godziny otwarcia w sezonie, prosimy o kontakt telefoniczny.</p>
                </div>
              </div>

              <div className="flex items-start gap-5 sm:gap-8 group">
                <div className="text-secondary mt-1 group-hover:scale-110 transition-transform duration-500">
                  <Phone size={32} className="sm:w-10 sm:h-10" />
                </div>
                <div>
                  <h4 className="font-headings text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary mb-2 sm:mb-3">Telefon</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-primary/70 text-base sm:text-lg 2xl:text-xl font-light">+48 509 778 008</span>
                    <button 
                      onClick={() => copyToClipboard('+48509778008', 'phone')}
                      className="p-2 text-primary/40 hover:text-secondary bg-primary/5 rounded-full transition-colors"
                      title="Kopiuj numer"
                    >
                      {copiedPhone ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 sm:gap-8 group">
                <div className="text-secondary mt-1 group-hover:scale-110 transition-transform duration-500">
                  <Mail size={32} className="sm:w-10 sm:h-10" />
                </div>
                <div>
                  <h4 className="font-headings text-xl sm:text-2xl 2xl:text-3xl font-bold text-primary mb-2 sm:mb-3">Email</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-primary/70 text-base sm:text-lg 2xl:text-xl font-light">cafe_miedzy_nami@op.pl</span>
                    <button 
                      onClick={() => copyToClipboard('cafe_miedzy_nami@op.pl', 'email')}
                      className="p-2 text-primary/40 hover:text-secondary bg-primary/5 rounded-full transition-colors"
                      title="Kopiuj email"
                    >
                      {copiedEmail ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
