"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Music, Star, Palette, Rocket, Sun, Camera } from "lucide-react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Start drawing animation slightly after mount for smooth transition
    const drawTimer = setTimeout(() => setIsDrawing(true), 100);

    // Automate the transition instead of waiting for a button click
    const transitionTimer = setTimeout(() => {
      // Dispatch event to start the MusicPlayer
      window.dispatchEvent(new Event("start-music"));

      // Start fade out
      setIsFadingOut(true);

      // Remove from DOM completely
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 3500); // Wait 3.5s for the animations to finish before fading out

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(drawTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out overflow-hidden ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      style={{
        backgroundColor: "#6EC1E4",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 2px, transparent 2px)",
        backgroundSize: "30px 30px"
      }}
    >
      {/* Background Crayon Scribbles */}
      <svg className="absolute top-[20%] left-[5%] sm:left-[10%] w-[150px] h-[150px] text-[#4ECDC4] opacity-20 pointer-events-none animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M10,50 Q20,10 40,30 T70,20 T90,60 T60,80 T30,70 T10,50" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="absolute bottom-[20%] right-[5%] sm:right-[10%] w-[200px] h-[200px] text-[#FF6B6B] opacity-20 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
        <path d="M 10 10 L 90 90 M 10 90 L 90 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Playful Floating Icons */}
      <Star className="absolute top-[10%] left-[15%] w-10 h-10 text-[#FFD166] opacity-80 animate-[spin_4s_linear_infinite]" fill="#FFD166" />
      <Palette className="absolute bottom-[15%] left-[15%] w-14 h-14 text-[#FF6B6B] opacity-60 animate-[wobble_3s_ease-in-out_infinite] transform -rotate-12" strokeWidth={2} />
      <Music className="absolute top-[25%] right-[15%] w-12 h-12 text-[#4ECDC4] opacity-70 animate-bounce" strokeWidth={2} />
      <Rocket className="absolute bottom-[25%] right-[20%] w-16 h-16 text-[#1A535C] opacity-40 animate-pulse transform rotate-45" strokeWidth={2} />
      <Sun className="absolute top-[15%] right-[30%] w-20 h-20 text-[#F5A623] opacity-40 animate-[spin_10s_linear_infinite]" fill="#F5A623" strokeWidth={1} />
      <Camera className="absolute top-[40%] left-[10%] w-10 h-10 text-[#FF6B6B] opacity-50 animate-[wobble_2s_ease-in-out_infinite] transform rotate-12" strokeWidth={2} />

      {/* Playful Floating Cartoon Adventure Icons */}
      <div className="absolute top-[8%] left-[5%] w-14 h-14 sm:w-20 sm:h-20 opacity-80 animate-[wobble_4s_ease-in-out_infinite] pointer-events-none">
        <Image src="/icons/compass-background-design.png" alt="Compass" width={80} height={80} className="object-contain rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.15)]" />
      </div>
      <div className="absolute bottom-[10%] left-[5%] w-16 h-16 sm:w-24 sm:h-24 opacity-70 animate-[floatUp_5s_ease-in-out_infinite] pointer-events-none">
        <Image src="/icons/isolated-camping-tent-nature.png" alt="Tent" width={96} height={96} className="object-contain" />
      </div>
      <div className="absolute top-[18%] right-[5%] w-16 h-16 sm:w-24 sm:h-24 opacity-80 animate-[wobble_3s_ease-in-out_infinite] pointer-events-none">
        <Image src="/icons/cartoon-binocular-flat-vector-illustration-binocular-white-background.png" alt="Binocular" width={96} height={96} className="object-contain rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.15)]" />
      </div>
      <div className="absolute bottom-[18%] right-[5%] w-16 h-16 sm:w-24 sm:h-24 opacity-70 animate-bounce pointer-events-none">
        <Image src="/icons/game-kids-pirate-treasure-chest-vector-illustration.png" alt="Treasure Chest" width={96} height={96} className="object-contain" />
      </div>
      <div className="absolute top-[45%] left-[3%] w-12 h-12 sm:w-16 sm:h-16 opacity-60 animate-[spin-slow_25s_linear_infinite] pointer-events-none">
        <Image src="/icons/telescope-observation-icon.png" alt="Telescope" width={64} height={64} className="object-contain" />
      </div>

      <div className="relative flex flex-col items-center w-full max-w-md px-6 z-10">

        {/* Animated Drawing Area */}
        <div className="relative w-full h-64 sm:h-72 flex items-center justify-center mb-6">
          <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 200 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Garis Merah Muda */}
            <path
              d="M 10 70 Q 40 20, 80 80 T 140 30 T 190 60"
              stroke="#FF6B6B" strokeWidth="8"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: isDrawing ? 0 : 500,
                transition: "stroke-dashoffset 1.5s ease-out 0.2s"
              }}
            />
            {/* Garis Kuning */}
            <path
              d="M 20 40 C 60 90, 100 10, 150 70 C 170 90, 180 50, 190 40"
              stroke="#FFD166" strokeWidth="10"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: isDrawing ? 0 : 500,
                transition: "stroke-dashoffset 2s ease-out 0.4s"
              }}
            />
            {/* Garis Hijau Tosca */}
            <path
              d="M 5 50 Q 50 100, 100 50 T 195 50"
              stroke="#4ECDC4" strokeWidth="6"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: isDrawing ? 0 : 500,
                transition: "stroke-dashoffset 2.5s ease-out 0.6s"
              }}
            />
          </svg>

          {/* Logo SIMI animating instead of Pencil */}
          <Image
            src="/Logo.png"
            alt="Logo SIMI"
            width={240}
            height={240}
            className="absolute object-contain animate-[wobble_1.5s_ease-in-out_infinite]"
            style={{ transformOrigin: "bottom center" }}
          />
        </div>
      </div>
    </div>
  );
}
