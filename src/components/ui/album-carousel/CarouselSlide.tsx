
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  YoutubeIcon, 
  Music, 
  Music2, 
  Video 
} from 'lucide-react';
import { getStreamingIcon } from '@/assets/streaming-icons';

interface StreamingLink {
  name: string;
  url: string;
  icon?: React.ReactNode;
}

interface CarouselSlideProps {
  album: {
    id: string;
    title: string;
    coverImage: string;
    frameCoverImage?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    streamingLinks: StreamingLink[];
  };
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ album }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center snap-center">
      {/* Background Image/Video */}
      {album.backgroundVideo ? (
        <video
          src={album.backgroundVideo}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : album.backgroundImage ? (
        <img 
          src={album.backgroundImage} 
          alt={`${album.title} background`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-artist-dark to-black" />
      )}
      
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Album Frame and Cover */}
      <div className="relative z-10">
        {/* Frame Image */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
          {album.frameCoverImage ? (
            <img
              src={album.frameCoverImage}
              alt={`${album.title} frame`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full rounded-lg border-4 border-white bg-black bg-opacity-30" />
          )}
          
          {/* Album Cover */}
          <motion.div
            className="absolute inset-8 overflow-hidden rounded-md"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <img 
              src={album.coverImage} 
              alt={album.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Streaming Links Overlay on Hover */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black bg-opacity-70 flex flex-wrap items-center justify-center gap-4 p-4"
                >
                  {album.streamingLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-md hover:bg-opacity-20 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-white">
                        {link.icon || getStreamingIcon(link.name)}
                      </span>
                      <span className="text-white font-medium">{link.name}</span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Album Title */}
        <div className="absolute -bottom-12 left-0 w-full text-center">
          <h3 className="text-white text-2xl font-bold">{album.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
