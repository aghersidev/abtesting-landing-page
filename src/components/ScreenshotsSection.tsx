import LightBoxImage from './LightBoxImage';

export default function ScreenshotsSection() {
  return (
    <section id="screenshots" className="bg-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Screenshots</h2>
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LightBoxImage
            id="lightbox-1"
            src="https://placehold.co/600x400/5a4a6a/f0e6ff?text=Screen+1+Pixel"
            alt="Game Screenshot 1"
          />
          <LightBoxImage
            id="lightbox-2"
            src="https://placehold.co/600x400/5a4a6a/f0e6ff?text=Screen+2+Pixel"
            alt="Game Screenshot 2"
          />
          <LightBoxImage
            id="lightbox-3"
            src="https://placehold.co/600x400/5a4a6a/f0e6ff?text=Screen+3+Pixel"
            alt="Game Screenshot 3"
          />
        </div>
      </div>
    </section>
  );
}