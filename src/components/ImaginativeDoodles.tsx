"use client";

import { useSwiperSlide } from "swiper/react";
import { Cloud, Star, Rocket, Map, Sun, Music, Compass, Palette, Gamepad2, Plane, Smile, Crown, Heart, Sparkles, Bike, Book } from "lucide-react";

export function ImaginativeDoodles({ theme }: { theme: string }) {
  const swiperSlide = useSwiperSlide();
  const isActive = swiperSlide ? swiperSlide.isActive : true;

  const iconBase = "absolute z-0 transition-all duration-[2000ms] pointer-events-none";

  switch(theme) {
    case 'petualangan':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 z-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <Compass className={`${iconBase} top-[10%] right-[10%] w-16 h-16 sm:w-24 sm:h-24 text-[#8D5A3A]/20 animate-[spin_10s_linear_infinite]`} strokeWidth={1.5} />
          <Map className={`${iconBase} bottom-[10%] left-[5%] w-20 h-20 sm:w-28 sm:h-28 text-[#1B3E1F]/15 -rotate-12`} strokeWidth={1.5} />
          <Plane className={`${iconBase} bottom-[25%] right-[15%] w-16 h-16 sm:w-24 sm:h-24 text-[#FF6B6B]/20 rotate-[15deg] transition-all duration-[3000ms] ${isActive ? 'translate-x-[0] translate-y-[0]' : 'translate-x-[20vw] translate-y-[20vh]'}`} strokeWidth={1.5} />
          <Bike className={`${iconBase} top-[35%] left-[8%] w-14 h-14 sm:w-20 sm:h-20 text-[#4ECDC4]/20 -rotate-12 animate-bounce`} strokeWidth={1.5} />
        </div>
      );
    case 'berkembang':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 z-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <Sun className={`${iconBase} top-[10%] left-[10%] w-24 h-24 sm:w-32 sm:h-32 text-[#F5A623]/30 animate-[spin_20s_linear_infinite]`} strokeWidth={1.5} />
          <Palette className={`${iconBase} bottom-[15%] right-[10%] w-16 h-16 sm:w-24 sm:h-24 text-[#FF6B6B]/20 rotate-[20deg] animate-pulse`} strokeWidth={1.5} />
          <Book className={`${iconBase} top-[30%] right-[20%] w-12 h-12 sm:w-16 sm:h-16 text-[#4ECDC4]/30 -rotate-12 animate-bounce`} strokeWidth={1.5} />
          <Cloud className={`${iconBase} top-[20%] left-[40%] w-20 h-20 sm:w-28 sm:h-28 text-[#1A535C]/10`} fill="#1A535C" fillOpacity={0.05} />
        </div>
      );
    case 'percaya_diri':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 z-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <Crown className={`${iconBase} top-[15%] right-[10%] w-16 h-16 sm:w-24 sm:h-24 text-[#FFD166]/30 rotate-[15deg] animate-pulse`} strokeWidth={1.5} />
          <Star className={`${iconBase} bottom-[15%] left-[10%] w-12 h-12 sm:w-20 sm:h-20 text-[#FF6B6B]/20 -rotate-[10deg] animate-bounce`} fill="#FF6B6B" fillOpacity={0.1} strokeWidth={1.5} />
          <Sparkles className={`${iconBase} top-[35%] left-[15%] w-14 h-14 sm:w-20 sm:h-20 text-[#4ECDC4]/20 animate-pulse`} strokeWidth={1.5} />
          <Rocket className={`${iconBase} bottom-[25%] right-[15%] w-20 h-20 sm:w-28 sm:h-28 text-[#F5A623]/20 rotate-[45deg] transition-all duration-[3000ms] ${isActive ? 'translate-x-[0] translate-y-[0]' : '-translate-x-[15vw] translate-y-[15vh]'}`} strokeWidth={1.5} />
        </div>
      );
    case 'happy':
      return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 z-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <Smile className={`${iconBase} top-[20%] right-[10%] w-20 h-20 sm:w-32 sm:h-32 text-[#1A535C]/15 rotate-[15deg] animate-bounce`} strokeWidth={1.5} />
          <Heart className={`${iconBase} bottom-[25%] left-[10%] w-16 h-16 sm:w-24 sm:h-24 text-[#F5A623]/20 -rotate-12 animate-pulse`} fill="#F5A623" fillOpacity={0.1} strokeWidth={1.5} />
          <Gamepad2 className={`${iconBase} top-[10%] left-[20%] w-16 h-16 sm:w-24 sm:h-24 text-[#4ECDC4]/20 rotate-[-20deg]`} strokeWidth={1.5} />
          <Music className={`${iconBase} bottom-[10%] right-[20%] w-14 h-14 sm:w-20 sm:h-20 text-[#FF6B6B]/20 rotate-[10deg] animate-bounce`} strokeWidth={1.5} />
        </div>
      );
    default:
      return null;
  }
}
