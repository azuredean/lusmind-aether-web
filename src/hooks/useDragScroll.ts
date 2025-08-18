import { useRef, useCallback, useEffect } from 'react';

interface UseDragScrollOptions {
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const useDragScroll = (options: UseDragScrollOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDragginRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    isDragginRef.current = true;
    startXRef.current = e.pageX - ref.current.offsetLeft;
    scrollLeftRef.current = ref.current.scrollLeft;
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
    
    options.onDragStart?.();
  }, [options]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragginRef.current || !ref.current) return;
    
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
    ref.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!ref.current) return;
    
    isDragginRef.current = false;
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = '';
    
    options.onDragEnd?.();
  }, [options]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    
    isDragginRef.current = false;
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = '';
    
    options.onDragEnd?.();
  }, [options]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!ref.current) return;
    
    isDragginRef.current = true;
    startXRef.current = e.touches[0].pageX - ref.current.offsetLeft;
    scrollLeftRef.current = ref.current.scrollLeft;
    
    options.onDragStart?.();
  }, [options]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragginRef.current || !ref.current) return;
    
    e.preventDefault();
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    ref.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragginRef.current = false;
    options.onDragEnd?.();
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.cursor = 'grab';

    // Mouse events
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Touch events
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return ref;
};