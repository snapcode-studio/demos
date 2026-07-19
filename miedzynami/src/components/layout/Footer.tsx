import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram as Instagram, FaFacebook as Facebook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-surface py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & About */}
        <div className="space-y-4">
          <h3 className="font-headings text-2xl font-bold tracking-wide text-secondary">Cafe Między Nami</h3>
          <p className="font-body text-surface/80 max-w-sm">
            Twoje nowe ulubione miejsce w Łazach. Kawa, domowe ciasto i pyszne śniadania tuż przy basenie. Wpadnij na chwilę relaksu.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-headings text-xl font-bold text-surface">Kontakt</h4>
          <ul className="space-y-3 font-body text-surface/80">
            <li className="flex items-start gap-3">
              <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
              <span>ul. Topolowa 1<br/>42-450 Łazy<br/><span className="text-sm italic opacity-80">(Tuż obok Parku Wodnego)</span></span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-secondary flex-shrink-0" size={20} />
              <a href="tel:+48509778008" className="hover:text-secondary transition-colors">+48 509 778 008</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-secondary flex-shrink-0" size={20} />
              <a href="mailto:cafe_miedzy_nami@op.pl" className="hover:text-secondary transition-colors">cafe_miedzy_nami@op.pl</a>
            </li>
          </ul>
        </div>

        {/* Links & Socials */}
        <div className="space-y-4">
          <h4 className="font-headings text-xl font-bold text-surface">Na Skróty</h4>
          <ul className="space-y-2 font-body text-surface/80">
            <li><NavLink to="/menu" className="hover:text-secondary transition-colors">Menu</NavLink></li>
            <li><NavLink to="/galeria" className="hover:text-secondary transition-colors">Galeria</NavLink></li>
            <li><NavLink to="/kontakt" className="hover:text-secondary transition-colors">Kontakt</NavLink></li>
          </ul>
          
          <div className="pt-4 flex gap-4">
            <a href="#" className="bg-surface/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-surface/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
              <Instagram size={20} />
            </a>
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-surface/20 text-center font-body text-sm text-surface/60">
        <p>&copy; {new Date().getFullYear()} Cafe Między Nami (Wioleta Szulc). Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};

export default Footer;
