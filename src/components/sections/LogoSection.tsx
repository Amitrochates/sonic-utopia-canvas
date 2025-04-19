
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import ArtistLogo from '../artist/ArtistLogo';

interface LogoSectionProps {
  logoSrc: string;
  backgroundVideoSrc?: string;
  className?: string;
}

const LogoSection: React.FC<LogoSectionProps> = ({ 
  logoSrc,
  backgroundVideoSrc,
  className 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  const [logoError, setLogoError] = useState(false);
  
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLogoError(true);
    const imgElement = e.target as HTMLImageElement;
    imgElement.onerror = null;
    imgElement.src = "/lovable-uploads/placeholder-logo.svg";
  };
  
  return (
    <motion.div
      ref={sectionRef}
      className={cn(
        'h-screen w-full relative flex items-center justify-center overflow-hidden',
        className
      )}
      style={{ opacity }}
    >
      {/* Background video if provided */}
      {backgroundVideoSrc && (
        <div className="absolute inset-0">
          <video
            src={backgroundVideoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black bg-opacity-70" />
        </div>
      )}
      
      {/* Artist Logo with animation */}
      <motion.div
        className="relative z-10"
        style={{ scale }}
      >
        <ArtistLogo 
          src={logoSrc} 
          alt="Artist Logo" 
          onError={handleLogoError}
        />
        
        <motion.div 
          className="mt-8 text-white text-2xl font-futuristic text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span>EXPLORE</span>
          <h2 className="text-4xl md:text-5xl font-display tracking-wider mt-2">UTOPIA WORLD</h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LogoSection;
