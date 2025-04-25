import { useEffect, useState } from "react";
import useUmami from "../hooks/useUmami";

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const { trackEvent } = useUmami();

  useEffect(() => {
    const openButton = document.getElementById("openPopupBtn");
    const closeButton = document.getElementById("closePopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const form = document.getElementById("popupForm");

    const handleOpen = () => setIsVisible(true);
    const handleClose = () => {
      setIsVisible(false);
      trackEvent("cancel_newsletter_form", { type: 'close_bg', location: 'Popup' });
    };
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === overlay) {
        handleClose();
      }
    };
    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      console.log("Popup Form submitted (demo)");
      handleClose();
    };

    if (openButton) openButton.addEventListener("click", handleOpen);
    if (closeButton) closeButton.addEventListener("click", handleClose);
    if (overlay) overlay.addEventListener("click", handleOverlayClick as EventListener);
    if (form) (form as HTMLFormElement).addEventListener("submit", handleSubmit);

    return () => {
      if (openButton) openButton.removeEventListener("click", handleOpen);
      if (closeButton) closeButton.removeEventListener("click", handleClose);
      if (overlay) overlay.removeEventListener("click", handleOverlayClick as EventListener);
      if (form) form.removeEventListener("submit", handleSubmit);
    };
  }, [trackEvent]);

  return (
    <div
      id="popupOverlay"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isVisible ? "" : "hidden"
        }`}
    >
      <div id="popupContent" className="pixel-border">
        <button
          id="closePopupBtn"
          className="pixel-border"
          onClick={() => {
            setIsVisible(false);
            trackEvent("cancel_newsletter_form", { type: 'close_button', location: 'Popup' });
          }}
        >
          X
        </button>
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-3">Stay Updated (Pop-up)</h2>
            <p className="text-base">Join our newsletter to receive exclusive updates...</p>
          </div>
          <div className="md:w-1/2">
            <form id="popupForm" className="space-y-3">
              <div>
                <input type="text" placeholder="Your Name" className="pixel-border" />
              </div>
              <div>
                <input type="email" placeholder="Your Email" className="pixel-border" required />
              </div>
              <button onClick={() => { trackEvent("submit_newsletter_form", { location: 'Popup' }); }}
                type="submit" className="pixel-border pixel-button w-full text-base">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}