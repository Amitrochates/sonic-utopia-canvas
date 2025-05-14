
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArtistNameProps {
  name: string;
  className?: string;
  isHeader?: boolean;
  variant?: 'default' | 'large' | 'small';
}

const ArtistName: React.FC<ArtistNameProps> = ({ 
  name,
  className,
  isHeader = false,
  variant = 'default'
}) => {
  // Font size class based on variant
  const sizeClass = {
    'default': 'text-4xl md:text-6xl lg:text-8xl',
    'large': 'text-5xl md:text-7xl lg:text-9xl',
    'small': 'text-2xl md:text-3xl'
  }[variant];
  
  return (
    <motion.h1
      className={cn(
        sizeClass,
        'font-extrabold tracking-wider text-white',
        isHeader ? 'mb-0' : 'mb-8',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {name}
    </motion.h1>
  );
};

export default ArtistName;
