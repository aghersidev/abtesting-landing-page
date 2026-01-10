import { useEffect } from 'react';
import useUmami from './useUmami';

interface UseTrackVisibilityProps {
  ref: React.RefObject<HTMLElement>;
  eventName: string;
}

export function useTrackVisibility({ ref, eventName }: UseTrackVisibilityProps): void {
  const { trackEvent } = useUmami();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
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
