import useUmami from '../hooks/useUmami';

export default function NewsletterSection () {
  const { trackEvent } = useUmami();
    return (
      <section id="newsletter" className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="newsletter-box pixel-border">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
                <p className="text-base">
                  Join our newsletter to receive exclusive updates, behind-the-scenes content, and a special reward when the game
                  launches!
                </p>
              </div>
              <div className="md:w-1/2">
                <form action="#" method="POST">
                  <div>
                    <input type="text" name="name" placeholder="Your Name" className="pixel-border" />
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Your Email" className="pixel-border" required />
                  </div>
                  <button type="submit" 
                    onClick={() => trackEvent('submit_newsletter_form', { location:'Newsletter' })}
                    className="pixel-border pixel-button w-full text-base">
                    Subscribe Now (Bottom Section)
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  