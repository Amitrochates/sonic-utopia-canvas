
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 z-50',
        'bg-gradient-to-b from-black/80 to-transparent',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="text-white font-graffiti text-2xl"
        >
          BACK
        </Link>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/shop"
          className="text-white font-graffiti text-2xl"
        >
          SHOP
        </Link>
      </motion.div>
    </motion.header>
  );
};

export default Header;
