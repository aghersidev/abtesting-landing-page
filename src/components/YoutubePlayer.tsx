import { useRef, useEffect } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubePlayer = ({ videoId, trackEvent }: { videoId: string; trackEvent: (eventType: string, data: any) => void }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerInstance = useRef<YT.Player | null>(null);

  useEffect(() => {
    const isScriptLoaded = () => document.getElementById('youtube-iframe-api');
    if (!isScriptLoaded()) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        playerInstance.current = new window.YT.Player(playerRef.current, {
          videoId,
          events: {
            onStateChange: (event: any) => {
              if (event === window.YT.PlayerState.PLAYING) {
                trackEvent('video_play_started', { data: videoId });
              } else if (event === window.YT.PlayerState.PAUSED) {
                trackEvent('video_play_paused', { data: videoId });
              } else if (event === window.YT.PlayerState.ENDED) {
                trackEvent('video_play_ended', { data: videoId });
              }
            }
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (window.onYouTubeIframeAPIReady === onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined as unknown as () => void;
      }
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="w-full max-w-md pixel-border">
      <div
        ref={playerRef}
        className="aspect-video w-full h-full"
      />
    </div>
  );
};

export default YouTubePlayer;