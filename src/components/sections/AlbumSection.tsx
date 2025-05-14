
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Carousel from '../ui/carousel';

interface Album {
  id: string;
  title: string;
  coverImage: string;
  streamingLinks: {
    name: string;
    url: string;
    icon?: string;
  }[];
  backgroundVideo: string;
}

interface AlbumSectionProps {
  albums: Album[];
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  
  // Format albums data for carousel
  const carouselSlides = albums.map(album => ({
    title: album.title,
    button: "STREAM NOW",
    src: album.coverImage
  }));
  
  // Handle background videos
  useEffect(() => {
    // Preload videos for smoother transitions
    albums.forEach(album => {
      const videoElement = document.createElement('video');
      videoElement.src = album.backgroundVideo;
      videoElement.preload = 'auto';
    });
  }, [albums]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'h-screen w-full overflow-hidden relative flex flex-col items-center justify-center',
        className
      )}
    >
      {/* Background Videos */}
      {albums.map((album, index) => (
        <div 
          key={album.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            index === currentAlbumIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <video
            src={album.backgroundVideo}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}
      
      {/* Album Carousel */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Carousel 
          slides={carouselSlides}
          onSlideChange={(index) => setCurrentAlbumIndex(index)}
        />
      </div>
      
      {/* Scroll indicators */}
      {currentAlbumIndex === 0 && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white opacity-70">
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15L12 9L6 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium mt-1">SCROLL UP</span>
          </motion.div>
        </div>
      )}
      
      {currentAlbumIndex === albums.length - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white opacity-70">
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          >
            <span className="text-sm font-medium mb-1">SCROLL DOWN</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AlbumSection;
