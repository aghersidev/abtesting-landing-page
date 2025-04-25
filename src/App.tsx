import './App.css'
import { useEffect, useRef, useState } from 'react'
import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import NavTitleBar from './components/NavTitleBar'
import HeroSection from './components/HeroSection'
import CountdownSection from './components/CountdownSection'
import TrailerSection from './components/TrailerSection'
import ScreenshotsSection from './components/ScreenshotsSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import Popup from './components/Popup'
import useUmami from './hooks/useUmami';
import VisibilityTracker from './components/VisibilityTracker'

const { trackEvent } = useUmami();

const getOrCreateUserId = (): string => {
  const key = 'gb_user_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

const gb = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-abc123",
  enableDevMode: true,
  // A/B testing
  // Called every time a user is put into an experiment
  trackingCallback: (experiment, result) => {
    trackEvent("Experiment Viewed", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
});

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const { trackEvent } = useUmami();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const initGrowthBook = async () => {
      gb.setAttributes({
        id: getOrCreateUserId()
      });
      await gb.init({
        streaming: true
      });
      setReady(true);
    };

    initGrowthBook();
  }, []);
  useEffect(() => {
    const handleBeforeUnload = () => {
      const duration = Date.now() - startTimeRef.current;
      trackEvent("time_on_page", { duration });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      const duration = Date.now() - startTimeRef.current;
      trackEvent("time_on_page", { duration });
    };
  }, [trackEvent]);
  const AppContent = () => {
    const mediaType = gb.getFeatureValue("mediaType", "trailer");
    trackEvent("page_view", { url: 'pixelreborn' });

    return (
      <div className="min-h-screen text-sm">
        <VisibilityTracker eventName="NavTitleBar Visible">
          <NavTitleBar mediaType={mediaType} />
        </VisibilityTracker>
        <VisibilityTracker eventName="HeroSection Visible">
          <HeroSection mediaType={mediaType} />
        </VisibilityTracker>
        <VisibilityTracker eventName="CountdownSection Visible">
          <CountdownSection />
        </VisibilityTracker>
        {mediaType === "images" && (
          <VisibilityTracker eventName="TrailerSection Visible">
            <TrailerSection />
          </VisibilityTracker>
        )}
        {mediaType === "trailer" && (
          <VisibilityTracker eventName="ScreenshotsSection Visible">
            <ScreenshotsSection />
          </VisibilityTracker>
        )}
        <VisibilityTracker eventName="NewsletterSection Visible">
          <NewsletterSection />
        </VisibilityTracker>
        <VisibilityTracker eventName="Footer Reached">
          <Footer />
        </VisibilityTracker>
        <VisibilityTracker eventName="Popup Visible">
          <Popup />
        </VisibilityTracker>
      </div>
    );
  };

  return (
    <GrowthBookProvider growthbook={gb}>
      {ready ? <AppContent /> : <div>Loading...</div>}
    </GrowthBookProvider>
  );
};

export default App;