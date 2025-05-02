
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CosmicGrainBackgroundProps {
  className?: string;
  density?: number;
  speed?: number;
}

const CosmicGrainBackground: React.FC<CosmicGrainBackgroundProps> = ({ 
  className,
  density = 75000, // Higher number = smaller and more dense grains
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let animationId: number;
    let frame = 0;
    
    // Create cosmic grain effect with silver/pink/blue colors
    const drawGrains = () => {
      frame++;
      
      // Clear canvas with slight opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width * 0.8
      );
      
      gradient.addColorStop(0, 'rgba(155, 135, 245, 0.05)'); // Purple center
      gradient.addColorStop(0.4, 'rgba(217, 70, 239, 0.03)'); // Pink middle
      gradient.addColorStop(0.8, 'rgba(30, 64, 175, 0.02)'); // Blue outer
      
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      
      // Draw small grains
      const numberOfPoints = Math.floor(canvas.width * canvas.height / density);
      
      for (let i = 0; i < numberOfPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const intensity = Math.random();
        const size = Math.random() * 1.2;
        
        // Color variations
        if (intensity > 0.99) {
          // Silver bright points
          ctx.fillStyle = `rgba(220, 220, 230, ${0.7 + Math.random() * 0.3})`;
          ctx.fillRect(x, y, size * 1.5, size * 1.5);
        } else if (intensity > 0.98) {
          // Pink points
          ctx.fillStyle = `rgba(217, 70, 239, ${0.5 + Math.random() * 0.5})`;
          ctx.fillRect(x, y, size, size);
        } else if (intensity > 0.96) {
          // Blue points
          ctx.fillStyle = `rgba(30, 64, 175, ${0.4 + Math.random() * 0.5})`;
          ctx.fillRect(x, y, size, size);
        } else if (intensity > 0.80) {
          // White/silver smaller points
          ctx.fillStyle = `rgba(220, 220, 230, ${0.1 + Math.random() * 0.2})`;
          ctx.fillRect(x, y, size * 0.7, size * 0.7);
        }
      }
      
      animationId = requestAnimationFrame(drawGrains);
    };
    
    drawGrains();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [density, speed]);
  
  return (
    <div className={cn('absolute inset-0 overflow-hidden z-0', className)}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-artist-purple-vivid/5 via-artist-purple/3 to-black/20 z-10"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default CosmicGrainBackground;
