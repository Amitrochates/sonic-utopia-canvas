
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
  backgroundImage?: string;
  className?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  coverImage,
  streamingLinks,
  backgroundImage,
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
    <div className="relative w-full flex items-center justify-center">
      {/* Background cosmic texture */}
      {backgroundImage && (
        <motion.div
          className="absolute w-[120%] h-[120%] -z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={backgroundImage} 
            alt="Album Background" 
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      )}
      
      {/* Album card */}
      <motion.div
        className={cn(
          'relative w-60 h-60 md:w-72 md:h-72 bg-artist-dark rounded-md overflow-hidden',
          'shadow-lg transition-shadow hover:shadow-xl',
          className
        )}
        layoutId={`album-${id}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Album Cover Image */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className={cn(
                    'px-6 py-3 rounded-full text-white font-bold transition-all',
                    'bg-artist-secondary hover:bg-artist-accent',
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
                          className="flex items-center justify-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-md hover:bg-opacity-20 transition-all"
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
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
          <div className="text-white font-futuristic text-xl">
            <TextScramble 
              text={title} 
              initialDelay={500}
              className="font-bold"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AlbumCard;
