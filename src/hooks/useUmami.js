import { useEffect } from 'react';

const useUmami = () => {
  const isUmamiLoaded = () => typeof window.umami !== 'undefined';

  const trackEvent = (eventName, eventData = {}) => {
    if (isUmamiLoaded()) {
      window.umami.track(eventName, eventData);
    } else {
      console.warn('Umami not loaded. Event:', eventName, eventData);
    }
  };

  const trackPageView = (url) => {
    if (isUmamiLoaded()) {
      window.umami.trackView(url || window.location.pathname);
    }
  };

  return { trackEvent, trackPageView };
};

export default useUmami;