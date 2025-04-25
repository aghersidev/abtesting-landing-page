import useUmami from '../hooks/useUmami';

export default function NavTitleBar({ mediaType }) {
  const { trackEvent } = useUmami();

  return (
    <nav className="fixed w-full max-w-7xl pixel-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="nav-title">Pixel REBORN</span>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  onClick={() => trackEvent('click_specific_tab', { destination: 'Home', location: 'Navbar' })}
                >
                  About
                </a>
                {mediaType === 'images' &&
                  <a
                    href="#media"
                    onClick={() => trackEvent('click_specific_tab', { destination: 'Trailer', location: 'Navbar' })}
                  >
                    Features
                  </a>
                }
                {mediaType === 'trailer' &&
                  <a
                    href="#screenshots"
                    onClick={() => trackEvent('click_specific_tab', { destination: 'Screenshots', location: 'Navbar' })}
                  >
                    Features
                  </a>
                }
                <a
                  href="#newsletter"
                  onClick={() => trackEvent('click_specific_tab', { destination: 'Newsletter', location: 'Navbar' })}
                >
                  Stay Updated
                </a>
              </div>
            </div>
          </div>
          <div>
            <a
              href="#"
              className="pixel-border pixel-button px-4 py-2 text-xs"
              onClick={() => trackEvent('click_pre_order', { location: 'Navbar' })}
            >
              Preorder on Steam
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}