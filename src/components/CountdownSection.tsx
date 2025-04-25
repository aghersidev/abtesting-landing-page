import { useEffect, useState } from "react";
import useUmami from '../hooks/useUmami';

export default function CountdownSection() {
  const { trackEvent } = useUmami();
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [hasReleased, setHasReleased] = useState(false);

  useEffect(() => {
    const releaseDate = new Date('December 31, 2025 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = releaseDate - now;

      if (distance > 0) {
        const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        setDays(daysLeft.toString().padStart(2, '0'));
        setHours(hoursLeft.toString().padStart(2, '0'));
        setMinutes(minutesLeft.toString().padStart(2, '0'));
        setSeconds(secondsLeft.toString().padStart(2, '0'));
      } else {
        clearInterval(intervalId);
        setHasReleased(true);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-8 bg-purple-200 pixel-border text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-2">Coming Soon to Steam</h2>
        <p className="text-base mb-6">Release Date: December 31, 2025</p>

        {!hasReleased ? (
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8">
            <div className="countdown-item pixel-border p-3 w-16 sm:w-20">
              <div className="text-2xl sm:text-3xl font-bold" id="days">{days}</div>
              <div className="text-xs">Days</div>
            </div>
            <div className="countdown-item pixel-border p-3 w-16 sm:w-20">
              <div className="text-2xl sm:text-3xl font-bold" id="hours">{hours}</div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="countdown-item pixel-border p-3 w-16 sm:w-20">
              <div className="text-2xl sm:text-3xl font-bold" id="minutes">{minutes}</div>
              <div className="text-xs">Minutes</div>
            </div>
            <div className="countdown-item pixel-border p-3 w-16 sm:w-20">
              <div className="text-2xl sm:text-3xl font-bold" id="seconds">{seconds}</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
        ) : (
          <p className="text-xl font-bold mb-4">RELEASED!</p>
        )}

        <button id="openPopupBtn"
          onClick={() => trackEvent('click_sign_up_newsletter', { location: 'Countdown' })}
          className="pixel-border pixel-button text-base">
          Subscribe for Updates (Pop-up)
        </button>
      </div>
    </section>
  );
};