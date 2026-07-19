import { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [flarePos, setFlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Magnetic pull
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });

    // Flare position (percentage)
    const flareX = ((clientX - left) / width) * 100;
    const flareY = ((clientY - top) / height) * 100;
    setFlarePos({ x: flareX, y: flareY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden px-8 py-4 rounded-full font-semibold border border-white/10 bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-shadow duration-300 ${isHovered ? 'shadow-[0_15px_40px_rgba(255,85,0,0.2)]' : ''} ${className}`}
      {...props}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 transition-opacity duration-300 z-0"
        style={{ opacity: isHovered ? 0.9 : 0 }}
      />
      <div
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${flarePos.x}% ${flarePos.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }}
      />
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
