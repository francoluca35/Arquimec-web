import { useState, useEffect, useCallback } from 'react';

interface UseOptimizedScrollOptions {
  threshold?: number;
  headerThreshold?: number;
}

export const useOptimizedScroll = (options: UseOptimizedScrollOptions = {}) => {
  const { threshold = 50, headerThreshold = 100 } = options;
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Usar requestAnimationFrame para evitar reflow forzado
    requestAnimationFrame(() => {
      // Mostrar/ocultar header basado en dirección de scroll
      if (currentScrollY > lastScrollY && currentScrollY > headerThreshold) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      
      setScrolled(currentScrollY > threshold);
      setLastScrollY(currentScrollY);
    });
  }, [threshold, headerThreshold, lastScrollY]);

  useEffect(() => {
    // Usar passive listener para mejor rendimiento
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { scrolled, headerVisible };
};
