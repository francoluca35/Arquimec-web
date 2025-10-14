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
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    if (isScrolling) return; // Evitar múltiples llamadas simultáneas
    
    setIsScrolling(true);
    const currentScrollY = window.scrollY;
    
    // Usar requestAnimationFrame para evitar reflow forzado
    requestAnimationFrame(() => {
      // Solo actualizar si hay cambio significativo (más de 5px)
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollDiff > 5) {
        // Mostrar/ocultar header basado en dirección de scroll
        if (currentScrollY > lastScrollY && currentScrollY > headerThreshold) {
          setHeaderVisible(false);
        } else {
          setHeaderVisible(true);
        }
        
        setScrolled(currentScrollY > threshold);
        setLastScrollY(currentScrollY);
      }
      
      setIsScrolling(false);
    });
  }, [threshold, headerThreshold, lastScrollY, isScrolling]);

  useEffect(() => {
    // Usar passive listener para mejor rendimiento
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { scrolled, headerVisible };
};
