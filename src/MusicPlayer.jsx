
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    // Try audible autoplay first.
    audio.play().catch(() => {
      setIsPlaying(false);
    });

    // If autoplay is blocked, retry after the visitor interacts.
    const startMusic = () => {
      if (audio.paused && !audio.muted) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("click", startMusic, { once: true });

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/romantic.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Mute music" : "Unmute music"}
        title={isMuted ? "Unmute music" : "Mute music"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-pink-200 bg-pink-600 text-2xl text-white shadow-lg transition hover:scale-110 hover:bg-pink-700"
      >
        {isMuted ? "🔇" : "🎵"}
      </button>
    </>
  );
}
