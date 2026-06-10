"use client";

import { useState, useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleStartMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Ignore error (e.g. file not found or browser blocked)
        });
      }
    };

    // Listen to start-music event from LoadingScreen
    window.addEventListener("start-music", handleStartMusic);

    // Modern browsers block autoplay without user interaction.
    // We listen to the first interaction (click, touch) to start music if autoplay fails.
    const startOnInteraction = () => {
      handleStartMusic();
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
    };

    document.addEventListener("click", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);

    // Attempt to play immediately on mount (might be allowed by browser)
    handleStartMusic();

    return () => {
      window.removeEventListener("start-music", handleStartMusic);
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Background audio element */}
      <audio 
        ref={audioRef} 
        loop 
        autoPlay
        src="/music.mp3?v=1" 
        preload="auto"
      />

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-[990] bg-[#FFD166] p-3 rounded-full border-[3px] border-[#1A535C] shadow-[3px_3px_0px_#1A535C] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A535C] transition-all transform rotate-[-2deg] group"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A535C] animate-[wobble_3s_ease-in-out_infinite]" />
        ) : (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A535C]" />
        )}
      </button>
    </>
  );
}
