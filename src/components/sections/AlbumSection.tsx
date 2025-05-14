import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AlbumCard from '../album/AlbumCard';

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
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  // More refined scroll handling with better throttling
  const handleScroll = (deltaY: number) => {
    const now = Date.now();
    // Use a shorter debounce time for smoother experience
    if (now - lastScrollTime.current < 300 || isScrollLocked) return;
    
    lastScrollTime.current = now;
    setIsScrollLocked(true);
    
    // Determine scroll direction based on deltaY
    const direction = deltaY > 0 ? 'down' : 'up';
    
    // Handle vertical scrolling transitions when at edges
    if (currentAlbumIndex === 0 && direction === 'up') {
      onScrollUp && onScrollUp();
      setTimeout(() => setIsScrollLocked(false), 500);
      return;
    }
    
    if (currentAlbumIndex === albums.length - 1 && direction === 'down') {
      onScrollDown && onScrollDown();
      setTimeout(() => setIsScrollLocked(false), 500);
      return;
    }
    
    // Handle horizontal scrolling (album navigation)
    if (direction === 'down') {
      setCurrentAlbumIndex(prev => Math.min(prev + 1, albums.length - 1));
    } else {
      setCurrentAlbumIndex(prev => Math.max(prev - 1, 0));
    }
    
    // Release scroll lock after animation completes
    setTimeout(() => setIsScrollLocked(false), 500);
  };
  
  // Wheel event handler
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    handleScroll(e.deltaY);
  };
  
  // Touch event handlers for mobile support
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (isScrollLocked) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // Determine if the swipe was primarily horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe - handle like left/right navigation
      if (Math.abs(deltaX) > 50) { // Threshold to avoid accidental swipes
        handleScroll(deltaX); // Positive deltaX = swipe left = next album
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > 50) { // Threshold to avoid accidental swipes
        handleScroll(deltaY);
      }
    }
  };
  
  // Keyboard navigation support
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isScrollLocked) return;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        handleScroll(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        handleScroll(-1);
        break;
    }
  };
  
  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      // Add wheel event listener
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Add touch event listeners
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Add keyboard event listener
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAlbumIndex, isScrollLocked]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'h-screen w-full overflow-hidden relative',
        className
      )}
    >
      {/* Background Videos with optimized rendering */}
      {albums.map((album, index) => {
        // Only render videos that are current or adjacent to improve performance
        if (Math.abs(index - currentAlbumIndex) > 1) return null;
        
        return (
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
              // Preload videos for smoother transitions
              preload="auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        );
      })}
      
      {/* Album Carousel with improved animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          className="flex items-center justify-center"
          initial={false}
          animate={{ 
            x: `-${currentAlbumIndex * 100}vw` 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 25,
            mass: 1
          }}
        >
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="w-screen h-screen flex items-center justify-center flex-shrink-0"
            >
              <AlbumCard
                id={album.id}
                title={album.title}
                coverImage={album.coverImage}
                streamingLinks={album.streamingLinks}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation Indicators with improved click handling */}
      <div className="absolute bottom-10 left-0 w-full flex items-center justify-center gap-3 z-10">
        {albums.map((album, index) => (
          <button
            key={`nav-${album.id}`}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              'hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
              index === currentAlbumIndex ? 'bg-white scale-125' : 'bg-white/50'
            )}
            onClick={() => {
              if (!isScrollLocked) {
                setIsScrollLocked(true);
                setCurrentAlbumIndex(index);
                setTimeout(() => setIsScrollLocked(false), 500);
              }
            }}
            aria-label={`View album ${album.title}`}
          />
        ))}
      </div>
      
      {/* Left/Right Arrows with improved accessibility */}
      <button
        className={cn(
          'absolute left-8 top-1/2 transform -translate-y-1/2 text-white',
          'w-12 h-12 rounded-full bg-black/40 flex items-center justify-center',
          'transition-opacity hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white',
          currentAlbumIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => {
          if (!isScrollLocked) {
            setIsScrollLocked(true);
            setCurrentAlbumIndex(prev => Math.max(prev - 1, 0));
            setTimeout(() => setIsScrollLocked(false), 500);
          }
        }}
        aria-label="Previous album"
      >
        <span className="text-2xl">&larr;</span>
      </button>
      
      <button
        className={cn(
          'absolute right-8 top-1/2 transform -translate-y-1/2 text-white',
          'w-12 h-12 rounded-full bg-black/40 flex items-center justify-center',
          'transition-opacity hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white',
          currentAlbumIndex === albums.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => {
          if (!isScrollLocked) {
            setIsScrollLocked(true);
            setCurrentAlbumIndex(prev => Math.min(prev + 1, albums.length - 1));
            setTimeout(() => setIsScrollLocked(false), 500);
          }
        }}
        aria-label="Next album"
      >
        <span className="text-2xl">&rarr;</span>
      </button>
      
      {/* Scroll indicators with clearer and smoother animations */}
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