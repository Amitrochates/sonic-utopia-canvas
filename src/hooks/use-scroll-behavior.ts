
import { useState, useEffect, RefObject } from 'react';

interface ScrollBehaviorOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollBehavior(
  ref: RefObject<HTMLElement>,
  options: ScrollBehaviorOptions = {}
) {
  const { threshold = 0.5, rootMargin = '0px' } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Set up IntersectionObserver to detect when the element is in view
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && !hasEnteredView) {
          setHasEnteredView(true);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, hasEnteredView]);
  
  // Calculate scroll progress within the element
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the element we've scrolled
      // 0 = element is at the bottom of the viewport
      // 1 = element is at the top of the viewport
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      let progress = 0;
      
      if (elementTop < windowHeight && elementTop > -elementHeight) {
        progress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
      } else if (elementTop <= -elementHeight) {
        progress = 1;
      }
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
  
  return { isInView, hasEnteredView, scrollProgress };
}
