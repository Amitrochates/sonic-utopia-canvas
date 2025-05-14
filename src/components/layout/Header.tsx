
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
        'fixed top-0 left-0 w-full z-50 p-4 transition-opacity duration-500',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-center">
        <div className="flex-1"></div>
        <h1 className="text-white text-2xl font-bold flex-1 text-center">AADHYARAJA</h1>
        <div className="flex-1"></div>
      </div>
    </motion.header>
  );
};

export default Header;
