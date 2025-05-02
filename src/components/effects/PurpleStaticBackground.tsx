
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PurpleStaticBackgroundProps {
  className?: string;
}

const PurpleStaticBackground: React.FC<PurpleStaticBackgroundProps> = ({ className }) => {
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
    
    // Create TV static effect with purple hues
    const drawStatic = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static
      for (let x = 0; x < canvas.width; x += 4) {
        for (let y = 0; y < canvas.height; y += 4) {
          const intensity = Math.random();
          
          if (intensity > 0.96) {
            // Bright purple dots
            ctx.fillStyle = `rgba(155, 135, 245, ${intensity})`;
            ctx.fillRect(x, y, 4, 4);
          } else if (intensity > 0.93) {
            // Medium purple dots
            ctx.fillStyle = `rgba(139, 92, 246, ${intensity * 0.7})`;
            ctx.fillRect(x, y, 3, 3);
          } else if (intensity > 0.90) {
            // Dark purple dots
            ctx.fillStyle = `rgba(110, 89, 165, ${intensity * 0.5})`;
            ctx.fillRect(x, y, 2, 2);
          } else if (intensity > 0.85) {
            // Subtle pink dots
            ctx.fillStyle = `rgba(217, 70, 239, ${intensity * 0.3})`;
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }
      
      // Create horizontal scan lines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = 0; y < canvas.height; y += 8) {
        ctx.fillRect(0, y, canvas.width, 1);
      }
      
      requestAnimationFrame(drawStatic);
    };
    
    const animationId = requestAnimationFrame(drawStatic);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className={cn('absolute inset-0 overflow-hidden z-0', className)}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60"
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-artist-purple-vivid/20 via-artist-purple/10 to-black/50 animate-tv-static"
      />
    </div>
  );
};

export default PurpleStaticBackground;
