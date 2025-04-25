import { useState, useEffect } from 'react';

export default function TrailerSection () {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(true);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/70d9irlxiB4`;
    iframe.onload = () => setIsVideoLoaded(true); 
    iframe.onerror = () => setIsVideoLoaded(false); 
  }, []);

  return (
    <section id="trailer" className="bg-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Game Trailer</h2>
        <div className="divider"></div>
        <div className="pixel-border bg-purple-200 p-4 flex items-center justify-center" style={{ minHeight: '300px' }}>
          {isVideoLoaded ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/70d9irlxiB4`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Official Game Trailer</h3>
              <p className="text-sm">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
