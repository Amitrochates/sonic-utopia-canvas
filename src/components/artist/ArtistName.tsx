
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Vortex } from '../ui/vortex';


interface ArtistNameProps {
  name: string;
  className?: string;
  isHeader?: boolean;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
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
        'relative flex items-center justify-center text-artist-light',
        isHeader 
          ? 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full text-center' 
          : 'w-full z-10',
        className
      )}
      initial={isHeader ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={isHeader ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
    >
      {/* Only render Vortex when NOT in header mode */}
      {!isHeader && (
        <div className="absolute inset-0 -z-10">
          <Vortex className="opacity-100" />
        </div>
      )}
      
      <div className={cn(
        'text-center',
        isHeader ? 'w-full mx-auto' : ''
      )}>
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              'inline-block relative',
              'font-display tracking-wider',
              isHeader ? 'text-3xl md:text-4xl' : 'text-6xl md:text-8xl lg:text-9xl',
              char === ' ' ? 'mx-2' : ''
            )}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {char}
            <span 
              className={cn(
                "absolute top-0 left-0 w-full h-full animate-glitter opacity-0",
                "mix-blend-overlay" // Use Tailwind class instead of style
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
export default ArtistName;
