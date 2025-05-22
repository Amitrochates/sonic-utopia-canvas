
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModularCarousel, AlbumData } from '../ui/album-carousel';

interface AlbumSectionProps {
  albums: AlbumData[];
  className?: string;
  onScrollUp?: () => void;
  onScrollDown?: () => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({ 
  albums, 
  className,
  onScrollUp,
  onScrollDown
}) => {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  
  // Handle slide change
  const handleSlideChange = (index: number) => {
    setCurrentAlbumIndex(index);
  };
  
  return (
    <div 
      className={cn(
        'h-screen w-full overflow-hidden relative',
        className
      )}
    >
      <ModularCarousel 
        albums={albums} 
        onSlideChange={handleSlideChange} 
      />
    </div>
  );
};

export default AlbumSection;
