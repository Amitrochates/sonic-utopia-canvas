
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import TextScramble from '../effects/TextScramble';
import { getStreamingIcon } from '@/assets/streaming-icons';

interface StreamingLink {
  name: string;
  url: string;
  icon?: string;
}

interface AlbumCardProps {
  id: string;
  title: string;
  coverImage: string;
  streamingLinks: StreamingLink[];
  cosmicBackground?: string;
  className?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  coverImage,
  streamingLinks,
  cosmicBackground,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowLinks(false);
  };

  const handleButtonClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <motion.div
      className={cn(
        'relative w-72 h-72 md:w-96 md:h-96 bg-artist-dark rounded-md overflow-hidden',
        'shadow-lg transition-shadow hover:shadow-xl z-50',
        className
      )}
      layoutId={`album-${id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        boxShadow: '0 0 30px rgba(155, 135, 245, 0.3)'
      }}
    >
      {/* Cosmic overlay texture */}
      {cosmicBackground && (
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-75 z-10"
          style={{
            backgroundImage: `url(${cosmicBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      {/* Album Cover Image */}
      <div className="relative w-full h-full overflow-hidden z-0">
        <motion.img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glass overlay on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-60 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className={cn(
                  'px-6 py-3 rounded-full text-white font-bold transition-all',
                  'bg-artist-secondary hover:bg-artist-accent backdrop-blur-md',
                  showLinks ? 'opacity-0' : 'opacity-100'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleButtonClick}
              >
                STREAM NOW
              </motion.button>

              {/* Streaming links */}
              <AnimatePresence>
                {showLinks && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center flex-wrap gap-4 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {streamingLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md rounded-md hover:bg-opacity-20 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-2">
                          {link.icon ? (
                            <img src={link.icon} alt={link.name} className="w-6 h-6" />
                          ) : (
                            getStreamingIcon(link.name)
                          )}
                        </span>
                        <span className="text-white font-medium">{link.name}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Album Title with text scramble effect */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 z-30">
        <div className="text-white font-futuristic text-xl">
          <TextScramble 
            text={title} 
            initialDelay={500}
            className="font-bold"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCard;
