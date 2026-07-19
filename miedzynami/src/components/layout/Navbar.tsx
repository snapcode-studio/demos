import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';

const navLinks = [
  { name: 'Strona Główna', path: '/' },
  { name: 'Galeria', path: '/galeria' },
  { name: 'Kontakt', path: '/kontakt' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isHome = location.pathname === '/';
  const navBg = scrolled || !isHome ? 'glass-panel' : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-primary' : 'text-surface';
  const logoColor = scrolled || !isHome ? 'text-secondary' : 'text-secondary';
  const buttonBg = scrolled || !isHome ? 'bg-primary text-surface hover:bg-secondary' : 'bg-surface text-primary hover:bg-secondary hover:text-surface';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${navBg} ${scrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 max-w-[1920px] mx-auto">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 md:gap-3 group">
          <Coffee size={28} className={`md:w-8 md:h-8 ${logoColor} transition-transform duration-500 group-hover:rotate-12`} />
          <span className={`font-headings font-bold text-xl md:text-2xl tracking-wide ${textColor} transition-colors duration-500`}>
            Między Nami
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 xl:space-x-12 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`relative font-body text-[14px] xl:text-[15px] font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive ? 'text-secondary' : `${textColor} hover:text-secondary opacity-80 hover:opacity-100`
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-secondary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <NavLink 
            to="/kontakt"
            className={`px-6 xl:px-8 py-3 rounded-full font-body font-bold text-xs xl:text-sm tracking-widest uppercase transition-all duration-500 shadow-lg ${buttonBg}`}
          >
            Skontaktuj się
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className={`${textColor} hover:text-secondary focus:outline-none p-2 transition-colors`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel absolute w-full left-0 shadow-2xl overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-center py-3 text-lg font-headings tracking-wider transition-colors ${
                      isActive ? 'text-secondary font-bold' : 'text-primary'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              <div className="pt-4 pb-2">
                <NavLink 
                  to="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-surface px-8 py-3.5 rounded-full font-body font-bold tracking-widest uppercase hover:bg-secondary transition-colors inline-block shadow-lg text-sm"
                >
                  Skontaktuj się
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
