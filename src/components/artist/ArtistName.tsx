
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SparkleEffect from '../effects/SparkleEffect';

interface ArtistNameProps {
  name: string;
  className?: string;
  isHeader?: boolean;
  onMouseMove?: (e: React.MouseEvent) => void;
}

const ArtistName: React.FC<ArtistNameProps> = ({ 
  name, 
  className, 
  isHeader = false,
  onMouseMove
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Split name into individual characters for the glitter effect
  const chars = name.split('');
  
  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        'relative z-20 flex items-center justify-center text-artist-light',
        isHeader ? 'fixed top-4 left-1/2 transform -translate-x-1/2' : 'w-full',
        className
      )}
      initial={isHeader ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={isHeader ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
    >
      {/* Add sparkle effect behind the text */}
      {!isHeader && <SparkleEffect className="opacity-70" />}
      
      <span className="relative z-10">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              'inline-block relative mix-blend-normal',
              'font-display tracking-wider text-white',
              isHeader ? 'text-3xl md:text-4xl' : 'text-6xl md:text-8xl lg:text-9xl',
              char === ' ' ? 'mx-2' : ''
            )}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              textShadow: isHeader ? 'none' : '0 0 15px rgba(255,255,255,0.5)'
            }}
          >
            {char}
            <span 
              className="absolute top-0 left-0 w-full h-full animate-glitter opacity-0"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                mixBlendMode: 'overlay'
              }}
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    </motion.div>
  );
};

export default ArtistName;
