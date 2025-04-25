import useUmami from '../hooks/useUmami';
import YouTubePlayer from './YoutubePlayer';

export default function HeroSection({ mediaType }) {
  const { trackEvent } = useUmami();
  return (
    <section className="hero-section pixel-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Pixel REBORN</h1>
            <p className="text-lg md:text-xl mb-8">An epic sci-fi adventure where dimensions collide</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#"
                onClick={() => trackEvent('click_wishlist_steam', { location: 'HeroSection' })}
                className="pixel-border pixel-button px-6 py-3 text-base">
                Add to Wishlist
              </a>
              {mediaType === 'images' ? (
                <a href="#trailer"
                  onClick={() => trackEvent('click_specific_tab', { location: 'HeroSection' })}
                  className="pixel-border pixel-button px-6 py-3 text-base" style={{ backgroundColor: '#a0d2db' }}>
                  Watch Trailer
                </a>
              ) : (
                <a href="#screenshots"
                  onClick={() => trackEvent('click_specific_tab', { location: 'HeroSection' })}
                  className="pixel-border pixel-button px-6 py-3 text-base" style={{ backgroundColor: '#a0d2db' }}>
                  Screenshots
                </a>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {mediaType === 'trailer' ? (
              <YouTubePlayer videoId="70d9irlxiB4" trackEvent={trackEvent} />
            ) : (
              <img
                src="https://placehold.co/400x480/5a4a6a/f0e6ff?text=PIXEL+REBORN"
                alt="Pixel Reborn Game Cover"
                className="w-full max-w-md pixel-border"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}