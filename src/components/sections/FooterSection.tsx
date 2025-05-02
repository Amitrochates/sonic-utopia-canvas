
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  imageSrc: string;
  className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  imageSrc,
  className 
}) => {
  return (
    <motion.div 
      className={cn(
        'h-screen w-full relative flex items-center justify-center bg-black',
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />
      
      <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center space-y-8 z-20">
        <img 
          src={imageSrc} 
          alt="Footer Art" 
          className="w-full max-w-4xl object-contain"
        />
        
        <div className="text-center mt-8">
          <p className="text-white opacity-60 text-sm mt-8">
            © {new Date().getFullYear()} AADHYARAJA. All Rights Reserved.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterSection;
