
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header 
      className={cn(
        'fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-center',
        'transition-colors duration-500 px-4 md:px-6',
        'bg-gradient-to-b from-black/80 to-black/0',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Centered Artist Name */}
      <h1 className="text-xl md:text-2xl font-extrabold tracking-wider text-white">
        AADHYARAJA
      </h1>
    </motion.header>
  );
};

export default Header;
