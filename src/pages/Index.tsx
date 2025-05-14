
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArtistName from '@/components/artist/ArtistName';
import LogoSection from '@/components/sections/LogoSection';
import AlbumSection from '@/components/sections/AlbumSection';
import FooterSection from '@/components/sections/FooterSection';
import Header from '@/components/layout/Header';
import { useScrollBehavior } from '@/hooks/use-scroll-behavior';

// Artist data
const ARTIST_NAME = "AADHYARAJA";
const ARTIST_LOGO = "/lovable-uploads/6999f15a-2344-456e-a1fd-d12a22c72ec1.png";
const FOOTER_IMAGE = "/lovable-uploads/7a397af9-6f6e-46f7-bf4f-0004c5207859.png";
// Fallback logo if the uploaded image is not available
const FALLBACK_LOGO = "/lovable-uploads/placeholder-logo.svg"; 

// Album data
const ALBUMS = [
  {
    id: "album-1",
    title: "UTOPIA",
    coverImage: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b",
    backgroundVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-waves-patterns-3447-large.mp4",
    streamingLinks: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "YouTube", url: "#" },
      { name: "SoundCloud", url: "#" }
    ]
  },
  {
    id: "album-2",
    title: "ASTROWORLD",
    coverImage: "https://images.unsplash.com/photo-1460036521480-ff49c08c2781",
    backgroundVideo: "https://assets.mixkit.co/videos/preview/mixkit-psychedelic-pattern-11748-large.mp4",
    streamingLinks: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "YouTube", url: "#" },
      { name: "SoundCloud", url: "#" }
    ]
  },
  {
    id: "album-3",
    title: "RODEO",
    coverImage: "https://images.unsplash.com/photo-1533923156502-be31530547c4",
    backgroundVideo: "https://assets.mixkit.co/videos/preview/mixkit-person-using-tablet-digital-effects-56985-large.mp4",
    streamingLinks: [
      { name: "Spotify", url: "#", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" },
      { name: "Apple Music", url: "#", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/2048px-Apple_Music_icon.svg.png" },
      { name: "YouTube", url: "#", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" },
      { name: "Soundcloud", url: "#", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Soundcloud_logo.svg/2560px-Soundcloud_logo.svg.png" }
    ]
  }
];

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const albumSectionRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);
  
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  });
  
  // Intro animations based on scroll
  const introOpacity = useTransform(
    introScrollProgress, 
    [0, 0.3, 0.6], 
    [1, 0.8, 0]
  );
  
  const introScale = useTransform(
    introScrollProgress, 
    [0, 0.5], 
    [1, 0.8]
  );
  
  const introY = useTransform(
    introScrollProgress, 
    [0, 0.5], 
    [0, -100]
  );
  
  // Scroll to sections
  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(0);
  };
  
  const scrollToLogo = () => {
    logoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(1);
  };
  
  const scrollToAlbums = () => {
    albumSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(2);
  };
  
  const scrollToFooter = () => {
    footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(3);
  };
  
  // Handle vertical scrolling from album section
  const handleScrollUpFromAlbums = () => {
    scrollToLogo();
  };
  
  const handleScrollDownFromAlbums = () => {
    scrollToFooter();
  };
  
  // Handle header visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowHeader(scrollPosition > window.innerHeight / 2);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={mainRef}
      className="bg-black min-h-screen text-white overflow-x-hidden"
    >
      {/* Header */}
      <Header className={showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'} />
      
      {/* Artist Name - transitions to header on scroll */}
      {showHeader && (
        <ArtistName 
          name={ARTIST_NAME} 
          isHeader={true}
        />
      )}
      
      {/* Intro Section with Artist Name */}
      <motion.div 
        ref={introRef}
        className="h-screen flex items-center justify-center relative"
        style={{ opacity: introOpacity, scale: introScale, y: introY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-artist-dark via-transparent to-transparent" />
        
        <ArtistName name={ARTIST_NAME} />
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-bounce"
            onClick={scrollToLogo}
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Logo Section */}
      <div ref={logoSectionRef}>
        <LogoSection 
          logoSrc={ARTIST_LOGO}
          // backgroundVideoSrc="https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-and-playing-with-digital-lights-32746-large.mp4"
          // backgroundVideoSrc="./public/bg_glitch.mp4"
        />
      </div>
      
      {/* Albums Section */}
      <div ref={albumSectionRef}>
        <AlbumSection 
          albums={ALBUMS}
          // onScrollUp={handleScrollUpFromAlbums}
          // onScrollDown={handleScrollDownFromAlbums}
        />
      </div>
      
      {/* Footer Section */}
      <div ref={footerSectionRef}>
        <FooterSection 
          imageSrc={FOOTER_IMAGE}
        />
      </div>
    </div>
  );
};

export default HomePage;
