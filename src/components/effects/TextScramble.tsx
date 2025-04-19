import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Define the character set for the scramble effect
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#';

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleSpeed?: number;
  initialDelay?: number;
}

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className,
  duration = 2000,
  scrambleSpeed = 50,
  initialDelay = 0
}) => {
  const [output, setOutput] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let counter = 0;
    const finalText = text;
    let result = '';

    // Start with a delay
    timeout = setTimeout(() => {
      setIsScrambling(true);

      // Set up the scrambling interval
      interval = setInterval(() => {
        result = '';
        
        for (let i = 0; i < finalText.length; i++) {
          // If counter is past the current index, use the final character
          if (counter >= i) {
            result += finalText[i];
          } else {
            // Otherwise, use a random character
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setOutput(result);
        counter += 1;
        
        // If we've completed the full text, stop scrambling
        if (counter > finalText.length) {
          setIsScrambling(false);
          clearInterval(interval);
        }
      }, scrambleSpeed);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, scrambleSpeed, initialDelay, duration]);

  return (
    <span className={cn(
      isScrambling ? 'animate-text-scramble' : '',
      className
    )}>
      {output}
    </span>
  );
};

export default TextScramble;
