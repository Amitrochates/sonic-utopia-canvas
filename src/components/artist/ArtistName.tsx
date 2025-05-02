
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  
  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        'relative z-10 flex items-center justify-center text-artist-light',
        isHeader ? 'fixed top-4 left-1/2 transform -translate-x-1/2' : 'w-full',
        className
      )}
      initial={isHeader ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={isHeader ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
    >
      <span className="relative font-display tracking-wider">
        {name.split('').map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={cn(
              'inline-block',
              isHeader ? 'text-3xl md:text-4xl' : 'text-6xl md:text-8xl lg:text-9xl',
              char === ' ' ? 'mx-2' : ''
            )}
          >
            {char}
          </span>
        ))}
      </span>
    </motion.div>
  );
};

export default ArtistName;
