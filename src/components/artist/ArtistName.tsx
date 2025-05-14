
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
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };
  
  // Animation variants for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        mass: 1
      }
    }
  };
  
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from(name).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className={cn(
            'inline-block',
            letter === ' ' ? 'mr-3' : ''
          )}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default ArtistName;
