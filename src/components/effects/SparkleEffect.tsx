
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SparkleProps {
  className?: string;
}

// Sparkle component inspired by Aceternity UI
const SparkleEffect: React.FC<SparkleProps> = ({ className }) => {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; scale: number; opacity: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkCount = 15;
  
  const createSpark = (x: number, y: number) => {
    return {
      id: Date.now() + Math.random(),
      x: x + Math.random() * 80 - 40,
      y: y + Math.random() * 80 - 40,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.7 + Math.random() * 0.3
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Create initial sparks at random positions
    const initialSparks = Array.from({ length: sparkCount }).map(() => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      return createSpark(x, y);
    });
    
    setSparks(initialSparks);
    
    const interval = setInterval(() => {
      setSparks(prevSparks => {
        // Remove a random spark
        const sparkToRemove = Math.floor(Math.random() * prevSparks.length);
        const newSparks = [...prevSparks];
        
        // Create a new spark at a random position
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        newSparks[sparkToRemove] = createSpark(x, y);
        return newSparks;
      });
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none z-0', className)}
    >
      {sparks.map(spark => (
        <motion.div
          key={spark.id}
          className="absolute inline-flex items-center"
          style={{ 
            left: spark.x, 
            top: spark.y,
            opacity: 0
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: spark.opacity, 
            scale: spark.scale,
          }}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.8 
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="url(#sparkle-gradient)"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="sparkle-gradient" x1="2" y1="2" x2="22" y2="21.02" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#D946EF" />
                <stop offset="1" stopColor="#9b87f5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SparkleEffect;
