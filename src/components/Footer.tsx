
export default function  Footer () {
    return (
      <footer className="bg-purple-300 py-6 pixel-border border-t-4 border-purple-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-4 mb-4 md:mb-0">
              <a href="#">Twitter</a>
              <a href="#">Discord</a>
              <a href="#">YouTube</a>
              <a href="#">Steam</a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
              <p>&copy; 2025 Andres Ghersi Sayan Studios. All rights reserved.</p>
            </div>
          </div>
          <div className="mt-4 text-center opacity-70">
            <p>Pixel Reborn and all related logos are fictional...</p>
            <p className="mt-1">"Steam" and the Steam logo are trademarks of Valve Corporation.</p>
          </div>
        </div>
      </footer>
    );
  };
  