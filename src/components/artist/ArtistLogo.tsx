
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArtistLogoProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ArtistLogo: React.FC<ArtistLogoProps> = ({ 
  src, 
  alt,
  className,
  onError
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={logoRef}
      className={cn(
        'w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center',
        'animate-float',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-artist-accent opacity-20 blur-3xl rounded-full animate-pulse" />
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain relative z-10"
        onError={onError}
      />
    </motion.div>
  );
};

export default ArtistLogo;
