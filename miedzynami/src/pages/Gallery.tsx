import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import galleryData from '../data/galleryImages.json';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImageIndex]);

  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % galleryData.length);
  };

  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + galleryData.length) % galleryData.length);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Galeria | Między Nami Cafe w Łazach</title>
      </Helmet>
      <div className="bg-surface min-h-screen pt-32 sm:pt-40 pb-20 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-[1920px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-6 sm:gap-8">
          <div className="max-w-3xl 2xl:max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-headings text-5xl sm:text-6xl md:text-8xl 2xl:text-9xl font-bold text-primary mb-4 sm:mb-8 tracking-tighter"
            >
              Galeria
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-primary/70 text-lg sm:text-xl 2xl:text-2xl leading-relaxed font-light"
            >
              Zobacz nasze specjały. Od rzemieślniczej kawy po domowe wypieki i pożywne dania, które umilą Twój dzień.
            </motion.p>
          </div>
        </div>

        {/* Elite Masonry-like Grid using dynamic image data */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] sm:auto-rows-[300px] lg:auto-rows-[400px] gap-4 sm:gap-6 lg:gap-8"
        >
          {galleryData.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative overflow-hidden rounded-[24px] sm:rounded-[32px] group cursor-pointer ${image.span} shadow-md border border-primary/5`}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex items-center justify-center">
                <span className="text-surface font-headings tracking-widest uppercase text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Powiększ
                </span>
              </div>
              <img 
                src={image.url} 
                alt={`Kawiarnia zdjęcie ${image.id}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setSelectedImageIndex(null)}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full backdrop-blur-md"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X size={32} />
              </button>

              {/* Prev Button */}
              <button 
                className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all z-[110] bg-black/20 p-3 rounded-full backdrop-blur-md hover:scale-110"
                onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
              >
                <ChevronLeft size={36} />
              </button>

              {/* Next Button */}
              <button 
                className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all z-[110] bg-black/20 p-3 rounded-full backdrop-blur-md hover:scale-110"
                onClick={(e) => { e.stopPropagation(); showNextImage(); }}
              >
                <ChevronRight size={36} />
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-[90vw] max-h-[90vh] rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  key={selectedImageIndex} // force re-render on index change for smooth transition
                  src={galleryData[selectedImageIndex].url} 
                  alt="Powiększone zdjęcie galerii" 
                  className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-[24px] sm:rounded-[40px]"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Gallery;
