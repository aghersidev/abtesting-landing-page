import { useEffect } from 'react';
import useUmami from './useUmami';

export function useTrackVisibility(ref, eventName) {
  const { trackEvent } = useUmami();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('scroll_depth', { type: eventName, element: entry.target.id });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.5, // 50% visible
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, eventName, trackEvent]);
}