
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import CosmicGrainBackground from '../effects/CosmicGrainBackground';

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
        'h-screen w-full relative flex items-center justify-center',
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <CosmicGrainBackground density={90000} />
      </div>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      
      <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center space-y-8 z-30 relative">
        {/* Translucent glass panel behind the image */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-lg z-10"></div>
        
        {/* Main content */}
        <img 
          src={imageSrc} 
          alt="Footer Art" 
          className="w-full max-w-4xl object-contain relative z-20"
        />
        
        <div className="text-center mt-8 relative z-20">
          <motion.p 
            className="text-white opacity-80 text-sm mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            © {new Date().getFullYear()} AADHYARAJA. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterSection;
