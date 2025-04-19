
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  speed?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className,
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.7,
  speed = 0.2
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden',
        className
      )}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat h-[120%]"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          
          {overlay && (
            <div 
              className="absolute inset-0 bg-black" 
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
