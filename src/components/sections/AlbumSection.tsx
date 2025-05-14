
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AlbumCard from '../album/AlbumCard';
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
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

  // Convert albums to carousel slides
  const slides = albums.map(album => ({
    title: album.title,
    button: "View Album",
    src: album.coverImage
  }));
  
  // Update background video when album changes
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
      <div className="absolute inset-0 flex items-center justify-center">
        <Carousel 
          slides={slides} 
          onSlideChange={handleSlideChange}
        />
      </div>
      
      {/* Streaming Links for Current Album */}
      <div className="absolute bottom-12 w-full flex justify-center gap-4 px-4">
        {albums[currentAlbumIndex]?.streamingLinks.map(link => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-md hover:bg-opacity-20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-medium">{link.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default AlbumSection;
