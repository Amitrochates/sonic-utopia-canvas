import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PurpleStaticBackgroundProps {
  className?: string;
}

const NeonVHSStatic: React.FC<PurpleStaticBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;

    const drawStatic = () => {
      const { width, height } = canvas;
      const baseImage = ctx.createImageData(width, height);
      const buffer = baseImage.data;

      // Step 1: Fill with noisy neon static
      for (let i = 0; i < buffer.length; i += 4) {
        const glitch = Math.random();
        let r = 0, g = 0, b = 0;
      
        if (glitch > 0.98) {
          r = 200 + 55 * Math.random(); // bright RGB burst
          g = 200 + 55 * Math.random();
          b = 200 + 55 * Math.random();
        } else if (glitch > 0.94) {
          r = 180 + Math.random() * 75;
          g = 50;
          b = 255;
        } else if (glitch > 0.9) {
          r = 50 + Math.random() * 80;
          g = 255;
          b = 80 + Math.random() * 80;
        } else {
          const grey = 50 + Math.random() * 80; // brighter base noise
          r = g = b = grey;
        }
      
        buffer[i] = r;
        buffer[i + 1] = g;
        buffer[i + 2] = b;
        buffer[i + 3] = 180 + Math.random() * 50; // alpha 180–230
      }
      

      // Step 2: Draw base static first
      ctx.putImageData(baseImage, 0, 0);

      // Step 3: Create RGB channel shifts
      const redShift = ctx.createImageData(width, height);
      const greenShift = ctx.createImageData(width, height);
      const blueShift = ctx.createImageData(width, height);

      for (let i = 0; i < buffer.length; i += 4) {
        redShift.data[i] = buffer[i];
        redShift.data[i + 1] = 0;
        redShift.data[i + 2] = 0;
        redShift.data[i + 3] = 60;

        greenShift.data[i] = 0;
        greenShift.data[i + 1] = buffer[i + 1];
        greenShift.data[i + 2] = 0;
        greenShift.data[i + 3] = 60;

        blueShift.data[i] = 0;
        blueShift.data[i + 1] = 0;
        blueShift.data[i + 2] = buffer[i + 2];
        blueShift.data[i + 3] = 60;
      }

      // Step 4: Offset and blend channels (like chromatic ghosting)
      ctx.putImageData(redShift, -1, 0);
      ctx.putImageData(greenShift, 0, 1);
      ctx.putImageData(blueShift, 1, 0);

      // Step 5: Optional glitch bars
      for (let y = 0; y < height; y += Math.floor(Math.random() * 60 + 30)) {
        const glitchHeight = Math.floor(Math.random() * 4 + 1);
        ctx.fillStyle = `rgba(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()}, 0.07)`;
        ctx.fillRect(0, y, width, glitchHeight);
      }

      animationId = requestAnimationFrame(drawStatic);
    };

    animationId = requestAnimationFrame(drawStatic);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={cn('absolute inset-0 overflow-hidden z-0', className)}>
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />
      <motion.div
  className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-black/90 z-[-1]"
  />
    </div>
  );
};

export default NeonVHSStatic;
