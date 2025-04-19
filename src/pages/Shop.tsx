
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <motion.h1
        className="text-6xl md:text-8xl font-display tracking-wider mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        SHOP
      </motion.h1>
      
      <motion.div
        className="text-xl md:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Coming Soon
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12"
      >
        <Link 
          to="/" 
          className="px-8 py-3 bg-artist-secondary text-white font-bold rounded-md hover:bg-artist-accent transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ShopPage;
