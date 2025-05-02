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
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'horizontal' | null>(null);
  
  // Function to handle the wheel event for horizontal and vertical scrolling
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    
    // Prevent rapid successive scrolls
    if (isScrolling) return;
    
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 700); // Debounce the scroll
    
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // If we're at the first card and scrolling up, trigger vertical scroll up
    if (currentAlbumIndex === 0 && direction === 'up') {
      setScrollDirection('up');
      onScrollUp && onScrollUp();
      return;
    }
    
    // If we're at the last card and scrolling down, trigger vertical scroll down
    if (currentAlbumIndex === albums.length - 1 && direction === 'down') {
      setScrollDirection('down');
      onScrollDown && onScrollDown();
      return;
    }
    
    // Otherwise do horizontal scrolling
    setScrollDirection('horizontal');
    
    if (direction === 'down') {
      // Scroll right (next album)
      setCurrentAlbumIndex(prev => Math.min(prev + 1, albums.length - 1));
    } else {
      // Scroll left (previous album)
      setCurrentAlbumIndex(prev => Math.max(prev - 1, 0));
    }
  };
  
  // Set up the scrolling behavior once we've entered this section
  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHorizontalScrolling, currentAlbumIndex, isScrolling]);
  
  // Enable horizontal scrolling when this section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHorizontalScrolling(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'h-screen w-full overflow-hidden relative',
        className
      )}
    >
      {/* Background Video */}
      {albums.map((album, index) => (
        <div 
          key={album.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
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
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}
      
      {/* Album Carousel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center justify-center"
          animate={{ x: -currentAlbumIndex * 100 + 'vw' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-0 w-full flex items-center justify-center gap-2">
        {albums.map((album, index) => (
          <button
            key={`nav-${album.id}`}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentAlbumIndex ? 'bg-white scale-125' : 'bg-white/50'
            )}
            onClick={() => setCurrentAlbumIndex(index)}
          />
        ))}
      </div>
      
      {/* Left/Right Arrows */}
      <button
        className={cn(
          'absolute left-10 top-1/2 transform -translate-y-1/2 text-white',
          'w-12 h-12 rounded-full bg-black/30 flex items-center justify-center',
          'transition-opacity',
          currentAlbumIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => setCurrentAlbumIndex(prev => Math.max(prev - 1, 0))}
      >
        <span className="text-2xl">&larr;</span>
      </button>
      
      <button
        className={cn(
          'absolute right-10 top-1/2 transform -translate-y-1/2 text-white',
          'w-12 h-12 rounded-full bg-black/30 flex items-center justify-center',
          'transition-opacity',
          currentAlbumIndex === albums.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => setCurrentAlbumIndex(prev => Math.min(prev + 1, albums.length - 1))}
      >
        <span className="text-2xl">&rarr;</span>
      </button>
      
      {/* Scroll indicators */}
      {currentAlbumIndex === 0 && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white opacity-60 animate-bounce">
          <div className="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-sans mt-1">SCROLL UP</span>
          </div>
        </div>
      )}
      
      {currentAlbumIndex === albums.length - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white opacity-60 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm font-sans mb-1">SCROLL DOWN</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumSection;
