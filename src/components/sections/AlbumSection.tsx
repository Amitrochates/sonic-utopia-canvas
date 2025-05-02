
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AlbumCard from '../album/AlbumCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Function to handle vertical scrolling
  const handleVerticalScroll = (e: WheelEvent) => {
    e.preventDefault();
    
    // Prevent rapid successive scrolls
    if (isScrolling) return;
    
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 700); // Debounce the scroll
    
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // If we're at the first card and scrolling up, trigger vertical scroll up
    if (currentAlbumIndex === 0 && direction === 'up') {
      onScrollUp && onScrollUp();
      return;
    }
    
    // If we're at the last card and scrolling down, trigger vertical scroll down
    if (currentAlbumIndex === albums.length - 1 && direction === 'down') {
      onScrollDown && onScrollDown();
      return;
    }
  };
  
  // Handle album selection
  const handleAlbumChange = (index: number) => {
    setCurrentAlbumIndex(index);
  };
  
  // Set up the vertical scrolling behavior
  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('wheel', handleVerticalScroll, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleVerticalScroll);
      }
    };
  }, [currentAlbumIndex, isScrolling]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'h-screen w-full overflow-hidden relative',
        className
      )}
    >
      {/* Background Videos */}
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
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
      ))}
      
      {/* Album Carousel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Carousel
          opts={{
            loop: false,
            align: "center",
          }}
          className="w-full max-w-screen-xl"
          onSlideChange={(api) => {
            const currentSlide = api.selectedScrollSnap();
            setCurrentAlbumIndex(currentSlide);
          }}
        >
          <CarouselContent>
            {albums.map((album) => (
              <CarouselItem 
                key={album.id} 
                className="flex items-center justify-center"
              >
                <AlbumCard
                  id={album.id}
                  title={album.title}
                  coverImage={album.coverImage}
                  streamingLinks={album.streamingLinks}
                  backgroundImage={album.id === "album-1" 
                    ? "/lovable-uploads/9aac2402-4e71-4dad-b49d-cd85ddb16260.png" 
                    : album.id === "album-2" 
                      ? "/lovable-uploads/5d4c074c-fb6a-430e-bbad-217015539f16.png" 
                      : "/lovable-uploads/72692bca-c82a-4f19-ad9e-00576cd531a0.png"
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-10" />
          <CarouselNext className="right-10" />
        </Carousel>
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
            onClick={() => handleAlbumChange(index)}
          />
        ))}
      </div>
      
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
