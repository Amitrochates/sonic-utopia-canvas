
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import CosmicGrainBackground from './CosmicGrainBackground';

interface PurpleStaticBackgroundProps {
  className?: string;
}

const PurpleStaticBackground: React.FC<PurpleStaticBackgroundProps> = ({ className }) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden z-0', className)}>
      <CosmicGrainBackground />
      
      {/* Additional overlay effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-artist-purple-vivid/20 via-artist-purple/10 to-black/50"
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default PurpleStaticBackground;
