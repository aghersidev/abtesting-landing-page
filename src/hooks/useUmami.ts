import { useEffect } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      trackView: (url: string) => void;
    };
  }
}

const useUmami = () => {
  const isUmamiLoaded = (): boolean => typeof window.umami !== 'undefined';

  const trackEvent = (eventName: string, eventData: Record<string, unknown> = {}): void => {
    if (isUmamiLoaded()) {
      window.umami?.track(eventName, eventData);
    } else {
      console.warn('Umami not loaded. Event:', eventName, eventData);
    }
  };

  const trackPageView = (url: string = window.location.pathname): void => {
    if (isUmamiLoaded()) {
      window.umami?.trackView(url);
    }
  };

  return { trackEvent, trackPageView };
};

export default useUmami;
