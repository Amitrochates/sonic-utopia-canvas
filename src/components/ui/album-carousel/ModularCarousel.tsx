
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CarouselSlide from './CarouselSlide';

interface StreamingLink {
  name: string;
  url: string;
  icon?: React.ReactNode;
}

export interface AlbumData {
  id: string;
  title: string;
  coverImage: string;
  frameCoverImage?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  streamingLinks: StreamingLink[];
}

interface ModularCarouselProps {
  albums: AlbumData[];
  onSlideChange?: (index: number) => void;
}

const ModularCarousel: React.FC<ModularCarouselProps> = ({
  albums,
  onSlideChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    if (index < 0) index = albums.length - 1;
    if (index >= albums.length) index = 0;
    
    setCurrentSlide(index);
    if (onSlideChange) onSlideChange(index);
    
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => goToSlide(currentSlide + 1);
  const handlePrev = () => goToSlide(currentSlide - 1);

  // Handle scroll events to update currentSlide
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollPosition = carouselRef.current.scrollLeft;
      const slideWidth = window.innerWidth;
      const newIndex = Math.round(scrollPosition / slideWidth);
      
      if (newIndex !== currentSlide) {
        setCurrentSlide(newIndex);
        if (onSlideChange) onSlideChange(newIndex);
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide, onSlideChange]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main carousel container */}
      <div 
        ref={carouselRef}
        className="flex w-full h-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {albums.map((album) => (
          <CarouselSlide key={album.id} album={album} />
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-4 z-20">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all"
          aria-label="Previous slide"
        >
          <ArrowLeft className="text-white" size={24} />
        </button>
        
        {/* Slide indicators */}
        <div className="flex items-center gap-2">
          {albums.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-4' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all"
          aria-label="Next slide"
        >
          <ArrowRight className="text-white" size={24} />
        </button>
      </div>
      
      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ModularCarousel;
